import {
  ListChecks,
  Trophy,
  FileDown,
  Columns2,
  Film,
  Keyboard,
  PictureInPicture2,
  FolderInput,
  Users,
} from 'lucide-react'

const FEATURES = [
  {
    icon: ListChecks,
    title: 'Barèmes drag-and-drop',
    desc: 'Catégories, critères, points max. Barème JE 2025 inclus, réutilisable entre projets.',
  },
  {
    icon: Film,
    title: 'Lecteur mpv natif',
    desc: 'Fenêtre Win32 séparée. H.264/265, VP9, AV1 via libmpv — aucun codec à installer.',
  },
  {
    icon: PictureInPicture2,
    title: 'Fenêtres détachables',
    desc: 'Panneau notes flottant + lecteur indépendant. Multi-écrans natif.',
  },
  {
    icon: Columns2,
    title: 'Mode Dual',
    desc: 'Tableur + commentaires côte à côte. Bascule instantanée Tableur / Notation / Dual.',
  },
  {
    icon: FolderInput,
    title: 'Import auto',
    desc: 'Scan d\'un dossier, parsing `pseudo-titre.mp4` — auteurs et titres détectés.',
  },
  {
    icon: Users,
    title: 'Multi-juges',
    desc: 'Chaque juge exporte un JE.json. Import et dédoublonnage automatiques.',
  },
  {
    icon: Trophy,
    title: '3 vues de résultats',
    desc: 'Global (tous juges côte à côte), Par juge, ou Liste Top — bascule en un clic.',
  },
  {
    icon: FileDown,
    title: 'Exports Discord, Affiche, Tableau',
    desc: 'Message Discord formaté, PNG d\'affiche, tableau PDF/JSON — prêts à publier.',
  },
  {
    icon: Keyboard,
    title: 'Tout au clavier',
    desc: 'Tab/Entrée entre cellules, Espace play/pause, N/P clip suivant/précédent.',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
            Fonctionnalités
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Pensé pour la notation AMV
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-md border border-gray-800 bg-[rgb(26_26_46)]/40 p-4 transition-colors hover:border-gray-700"
              >
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-800 bg-black/30 text-primary-400">
                  <Icon size={15} />
                </div>
                <h3 className="text-[13px] font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-gray-400">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
