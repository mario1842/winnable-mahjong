import type { CSSProperties } from 'react'
import { tileAccentClass, tileGlyph, tileSuitLabel } from '../engine/display'
import { TILE_H, TILE_W } from '../engine/layout'
import type { PlacedTile } from '../engine/tiles'
import { TileFace } from './TileFace'

interface TileViewProps {
  tile: PlacedTile
  free: boolean
  selected: boolean
  hinted: boolean
  clearing: boolean
  burstIndex: number
  left: number
  top: number
  zIndex: number
  onSelect: (id: string) => void
}

const SHARD_COUNT = 8

export function TileView({
  tile,
  free,
  selected,
  hinted,
  clearing,
  burstIndex,
  left,
  top,
  zIndex,
  onSelect,
}: TileViewProps) {
  const className = [
    'tile',
    tileAccentClass(tile.kind),
    free ? 'free' : 'blocked',
    selected ? 'selected' : '',
    hinted ? 'hint' : '',
    clearing ? 'clearing' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={className}
      style={
        {
          left,
          top,
          zIndex,
          '--burst-dir': burstIndex === 0 ? -1 : 1,
        } as CSSProperties
      }
      disabled={!free || clearing}
      aria-label={`${tileSuitLabel(tile.kind)} ${tileGlyph(tile.kind)}${free ? '' : ' (blocked)'}`}
      onClick={() => onSelect(tile.id)}
    >
      <span className="tile-inner">
        <TileFace kind={tile.kind} />
      </span>
      {clearing && (
        <span className="burst" aria-hidden="true">
          {Array.from({ length: SHARD_COUNT }, (_, i) => (
            <span
              key={i}
              className="shard"
              style={{ '--shard-i': i } as CSSProperties}
            />
          ))}
        </span>
      )}
    </button>
  )
}

/** CSS pixel size helpers for board layout. */
export function tilePixelSize(): { w: number; h: number } {
  if (typeof window === 'undefined') {
    return { w: 66, h: 87 }
  }
  const styles = getComputedStyle(document.documentElement)
  const w = parseFloat(styles.getPropertyValue('--tile-w')) || 66
  const h = parseFloat(styles.getPropertyValue('--tile-h')) || 87
  return { w, h }
}

/** Layer offset in px — stacks go up/left so the face covers tiles below;
 *  the right/bottom bevel then sits over the lower tile. */
export const LAYER_DEPTH = 9

export function gridToPixels(
  x: number,
  y: number,
  z: number,
  minX: number,
  minY: number,
  tileW: number,
  tileH: number,
  maxZ = 0,
): { left: number; top: number } {
  const cellW = tileW / TILE_W
  const cellH = tileH / TILE_H
  // Pad by maxZ so left/up offsets never go negative.
  return {
    left: (x - minX) * cellW + (maxZ - z) * LAYER_DEPTH,
    top: (y - minY) * cellH + (maxZ - z) * LAYER_DEPTH,
  }
}
