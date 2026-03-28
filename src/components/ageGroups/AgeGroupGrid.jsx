import { AGE_GROUPS } from '../../constants/ageGroups'
import AgeGroupCard from './AgeGroupCard'

const SECTIONS = [
  { label: 'First Year',    keys: AGE_GROUPS.filter(g => g.section === 'First Year').map(g => g.key) },
  { label: 'Toddler Years', keys: AGE_GROUPS.filter(g => g.section === 'Toddler Years').map(g => g.key) },
  { label: 'Childhood',     keys: AGE_GROUPS.filter(g => g.section === 'Childhood').map(g => g.key) },
  { label: 'Teen Years',    keys: AGE_GROUPS.filter(g => g.section === 'Teen Years').map(g => g.key) },
]

const groupMap = Object.fromEntries(AGE_GROUPS.map(g => [g.key, g]))

export default function AgeGroupGrid() {
  return (
    <div className="space-y-8">
      {SECTIONS.map(section => (
        <div key={section.label}>
          <h2 className="font-display font-800 text-lg text-gray-600 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-pink-300 rounded-full inline-block" />
            {section.label}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {section.keys.map(key => (
              <AgeGroupCard key={key} group={groupMap[key]} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
