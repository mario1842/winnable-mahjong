import type { LayoutDefinition } from '../engine/layout'
import { rect, row } from './helpers'

/** Hollow square fortress with corner towers — 128 tiles. */
export const fortressLayout: LayoutDefinition = {
  id: 'fortress',
  name: 'Fortress',
  description: 'Walls and corner keeps around an open courtyard.',
  slots: [
    // Outer walls
    ...row(0, 0, 0, 10),
    ...row(0, 16, 0, 10),
    ...rect(0, 2, 0, 2, 7),
    ...rect(16, 2, 0, 2, 7),
    // Inner ring
    ...row(4, 4, 0, 6),
    ...row(4, 12, 0, 6),
    ...rect(4, 6, 0, 2, 3),
    ...rect(12, 6, 0, 2, 3),
    // Corner towers (stacked)
    ...rect(0, 0, 1, 2, 2),
    ...rect(16, 0, 1, 2, 2),
    ...rect(0, 14, 1, 2, 2),
    ...rect(16, 14, 1, 2, 2),
    ...rect(0, 0, 2, 2, 2),
    ...rect(16, 0, 2, 2, 2),
    ...rect(0, 14, 2, 2, 2),
    ...rect(16, 14, 2, 2, 2),
    // Gatehouses
    ...row(6, 0, 1, 4),
    ...row(6, 16, 1, 4),
    ...rect(0, 6, 1, 2, 3),
    ...rect(16, 6, 1, 2, 3),
    // Courtyard platforms
    ...rect(6, 6, 1, 4, 3),
    ...rect(8, 7, 2, 2, 2),
  ],
}
