import { Star } from 'lucide-react'
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'today-what-to-do:favorites'
const FAVORITES_CHANGED_EVENT = 'today-what-to-do:favorites-changed'

export interface FavoritesFeatureProps {
  eventId?: string
  isFavorite?: boolean
  onToggle?: (eventId: string) => void
  mode?: 'card' | 'toolbar'
}

function readFavoritesSnapshot() {
  if (typeof window === 'undefined') return '[]'

  try {
    const storedValue: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(storedValue)) return '[]'

    return JSON.stringify([...new Set(storedValue.filter((id): id is string => typeof id === 'string'))].sort())
  } catch {
    return '[]'
  }
}

function subscribeToFavorites(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onStoreChange()
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(FAVORITES_CHANGED_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(FAVORITES_CHANGED_EVENT, onStoreChange)
  }
}

function useFavoriteIds() {
  const snapshot = useSyncExternalStore(subscribeToFavorites, readFavoritesSnapshot, () => '[]')
  return JSON.parse(snapshot) as string[]
}

function toggleStoredFavorite(eventId: string, favoriteIds: string[]) {
  const nextFavoriteIds = favoriteIds.includes(eventId)
    ? favoriteIds.filter((id) => id !== eventId)
    : [...favoriteIds, eventId]

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavoriteIds))
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT))
}

export function FavoritesFeature({ eventId, isFavorite, onToggle, mode = 'toolbar' }: FavoritesFeatureProps) {
  const favoriteIds = useFavoriteIds()

  if (mode === 'toolbar') {
    return (
      <span className="feature-button" role="status" aria-live="polite">
        <Star size={18} aria-hidden="true" fill={favoriteIds.length ? 'currentColor' : 'none'} />
        <span>즐겨찾기 <small>{favoriteIds.length}개</small></span>
      </span>
    )
  }

  if (!eventId) return null

  const favorite = isFavorite ?? favoriteIds.includes(eventId)
  const action = favorite ? '해제' : '추가'

  return (
    <button
      className="icon-button"
      type="button"
      aria-label={`${eventId} 즐겨찾기 ${action}`}
      aria-pressed={favorite}
      title={`즐겨찾기 ${action}`}
      onClick={() => onToggle ? onToggle(eventId) : toggleStoredFavorite(eventId, favoriteIds)}
      style={{ cursor: 'pointer', color: favorite ? '#f2744c' : undefined }}
    >
      <Star size={18} aria-hidden="true" fill={favorite ? 'currentColor' : 'none'} />
    </button>
  )
}
