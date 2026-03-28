import { Link } from 'react-router-dom'
import { getAdjacentAgeGroups, getAgeGroup } from '../../constants/ageGroups'

export default function AgeGroupNav({ ageKey }) {
  const { prev, next } = getAdjacentAgeGroups(ageKey)
  const current = getAgeGroup(ageKey)

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1">
        {prev && (
          <Link
            to={`/age/${prev.key}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-pink-500 transition-colors group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow group-hover:bg-pink-50 transition-colors">←</span>
            <span className="hidden sm:inline">{prev.emoji} {prev.label}</span>
          </Link>
        )}
      </div>

      <div className="text-center">
        <span className="text-3xl">{current?.emoji}</span>
        <p className="font-display font-bold text-xl text-gray-800">{current?.label}</p>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{current?.section}</p>
      </div>

      <div className="flex-1 flex justify-end">
        {next && (
          <Link
            to={`/age/${next.key}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-pink-500 transition-colors group"
          >
            <span className="hidden sm:inline">{next.emoji} {next.label}</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow group-hover:bg-pink-50 transition-colors">→</span>
          </Link>
        )}
      </div>
    </div>
  )
}
