import { motion, AnimatePresence } from 'motion/react'
import { AppShell } from '@/components/app-mock/AppShell'
import { WelcomeMock } from '@/components/app-mock/WelcomeMock'
import { CreateProjectModalMock } from '@/components/app-mock/CreateProjectModal'
import { SpreadsheetMock } from '@/components/app-mock/SpreadsheetMock'
import { NotationMock } from '@/components/app-mock/NotationMock'
import { ResultatsMock } from '@/components/app-mock/ResultatsMock'
import { ExportMock } from '@/components/app-mock/ExportMock'
import { BaremeEditorMock } from '@/components/app-mock/BaremeEditorMock'
import { PlayerWindow } from '@/components/app-mock/PlayerWindow'
import { DetachedNotesWindow } from '@/components/app-mock/DetachedNotesWindow'
import { TutorialStage, type TutorialStep } from './TutorialStage'
import { PARTICIPANTS, JUDGES, BAREME_JE2025 } from '@/data/je2025'

const PROJECT_NAME = 'Japan Expo 2025'
const JUDGE_NAME = 'Lightning'

/* ───────── Create project ───────── */

const CREATE_STEPS: TutorialStep[] = [
  {
    caption: 'Ouvrir l\'écran d\'accueil',
    detail: 'Lancement de l\'app — projets récents listés.',
    targetSelector: '[data-action="new-project"]',
  },
  {
    caption: 'Cliquer « Nouveau projet »',
    detail: 'La modale s\'ouvre, focus sur le nom.',
    targetSelector: '[data-action="new-project"]',
    click: true,
  },
  {
    caption: 'Saisir le nom du concours',
    detail: '« Japan Expo 2025 ».',
    targetSelector: '[data-field="name"]',
    anchor: 'right',
    keys: ['J', 'a', 'p', 'a', 'n'],
  },
  {
    caption: 'Saisir votre pseudo de juge',
    detail: 'Sert à signer les exports JE.json.',
    targetSelector: '[data-field="judge"]',
    anchor: 'right',
  },
  {
    caption: 'Valider la création',
    detail: 'Sauvegardé dans Documents/AMV Notation/Projets.',
    targetSelector: '[data-action="create"]',
    click: true,
  },
]

export function CreateProjectTutorial() {
  return (
    <TutorialStage
      id="creer-projet"
      title="Créer un nouveau projet"
      intro="Un projet AMV regroupe un barème, une liste de clips, et toutes les notes du juge."
      steps={CREATE_STEPS}
      render={(idx) => {
        const projectName = ['', '', 'Japan', 'Japan Expo 2025', 'Japan Expo 2025', 'Japan Expo 2025'][idx] ?? ''
        const judge = idx >= 3 ? JUDGE_NAME : ''
        const modalOpen = idx >= 1
        const created = idx >= 4
        return (
          <AppShell
            projectName={created ? PROJECT_NAME : 'AMV Notation'}
            judgeName={created ? JUDGE_NAME : undefined}
            hasProject={created}
            className="h-full"
          >
            <WelcomeMock hoverNew={idx === 0} />
            <CreateProjectModalMock open={modalOpen} name={projectName} judge={judge} />
          </AppShell>
        )
      }}
    />
  )
}

/* ───────── Import videos ───────── */

const IMPORT_STEPS: TutorialStep[] = [
  {
    caption: 'État initial : aucun clip',
    detail: 'Le projet vient d\'être créé.',
    targetSelector: '[data-action="import-folder"]',
  },
  {
    caption: 'Cliquer « Importer un dossier »',
    detail: 'Boîte de dialogue système.',
    targetSelector: '[data-action="import-folder"]',
    click: true,
  },
  {
    caption: 'Les clips sont scannés',
    detail: 'Détection auteur/titre via pseudo-titre.mp4.',
  },
  {
    caption: 'Tableur peuplé',
    detail: 'Colonnes par catégorie, sous-colonnes par critère.',
    targetSelector: '[data-row="0"]',
  },
]

export function ImportVideosTutorial() {
  return (
    <TutorialStage
      id="importer-videos"
      title="Importer vos vidéos"
      intro="L'app scanne un dossier et extrait automatiquement auteur et titre depuis les noms de fichiers."
      steps={IMPORT_STEPS}
      render={(idx) => {
        const empty = idx < 2
        const partial = idx === 2
        return (
          <AppShell
            projectName={PROJECT_NAME}
            judgeName={JUDGE_NAME}
            activeInterface="spreadsheet"
            className="h-full"
          >
            {empty ? (
              <SpreadsheetMock empty />
            ) : partial ? (
              <SpreadsheetMock
                rows={PARTICIPANTS.slice(0, 4).map((p, i) => ({
                  id: String(i + 1),
                  author: p.author,
                  title: p.title,
                  scores: [],
                }))}
              />
            ) : (
              <SpreadsheetMock showCommentFooter />
            )}
          </AppShell>
        )
      }}
    />
  )
}

