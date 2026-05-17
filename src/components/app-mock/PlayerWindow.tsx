import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Subtitles,
  AudioLines,
  ImagePlus,
  SkipBack,
  SkipForward,
} from 'lucide-react'

type Props = {
  clipTitle?: string
  clipAuthor?: string
  detached?: boolean
  fullscreen?: boolean
  isPlaying?: boolean
  currentTime?: string
  duration?: string
  progress?: number
  className?: string
  /** YouTube video id for autoplay embed. */
  youtubeId?: string
}

export function PlayerWindow({
  clipTitle = 'ShinRyu',
  clipAuthor = '',
  detached = true,
  fullscreen = false,
  isPlaying = true,
  currentTime = '01:24',
  duration = '04:11',
  progress = 0.33,
  className = '',
  youtubeId = 'B572L4eWWD0',
}: Props) {
  const embedSrc = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&fs=0`

  return (
    <div
      data-window="player"
      className={`flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-black shadow-2xl shadow-black/70 ${className}`}
    >
      {/* FloatingPlayerHeader — bg-linear-to-r from-gray-900 to-gray-800 */}
      {detached && !fullscreen && (
        <div className="flex cursor-move items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 px-3 py-1.5 opacity-90 select-none">
          <span className="text-[10px] font-medium text-gray-400">
            {clipTitle}
            {clipAuthor ? ` — ${clipAuthor}` : ''}
          </span>
          <button className="flex h-4 w-4 items-center justify-center rounded-sm hover:bg-gray-700">
            <X size={12} className="text-gray-400" />
          </button>
        </div>
      )}

      {/* Video surface — iframe SCALED 130% so YT chrome lives off-screen, then solid masks */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <iframe
          src={embedSrc}
          title={`${clipTitle} — ${clipAuthor}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
          // 130% scale pushes top title + bottom logo + side hint cards outside visible box
          className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 border-0"
        />
        {/* Solid black bands to hide ANY remaining chrome — top (title), bottom (logo, end-screen cards), corners */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-black" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-black" />
        {/* Bottom gradient softens transition into timeline bar */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black via-black/80 to-transparent" />
        {/* Block any iframe clicks completely */}
        <div className="absolute inset-0" aria-hidden />
      </div>

      {/* FloatingPlayerTimeline */}
      <div className="flex items-center gap-2 border-t border-gray-800 bg-[rgb(15_15_25)]/95 px-3 py-1">
        <span className="w-8 text-right font-mono text-[9px] text-gray-500">{currentTime}</span>
        <div className="relative flex-1">
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-primary-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
        <span className="w-8 font-mono text-[9px] text-gray-500">{duration}</span>
      </div>

      {/* FloatingPlayerControls — w-6 h-6 rounded-sm, icon size 14 */}
      <div className="flex flex-wrap items-center justify-center gap-1 border-t border-gray-800 bg-[rgb(15_15_25)]/95 px-2 py-1.5">
        <button className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-gray-700" title="Reculer 5s">
          <SkipBack size={14} className="text-gray-300" />
        </button>
        <button
          data-action="play-pause"
          className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-gray-700"
        >
          {isPlaying ? (
            <Pause size={14} className="text-gray-300" />
          ) : (
            <Play size={14} className="text-gray-300" />
          )}
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-gray-700" title="Avancer 5s">
          <SkipForward size={14} className="text-gray-300" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-gray-700" title="Muet">
          {isPlaying ? (
            <Volume2 size={14} className="text-gray-300" />
          ) : (
            <VolumeX size={14} className="text-gray-300" />
          )}
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-gray-700" title="Sous-titres">
          <Subtitles size={14} className="text-gray-300" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-gray-700" title="Piste audio">
          <AudioLines size={14} className="text-gray-300" />
        </button>
        {/* compact AudioDbMeter stub */}
        <div className="flex h-6 items-end gap-[2px] px-1">
          {[0.4, 0.7, 0.5, 0.85, 0.6].map((h, i) => (
            <span
              key={i}
              className="w-[2px] rounded-sm bg-emerald-400/70"
              style={{ height: `${h * 14}px` }}
            />
          ))}
        </div>
        <button className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-gray-700" title="Plein écran">
          <Maximize2 size={14} className="text-gray-300" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-gray-700" title="Capture image">
          <ImagePlus size={14} className="text-gray-300" />
        </button>
      </div>
    </div>
  )
}
