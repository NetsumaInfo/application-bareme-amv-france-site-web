export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-[12px] text-gray-500 lg:flex-row lg:px-10">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded bg-primary-600 text-[9px] font-bold text-white">
            AMV
          </span>
          <span>AMV Notation · v0.9.1 · CC0 1.0 Universal</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/NetsumaInfo/application-bareme-amv-france"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://github.com/NetsumaInfo/application-bareme-amv-france/issues"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            Issues
          </a>
          <a
            href="https://github.com/NetsumaInfo/application-bareme-amv-france/releases"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            Releases
          </a>
        </div>
      </div>
    </footer>
  )
}
