import { Link, NavLink, Outlet } from 'react-router-dom'

function Layout({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_30%),linear-gradient(135deg,_#f8fdf8_0%,_#eef8f2_100%) text-slate-800">
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link to="/" className="text-lg font-semibold text-emerald-700">EcoPakistan</Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
            <NavLink to="/destinations" className={({ isActive }) => (isActive ? 'text-emerald-700' : 'hover:text-emerald-700')}>Destinations</NavLink>
            <NavLink to="/trips" className={({ isActive }) => (isActive ? 'text-emerald-700' : 'hover:text-emerald-700')}>My Trips</NavLink>
            <NavLink to="/bookings" className={({ isActive }) => (isActive ? 'text-emerald-700' : 'hover:text-emerald-700')}>Bookings</NavLink>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'text-emerald-700' : 'hover:text-emerald-700')}>Admin</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-emerald-700' : 'hover:text-emerald-700')}>Contact</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/profile" className="text-sm font-semibold text-slate-700">{user.name}</Link>
                <button onClick={onLogout} className="rounded-full border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700">Logout</button>
              </>
            ) : (
              <Link to="/auth" className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Login / Register</Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
