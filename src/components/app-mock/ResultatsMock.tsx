import { Users, FileText, Star, Image as ImageIcon } from 'lucide-react'
import { BAREME_JE2025, PARTICIPANTS, TOTAL_MAX, JUDGES, type ParticipantRow } from '@/data/je2025'

type Judge = { name: string; loaded: boolean; color?: string }
type MainView = 'par-juge' | 'global' | 'top' | 'commentaires'
type GlobalSubView = 'detail'

function alpha(hex: string, a: number) {
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return hex
  const r = parseInt(m[1], 16)
  const g = parseInt(m[2], 16)
  const b = parseInt(m[3], 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const DEFAULT_JUDGES: Judge[] = JUDGES.map((j) => ({
  name: j.name,
  loaded: true,
  color: j.color,
}))

const VIEW_MODES: { id: MainView; label: string }[] = [
  { id: 'par-juge', label: 'Tableau par juge' },
  { id: 'global', label: 'Tableau global' },
  { id: 'top', label: 'Liste Top' },
  { id: 'commentaires', label: 'Commentaires des juges' },
]

export function ResultatsMock({
  judges = DEFAULT_JUDGES,
  viewMode = 'global',
  globalSubView = 'detail',
  showGeneralComment = false,
  showFavorites = false,
  selectedJudge = 0,
}: {
  judges?: Judge[]
  viewMode?: MainView
  globalSubView?: GlobalSubView
  showGeneralComment?: boolean
  showFavorites?: boolean
  selectedJudge?: number
  rows?: never
  importing?: boolean
}) {
  const activeJudgeIdx = Math.min(Math.max(selectedJudge, 0), Math.max(judges.length - 1, 0))
  return (
    <div className="flex h-full flex-col">
      {/* Header bar — view modes + filter + judges */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-gray-700/60 bg-[rgb(20_20_26)] px-3 py-1.5">
        {/* View mode segmented control (4 modes) */}
        <div className="flex items-center overflow-hidden rounded-md bg-[rgb(14_14_18)] p-0.5">
          {VIEW_MODES.map((m) => {
            const active = m.id === viewMode
            return (
              <button
                key={m.id}
                data-view-mode={m.id}
                className={`inline-flex h-6 items-center rounded-[5px] px-2 text-[11px] transition-colors ${
                  active
                    ? 'bg-[rgb(14_14_18)]/90 text-white shadow-xs'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            )
          })}
        </div>

        {/* Global subview controls when in 'global' mode */}
        {viewMode === 'global' && (
          <div
            className="ml-1 flex items-center gap-0.5 rounded-md border-l-2 pl-2"
            style={{ borderColor: alpha('#3b82f6', 0.7) }}
          >
            <button
              data-global-sub="detail"
              className={`inline-flex h-6 items-center rounded-md px-2 text-[11px] ${
                globalSubView === 'detail'
                  ? 'bg-[rgb(14_14_18)]/90 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Détaillé
            </button>
          </div>
        )}

        {/* Square icon toggles: general comment, favorites, miniatures */}
        <div className="flex items-center gap-0.5">
          <button
            data-toggle="general-comment"
            title="Commentaire général"
            className={`grid h-6 w-6 place-items-center rounded-md text-[11px] ${
              showGeneralComment
                ? 'bg-[rgb(14_14_18)]/90 text-gray-200'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            <FileText size={14} />
          </button>
          <button
            data-toggle="favorites"
            title="Favoris"
            className={`grid h-6 w-6 place-items-center rounded-md text-[11px] ${
              showFavorites
                ? 'bg-amber-400/15 text-amber-200'
                : 'text-gray-500 hover:text-amber-200'
            }`}
          >
            <Star size={14} fill={showFavorites ? 'currentColor' : 'none'} />
          </button>
          <button
            data-toggle="miniatures"
            title="Miniatures"
            className="grid h-6 w-6 place-items-center rounded-md text-gray-500 hover:text-white"
          >
            <ImageIcon size={14} />
          </button>
        </div>

        {/* Judges in header (right-aligned).
            - global: show all judges as non-interactive badges (no selection)
            - par-juge: show interactive judge tabs + prev/next navigation */}
        <div className="ml-auto flex min-w-0 items-center justify-end gap-1">
          <div className="flex items-center gap-1.5 px-1 text-[10px] text-gray-500">
            <Users size={13} />
            {judges.length} juge{judges.length > 1 ? 's' : ''}
          </div>
          {viewMode !== 'par-juge' &&
            judges.map((j, i) => {
              const color = j.color ?? '#60a5fa'
              return (
                <div key={i} className={`inline-flex items-center gap-1.5 ${j.loaded ? '' : 'opacity-40'}`}>
                  <span
                    className="inline-flex h-6 items-center rounded-md px-1.5 text-[11px]"
                    style={{
                      color: j.loaded ? color : 'rgb(224 224 224 / 0.55)',
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                    }}
                  >
                    {j.name}
                  </span>
                  <span
                    className="h-2 w-2 rounded-full ring-1 ring-black/40"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />
                </div>
              )
            })}
          {viewMode === 'par-juge' &&
            judges.map((j, i) => {
              const color = j.color ?? '#60a5fa'
              const isActiveTab = i === activeJudgeIdx
              const labelStyle = {
                color: j.loaded ? color : 'rgb(224 224 224 / 0.55)',
                backgroundColor: isActiveTab
                  ? alpha(color, 0.22)
                  : j.loaded
                  ? alpha(color, 0.12)
                  : 'transparent',
                boxShadow: isActiveTab
                  ? `inset 0 -2px 0 0 ${color}`
                  : j.loaded
                  ? `inset 0 -1px 0 0 ${alpha(color, 0.9)}`
                  : 'none',
              }
              const labelClass = `inline-flex h-6 items-center rounded-md px-1.5 text-[11px] transition-colors ${
                j.loaded ? '' : 'opacity-40'
              } ${!isActiveTab ? 'opacity-50' : ''}`
              return (
                <div key={i} className="inline-flex items-center gap-1.5">
                  <button data-judge={i} className={labelClass} style={labelStyle}>
                    {j.name}
                  </button>
                  <span
                    className="h-2 w-2 rounded-full ring-1 ring-black/40"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />
                </div>
              )
            })}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {viewMode === 'commentaires' ? (
          <CommentairesView judges={judges} />
        ) : viewMode === 'top' ? (
          <TopListsView judges={judges} />
        ) : viewMode === 'global' ? (
          <div className="flex-1 overflow-auto">
            <GlobalDetailTable judges={judges} />
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <PerJudgeTable judge={judges[activeJudgeIdx] ?? judges[0]} />
          </div>
        )}
      </div>

      {/* Optional general comment panel */}
      {showGeneralComment && <NotesPanel judges={judges} />}
    </div>
  )
}

function PerJudgeTable({ judge }: { judge: Judge }) {
  const jKey: 'lightning' | 'lokkiclu' | 'da' = judge.name.toLowerCase().startsWith('light')
    ? 'lightning'
    : judge.name.toLowerCase().startsWith('lokk')
    ? 'lokkiclu'
    : 'da'
  const color = judge.color ?? '#60a5fa'
  return (
    <table className="w-max min-w-full border-collapse text-[11px]">
      <thead className="sticky top-0 z-10 bg-[rgb(11_12_28)]">
        <tr>
          <th
            rowSpan={2}
            className="w-8 border-b border-r border-gray-700/60 bg-[rgb(20_20_26)] px-2 py-1.5 text-center text-[10px] font-medium text-gray-500"
          >
            #
          </th>
          <th
            rowSpan={2}
            className="w-[170px] min-w-[170px] border-b border-r border-gray-700/60 bg-[rgb(20_20_26)] px-2 py-1.5 text-left text-[10px] font-medium text-gray-500"
          >
            Participant
          </th>
          {BAREME_JE2025.map((cat) => (
            <th
              key={cat.id}
              colSpan={cat.criteria.length}
              className="border-b border-r px-2 py-1 text-center text-[10px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: alpha(cat.color, 0.18),
                borderColor: alpha(cat.color, 0.3),
              }}
            >
              <span style={{ color: cat.color }}>{cat.label}</span>
              <span className="ml-1 font-normal text-gray-500">/{cat.max}</span>
            </th>
          ))}
          <th
            rowSpan={2}
            className="min-w-[64px] border-b border-gray-700 bg-[rgb(11_12_28)] px-2 py-1 text-center text-[10px] font-bold uppercase tracking-wider"
          >
            Total
            <div className="font-normal text-gray-500">/{TOTAL_MAX}</div>
          </th>
        </tr>
        <tr>
          {BAREME_JE2025.flatMap((cat) =>
            cat.criteria.map((c, idx) => (
              <th
                key={`${cat.id}-${c.id}`}
                className={`min-w-[80px] border-b px-1.5 py-0.5 text-center text-[9px] font-medium ${
                  idx === cat.criteria.length - 1
                    ? 'border-r border-gray-700/60'
                    : 'border-r border-gray-800/40'
                }`}
                style={{ backgroundColor: alpha(cat.color, 0.08) }}
              >
                <span className="text-gray-300">{c.label}</span>
                <span className="ml-1 text-gray-500">/{c.max}</span>
              </th>
            )),
          )}
        </tr>
      </thead>
      <tbody>
        {PARTICIPANTS.slice(0, 8).map((p) => {
          const crit = judgeCritValues(p, jKey)
          const judgeTotal =
            jKey === 'lightning' ? p.totals.lightning : jKey === 'lokkiclu' ? p.totals.lokkiclu : p.totals.da
          return (
            <tr key={p.rank} className="border-b border-gray-800/40">
              <td className="border-r border-gray-800/60 px-2 py-1 text-center">
                <span className="inline-block rounded-md bg-black/15 px-1.5 py-0.5 text-[10px] font-semibold text-gray-400">
                  {p.rank}
                </span>
              </td>
              <td className="w-[170px] border-r border-gray-800/60 px-2 py-1">
                <div className="flex items-center gap-1">
                  <span className="truncate text-primary-300 text-[11px] font-semibold">
                    {p.author}
                  </span>
                </div>
                {p.title && p.title !== p.author && (
                  <div className="truncate text-[10px] text-gray-500">{p.title}</div>
                )}
              </td>
              {BAREME_JE2025.flatMap((cat, catIdx) => {
                let offset = 0
                for (let i = 0; i < catIdx; i++) offset += BAREME_JE2025[i].criteria.length
                return cat.criteria.map((c, ci) => {
                  const v = crit[offset + ci]
                  const isCatEnd = ci === cat.criteria.length - 1
                  return (
                    <td
                      key={`${p.rank}-${cat.id}-${c.id}`}
                      className={`px-1.5 py-1 text-center tabular-nums ${
                        isCatEnd ? 'border-r border-gray-700/60' : 'border-r border-gray-800/30'
                      }`}
                      style={{ color }}
                    >
                      {v != null ? (Number.isInteger(v) ? v.toString() : v.toFixed(1)) : '—'}
                    </td>
                  )
                })
              })}
              <td
                className="min-w-[64px] bg-[rgb(11_12_28)]/70 px-2 py-1 text-center text-[12px] font-semibold tabular-nums"
                style={{ color }}
              >
                {judgeTotal.toFixed(1)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// Derive per-criterion values per judge. Lightning has explicit values;
// other judges are reconstructed proportionally from category totals so
// the mock looks realistic without inventing unrelated numbers.
function judgeCritValues(p: ParticipantRow, judgeKey: 'lightning' | 'lokkiclu' | 'da'): number[] {
  if (judgeKey === 'lightning') return p.lightning
  const cats: [number, number, number, number] =
    judgeKey === 'lokkiclu'
      ? p.lokkicluCats
      : p.daCats ?? (() => {
          const lokkiTotal = p.lokkicluCats.reduce((s, v) => s + v, 0) || 1
          const k = p.totals.da / lokkiTotal
          return p.lokkicluCats.map((v) => v * k) as [number, number, number, number]
        })()
  const out: number[] = []
  let critIdx = 0
  BAREME_JE2025.forEach((cat, ci) => {
    const lightCatTotal = p.lightningCats[ci] || 1
    const judgeCatTotal = cats[ci]
    cat.criteria.forEach(() => {
      const lightVal = p.lightning[critIdx]
      const ratio =
        lightCatTotal > 0 && lightVal != null ? lightVal / lightCatTotal : 1 / cat.criteria.length
      out.push(judgeCatTotal * ratio)
      critIdx++
    })
  })
  return out
}

function GlobalDetailTable({ judges }: { judges: Judge[] }) {
  const allJudges = judges
  const jKeys = allJudges.map((j) =>
    j.name.toLowerCase().startsWith('light')
      ? ('lightning' as const)
      : j.name.toLowerCase().startsWith('lokk')
      ? ('lokkiclu' as const)
      : ('da' as const),
  )
  const judgeCount = allJudges.length
  return (
    <table className="w-max min-w-full border-collapse text-[10px]">
      <thead className="sticky top-0 z-10 bg-[rgb(11_12_28)]">
        {/* Row 1: categories */}
        <tr>
          <th
            rowSpan={3}
            className="w-7 border-b border-r border-gray-700/60 bg-[rgb(20_20_26)] px-1.5 py-1 text-center text-[10px] font-medium text-gray-500"
          >
            #
          </th>
          <th
            rowSpan={3}
            className="w-[150px] min-w-[150px] border-b border-r border-gray-700/60 bg-[rgb(20_20_26)] px-2 py-1 text-left text-[10px] font-medium text-gray-500"
          >
            Participant
          </th>
          {BAREME_JE2025.map((cat) => (
            <th
              key={cat.id}
              colSpan={cat.criteria.length * judgeCount}
              className="border-b border-r px-2 py-1 text-center text-[10px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: alpha(cat.color, 0.18),
                borderColor: alpha(cat.color, 0.3),
              }}
            >
              <span style={{ color: cat.color }}>{cat.label}</span>
              <span className="ml-1 font-normal text-gray-500">/{cat.max}</span>
            </th>
          ))}
          <th
            colSpan={judgeCount + 1}
            className="border-b border-gray-700 bg-[rgb(11_12_28)] px-2 py-1 text-center text-[10px] font-bold uppercase tracking-wider"
          >
            Total
            <span className="ml-1 font-normal text-gray-500">/{TOTAL_MAX}</span>
          </th>
        </tr>
        {/* Row 2: criteria */}
        <tr>
          {BAREME_JE2025.flatMap((cat) =>
            cat.criteria.map((c, idx) => (
              <th
                key={`${cat.id}-${c.id}`}
                colSpan={judgeCount}
                className={`border-b px-1.5 py-0.5 text-center text-[9px] font-medium ${
                  idx === cat.criteria.length - 1 ? 'border-r border-gray-700/60' : 'border-r border-gray-800/40'
                }`}
                style={{ backgroundColor: alpha(cat.color, 0.08) }}
              >
                <span className="text-gray-300">{c.label}</span>
                <span className="ml-1 text-gray-500">/{c.max}</span>
              </th>
            )),
          )}
          {allJudges.map((j) => (
            <th
              key={`tot-${j.name}`}
              rowSpan={2}
              className={`min-w-[44px] border-b border-l border-gray-700/60 bg-[rgb(11_12_28)] px-1.5 py-0.5 text-center text-[10px] font-semibold ${
                j.loaded ? '' : 'opacity-45'
              }`}
              style={{ color: j.color ?? '#60a5fa' }}
            >
              {j.name}
            </th>
          ))}
          <th
            rowSpan={2}
            className="min-w-[44px] border-b border-l border-gray-700 bg-[rgb(11_12_28)] px-1.5 py-0.5 text-center text-[10px] font-bold text-white"
          >
            Moy.
          </th>
        </tr>
        {/* Row 3: judges per criterion */}
        <tr>
          {BAREME_JE2025.flatMap((cat) =>
            cat.criteria.flatMap((c, ci) =>
              allJudges.map((j, ji) => (
                <th
                  key={`${cat.id}-${c.id}-${j.name}`}
                  className={`border-b px-1 py-0.5 text-center text-[9px] font-medium ${
                    ji === judgeCount - 1 && ci === cat.criteria.length - 1
                      ? 'border-r border-gray-700/60'
                      : 'border-r border-gray-800/40'
                  }`}
                  style={{
                    color: j.color ?? '#60a5fa',
                    backgroundColor: alpha(cat.color, 0.04),
                    opacity: j.loaded ? 1 : 0.45,
                  }}
                >
                  {j.name}
                </th>
              )),
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {PARTICIPANTS.slice(0, 8).map((p) => {
          const perJudgeCrit = jKeys.map((k) => judgeCritValues(p, k))
          const judgeTotals = jKeys.map((k) =>
            k === 'lightning' ? p.totals.lightning : k === 'lokkiclu' ? p.totals.lokkiclu : p.totals.da,
          )
          return (
            <tr key={p.rank} className="border-b border-gray-800/40">
              <td className="border-r border-gray-800/60 px-1.5 py-1 text-center">
                <span className="inline-block rounded-md bg-black/15 px-1 py-0.5 text-[9px] font-semibold text-gray-400">
                  {p.rank}
                </span>
              </td>
              <td className="w-[150px] border-r border-gray-800/60 px-2 py-1">
                <div className="flex items-center gap-1">
                  <span className="truncate text-primary-300 text-[10px] font-semibold">
                    {p.author}
                  </span>
                </div>
                {p.title && p.title !== p.author && (
                  <div className="truncate text-[9px] text-gray-500">{p.title}</div>
                )}
              </td>
              {BAREME_JE2025.flatMap((cat, catIdx) => {
                let critOffset = 0
                for (let i = 0; i < catIdx; i++) critOffset += BAREME_JE2025[i].criteria.length
                return cat.criteria.flatMap((c, ci) =>
                  allJudges.map((j, ji) => {
                    const v = perJudgeCrit[ji][critOffset + ci]
                    const isCatEnd = ji === judgeCount - 1 && ci === cat.criteria.length - 1
                    return (
                      <td
                        key={`${p.rank}-${cat.id}-${c.id}-${j.name}`}
                        className={`px-1 py-1 text-center tabular-nums ${
                          isCatEnd ? 'border-r border-gray-700/60' : 'border-r border-gray-800/30'
                        }`}
                        style={{ color: j.color ?? '#cbd5e1' }}
                      >
                        {v != null ? (Number.isInteger(v) ? v.toString() : v.toFixed(1)) : '—'}
                      </td>
                    )
                  }),
                )
              })}
              {judgeTotals.map((t, ji) => (
                <td
                  key={`tot-${p.rank}-${ji}`}
                  className="border-l border-gray-800/40 bg-[rgb(11_12_28)]/40 px-1.5 py-1 text-center text-[10px] font-semibold tabular-nums"
                  style={{ color: allJudges[ji].color ?? '#cbd5e1' }}
                >
                  {t.toFixed(1)}
                </td>
              ))}
              <td className="border-l border-gray-800/60 bg-[rgb(11_12_28)]/70 px-1.5 py-1 text-center text-[11px] font-bold tabular-nums text-white">
                {p.totals.avg.toFixed(2)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function TopListsView({ judges }: { judges: Judge[] }) {
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden">
      <div className="flex min-w-full flex-nowrap items-start gap-2 p-3">
        {judges
          .filter((j) => j.loaded)
          .map((j) => {
            const judgeKey = j.name.toLowerCase()
            return (
              <TopList
                key={j.name}
                title={`Top ${j.name}`}
                color={j.color ?? '#60a5fa'}
                entries={[...PARTICIPANTS]
                  .sort((a, b) => {
                    const aT = (a.totals as any)[judgeKey] ?? a.totals.avg
                    const bT = (b.totals as any)[judgeKey] ?? b.totals.avg
                    return bT - aT
                  })
                  .slice(0, 8)
                  .map((p) => ({
                    primary: p.author,
                    secondary: p.title ?? '',
                    score: ((p.totals as any)[judgeKey] ?? p.totals.avg).toFixed(2),
                    fav: p.fav,
                  }))}
              />
            )
          })}
        <TopList
          title="Top final"
          color="#d4d4d8"
          entries={PARTICIPANTS.slice(0, 8).map((p) => ({
            primary: p.author,
            secondary: p.title ?? '',
            score: p.totals.avg.toFixed(2),
            fav: p.fav,
          }))}
        />
      </div>
    </div>
  )
}

function TopList({
  title,
  color,
  entries,
}: {
  title: string
  color: string
  entries: { primary: string; secondary: string; score: string; fav?: boolean }[]
}) {
  return (
    <div className="min-w-[220px] flex-1 basis-0 overflow-hidden border border-gray-700/50 bg-transparent">
      <div
        className="flex items-center gap-2 border-b border-gray-700/60 px-2.5 py-1.5 text-[11px] font-medium"
        style={{ color, backgroundColor: alpha(color, 0.1) }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
        {title}
      </div>
      <div className="divide-y divide-gray-800/60">
        {entries.map((row, index) => (
          <div
            key={index}
            className="w-full px-2.5 py-1.5 text-left text-[11px] transition-colors hover:bg-white/5"
          >
            <div className="relative flex items-start gap-1.5 pr-11">
              <div className="flex w-5 shrink-0 flex-col items-center">
                <span className="block rounded-md bg-black/15 px-1.5 py-0.5 text-center text-[10px] font-semibold leading-4 text-gray-400">
                  {index + 1}
                </span>
                {row.fav && (
                  <span className="-mt-0.5 inline-flex h-3.5 w-3.5 items-center justify-center text-amber-300">
                    <Star size={10} fill="currentColor" />
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-[11px] font-semibold text-primary-300">
                  {row.primary}
                </div>
                <div className="truncate text-[10px] text-gray-500">{row.secondary}</div>
              </div>
              <div className="absolute right-0 top-0 flex w-10 flex-col items-center">
                <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.045] px-1.5 py-0.5 text-[10px] font-semibold text-gray-200">
                  {row.score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommentairesView({ judges }: { judges: Judge[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-3">
      <div className="space-y-2">
        {PARTICIPANTS.slice(0, 4).map((p) => (
          <div
            key={p.rank}
            className="rounded-md border border-gray-700/60 bg-[rgb(14_14_18)]/60 p-2"
          >
            <div className="mb-1.5 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-primary-300">{p.author}</div>
                {p.title && p.title !== p.author && (
                  <div className="text-[10px] text-gray-500">{p.title}</div>
                )}
              </div>
              <span className="rounded-md border border-white/10 bg-white/[0.045] px-1.5 py-0.5 text-[10px] font-semibold text-gray-200">
                {p.totals.avg.toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {judges
                .filter((j) => j.loaded)
                .map((j) => (
                  <div
                    key={j.name}
                    className="rounded-md border border-gray-700/55 bg-[rgb(14_14_18)]/55 px-2 py-1.5"
                    style={{ boxShadow: `inset 2px 0 0 0 ${j.color ?? '#60a5fa'}` }}
                  >
                    <div className="text-[9px] uppercase tracking-wider text-gray-500">
                      {j.name}
                    </div>
                    <div className="mt-0.5 text-[10px] text-gray-300">
                      {p.rank === 1
                        ? 'Rythme parfait, finition au top.'
                        : p.rank === 2
                        ? 'Bonne narration mais effets limités.'
                        : 'Choix créatifs solides.'}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotesPanel(_props: { judges: Judge[] }) {
  return (
    <div className="shrink-0 border-t border-gray-700 bg-[rgb(20_20_26)] px-3 py-2">
      <div className="mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500">
        Commentaire général
        <span className="text-primary-400">— {PARTICIPANTS[0].author}</span>
        <span className="text-gray-500">{PARTICIPANTS[0].author}</span>
      </div>
      <div className="flex h-10 items-start rounded-md border border-gray-700/60 bg-black/30 px-2 py-1.5 text-[10px] text-gray-500">
        Rythme parfait — direction artistique au top, compositing soigné.
      </div>
    </div>
  )
}
