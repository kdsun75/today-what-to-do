import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { useEventStore } from './store/useEventStore'

describe('행사 보드', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date('2026-08-28T12:00:00'))
    useEventStore.setState({ query: '', category: '전체' })
  })

  it('제목과 모든 샘플 행사를 보여준다', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /오늘.*뭐 하지/ })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(9)
  })

  it('검색어와 카테고리로 행사를 필터링한다', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('행사, 장소, 동네를 검색해 보세요'), '망원')
    expect(screen.getAllByRole('article')).toHaveLength(2)
    await user.clear(screen.getByPlaceholderText('행사, 장소, 동네를 검색해 보세요'))
    await user.click(screen.getByRole('button', { name: '가족' }))
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('이번 주말 필터를 켜고 끌 수 있다', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = screen.getByRole('button', { name: '이번 주말만 보기' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('article')).toHaveLength(4)

    await user.click(toggle)
    expect(screen.getAllByRole('article')).toHaveLength(9)
  })

  it('주말 필터 결과가 없으면 안내하고 필터를 끄면 전체 결과로 돌아온다', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('행사, 장소, 동네를 검색해 보세요'), '재즈')
    await user.click(screen.getByRole('button', { name: '이번 주말만 보기' }))

    expect(screen.getByRole('status')).toHaveTextContent('이번 주말에는 등록된 행사가 없어요')
    expect(screen.getByRole('status')).toHaveTextContent('8월 29일–8월 30일')

    await user.click(screen.getByRole('button', { name: '이번 주말만 보기' }))
    expect(screen.getByRole('article')).toHaveTextContent('노을 아래 재즈 피크닉')
  })

  it('나머지 확장 기능을 명확한 비활성 자리표시자로 제공한다', () => {
    render(<App />)
    expect(screen.getAllByRole('button', { name: /즐겨찾기/ })[0]).toBeDisabled()
    expect(screen.getAllByRole('button', { name: /ICS 일정 내려받기/ })[0]).toBeDisabled()
  })
})
