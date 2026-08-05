import { useState } from 'react'

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
    const body = {
      email: form.email,
      password: form.password,
      ...(isLogin ? {} : { name: form.name }),
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Unable to authenticate')
      }

      onLogin({ user: data.user, token: data.token })
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-2rem border border-emerald-100 bg-white p-8 shadow-sm lg:flex-row">
      <div className="flex-1 rounded-1.5rem bg-emerald-50 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Join EcoPakistan</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{isLogin ? 'Welcome back' : 'Create your travel account'}</h1>
        <p className="mt-3 text-slate-600">Plan trips, book experiences, and manage every journey with our trusted travel platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-4">
        {!isLogin && (
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Email address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-full bg-emerald-700 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Working…' : isLogin ? 'Login' : 'Register'}
        </button>
        <button type="button" onClick={() => setIsLogin((prev) => !prev)} className="w-full text-sm font-semibold text-emerald-700">
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  )
}

export default AuthPage
