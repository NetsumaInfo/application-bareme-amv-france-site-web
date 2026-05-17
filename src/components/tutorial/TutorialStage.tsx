import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cursor } from './Cursor'

let stRegistered = false

export type TutorialStep = {
  caption: string
  detail?: string
  targetSelector?: string
  anchor?: 'center' | 'left' | 'right'
  click?: boolean
  keys?: string[]
}

type Props = {
  id: string
  title: string
  intro?: string
  steps: TutorialStep[]
  render: (stepIndex: number, progress: number) => ReactNode
  stepVH?: number
  mockStyle?: CSSProperties
}

export function TutorialStage({
  id,
  title,
  steps,
  render,
  stepVH = 80,
  mockStyle,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mockHostRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const moveCursorRef = useRef<((idx: number) => void) | null>(null)

  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!stRegistered) {
      gsap.registerPlugin(ScrollTrigger)
      stRegistered = true
    }

    const section = sectionRef.current
    const mock = mockHostRef.current
    const cursor = cursorRef.current
    if (!section || !mock || !cursor) return

    const stepCount = steps.length
    const totalHeight = `+=${stepCount * stepVH}vh`

    gsap.set(cursor, { x: 40, y: 40, force3D: true })
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.55, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.55, ease: 'power3.out' })

    let clickT: gsap.core.Tween | null = null

    const moveCursorToStep = (idx: number) => {
      const step = steps[idx]
      if (!step) return
      if (!step.targetSelector) return
      const target = mock.querySelector<HTMLElement>(step.targetSelector)
      if (!target) return
      const mockRect = mock.getBoundingClientRect()
      const tRect = target.getBoundingClientRect()
      const anchor = step.anchor ?? 'center'
      let tx = tRect.left - mockRect.left
      if (anchor === 'center') tx += tRect.width / 2
      else if (anchor === 'right') tx += tRect.width - 10
      else tx += 10
      const ty = tRect.top - mockRect.top + tRect.height / 2
      xTo(tx)
      yTo(ty)
      if (step.click) {
        clickT?.kill()
        clickT = gsap.delayedCall(0.45, () => {
          setClicking(true)
          gsap.delayedCall(0.28, () => setClicking(false))
        })
      }
    }
    moveCursorRef.current = moveCursorToStep

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: totalHeight,
      scrub: 0.4,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress
        setProgress(p)
        const next = Math.min(stepCount - 1, Math.floor(p * stepCount))
        setStepIndex(next)
      },
    })

    // Initial pointer placement once mock has laid out.
    const initialRaf = requestAnimationFrame(() => {
      requestAnimationFrame(() => moveCursorToStep(0))
    })

    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })
    ro.observe(mock)

    return () => {
      cancelAnimationFrame(initialRaf)
      clickT?.kill()
      ro.disconnect()
      st.kill()
    }
  }, [steps, stepVH])

  // Re-position cursor whenever the displayed step changes. Double rAF
  // ensures the new mock variation has rendered before we measure the
  // target's bounding rect.
  useEffect(() => {
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => moveCursorRef.current?.(stepIndex))
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [stepIndex])

  const activeStep = steps[stepIndex]

  return (
    <section ref={sectionRef} id={id} className="relative">
      <div className="relative mx-auto flex h-screen w-full max-w-[1400px] flex-col px-4 pb-4 pt-20 lg:px-8 lg:pb-6 lg:pt-24">
        {/* Top: title (left) + step counter (right) */}
        <div className="flex shrink-0 items-baseline justify-between gap-4 pb-3">
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-gray-600">
              {id}
            </p>
            <h2 className="mt-0.5 truncate text-[14px] font-semibold leading-tight text-gray-200">
              {title}
            </h2>
          </div>
          <div className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-gray-500">
            {String(stepIndex + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </div>
        </div>

        {/* Center: mock fills available height + width */}
        <div className="flex min-h-0 flex-1 items-stretch justify-center overflow-hidden">
          <div
            ref={mockHostRef}
            className="relative h-full w-full max-w-[1280px]"
            style={mockStyle}
          >
            {render(stepIndex, progress)}
            <Cursor ref={cursorRef} clicking={clicking} />
          </div>
        </div>

        {/* Bottom: horizontal step strip — discrete, never overlaps mock */}
        <div className="shrink-0 pt-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-1.5">
              {steps.map((s, i) => {
                const isActive = i === stepIndex
                const isDone = i < stepIndex
                return (
                  <div
                    key={i}
                    className={`flex flex-1 items-center gap-1.5 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : isDone ? 'opacity-50' : 'opacity-30'
                    }`}
                  >
                    <span
                      className={`h-0.5 flex-1 rounded-full transition-all ${
                        isActive
                          ? 'bg-primary-400'
                          : isDone
                          ? 'bg-primary-500/60'
                          : 'bg-white/10'
                      }`}
                    />
                    {isActive && (
                      <span className="hidden whitespace-nowrap text-[11px] text-gray-200 lg:inline">
                        {s.caption}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
            {activeStep?.keys && (
              <div className="flex shrink-0 gap-1">
                {activeStep.keys.map((k, j) => (
                  <kbd
                    key={j}
                    className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-white/10 bg-white/[0.04] px-1.5 font-mono text-[10px] text-gray-300"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            )}
          </div>
          {/* Mobile-only caption */}
          <p className="mt-2 truncate text-[11px] text-gray-300 lg:hidden">
            {activeStep?.caption}
          </p>
        </div>
      </div>
    </section>
  )
}
