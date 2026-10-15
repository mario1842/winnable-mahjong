import { isFree, type LayoutDefinition, type Slot } from './layout'
import {
  pairsForSlotCount,
  shuffleInPlace,
  type PlacedTile,
  type TilePair,
} from './tiles'

export interface GenerateOptions {
  random?: () => number
  maxAttempts?: number
}

/**
 * Generate a guaranteed-solvable board:
 * 1. Find a geometric clearing order (remove free slot pairs until empty).
 * 2. Assign matching tile faces along that play order.
 *
 * Playing the assigned pairs in reverse of placement order clears the board.
 */
export function generateBoard(
  layout: LayoutDefinition,
  options: GenerateOptions = {},
): PlacedTile[] {
  const random = options.random ?? Math.random
  const maxAttempts = options.maxAttempts ?? 80

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const order = findClearingOrder(layout.slots, random)
    if (!order) continue

    const pairs = pairsForSlotCount(layout.slots.length, random)
    return assignPairs(order, pairs)
  }

  throw new Error(
    `Could not generate a winnable board for layout "${layout.id}" after ${maxAttempts} attempts`,
  )
}

/** Removal sequence of slot pairs that empties the layout. */
function findClearingOrder(
  slots: readonly Slot[],
  random: () => number,
): [Slot, Slot][] | null {
  const remaining: Slot[] = slots.map((s) => ({ ...s }))
  const order: [Slot, Slot][] = []

  while (remaining.length > 0) {
    const free = remaining.filter((slot) => isFree(slot, remaining))
    if (free.length < 2) return null

    const shuffled = shuffleInPlace([...free], random)
    const a = shuffled[0]
    const b = shuffled[1]
    order.push([a, b])
    removeSlot(remaining, a)
    removeSlot(remaining, b)
  }

  return order
}

function removeSlot(list: Slot[], slot: Slot): void {
  const idx = list.findIndex((s) => s.x === slot.x && s.y === slot.y && s.z === slot.z)
  if (idx >= 0) list.splice(idx, 1)
}

function assignPairs(order: [Slot, Slot][], pairs: TilePair[]): PlacedTile[] {
  const placed: PlacedTile[] = []
  let id = 0

  // `order` is play order (first pair removed first). Assign faces so those
  // matching pairs are exactly the ones removed at each step.
  for (let i = 0; i < order.length; i++) {
    const [slotA, slotB] = order[i]
    const [kindA, kindB] = pairs[i]
    placed.push(
      { id: `t${++id}`, kind: kindA, x: slotA.x, y: slotA.y, z: slotA.z },
      { id: `t${++id}`, kind: kindB, x: slotB.x, y: slotB.y, z: slotB.z },
    )
  }

  return placed
}
