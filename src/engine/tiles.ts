/** Tile face identity used for matching. */
export type TileKind =
  | `dot-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `bamboo-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `character-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `wind-${'east' | 'south' | 'west' | 'north'}`
  | `dragon-${'red' | 'green' | 'white'}`
  | `flower-${1 | 2 | 3 | 4}`
  | `season-${1 | 2 | 3 | 4}`

export type TileSuit =
  | 'dot'
  | 'bamboo'
  | 'character'
  | 'wind'
  | 'dragon'
  | 'flower'
  | 'season'

export interface PlacedTile {
  id: string
  kind: TileKind
  x: number
  y: number
  z: number
}

export type TilePair = readonly [TileKind, TileKind]

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const
const WINDS = ['east', 'south', 'west', 'north'] as const
const DRAGONS = ['red', 'green', 'white'] as const

/** All 72 matching pairs from a standard 144-tile set. */
export function createAllPairs(): TilePair[] {
  const pairs: TilePair[] = []

  for (const n of NUMBERS) {
    for (let copy = 0; copy < 2; copy++) {
      pairs.push([`dot-${n}`, `dot-${n}`])
      pairs.push([`bamboo-${n}`, `bamboo-${n}`])
      pairs.push([`character-${n}`, `character-${n}`])
    }
  }

  for (const w of WINDS) {
    for (let copy = 0; copy < 2; copy++) {
      pairs.push([`wind-${w}`, `wind-${w}`])
    }
  }

  for (const d of DRAGONS) {
    for (let copy = 0; copy < 2; copy++) {
      pairs.push([`dragon-${d}`, `dragon-${d}`])
    }
  }

  // Any flower matches any flower; any season matches any season.
  pairs.push(['flower-1', 'flower-2'], ['flower-3', 'flower-4'])
  pairs.push(['season-1', 'season-2'], ['season-3', 'season-4'])

  return pairs
}

export function tilesMatch(a: TileKind, b: TileKind): boolean {
  if (a === b) return true
  const suitA = suitOf(a)
  const suitB = suitOf(b)
  if (suitA === 'flower' && suitB === 'flower') return true
  if (suitA === 'season' && suitB === 'season') return true
  return false
}

export function suitOf(kind: TileKind): TileSuit {
  return kind.split('-')[0] as TileSuit
}

export function rankOf(kind: TileKind): string {
  return kind.split('-').slice(1).join('-')
}

/** Select N/2 pairs for a layout with N slots (N even, ≤ 144). */
export function pairsForSlotCount(
  slotCount: number,
  random: () => number = Math.random,
): TilePair[] {
  if (slotCount % 2 !== 0) {
    throw new Error(`Layout slot count must be even, got ${slotCount}`)
  }
  if (slotCount > 144 || slotCount < 2) {
    throw new Error(`Layout slot count out of range: ${slotCount}`)
  }

  const pairs = shuffleInPlace(createAllPairs(), random)
  return pairs.slice(0, slotCount / 2)
}

export function shuffleInPlace<T>(items: T[], random: () => number = Math.random): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}
