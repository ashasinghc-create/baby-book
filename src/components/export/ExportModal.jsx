import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Modal from '../ui/Modal'
import BabyBookPDF from '../../pdf/BabyBookPDF'
import { useBabyBookContext } from '../../store/BabyBookContext'
import { AGE_GROUPS } from '../../constants/ageGroups'
import { CATEGORIES } from '../../constants/categories'

function countEntries(entries) {
  let total = 0
  for (const ageData of Object.values(entries)) {
    for (const cat of CATEGORIES) {
      total += ageData[cat.key]?.length ?? 0
    }
  }
  return total
}

function countAgesWithEntries(entries) {
  return AGE_GROUPS.filter(ag => {
    const ageData = entries[ag.key]
    if (!ageData) return false
    return CATEGORIES.some(cat => (ageData[cat.key]?.length ?? 0) > 0)
  }).length
}

export default function ExportModal({ isOpen, onClose }) {
  const { profile, entries } = useBabyBookContext()
  const [ready, setReady] = useState(false)

  const totalMemories = countEntries(entries)
  const ageCount = countAgesWithEntries(entries)
  const fileName = `${(profile?.babyName || 'baby').toLowerCase().replace(/\s+/g, '-')}-memory-book.pdf`

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Baby Book as PDF" size="md">
      <div className="px-6 py-5 space-y-5">
        {/* Summary */}
        <div className="rounded-2xl bg-baby-pink p-4 space-y-2">
          <p className="font-display font-bold text-gray-800 text-base">
            {profile?.babyName}'s Memory Book
          </p>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>📖 {totalMemories} {totalMemories === 1 ? 'memory' : 'memories'}</span>
            <span>📅 {ageCount} age {ageCount === 1 ? 'group' : 'groups'}</span>
            {profile?.birthDate && (
              <span>🎂 Born {new Date(profile.birthDate + 'T00:00:00').toLocaleDateString()}</span>
            )}
          </div>
        </div>

        {/* What's included */}
        <div className="space-y-2">
          <p className="label">What's included</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-green-400 font-bold">✓</span> Cover page with photo &amp; baby's name
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400 font-bold">✓</span> Section dividers for each age group
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400 font-bold">✓</span> All categories — birthdays, milestones, habits, memories, achievements
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400 font-bold">✓</span> All photos embedded in full quality
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400 font-bold">✓</span> Editable text — titles, captions &amp; notes are real PDF text
            </li>
          </ul>
        </div>

        <p className="text-xs text-gray-400">
          The PDF is generated entirely in your browser — nothing is uploaded anywhere.
          Generation may take a moment if there are many photos.
        </p>

        {/* Prepare toggle */}
        {!ready && (
          <button
            className="btn-primary w-full justify-center py-3"
            onClick={() => setReady(true)}
          >
            Prepare PDF ✨
          </button>
        )}

        {ready && (
          <PDFDownloadLink
            document={<BabyBookPDF profile={profile} entries={entries} />}
            fileName={fileName}
          >
            {({ loading, error }) => (
              <button
                className={`w-full py-3 rounded-2xl font-semibold text-base transition-all ${
                  loading
                    ? 'bg-gray-100 text-gray-400 cursor-wait'
                    : error
                      ? 'bg-red-100 text-red-500'
                      : 'btn-primary justify-center'
                }`}
                disabled={loading}
              >
                {loading
                  ? '⏳ Generating PDF...'
                  : error
                    ? '❌ Error — try again'
                    : '⬇️ Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
        )}

        <button className="btn-secondary w-full justify-center" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  )
}
