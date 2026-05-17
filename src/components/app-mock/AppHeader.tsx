import {
  Home,
  SlidersHorizontal,
  Download,
  Upload,
  ChevronDown,
  FolderOpen,
  BarChart2,
} from 'lucide-react'

type Tab = 'notation' | 'resultats' | 'export'
type Interface = 'spreadsheet' | 'notation' | 'dual'

type Props = {
  projectName: string
  judgeName?: string
  dirty?: boolean
  activeTab: Tab
  activeInterface: Interface
  hasProject?: boolean
  hasUpdateAvailable?: boolean
  baremeName?: string
}

// Custom SVG icons from real app's UI_ICONS registry.
function GridNotationIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth={2} />
      <path d="M10 4.5V19.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M4.5 9H19.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M4.5 14H19.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}
function GridSpreadsheetIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth={2} />
      <path d="M4.5 9H19.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M4.5 14H19.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M4.5 19H19.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

const TABS: { id: Tab; label: string; Icon: (p: { size?: number }) => any }[] = [
  { id: 'notation', label: 'Notation', Icon: GridNotationIcon },
  { id: 'resultats', label: 'Résultat', Icon: ({ size = 11 }) => <BarChart2 size={size} /> },
  { id: 'export', label: 'Export', Icon: ({ size = 11 }) => <Download size={size} /> },
]

// Inline French flag (compact 32x20 like LanguageFlagIcon.tsx)
function FrenchFlag() {
  return (
    <span className="inline-flex h-3.5 w-[18px] overflow-hidden rounded border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <svg viewBox="0 0 32 20" className="h-full w-full">
        <rect x="0" y="0" width="32" height="20" fill="#f8fafc" />
        <rect x="0" y="0" width="10.67" height="20" fill="#2563eb" />
        <rect x="21.33" y="0" width="10.67" height="20" fill="#dc2626" />
      </svg>
    </span>
  )
}

