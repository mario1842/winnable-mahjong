import { describe, expect, it } from 'vitest'
import { layouts } from '../layouts'
import { freeTiles, isFree } from './layout'
import { generateBoard } from './generate'
import {
  applyHint,
  completeClear,
  createGame,
  findHintPair,
  selectTile,
  undo,
} from './game'
import { tilesMatch, createAllPairs } from './tiles'

describe('tiles', () => {
  it('has 72 pairs (144 tiles)', () => {
    expect(createAllPairs()).toHaveLength(72)
  })

  it('matches identical faces and flower/season groups', () => {
    expect(tilesMatch('dot-5', 'dot-5')).toBe(true)
    expect(tilesMatch('dot-5', 'dot-6')).toBe(false)
    expect(tilesMatch('flower-1', 'flower-4')).toBe(true)
    expect(tilesMatch('season-2', 'season-3')).toBe(true)
    expect(tilesMatch('flower-1', 'season-1')).toBe(false)
  })
})

describe('layouts', () => {
  it('all layouts have an even slot count ≤ 144', () => {
    for (const layout of layouts) {
      expect(layout.slots.length % 2, layout.id).toBe(0)
      expect(layout.slots.length).toBeGreaterThan(0)
      expect(layout.slots.length).toBeLessThanOrEqual(144)
    }
  })

  it('turtle has the classic 144 tiles', () => {
    expect(layouts.find((l) => l.id === 'turtle')!.slots.length).toBe(144)
  })
})

describe('generateBoard', () => {
  it('produces a full board with a solvable opening move for every layout', () => {
    for (const layout of layouts) {
      const board = generateBoard(layout, {
        random: mulberry32(layout.id.length * 999 + layout.slots.length),
        maxAttempts: 120,
      })
      expect(board.length).toBe(layout.slots.length)
      expect(findHintPair(board)).not.toBeNull()
      expect(freeTiles(board).length).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('gameplay', () => {
  it('selects, matches, undoes, and hints', () => {
    const layout = layouts[0]
    const board = generateBoard(layout, { random: mulberry32(42) })
    let state = createGame(board, layout.id, layout.name)

    const hint = findHintPair(state.tiles)
    expect(hint).not.toBeNull()

    state = selectTile(state, hint![0].id)
    expect(state.selectedId).toBe(hint![0].id)

    state = selectTile(state, hint![1].id)
    expect(state.clearingIds).toHaveLength(2)
    expect(state.tiles.length).toBe(board.length)

    state = completeClear(state)
    expect(state.tiles.length).toBe(board.length - 2)
    expect(state.matches).toBe(1)
    expect(state.score).toBeGreaterThan(0)
    expect(state.clearingIds).toHaveLength(0)

    state = undo(state)
    expect(state.tiles.length).toBe(board.length)
    expect(state.matches).toBe(0)

    state = applyHint(state)
    expect(state.hintIds).toHaveLength(2)
    for (const id of state.hintIds) {
      const tile = state.tiles.find((t) => t.id === id)!
      expect(isFree(tile, state.tiles)).toBe(true)
    }
  })
})

/** Deterministic PRNG for tests. */
function mulberry32(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}
