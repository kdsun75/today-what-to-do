import { Download } from 'lucide-react'
import type { LocalEvent } from '../../types'

export interface IcsDownloadFeatureProps {
  event?: LocalEvent
  events?: LocalEvent[]
  onDownload?: (events: LocalEvent[]) => void
  mode?: 'card' | 'toolbar'
}

export function IcsDownloadFeature({ mode = 'toolbar' }: IcsDownloadFeatureProps) {
  return (
    <button className={mode === 'card' ? 'icon-button' : 'feature-button'} type="button" disabled title="준비 중인 기능">
      <Download size={18} aria-hidden="true" />
      {mode === 'toolbar' && <span>일정 받기 <small>준비 중</small></span>}
      <span className="sr-only">ICS 일정 내려받기 기능 준비 중</span>
    </button>
  )
}
