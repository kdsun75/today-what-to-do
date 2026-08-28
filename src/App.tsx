import { Search, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EventCard } from './components/EventCard'
import { events } from './data/events'
import { FavoritesFeature } from './features/favorites'
import { IcsDownloadFeature } from './features/ics-download'
import { filterEventsForNearestWeekend, WeekendEmptyState, WeekendFeature } from './features/weekend'
import { useEventStore } from './store/useEventStore'
import type { Category } from './types'

const categories: Category[] = ['전체', '공연', '마켓', '체험', '전시', '가족']

export default function App() {
  const { query, category, setQuery, setCategory } = useEventStore()
  const [weekendOnly, setWeekendOnly] = useState(false)
  const [now] = useState(() => new Date())
  const filteredEvents = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('ko')
    return events.filter((event) => {
      const matchesCategory = category === '전체' || event.category === category
      const haystack = `${event.title} ${event.description} ${event.location} ${event.neighborhood}`.toLocaleLowerCase('ko')
      return matchesCategory && (!keyword || haystack.includes(keyword))
    })
  }, [category, query])
  const visibleEvents = useMemo(() => {
    return weekendOnly ? filterEventsForNearestWeekend(filteredEvents, now) : filteredEvents
  }, [filteredEvents, weekendOnly, now])

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="오늘 뭐 하지 홈"><span>오</span> 오늘 뭐 하지?</a>
        <nav aria-label="주요 메뉴"><a href="#events">행사 찾기</a><a href="#about">동네 이야기</a></nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={16} /> 우리 동네의 작은 즐거움</p>
            <h1>오늘, 가까운 곳에서<br/><em>뭐 하지?</em></h1>
            <p>멀리 가지 않아도 충분히 특별한 하루.<br/>동네 곳곳의 행사와 모임을 발견해 보세요.</p>
          </div>
          <div className="hero-art" aria-hidden="true"><span>☀️</span><span>🏡</span><span>🌳</span><span>🐕</span></div>
        </section>

        <section className="event-section" id="events">
          <div className="section-heading"><div><p className="eyebrow">이번 주, 우리 동네</p><h2>가까이에서 만나는 즐거움</h2></div><p>총 {events.length}개의 행사가 기다리고 있어요</p></div>
          <div className="controls">
            <label className="search-box"><Search size={20} aria-hidden="true"/><span className="sr-only">행사 검색</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="행사, 장소, 동네를 검색해 보세요"/></label>
            <div className="feature-controls"><WeekendFeature enabled={weekendOnly} onChange={setWeekendOnly}/><FavoritesFeature/><IcsDownloadFeature events={visibleEvents}/></div>
          </div>
          <div className="category-list" aria-label="카테고리 필터">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} type="button">{item}</button>)}</div>

          {visibleEvents.length ? <div className="event-grid">{visibleEvents.map((event) => <EventCard key={event.id} event={event}/>)}</div> : weekendOnly ? <WeekendEmptyState now={now}/> : <div className="empty-state"><span>🔎</span><h2>찾는 행사가 아직 없어요</h2><p>검색어나 카테고리를 바꿔 보세요.</p></div>}
        </section>
      </main>
      <footer id="about"><strong>오늘 뭐 하지?</strong><p>작고 다정한 동네의 하루를 연결합니다.</p><span>© 2026 Neighborhood Club</span></footer>
    </div>
  )
}
