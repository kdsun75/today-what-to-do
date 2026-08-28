import type { LocalEvent } from '../../types'

const LINE_BREAK = '\r\n'
const DEFAULT_DURATION_MINUTES = 60

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function compactDate(date: string) {
  return date.replace(/-/g, '')
}

function timeParts(time: string) {
  const matches = [...time.matchAll(/(\d{1,2}):(\d{2})/g)]
  if (!matches.length) return { start: '000000', end: '010000' }

  const startHour = Number(matches[0][1])
  const startMinute = Number(matches[0][2])
  const hasRange = /[–—~-]/.test(time) && matches.length > 1
  let endMinutes = hasRange
    ? Number(matches[1][1]) * 60 + Number(matches[1][2])
    : startHour * 60 + startMinute + DEFAULT_DURATION_MINUTES
  if (hasRange && endMinutes <= startHour * 60 + startMinute) endMinutes += 24 * 60

  const formatTime = (minutes: number) => {
    const normalized = minutes % (24 * 60)
    return `${String(Math.floor(normalized / 60)).padStart(2, '0')}${String(normalized % 60).padStart(2, '0')}00`
  }

  return {
    start: formatTime(startHour * 60 + startMinute),
    end: formatTime(endMinutes),
    endsNextDay: endMinutes >= 24 * 60,
  }
}

function addDays(date: string, days: number) {
  const value = new Date(`${date}T00:00:00Z`)
  value.setUTCDate(value.getUTCDate() + days)
  return value.toISOString().slice(0, 10)
}

function eventLines(event: LocalEvent, timestamp: string) {
  const time = timeParts(event.time)
  const endDate = event.endDate ?? (time.endsNextDay ? addDays(event.date, 1) : event.date)

  return [
    'BEGIN:VEVENT',
    `UID:${escapeIcsText(event.id)}@today-what-to-do.local`,
    `DTSTAMP:${timestamp}`,
    `DTSTART:${compactDate(event.date)}T${time.start}`,
    `DTEND:${compactDate(endDate)}T${time.end}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    'END:VEVENT',
  ]
}

/** Creates an RFC 5545-compatible calendar containing the supplied events. */
export function createIcs(events: LocalEvent[], generatedAt = new Date()) {
  const timestamp = generatedAt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Today What To Do//KO',
    'CALSCALE:GREGORIAN',
    ...events.flatMap((event) => eventLines(event, timestamp)),
    'END:VCALENDAR',
    '',
  ].join(LINE_BREAK)
}

/** Uses an English event identifier when a Korean title cannot form an ASCII slug. */
export function createIcsFileName(event: LocalEvent) {
  const asciiTitle = event.title
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
  const safeId = event.id.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase()
  return `${asciiTitle || safeId || 'event'}.ics`
}
