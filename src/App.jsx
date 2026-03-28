import { HashRouter, Routes, Route } from 'react-router-dom'
import { BabyBookProvider, useBabyBookContext } from './store/BabyBookContext'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'
import AgeGroupPage from './pages/AgeGroupPage'
import ProfileSetup from './components/profile/ProfileSetup'

function AppRoutes() {
  const { profile, setProfile } = useBabyBookContext()

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/age/:ageKey" element={<AgeGroupPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* First-run setup */}
      <ProfileSetup
        isOpen={!profile}
        onSave={setProfile}
      />
    </div>
  )
}

export default function App() {
  return (
    <BabyBookProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </BabyBookProvider>
  )
}
