import { CalendarDays } from 'lucide-react'
import { addDays, format, getDay, isWithinInterval, parseISO, startOfDay } from 'date-fns'
import type { LocalEvent } from '../../types'
import './weekend.css'

export interface WeekendFeatureProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export interface WeekendRange {
  saturday: Date
  sunday: Date
}

/** Returns the current weekend on Sunday, otherwise the next Saturday and Sunday. */
export function getNearestWeekend(now: Date): WeekendRange {
  const today = startOfDay(now)
  const day = getDay(today)
  const daysUntilSaturday = day === 0 ? -1 : 6 - day
  const saturday = addDays(today, daysUntilSaturday)

  return { saturday, sunday: addDays(saturday, 1) }
}

export function isEventOnWeekend(
  event: Pick<LocalEvent, 'date' | 'endDate'>,
  weekend: WeekendRange,
): boolean {
  const eventStart = startOfDay(parseISO(event.date))
  const eventEnd = startOfDay(parseISO(event.endDate ?? event.date))

  return (
    isWithinInterval(weekend.saturday, { start: eventStart, end: eventEnd }) ||
    isWithinInterval(weekend.sunday, { start: eventStart, end: eventEnd })
  )
}

export function filterEventsForNearestWeekend(events: LocalEvent[], now: Date): LocalEvent[] {
  const weekend = getNearestWeekend(now)
  return events.filter((event) => isEventOnWeekend(event, weekend))
}

export function WeekendFeature({ enabled, onChange }: WeekendFeatureProps) {
  return (
    <button
      className="feature-button weekend-button"
      type="button"
      aria-pressed={enabled}
      onClick={() => onChange(!enabled)}
    >
      <CalendarDays size={18} aria-hidden="true" />
      <span>이번 주말만 보기</span>
    </button>
  )
}

export function WeekendEmptyState({ now }: { now: Date }) {
  const { saturday, sunday } = getNearestWeekend(now)
  const label = `${format(saturday, 'M월 d일')}–${format(sunday, 'M월 d일')}`

  return (
    <div className="empty-state" role="status">
      <span aria-hidden="true">🗓️</span>
      <h2>이번 주말에는 등록된 행사가 없어요</h2>
      <p>{label}에 열리는 행사가 아직 없어요. 필터를 끄면 다른 날짜의 행사를 볼 수 있어요.</p>
    </div>
  )
}
