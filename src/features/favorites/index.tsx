import { Heart } from 'lucide-react'

export interface FavoritesFeatureProps {
  eventId?: string
  isFavorite?: boolean
  onToggle?: (eventId: string) => void
  mode?: 'card' | 'toolbar'
}

export function FavoritesFeature({ mode = 'toolbar' }: FavoritesFeatureProps) {
  return (
    <button className={mode === 'card' ? 'icon-button' : 'feature-button'} type="button" disabled title="준비 중인 기능">
      <Heart size={18} aria-hidden="true" />
      {mode === 'toolbar' && <span>즐겨찾기 <small>준비 중</small></span>}
      <span className="sr-only">즐겨찾기 기능 준비 중</span>
    </button>
  )
}
