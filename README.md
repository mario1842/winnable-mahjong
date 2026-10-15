# Winnable Mahjong

Mahjong Solitaire in the browser where **every deal is guaranteed solvable**. Pick a layout, match free tiles, and clear the board — no reshuffles required to make the puzzle possible.

## Play

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/winnable-mahjong/`).

## Features

- **Layouts:** Turtle, Pyramid, Bridge, Fortress
- **Guaranteed winnable deals** via a geometric clearing order + matching tile assignment
- Undo, hint, timer, and score
- Static build — free hosting on GitHub Pages

## Scripts

| Command        | Description                |
| -------------- | -------------------------- |
| `npm run dev`  | Local development server   |
| `npm test`     | Engine unit tests          |
| `npm run build`| Production build to `dist` |
| `npm run preview` | Preview the production build |

## Deploy to GitHub Pages

1. Push this repo to GitHub as `winnable-mahjong` (or change `base` in `vite.config.ts` to match your repo name).
2. In the repo **Settings → Pages**, set source to **GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys.

Game URL: `https://<your-user>.github.io/winnable-mahjong/`
