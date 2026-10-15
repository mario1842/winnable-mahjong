import type { LayoutDefinition } from '../engine/layout'
import { rect, row } from './helpers'

/** Spider with a dense body and long legs — 100 tiles. */
export const spiderLayout: LayoutDefinition = {
  id: 'spider',
  name: 'Spider',
  description: 'A heavy body with eight stretching legs.',
  slots: [
    // Body
    ...rect(8, 4, 0, 4, 4),
    ...rect(8, 4, 1, 4, 4),
    ...rect(9, 5, 2, 3, 3),
    ...rect(10, 6, 3, 2, 2),
    // Head
    ...row(9, 2, 0, 3),
    ...row(10, 1, 0, 2),
    { x: 10, y: 0, z: 0 },
    { x: 12, y: 0, z: 0 },
    // Legs — left
    ...row(0, 4, 0, 4),
    ...row(0, 6, 0, 4),
    ...row(2, 8, 0, 3),
    ...row(2, 10, 0, 3),
    { x: 0, y: 2, z: 0 },
    { x: 2, y: 2, z: 0 },
    { x: 0, y: 12, z: 0 },
    { x: 2, y: 12, z: 0 },
    // Legs — right
    ...row(16, 4, 0, 4),
    ...row(16, 6, 0, 4),
    ...row(16, 8, 0, 3),
    ...row(16, 10, 0, 3),
    { x: 20, y: 2, z: 0 },
    { x: 22, y: 2, z: 0 },
    { x: 20, y: 12, z: 0 },
    { x: 22, y: 12, z: 0 },
    // Leg joints raised
    ...row(6, 5, 1, 1),
    ...row(6, 7, 1, 1),
    ...row(16, 5, 1, 1),
    ...row(16, 7, 1, 1),
  ],
}
