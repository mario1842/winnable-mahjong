import type { LayoutDefinition } from '../engine/layout'
import { row } from './helpers'

/** Centered pyramid — 120 tiles. */
export const pyramidLayout: LayoutDefinition = {
  id: 'pyramid',
  name: 'Pyramid',
  description: 'A stacked triangle that narrows toward the peak.',
  slots: [
    // Base
    ...row(0, 0, 0, 10),
    ...row(1, 2, 0, 9),
    ...row(2, 4, 0, 8),
    ...row(3, 6, 0, 7),
    ...row(4, 8, 0, 6),
    ...row(5, 10, 0, 5),
    ...row(6, 12, 0, 4),
    ...row(7, 14, 0, 3),
    // Mid tier
    ...row(2, 2, 1, 7),
    ...row(3, 4, 1, 6),
    ...row(4, 6, 1, 5),
    ...row(5, 8, 1, 4),
    ...row(6, 10, 1, 3),
    ...row(7, 12, 1, 2),
    // Upper
    ...row(4, 4, 2, 5),
    ...row(5, 6, 2, 4),
    ...row(6, 8, 2, 3),
    ...row(7, 10, 2, 2),
    // Peak stack
    ...row(6, 6, 3, 3),
    ...row(7, 8, 3, 2),
  ],
}
