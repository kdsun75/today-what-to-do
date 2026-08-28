import { Calendar, Clock3, MapPin } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { FavoritesFeature } from '../features/favorites'
import { IcsDownloadFeature } from '../features/ics-download'
import type { LocalEvent } from '../types'

export function EventCard({ event }: { event: LocalEvent }) {
  const date = parseISO(event.date)
  const dateLabel = format(date, 'M월 d일 EEEE', { locale: ko })

  return (
    <article className="event-card">
      <div className="card-visual" style={{ '--accent': event.accent } as React.CSSProperties}>
        <span className="category-chip">{event.category}</span>
        <span className="event-emoji" aria-hidden="true">{event.emoji}</span>
        <div className="card-actions"><FavoritesFeature eventId={event.id} mode="card" /><IcsDownloadFeature event={event} mode="card" /></div>
      </div>
      <div className="card-body">
        <p className="neighborhood">{event.neighborhood}</p>
        <h2>{event.title}</h2>
        <p className="description">{event.description}</p>
        <div className="event-meta">
          <span><Calendar size={16} />{dateLabel}{event.endDate ? '부터' : ''}</span>
          <span><Clock3 size={16} />{event.time}</span>
          <span><MapPin size={16} />{event.location}</span>
        </div>
        <div className="card-footer"><strong>{event.price}</strong><span>자세히 보기 →</span></div>
      </div>
    </article>
  )
}