/* ───────── Note clip (multi-window: notation panel + separate player) ───────── */

const NOTE_STEPS: TutorialStep[] = [
  {
    caption: 'Passer en Commentaires',
    detail: 'Bascule Tableur ↔ Commentaires.',
    targetSelector: '[data-mode="notation"]',
    click: true,
  },
  {
    caption: 'Mode Dual : les deux',
    detail: 'Tableur + Commentaires côte à côte.',
    targetSelector: '[data-mode="spreadsheet"]',
    click: true,
  },
  {
    caption: 'Détacher la fenêtre de notation',
    detail: 'Le panneau Commentaires devient une fenêtre flottante indépendante.',
  },
  {
    caption: 'Ouvrir le lecteur vidéo',
    detail: 'Le lecteur mpv s\'ouvre dans une 3ᵉ fenêtre Win32.',
    targetSelector: '[data-action="open-player"]',
    click: true,
  },
  {
    caption: 'Lecture',
    detail: 'Espace pour play/pause, ←/→ pour seek ±5s.',
    keys: ['Space'],
  },
  {
    caption: 'Noter Rhythm & Sync',
    detail: 'Tab pour passer au suivant, saisie directe au clavier.',
    targetSelector: '[data-criterion-input="0"]',
    anchor: 'right',
    keys: ['1', '1'],
  },
  {
    caption: 'Critère suivant : Scene',
    detail: 'Total recalculé instantanément.',
    targetSelector: '[data-criterion-input="1"]',
    anchor: 'right',
    keys: ['Tab', '1', '0', '.', '5'],
  },
  {
    caption: 'Clip suivant',
    detail: 'N → suivant, P → précédent.',
    keys: ['N'],
  },
]

