// JE 2025 barème + participants — matches real desktop app exactly.
// Bareme structure: Montage / VFX / Choix Artistique / Finition. 9 critères total, 60 pts.
// Sources: real app screenshots + xlsx data (Lightning + Lokkiclu) + user-provided participant list.

export type Criterion = { id: string; label: string; short: string; max: number }
export type Category = {
  id: string
  label: string
  short: string
  color: string
  max: number
  criteria: Criterion[]
}

export const BAREME_JE2025: Category[] = [
  {
    id: 'montage',
    label: 'Montage',
    short: 'Mont.',
    color: '#fb923c',
    max: 24,
    criteria: [
      { id: 'rythme', label: 'Rythme & Synchronisation', short: 'Rythme', max: 12 },
      { id: 'scene', label: 'Sélection de scènes', short: 'Scène', max: 12 },
    ],
  },
  {
    id: 'vfx',
    label: 'VFX',
    short: 'VFX',
    color: '#c084fc',
    max: 18,
    criteria: [
      { id: 'compositing', label: 'Compositing / Intégration', short: 'Comp.', max: 6 },
      { id: 'coherence', label: 'Cohérence / Logique', short: 'Cohér.', max: 6 },
      { id: 'complexity', label: 'Complexité technique', short: 'Compl.', max: 6 },
    ],
  },
  {
    id: 'artistique',
    label: 'Choix Artistique',
    short: 'Art.',
    color: '#34d399',
    max: 12,
    criteria: [
      { id: 'colorgrading', label: 'CC / Color Grading', short: 'Color', max: 6 },
      { id: 'concept', label: 'Concept & Narratif', short: 'Concept', max: 6 },
    ],
  },
  {
    id: 'finition',
    label: 'Finition',
    short: 'Fin.',
    color: '#fbbf24',
    max: 6,
    criteria: [
      { id: 'encodage', label: 'Encodage', short: 'Enc.', max: 3 },
      { id: 'mixage', label: 'Mixage', short: 'Mix.', max: 3 },
    ],
  },
]

export const TOTAL_MAX = BAREME_JE2025.reduce((s, c) => s + c.max, 0)
export const TOTAL_CRITERIA = BAREME_JE2025.reduce((s, c) => s + c.criteria.length, 0)

export type ParticipantRow = {
  rank: number
  title: string
  author: string
  // Lightning per-criterion (9 values in barème order: rythme, scene, compositing, coherence, complexity, color, concept, encodage, mixage)
  lightning: number[]
  // Per-category totals: Montage, VFX, Artistique, Finition
  lightningCats: [number, number, number, number]
  lokkicluCats: [number, number, number, number]
  daCats?: [number, number, number, number]
  totals: { lightning: number; lokkiclu: number; da: number; avg: number }
  fav?: boolean
}

// Helper: split single encoding-mixing value (xlsx had /6) into encodage+mixage (each /3)
const splitEnc = (v: number): [number, number] => {
  const half = v / 2
  return [half, half]
}

