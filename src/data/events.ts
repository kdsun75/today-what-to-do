import type { LocalEvent } from '../types'

export const events: LocalEvent[] = [
  { id: 'jazz', title: '노을 아래 재즈 피크닉', category: '공연', date: '2026-08-28', time: '19:00', location: '한강 잔디마당', neighborhood: '망원동', description: '돗자리 하나 들고 만나는 여름 끝자락의 라이브 재즈.', price: '무료', accent: '#ff8d6b', emoji: '🎷' },
  { id: 'market', title: '성미산 작은 농부시장', category: '마켓', date: '2026-08-29', time: '11:00–17:00', location: '성미산 마을광장', neighborhood: '성산동', description: '제철 채소와 빵, 다정한 이웃 셀러가 모이는 토요 시장.', price: '입장 무료', accent: '#84b985', emoji: '🥕' },
  { id: 'pottery', title: '나만의 아침 컵 만들기', category: '체험', date: '2026-08-29', time: '14:00', location: '모퉁이 공방', neighborhood: '연남동', description: '흙을 빚고 색을 골라 매일 쓰고 싶은 컵을 만들어요.', price: '35,000원', accent: '#d19a6f', emoji: '🏺' },
  { id: 'picture', title: '골목에서 만난 여름', category: '전시', date: '2026-08-25', endDate: '2026-09-06', time: '12:00–20:00', location: '스페이스 이음', neighborhood: '서교동', description: '동네 사진가 여섯 명이 기록한 작고 반짝이는 여름.', price: '무료', accent: '#7899d4', emoji: '📷' },
  { id: 'puppet', title: '달토끼 인형극', category: '가족', date: '2026-08-30', time: '11:00 / 14:00', location: '마포 어린이극장', neighborhood: '대흥동', description: '아이와 어른이 함께 웃는 50분짜리 창작 인형극.', price: '8,000원', accent: '#b18ad5', emoji: '🐇' },
  { id: 'movie', title: '옥상 영화관: 리틀 포레스트', category: '공연', date: '2026-09-02', time: '20:00', location: '어쩌다 옥상', neighborhood: '합정동', description: '선선한 바람과 작은 전구 아래서 즐기는 야외 영화.', price: '10,000원', accent: '#657c9a', emoji: '🎬' },
  { id: 'book', title: '한 평 책방 북토크', category: '체험', date: '2026-09-03', time: '19:30', location: '책방 초록', neighborhood: '염리동', description: '동네와 산책에 관한 에세이를 읽고 이야기를 나눠요.', price: '5,000원', accent: '#6ca99c', emoji: '📚' },
  { id: 'vintage', title: '망원 빈티지 플리마켓', category: '마켓', date: '2026-09-05', time: '12:00–18:00', location: '포레스트 홀', neighborhood: '망원동', description: '오래 입을 옷과 작은 소품을 천천히 골라보세요.', price: '입장 무료', accent: '#d58274', emoji: '🧥' },
  { id: 'garden', title: '우리 동네 식물 탐험대', category: '가족', date: '2026-09-06', time: '10:30', location: '경의선숲길 책거리', neighborhood: '동교동', description: '숲 해설가와 잎을 관찰하고 나만의 도감을 만들어요.', price: '12,000원', accent: '#77a95c', emoji: '🌿' },
]
