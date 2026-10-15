import type { LayoutDefinition } from '../engine/layout'
import { rect, row } from './helpers'

/** Two towers with a spanning bridge — 96 tiles. */
export const bridgeLayout: LayoutDefinition = {
  id: 'bridge',
  name: 'Bridge',
  description: 'Twin pillars linked by a narrow crossing.',
  slots: [
    // Left pillar base
    ...rect(0, 0, 0, 4, 6),
    ...rect(2, 2, 1, 3, 4),
    ...rect(4, 4, 2, 2, 2),
    // Right pillar base
    ...rect(16, 0, 0, 4, 6),
    ...rect(16, 2, 1, 3, 4),
    ...rect(16, 4, 2, 2, 2),
    // Bridge deck
    ...row(4, 6, 0, 6),
    ...row(4, 8, 0, 6),
    ...row(6, 6, 1, 4),
    ...row(6, 8, 1, 4),
    ...row(8, 6, 2, 2),
    ...row(8, 8, 2, 2),
    // Keystone
    { x: 8, y: 7, z: 3 },
    { x: 10, y: 7, z: 3 },
  ],
}
