import { useState } from 'react'
import Modal from '../ui/Modal'
import { compressImage } from '../../utils/photoUtils'

export default function ProfileSetup({ isOpen, onSave }) {
  const [babyName, setBabyName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [coverPhoto, setCoverPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const compressed = await compressImage(file, 800, 0.85)
      setCoverPhoto(compressed)
    } catch {
      setError('Could not process image.')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!babyName.trim()) { setError('Please enter a name.'); return }
    onSave({ babyName: babyName.trim(), birthDate, coverPhoto })
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Welcome to Baby Book 👶">
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
        <p className="text-gray-500 text-sm">Let's set up your little one's digital memory book!</p>

        {/* Cover photo */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-28 h-28 rounded-full overflow-hidden bg-baby-pink border-4 border-pink-200 shadow-md">
            {coverPhoto
              ? <img src={coverPhoto} alt="cover" className="w-full h-full object-cover" />
              : <span className="absolute inset-0 flex items-center justify-center text-5xl">👶</span>
            }
          </div>
          <label className="btn-secondary text-sm cursor-pointer">
            {loading ? 'Processing...' : 'Choose Photo'}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} disabled={loading} />
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="label">Baby's Name *</label>
          <input
            className="input"
            placeholder="e.g. Lily, Noah, Aria..."
            value={babyName}
            onChange={e => { setBabyName(e.target.value); setError('') }}
            autoFocus
          />
        </div>

        {/* Birthday */}
        <div>
          <label className="label">Date of Birth</label>
          <input
            type="date"
            className="input"
            value={birthDate}
            max={new Date().toISOString().split('T')[0]}
            onChange={e => setBirthDate(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">Used to highlight the current age group</p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="btn-primary w-full justify-center py-3 text-base">
          Start My Baby Book ✨
        </button>
      </form>
    </Modal>
  )
}
