import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEY_PROFILE, STORAGE_KEY_ENTRIES } from '../utils/storageUtils'
import { CATEGORIES } from '../constants/categories'

function makeEmptyAgeData() {
  return Object.fromEntries(CATEGORIES.map(c => [c.key, []]))
}

function genId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function useBabyBook() {
  const [profile, setProfile] = useLocalStorage(STORAGE_KEY_PROFILE, null)
  const [entries, setEntries] = useLocalStorage(STORAGE_KEY_ENTRIES, {})

  // ------ entries read ------
  const getEntries = useCallback((ageKey, categoryKey) => {
    return entries[ageKey]?.[categoryKey] ?? []
  }, [entries])

  const getEntryCounts = useCallback((ageKey) => {
    const ageData = entries[ageKey] ?? makeEmptyAgeData()
    return Object.fromEntries(CATEGORIES.map(c => [c.key, (ageData[c.key] ?? []).length]))
  }, [entries])

  const getTotalCount = useCallback(() => {
    let n = 0
    for (const ageData of Object.values(entries)) {
      for (const list of Object.values(ageData)) {
        n += list.length
      }
    }
    return n
  }, [entries])

  const getAgesWithEntries = useCallback(() => {
    return Object.keys(entries).filter(k =>
      Object.values(entries[k] ?? {}).some(arr => arr.length > 0)
    )
  }, [entries])

  // ------ entries write ------
  const addEntry = useCallback((ageKey, categoryKey, data) => {
    const newEntry = {
      id: genId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setEntries(prev => {
      const ageData = prev[ageKey] ?? makeEmptyAgeData()
      return {
        ...prev,
        [ageKey]: {
          ...ageData,
          [categoryKey]: [newEntry, ...(ageData[categoryKey] ?? [])],
        },
      }
    })
    return newEntry
  }, [setEntries])

  const updateEntry = useCallback((ageKey, categoryKey, id, patch) => {
    setEntries(prev => {
      const ageData = prev[ageKey] ?? makeEmptyAgeData()
      const list = ageData[categoryKey] ?? []
      return {
        ...prev,
        [ageKey]: {
          ...ageData,
          [categoryKey]: list.map(e =>
            e.id === id ? { ...e, ...patch, updatedAt: new Date().toISOString() } : e
          ),
        },
      }
    })
  }, [setEntries])

  const deleteEntry = useCallback((ageKey, categoryKey, id) => {
    setEntries(prev => {
      const ageData = prev[ageKey] ?? makeEmptyAgeData()
      return {
        ...prev,
        [ageKey]: {
          ...ageData,
          [categoryKey]: (ageData[categoryKey] ?? []).filter(e => e.id !== id),
        },
      }
    })
  }, [setEntries])

  return {
    profile, setProfile,
    entries,
    getEntries, getEntryCounts, getTotalCount, getAgesWithEntries,
    addEntry, updateEntry, deleteEntry,
  }
}
