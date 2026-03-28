import { useState } from 'react'
import Modal from '../ui/Modal'
import PhotoUploader from '../photos/PhotoUploader'
import { getCategory } from '../../constants/categories'

export default function EntryForm({ isOpen, onClose, onSave, categoryKey, ageLabel, initialData }) {
  const cat = getCategory(categoryKey)
  const isEdit = !!initialData

  const [title, setTitle]     = useState(initialData?.title   ?? '')
  const [caption, setCaption] = useState(initialData?.caption ?? '')
  const [notes, setNotes]     = useState(initialData?.notes   ?? '')
  const [date, setDate]       = useState(initialData?.date    ?? '')
  const [photos, setPhotos]   = useState(initialData?.photos  ?? [])
  const [error, setError]     = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('Please add a title.'); return }
    onSave({ title: title.trim(), caption: caption.trim(), notes: notes.trim(), date, photos })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${isEdit ? 'Edit' : 'Add'} ${cat?.label} ${cat?.emoji} — ${ageLabel}`}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
        {/* Title */}
        <div>
          <label className="label">Title *</label>
          <input
            className="input"
            placeholder={cat?.description}
            value={title}
            onChange={e => { setTitle(e.target.value); setError('') }}
            autoFocus
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="label">Date</label>
          <input
            type="date"
            className="input"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        {/* Caption */}
        <div>
          <label className="label">Short Caption</label>
          <input
            className="input"
            placeholder="One-line summary..."
            value={caption}
            onChange={e => setCaption(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="label">Notes / Story</label>
          <textarea
            className="textarea"
            rows={4}
            placeholder="Tell the full story here — details you'll want to remember forever..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        {/* Photos */}
        <div>
          <label className="label">Photos</label>
          <PhotoUploader photos={photos} onChange={setPhotos} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">
            {isEdit ? 'Save Changes' : 'Add Memory'} ✨
          </button>
        </div>
      </form>
    </Modal>
  )
}
