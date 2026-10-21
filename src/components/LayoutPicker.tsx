import type { LayoutDefinition } from '../engine/layout'
import { MahjongIcon } from './MahjongIcon'
import { SisterGames } from './SisterGames'

interface LayoutPickerProps {
  layouts: LayoutDefinition[]
  onPick: (layout: LayoutDefinition) => void
}

export function LayoutPicker({ layouts, onPick }: LayoutPickerProps) {
  return (
    <div className="menu">
      <div className="brand">
        <MahjongIcon className="brand-mark" />
        <h1>
          Winnable
          <span>Mahjong</span>
        </h1>
        <p>
          Every board is generated to be solvable — no dead deals, no forced reshuffles.
        </p>
        <div className="guarantee" aria-hidden="true">
          Guaranteed winnable deals
        </div>
      </div>

      <div className="layout-grid">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            type="button"
            className="layout-card"
            onClick={() => onPick(layout)}
          >
            <h2>{layout.name}</h2>
            <p>{layout.description}</p>
            <span className="meta">{layout.slots.length} tiles</span>
          </button>
        ))}
      </div>

      <SisterGames variant="menu" />
    </div>
  )
}
