#!/usr/bin/env node
// Offline fallback for scripts/generate-narration.mjs: synthesizes English narration
// using the local Windows SAPI voice (no network required) instead of Edge neural TTS.
// Lower quality than generate-narration.mjs - only use when the Edge TTS endpoint is
// unreachable (e.g. sandboxed/restricted network). Windows-only (System.Speech), no
// Welsh voice is available locally so `cy` cannot be produced this way.
//
// Usage: node scripts/generate-narration-offline.mjs <storyDir> [--voice=NAME] [--rate=0]

import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';

function parseArgs(argv) {
  const [storyDirArg, ...rest] = argv;
  if (!storyDirArg) {
    console.error('Usage: node scripts/generate-narration-offline.mjs <storyDir> [--voice=NAME] [--rate=0]');
    process.exit(1);
  }
  const opts = { storyDir: storyDirArg, voice: 'Microsoft Hazel Desktop', rate: '0' };
  for (const arg of rest) {
    const [key, value] = arg.replace(/^--/, '').split('=');
    if (key === 'voice') opts.voice = value;
    else if (key === 'rate') opts.rate = value;
  }
  return opts;
}

function synthesizeLineSapi(text, voice, rate, outPath) {
  const escaped = text.replace(/'/g, "''");
  const psScript = `
    Add-Type -AssemblyName System.Speech
    $s = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $s.SelectVoice('${voice}')
    $s.Rate = ${rate}
    $s.SetOutputToWaveFile('${outPath}')
    $s.Speak('${escaped}')
    $s.Dispose()
  `;
  const result = spawnSync('powershell', ['-NoProfile', '-Command', psScript], { stdio: ['ignore', 'ignore', 'pipe'] });
  if (result.status !== 0) {
    throw new Error(`SAPI synthesis failed for "${text.slice(0, 60)}...":\n${result.stderr?.toString()}`);
  }
}

function probeDurationSeconds(filePath) {
  const result = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', filePath]);
  const value = parseFloat(result.stdout?.toString().trim());
  return Number.isFinite(value) ? value : null;
}

function mixToTrack(inputs, outputPath) {
  const args = ['-y'];
  for (const input of inputs) args.push('-i', input.filePath);
  const delayFilters = inputs.map((input, i) => `[${i}:a]adelay=${Math.round(input.startTime)}:all=1[a${i}]`);
  const mixLabels = inputs.map((_, i) => `[a${i}]`).join('');
  const filterComplex = `${delayFilters.join(';')};${mixLabels}amix=inputs=${inputs.length}:duration=longest:normalize=0[mix]`;
  args.push('-filter_complex', filterComplex, '-map', '[mix]', '-c:a', 'libmp3lame', '-q:a', '4', outputPath);
  const result = spawnSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${outputPath}:\n${result.stderr?.toString()}`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const storyPath = path.join(opts.storyDir, 'story.json');
  if (!existsSync(storyPath)) {
    console.error(`story.json not found at ${storyPath}`);
    process.exit(1);
  }
  const story = JSON.parse(await readFile(storyPath, 'utf8'));
  const track = (story.captions || []).find((t) => t.srclang === 'en');
  if (!track) {
    console.error('No "en" caption track found.');
    process.exit(1);
  }

  const audioDir = path.join(opts.storyDir, 'audio');
  const tempDir = await mkdtemp(path.join(tmpdir(), 'dive-narration-offline-'));
  try {
    console.log(`en: synthesizing ${track.cues.length} line(s) with offline SAPI voice "${opts.voice}"...`);
    const inputs = [];
    for (const [index, cue] of track.cues.entries()) {
      const filePath = path.join(tempDir, `en-${index}.wav`);
      synthesizeLineSapi(cue.text, opts.voice, opts.rate, filePath);
      const duration = probeDurationSeconds(filePath);
      console.log(`  - line ${index} (${cue.startTime}ms): ${duration ? duration.toFixed(2) + 's' : '?'}`);
      inputs.push({ filePath, startTime: cue.startTime });
    }
    const outputPath = path.join(audioDir, 'voice-en.mp3');
    mixToTrack(inputs, outputPath);
    console.log(`  -> wrote ${outputPath}`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
  console.log('\nDone. This is an offline SAPI draft, not the Edge neural voice - regenerate with npm run generate:narration once network access is available.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
