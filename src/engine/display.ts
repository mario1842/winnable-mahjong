import { suitOf, type TileKind } from './tiles'

const WIND_GLYPH: Record<string, string> = {
  east: '東',
  south: '南',
  west: '西',
  north: '北',
}

const DRAGON_GLYPH: Record<string, string> = {
  red: '中',
  green: '發',
  white: '白',
}

const FLOWER_GLYPH = ['梅', '蘭', '菊', '竹']
const SEASON_GLYPH = ['春', '夏', '秋', '冬']
const CHARACTER_GLYPH = ['一', '二', '三', '四', '五', '六', '七', '八', '九']

export function tileGlyph(kind: TileKind): string {
  const suit = suitOf(kind)
  const rank = kind.split('-').slice(1).join('-')

  switch (suit) {
    case 'wind':
      return WIND_GLYPH[rank] ?? '?'
    case 'dragon':
      return DRAGON_GLYPH[rank] ?? '?'
    case 'flower':
      return FLOWER_GLYPH[Number(rank) - 1] ?? '花'
    case 'season':
      return SEASON_GLYPH[Number(rank) - 1] ?? '季'
    case 'character':
      return CHARACTER_GLYPH[Number(rank) - 1] ?? rank
    case 'dot':
      return rank
    case 'bamboo':
      return rank === '1' ? '鳥' : rank
    default:
      return '?'
  }
}

export function tileAccentClass(kind: TileKind): string {
  const suit = suitOf(kind)
  if (suit === 'dragon' && kind.endsWith('red')) return 'accent-red'
  if (suit === 'dragon' && kind.endsWith('green')) return 'accent-green'
  if (suit === 'bamboo') return 'accent-green'
  if (suit === 'dot') return 'accent-blue'
  if (suit === 'character') return 'accent-red'
  if (suit === 'wind') return 'accent-ink'
  if (suit === 'flower') return 'accent-pink'
  if (suit === 'season') return 'accent-gold'
  return 'accent-ink'
}

export function tileSuitLabel(kind: TileKind): string {
  const suit = suitOf(kind)
  switch (suit) {
    case 'dot':
      return 'Circles'
    case 'bamboo':
      return 'Bamboo'
    case 'character':
      return 'Characters'
    case 'wind':
      return 'Wind'
    case 'dragon':
      return 'Dragon'
    case 'flower':
      return 'Flower'
    case 'season':
      return 'Season'
  }
}
