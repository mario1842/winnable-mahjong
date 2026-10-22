import type { ReactNode } from 'react'
import { FlowIcon } from './FlowIcon'
import { MineIcon } from './MineIcon'
import { SolitaireIcon } from './SolitaireIcon'

const GAMES: readonly {
  id: string
  href: string
  title: string
  menuLabel: ReactNode
  icon: ReactNode
}[] = [
  {
    id: 'solitaire',
    href: 'https://mario1842.github.io/winnable-solitaire/',
    title: 'Winnable Solitaire',
    menuLabel: (
      <>
        Also play <strong>Winnable Solitaire</strong>
      </>
    ),
    icon: <SolitaireIcon className="solitaire-icon" />,
  },
  {
    id: 'minesweeper',
    href: 'https://mario1842.github.io/winnable-minesweeper/',
    title: 'Winnable Minesweeper',
    menuLabel: (
      <>
        Also play <strong>Winnable Minesweeper</strong>
      </>
    ),
    icon: <MineIcon className="mine-icon" />,
  },
  {
    id: 'flow',
    href: 'https://mario1842.github.io/flow-of-the-elements/',
    title: 'Flow of the Elements',
    menuLabel: (
      <>
        Also play <strong>Flow of the Elements</strong>
      </>
    ),
    icon: <FlowIcon className="flow-icon" />,
  },
]

interface SisterGamesProps {
  /** Larger labeled chips (menu) vs compact icon row (HUD). */
  variant?: 'menu' | 'hud'
}

export function SisterGames({ variant = 'menu' }: SisterGamesProps) {
  return (
    <nav
      className={`sister-games sister-games-${variant}`}
      aria-label="Other Winnable games"
    >
      {GAMES.map((game) => (
        <a
          key={game.id}
          className={variant === 'hud' ? 'btn btn-ghost sister-btn icon-btn' : 'sister-link'}
          href={game.href}
          title={game.title}
          aria-label={`Play ${game.title}`}
        >
          {game.icon}
          {variant === 'menu' ? <span>{game.menuLabel}</span> : null}
        </a>
      ))}
    </nav>
  )
}
