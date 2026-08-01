function ProfilePage({ user }) {
  return (
    <div className="rounded-2rem border border-emerald-100 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">User profile</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back, {user?.name || 'Traveler'}</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.25rem] border border-slate-200 p-5">
          <p className="text-sm font-semibold text-slate-500">Email</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{user?.email || 'explorer@example.com'}</p>
        </div>
        <div className="rounded-[1.25rem] border border-slate-200 p-5">
          <p className="text-sm font-semibold text-slate-500">Role</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{user?.role || 'Explorer'}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
