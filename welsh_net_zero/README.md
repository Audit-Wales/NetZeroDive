# Zeroing in? — Welsh Public Sector Net Zero 2025

A bilingual (English/Cymraeg) data-driven narrative video built with the [DIVE framework](../README.md), telling the story of Audit Wales's 2026 Net Zero review: the 2030 ambition is unlikely to be met, despite real progress, because financial and political pressures are squeezing decarbonisation out as a priority.

## What It Does

The video plays for **77 seconds** across 11 scenes, each using a different tool (title card, headline stat, timeline, chart, or quote wall). The DIVE player sequences the scenes and overlays captions in the viewer's chosen language. At any point the viewer can pause and open a scene's tool directly.

---

## The Story Arc

| # | Scene | Tool | Time | What it shows |
|---|-------|------|------|----------------|
| 1 | Title | `tools/title-card.html` | 0.0–1.2s | "Zeroing in?" title card |
| 2 | Key Message | `tools/key-message.html` | 1.2–6.2s | Wales is unlikely to achieve the 2030 ambition |
| 3 | Context & Timeline | `tools/narrative-timeline.html` | 6.2–19.2s | 2021 ambition set → 2022 uncertainty found → now unlikely to be met |
| 4 | Action Taken | `tools/action-message.html` | 19.2–24.2s | Public bodies have taken steps forward |
| 5 | Reporting Bodies | `tools/reporting-bodies-growth.html` | 24.2–32.2s | D3 bar chart: reporting bodies grew from 69 to 82 (2021-22 to 2024-25) |
| 6 | Lower Priority | `tools/key-message-priority.html` | 32.2–37.2s | Decarbonisation has become a lower priority for public bodies |
| 7 | Balance of Pressures | `tools/balance-scale.html` | 37.2–44.2s | Progress (understanding, reporting, plans) weighed against pressures (financial, political, delivery reticence) |
| 8 | Measure & Deliver | `tools/measure-deliver-message.html` | 44.2–49.2s | Progress is difficult to measure and deliver |
| 9 | In Their Words | `tools/quotes.html` | 49.2–61.2s | Four verbatim quotes from the review |
| 10 | Supply Chain | `tools/sector-donut.html` | 61.2–69.2s | D3 donut chart: Scope 3 accounts for ~84% of emissions — far more than Scopes 1 and 2 combined — and sits largely outside public bodies' direct control |
| 11 | Finance & Skills | `tools/finance-barriers.html` | 69.2–77.2s | Two rising bars: £2.8bn estimated cost to decarbonise Welsh council buildings alone, against £228m funding provided since the last report (2022–23 to 2025–26) — over 12× the gap |

The exact scene timings live in `story.json`'s `timelineSections` / `scenes` arrays.

---

## Bilingual, captions, and audio

- **Languages**: English (default) and Cymraeg, declared in `story.json`'s `languages` array.
- **Switching language**: either the player's Settings (⚙) menu, or the small **EN / CY** pill button in the bottom-left corner of the video itself — both stay in sync and persist to the URL (`?lang=cy`) and `localStorage`.
- **Captions**: `story.json`'s `captions` array has English and Welsh cue tracks timed to the narration script. Toggle with the CC button.
- **Voice-over narration**: `story.json`'s `audio` array references `audio/voice-en.mp3` and `audio/voice-cy.mp3`, but **these files don't exist yet** — generating them needs outbound network access. See [AUDIO.md](AUDIO.md) for the full narration script (in both languages) and how to generate the files (Microsoft Edge neural voices via `edge-tts`, same approach as `examples/the_wealth_and_health_of_nations`). Missing audio fails silently; the video still plays and the captions still show.
- Each in-story tool includes `tools/dive-lang.js`, a shared i18n helper (`COPY.en`/`COPY.cy` dictionaries, `data-i18n`/`data-i18n-html` attribute binding, and the EN/CY toggle button). Only the 11 tools actually used by `story.json` are wired up; the other tool files in `tools/` are unused by this story.

---

## Files

```
welsh_net_zero/
├── index.html          — entry page with <dive-video>
├── story.json           — full narrative script (timeline, scenes, languages, captions, audio)
├── AUDIO.md              — pending voice-over script + generation instructions
├── data/
│   └── welsh-net-zero.json — source data; fetched directly by the D3-based scenes (reporting bodies growth, supply chain donut)
└── tools/
    ├── dive-lang.js               — shared EN/CY dictionary + i18n helper, used by all 10 scenes below
    ├── title-card.html            — Scene 1
    ├── key-message.html           — Scene 2
    ├── narrative-timeline.html    — Scene 3
    ├── action-message.html        — Scene 4
    ├── reporting-bodies-growth.html — Scene 5 (D3 bar chart)
    ├── key-message-priority.html  — Scene 6
    ├── balance-scale.html         — Scene 7
    ├── measure-deliver-message.html — Scene 8
    ├── quotes.html                — Scene 9
    ├── sector-donut.html          — Scene 10 (D3 donut chart)
    └── finance-barriers.html      — Scene 11 (rising bar chart)
```

> Note: `tools/` also contains several other HTML files (`coverage-growth.html`, `supply-chain-blocks.html`, etc.) from an earlier draft of this story. They aren't referenced by `story.json` and aren't localized — they're left in place but unused.

---

## How the DIVE Protocol Works

Each tool is loaded in an `<iframe>` by the DIVE player. Communication is via `window.postMessage`:

| Message | Direction | Purpose |
|---|---|---|
| `DIVE_INIT` | Player → Tool | Sends the data payload (if any) and current language on first load |
| `DIVE_STATE` | Player → Tool | Sends a keyframe state object plus current timeline time (ms) |
| `DIVE_PLAYBACK` | Player → Tool | Play / pause signal |
| `DIVE_LANG` | Both directions | Player → Tool on language change; Tool → Player when the in-scene EN/CY button is clicked |
| `DIVE_INTERACT` | Tool → Player | Tool tells the player the user has interacted (can trigger pause) |

Scene 5 (`reporting-bodies-growth`) uses `streamTime` to interpolate its reveal:

```json
{ "streamTime": true, "segmentStartTimeMs": 24200, "segmentEndTimeMs": 27200 }
```

Scene 10 (`sector-donut`) uses a simple `phase` field instead, stepping through three keyframes (`1` → empty grey ring + teaser headline, `2` → Scope 3 share reveal with an animated count-up, `3` → explanatory copy):

```json
{ "phase": 1 } → { "phase": 2 } → { "phase": 3 }
```

### Standalone Mode

Every tool can be opened directly (e.g. `welsh_net_zero/tools/quotes.html`) without the DIVE player — it renders its default English state and the EN/CY toggle still works locally.

---

## Running Locally

```bash
# From the workspace root
npm install
npm run dev
```

Then open: **<http://localhost:5173/welsh_net_zero/>**

---

## Data Source

Audit Wales, Welsh Public Sector Net Zero review 2025-26.