export function AppHeader({
  projectName,
  judgeName,
  dirty,
  activeTab,
  activeInterface,
  hasProject = true,
  hasUpdateAvailable = false,
  baremeName = 'Barème JE 2025',
}: Props) {
  const showModeSwitcher = hasProject && activeTab === 'notation'
  const showTabs = hasProject
  const spreadsheetActive =
    activeInterface === 'spreadsheet' || activeInterface === 'dual'
  const notationActive =
    activeInterface === 'notation' || activeInterface === 'dual'

  return (
    <header
      className="relative z-30 grid shrink-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 bg-[rgb(20_20_26)] px-3 py-0"
      style={{ minHeight: 22 }}
    >
      {/* LEFT: home + title */}
      <div className="relative z-10 col-start-1 flex min-w-0 items-center gap-0.5 justify-self-start">
        {hasProject && (
          <button
            data-action="home"
            className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-[rgb(28_28_36)] hover:text-white"
            title="Fermer le projet"
          >
            <Home size={11} className="shrink-0" />
          </button>
        )}
        <div className="flex min-w-0 items-center gap-1.5">
          <h1 className="truncate text-[13px] font-bold leading-[1.1] tracking-tight text-white">
            {projectName}
          </h1>
          {hasProject && judgeName && (
            <span className="hidden shrink min-w-0 truncate text-xs leading-[1.1] text-gray-500 md:inline">
              — {judgeName}
            </span>
          )}
          {hasProject && (
            <span
              className={`inline-block w-2 text-[#e94560] transition-opacity ${
                dirty ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={!dirty}
            >
              *
            </span>
          )}
        </div>
      </div>

      {/* CENTER: interface + notation mode switcher */}
      {(showModeSwitcher || showTabs) && (
        <div className="relative z-10 col-start-2 flex items-center justify-self-center">
          <div className="relative flex items-center">
            {showModeSwitcher && (
              <div
                className={`absolute right-full top-1/2 mr-1 -translate-y-1/2 flex items-center overflow-hidden rounded-md bg-[rgb(14_14_18)] p-0 transition-shadow ${
                  activeInterface === 'dual'
                    ? 'ring-1 ring-inset ring-primary-400/40'
                    : ''
                }`}
                title={activeInterface === 'dual' ? 'Mode Dual : Tableur + Commentaires' : undefined}
              >
                <button
                  data-mode="spreadsheet"
                  className={`h-[22px] rounded-l-[5px] px-1.5 text-[11px] leading-none transition-all ${
                    activeInterface === 'dual'
                      ? 'bg-primary-600/60 text-white'
                      : spreadsheetActive
                      ? 'bg-primary-600/80 text-white shadow-xs'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-0.5">
                    <GridSpreadsheetIcon size={11} />
                    <span className="hidden lg:inline">Tableur</span>
                  </span>
                </button>
                <button
                  data-mode="notation"
                  className={`h-[22px] rounded-r-[5px] px-1.5 text-[11px] leading-none transition-all ${
                    activeInterface === 'dual'
                      ? 'bg-primary-600/60 text-white'
                      : notationActive
                      ? 'bg-primary-600/80 text-white shadow-xs'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-0.5">
                    <GridNotationIcon size={11} />
                    <span className="hidden lg:inline">Commentaires</span>
                  </span>
                </button>
              </div>
            )}
            {showTabs && (
              <div
                data-tab-switcher
                className="flex items-center overflow-hidden rounded-md bg-[rgb(14_14_18)] p-0"
              >
                {TABS.map((tab) => {
                  const Icon = tab.Icon
                  const active = tab.id === activeTab
                  return (
                    <button
                      key={tab.id}
                      data-tab={tab.id}
                      className={`inline-flex h-[22px] items-center gap-0.5 px-1.5 text-[11px] leading-none transition-all first:rounded-l-[5px] last:rounded-r-[5px] ${
                        active
                          ? 'bg-primary-600/80 text-white shadow-xs'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon size={11} />
                      <span className="hidden lg:inline">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* RIGHT: import/export, language, bareme, project, settings */}
      <div className="relative z-10 col-start-3 flex items-center gap-0.5 justify-self-end">
        {hasProject && activeTab === 'resultats' && (
          <button
            data-action="import-judge"
            className="app-header-trigger gap-0.5"
            title="Importer un juge"
          >
            <Upload size={11} className="shrink-0" />
            <span className="hidden leading-none lg:inline">Importer un juge</span>
          </button>
        )}
        {hasProject && activeTab === 'notation' && (
          <button
            data-action="export-judge"
            className="app-header-trigger gap-0.5"
            title="Exporter notation"
          >
            <Download size={11} className="shrink-0" />
            <span className="hidden leading-none lg:inline">Exporter notation</span>
          </button>
        )}
        <button
          className="app-header-trigger w-[22px] !px-0"
          title="Langue"
          data-action="language"
        >
          <FrenchFlag />
        </button>
        {hasProject && (
          <button className="app-header-trigger gap-0.5" title="Barème" data-action="bareme">
            <span className="hidden lg:inline">{baremeName}</span>
            <ChevronDown size={10} className="opacity-60" />
          </button>
        )}
        {hasProject && (
          <button
            className="app-header-trigger gap-0.5"
            title="Fichier"
            data-action="project-manager"
          >
            <FolderOpen size={11} />
            <span className="hidden lg:inline">Fichier</span>
            <ChevronDown size={10} className="opacity-60" />
          </button>
        )}
        <button
          className={`app-header-trigger relative w-[22px] !px-0 ${
            hasUpdateAvailable ? 'ring-1 ring-inset ring-emerald-400/40' : ''
          }`}
          title="Paramètres"
          data-action="settings"
        >
          <SlidersHorizontal size={12} className="shrink-0" />
          {hasUpdateAvailable && (
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_2px_rgba(0,0,0,0.6)]" />
          )}
        </button>
      </div>
    </header>
  )
}
