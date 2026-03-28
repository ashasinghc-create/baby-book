export const STORAGE_KEY_PROFILE = 'babyBook_profile'
export const STORAGE_KEY_ENTRIES = 'babyBook_entries'

export function estimateStorageUsed() {
  let total = 0
  for (const key of Object.keys(localStorage)) {
    total += (localStorage.getItem(key) || '').length * 2 // UTF-16
  }
  return total
}

export const STORAGE_WARN_BYTES  = 4.0 * 1024 * 1024
export const STORAGE_LIMIT_BYTES = 4.8 * 1024 * 1024

export function storageAvailableForImage(imageBase64) {
  const needed = imageBase64.length * 2
  const used = estimateStorageUsed()
  return used + needed < STORAGE_LIMIT_BYTES
}
