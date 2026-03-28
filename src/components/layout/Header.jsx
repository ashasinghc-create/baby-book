import { Link } from 'react-router-dom'
import { useBabyBookContext } from '../../store/BabyBookContext'
import StorageMeter from '../ui/StorageMeter'
import { getCurrentAgeKey, getAgeGroup } from '../../constants/ageGroups'

export default function Header() {
  const { profile, getTotalCount } = useBabyBookContext()
  const currentAgeKey = profile?.birthDate ? getCurrentAgeKey(profile.birthDate) : null
  const currentAge = currentAgeKey ? getAgeGroup(currentAgeKey) : null
  const totalCount = getTotalCount()

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">👶</span>
          <span className="font-display font-900 text-xl text-pink-500 leading-none">
            {profile?.babyName ? `${profile.babyName}'s Book` : 'Baby Book'}
          </span>
        </Link>

        {/* Centre info */}
        <div className="flex items-center gap-4">
          {currentAge && (
            <span className="hidden sm:flex items-center gap-1 text-sm font-semibold text-purple-500 bg-baby-purple px-3 py-1 rounded-full">
              {currentAge.emoji} {currentAge.label} now
            </span>
          )}
          {totalCount > 0 && (
            <span className="hidden md:flex items-center gap-1 text-sm text-gray-400">
              {totalCount} {totalCount === 1 ? 'memory' : 'memories'}
            </span>
          )}
        </div>

        {/* Right side */}
        <StorageMeter />
      </div>
    </header>
  )
}
