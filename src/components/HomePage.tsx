import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Github,
  MonitorDown,
  PlayCircle,
} from 'lucide-react'
import { LenisBridge } from '#/components/LenisBridge'
import {
  HeroProductScene,
  ResultsMockup,
  TutorialScene,
} from '#/components/ProductMockups'
import {
  exportFormats,
  featureGroups,
  productFacts,
  releasesUrl,
  repositoryUrl,
  techStack,
  tutorialSteps,
} from '#/data/siteContent'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useLenisRefresh()
  usePageAnimations(pageRef)

  return (
    <div ref={pageRef} className="site-shell">
      <LenisBridge />
      <SiteHeader />
      <main>
        <HeroSection />
        <FeatureSection />
        <TutorialSection />
        <ExportSection />
        <TechSection />
        <FinalSection />
      </main>
    </div>
  )
}

function useLenisRefresh() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
}

function usePageAnimations(pageRef: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-tutorial-card]')

      gsap.from('[data-reveal]', {
        autoAlpha: 0,
        y: 22,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '[data-feature-grid]',
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })

      cards.forEach((card, index) => {
        const cursor = card.querySelector('.tutorial-cursor')
        const pulse = card.querySelector('.tutorial-cursor span')
        const tl = gsap.timeline({
          defaults: { ease: 'power2.out', duration: 0.45 },
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            end: 'bottom 36%',
            scrub: 0.9,
            refreshPriority: index,
          },
        })

        gsap.set(
          card.querySelectorAll(
            '.mock-dropdown, .mock-modal, .project-created, .clip-count, .export-done',
          ),
          {
            autoAlpha: 0,
            y: 8,
          },
        )
        gsap.set(card.querySelectorAll('.typed, .scan-bar span'), {
          scaleX: 0,
          transformOrigin: 'left center',
        })
        gsap.set(
          card.querySelectorAll(
            '.import-row, .score-row, .timecode-note, .export-menu button',
          ),
          {
            autoAlpha: 0,
            y: 10,
          },
        )
        const scoreTotal = card.querySelector('.score-total-step')
        if (scoreTotal) scoreTotal.textContent = '0 / 20'

        tl.fromTo(
          cursor,
          { x: 26, y: 28, autoAlpha: 0 },
          { x: 78, y: 34, autoAlpha: 1 },
          0,
        )
          .to(
            pulse,
            { autoAlpha: 1, scale: 1.8, duration: 0.22, yoyo: true, repeat: 1 },
            'click',
          )
          .to(
            card.querySelector('.mock-dropdown'),
            { autoAlpha: 1, y: 0 },
            '<0.05',
          )
          .to(cursor, { x: 182, y: 86 }, '+=0.25')
          .to(
            pulse,
            { autoAlpha: 1, scale: 1.8, duration: 0.22, yoyo: true, repeat: 1 },
            '+=0.02',
          )
          .to(
            card.querySelector('.mock-modal'),
            { autoAlpha: 1, y: 0 },
            '<0.05',
          )
          .to(
            card.querySelectorAll('.typed'),
            { scaleX: 1, stagger: 0.18 },
            '+=0.1',
          )
          .to(cursor, { x: 282, y: 304 }, '+=0.1')
          .to(
            pulse,
            { autoAlpha: 1, scale: 1.8, duration: 0.22, yoyo: true, repeat: 1 },
            '+=0.02',
          )
          .to(
            card.querySelector('.project-created'),
            { autoAlpha: 1, y: 0 },
            '<0.1',
          )

        if (card.dataset.tutorialCard === 'import') {
          tl.clear()
            .fromTo(
              cursor,
              { x: 24, y: 50, autoAlpha: 0 },
              { x: 118, y: 58, autoAlpha: 1 },
              0,
            )
            .to(
              pulse,
              {
                autoAlpha: 1,
                scale: 1.8,
                duration: 0.22,
                yoyo: true,
                repeat: 1,
              },
              '+=0.05',
            )
            .to(
              card.querySelector('.scan-bar span'),
              { scaleX: 1, duration: 0.8 },
              '<0.1',
            )
            .to(
              card.querySelectorAll('.import-row'),
              { autoAlpha: 1, y: 0, stagger: 0.14 },
              '<0.15',
            )
            .to(cursor, { x: 300, y: 232 }, '+=0.2')
            .to(
              card.querySelector('.clip-count'),
              { autoAlpha: 1, y: 0 },
              '<0.15',
            )
        }

        if (card.dataset.tutorialCard === 'score') {
          tl.clear()
            .fromTo(
              cursor,
              { x: 330, y: 44, autoAlpha: 0 },
              { x: 170, y: 116, autoAlpha: 1 },
              0,
            )
            .to(
              pulse,
              {
                autoAlpha: 1,
                scale: 1.8,
                duration: 0.22,
                yoyo: true,
                repeat: 1,
              },
              '+=0.05',
            )
            .to(
              card.querySelectorAll('.score-row'),
              { autoAlpha: 1, y: 0, stagger: 0.12 },
              '<0.12',
            )
            .call(
              () => {
                if (scoreTotal) scoreTotal.textContent = '17 / 20'
              },
              undefined,
              '<0.2',
            )
            .to(cursor, { x: 100, y: 274 }, '+=0.15')
            .to(
              card.querySelector('.timecode-note'),
              { autoAlpha: 1, y: 0 },
              '<0.1',
            )
        }

        if (card.dataset.tutorialCard === 'export') {
          tl.clear()
            .fromTo(
              cursor,
              { x: 320, y: 62, autoAlpha: 0 },
              { x: 276, y: 78, autoAlpha: 1 },
              0,
            )
            .to(
              card.querySelectorAll('.export-menu button'),
              { autoAlpha: 1, y: 0, stagger: 0.12 },
              '<0.1',
            )
            .to(cursor, { x: 292, y: 202 }, '+=0.15')
            .to(
              pulse,
              {
                autoAlpha: 1,
                scale: 1.8,
                duration: 0.22,
                yoyo: true,
                repeat: 1,
              },
              '<',
            )
            .to(
              card.querySelector('.export-done'),
              { autoAlpha: 1, y: 0 },
              '<0.08',
            )
        }
      })

      const hero = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
      hero.to('.hero-scene', { y: 90, scale: 0.98, autoAlpha: 0.74 }, 0)
    },
    { scope: pageRef },
  )
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="AMV Notation accueil">
        <span className="brand-mark">AMV</span>
        <span>AMV Notation</span>
      </a>
      <nav aria-label="Navigation principale">
        <a href="#application">Application</a>
        <a href="#tutoriels">Tutoriels</a>
        <a href="#exports">Exports</a>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
      <motion.a
        className="header-cta"
        href={releasesUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
      >
        <MonitorDown size={15} />
        Telecharger
      </motion.a>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="hero-section" id="top">
      <HeroProductScene />
      <div className="hero-content">
        <h1>AMV Notation</h1>
        <p>
          Application desktop pour organiser un concours AMV, noter les clips
          avec un bareme, piloter la video mpv, agreger plusieurs juges et
          publier les resultats.
        </p>
        <div className="hero-actions">
          <motion.a
            className="button primary"
            href={releasesUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <MonitorDown size={18} />
            Voir les releases
          </motion.a>
          <motion.a
            className="button secondary"
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <Github size={18} />
            Repo source
          </motion.a>
        </div>
        <div className="hero-facts" aria-label="Informations produit">
          {productFacts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </div>
      <a
        className="scroll-cue"
        href="#application"
        aria-label="Aller a la section application"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  )
}

function FeatureSection() {
  return (
    <section className="page-section" id="application">
      <div className="section-heading">
        <h2>Une chaine de notation complete</h2>
        <p>
          Le site presente les etapes reelles de l application: projet, import,
          notation, resultats et exports. Chaque bloc garde le vocabulaire de l
          outil desktop.
        </p>
      </div>
      <div className="feature-grid" data-feature-grid>
        {featureGroups.map(({ icon: Icon, title, text }) => (
          <motion.article
            className="feature-card"
            key={title}
            data-reveal
            whileHover={{ y: -3 }}
            transition={{ duration: 0.16 }}
          >
            <Icon size={20} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function TutorialSection() {
  return (
    <section className="tutorial-section" id="tutoriels">
      <div className="section-heading">
        <h2>Tutoriels pilotes par le scroll</h2>
        <p>
          Chaque carte avance avec la molette: le curseur se deplace, clique,
          remplit les champs et fait apparaitre l etat final sans video externe.
        </p>
      </div>
      <div className="tutorial-list">
        {tutorialSteps.map(({ id, title, intro, steps, actionLabel, Icon }) => (
          <article className="tutorial-card" data-tutorial-card={id} key={id}>
            <div className="tutorial-copy">
              <Icon size={22} />
              <h3>{title}</h3>
              <p>{intro}</p>
              <ol>
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="tutorial-status">
                <Check size={15} />
                {actionLabel}
              </div>
            </div>
            <TutorialScene id={id} />
          </article>
        ))}
      </div>
    </section>
  )
}

function ExportSection() {
  return (
    <section className="page-section export-section" id="exports">
      <div className="export-layout">
        <div className="section-heading align-left">
          <h2>Des resultats prets a partager</h2>
          <p>
            AMV Notation separe le fichier de concours, la notation d un juge et
            les sorties publiques. L organisateur peut centraliser les donnees
            puis choisir le format adapte.
          </p>
          <a
            className="text-link"
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
          >
            Lire le README source <ArrowUpRight size={15} />
          </a>
        </div>
        <ResultsMockup />
      </div>
      <div className="export-format-grid">
        {exportFormats.map(({ icon: Icon, title, text }) => (
          <article className="export-format" key={title}>
            <Icon size={19} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function TechSection() {
  return (
    <section className="tech-section">
      <div className="section-heading">
        <h2>Base technique lisible</h2>
        <p>
          L application cible Windows avec Tauri et une interface React. Cette
          vitrine est livree en TanStack Start avec l adapter Netlify deja
          configure.
        </p>
      </div>
      <div className="tech-row">
        {techStack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  )
}

function FinalSection() {
  return (
    <section className="final-section">
      <div>
        <h2>Installer, tester, presenter</h2>
        <p>
          La page sert a la fois de vitrine et de guide d onboarding. Elle donne
          une vue rapide au jury, aux organisateurs et aux contributeurs
          techniques.
        </p>
      </div>
      <div className="final-actions">
        <motion.a
          className="button primary"
          href={releasesUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
        >
          <PlayCircle size={18} />
          Demarrer avec une release
        </motion.a>
        <motion.a
          className="button secondary"
          href={repositoryUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
        >
          <Github size={18} />
          Contribuer sur GitHub
        </motion.a>
      </div>
    </section>
  )
}
