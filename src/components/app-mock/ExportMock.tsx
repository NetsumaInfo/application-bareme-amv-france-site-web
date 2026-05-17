import {
  MessageCircle,
  Image as ImageIcon,
  Table2,
  ChevronDown,
  FileImage,
  FileText,
  FileJson,
  FileSpreadsheet,
  Code2,
  Hash,
  Copy,
  Download as DLIcon,
  RefreshCw,
  AtSign,
} from 'lucide-react'
import { BAREME_JE2025, PARTICIPANTS } from '@/data/je2025'

type Layout = 'discord' | 'poster' | 'table'
type TableFormat = 'png' | 'pdf' | 'excel' | 'html' | 'notes' | 'json'

const LAYOUTS: { id: Layout; label: string; icon: typeof MessageCircle }[] = [
  { id: 'discord', label: 'Discord', icon: MessageCircle },
  { id: 'poster', label: 'Affiche créative', icon: ImageIcon },
  { id: 'table', label: 'Tableau complet', icon: Table2 },
]

const TABLE_FORMATS: { id: TableFormat; label: string; icon: typeof FileImage }[] = [
  { id: 'png', label: 'PNG', icon: FileImage },
  { id: 'pdf', label: 'PDF', icon: FileText },
  { id: 'excel', label: 'Excel', icon: FileSpreadsheet },
  { id: 'html', label: 'HTML', icon: Code2 },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'json', label: 'JSON', icon: FileJson },
]

