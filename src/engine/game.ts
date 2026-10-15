import { freeTiles, isFree } from './layout'
import { tilesMatch, type PlacedTile, type TileKind } from './tiles'

export const MATCH_SCORE = 100
export const STREAK_BONUS = 25
export const HINT_PENALTY = 50
export const UNDO_PENALTY = 15

export type GameStatus = 'playing' | 'won' | 'stuck'

export interface GameState {
  tiles: PlacedTile[]
  selectedId: string | null
  hintIds: string[]
  /** Pair currently playing the clear/burst animation. */
  clearingIds: string[]
  history: PlacedTile[][]
  score: number
  matches: number
  streak: number
  elapsedMs: number
  status: GameStatus
  layoutId: string
  layoutName: string
}

export const CLEAR_ANIMATION_MS = 420

export function createGame(
  tiles: PlacedTile[],
  layoutId: string,
  layoutName: string,
): GameState {
  return {
    tiles,
    selectedId: null,
    hintIds: [],
    clearingIds: [],
    history: [],
    score: 0,
    matches: 0,
    streak: 0,
    elapsedMs: 0,
    status: deriveStatus(tiles),
    layoutId,
    layoutName,
  }
}

export function deriveStatus(tiles: readonly PlacedTile[]): GameStatus {
  if (tiles.length === 0) return 'won'
  if (findHintPair(tiles) === null) return 'stuck'
  return 'playing'
}

export function findHintPair(
  tiles: readonly PlacedTile[],
): [PlacedTile, PlacedTile] | null {
  const free = freeTiles(tiles)
  for (let i = 0; i < free.length; i++) {
    for (let j = i + 1; j < free.length; j++) {
      if (tilesMatch(free[i].kind, free[j].kind)) {
        return [free[i], free[j]]
      }
    }
  }
  return null
}

export function selectTile(state: GameState, tileId: string): GameState {
  if (state.status !== 'playing' || state.clearingIds.length > 0) return state

  const tile = state.tiles.find((t) => t.id === tileId)
  if (!tile || !isFree(tile, state.tiles)) return state

  // Deselect
  if (state.selectedId === tileId) {
    return { ...state, selectedId: null, hintIds: [] }
  }

  // First selection
  if (state.selectedId === null) {
    return { ...state, selectedId: tileId, hintIds: [] }
  }

  const selected = state.tiles.find((t) => t.id === state.selectedId)
  if (!selected) {
    return { ...state, selectedId: tileId, hintIds: [] }
  }

  if (!tilesMatch(selected.kind, tile.kind)) {
    return { ...state, selectedId: tileId, hintIds: [] }
  }

  return beginClear(state, selected.id, tile.id)
}

/** Start clear animation; tiles stay until `completeClear`. */
function beginClear(state: GameState, idA: string, idB: string): GameState {
  return {
    ...state,
    selectedId: null,
    hintIds: [],
    clearingIds: [idA, idB],
    history: [...state.history, state.tiles],
  }
}

/** Finish clear after burst animation — remove tiles and award score. */
export function completeClear(state: GameState): GameState {
  if (state.clearingIds.length === 0) return state

  const clearing = new Set(state.clearingIds)
  const tiles = state.tiles.filter((t) => !clearing.has(t.id))
  const streak = state.streak + 1
  const score =
    state.score + MATCH_SCORE + Math.max(0, streak - 1) * STREAK_BONUS

  return {
    ...state,
    tiles,
    clearingIds: [],
    score,
    matches: state.matches + 1,
    streak,
    status: deriveStatus(tiles),
  }
}

export function undo(state: GameState): GameState {
  if (state.clearingIds.length > 0 || state.history.length === 0) return state
  const history = [...state.history]
  const tiles = history.pop()!
  return {
    ...state,
    tiles,
    history,
    selectedId: null,
    hintIds: [],
    clearingIds: [],
    score: Math.max(0, state.score - UNDO_PENALTY),
    matches: Math.max(0, state.matches - 1),
    streak: 0,
    status: deriveStatus(tiles),
  }
}

export function applyHint(state: GameState): GameState {
  if (state.status !== 'playing' || state.clearingIds.length > 0) return state
  const active = state.tiles.filter((t) => !state.clearingIds.includes(t.id))
  const pair = findHintPair(active)
  if (!pair) return { ...state, status: 'stuck' }

  return {
    ...state,
    selectedId: null,
    hintIds: [pair[0].id, pair[1].id],
    score: Math.max(0, state.score - HINT_PENALTY),
    streak: 0,
  }
}

export function tick(state: GameState, deltaMs: number): GameState {
  if (state.status !== 'playing') return state
  return { ...state, elapsedMs: state.elapsedMs + deltaMs }
}

export function remainingCount(state: GameState): number {
  return state.tiles.length
}

export function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function kindLabel(kind: TileKind): string {
  return kind
}
