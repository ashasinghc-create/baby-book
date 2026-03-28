export const AGE_GROUPS = [
  // Months 0-11
  ...Array.from({ length: 12 }, (_, i) => ({
    key: `month-${i}`,
    label: i === 0 ? 'Newborn' : `${i} Month${i !== 1 ? 's' : ''}`,
    shortLabel: i === 0 ? 'NB' : `${i}m`,
    section: 'First Year',
    type: 'month',
    value: i,
    emoji: ['👶','🍼','😊','🌱','🎵','🤲','🧸','🌟','🐣','🌈','🎀','❄️'][i],
  })),
  // Years 1-18
  ...Array.from({ length: 18 }, (_, i) => ({
    key: `year-${i + 1}`,
    label: `${i + 1} Year${i > 0 ? 's' : ''}`,
    shortLabel: `${i + 1}yr`,
    section: i < 5 ? 'Toddler Years' : i < 12 ? 'Childhood' : 'Teen Years',
    type: 'year',
    value: i + 1,
    emoji: ['🎂','🚶','🎨','🏃','🎒','🧩','📚','⚽','🎮','🎸','🎓','💡','🌍','🚀','🎯','🏆','🎉','🌠'][i],
  })),
]

export function getAgeGroup(key) {
  return AGE_GROUPS.find(g => g.key === key)
}

export function getAdjacentAgeGroups(key) {
  const idx = AGE_GROUPS.findIndex(g => g.key === key)
  return {
    prev: idx > 0 ? AGE_GROUPS[idx - 1] : null,
    next: idx < AGE_GROUPS.length - 1 ? AGE_GROUPS[idx + 1] : null,
  }
}

export function getCurrentAgeKey(birthDateStr) {
  if (!birthDateStr) return null
  const birth = new Date(birthDateStr)
  const now = new Date()
  const diffMs = now - birth
  if (diffMs < 0) return null

  const totalMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44))
  if (totalMonths < 12) {
    const m = Math.min(totalMonths, 11)
    return `month-${m}`
  }
  const years = Math.floor(totalMonths / 12)
  if (years >= 18) return 'year-18'
  return `year-${years}`
}
