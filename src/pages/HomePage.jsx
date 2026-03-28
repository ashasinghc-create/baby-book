import ProfileHeader from '../components/profile/ProfileHeader'
import AgeGroupGrid from '../components/ageGroups/AgeGroupGrid'
import { useBabyBookContext } from '../store/BabyBookContext'

export default function HomePage() {
  const { getTotalCount } = useBabyBookContext()
  const totalCount = getTotalCount()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ProfileHeader />

      {/* Intro hint */}
      {totalCount === 0 && (
        <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-sm text-blue-600 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <p className="font-semibold">Tap any age card to start adding memories!</p>
            <p className="text-blue-400 mt-0.5">Capture birthdays, milestones, funny habits, memories, and achievements for every stage.</p>
          </div>
        </div>
      )}

      <AgeGroupGrid />
    </div>
  )
}
