import { FilePlus, FolderOpen, Folder, Trash2 } from 'lucide-react'

type Project = {
  name: string
  judgeName: string
  updatedAt: string
}

const DEFAULT_PROJECTS: Project[] = [
  { name: 'Japan Expo 2025', judgeName: 'Lightning', updatedAt: '14 juil. 2025 · 22:18' },
  { name: 'AMV Contest #14', judgeName: 'Lightning', updatedAt: '08 juin 2025 · 14:32' },
  { name: 'AnimeNYC 2024', judgeName: 'Lightning', updatedAt: '17 nov. 2024 · 19:05' },
]

export function WelcomeMock({
  projects = DEFAULT_PROJECTS,
  hoverNew,
}: {
  projects?: Project[]
  hoverNew?: boolean
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-[12px] text-gray-500">
            Outil de notation pour compétitions AMV
          </p>
        </div>

        <div className="mb-8 flex gap-3">
          <button
            data-action="new-project"
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-[13px] font-medium text-white transition-all ${
              hoverNew ? 'bg-primary-500 ring-2 ring-primary-400/40' : ''
            }`}
          >
            <FilePlus size={16} />
            Nouveau projet
          </button>
          <button
            data-action="open-project"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-[rgb(26_26_46)] px-4 py-3 text-[13px] font-medium text-gray-300"
          >
            <FolderOpen size={16} />
            Ouvrir un projet
          </button>
        </div>

        <div>
          <h3 className="mb-2 flex items-center gap-1.5 px-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
            <Folder size={11} /> Projets
          </h3>
          <div className="space-y-1">
            {projects.map((p, i) => (
              <div
                key={i}
                data-project-row={i}
                className="flex items-stretch gap-2 rounded-lg border border-gray-800 bg-[rgb(20_20_26)]/50 p-0.5 transition-colors hover:border-gray-700"
              >
                <button className="flex min-w-0 flex-1 items-center gap-3 rounded-md px-3 py-2 text-left">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-white">{p.name}</div>
                    <div className="truncate text-[10px] text-gray-500">
                      <span className="text-gray-400">{p.judgeName} — </span>
                      {p.updatedAt}
                    </div>
                  </div>
                </button>
                <button className="flex w-9 shrink-0 items-center justify-center rounded-md text-red-500/80 transition-colors hover:bg-red-500/10">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 truncate text-center text-[10px] text-gray-600">
          Dossier : C:\Users\Lightning\Documents\AMV Notation\Projets
        </p>
      </div>
    </div>
  )
}
