import { useEffect, useMemo, useState } from 'react'
import { isFree, layoutBounds, TILE_H, TILE_W } from '../engine/layout'
import type { PlacedTile } from '../engine/tiles'
import { gridToPixels, TileView, tilePixelSize } from './TileView'

interface BoardProps {
  tiles: PlacedTile[]
  selectedId: string | null
  hintIds: string[]
  clearingIds: string[]
  onSelect: (id: string) => void
}

export function Board({
  tiles,
  selectedId,
  hintIds,
  clearingIds,
  onSelect,
}: BoardProps) {
  const [size, setSize] = useState(() => tilePixelSize())

  useEffect(() => {
    const sync = () => setSize(tilePixelSize())
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  const bounds = useMemo(
    () => (tiles.length > 0 ? layoutBounds(tiles) : null),
    [tiles],
  )

  const sorted = useMemo(
    () =>
      [...tiles].sort((a, b) => {
        if (a.z !== b.z) return a.z - b.z
        if (a.y !== b.y) return a.y - b.y
        return a.x - b.x
      }),
    [tiles],
  )

  if (!bounds) {
    return <div className="board-wrap" />
  }

  const depth = size.depth
  const width =
    (bounds.maxX - bounds.minX) * (size.w / TILE_W) +
    bounds.maxZ * depth +
    size.w +
    depth
  const height =
    (bounds.maxY - bounds.minY) * (size.h / TILE_H) +
    bounds.maxZ * depth +
    size.h +
    depth

  return (
    <div className="board-wrap">
      <div className="board" style={{ width, height }} role="group" aria-label="Mahjong board">
        {sorted.map((tile) => {
          const { left, top } = gridToPixels(
            tile.x,
            tile.y,
            tile.z,
            bounds.minX,
            bounds.minY,
            size.w,
            size.h,
            bounds.maxZ,
            depth,
          )
          const free = isFree(tile, tiles)
          const clearing = clearingIds.includes(tile.id)
          const burstIndex = clearingIds.indexOf(tile.id)
          const base = tile.z * 1000 + tile.y * 40 + tile.x
          const zIndex = clearing
            ? 300000 + base
            : selectedId === tile.id
              ? 200000 + base
              : hintIds.includes(tile.id)
                ? 150000 + base
                : base

          return (
            <TileView
              key={tile.id}
              tile={tile}
              free={free}
              selected={selectedId === tile.id}
              hinted={hintIds.includes(tile.id)}
              clearing={clearing}
              burstIndex={burstIndex < 0 ? 0 : burstIndex}
              left={left}
              top={top}
              zIndex={zIndex}
              onSelect={onSelect}
            />
          )
        })}
      </div>
    </div>
  )
}
