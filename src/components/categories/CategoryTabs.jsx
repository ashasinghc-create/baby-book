import { CATEGORIES } from '../../constants/categories'
import { useBabyBookContext } from '../../store/BabyBookContext'

export default function CategoryTabs({ ageKey, activeCategory, onSelect }) {
  const { getEntryCounts } = useBabyBookContext()
  const counts = getEntryCounts(ageKey)

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide mb-6">
      {CATEGORIES.map(cat => {
        const isActive = cat.key === activeCategory
        const count = counts[cat.key] ?? 0
        return (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={`
              flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl text-sm font-semibold transition-all duration-200
              ${isActive
                ? `${cat.activeClass} shadow-md scale-105`
                : `${cat.bgClass} ${cat.textClass} hover:opacity-80`
              }
            `}
          >
            <span>{cat.emoji}</span>
            <span className="hidden sm:inline">{cat.label}</span>
            {count > 0 && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/30' : 'bg-white/60'}`}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
