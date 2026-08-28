import { Download } from 'lucide-react'
import type { LocalEvent } from '../../types'
import { createIcs, createIcsFileName } from './ics'

export interface CalendarFeatureProps {
  event?: LocalEvent
  events?: LocalEvent[]
  onDownload?: (events: LocalEvent[]) => void
  mode?: 'card' | 'toolbar'
}

function downloadCalendar(events: LocalEvent[], fileName: string) {
  const blob = new Blob([createIcs(events)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

export function CalendarFeature({ event, events = [], onDownload, mode = 'toolbar' }: CalendarFeatureProps) {
  const selectedEvents = event ? [event] : events
  const handleDownload = () => {
    if (!selectedEvents.length) return
    onDownload?.(selectedEvents)
    downloadCalendar(selectedEvents, event ? createIcsFileName(event) : 'events.ics')
  }

  return (
    <button className={mode === 'card' ? 'icon-button' : 'feature-button'} type="button" disabled={!selectedEvents.length} onClick={handleDownload} title={mode === 'card' ? '캘린더에 추가' : undefined}>
      <Download size={18} aria-hidden="true" />
      {mode === 'toolbar' && <span>일정 받기</span>}
      {mode === 'card' && <span className="sr-only">{event?.title} 캘린더에 추가</span>}
    </button>
  )
}

export { createIcs, createIcsFileName } from './ics'
