# TruckDriverLog — Frontend

React (Vite) SPA for the [RouteLedger](https://github.com/MahrukhMuzzamil/TruckDriverLog) ELD trip planner: trip form with location autocomplete, interactive route map, duty itinerary, and **auto-drawn FMCSA Driver's Daily Log sheets** (SVG, print-ready). See the root repo for full docs.

## Stack & highlights

- **React 18 + Vite** — fast dev/build
- **react-leaflet + CARTO dark tiles** — route map with typed stop markers
- **Custom SVG renderer** (`src/components/LogSheet.jsx`) — draws the paper daily log: 24-hour grid, quarter-hour ticks, stepped duty line, totals column, remarks, 70-hr recap
- **framer-motion** — entrance/stagger animations
- **driver.js** — guided app tour for first-time users (re-run via "Take the tour")
- Hand-rolled design system (`src/styles/global.css`) — night-highway palette, Sora/Inter/JetBrains Mono

## Run

```bash
npm install
npm run dev        # http://localhost:5173 (proxies /api → localhost:8000)
npm run build      # production bundle in dist/
```

## Configuration

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend base URL. Empty = same-origin `/api` (dev proxy / Docker nginx). On Vercel set it to your deployed API, e.g. `https://api.example.com/api` |

## Deploy to Vercel

1. Import this repo in Vercel (framework preset: **Vite**).
2. Set `VITE_API_URL` in Project → Settings → Environment Variables.
3. Deploy — `vercel.json` already handles the SPA rewrite.
