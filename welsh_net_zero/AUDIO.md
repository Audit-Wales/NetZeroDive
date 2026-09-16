# Audio

`audio/placid-ambient.ogg` is "Placid Ambient" by MusicLFiles, from Wikimedia Commons,
licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (same track used by
the Wealth and Health example).
Source: https://commons.wikimedia.org/wiki/File:Placid_Ambient_by_MusicLFiles.ogg

## Narration audio

`story.json` references `audio/voice-en.mp3` (role `narration`, `lang: en`) and
`audio/voice-cy.mp3` (role `narration`, `lang: cy`). The `AudioEngine`
(`src/core/audio.ts`) only plays the clip whose `lang` matches the active
locale, so switching language mid-playback switches narration track too - no
extra wiring needed once both files exist.

Neither file is committed yet. Generate them with:

```bash
npm run generate:narration -- welsh_net_zero
```

This reads `story.json`'s `captions` cues (the source of truth for both the
script and its timing), synthesizes each line with Microsoft Edge neural
voices (`en-GB-SoniaNeural` / `cy-GB-NiaNeural` by default) via the free
[`edge-tts`](https://github.com/travisvn/edge-tts) library, and uses `ffmpeg`
to place each line at its cue's `startTime` into a single
`audio/voice-<lang>.mp3` track (same approach already used for
`examples/the_wealth_and_health_of_nations`). Requires outbound network
access and `ffmpeg` on PATH - both unavailable in some sandboxes, so this may
need to be run on a machine with normal internet access.

Useful flags: `--only=cy` (just one language), `--rate=-5%` (slow narration
down if lines overrun their caption window - the script warns about this),
`--voice-en=NAME` / `--voice-cy=NAME` (pick a different Edge voice).

There was previously a rough-draft `audio/voice-en.wav`, synthesized locally
with the dated Windows SAPI voice `Microsoft Hazel Desktop` (no `cy` voice was
available locally to make an equivalent Welsh draft). Once
`audio/voice-en.mp3` / `audio/voice-cy.mp3` are generated via the command
above, that old `.wav` is redundant and can be deleted.

After generating real audio, listen back and re-check the caption
`startTime`/`endTime` pairs in `story.json` against the actual recorded
timings - nudge them (and re-run the generator) if the spoken pace doesn't
line up.

## Script (English)

Captions are the source of truth - `story.json`'s `en` caption track, reproduced
here for reference:

| Time (ms) | Line |
|-----------|------|
| 1200–5800 | Wales is unlikely to achieve the 2030 ambition. |
| 6400–10200 | In 2021, an ambition was set: net zero by 2030. |
| 10400–14600 | In 2022, we found 'clear uncertainty' it would be met. |
| 14800–19000 | Now, it's highly unlikely the public sector will achieve that collective ambition. |
| 21400–25900 | Action has happened — public bodies have taken steps forward. |
| 26400–33900 | Reporting bodies have increased from 69 to 82 between 2021-22 and 2024-25. |
| 34400–38900 | But decarbonisation has become a lower priority for public bodies. |
| 39400–45900 | Better understanding, more reporting and more plans — against financial pressures, political pressures, and reticence about delivery. |
| 54400–59200 | Averaged per reporting body, emissions fell sharply after 2021. |
| 59400–64200 | But the last two years show that progress stalling — even ticking back up. |
| 64400–68800 | A sign that decarbonisation is losing momentum as a priority. |
| 69400–73800 | Progress is difficult to measure and deliver. |
| 74400–81800 | Most emissions come from the supply chain — sitting largely outside public bodies' direct control. |
| 89400–96800 | Finance and skills remain major barriers — decarbonising council buildings alone is estimated at £2.8 billion, against £228 million of funding since our last report. |
| 104400–108400 | So what can be done to close the gap? |
| 109400–116400 | To close the gap, public bodies need clearer direction, better data, financial planning, and stronger skills. |

## Script (Cymraeg)

`story.json`'s `cy` caption track, reproduced here for reference:

| Time (ms) | Line |
|-----------|------|
| 1200–5800 | Mae'n annhebygol y bydd Cymru'n cyflawni uchelgais 2030. |
| 6400–10200 | Yn 2021, gosodwyd uchelgais: sero net erbyn 2030. |
| 10400–14600 | Yn 2022, canfuwyd 'ansicrwydd clir' y byddai'n cael ei gyflawni. |
| 14800–19000 | Nawr, mae'n hynod annhebygol y bydd y sector cyhoeddus yn cyflawni'r uchelgais ar y cyd. |
| 21400–25900 | Mae camau wedi'u cymryd — mae cyrff cyhoeddus wedi cymryd camau ymlaen. |
| 26400–33900 | Mae nifer y cyrff adrodd wedi cynyddu o 69 i 82 rhwng 2021-22 a 2024-25. |
| 34400–38900 | Ond mae datgarboneiddio wedi dod yn flaenoriaeth is i gyrff cyhoeddus. |
| 39400–45900 | Gwell dealltwriaeth, mwy o adrodd a mwy o gynlluniau — yn erbyn pwysau ariannol, pwysau gwleidyddol, ac amharodrwydd ynghylch cyflawni. |
| 54400–59200 | Ar gyfartaledd fesul corff adrodd, syrthiodd allyriadau'n sydyn ar ôl 2021. |
| 59400–64200 | Ond mae'r ddwy flynedd ddiwethaf yn dangos y cynnydd hwnnw'n arafu — ac yn codi eto hyd yn oed. |
| 64400–68800 | Arwydd bod datgarboneiddio'n colli momentwm fel blaenoriaeth. |
| 69400–73800 | Mae cynnydd yn anodd ei fesur a'i gyflawni. |
| 74400–81800 | Daw'r rhan fwyaf o'r allyriadau o'r gadwyn gyflenwi — y tu allan i reolaeth uniongyrchol cyrff cyhoeddus, i raddau helaeth. |
| 89400–96800 | Mae cyllid a sgiliau yn parhau i fod yn rhwystrau mawr — amcangyfrifir cost datgarboneiddio adeiladau cynghorau yn unig yn £2.8 biliwn, o gymharu â £228 miliwn o gyllid ers ein hadroddiad diwethaf. |
| 104400–108400 | Felly beth all gael ei wneud i gau'r bwlch? |
| 109400–116400 | I gau'r bwlch, mae angen ar gyrff cyhoeddus gyfeiriad cliriach, data gwell, cynllunio ariannol a sgiliau cryfach. |

**Translation note:** the Cymraeg script above is a machine-assisted draft. Have
it reviewed by a Welsh speaker before this is used publicly (same caveat
applies to the `cy` strings in `story.json` and `tools/dive-lang.js`).

