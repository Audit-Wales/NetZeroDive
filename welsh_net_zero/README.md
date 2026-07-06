# Welsh Public Sector Net Zero 2025

A data-driven narrative video built with the [DIVE framework](../../README.md), telling the story of Welsh public sector emissions data for 2025.

## What It Does

The video plays for **1 minute 50 seconds** across three acts, each using a different interactive chart. The DIVE player sequences the charts, sends keyframe states that drive their animations, and overlays narrative text on top. At any point the viewer can pause and interact directly with the chart.

---

## The Story Arc

### Act 1 — Coverage Growth (0–35s)
**Chart:** `tools/coverage-growth.html` — dual-axis bar + line chart

The opening question: why did reported emissions more than double since 2020? The answer is coverage, not actual growth. As bars grow in one-at-a-time (one per year), the number of reporting bodies is shown above each bar. By 2025, 82 bodies report a combined £12 billion supply chain spend. The orange spend line draws in at the end to show both trends together.

> *Key insight: More organisations joined, so the total went up — but that's a good thing. Per-body emissions are falling.*

### Act 2 — Sector Shares (35–75s)
**Chart:** `tools/sector-donut.html` — animated donut chart with text panel

Five coloured sectors draw in one by one around the donut (Local Authorities, NHS Wales, Other PSBs, Universities, Welsh Government). Then the individual colours fade and a single orange arc sweeps around to 80%, with an animated counter rising to 80%. The right-side panel explains why those two sectors dominate.

> *Key insight: Local Authorities (45%) + NHS Wales (35%) = 80% of all Welsh public sector emissions.*

### Act 3 — Supply Chain Blocks (75–110s)
**Chart:** `tools/supply-chain-blocks.html` — animated block/waffle chart

Four large blocks fall in one at a time with a bouncy spring animation. Three are orange (supply chain), one is grey (everything else). The grey block reveals "75%" in orange. The footnote fades in below: *procurement reform is the most powerful lever for Net Zero 2030*.

> *Key insight: 75% of emissions come from what the public sector buys, not from buildings or transport.*

---

## Files

```
welsh_net_zero/
├── index.html              — entry page with <dive-video> and tool links
├── story.json              — full narrative script (timeline, scenes, keyframes, overlays)
├── data/
│   └── welsh-net-zero.json — all data for all tools
└── tools/
    ├── coverage-growth.html     — Act 1: bar + line chart
    ├── sector-donut.html        — Act 2: animated donut
    └── supply-chain-blocks.html — Act 3: falling blocks
```

---

## Data (`data/welsh-net-zero.json`)

| Key | Description |
|---|---|
| `meta` | Title, source, year range, net zero target year, body count |
| `sectors[]` | 5 sector definitions (id, name, color) |
| `emissionsTrend[]` | Yearly emissions by source (supply chain, buildings, transport, etc.) 2020–2025 |
| `sectorSeries[]` | Yearly totals per sector (supply chain + direct) 2020–2025 |
| `supplyChainHistory[]` | Year-by-year: total supply chain emissions (ktCO₂e), spend (£bn), reporting body count |
| `sectorShares2025[]` | 2025 percentage share and emissions per sector (used by the donut chart) |
| `treemap2025` | Hierarchical 2025 data (sector → source) for any treemap/block visualisation |

---

## How the DIVE Protocol Works

Each tool is loaded in an `<iframe>` by the DIVE player. Communication is via `window.postMessage`:

| Message | Direction | Purpose |
|---|---|---|
| `DIVE_INIT` | Player → Tool | Sends the full data payload on first load |
| `DIVE_STATE` | Player → Tool | Sends a keyframe state object plus current timeline time (ms) |
| `DIVE_PLAYBACK` | Player → Tool | Play / pause signal |
| `DIVE_INTERACT` | Tool → Player | Tool tells the player the user has interacted (can trigger pause) |

### Keyframe States

Each tool responds to its own state schema:

**coverage-growth.html**
```json
{ "revealYear": 2022, "showLine": true, "streamTime": true,
  "segmentStartTimeMs": 0, "segmentEndTimeMs": 25000 }
```
`streamTime: true` means the tool should interpolate `revealYear` between `2020` and `2025` based on the current timeline position within the segment. This produces a smooth, continuous reveal rather than a jump.

**sector-donut.html**
```json
{ "phase": 2 }
```
`phase 1` = individual sectors drawing in, `phase 2` = orange 80% arc sweeps, `phase 3` = explanation text appears on the right.

**supply-chain-blocks.html**
```json
{ "revealBlocks": 3, "showFootnote": false }
```
`revealBlocks` (0–4) determines how many blocks are visible. Each block falls in with a spring animation when its keyframe fires. `showFootnote: true` fades in the bottom text.

### Standalone Mode

All three tools work independently without the DIVE player. Open any tool directly (e.g. `/examples/welsh_net_zero/tools/coverage-growth.html`) and it bootstraps itself by fetching `../data/welsh-net-zero.json` and rendering the full final state for exploration.

---

## Running Locally

```bash
# From the workspace root
npm install
npm run dev
```

Then open: **http://localhost:5173/examples/welsh_net_zero/**

---

## Data Source

Welsh Government / WPSBS Net Zero Annual Report 2024–25. Emissions figures in ktCO₂e (thousand tonnes CO₂ equivalent). Supply chain spend figures in £ billions.
