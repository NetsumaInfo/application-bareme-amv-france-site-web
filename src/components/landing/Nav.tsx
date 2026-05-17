import { Download, Github } from 'lucide-react'

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4">
      <nav className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md">
        <a href="#top" className="flex items-center gap-2 pl-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-primary-600 text-[10px] font-bold text-white">
            AMV
          </span>
          <span className="text-[13px] font-semibold tracking-tight text-white">
            AMV Notation
          </span>
        </a>
        <ul className="hidden items-center gap-1 text-[12px] text-gray-400 md:flex">
          <li>
            <a href="#features" className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-white">
              Fonctionnalités
            </a>
          </li>
          <li>
            <a href="#tutoriels" className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-white">
              Tutoriels
            </a>
          </li>
          <li>
            <a href="#raccourcis" className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-white">
              Raccourcis
            </a>
          </li>
          <li>
            <a href="#telechargement" className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-white">
              Télécharger
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/NetsumaInfo/application-bareme-amv-france"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-white/5 hover:text-white"
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>
          <a
            href="#telechargement"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-black hover:bg-gray-200"
          >
            <Download size={12} /> Télécharger
          </a>
        </div>
      </nav>
    </header>
  )
}
