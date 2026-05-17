import type { ReactNode } from 'react'
import { Minus, Square, X } from 'lucide-react'
import { AppHeader } from './AppHeader'

type Props = {
  children: ReactNode
  projectName?: string
  judgeName?: string
  dirty?: boolean
  activeTab?: 'notation' | 'resultats' | 'export'
  activeInterface?: 'spreadsheet' | 'notation' | 'dual'
  hasProject?: boolean
  hasUpdateAvailable?: boolean
  baremeName?: string
  className?: string
}

export function AppShell({
  children,
  projectName = 'AMV Notation',
  judgeName,
  dirty,
  activeTab = 'notation',
  activeInterface = 'spreadsheet',
  hasProject = true,
  hasUpdateAvailable = false,
  baremeName,
  className = '',
}: Props) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/70 ${className}`}
      style={{ background: 'rgb(14 14 18)' }}
    >
      <div className="flex h-7 shrink-0 items-center justify-between border-b border-white/5 bg-black/40 pl-3 pr-0 text-gray-400">
        <div className="truncate text-[10px]">
          {projectName} — AMV Notation v0.9.1
        </div>
        <div className="flex h-full items-stretch">
          <span className="grid w-9 place-items-center hover:bg-white/5">
            <Minus size={11} />
          </span>
          <span className="grid w-9 place-items-center hover:bg-white/5">
            <Square size={9} />
          </span>
          <span className="grid w-9 place-items-center hover:bg-red-500/80 hover:text-white">
            <X size={11} />
          </span>
        </div>
      </div>

      <AppHeader
        projectName={projectName}
        judgeName={judgeName}
        dirty={dirty}
        activeTab={activeTab}
        activeInterface={activeInterface}
        hasProject={hasProject}
        hasUpdateAvailable={hasUpdateAvailable}
        baremeName={baremeName}
      />

      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
