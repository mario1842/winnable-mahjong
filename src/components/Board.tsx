import { useEffect, useMemo, useRef, useState } from 'react'
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
  const wrapRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(() => tilePixelSize())
  const [scale, setScale] = useState(1)

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

  const depth = size.depth
  const boardWidth = bounds
    ? (bounds.maxX - bounds.minX) * (size.w / TILE_W) +
      bounds.maxZ * depth +
      size.w +
      depth
    : 0
  const boardHeight = bounds
    ? (bounds.maxY - bounds.minY) * (size.h / TILE_H) +
      bounds.maxZ * depth +
      size.h +
      depth
    : 0

  // Fit the whole board into the available viewport (phones especially).
  useEffect(() => {
    const el = wrapRef.current
    if (!el || !bounds || boardWidth <= 0 || boardHeight <= 0) return

    const updateScale = () => {
      const style = getComputedStyle(el)
      const padX =
        (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0)
      const padY =
        (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0)
      const availW = Math.max(80, el.clientWidth - padX)
      const availH = Math.max(80, el.clientHeight - padY)
      const next = Math.min(1, availW / boardWidth, availH / boardHeight)
      setScale(Number.isFinite(next) && next > 0 ? next : 1)
    }

    updateScale()
    const ro = new ResizeObserver(updateScale)
    ro.observe(el)
    window.addEventListener('orientationchange', updateScale)
    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', updateScale)
    }
  }, [bounds, boardWidth, boardHeight])

  if (!bounds) {
    return <div className="board-wrap" ref={wrapRef} />
  }

  return (
    <div className="board-wrap" ref={wrapRef}>
      <div
        className="board-scale"
        style={{
          width: boardWidth * scale,
          height: boardHeight * scale,
        }}
      >
        <div
          className="board"
          style={{
            width: boardWidth,
            height: boardHeight,
            transform: `scale(${scale})`,
          }}
          role="group"
          aria-label="Mahjong board"
        >
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
    </div>
  )
}
