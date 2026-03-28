import { Link } from 'react-router-dom'
import { useBabyBookContext } from '../../store/BabyBookContext'
import { getCurrentAgeKey } from '../../constants/ageGroups'

export default function AgeGroupCard({ group }) {
  const { profile, getEntryCounts } = useBabyBookContext()
  const counts = getEntryCounts(group.key)
  const totalEntries = Object.values(counts).reduce((a, b) => a + b, 0)
  const currentAgeKey = profile?.birthDate ? getCurrentAgeKey(profile.birthDate) : null
  const isCurrent = group.key === currentAgeKey

  return (
    <Link
      to={`/age/${group.key}`}
      className={`
        group relative flex flex-col items-center gap-2 p-4 rounded-3xl border-2 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer
        ${isCurrent
          ? 'border-pink-300 bg-gradient-to-br from-pink-50 to-purple-50 shadow-card'
          : totalEntries > 0
            ? 'border-purple-200 bg-white shadow-sm hover:border-purple-300'
            : 'border-gray-100 bg-white hover:border-pink-200'
        }
      `}
    >
      {/* Current badge */}
      {isCurrent && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-pink-400 px-2 py-0.5 rounded-full whitespace-nowrap shadow">
          Now
        </span>
      )}

      {/* Emoji */}
      <span className="text-3xl group-hover:scale-110 transition-transform">{group.emoji}</span>

      {/* Label */}
      <span className="text-xs font-bold text-center text-gray-700 leading-tight font-display">
        {group.label}
      </span>

      {/* Entry count */}
      {totalEntries > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 flex items-center justify-center text-xs font-bold text-white bg-purple-400 rounded-full px-1 shadow">
          {totalEntries}
        </span>
      )}
    </Link>
  )
}
