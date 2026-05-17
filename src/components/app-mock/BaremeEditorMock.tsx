import {
  Plus,
  Trash2,
  X,
  Upload,
  Eye,
  Copy,
  Download,
  ChevronDown,
} from 'lucide-react'
import { BAREME_JE2025, TOTAL_MAX, TOTAL_CRITERIA } from '@/data/je2025'

type Mode = 'list' | 'edit'

export function BaremeEditorMock({
  mode = 'list',
  newCritLabel,
}: {
  mode?: Mode
  newCritLabel?: string
  categories?: never  // kept for API back-compat; unused
}) {
  return (
    <div
      className="relative flex h-full items-center justify-center px-4 py-3"
      style={{ background: 'rgb(14 14 18)' }}
    >
      {/* Modal — flex column, content scrolls, header + footer pinned */}
      <div className="relative flex h-full w-full max-w-[780px] flex-col overflow-hidden rounded-xl border border-gray-700 bg-[rgb(20_20_26)] shadow-2xl">
        {/* Header (pinned) */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-5 py-3">
          <h2 className="text-[14px] font-semibold text-white">
            {mode === 'list' ? 'Barèmes' : 'Modifier le barème'}
          </h2>
          <button className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Body (scrolls) */}
        <div className="min-h-0 flex-1 overflow-auto">
          {mode === 'list' ? <ListView /> : <EditView newCritLabel={newCritLabel} />}
        </div>

        {/* Footer (pinned) */}
        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-white/5 bg-black/30 px-5 py-3">
          {mode === 'edit' && (
            <button className="rounded-md px-3 py-1.5 text-[12px] text-gray-400 hover:text-white">
              Retour
            </button>
          )}
          {mode === 'edit' ? (
            <button className="rounded-md bg-primary-600 px-4 py-1.5 text-[12px] font-medium text-white hover:bg-primary-500">
              Enregistrer
            </button>
          ) : (
            <button className="rounded-md border border-gray-700 px-4 py-1.5 text-[12px] text-gray-300 hover:text-white">
              Fermer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ListView() {
  return (
    <div className="px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          data-action="new-bareme"
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-700 px-3 py-1.5 text-[12px] text-gray-200 hover:bg-white/5"
        >
          <Plus size={12} /> Créer un barème
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-700 px-3 py-1.5 text-[12px] text-gray-200 hover:bg-white/5">
          <Upload size={12} /> Importer JSON
        </button>
      </div>

      {/* Barème card */}
      <div
        data-category="editing"
        className="rounded-md border border-gray-700 bg-[rgb(14_14_18)] px-4 py-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-white">Japan Expo 2025</h3>
              <span className="inline-flex items-center rounded-sm border border-amber-400/35 bg-amber-400/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-amber-200">
                Totaux cachés
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-gray-500">Barème officiel Japan Expo 2025</p>
            <p className="mt-0.5 text-[10px] text-gray-500">
              {TOTAL_CRITERIA} critères • {TOTAL_MAX} points
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {BAREME_JE2025.map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider"
                  style={{
                    backgroundColor: `${c.color}22`,
                    color: c.color,
                  }}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <button className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-[11px] text-gray-300 hover:bg-white/5 hover:text-white">
              <Eye size={11} /> Voir
            </button>
            <button className="grid h-7 w-7 place-items-center rounded-md text-gray-400 hover:bg-white/5 hover:text-white" title="Dupliquer">
              <Copy size={11} />
            </button>
            <button className="grid h-7 w-7 place-items-center rounded-md text-gray-400 hover:bg-white/5 hover:text-white" title="Exporter">
              <Download size={11} />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[10px] text-gray-500">
        Dossier des barèmes : C:\Users\<i>UserName</i>\Documents\AMV Notation\Projets\Baremes
      </p>
      <p className="text-[10px] text-gray-500">
        Les barèmes personnalisés sont enregistrés automatiquement dans ce dossier.
      </p>
    </div>
  )
}

function EditView({ newCritLabel }: { newCritLabel?: string }) {
  return (
    <div className="px-5 py-4">
      {/* Top fields */}
      <div className="mb-3 grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-gray-500">
            Nom du barème
          </label>
          <div className="flex h-8 items-center rounded-md border border-gray-700 bg-[rgb(14_14_18)] px-2 text-[12px] text-white">
            Japan Expo 2025 (copie)
          </div>
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-gray-500">
            Total points
          </label>
          <div className="flex h-8 items-center rounded-md border border-gray-700 bg-[rgb(14_14_18)] px-2 text-[12px] text-white">
            {TOTAL_MAX} points
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="mb-1 block text-[10px] uppercase tracking-wider text-gray-500">
          Description (optionnel)
        </label>
        <div className="flex h-8 items-center rounded-md border border-gray-700 bg-[rgb(14_14_18)] px-2 text-[12px] text-gray-300">
          Barème officiel Japan Expo 2025
        </div>
      </div>

      <p className="mb-2 text-[10px] text-gray-500">
        <span className="font-medium text-gray-300">Totaux cachés</span> — Les totaux par catégorie ne sont pas affichés aux juges pendant la notation.
      </p>

      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-gray-500">Catégories</span>
      </div>

      {/* Category cards */}
      <div className="space-y-2">
        {BAREME_JE2025.map((cat) => (
          <div
            key={cat.id}
            data-category={cat.id}
            className="overflow-hidden rounded-md border border-gray-700 bg-[rgb(14_14_18)]"
          >
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ backgroundColor: `${cat.color}10` }}
            >
              <div className="flex items-center gap-2">
                <ChevronDown size={11} className="text-gray-500" />
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span
                  className="text-[12px] font-semibold uppercase tracking-wider"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
                <span className="text-[10px] text-gray-500">/ {cat.max}</span>
              </div>
              {/* Color swatch palette */}
              <div className="flex gap-0.5">
                {['#fb923c', '#fbbf24', '#34d399', '#60a5fa', '#c084fc', '#f472b6'].map((c) => (
                  <span
                    key={c}
                    className={`h-3 w-3 rounded-sm ring-1 ring-black/30 ${
                      c === cat.color ? 'ring-white/60' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-1.5 px-3 py-2">
              {cat.criteria.map((c) => (
                <div
                  key={c.id}
                  data-criterion={c.id}
                  className="grid grid-cols-[1fr_60px_60px_auto] items-center gap-2 rounded-md border border-gray-800 bg-black/30 px-2 py-1.5"
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">
                      Nom du critère
                    </div>
                    <div className="text-[12px] text-white">{c.label}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Max</div>
                    <div className="text-[12px] tabular-nums text-white">{c.max}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Pas</div>
                    <div className="text-[12px] tabular-nums text-white">0,5</div>
                  </div>
                  <button className="grid h-6 w-6 place-items-center rounded-md text-gray-500 hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
              {newCritLabel && cat.id === 'montage' && (
                <div
                  data-criterion-new
                  className="grid grid-cols-[1fr_60px_60px_auto] items-center gap-2 rounded-md border border-primary-500/60 bg-primary-600/15 px-2 py-1.5"
                >
                  <div className="text-[12px] text-white">{newCritLabel}</div>
                  <div className="text-[12px] tabular-nums text-white">5</div>
                  <div className="text-[12px] tabular-nums text-white">0,5</div>
                  <span />
                </div>
              )}
              <button
                data-add-criterion
                className="mt-1 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-primary-400 hover:bg-primary-600/10"
              >
                <Plus size={10} /> Ajouter un critère
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
