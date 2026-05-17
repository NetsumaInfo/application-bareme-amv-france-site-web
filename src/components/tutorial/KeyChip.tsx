export function KeyChip({
  children,
  active,
}: {
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <kbd
      className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border px-1.5 font-mono text-[10px] font-medium transition-all ${
        active
          ? 'border-primary-400 bg-primary-600 text-white shadow-[0_0_0_3px_rgba(59,130,246,0.25)]'
          : 'border-white/10 bg-white/5 text-gray-300'
      }`}
    >
      {children}
    </kbd>
  )
}
