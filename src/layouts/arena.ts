import type { LayoutDefinition } from '../engine/layout'
import { rect, row } from './helpers'

/** Hollow arena with a stacked center — 120 tiles. */
export const arenaLayout: LayoutDefinition = {
  id: 'arena',
  name: 'Arena',
  description: 'A ring of walls around a rising central stage.',
  slots: [
    // Outer ring
    ...row(0, 0, 0, 10),
    ...row(0, 16, 0, 10),
    ...rect(0, 2, 0, 2, 7),
    ...rect(16, 2, 0, 2, 7),
    // Mid ring
    ...row(4, 4, 0, 6),
    ...row(4, 12, 0, 6),
    ...rect(4, 6, 0, 2, 3),
    ...rect(12, 6, 0, 2, 3),
    // Corner towers
    ...rect(0, 0, 1, 2, 2),
    ...rect(16, 0, 1, 2, 2),
    ...rect(0, 14, 1, 2, 2),
    ...rect(16, 14, 1, 2, 2),
    // Ring tops
    ...row(4, 0, 1, 6),
    ...row(4, 16, 1, 6),
    ...rect(0, 4, 1, 2, 5),
    ...rect(16, 4, 1, 2, 5),
    // Center stage
    ...rect(6, 6, 1, 4, 3),
    ...rect(7, 7, 2, 3, 2),
    ...rect(8, 7, 3, 2, 2),
  ],
}