// 9-value order: rythme, scene, compositing, coherence, complexity, color, concept, encodage, mixage
// Lightning per-criterion from xlsx (8 values), encoding split into [enc, mix] = 2 values
export const PARTICIPANTS: ParticipantRow[] = [
  {
    rank: 1,
    title: 'UPRISING',
    author: 'ShinRyu',
    lightning: [11, 10.5, 5, 6, 6, 5, 6, ...splitEnc(6)],
    lightningCats: [21.5, 17, 11, 6],
    lokkicluCats: [20, 18, 11, 6],
    totals: { lightning: 55.5, lokkiclu: 55, da: 58, avg: 56.17 },
    fav: true,
  },
  {
    rank: 2,
    title: 'Unlimited',
    author: 'Fnalex',
    lightning: [10, 10, 5, 6, 6, 5, 5, ...splitEnc(6)],
    lightningCats: [20, 17, 10, 6],
    lokkicluCats: [20, 17.5, 10.5, 6],
    totals: { lightning: 53, lokkiclu: 54, da: 55, avg: 54 },
  },
  {
    rank: 3,
    title: 'The Shadows Leaves',
    author: 'Twister',
    lightning: [10.5, 10, 4, 5, 4.5, 4.75, 4.5, ...splitEnc(6)],
    lightningCats: [20.5, 13.5, 9.25, 6],
    lokkicluCats: [20.5, 16, 11, 6],
    totals: { lightning: 49.5, lokkiclu: 53.5, da: 53, avg: 52 },
  },
  {
    rank: 4,
    title: 'Silhouette',
    author: 'Steiner',
    lightning: [9.25, 8, 4.5, 5, 4.5, 5.5, 4, ...splitEnc(6)],
    lightningCats: [17.25, 14, 9.5, 6],
    lokkicluCats: [18.5, 14, 9.5, 6],
    totals: { lightning: 46.75, lokkiclu: 48, da: 54, avg: 49.58 },
  },
  {
    rank: 5,
    title: 'Consume',
    author: 'Glave',
    lightning: [9.5, 9, 5, 5, 4.5, 5.5, 4, ...splitEnc(6)],
    lightningCats: [18.5, 14.5, 9.5, 6],
    lokkicluCats: [19.5, 14.5, 10, 6],
    totals: { lightning: 48.5, lokkiclu: 50, da: 50, avg: 49.5 },
  },
  {
    rank: 6,
    title: 'Deepbreath',
    author: 'Cmoididi / Amanystya',
    lightning: [11, 10, 5, 6, 4, 6, 3, ...splitEnc(6)],
    lightningCats: [21, 15, 9, 6],
    lokkicluCats: [19.5, 14, 8.5, 6],
    totals: { lightning: 51, lokkiclu: 48, da: 47, avg: 48.67 },
  },
  {
    rank: 7,
    title: 'Heisenberg',
    author: 'Athrun',
    lightning: [8, 8, 3.5, 4.5, 4, 4, 4.5, ...splitEnc(4.5)],
    lightningCats: [16, 12, 8.5, 4.5],
    lokkicluCats: [17, 15.5, 8.5, 6],
    totals: { lightning: 41, lokkiclu: 47, da: 50, avg: 46 },
  },
  {
    rank: 8,
    title: 'Die For You',
    author: 'DarkVoodoo',
    lightning: [8, 8, 3.5, 4, 4.5, 4.5, 4.5, ...splitEnc(6)],
    lightningCats: [16, 12, 9, 6],
    lokkicluCats: [19, 14, 8.5, 6],
    totals: { lightning: 43, lokkiclu: 47.5, da: 46, avg: 45.5 },
  },
  {
    rank: 9,
    title: 'My Crush',
    author: 'Fabi',
    lightning: [9, 9, 4.75, 4.5, 5, 5.5, 4.5, ...splitEnc(6)],
    lightningCats: [18, 14.25, 10, 6],
    lokkicluCats: [18.5, 13, 7.5, 6],
    totals: { lightning: 48.25, lokkiclu: 45, da: 45, avg: 46.08 },
  },
  {
    rank: 10,
    title: 'Play off',
    author: 'flo55',
    lightning: [8, 8.25, 4, 4, 3, 4, 5, ...splitEnc(6)],
    lightningCats: [16.25, 11, 9, 6],
    lokkicluCats: [17.5, 11, 8, 6],
    totals: { lightning: 42.25, lokkiclu: 42.5, da: 46, avg: 43.58 },
  },
  {
    rank: 11,
    title: '(dis)cordant memories',
    author: 'Ceirin',
    lightning: [8, 7.5, 4.5, 5, 3, 4.5, 4, ...splitEnc(5)],
    lightningCats: [15.5, 12.5, 8.5, 5],
    lokkicluCats: [18, 11, 8, 6],
    totals: { lightning: 41.5, lokkiclu: 43, da: 43, avg: 42.5 },
  },
  {
    rank: 12,
    title: 'Tôt le matin',
    author: 'Cmoididi',
    lightning: [7.5, 7.25, 3, 3, 2, 4.5, 3, ...splitEnc(6)],
    lightningCats: [14.75, 8, 7.5, 6],
    lokkicluCats: [20, 12, 8, 6],
    totals: { lightning: 36.25, lokkiclu: 46, da: 42, avg: 41.42 },
  },
  {
    rank: 13,
    title: 'Sci-Fi',
    author: 'DaWait',
    lightning: [9.5, 9, 5, 5, 4, 5, 3, ...splitEnc(6)],
    lightningCats: [18.5, 14, 8, 6],
    lokkicluCats: [18.5, 12.5, 8.5, 6],
    totals: { lightning: 46.5, lokkiclu: 45.5, da: 41, avg: 44.33 },
  },
  {
    rank: 14,
    title: 'Shizuku II',
    author: 'KiRr',
    lightning: [9, 8.5, 4, 4, 3, 4.5, 3, ...splitEnc(5)],
    lightningCats: [17.5, 11, 7.5, 5],
    lokkicluCats: [18, 14, 8.5, 6],
    totals: { lightning: 41, lokkiclu: 44.5, da: 42, avg: 42.5 },
  },
  {
    rank: 15,
    title: 'Termina',
    author: 'Celso',
    lightning: [8, 7, 3, 3.5, 4, 3.5, 3.25, ...splitEnc(6)],
    lightningCats: [15, 10.5, 6.75, 6],
    lokkicluCats: [17, 11, 8, 6],
    totals: { lightning: 38.25, lokkiclu: 42, da: 43, avg: 41.08 },
  },
  {
    rank: 16,
    title: 'YGGDRASIL : ILIADE',
    author: 'Fernix',
    lightning: [8, 7, 3, 3, 4, 3.5, 3, ...splitEnc(6)],
    lightningCats: [15, 10, 6.5, 6],
    lokkicluCats: [17, 12, 8, 6],
    totals: { lightning: 37.5, lokkiclu: 43, da: 43, avg: 41.17 },
  },
  {
    rank: 17,
    title: 'Sweet Time',
    author: 'Xorv',
    lightning: [8, 7, 3, 4.5, 3.5, 4, 3.5, ...splitEnc(6)],
    lightningCats: [15, 11, 7.5, 6],
    lokkicluCats: [16.5, 11.5, 8, 6],
    totals: { lightning: 39.5, lokkiclu: 42, da: 39, avg: 40.17 },
  },
  {
    rank: 18,
    title: 'Whisper',
    author: 'SachaValentine',
    lightning: [9, 9, 3, 4.5, 3.5, 4.5, 5, ...splitEnc(6)],
    lightningCats: [18, 11, 9.5, 6],
    lokkicluCats: [17, 11.5, 7, 6],
    totals: { lightning: 44.5, lokkiclu: 41.5, da: 39, avg: 41.67 },
  },
  {
    rank: 19,
    title: 'Dawn of Light',
    author: 'AnthoMV',
    lightning: [8, 7, 5, 3, 2.5, 4.5, 2.5, ...splitEnc(6)],
    lightningCats: [15, 10.5, 7, 6],
    lokkicluCats: [18, 11.5, 7.5, 6],
    totals: { lightning: 38.5, lokkiclu: 43, da: 32, avg: 37.83 },
  },
  {
    rank: 20,
    title: 'Fire Red',
    author: 'RedAssaut',
    lightning: [9, 9, 2.5, 3, 2.5, 3.5, 3, ...splitEnc(6)],
    lightningCats: [18, 8, 6.5, 6],
    lokkicluCats: [18, 9.5, 6.5, 6],
    totals: { lightning: 38.5, lokkiclu: 40, da: 31, avg: 36.5 },
  },
  {
    rank: 21,
    title: '(not) MENFOU 2',
    author: 'Maeru',
    lightning: [8, 8, 2, 2, 2, 3.5, 3, ...splitEnc(6)],
    lightningCats: [16, 6, 6.5, 6],
    lokkicluCats: [18, 11.5, 7.5, 6],
    totals: { lightning: 34.5, lokkiclu: 43, da: 33, avg: 36.83 },
  },
  {
    rank: 22,
    title: 'Axel',
    author: 'Miwo',
    lightning: [8, 7, 3, 3, 2, 4.5, 4, ...splitEnc(6)],
    lightningCats: [15, 8, 8.5, 6],
    lokkicluCats: [16, 10, 7, 6],
    totals: { lightning: 37.5, lokkiclu: 39, da: 30, avg: 35.5 },
  },
  {
    rank: 23,
    title: 'Tchikita',
    author: 'Kyutana, Bankai',
    lightning: [6.5, 8, 3, 3, 2, 4.25, 3, ...splitEnc(6)],
    lightningCats: [14.5, 8, 7.25, 6],
    lokkicluCats: [16.5, 9.5, 7.5, 6],
    totals: { lightning: 35.75, lokkiclu: 39.5, da: 30, avg: 35.08 },
  },
]

export const JUDGES = [
  { id: 'lightning', name: 'Lightning', color: '#fbbf24' },
  { id: 'lokkiclu', name: 'Lokkiclu', color: '#60a5fa' },
  { id: 'da', name: 'DA@', color: '#f472b6' },
] as const
