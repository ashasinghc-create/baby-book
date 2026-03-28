import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import AgeGroupNav from '../components/ageGroups/AgeGroupNav'
import CategoryTabs from '../components/categories/CategoryTabs'
import EntryList from '../components/entries/EntryList'
import { getAgeGroup } from '../constants/ageGroups'
import { CATEGORIES } from '../constants/categories'

export default function AgeGroupPage() {
  const { ageKey } = useParams()
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].key)

  const ageGroup = getAgeGroup(ageKey)
  if (!ageGroup) return <Navigate to="/" replace />

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-pink-500 mb-6 transition-colors"
      >
        ← All Ages
      </Link>

      {/* Age navigation */}
      <AgeGroupNav ageKey={ageKey} />

      {/* Category tabs */}
      <CategoryTabs
        ageKey={ageKey}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Entries */}
      <EntryList ageKey={ageKey} categoryKey={activeCategory} />
    </div>
  )
}
