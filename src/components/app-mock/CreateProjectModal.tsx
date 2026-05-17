import { X, Check, Settings2, Plus, ChevronDown } from 'lucide-react'

type Props = {
  open: boolean
  name?: string
  judge?: string
  clipNamePattern?: 'pseudo-clip' | 'clip-pseudo'
  contestCategoriesEnabled?: boolean
}

export function CreateProjectModalMock({
  open,
  name = '',
  judge = '',
  clipNamePattern = 'pseudo-clip',
  contestCategoriesEnabled = false,
}: Props) {
  return (
    <div
      data-modal="create-project"
      className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
      style={{ opacity: open ? 1 : 0 }}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
      <div className="relative flex w-[480px] max-h-[90%] flex-col overflow-hidden rounded-xl border border-gray-700 bg-[rgb(20_20_26)] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Nouveau concours</h2>
          <button
            aria-label="Fermer"
            className="rounded-sm p-1 text-gray-400 transition-colors hover:bg-[rgb(28_28_36)] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <form className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-300">
              Nom du concours
            </label>
            <div
              data-field="name"
              className="flex h-9 items-center rounded-[10px] border border-gray-700 bg-[rgb(14_14_18)] px-3 text-sm text-white"
            >
              {name ? (
                <>
                  <span>{name}</span>
                  <span
                    data-caret
                    className="ml-0.5 h-4 w-[1.5px] bg-primary-400 opacity-90"
                    style={{ animation: 'caret 1s steps(1) infinite' }}
                  />
                </>
              ) : (
                <span className="text-gray-600">ex: Concours Japan Expo</span>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-300">Nom du juge</label>
            <div
              data-field="judge"
              className="flex h-9 items-center rounded-[10px] border border-gray-700 bg-[rgb(14_14_18)] px-3 text-sm text-white"
            >
              {judge ? (
                <span>{judge}</span>
              ) : (
                <span className="text-gray-600">ex: Nestuma</span>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-300">
              Convention des noms de clips
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'pseudo-clip', label: 'Pseudo - Clip', ex: 'Pseudo - Titre.mp4' },
                { id: 'clip-pseudo', label: 'Clip - Pseudo', ex: 'Titre - Pseudo.mp4' },
              ].map((opt) => {
                const active = clipNamePattern === opt.id
                return (
                  <button
                    type="button"
                    key={opt.id}
                    data-clip-pattern={opt.id}
                    className={`relative rounded-[10px] border px-3 py-2 text-left transition-colors ${
                      active
                        ? 'border-primary-500 bg-[rgb(14_14_18)]'
                        : 'border-gray-700 bg-[rgb(14_14_18)] hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[12px] font-medium text-white">
                      {opt.label}
                      {active && <Check size={14} className="text-primary-400" />}
                    </div>
                    <div className="mt-0.5 text-[10px] font-mono text-gray-500">{opt.ex}</div>
                  </button>
                )
              })}
            </div>
            <p className="mt-1.5 text-[10px] text-gray-500">
              Utilisé pour séparer auteur de la vidéo dans le titre. Ne fait que faciliter l'import vidéo.
            </p>
          </div>

          {/* Activer catégories concours rapides — toggle row separate */}
          <label className="flex cursor-pointer items-center justify-between">
            <div>
              <div className="text-xs font-medium text-white">Activer les catégories concours rapides</div>
              <div className="mt-0.5 text-[10px] text-gray-500">
                Active des étiquettes de catégorie de concours rapides.
              </div>
            </div>
            <span
              className={`relative h-5 w-9 shrink-0 rounded-full ring-1 ring-inset ring-primary-400/10 transition-colors ${
                contestCategoriesEnabled ? 'bg-primary-600' : 'bg-gray-700'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  contestCategoriesEnabled ? 'translate-x-4' : ''
                }`}
              />
            </span>
          </label>

          {/* Barème selector w/ side action buttons */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-medium text-gray-300">Barème</label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-md text-primary-400 hover:bg-[rgb(28_28_36)] hover:text-primary-300"
                  title="Gérer"
                >
                  <Settings2 size={13} />
                </button>
                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-md text-primary-400 hover:bg-[rgb(28_28_36)] hover:text-primary-300"
                  title="Créer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-[10px] border border-gray-700 bg-[rgb(14_14_18)] px-3 py-2 text-left text-sm text-white"
            >
              <span className="truncate">
                Japan Expo 2025 <span className="text-gray-500">(9 critères, 60 pts)</span>
              </span>
              <ChevronDown size={16} className="ml-3 shrink-0 text-gray-500" />
            </button>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-[10px] px-3 py-2 text-sm text-gray-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              data-action="create"
              className="rounded-[10px] bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500"
            >
              Créer le concours
            </button>
          </div>
        </form>
      </div>
      <style>{`@keyframes caret { 0%,50% { opacity: 1 } 50.01%,100% { opacity: 0 } }`}</style>
    </div>
  )
}
