import { formatTime, remainingCount, type GameState } from '../engine/game'

interface HudProps {
  state: GameState
  onUndo: () => void
  onHint: () => void
  onNewGame: () => void
  onChangeLayout: () => void
}

export function Hud({ state, onUndo, onHint, onNewGame, onChangeLayout }: HudProps) {
  return (
    <header className="hud">
      <div className="hud-stats">
        <div className="stat">
          <label>Layout</label>
          <strong>{state.layoutName}</strong>
        </div>
        <div className="stat">
          <label>Time</label>
          <strong>{formatTime(state.elapsedMs)}</strong>
        </div>
        <div className="stat">
          <label>Score</label>
          <strong>{state.score}</strong>
        </div>
        <div className="stat">
          <label>Left</label>
          <strong>{remainingCount(state)}</strong>
        </div>
      </div>
      <div className="hud-actions">
        <button type="button" className="btn" onClick={onUndo} disabled={state.history.length === 0}>
          Undo
        </button>
        <button
          type="button"
          className="btn"
          onClick={onHint}
          disabled={state.status !== 'playing' || state.clearingIds.length > 0}
          title="Shortcut: H"
        >
          Hint <kbd className="key">H</kbd>
        </button>
        <button type="button" className="btn" onClick={onNewGame}>
          New deal
        </button>
        <button type="button" className="btn btn-ghost" onClick={onChangeLayout}>
          Layouts
        </button>
      </div>
    </header>
  )
}
