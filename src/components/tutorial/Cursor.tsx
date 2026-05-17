import { forwardRef } from 'react'

export const Cursor = forwardRef<HTMLDivElement, { clicking?: boolean }>(
  function Cursor({ clicking }, ref) {
    return (
      <div
        ref={ref}
        data-cursor
        className="pointer-events-none absolute left-0 top-0 z-50 select-none"
        style={{ transform: 'translate3d(-100px,-100px,0)' }}
      >
        <div className="relative">
          <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <path
              d="M2 2 L2 18 L6.5 13.5 L9.5 20 L12 19 L9 12.5 L15 12.5 Z"
              fill="white"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <span
            data-cursor-ring
            className={`absolute -left-2 -top-2 h-9 w-9 rounded-full border-2 border-primary-400 transition-all ${
              clicking ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          />
        </div>
      </div>
    )
  },
)
