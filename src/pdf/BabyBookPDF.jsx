import { Document } from '@react-pdf/renderer'
import '../pdf/pdfFonts'
import CoverPage from './CoverPage'
import AgeSectionPage from './AgeSectionPage'
import { AGE_GROUPS } from '../constants/ageGroups'
import { CATEGORIES } from '../constants/categories'

/**
 * Root PDF document component.
 * @param {object} profile - { babyName, birthDate, coverPhoto }
 * @param {object} entries - full entries object from useBabyBook
 */
export default function BabyBookPDF({ profile, entries }) {
  // Build list of age groups that have at least one entry
  const ageGroupsWithEntries = AGE_GROUPS.filter(ag => {
    const ageData = entries[ag.key]
    if (!ageData) return false
    return CATEGORIES.some(cat => (ageData[cat.key]?.length ?? 0) > 0)
  })

  // Count totals
  let totalMemories = 0
  for (const ag of ageGroupsWithEntries) {
    const ageData = entries[ag.key] ?? {}
    for (const cat of CATEGORIES) {
      totalMemories += ageData[cat.key]?.length ?? 0
    }
  }

  return (
    <Document
      title={`${profile?.babyName || 'Baby'}'s Memory Book`}
      author={profile?.babyName || 'Baby Book'}
      subject="Baby Memory Book"
      keywords="baby, memories, milestones"
      creator="Baby Book App"
    >
      {/* Cover page */}
      <CoverPage
        profile={profile}
        totalMemories={totalMemories}
        ageCount={ageGroupsWithEntries.length}
      />

      {/* One section per age group */}
      {ageGroupsWithEntries.map(ag => {
        const ageData = entries[ag.key] ?? {}
        const categoryEntries = Object.fromEntries(
          CATEGORIES.map(cat => [cat.key, ageData[cat.key] ?? []])
        )
        const count = CATEGORIES.reduce((n, cat) => n + (ageData[cat.key]?.length ?? 0), 0)
        return (
          <AgeSectionPage
            key={ag.key}
            ageGroup={ag}
            categoryEntries={categoryEntries}
            totalCount={count}
          />
        )
      })}
    </Document>
  )
}
