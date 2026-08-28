import { describe, expect, it } from 'vitest'
import type { LocalEvent } from '../../types'
import { createIcs, createIcsFileName } from './ics'

const event: LocalEvent = {
  id: 'jazz-picnic', title: '노을 아래 재즈 피크닉', category: '공연', date: '2026-08-28',
  time: '19:00–21:30', location: '한강 잔디마당, 망원', neighborhood: '망원동',
  description: '재즈 공연', price: '무료', accent: '#fff', emoji: '🎷',
}

describe('ICS 생성', () => {
  it('표준 캘린더 구조와 행사의 제목, 시각, 장소를 만든다', () => {
    const ics = createIcs([event], new Date('2026-08-01T00:00:00Z'))

    expect(ics).toContain('BEGIN:VCALENDAR\r\nVERSION:2.0')
    expect(ics).toContain('DTSTAMP:20260801T000000Z')
    expect(ics).toContain('DTSTART:20260828T190000')
    expect(ics).toContain('DTEND:20260828T213000')
    expect(ics).toContain('SUMMARY:노을 아래 재즈 피크닉')
    expect(ics).toContain('LOCATION:한강 잔디마당\\, 망원')
    expect(ics).toMatch(/END:VCALENDAR\r\n$/)
  })

  it('종료 날짜와 기본 1시간 종료 시각을 처리한다', () => {
    const ics = createIcs([{ ...event, endDate: '2026-09-06', time: '12:00' }])
    expect(ics).toContain('DTEND:20260906T130000')
  })

  it('안전한 영문 파일 이름을 만든다', () => {
    expect(createIcsFileName(event)).toBe('jazz-picnic.ics')
    expect(createIcsFileName({ ...event, title: 'Summer Jazz 2026!' })).toBe('summer-jazz-2026.ics')
  })
})
