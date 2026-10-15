import type { LayoutDefinition } from '../engine/layout'
import { rect, row } from './helpers'

/** Fish silhouette — 108 tiles. */
export const fishLayout: LayoutDefinition = {
  id: 'fish',
  name: 'Fish',
  description: 'A swimming shape with body, fins, and a pointed tail.',
  slots: [
    // Body (oval-ish)
    ...row(4, 2, 0, 8),
    ...row(2, 4, 0, 10),
    ...row(2, 6, 0, 10),
    ...row(2, 8, 0, 10),
    ...row(4, 10, 0, 8),
    // Upper fin
    ...row(8, 0, 0, 3),
    { x: 10, y: -2, z: 0 },
    // Lower fin
    ...row(8, 12, 0, 3),
    { x: 10, y: 14, z: 0 },
    // Tail
    ...row(20, 3, 0, 2),
    ...row(22, 5, 0, 3),
    ...row(22, 7, 0, 3),
    ...row(20, 9, 0, 2),
    { x: 26, y: 4, z: 0 },
    { x: 28, y: 6, z: 0 },
    { x: 26, y: 8, z: 0 },
    // Mid layer body
    ...rect(6, 4, 1, 6, 3),
    ...row(8, 3, 1, 4),
    ...row(8, 10, 1, 4),
    // Top ridge
    ...rect(8, 5, 2, 4, 2),
    ...row(10, 4, 2, 2),
    ...row(10, 9, 2, 2),
    // Eye / peak
    { x: 6, y: 6, z: 2 },
    { x: 10, y: 6, z: 3 },
    { x: 12, y: 6, z: 3 },
  ],
}
