import { create } from 'zustand'
import type { Category } from '../types'

interface EventStore {
  query: string
  category: Category
  setQuery: (query: string) => void
  setCategory: (category: Category) => void
}

export const useEventStore = create<EventStore>((set) => ({
  query: '',
  category: '전체',
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category }),
}))
