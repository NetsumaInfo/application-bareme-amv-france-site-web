import {
  ChevronLeft,
  ChevronRight,
  Play,
  ChevronDown,
  Clock3,
  Star,
} from 'lucide-react'
import { BAREME_JE2025, PARTICIPANTS, TOTAL_MAX } from '@/data/je2025'

function alpha(hex: string, a: number) {
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return hex
  const r = parseInt(m[1], 16)
  const g = parseInt(m[2], 16)
  const b = parseInt(m[3], 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function NotationMock({
  participantIndex = 0,
  scores,
  total,
  expandedCategories = ['montage'],
  clipIndex = 1,
  totalClips = PARTICIPANTS.length,
  highlightCriterionIndex,
  hideTotals,
  hideFooter,
  favorite,
}: {
  participantIndex?: number
  scores?: (number | undefined)[]
  total?: number
  expandedCategories?: string[]
  clipIndex?: number
  totalClips?: number
  highlightCriterionIndex?: number
  hideTotals?: boolean
  hideFooter?: boolean
  favorite?: boolean
}) {
  const p = PARTICIPANTS[participantIndex] ?? PARTICIPANTS[0]
  const effectiveScores = scores ?? p.lightning
  const computedTotal =
    total ?? effectiveScores.reduce<number>((s, v) => s + (typeof v === 'number' ? v : 0), 0)
  const isFav = favorite ?? p.fav

  const catStarts: number[] = []
  let acc = 0
  for (const c of BAREME_JE2025) {
    catStarts.push(acc)
    acc += c.criteria.length
  }

  return (
    <div className="flex h-full flex-col bg-[rgb(14_14_18)] text-gray-200">
      {/* Clip header — matches NotationClipHeader.tsx */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-700/80 bg-[rgb(20_20_26)] px-3 py-1.5">
        <button
          data-action="prev-clip"
          className="inline-flex h-5 w-5 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="min-w-0 flex-1 px-2 text-center">
          <div className="flex min-w-0 items-center justify-center gap-1.5 text-[10px] leading-none">
            <button
              data-action="open-player"
              className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Play size={11.5} />
            </button>
            <span className="max-w-[40%] truncate text-[11px] font-semibold text-white">
              {p.author}
            </span>
            {p.title && p.title !== p.author && (
              <>
                <span className="text-gray-600">-</span>
                <span className="max-w-[32%] truncate text-[11px] text-primary-300">{p.title}</span>
              </>
            )}
            {isFav && (
              <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-md border border-amber-300/35 bg-amber-400/12 text-amber-200">
                <Star size={9} fill="currentColor" />
              </span>
            )}
            <span className="shrink-0 text-gray-500">
              {clipIndex}/{totalClips}
            </span>
          </div>
        </div>
        <button
          data-action="next-clip"
          className="inline-flex h-5 w-5 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Score total bar — matches NotationClipHeader bottom row */}
      {!hideTotals && (
        <div className="flex shrink-0 items-center justify-between border-b border-gray-700/50 bg-[rgb(14_14_18)] px-3 py-1.5">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">Score total</span>
          <span data-total className="text-sm font-bold text-white">
            {computedTotal.toFixed(computedTotal % 1 === 0 ? 0 : 2)}
            <span className="text-xs font-normal text-gray-400">/{TOTAL_MAX}</span>
          </span>
        </div>
      )}

      {/* Categories accordion */}
      <div className="flex-1 overflow-y-auto">
        {BAREME_JE2025.map((cat, catI) => {
          const expanded = expandedCategories.includes(cat.id)
          const start = catStarts[catI]
          const catScore = cat.criteria.reduce((s, _, j) => {
            const v = effectiveScores[start + j]
            return s + (typeof v === 'number' ? v : 0)
          }, 0)
          return (
            <div
              key={cat.id}
              data-category={cat.id}
              className="border-b border-gray-800/60"
            >
              <div
                className="flex items-center justify-between px-3 py-1.5"
                style={{
                  background: `linear-gradient(180deg, rgb(11 12 28 / 0.94) 0%, ${alpha(
                    cat.color,
                    0.04,
                  )} 100%)`,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <ChevronDown
                    size={11}
                    className={`text-gray-500 transition-transform ${
                      expanded ? '' : '-rotate-90'
                    }`}
                  />
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                </div>
                <span className="text-[11px] tabular-nums text-gray-400">
                  <span className="text-gray-200">{catScore}</span>
                  <span className="text-gray-600"> / {cat.max}</span>
                </span>
              </div>
              {expanded && (
                <div
                  className="space-y-1 border-b border-white/5 px-2 py-1.5"
                  style={{
                    background: `linear-gradient(180deg, rgb(14 14 18 / 0.94) 0%, ${alpha(
                      cat.color,
                      0.07,
                    )} 100%)`,
                  }}
                >
                  {cat.criteria.map((c, j) => {
                    const idx = start + j
                    const isHi = idx === highlightCriterionIndex
                    const val = effectiveScores[idx]
                    return (
                      <div
                        key={c.id}
                        data-criterion={idx}
                        className={`flex items-center justify-between gap-2 rounded px-1.5 py-1 transition-colors ${
                          isHi ? 'bg-primary-600/15 ring-1 ring-primary-500/40' : ''
                        }`}
                      >
                        <span className="truncate text-[11px] text-gray-300">{c.label}</span>
                        <div
                          data-criterion-input={idx}
                          className={`flex h-5 w-16 items-center justify-end rounded border px-1.5 text-[11px] tabular-nums ${
                            isHi
                              ? 'border-primary-500/60 bg-primary-600/10 text-white'
                              : 'border-gray-700 bg-black/30 text-white'
                          }`}
                        >
                          {val ?? '—'}
                          <span className="ml-0.5 text-[9px] text-gray-500">/{c.max}</span>
                        </div>
                      </div>
                    )
                  })}
                  <div
                    className="rounded border px-2 py-1.5 text-[11px]"
                    style={{
                      borderColor: alpha(cat.color, 0.45),
                      backgroundColor: alpha(cat.color, 0.12),
                    }}
                  >
                    <span className="text-gray-500">Commentaires "{cat.label.toUpperCase()}"...</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer — matches NotationNotesFooter.tsx (Timecode pill row + textarea row) */}
      {!hideFooter && (
        <div className="shrink-0 border-t border-gray-700 bg-[rgb(20_20_26)]">
          <div className="flex items-center justify-end border-b border-gray-700/60 px-3 py-1.5">
            <button
              data-action="insert-timecode"
              className="inline-flex items-center gap-1.5 rounded-md border border-primary-500/30 bg-primary-500/[0.08] px-2.5 py-1 text-[11px] text-primary-200 transition-colors hover:bg-primary-500/[0.12]"
              title="Insérer le timecode"
            >
              <Clock3 size={12} />
              Timecode
            </button>
          </div>
          <div className="px-3 py-2">
            <div className="flex min-h-[36px] items-start rounded-md border border-gray-700/60 bg-black/30 px-2 py-1.5 text-[11px] text-gray-500">
              Commentaire général…
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
