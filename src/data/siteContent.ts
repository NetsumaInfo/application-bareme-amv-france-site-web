import {
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Languages,
  MonitorPlay,
  PanelsTopLeft,
  PenLine,
  Trophy,
  Video,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const repositoryUrl =
  'https://github.com/NetsumaInfo/application-bareme-amv-france'
export const releasesUrl = `${repositoryUrl}/releases`

export const productFacts = [
  {
    value: 'Windows',
    label: 'cible principale',
  },
  {
    value: 'mpv',
    label: 'lecture video',
  },
  {
    value: 'JSON / PDF / PNG / XLSX',
    label: 'exports',
  },
]

export const featureGroups: Array<{
  icon: LucideIcon
  title: string
  text: string
}> = [
  {
    icon: PanelsTopLeft,
    title: 'Projet de concours',
    text: 'Creer un concours, choisir un juge, regler la convention de nommage et associer le bareme avant la premiere video.',
  },
  {
    icon: Video,
    title: 'Import video',
    text: 'Scanner un dossier, rattacher des fichiers plus tard ou travailler sans video quand les participants sont deja connus.',
  },
  {
    icon: PenLine,
    title: 'Notation precise',
    text: 'Noter par criteres, ajouter des remarques, sauter aux timecodes et garder le total masque jusqu a la fin si besoin.',
  },
  {
    icon: MonitorPlay,
    title: 'Player integre',
    text: 'Piloter mpv depuis l interface, avec plein ecran, pistes audio/sous-titres et apercus de frames dans les notes.',
  },
  {
    icon: Trophy,
    title: 'Resultats multi-juges',
    text: 'Importer les notations de plusieurs juges, agreger les scores et preparer un classement publiable.',
  },
  {
    icon: Languages,
    title: 'Interface multilingue',
    text: 'Runtime disponible en francais, anglais, japonais, russe, chinois et espagnol.',
  },
]

export const tutorialSteps: Array<{
  id: 'project' | 'import' | 'score' | 'export'
  title: string
  intro: string
  steps: string[]
  actionLabel: string
  Icon: LucideIcon
}> = [
  {
    id: 'project',
    title: 'Creer un projet',
    intro:
      'La carte reproduit le chemin de creation: menu fichier, formulaire concours, choix du bareme, puis apparition du projet.',
    steps: [
      'Fichier',
      'Nouveau concours',
      'Japan Expo 2026',
      'Creer le concours',
    ],
    actionLabel: 'Projet cree',
    Icon: PanelsTopLeft,
  },
  {
    id: 'import',
    title: 'Importer les videos',
    intro:
      'Le tutoriel montre le scan d un dossier, la lecture de la convention Pseudo - Clip et l ajout automatique des lignes.',
    steps: [
      'Importer un dossier',
      'AMV/Finalistes',
      'Scan mp4, mkv, webm',
      'Clips rattaches',
    ],
    actionLabel: '6 clips importes',
    Icon: FolderOpen,
  },
  {
    id: 'score',
    title: 'Noter un clip',
    intro:
      'Le curseur ouvre une categorie, renseigne les criteres, ajoute une note timecodee et verrouille la ligne comme notee.',
    steps: [
      'Ouvrir la categorie',
      'Technique 8.5',
      'Ajouter un timecode',
      'Clip note',
    ],
    actionLabel: 'Total calcule',
    Icon: PenLine,
  },
  {
    id: 'export',
    title: 'Exporter les resultats',
    intro:
      'La sequence passe de la table finale aux exports juge, concours, image et tableau pour publication.',
    steps: ['Resultats', 'Importer juges', 'Exporter concours', 'Publier'],
    actionLabel: 'Exports prets',
    Icon: Download,
  },
]

export const exportFormats: Array<{
  icon: LucideIcon
  title: string
  text: string
}> = [
  {
    icon: FileJson,
    title: 'JSON',
    text: 'Projet complet et notation juge pour echanger les fichiers entre postes.',
  },
  {
    icon: FileText,
    title: 'PDF / PNG / HTML',
    text: 'Resultats propres pour affichage, impression et publication web.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Excel',
    text: 'Classements et notes exploitables dans les outils de tableur.',
  },
]

export const techStack = [
  'Tauri v2',
  'React 19',
  'TypeScript',
  'Rust',
  'Zustand',
  'Zod',
  'mpv',
]
