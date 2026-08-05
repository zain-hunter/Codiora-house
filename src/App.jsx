import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetailsPage from './pages/DestinationDetailsPage'
import DashboardPage from './pages/DashboardPage'
import FavoritesPage from './pages/FavoritesPage'
import TripsPage from './pages/TripsPage'
import BookingsPage from './pages/BookingsPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import { useAuthContext } from './context/AuthContext.jsx'

function App() {
  const { user, token, login, logout } = useAuthContext()

  const handleLogin = (userData) => {
    login(userData)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <Routes>
      <Route element={<Layout user={user} onLogout={handleLogout} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={user ? <Navigate to="/profile" replace /> : <AuthPage onLogin={handleLogin} />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:id" element={<DestinationDetailsPage />} />
        <Route path="/dashboard" element={user ? <DashboardPage user={user} token={token} /> : <Navigate to="/auth" replace />} />
        <Route path="/favorites" element={user ? <FavoritesPage token={token} /> : <Navigate to="/auth" replace />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/auth" replace />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
