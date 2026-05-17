import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { TutorialsIntro } from '@/components/landing/TutorialsIntro'
import { Shortcuts } from '@/components/landing/Shortcuts'
import { DownloadSection } from '@/components/landing/Download'
import { Footer } from '@/components/landing/Footer'
import {
  CreateProjectTutorial,
  ImportVideosTutorial,
  NoteClipTutorial,
  MultiJugesTutorial,
  ExportTutorial,
  BaremeTutorial,
} from '@/components/tutorial/tutorials'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Features />
      <TutorialsIntro />
      <CreateProjectTutorial />
      <ImportVideosTutorial />
      <NoteClipTutorial />
      <MultiJugesTutorial />
      <ExportTutorial />
      <BaremeTutorial />
      <Shortcuts />
      <DownloadSection />
      <Footer />
    </main>
  )
}
