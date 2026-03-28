import { useState } from 'react'
import { useBabyBookContext } from '../../store/BabyBookContext'
import { getCurrentAgeKey, getAgeGroup } from '../../constants/ageGroups'
import ProfileSetup from './ProfileSetup'

export default function ProfileHeader() {
  const { profile, setProfile, getTotalCount } = useBabyBookContext()
  const [editing, setEditing] = useState(false)

  const currentAgeKey = profile?.birthDate ? getCurrentAgeKey(profile.birthDate) : null
  const currentAge = currentAgeKey ? getAgeGroup(currentAgeKey) : null
  const totalCount = getTotalCount()

  function handleSave(data) {
    setProfile(data)
    setEditing(false)
  }

  if (!profile) return null

  return (
    <>
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-6 mb-8 shadow-card">
        {/* Background decoration */}
        <div className="absolute -top-6 -right-6 text-9xl opacity-10 select-none pointer-events-none">👶</div>

        <div className="flex items-center gap-5">
          {/* Avatar */}
          <button
            onClick={() => setEditing(true)}
            className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden bg-white border-4 border-white shadow-md hover:scale-105 transition-transform"
            title="Edit profile"
          >
            {profile.coverPhoto
              ? <img src={profile.coverPhoto} alt={profile.babyName} className="w-full h-full object-cover" />
              : <span className="w-full h-full flex items-center justify-center text-4xl">👶</span>
            }
          </button>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-900 text-2xl sm:text-3xl text-gray-800 truncate">
              {profile.babyName}'s Baby Book
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1.5">
              {currentAge && (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 bg-white/70 px-3 py-1 rounded-full">
                  {currentAge.emoji} Currently {currentAge.label}
                </span>
              )}
              {totalCount > 0 && (
                <span className="text-sm text-gray-500">
                  {totalCount} {totalCount === 1 ? 'memory' : 'memories'} saved
                </span>
              )}
            </div>
          </div>

          {/* Edit button */}
          <button
            onClick={() => setEditing(true)}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-gray-500 hover:text-pink-500 shadow transition-all"
            title="Edit profile"
          >
            ✏️
          </button>
        </div>
      </div>

      <ProfileSetup isOpen={editing} onSave={handleSave} initialData={profile} />
    </>
  )
}
