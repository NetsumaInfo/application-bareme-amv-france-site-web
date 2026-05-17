import { ExternalLink, X, Minus, Square } from 'lucide-react'
import { NotationMock } from './NotationMock'

export function DetachedNotesWindow({
  title = 'AMV Notation - Notes',
  participantIndex = 0,
  scores,
  total,
  highlightCriterionIndex,
  clipIndex = 1,
  totalClips,
  className = '',
}: {
  title?: string
  participantIndex?: number
  scores?: (number | undefined)[]
  total?: number
  highlightCriterionIndex?: number
  clipIndex?: number
  totalClips?: number
  className?: string
}) {
  return (
    <div
      data-window="notes"
      className={`flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-800 bg-[rgb(15_15_35)] shadow-2xl shadow-black/70 ${className}`}
    >
      <div className="flex h-7 items-center justify-between border-b border-gray-800 bg-[rgb(20_20_30)] pl-3 pr-0 text-gray-300">
        <div className="flex items-center gap-2 text-[11px]">
          <ExternalLink size={10} className="text-gray-500" />
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex h-full items-stretch">
          <button className="grid w-10 place-items-center hover:bg-white/5">
            <Minus size={11} />
          </button>
          <button className="grid w-10 place-items-center hover:bg-white/5">
            <Square size={9} />
          </button>
          <button className="grid w-10 place-items-center hover:bg-red-500/80">
            <X size={11} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <NotationMock
          participantIndex={participantIndex}
          scores={scores}
          total={total}
          highlightCriterionIndex={highlightCriterionIndex}
          clipIndex={clipIndex}
          totalClips={totalClips}
        />
      </div>
    </div>
  )
}
