#!/usr/bin/env node
// Generates per-language narration tracks (audio/voice-<lang>.mp3) for a DIVE
// story from its story.json caption cues, using Microsoft Edge neural TTS
// voices (via @travisvn/edge-tts) and ffmpeg to place each line at its cue's
// startTime. Requires outbound network access (blocked in some sandboxes) and
// ffmpeg on PATH.
//
// Usage:
//   node scripts/generate-narration.mjs <storyDir> [--voice-en=NAME] [--voice-cy=NAME] [--rate=+0%] [--only=en,cy]
//
// Example:
//   node scripts/generate-narration.mjs welsh_net_zero
//   node scripts/generate-narration.mjs welsh_net_zero --only=cy --rate=-5%

import { Communicate } from '@travisvn/edge-tts';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';

const DEFAULT_VOICES = {
  en: 'en-GB-SoniaNeural',
  cy: 'cy-GB-NiaNeural',
};

function parseArgs(argv) {
  const [storyDirArg, ...rest] = argv;
  if (!storyDirArg) {
    console.error(
      'Usage: node scripts/generate-narration.mjs <storyDir> [--voice-en=NAME] [--voice-cy=NAME] [--rate=+0%] [--only=en,cy]',
    );
    process.exit(1);
  }
  const opts = { storyDir: storyDirArg, voices: { ...DEFAULT_VOICES }, rate: '+0%', only: null };
  for (const arg of rest) {
    const [key, value] = arg.replace(/^--/, '').split('=');
    if (key === 'rate') opts.rate = value;
    else if (key === 'only') opts.only = value.split(',').map((s) => s.trim());
    else if (key?.startsWith('voice-')) opts.voices[key.slice('voice-'.length)] = value;
  }
  return opts;
}

function checkFfmpeg() {
  const probe = spawnSync('ffmpeg', ['-version']);
  if (probe.error) {
    console.error('ffmpeg not found on PATH. Install it first, e.g.:');
    console.error('  winget install Gyan.FFmpeg   (Windows)');
    console.error('  brew install ffmpeg          (macOS)');
    console.error('  sudo apt install ffmpeg      (Debian/Ubuntu)');
    process.exit(1);
  }
}

async function synthesizeLine(text, voice, rate) {
  const communicate = new Communicate(text, { voice, rate });
  const buffers = [];
  for await (const chunk of communicate.stream()) {
    if (chunk.type === 'audio' && chunk.data) buffers.push(chunk.data);
  }
  if (buffers.length === 0) {
    throw new Error(`No audio returned for voice ${voice}: "${text.slice(0, 60)}..."`);
  }
  return Buffer.concat(buffers);
}

function probeDurationSeconds(filePath) {
  const result = spawnSync('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'csv=p=0',
    filePath,
  ]);
  const value = parseFloat(result.stdout?.toString().trim());
  return Number.isFinite(value) ? value : null;
}

function mixToTrack(inputs, outputPath) {
  const args = ['-y'];
  for (const input of inputs) {
    args.push('-i', input.filePath);
  }
  const delayFilters = inputs.map((input, i) => `[${i}:a]adelay=${Math.round(input.startTime)}:all=1[a${i}]`);
  const mixLabels = inputs.map((_, i) => `[a${i}]`).join('');
  const filterComplex = `${delayFilters.join(';')};${mixLabels}amix=inputs=${inputs.length}:duration=longest:normalize=0[mix]`;
  args.push('-filter_complex', filterComplex, '-map', '[mix]', '-c:a', 'libmp3lame', '-q:a', '4', outputPath);
  const result = spawnSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${outputPath}:\n${result.stderr?.toString()}`);
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  checkFfmpeg();

  const storyPath = path.join(opts.storyDir, 'story.json');
  if (!existsSync(storyPath)) {
    console.error(`story.json not found at ${storyPath}`);
    process.exit(1);
  }
  const story = JSON.parse(await readFile(storyPath, 'utf8'));
  const tracks = (story.captions || []).filter((t) => !opts.only || opts.only.includes(t.srclang));
  if (tracks.length === 0) {
    console.error('No caption tracks found (or --only filtered them all out) - nothing to narrate.');
    process.exit(1);
  }

  const audioDir = path.join(opts.storyDir, 'audio');
  const tempDir = await mkdtemp(path.join(tmpdir(), 'dive-narration-'));

  try {
    for (const track of tracks) {
      const lang = track.srclang;
      const voice = opts.voices[lang];
      if (!voice) {
        console.warn(`No voice configured for "${lang}", skipping (pass --voice-${lang}=NAME).`);
        continue;
      }
      console.log(`\n${lang}: synthesizing ${track.cues.length} line(s) with ${voice}...`);

      const inputs = [];
      for (const [index, cue] of track.cues.entries()) {
        const filePath = path.join(tempDir, `${lang}-${index}.mp3`);
        const buffer = await synthesizeLine(cue.text, voice, opts.rate);
        await writeFile(filePath, buffer);
        const duration = probeDurationSeconds(filePath);
        const windowSeconds = (cue.endTime - cue.startTime) / 1000;
        if (duration !== null && duration > windowSeconds) {
          console.warn(
            `  ! line ${index} runs ${(duration - windowSeconds).toFixed(2)}s past its caption window ` +
            `(${duration.toFixed(2)}s spoken vs ${windowSeconds.toFixed(2)}s available @ ${cue.startTime}ms): "${cue.text}"`,
          );
        }
        inputs.push({ filePath, startTime: cue.startTime });
        console.log(`  - line ${index} (${cue.startTime}ms): ${duration ? duration.toFixed(2) + 's' : '?'}`);
      }

      const outputPath = path.join(audioDir, `voice-${lang}.mp3`);
      mixToTrack(inputs, outputPath);
      console.log(`  -> wrote ${outputPath}`);
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }

  console.log('\nDone. Confirm story.json\'s "audio" array references audio/voice-<lang>.mp3 for each language.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
