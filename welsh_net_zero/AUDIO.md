# Audio

`audio/placid-ambient.ogg` is "Placid Ambient" by MusicLFiles, from Wikimedia Commons,
licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (same track used by
the Wealth and Health example).
Source: https://commons.wikimedia.org/wiki/File:Placid_Ambient_by_MusicLFiles.ogg

## Narration audio (rough draft)

`story.json` references `audio/voice-en.wav` (role `narration`, `lang: en`).
This file was generated **offline** from the actual script/captions below, using
the local Windows SAPI voice `Microsoft Hazel Desktop` (each line synthesized
separately and placed at its caption's `startTime`). It has the correct words
and is timed to the captions, but the voice quality is a dated, robotic
"Desktop" SAPI voice, not a neural voice — it should be replaced with a proper
recording before this is used publicly.

There is currently **no Cymraeg narration** — this machine has no Welsh (`cy`)
TTS voice installed locally, so `audio/voice-cy.mp3`/`.wav` doesn't exist and
there's no `cy` entry in the `audio` array yet. Both the English and Welsh
narration should ideally be regenerated with neural voices once network access
is available: Microsoft Edge neural voices, e.g. `en-GB-SoniaNeural` and
`cy-GB-NiaNeural`, via the free [`edge-tts`](https://github.com/travisvn/edge-tts)
library (see `examples/the_wealth_and_health_of_nations/AUDIO.md` for the same
recipe). Drop the resulting files in `welsh_net_zero/audio/` and add matching
entries to `story.json`'s `audio` array.

After adding real audio, re-check the caption `startTime`/`endTime` pairs in
`story.json` against the actual recorded timings and nudge them if the spoken
pace doesn't line up — the values below are a best-effort estimate, not measured
from real audio.

## Script (English)

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
| 54400–58000 | "Decarbonisation is a discretionary priority." |
| 58200–61200 | "Finance is just the overwhelming problem for everyone at the moment." |
| 61400–64000 | "There's a better understanding of the scale of the challenge… but there's reticence about what it will take." |
| 64200–66000 | "Net zero has become a political hot potato." |
| 69400–73800 | Progress is difficult to measure and deliver. |
| 74400–81800 | Most emissions come from the supply chain — sitting largely outside public bodies' direct control. |
| 89400–96800 | Finance and skills remain major barriers — decarbonising council buildings alone is estimated at £2.8 billion, against £228 million of funding since our last report. |
| 104400–108400 | So what can be done to close the gap? |
| 109400–116400 | To close the gap, public bodies need clearer direction, better data, financial planning, and stronger skills. |

## Script (Cymraeg)

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
| 54400–58000 | "Blaenoriaeth ddewisol yw datgarboneiddio." |
| 58200–61200 | "Cyllid yw'r broblem sy'n llethu pawb ar hyn o bryd." |
| 61400–64000 | "Mae gwell dealltwriaeth o faint yr her… ond mae amharodrwydd ynghylch beth fydd ei angen." |
| 64200–66000 | "Mae sero net wedi dod yn daten boeth wleidyddol." |
| 69400–73800 | Mae cynnydd yn anodd ei fesur a'i gyflawni. |
| 74400–81800 | Daw'r rhan fwyaf o'r allyriadau o'r gadwyn gyflenwi — y tu allan i reolaeth uniongyrchol cyrff cyhoeddus, i raddau helaeth. |
| 89400–96800 | Mae cyllid a sgiliau yn parhau i fod yn rhwystrau mawr — amcangyfrifir cost datgarboneiddio adeiladau cynghorau yn unig yn £2.8 biliwn, o gymharu â £228 miliwn o gyllid ers ein hadroddiad diwethaf. |
| 104400–108400 | Felly beth all gael ei wneud i gau'r bwlch? |
| 109400–116400 | I gau'r bwlch, mae angen ar gyrff cyhoeddus gyfeiriad cliriach, data gwell, cynllunio ariannol a sgiliau cryfach. |

**Translation note:** the Cymraeg script above is a machine-assisted draft. Have
it reviewed by a Welsh speaker before this is used publicly (same caveat
applies to the `cy` strings in `story.json` and `tools/dive-lang.js`).
