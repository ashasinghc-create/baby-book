import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function PhotoLightbox({ photos, initialIndex = 0, onClose }) {
  const [idx, setIdx] = useState(initialIndex)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx(i => Math.min(i + 1, photos.length - 1))
      if (e.key === 'ArrowLeft')  setIdx(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, photos.length])

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 animate-fade-in">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 text-xl transition"
      >✕</button>

      {/* Prev */}
      {idx > 0 && (
        <button
          onClick={() => setIdx(i => i - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 text-xl transition"
        >←</button>
      )}

      {/* Image */}
      <img
        src={photos[idx]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
      />

      {/* Next */}
      {idx < photos.length - 1 && (
        <button
          onClick={() => setIdx(i => i + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 text-xl transition"
        >→</button>
      )}

      {/* Counter */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  )
}
