import type { LayoutDefinition } from '../engine/layout'
import { rect, row } from './helpers'

/** Symmetrical cross — 112 tiles. */
export const crossLayout: LayoutDefinition = {
  id: 'cross',
  name: 'Cross',
  description: 'Four arms meeting in a raised center.',
  slots: [
    // Vertical beam
    ...rect(6, 0, 0, 4, 10),
    // Horizontal beam
    ...rect(0, 6, 0, 3, 4),
    ...rect(14, 6, 0, 3, 4),
    // Layer 1 — thicker cross
    ...rect(6, 2, 1, 4, 8),
    ...rect(2, 6, 1, 2, 4),
    ...rect(14, 6, 1, 2, 4),
    // Layer 2 — center hub
    ...rect(6, 4, 2, 4, 4),
    ...row(4, 6, 2, 1),
    ...row(4, 8, 2, 1),
    ...row(14, 6, 2, 1),
    ...row(14, 8, 2, 1),
    // Apex
    ...rect(8, 6, 3, 2, 2),
  ],
}
