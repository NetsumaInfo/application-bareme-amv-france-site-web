import { ChevronDown } from 'lucide-react'
import { AppShell } from '@/components/app-mock/AppShell'
import { SpreadsheetMock } from '@/components/app-mock/SpreadsheetMock'

export function Hero() {
  return (
    <section id="top" className="relative pb-20 pt-32 lg:pt-36">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
            <span className="h-1 w-1 rounded-full bg-primary-400" />
            v0.9.1 · Desktop Windows
          </span>

          <h1 className="text-balance mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
            Notation AMV pour jurys exigeants
          </h1>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[12px]">
            <a
              href="#telechargement"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-gray-200"
            >
              Télécharger
              <ChevronDown size={12} />
            </a>
            <a
              href="#tutoriels"
              className="inline-flex items-center gap-1 text-gray-400 transition-colors hover:text-white"
            >
              Voir les tutoriels →
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <AppShell
            projectName="Japan Expo 2025"
            judgeName="Lightning"
            activeInterface="spreadsheet"
            className="aspect-[16/9]"
          >
            <SpreadsheetMock selectedIndex={0} showCommentFooter />
          </AppShell>
        </div>
      </div>
    </section>
  )
}
