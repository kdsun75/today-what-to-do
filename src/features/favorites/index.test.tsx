import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FavoritesFeature } from '.'

describe('즐겨찾기 기능', () => {
  beforeEach(() => window.localStorage.clear())

  it('카드에서 즐겨찾기를 추가하고 해제하며 상태를 스크린 리더에 알린다', async () => {
    const user = userEvent.setup()
    render(<FavoritesFeature eventId="jazz" mode="card" />)

    const addButton = screen.getByRole('button', { name: 'jazz 즐겨찾기 추가' })
    expect(addButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(addButton)
    const removeButton = screen.getByRole('button', { name: 'jazz 즐겨찾기 해제' })
    expect(removeButton).toHaveAttribute('aria-pressed', 'true')
    expect(JSON.parse(window.localStorage.getItem('today-what-to-do:favorites') ?? '[]')).toEqual(['jazz'])

    await user.click(removeButton)
    expect(screen.getByRole('button', { name: 'jazz 즐겨찾기 추가' })).toHaveAttribute('aria-pressed', 'false')
    expect(JSON.parse(window.localStorage.getItem('today-what-to-do:favorites') ?? '[]')).toEqual([])
  })

  it('저장된 선택을 새로 렌더링한 뒤에도 복원하고 툴바의 개수를 갱신한다', async () => {
    const user = userEvent.setup()
    const view = render(
      <>
        <FavoritesFeature mode="toolbar" />
        <FavoritesFeature eventId="market" mode="card" />
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'market 즐겨찾기 추가' }))
    expect(screen.getByRole('status')).toHaveTextContent('즐겨찾기 1개')

    view.unmount()
    render(<FavoritesFeature eventId="market" mode="card" />)
    expect(screen.getByRole('button', { name: 'market 즐겨찾기 해제' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('제어형 사용 시 저장소 대신 onToggle 계약을 사용한다', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<FavoritesFeature eventId="book" isFavorite onToggle={onToggle} mode="card" />)

    await user.click(screen.getByRole('button', { name: 'book 즐겨찾기 해제' }))
    expect(onToggle).toHaveBeenCalledWith('book')
    expect(window.localStorage.getItem('today-what-to-do:favorites')).toBeNull()
  })
})
