export type Category = '전체' | '공연' | '마켓' | '체험' | '전시' | '가족'

export interface LocalEvent {
  id: string
  title: string
  category: Exclude<Category, '전체'>
  date: string
  endDate?: string
  time: string
  location: string
  neighborhood: string
  description: string
  price: string
  accent: string
  emoji: string
}
