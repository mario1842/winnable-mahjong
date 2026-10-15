import { tileGlyph } from '../engine/display'
import { rankOf, suitOf, type TileKind } from '../engine/tiles'

interface TileFaceProps {
  kind: TileKind
}

export function TileFace({ kind }: TileFaceProps) {
  const suit = suitOf(kind)
  const rank = rankOf(kind)

  if (suit === 'dot') {
    return (
      <>
        <DotPattern count={Number(rank)} />
        <span className="suit-mark">○</span>
      </>
    )
  }

  if (suit === 'bamboo' && rank !== '1') {
    return (
      <>
        <BambooPattern count={Number(rank)} />
        <span className="suit-mark">竹</span>
      </>
    )
  }

  return (
    <>
      <span className="glyph">{tileGlyph(kind)}</span>
      <span className="suit-mark">{suitMark(kind)}</span>
    </>
  )
}

function suitMark(kind: TileKind): string {
  const suit = suitOf(kind)
  if (suit === 'character') return '萬'
  if (suit === 'bamboo') return '竹'
  return ''
}

function DotPattern({ count }: { count: number }) {
  return (
    <span className={`pip-grid pip-${count}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="pip" />
      ))}
    </span>
  )
}

function BambooPattern({ count }: { count: number }) {
  return (
    <span className={`bamboo-grid bamboo-${count}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="stalk" />
      ))}
    </span>
  )
}
