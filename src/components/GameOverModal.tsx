import { createPortal } from 'react-dom'
import { formatTime, type GameState } from '../engine/game'

interface GameOverModalProps {
  state: GameState
  onNewGame: () => void
  onChangeLayout: () => void
}

export function GameOverModal({ state, onNewGame, onChangeLayout }: GameOverModalProps) {
  if (state.status === 'playing') return null

  const won = state.status === 'won'

  return createPortal(
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="game-over-title">
      <div className="modal">
        <h2 id="game-over-title">{won ? 'Cleared!' : 'No moves left'}</h2>
        <p>
          {won
            ? 'You cleared a guaranteed-winnable board. Deal another?'
            : 'This deal was solvable — undo a few moves or try a fresh deal.'}
        </p>
        <div className="modal-stats">
          <div className="stat">
            <label>Time</label>
            <strong>{formatTime(state.elapsedMs)}</strong>
          </div>
          <div className="stat">
            <label>Score</label>
            <strong>{state.score}</strong>
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-primary" onClick={onNewGame}>
            New deal
          </button>
          <button type="button" className="btn" onClick={onChangeLayout}>
            Change layout
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
