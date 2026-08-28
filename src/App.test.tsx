import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { useEventStore } from './store/useEventStore'

describe('행사 보드', () => {
  beforeEach(() => useEventStore.setState({ query: '', category: '전체' }))

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

  it('확장 기능과 사용 가능한 즐겨찾기를 제공한다', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /이번 주말만/ })).toBeDisabled()
    expect(screen.getAllByRole('button', { name: /즐겨찾기 추가/ })[0]).toBeEnabled()
    expect(screen.getAllByRole('button', { name: /ICS 일정 내려받기/ })[0]).toBeDisabled()
  })
})
