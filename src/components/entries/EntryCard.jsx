import { useState } from 'react'
import { getCategory } from '../../constants/categories'
import PhotoLightbox from '../photos/PhotoLightbox'
import ConfirmDialog from '../ui/ConfirmDialog'

export default function EntryCard({ entry, categoryKey, onEdit, onDelete }) {
  const cat = getCategory(categoryKey)
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [confirming, setConfirming] = useState(false)

  const photos = entry.photos ?? []
  const hasPhotos = photos.length > 0
  const previewPhotos = photos.slice(0, 4)
  const extraCount = photos.length - 4

  function formatDate(iso) {
    if (!iso) return null
    try { return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }
    catch { return iso }
  }

  return (
    <>
      <div className="card hover:shadow-card-hover transition-all animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${cat?.bgClass} ${cat?.textClass}`}>
                {cat?.emoji} {cat?.label}
              </span>
              {entry.date && (
                <span className="text-xs text-gray-400">{formatDate(entry.date)}</span>
              )}
            </div>
            <h3 className="font-display font-bold text-gray-800 text-base leading-snug truncate">{entry.title}</h3>
            {entry.caption && <p className="text-sm text-gray-500 mt-0.5 truncate">{entry.caption}</p>}
          </div>
          {/* Actions */}
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={onEdit}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors text-sm"
              title="Edit"
            >✏️</button>
            <button
              onClick={() => setConfirming(true)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors text-sm"
              title="Delete"
            >🗑️</button>
          </div>
        </div>

        {/* Notes */}
        {entry.notes && (
          <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">{entry.notes}</p>
        )}

        {/* Photo grid */}
        {hasPhotos && (
          <div className={`grid gap-1.5 mt-3 ${previewPhotos.length === 1 ? 'grid-cols-1' : previewPhotos.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {previewPhotos.map((src, i) => (
              <div
                key={i}
                onClick={() => setLightboxIdx(i)}
                className={`relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity
                  ${previewPhotos.length === 1 ? 'aspect-[4/3]' : 'aspect-square'}
                `}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
                {i === 3 && extraCount > 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                    +{extraCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-300 mt-3">
          Added {new Date(entry.createdAt).toLocaleDateString()}
          {entry.photos?.length > 0 && ` · ${entry.photos.length} photo${entry.photos.length > 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <PhotoLightbox
          photos={photos}
          initialIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      {/* Confirm delete */}
      <ConfirmDialog
        isOpen={confirming}
        onClose={() => setConfirming(false)}
        onConfirm={onDelete}
        title="Delete Memory?"
        message={`"${entry.title}" will be permanently deleted.`}
      />
    </>
  )
}
