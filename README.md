# AMV Notation — Site vitrine + Tutoriels

Site web vitrine et tutoriel pour [AMV Notation](https://github.com/NetsumaInfo/application-bareme-amv-france).

Reprend la direction artistique exacte de l'app desktop : gradient midnight, surfaces `#1A1A2E`, primary `#3B82F6`, accent `#E94560`, typo Inter compacte, icônes Lucide.

## Stack

- **TanStack Start** (SSR + file-based routing)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **GSAP** + **ScrollTrigger** — timelines de tutoriels pin/scrub
- **Lenis** — smooth scroll global, bridgé à ScrollTrigger
- **motion** (motion.dev) — micro-animations React

## Lancement

```bash
npm install
npm run dev       # http://localhost:3000
```

## Build

```bash
npm run build
npm run start     # serveur Node SSR
```

## Structure

```
src/
  routes/
    __root.tsx           # layout racine + SmoothScroll
    index.tsx            # page d'accueil (assemble toutes les sections)
  router.tsx             # factory TanStack Router
  styles.css             # tokens DA + Tailwind v4

  components/
    SmoothScroll.tsx     # Lenis + ScrollTrigger bridge

    app-mock/            # fac-similés exacts des écrans de l'app
      AppShell.tsx       # chrome fenêtre (titlebar + header)
      AppHeader.tsx      # header avec switcher d'interfaces
      WelcomeMock.tsx
      CreateProjectModal.tsx
      SpreadsheetMock.tsx
      NotationMock.tsx
      ResultatsMock.tsx
      ExportMock.tsx
      BaremeEditorMock.tsx

    tutorial/
      TutorialStage.tsx  # section pin + ScrollTrigger + Cursor
      Cursor.tsx         # curseur SVG + ring de clic
      KeyChip.tsx
      tutorials.tsx      # définition de chaque tuto (steps + render)

    landing/
      Nav.tsx
      Hero.tsx
      Features.tsx
      TutorialsIntro.tsx
      Shortcuts.tsx
      Download.tsx
      Footer.tsx
```

## Comment ajouter un tutoriel

```tsx
import { TutorialStage, type TutorialStep } from '@/components/tutorial/TutorialStage'

const STEPS: TutorialStep[] = [
  {
    caption: 'Ouvrir le menu',
    detail: 'Clic sur l\'icône en haut à droite.',
    targetSelector: '[data-action="open-menu"]',  // pointé par le curseur
    click: true,                                    // pulse de clic
    keys: ['Ctrl', 'K'],                            // chips clavier
  },
  // ...
]

<TutorialStage
  id="mon-tuto"
  title="Mon tutoriel"
  intro="Description courte."
  steps={STEPS}
  render={(stepIdx) => (
    <AppShell projectName="..." className="aspect-[16/10]">
      <MonMock state={stateForStep(stepIdx)} />
    </AppShell>
  )}
/>
```

Chaque `step` = `stepVH` (défaut 80) vh de scroll. Le curseur cible le `targetSelector` à l'intérieur du mock, et la prop `stepIdx` permet de re-render le mock dans l'état correspondant.

## DA partagée

Tokens dans `src/styles.css`. Pour rester aligné avec l'app desktop : modifier ici uniquement les valeurs `--color-surface*`, `--color-primary-*`, `--color-app-bg*`. Les noms correspondent aux mêmes vars CSS que l'app.
