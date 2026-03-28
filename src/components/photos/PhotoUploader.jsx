import { useRef, useState } from 'react'
import { compressImage } from '../../utils/photoUtils'
import { storageAvailableForImage } from '../../utils/storageUtils'

export default function PhotoUploader({ photos, onChange, maxPhotos = 8 }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  async function processFiles(files) {
    if (!files.length) return
    setError('')
    setProcessing(true)
    const newPhotos = [...photos]
    for (const file of files) {
      if (newPhotos.length >= maxPhotos) {
        setError(`Max ${maxPhotos} photos per entry.`)
        break
      }
      if (!file.type.startsWith('image/')) continue
      try {
        const compressed = await compressImage(file, 1200, 0.82)
        if (!storageAvailableForImage(compressed)) {
          setError('Storage nearly full. Remove some photos to add more.')
          break
        }
        newPhotos.push(compressed)
      } catch {
        setError('Failed to process one of the images.')
      }
    }
    setProcessing(false)
    onChange(newPhotos)
  }

  function removePhoto(idx) {
    const next = photos.filter((_, i) => i !== idx)
    onChange(next)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    processFiles(Array.from(e.dataTransfer.files))
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      {photos.length < maxPhotos && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`
            relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all
            ${dragging ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/40'}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => processFiles(Array.from(e.target.files ?? []))}
          />
          <div className="text-3xl mb-2">{processing ? '⏳' : '📷'}</div>
          <p className="text-sm font-semibold text-gray-500">
            {processing ? 'Processing...' : 'Drop photos here or click to browse'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Up to {maxPhotos} photos · JPG, PNG, WebP</p>
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Photo thumbnails */}
      {photos.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {photos.map((src, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-black/60 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
