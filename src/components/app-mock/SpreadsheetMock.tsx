import { Star, FolderOpen, FileVideo, Table2 } from 'lucide-react'
import { BAREME_JE2025, PARTICIPANTS, TOTAL_MAX } from '@/data/je2025'

const FLAT_CRIT = BAREME_JE2025.flatMap((c, ci) =>
  c.criteria.map((cr) => ({ ...cr, catId: c.id, catColor: c.color, catIndex: ci })),
)

function alpha(hex: string, a: number) {
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return hex
  const r = parseInt(m[1], 16)
  const g = parseInt(m[2], 16)
  const b = parseInt(m[3], 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

type Row = {
  id: string
  author: string
  title: string
  scores: number[]
  total?: number
  fav?: boolean
}

const DEFAULT_ROWS: Row[] = PARTICIPANTS.slice(0, 8).map((p, i) => ({
  id: String(i + 1),
  author: p.author,
  title: p.title,
  scores: i < 5 ? p.lightning : [],
  total: i < 5 ? p.totals.lightning : undefined,
  fav: p.fav,
}))

export function SpreadsheetMock({
  rows = DEFAULT_ROWS,
  selectedIndex = 0,
  empty,
  showCommentFooter = false,
}: {
  rows?: Row[]
  selectedIndex?: number
  empty?: boolean
  showCommentFooter?: boolean
}) {
  if (empty) {
    return (
      <div className="flex h-full items-center justify-center px-6">
        <div
          className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg border border-dashed border-gray-600/60 px-8 py-10 text-center"
        >
          <p className="text-[12px] text-gray-400">
            Glissez-déposez des vidéos ici, ou
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              data-action="import-folder"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-primary-500"
            >
              <FolderOpen size={13} /> Importer un dossier
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-700 bg-[rgb(20_20_26)] px-3 py-1.5 text-[12px] text-gray-300 hover:text-white">
              <FileVideo size={13} /> Importer des fichiers
            </button>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-700 bg-[rgb(20_20_26)] px-3 py-1.5 text-[12px] text-gray-300 hover:text-white">
            <Table2 size={13} /> Créer un tableau sans vidéos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <table className="w-full border-collapse text-[11px]">
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
                  data-category={cat.id}
                  colSpan={cat.criteria.length}
                  className="border-b border-r px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider"
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
                className="min-w-[56px] border-b border-gray-700 bg-[rgb(11_12_28)] px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider"
              >
                Total
                <div className="font-normal text-gray-500">/{TOTAL_MAX}</div>
              </th>
            </tr>
            <tr>
              {FLAT_CRIT.map((crit, idx) => (
                <th
                  key={`${crit.catId}-${idx}`}
                  className="min-w-[76px] border-b border-r border-gray-700 px-1 py-1 text-center text-[9px] font-medium"
                  style={{ backgroundColor: alpha(crit.catColor, 0.08) }}
                >
                  <div className="truncate" style={{ color: alpha(crit.catColor, 0.92) }}>
                    {BAREME_JE2025[crit.catIndex].criteria.length === 1 ? '' : crit.short}
                  </div>
                  <div className="font-normal text-gray-500">/{crit.max}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const isSel = i === selectedIndex
              return (
                <tr
                  key={r.id}
                  data-row={i}
                  className={`border-b border-gray-800/60 ${
                    isSel ? 'bg-primary-600/10' : ''
                  }`}
                >
                  <td className="w-8 border-r border-gray-800/60 px-2 py-1 text-center text-gray-500">
                    {i + 1}
                  </td>
                  <td className="w-[170px] border-r border-gray-800/60 px-2 py-1">
                    <div className="flex items-center gap-1">
                      <span className="truncate text-white">{r.author}</span>
                      {r.fav && (
                        <Star
                          size={9}
                          className="shrink-0 text-amber-400"
                          fill="currentColor"
                        />
                      )}
                    </div>
                    {r.title && r.title !== r.author && (
                      <div className="truncate text-[9px] text-gray-500">{r.title}</div>
                    )}
                  </td>
                  {FLAT_CRIT.map((crit, idx) => {
                    const val = r.scores[idx]
                    return (
                      <td
                        key={`${crit.catId}-${idx}`}
                        data-cell={`${i}-${idx}`}
                        className="border-r border-gray-800/60 px-1 py-1 text-center"
                      >
                        <div
                          className={`mx-auto flex h-5 w-12 items-center justify-center rounded text-[10px] tabular-nums ${
                            val != null ? 'bg-black/30 text-white' : 'text-gray-600'
                          }`}
                        >
                          {val ?? '—'}
                        </div>
                      </td>
                    )
                  })}
                  <td className="min-w-[56px] bg-[rgb(11_12_28)]/60 px-2 py-1 text-center text-[12px] font-semibold tabular-nums text-white">
                    {r.total ?? <span className="text-gray-600">—</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {showCommentFooter && (
        <div className="shrink-0 border-t border-gray-700/60 bg-[rgb(20_20_26)]">
          <div className="flex items-center justify-between gap-3 px-3 py-1.5 text-[11px]">
            <div className="truncate uppercase tracking-wider text-gray-500">
              Commentaire général
              <span className="mx-2 text-gray-700">—</span>
              <span className="normal-case tracking-normal text-primary-300">
                {rows[selectedIndex]?.author ?? '—'}
              </span>
              <span className="mx-1 text-gray-700">·</span>
              <span className="normal-case tracking-normal text-white">
                {rows[selectedIndex]?.title ?? '—'}
              </span>
            </div>
            <div className="hidden items-center gap-3 text-[10px] font-semibold sm:flex">
              {BAREME_JE2025.map((cat, catIdx) => {
                const start = BAREME_JE2025
                  .slice(0, catIdx)
                  .reduce((sum, c) => sum + c.criteria.length, 0)
                const catTotal = cat.criteria.reduce(
                  (sum, _, critIdx) => sum + (rows[selectedIndex]?.scores[start + critIdx] ?? 0),
                  0,
                )
                return (
                  <span key={cat.id} style={{ color: cat.color }}>
                    {cat.label.toUpperCase()} {catTotal || 0}/{cat.max}
                  </span>
                )
              })}
            </div>
          </div>
          <div className="px-3 pb-2">
            <div className="min-h-[28px] rounded border border-gray-700/60 bg-black/30 px-2 py-1 text-[11px] text-gray-500">
              Commentaire général...
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
