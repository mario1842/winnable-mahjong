import type { LayoutDefinition } from '../engine/layout'
import { rect, row } from './helpers'

/** Classic 144-tile Turtle (Shanghai) layout. */
export const turtleLayout: LayoutDefinition = {
  id: 'turtle',
  name: 'Turtle',
  description: 'The classic 144-tile mountain — deep and strategic.',
  slots: [
    // Layer 0 — shell
    ...row(2, 0, 0, 12),
    ...row(4, 2, 0, 8),
    ...row(2, 4, 0, 10),
    ...row(0, 6, 0, 12),
    ...row(0, 8, 0, 12),
    ...row(2, 10, 0, 10),
    ...row(4, 12, 0, 8),
    ...row(2, 14, 0, 12),
    // Side “fins”
    { x: -2, y: 6, z: 0 },
    { x: -2, y: 8, z: 0 },
    { x: 24, y: 6, z: 0 },
    { x: 24, y: 8, z: 0 },
    // Layer 1 — 6×6
    ...rect(4, 2, 1, 6, 6),
    // Layer 2 — 4×4
    ...rect(6, 4, 2, 4, 4),
    // Layer 3 — 2×2 apex
    ...rect(8, 6, 3, 2, 2),
  ],
}
