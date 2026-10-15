import type { PlacedTile } from './tiles'

/** Empty slot in a layout (half-tile grid units; each tile is 2×2). */
export interface Slot {
  x: number
  y: number
  z: number
}

export interface LayoutDefinition {
  id: string
  name: string
  description: string
  slots: Slot[]
}

export const TILE_W = 2
export const TILE_H = 2

export function slotsOverlap(a: Slot, b: Slot): boolean {
  return (
    a.x < b.x + TILE_W &&
    a.x + TILE_W > b.x &&
    a.y < b.y + TILE_H &&
    a.y + TILE_H > b.y
  )
}

function yOverlaps(a: Slot, b: Slot): boolean {
  return a.y < b.y + TILE_H && a.y + TILE_H > b.y
}

export function hasTileAbove(slot: Slot, occupied: readonly Slot[]): boolean {
  return occupied.some((other) => other.z > slot.z && slotsOverlap(slot, other))
}

export function isLeftBlocked(slot: Slot, occupied: readonly Slot[]): boolean {
  return occupied.some(
    (other) =>
      other.z === slot.z && other.x + TILE_W === slot.x && yOverlaps(slot, other),
  )
}

export function isRightBlocked(slot: Slot, occupied: readonly Slot[]): boolean {
  return occupied.some(
    (other) =>
      other.z === slot.z && slot.x + TILE_W === other.x && yOverlaps(slot, other),
  )
}

/** A tile/slot is free if nothing covers it and at least one side is open. */
export function isFree(slot: Slot, occupied: readonly Slot[]): boolean {
  if (hasTileAbove(slot, occupied)) return false
  return !isLeftBlocked(slot, occupied) || !isRightBlocked(slot, occupied)
}

export function freeTiles(tiles: readonly PlacedTile[]): PlacedTile[] {
  return tiles.filter((tile) => isFree(tile, tiles))
}

export function layoutBounds(slots: readonly Slot[]): {
  minX: number
  maxX: number
  minY: number
  maxY: number
  maxZ: number
} {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  let maxZ = 0

  for (const s of slots) {
    minX = Math.min(minX, s.x)
    maxX = Math.max(maxX, s.x + TILE_W)
    minY = Math.min(minY, s.y)
    maxY = Math.max(maxY, s.y + TILE_H)
    maxZ = Math.max(maxZ, s.z)
  }

  return { minX, maxX, minY, maxY, maxZ }
}
