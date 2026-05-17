import { motion } from 'motion/react'

const GROUPS: { title: string; rows: { keys: string[]; label: string }[] }[] = [
  {
    title: 'Projet',
    rows: [
      { keys: ['Ctrl', 'N'], label: 'Nouveau projet' },
      { keys: ['Ctrl', 'O'], label: 'Ouvrir un projet' },
      { keys: ['Ctrl', 'S'], label: 'Sauvegarder' },
    ],
  },
  {
    title: 'Navigation',
    rows: [
      { keys: ['Ctrl', '1'], label: 'Onglet Notation' },
      { keys: ['Ctrl', '2'], label: 'Onglet Résultats' },
      { keys: ['Ctrl', '3'], label: 'Onglet Export' },
      { keys: ['N'], label: 'Clip suivant' },
      { keys: ['P'], label: 'Clip précédent' },
    ],
  },
  {
    title: 'Lecteur',
    rows: [
      { keys: ['Space'], label: 'Play / Pause' },
      { keys: ['←'], label: 'Reculer 5s' },
      { keys: ['→'], label: 'Avancer 5s' },
      { keys: ['⇧', '←'], label: 'Reculer 30s' },
      { keys: ['⇧', '→'], label: 'Avancer 30s' },
      { keys: ['F11'], label: 'Plein écran' },
    ],
  },
  {
    title: 'Notation',
    rows: [
      { keys: ['Tab'], label: 'Critère suivant' },
      { keys: ['Enter'], label: 'Valider la note' },
      { keys: ['0', '–', '9'], label: 'Saisie directe' },
    ],
  },
]

function KeyChip({ k }: { k: string }) {
  return (
    <kbd className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-md border border-white/10 bg-white/5 px-2 font-mono text-[11px] font-medium text-gray-200 shadow-[0_2px_0_rgba(255,255,255,0.04)_inset,0_-2px_0_rgba(0,0,0,0.3)_inset]">
      {k}
    </kbd>
  )
}

export function Shortcuts() {
  return (
    <section id="raccourcis" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-400">
            Au clavier
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Raccourcis essentiels
          </h2>
          <p className="mt-4 text-[15px] text-gray-400">
            Tout est pensé pour ne jamais quitter le clavier pendant la notation.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-white/5 bg-[rgb(26_26_46)]/40 p-5"
            >
              <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-primary-300">
                {g.title}
              </h3>
              <ul className="space-y-2">
                {g.rows.map((r, j) => (
                  <li key={j} className="flex items-center justify-between gap-3">
                    <span className="text-[12.5px] text-gray-400">{r.label}</span>
                    <div className="flex items-center gap-1">
                      {r.keys.map((k, ki) => (
                        <KeyChip key={ki} k={k} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
