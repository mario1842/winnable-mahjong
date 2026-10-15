import type { Slot } from '../engine/layout'

/** Horizontal run of `count` tiles starting at (x, y, z). */
export function row(x: number, y: number, z: number, count: number): Slot[] {
  const slots: Slot[] = []
  for (let i = 0; i < count; i++) {
    slots.push({ x: x + i * 2, y, z })
  }
  return slots
}

/** Filled rectangle of tiles. */
export function rect(
  x: number,
  y: number,
  z: number,
  cols: number,
  rows: number,
): Slot[] {
  const slots: Slot[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      slots.push({ x: x + c * 2, y: y + r * 2, z })
    }
  }
  return slots
}
