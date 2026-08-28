import { describe, expect, it } from 'vitest'
import type { LocalEvent } from '../../types'
import { filterEventsForNearestWeekend, getNearestWeekend } from '.'

const event = (id: string, date: string, endDate?: string): LocalEvent => ({
  id,
  date,
  endDate,
  title: id,
  category: '공연',
  time: '12:00',
  location: '테스트 장소',
  neighborhood: '테스트동',
  description: '테스트 행사',
  price: '무료',
  accent: '#000000',
  emoji: '🎈',
})

describe('가장 가까운 주말 계산', () => {
  it.each([
    ['금요일', '2026-08-28T12:00:00', '2026-08-29', '2026-08-30'],
    ['토요일', '2026-08-29T23:59:59', '2026-08-29', '2026-08-30'],
    ['일요일', '2026-08-30T00:00:00', '2026-08-29', '2026-08-30'],
    ['월요일', '2026-08-31T00:00:00', '2026-09-05', '2026-09-06'],
  ])('%s에는 올바른 토요일과 일요일을 반환한다', (_, now, saturday, sunday) => {
    const range = getNearestWeekend(new Date(now))
    expect(range.saturday.getFullYear() + '-' + String(range.saturday.getMonth() + 1).padStart(2, '0') + '-' + String(range.saturday.getDate()).padStart(2, '0')).toBe(saturday)
    expect(range.sunday.getFullYear() + '-' + String(range.sunday.getMonth() + 1).padStart(2, '0') + '-' + String(range.sunday.getDate()).padStart(2, '0')).toBe(sunday)
  })

  it('주말 경계에 걸친 행사와 진행 중인 행사만 포함한다', () => {
    const events = [
      event('friday', '2026-08-28'),
      event('saturday', '2026-08-29'),
      event('sunday', '2026-08-30'),
      event('monday', '2026-08-31'),
      event('ongoing', '2026-08-25', '2026-09-06'),
    ]

    expect(filterEventsForNearestWeekend(events, new Date('2026-08-28T12:00:00')).map(({ id }) => id))
      .toEqual(['saturday', 'sunday', 'ongoing'])
  })
})
