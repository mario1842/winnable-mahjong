import type { LayoutDefinition } from '../engine/layout'
import { arenaLayout } from './arena'
import { bridgeLayout } from './bridge'
import { crossLayout } from './cross'
import { fishLayout } from './fish'
import { fortressLayout } from './fortress'
import { pyramidLayout } from './pyramid'
import { spiderLayout } from './spider'
import { turtleLayout } from './turtle'

export const layouts: LayoutDefinition[] = [
  turtleLayout,
  pyramidLayout,
  bridgeLayout,
  fortressLayout,
  fishLayout,
  crossLayout,
  arenaLayout,
  spiderLayout,
]

export function getLayout(id: string): LayoutDefinition {
  const found = layouts.find((l) => l.id === id)
  if (!found) throw new Error(`Unknown layout: ${id}`)
  return found
}

export {
  arenaLayout,
  bridgeLayout,
  crossLayout,
  fishLayout,
  fortressLayout,
  pyramidLayout,
  spiderLayout,
  turtleLayout,
}