function alpha(hex: string, a: number) {
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return hex
  const r = parseInt(m[1], 16)
  const g = parseInt(m[2], 16)
  const b = parseInt(m[3], 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function ExportMock({
  format = 'table' as Layout | 'png' | 'pdf' | 'json' | 'table',
  tableView = 'detailed',
  pngScale = 3,
}: {
  format?: Layout | 'png' | 'pdf' | 'json' | 'table'
  tableView?: 'detailed' | 'category'
  pngScale?: number
  notesPdfMode?: 'separate' | 'with_results' | 'both'
}) {
  const layout: Layout = ['discord', 'poster', 'table'].includes(format as Layout)
    ? (format as Layout)
    : 'table'
  const tableFormat: TableFormat = (['png', 'pdf', 'excel', 'html', 'notes', 'json'].includes(format as TableFormat)
    ? (format as TableFormat)
    : 'pdf') as TableFormat

  return (
    <div className="flex h-full">
      {/* Left panel — varies per layout */}
      <div className="w-[230px] shrink-0 overflow-y-auto border-r border-gray-700/60 bg-[rgb(14_14_18)] p-2.5 text-[10px] text-gray-300">
        {/* Layout switcher row (always visible at top) */}
        <div className="mb-3 flex items-center gap-0.5 rounded-md bg-[rgb(20_20_26)] p-0.5">
          {LAYOUTS.map((l) => {
            const Icon = l.icon
            const active = l.id === layout
            return (
              <button
                key={l.id}
                data-format={l.id}
                className={`flex flex-1 items-center justify-center gap-1 rounded-[5px] px-1.5 py-1 text-[10px] transition-all ${
                  active
                    ? 'bg-white/[0.06] text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon size={11} />
                <span className="hidden xl:inline">{l.label}</span>
              </button>
            )
          })}
        </div>

        {layout === 'discord' && <DiscordPanel />}
        {layout === 'poster' && <PosterPanel />}
        {layout === 'table' && <TablePanel tableFormat={tableFormat} tableView={tableView} pngScale={pngScale} />}
      </div>

      {/* Preview — varies per layout */}
      <div className="flex flex-1 items-stretch overflow-auto p-4">
        {layout === 'discord' && <DiscordPreview />}
        {layout === 'poster' && <PosterPreview />}
        {layout === 'table' && <TablePreview />}
      </div>
    </div>
  )
}

/* ───── Discord panel ───── */
function DiscordPanel() {
  return (
    <>
      <div className="mb-2">
        <div className="mb-1 font-semibold uppercase tracking-wider text-gray-500">
          Annonce Discord
        </div>
        <p className="text-[9px] leading-snug text-gray-500">
          Édite le classement final puis copie-le en Markdown prêt pour Discord.
        </p>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-1.5">
        {[
          { label: 'Caractères', value: '247' },
          { label: 'Blocs', value: '1' },
          { label: 'Résultats', value: '4' },
          { label: 'Favoris', value: '0' },
        ].map((s) => (
          <div key={s.label} className="rounded-md border border-gray-800 bg-black/30 px-1.5 py-1">
            <div className="text-[8px] uppercase tracking-wider text-gray-500">{s.label}</div>
            <div className="text-[12px] font-semibold tabular-nums text-white">{s.value}</div>
          </div>
        ))}
        <div className="col-span-2 rounded-md border border-gray-800 bg-black/30 px-1.5 py-1">
          <div className="text-[8px] uppercase tracking-wider text-gray-500">Limite</div>
          <div className="text-[12px] font-semibold tabular-nums text-white">2000</div>
        </div>
      </div>
      <div className="mb-2">
        <div className="mb-1 text-[8px] uppercase tracking-wider text-gray-500">Catégories clip</div>
        <button className="flex h-7 w-full items-center justify-between rounded-md border border-gray-700 bg-black/30 px-2 text-[11px] text-gray-300">
          Toutes catégories
          <ChevronDown size={11} className="text-gray-500" />
        </button>
      </div>
      <div className="mb-2">
        <div className="mb-1 text-[8px] uppercase tracking-wider text-gray-500">Mentions / Pings</div>
        <p className="mb-1 text-[9px] text-gray-500">Utilise <code>@everyone</code>, <code>@here</code>.</p>
        <div className="flex gap-1">
          <span className="inline-flex h-5 items-center gap-1 rounded border border-primary-500/40 bg-primary-500/10 px-1.5 text-[10px] text-primary-200">
            <AtSign size={9} /> @everyone
          </span>
          <span className="inline-flex h-5 items-center gap-1 rounded border border-gray-700 bg-black/30 px-1.5 text-[10px] text-gray-400">
            @here
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <button className="flex w-full items-center gap-1.5 rounded-md border border-gray-700 bg-black/30 px-2 py-1.5 text-[10px] text-gray-300 hover:text-white">
          <Copy size={10} /> Copier l'annonce
        </button>
        <button className="flex w-full items-center gap-1.5 rounded-md border border-gray-700 bg-black/30 px-2 py-1.5 text-[10px] text-gray-300 hover:text-white">
          <Copy size={10} /> Copier le bloc sélectionné
        </button>
        <button className="flex w-full items-center gap-1.5 rounded-md border border-gray-700 bg-black/30 px-2 py-1.5 text-[10px] text-gray-300 hover:text-white">
          <DLIcon size={10} /> Télécharger en TXT
        </button>
        <button className="flex w-full items-center gap-1.5 rounded-md border border-gray-700 bg-black/30 px-2 py-1.5 text-[10px] text-gray-300 hover:text-white">
          <RefreshCw size={10} /> Régénérer depuis les résultats
        </button>
      </div>
      <div className="mt-3">
        <div className="mb-1 text-[8px] uppercase tracking-wider text-gray-500">Bloc Discord</div>
        <button className="flex h-7 w-full items-center justify-between rounded-md border border-gray-700 bg-black/30 px-2 text-[11px] text-gray-300">
          Bloc 1
          <ChevronDown size={11} className="text-gray-500" />
        </button>
      </div>
      <div className="mt-3">
        <div className="mb-1 text-[8px] uppercase tracking-wider text-gray-500">Résultats</div>
        <div className="mb-1.5 text-[10px] text-gray-500">Nombre de lignes</div>
        <div className="flex h-7 items-center rounded-md border border-gray-700 bg-black/30 px-2 text-[11px] text-white">
          20
        </div>
        <label className="mt-1.5 flex items-center gap-1.5 text-[10px] text-gray-300">
          <span className="inline-block h-3 w-3 rounded border border-primary-500 bg-primary-500/40" />
          Afficher le nom du clip
        </label>
        <label className="mt-0.5 flex items-center gap-1.5 text-[10px] text-gray-300">
          <span className="inline-block h-3 w-3 rounded border border-primary-500 bg-primary-500/40" />
          Afficher les favoris
        </label>
      </div>
    </>
  )
}

function DiscordPreview() {
  return (
    <div className="mx-auto h-full w-full max-w-[640px] overflow-auto rounded-md border border-gray-800 bg-[#36393F] font-sans text-white">
      <div className="flex items-center gap-2 border-b border-black/40 px-3 py-2 text-[12px]">
        <Hash size={14} className="text-gray-400" />
        <span className="font-semibold">resultats</span>
        <span className="ml-auto text-[10px] text-gray-400">4 résultats · 247 caractères</span>
      </div>
      <div className="flex gap-3 p-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-600 text-[11px] font-bold">A</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[12px] font-medium text-white">@everyone</span>
            <span className="text-[10px] text-gray-400">Aujourd'hui à 20:37</span>
          </div>
          <div className="mt-1 text-[11px] text-gray-200">
            @everyone, rôle ou salon optionnel
          </div>
          <h3 className="mt-2 text-[16px] font-bold tracking-tight text-white">Résultats concours</h3>
          <p className="mt-1 text-[11px] text-gray-300">
            Merci à tous pour vos participations. Voici le classement final.
          </p>
          <h4 className="mt-3 text-[14px] font-bold text-white">RANKING :</h4>
          <div className="mt-1.5 space-y-1.5">
            {PARTICIPANTS.slice(0, 4).map((p, i) => (
              <div
                key={p.rank}
                className={`rounded-md px-3 py-1.5 text-[11px] ${
                  i === 0 ? 'bg-primary-700/40' : 'bg-[#2F3136]'
                }`}
              >
                <span className="font-mono">{p.rank}.</span>
                <span className="ml-2 font-semibold text-white">{p.author}</span>
                <span className="text-gray-400"> – {p.title}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-gray-300">Bravo à tout le monde et merci aux juges.</p>
        </div>
      </div>
    </div>
  )
}

/* ───── Poster panel ───── */
function PosterPanel() {
  return (
    <>
      <div className="mb-2">
        <div className="mb-1 font-semibold uppercase tracking-wider text-gray-500">Affiche créative</div>
      </div>
      {[
        { label: 'Catégories', val: 'Toutes catégories' },
        { label: 'Format', val: 'PNG' },
      ].map((r) => (
        <div key={r.label} className="mb-2">
          <div className="mb-1 text-[8px] uppercase tracking-wider text-gray-500">{r.label}</div>
          <button className="flex h-7 w-full items-center justify-between rounded-md border border-gray-700 bg-black/30 px-2 text-[11px] text-gray-300">
            {r.val}
            <ChevronDown size={11} className="text-gray-500" />
          </button>
        </div>
      ))}
      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between text-[8px] uppercase tracking-wider text-gray-500">
          <span>Échelle PNG</span>
          <span className="tabular-nums text-gray-300">×3</span>
        </div>
        <input type="range" min={1} max={4} step={0.5} defaultValue={3} className="w-full accent-primary-500" />
      </div>
      <div className="mb-2">
        <div className="mb-1 text-[8px] uppercase tracking-wider text-gray-500">Image arrière-plan</div>
        <div className="flex h-12 items-center justify-center rounded-md border border-dashed border-gray-700 bg-black/30 text-[9px] text-gray-500">
          Déposer image
        </div>
      </div>
      <div className="mb-2">
        <div className="mb-1 text-[8px] uppercase tracking-wider text-gray-500">Titre</div>
        <div className="flex h-7 items-center rounded-md border border-gray-700 bg-black/30 px-2 text-[11px] text-white">
          Japan Expo  - Résultats
        </div>
      </div>
      <div className="mb-2">
        <div className="mb-1 text-[8px] uppercase tracking-wider text-gray-500">Sous-titre</div>
        <div className="flex h-7 items-center rounded-md border border-gray-700 bg-black/30 px-2 text-[11px] text-white">
          Résultats officiels
        </div>
      </div>
      <button className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-primary-600 px-3 py-2 text-[11px] font-medium text-white hover:bg-primary-500">
        <DLIcon size={11} /> Exporter
      </button>
    </>
  )
}

function PosterPreview() {
  return (
    <div className="mx-auto flex h-full w-full max-w-[480px] flex-col items-center justify-start overflow-auto rounded-md border border-gray-800 bg-black p-6">
      <h1 className="text-[22px] font-bold tracking-tight text-white">Japan Expo  - Résultats</h1>
      <p className="mt-1 text-[11px] text-gray-400">Résultats officiels</p>
      <div className="mt-6 w-full space-y-1.5 rounded-md bg-black/60 p-3 text-left">
        {PARTICIPANTS.slice(0, 3).map((p) => (
          <div key={p.rank} className="text-[12px] text-white">
            <span className="font-mono">{p.rank}.</span>{' '}
            <span className="font-semibold">{p.author}</span>
            <span className="text-gray-400"> - {p.title}</span>
            <span className="text-gray-500"> ({p.totals.avg.toFixed(1)})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───── Table panel + preview ───── */
function TablePanel({
  tableFormat,
  tableView: _tableView,
  pngScale: _pngScale,
}: {
  tableFormat: TableFormat
  tableView: 'detailed' | 'category'
  pngScale: number
}) {
  return (
    <>
      <div className="mb-3">
        <div className="mb-1.5 text-[8px] uppercase tracking-wider text-gray-500">
          Format de fichier
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {TABLE_FORMATS.map((f) => {
            const Icon = f.icon
            const active = f.id === tableFormat
            return (
              <button
                key={f.id}
                data-format={f.id}
                className={`group flex flex-col items-center gap-1 rounded-md border border-transparent px-0.5 py-1 text-[10px] transition-colors ${
                  active
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-[10px] border transition-colors ${
                    active
                      ? 'border-primary-500/45 bg-primary-500/10 text-primary-200'
                      : 'border-gray-800 bg-black/40 text-gray-400 group-hover:border-gray-700'
                  }`}
                >
                  <Icon size={15} />
                </span>
                <span className="text-[9px] leading-none">{f.label}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="mb-3 space-y-2 border-t border-gray-800/70 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] text-gray-500">PNG</span>
          <div className="flex h-7 overflow-hidden rounded-[10px] border border-primary-500/25 bg-black/45">
            {['1×', '2×', '3×', '4×'].map((label, idx) => (
              <button
                key={label}
                className={`px-3 text-[11px] ${
                  idx === 1
                    ? 'bg-primary-500/20 text-primary-100'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex h-7 overflow-hidden rounded-[10px] border border-primary-500/25 bg-black/45">
            {['Unique', 'Paginé'].map((label, idx) => (
              <button
                key={label}
                className={`px-3 text-[11px] ${
                  idx === 0
                    ? 'bg-primary-500/20 text-primary-100'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] text-gray-500">Notes</span>
          <div className="flex h-7 overflow-hidden rounded-[10px] border border-primary-500/25 bg-black/45">
            {['Générales', 'Juges', 'Toutes'].map((label, idx) => (
              <button
                key={label}
                className={`px-3 text-[11px] ${
                  idx === 2
                    ? 'bg-primary-500/20 text-primary-100'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] text-gray-500">JSON</span>
          <button className="flex h-9 w-full items-center justify-between rounded-[12px] border border-primary-500/25 bg-black/45 px-3 text-[12px] text-gray-100">
            Projet complet
            <ChevronDown size={13} className="text-gray-500" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] text-gray-500">Catégories clip</span>
          <button className="flex h-9 w-full items-center justify-between rounded-[12px] border border-primary-500/25 bg-black/45 px-3 text-[12px] text-gray-100">
            Toutes catégo...
            <ChevronDown size={13} className="text-gray-500" />
          </button>
        </div>
      </div>
    </>
  )
}

function TablePreview() {
  return (
    <div className="mx-auto h-full w-full max-w-[820px] overflow-auto rounded-md border border-gray-800 bg-[rgb(11_12_28)]">
      <div className="border-b border-gray-800 px-4 py-3">
        <div className="text-[12px] font-bold tracking-tight text-white">Japan Expo 2025</div>
        <div className="text-[10px] text-gray-500">
          Classement final · {PARTICIPANTS.length} clips · 3 juges
        </div>
      </div>
      <table className="w-full text-[10px]">
        <thead>
          <tr>
            <th className="w-8 border-b border-gray-800 px-2 py-1 text-[9px] uppercase tracking-wider text-gray-500">
              #
            </th>
            <th className="border-b border-gray-800 px-2 py-1 text-left text-[9px] uppercase tracking-wider text-gray-500">
              Participant
            </th>
            {BAREME_JE2025.map((c) => (
              <th
                key={c.id}
                className="border-b border-gray-800 px-1 py-1 text-center text-[9px] uppercase tracking-wider"
                style={{ color: c.color, backgroundColor: alpha(c.color, 0.08) }}
              >
                {c.short}
              </th>
            ))}
            <th className="border-b border-gray-800 px-2 py-1 text-right text-[9px] uppercase tracking-wider text-gray-500">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {PARTICIPANTS.slice(0, 8).map((p, i) => {
            const avgCats = BAREME_JE2025.map((_, ci) => {
              const vals = [
                p.lightningCats[ci],
                p.lokkicluCats[ci],
                p.daCats?.[ci],
              ].filter((v): v is number => typeof v === 'number')
              return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
            })
            return (
              <tr key={p.rank} className={`border-b border-gray-800/50 ${i < 3 ? 'bg-white/[0.02]' : ''}`}>
                <td className="px-2 py-1 text-center text-gray-400">{p.rank}</td>
                <td className="px-2 py-1">
                  <div className="text-white">{p.author}</div>
                  <div className="text-[9px] text-gray-500">{p.title}</div>
                </td>
                {avgCats.map((v, j) => (
                  <td key={j} className="px-1 py-1 text-center tabular-nums text-gray-300">
                    {v.toFixed(1)}
                  </td>
                ))}
                <td className="px-2 py-1 text-right font-semibold tabular-nums text-white">
                  {p.totals.avg.toFixed(2)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
