import { createContext, useContext } from 'react'
import { useBabyBook } from '../hooks/useBabyBook'

const BabyBookContext = createContext(null)

export function BabyBookProvider({ children }) {
  const value = useBabyBook()
  return (
    <BabyBookContext.Provider value={value}>
      {children}
    </BabyBookContext.Provider>
  )
}

export function useBabyBookContext() {
  const ctx = useContext(BabyBookContext)
  if (!ctx) throw new Error('useBabyBookContext must be used within BabyBookProvider')
  return ctx
}