export function NoteClipTutorial() {
  const SHIN = PARTICIPANTS[0]  // ShinRyu — always
  return (
    <TutorialStage
      id="noter-clip"
      title="Noter un clip"
      intro="Mode Dual : tableur + commentaires côte à côte. Notes détachables, lecteur dans une fenêtre Win32 séparée."
      steps={NOTE_STEPS}
      render={(idx) => {
        // ShinRyu stays selected throughout — never switch clip
        const participantIdx = 0
        const notesDetached = idx >= 2
        const showPlayer = idx >= 3
        const isPlaying = idx >= 4
        const hi = idx === 5 ? 0 : idx === 6 ? 1 : undefined
        const scores: (number | undefined)[] =
          idx <= 4
            ? Array(8).fill(undefined)
            : idx === 5
            ? [11, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
            : idx === 6
            ? [11, 10.5, undefined, undefined, undefined, undefined, undefined, undefined]
            : SHIN.lightning
        const total = scores.reduce<number>((s, v) => s + (typeof v === 'number' ? v : 0), 0)
        const clip = PARTICIPANTS[participantIdx]

        // Interface switcher: step 0 = spreadsheet only, all notation steps = dual (both highlighted)
        const activeInterface = idx === 0 ? 'spreadsheet' : 'dual'

        // Core body (above the comment bar)
        const coreContent =
          idx === 0 ? (
            <SpreadsheetMock selectedIndex={participantIdx} />
          ) : idx === 1 ? (
            // Dual layout: Notation LEFT + Tableur RIGHT, notes not yet detached
            <div className="flex h-full">
              <div className="w-[280px] shrink-0 border-r border-gray-700/60">
                <NotationMock
                  participantIndex={participantIdx}
                  scores={scores}
                  total={total}
                  clipIndex={participantIdx + 1}
                  hideFooter
                />
              </div>
              <div className="min-w-0 flex-1">
                <SpreadsheetMock selectedIndex={participantIdx} />
              </div>
            </div>
          ) : (
            // idx >= 2: notes detached → main window shows tableur (dual still active in header)
            <SpreadsheetMock selectedIndex={participantIdx} />
          )

        // idx >= 1: notation context → show global comment bar at bottom of window
        const mainContent =
          idx >= 1 ? (
            <div className="flex h-full flex-col">
              <div className="min-h-0 flex-1 overflow-hidden">{coreContent}</div>
              <NotationCommentBar clip={clip} scores={scores} />
            </div>
          ) : (
            coreContent
          )

        return (
          <div className="relative isolate h-full w-full">
            <AppShell
              projectName={PROJECT_NAME}
              judgeName={JUDGE_NAME}
              dirty={idx >= 5}
              activeInterface={activeInterface}
              className="relative z-10 h-full"
            >
              {mainContent}
            </AppShell>

            {/* Detached Notes window — flottante INSIDE bounds */}
            <AnimatePresence>
              {notesDetached && (
                <motion.div
                  key="detached-notes"
                  initial={{ opacity: 0, scale: 0.7, x: -30, y: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.8 }}
                  className="pointer-events-none absolute left-3 top-[9%] z-[80] h-[66%] w-[30%] origin-top-left"
                >
                  <DetachedNotesWindow
                    title="AMV Notation - Notes"
                    participantIndex={0}
                    scores={scores}
                    total={total}
                    highlightCriterionIndex={hi}
                    clipIndex={1}
                    totalClips={PARTICIPANTS.length}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Player window — flottante INSIDE bounds */}
            <AnimatePresence>
              {showPlayer && (
                <motion.div
                  key="player"
                  initial={{ opacity: 0, scale: 0.55, x: 40, y: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.55 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.9 }}
                  className="pointer-events-none absolute right-3 top-[11%] z-[70] w-[36%] origin-top-right"
                >
                  <PlayerWindow
                    clipTitle={clip.author}
                    clipAuthor={clip.title && clip.title !== clip.author ? clip.title : ''}
                    isPlaying={isPlaying}
                    progress={isPlaying ? 0.34 : 0.02}
                    currentTime={isPlaying ? '01:24' : '00:03'}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      }}
    />
  )
}

// Bottom bar matching NotationNotesFooter from the real app — shows current clip + category totals + comment textarea.
function NotationCommentBar({
  clip,
  scores,
}: {
  clip: { author: string; title?: string }
  scores: (number | undefined)[]
}) {
  let acc = 0
  const catStarts = BAREME_JE2025.map((c) => { const s = acc; acc += c.criteria.length; return s })

  return (
    <div className="shrink-0 border-t border-gray-700/60 bg-[rgb(20_20_26)]">
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500">
          Commentaire général
          <span className="ml-1 normal-case tracking-normal text-gray-400">
            — {clip.author}
            {clip.title && clip.title !== clip.author && (
              <> · <span className="text-primary-300">{clip.title}</span></>
            )}
          </span>
        </span>
        <div className="flex items-center gap-3">
          {BAREME_JE2025.map((cat, i) => {
            const start = catStarts[i]
            const catScore = cat.criteria.reduce((s, _, j) => {
              const v = scores[start + j]
              return s + (typeof v === 'number' ? v : 0)
            }, 0)
            return (
              <span key={cat.id} className="text-[10px] tabular-nums">
                <span className="font-semibold uppercase" style={{ color: cat.color }}>
                  {cat.label}
                </span>{' '}
                <span className="text-gray-200">{catScore}</span>
                <span className="text-gray-600">/{cat.max}</span>
              </span>
            )
          })}
        </div>
      </div>
      <div className="px-3 pb-2">
        <div className="flex min-h-[28px] items-start rounded border border-gray-700/60 bg-black/30 px-2 py-1 text-[11px] text-gray-500">
          Commentaire général…
        </div>
      </div>
    </div>
  )
}

/* ───────── Multi-juges ───────── */

const MJ_STEPS: TutorialStep[] = [
  {
    caption: 'Onglet Résultat',
    detail: 'Bascule sur le tableau de classement.',
    targetSelector: '[data-tab="resultats"]',
    click: true,
  },
  {
    caption: 'Importer un JE.json',
    detail: 'Chaque juge exporte son JE.json depuis l\'onglet Notation.',
    targetSelector: '[data-action="import-judge"]',
    click: true,
  },
  {
    caption: 'Les notes du juge apparaissent',
    detail: 'Moyennes recalculées par catégorie.',
    targetSelector: '[data-judge="1"]',
  },
  {
    caption: 'Importer le 3ᵉ juge',
    detail: 'Dédoublonnage automatique par pseudo + projet.',
    targetSelector: '[data-judge="2"]',
  },
  {
    caption: 'Tableau global',
    detail: 'Toutes les notes de tous les juges, par critère, côte à côte.',
    targetSelector: '[data-view-mode="global"]',
    click: true,
  },
  {
    caption: 'Tableau par juge',
    detail: 'Bascule sur une vue judge-par-juge pour inspecter un seul juge à la fois.',
    targetSelector: '[data-view-mode="par-juge"]',
    click: true,
  },
  {
    caption: 'Naviguer entre les juges',
    detail: 'Onglets de juge en haut à droite — clique pour changer de juge.',
    targetSelector: '[data-judge="1"]',
    click: true,
  },
  {
    caption: 'Juge suivant',
    detail: 'Ou utilise les flèches ‹ › pour défiler entre les juges.',
    targetSelector: '[data-judge-nav="next"]',
    click: true,
  },
  {
    caption: 'Liste Top',
    detail: 'Classement Top de chaque juge + Top final côte à côte.',
    targetSelector: '[data-view-mode="top"]',
    click: true,
  },
]

export function MultiJugesTutorial() {
  return (
    <TutorialStage
      id="multi-juges"
      title="Agréger plusieurs juges"
      intro="Chaque juge produit un JE.json. Importez-les dans l'onglet Résultat pour obtenir le classement final."
      steps={MJ_STEPS}
      render={(idx) => {
        const loaded = [true, idx >= 2, idx >= 3]
        const judges = JUDGES.map((j, i) => ({
          name: j.name,
          loaded: loaded[i],
          color: j.color,
        }))
        // Steps 0–4: global. 5–7: par-juge (judge nav). 8: liste top.
        const viewMode = idx === 8 ? 'top' : idx >= 5 ? 'par-juge' : 'global'
        const selectedJudge = idx === 6 ? 1 : idx === 7 ? 2 : 0
        return (
          <AppShell
            projectName={PROJECT_NAME}
            judgeName={JUDGE_NAME}
            activeTab="resultats"
            className="h-full"
          >
            <ResultatsMock judges={judges} viewMode={viewMode} selectedJudge={selectedJudge} />
          </AppShell>
        )
      }}
    />
  )
}

/* ───────── Export ───────── */

const EXPORT_STEPS: TutorialStep[] = [
  {
    caption: 'Onglet Export',
    detail: 'Aperçu en direct du résultat.',
    targetSelector: '[data-tab="export"]',
    click: true,
  },
  {
    caption: 'Choisir la présentation',
    detail: 'Discord, Affiche, ou Tableau.',
    targetSelector: '[data-format="discord"]',
    click: true,
  },
  {
    caption: 'Passer en tableau',
    detail: 'Format complet pour publication.',
    targetSelector: '[data-format="table"]',
    click: true,
  },
  {
    caption: 'Détail par juge',
    detail: 'Classement global ou décomposition par juge.',
    targetSelector: '[data-table-view="par-juge"]',
    click: true,
  },
  {
    caption: 'Exporter',
    detail: 'PNG, PDF ou JSON — fichier prêt à publier.',
    targetSelector: '[data-action="export"]',
    click: true,
  },
]

export function ExportTutorial() {
  return (
    <TutorialStage
      id="exporter"
      title="Exporter vos résultats"
      intro="Discord (message formaté), Affiche (PNG créative), ou Tableau (PNG/PDF/JSON)."
      steps={EXPORT_STEPS}
      render={(idx) => {
        const layout = idx === 0 ? 'table' : idx === 1 ? 'discord' : 'table'
        const tableView = idx >= 3 ? 'category' : 'detailed'
        return (
          <AppShell
            projectName={PROJECT_NAME}
            judgeName={JUDGE_NAME}
            activeTab="export"
            className="h-full"
          >
            <ExportMock format={layout} tableView={tableView} />
          </AppShell>
        )
      }}
    />
  )
}

/* ───────── Custom bareme ───────── */

const BAREME_STEPS: TutorialStep[] = [
  {
    caption: 'Ouvrir l\'éditeur',
    detail: 'Réglages → Barèmes → Nouveau.',
  },
  {
    caption: 'Sélectionner le barème JE 2025',
    detail: 'Catégories et critères apparaissent.',
    targetSelector: '[data-category="editing"]',
  },
  {
    caption: 'Ajouter un critère',
    detail: 'Clic sur « Ajouter un critère ».',
    targetSelector: '[data-add-criterion]',
    click: true,
  },
  {
    caption: 'Nommer et fixer le max',
    detail: '« Fluidité » sur 5 points.',
    targetSelector: '[data-criterion-new]',
    keys: ['F', 'l', 'u', 'i'],
  },
  {
    caption: 'Sauvegarder',
    detail: 'Réutilisable dans tous vos projets.',
  },
]

export function BaremeTutorial() {
  return (
    <TutorialStage
      id="bareme-perso"
      title="Créer un barème personnalisé"
      intro="L'éditeur drag-and-drop permet de créer un barème adapté à votre concours — partir du JE 2025 puis adapter."
      steps={BAREME_STEPS}
      render={(idx) => {
        const newCrit = idx === 3 ? 'Flui' : idx >= 4 ? 'Fluidité' : undefined
        const mode = idx === 0 ? 'list' : 'edit'
        return (
          <AppShell
            projectName={PROJECT_NAME}
            judgeName={JUDGE_NAME}
            activeTab="notation"
            className="h-full"
          >
            <BaremeEditorMock mode={mode} newCritLabel={newCrit} />
          </AppShell>
        )
      }}
    />
  )
}
