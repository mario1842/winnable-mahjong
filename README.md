# Winnable Mahjong

Mahjong Solitaire in the browser where **every deal is guaranteed solvable**. Pick a layout, match free tiles, and clear the board — no reshuffles required to make the puzzle possible.

**Play online:** [https://mario1842.github.io/winnable-mahjong/](https://mario1842.github.io/winnable-mahjong/)

Also play:
- **[Winnable Solitaire](https://mario1842.github.io/winnable-solitaire/)**
- **[Winnable Minesweeper](https://mario1842.github.io/winnable-minesweeper/)**

## Play locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/winnable-mahjong/`).

## Features

- **8 layouts** with different shapes and tile counts:
  | Layout   | Tiles | Style                          |
  | -------- | ----- | ------------------------------ |
  | Turtle   | 144   | Classic mountain               |
  | Pyramid  | 98    | Stacked triangle               |
  | Bridge   | 106   | Twin pillars + crossing        |
  | Fortress | 140   | Walls around a courtyard       |
  | Fish     | 108   | Body, fins, and tail           |
  | Cross    | 136   | Four arms, raised center       |
  | Arena    | 142   | Ring with a central stage      |
  | Spider   | 92    | Dense body with long legs      |
- **Guaranteed winnable deals** — geometric clearing order + matching tile assignment
- Undo, hint (**`H`** key), timer, and score
- Match burst animation + sound effects
- Responsive board (desktop zoom stays large; phones zoom out to fit)
- Static build — free hosting on GitHub Pages

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Local development server     |
| `npm test`        | Engine unit tests            |
| `npm run build`   | Production build to `dist`   |
| `npm run preview` | Preview the production build |

## Deploy to GitHub Pages

1. Push this repo to GitHub as `winnable-mahjong` (or change `base` in `vite.config.ts` to match your repo name).
2. In the repo **Settings → Pages**, set source to **GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys.

Game URL: `https://mario1842.github.io/winnable-mahjong/`
