import { ArrowUpRight } from 'lucide-react'

const VERSION = 'v0.9.1'
const EXE_URL =
  'https://github.com/NetsumaInfo/application-bareme-amv-france/releases/download/v0.9.1/AMV.Notation_0.9.1_x64-setup.exe'
const MSI_URL =
  'https://github.com/NetsumaInfo/application-bareme-amv-france/releases/download/v0.9.1/AMV.Notation_0.9.1_x64_en-US.msi'
const REPO_URL = 'https://github.com/NetsumaInfo/application-bareme-amv-france'
const RELEASES_URL = `${REPO_URL}/releases`

export function DownloadSection() {
  return (
    <section id="telechargement" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-600">
            Téléchargement
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            AMV Notation {VERSION}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-gray-500">
            Windows 10/11 · CC0 · gratuit · open-source. libmpv inclus pour tous les codecs.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-2">
          <a
            href={EXE_URL}
            className="group flex items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div>
              <div className="text-[13px] font-medium text-white">Installateur Windows</div>
              <div className="mt-0.5 text-[11px] text-gray-500">.exe · 131 MB</div>
            </div>
            <ArrowUpRight
              size={14}
              className="text-gray-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
            />
          </a>
          <a
            href={MSI_URL}
            className="group flex items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div>
              <div className="text-[13px] font-medium text-white">Package MSI</div>
              <div className="mt-0.5 text-[11px] text-gray-500">.msi · 172 MB · déploiement</div>
            </div>
            <ArrowUpRight
              size={14}
              className="text-gray-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
            />
          </a>
        </div>

        <div className="mx-auto mt-6 flex max-w-md items-center justify-between text-[11px] text-gray-600">
          <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="hover:text-gray-300">
            Toutes les versions
          </a>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-gray-300">
            Code source · GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
