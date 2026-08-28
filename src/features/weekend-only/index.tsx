import { CalendarDays } from 'lucide-react'

export interface WeekendOnlyFeatureProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export function WeekendOnlyFeature({ enabled }: WeekendOnlyFeatureProps) {
  return (
    <button className="feature-button" type="button" disabled aria-pressed={enabled} title="준비 중인 기능">
      <CalendarDays size={18} aria-hidden="true" />
      <span>이번 주말만 <small>준비 중</small></span>
    </button>
  )
}
