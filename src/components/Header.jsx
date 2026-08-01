const navItems = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Trip Planner', href: '#plans' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

function Header({ isAdmin, onToggleView }) {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
      <div>
        <p className="text-lg font-semibold text-emerald-700">EcoPakistan</p>
        <p className="text-sm text-slate-500">Travel with purpose</p>
      </div>

      <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} className="transition hover:text-emerald-700">
            {item.label}
          </a>
        ))}
      </nav>

      <button
        onClick={onToggleView}
        className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
      >
        {isAdmin ? 'Public View' : 'Admin Panel'}
      </button>
    </header>
  )
}

export default Header
