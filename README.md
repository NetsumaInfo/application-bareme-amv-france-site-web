# AMV Notation Vitrine

Site vitrine et tutoriels animes pour l application desktop
[AMV Notation](https://github.com/NetsumaInfo/application-bareme-amv-france).

## Stack

- TanStack Start
- React 19
- Tailwind CSS 4
- GSAP + ScrollTrigger
- Lenis
- Motion.dev
- Netlify adapter

## Lancer en local

```bash
npm install
npm run dev
```

Le serveur local utilise `http://localhost:3000`.

## Scripts

```bash
npm run build
npm run lint
npm run check
```

## Contenu

La page presente:

- une vue produit de l application AMV Notation
- les fonctions principales du workflow concours
- quatre tutoriels scroll-driven: creer un projet, importer les videos, noter un clip, exporter les resultats
- les formats de sortie et la base technique de l application source

## Deploiement Netlify

Le projet contient deja `netlify.toml` et le plugin Netlify pour TanStack Start.

```toml
[build]
  command = "vite build"
  publish = "dist/client"
```

Importer le repo dans Netlify suffit pour lancer un premier deploy.
