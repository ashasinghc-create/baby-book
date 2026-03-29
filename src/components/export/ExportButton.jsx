import { useState, lazy, Suspense } from 'react'
import { useBabyBookContext } from '../../store/BabyBookContext'

const ExportModal = lazy(() => import('./ExportModal'))

export default function ExportButton() {
  const { profile, getTotalCount } = useBabyBookContext()
  const [open, setOpen] = useState(false)

  // Only show when there's something to export
  if (!profile || getTotalCount() === 0) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-600 font-semibold text-sm rounded-xl border border-pink-200 transition-all hover:shadow-sm active:scale-95"
        title="Download as PDF"
      >
        <span>⬇️</span>
        <span className="hidden sm:inline">Export PDF</span>
      </button>

      <Suspense fallback={null}>
        <ExportModal isOpen={open} onClose={() => setOpen(false)} />
      </Suspense>
    </>
  )
}
