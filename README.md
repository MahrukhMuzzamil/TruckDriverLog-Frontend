# TruckDriverLog — Frontend

React (Vite) SPA for the RouteLedger ELD trip planner: trip form with location autocomplete, interactive route map, duty itinerary, and **auto-drawn FMCSA Driver's Daily Log sheets** (SVG, print-ready). Full project docs, Docker Compose and deployment live in the [backend repo](https://github.com/MahrukhMuzzamil/TruckDriverLog-Backend).

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
| `VITE_API_URL` | Backend base URL. Leave empty (default) — the app calls same-origin `/api`, which the Vite dev proxy handles locally and the edge nginx handles in Docker/EC2. Only set it if the API is ever hosted on a different origin. |

## Deployment

Deployed together with the backend on a single EC2 instance via Docker Compose — the compose file, edge nginx and CI/CD deploy scripts live in the [backend repo](https://github.com/MahrukhMuzzamil/TruckDriverLog-Backend). Every push to `main` here builds and redeploys just the frontend container.
