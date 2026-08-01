import { useState } from 'react'

function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="rounded-2rem border border-emerald-100 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Contact us</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">We would love to hear from you</h1>
      <p className="mt-3 text-slate-600">Tell us about your travel plans and we will help you build a memorable experience.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Your name" />
        <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email address" />
        <textarea className="md:col-span-2 min-h-32 rounded-2xl border border-slate-200 px-4 py-3" placeholder="Your Message" />
        <button className="md:col-span-2 rounded-full bg-emerald-700 px-4 py-3 font-semibold text-white">Send Message</button>
        {sent && <p className="md:col-span-2 text-sm font-semibold text-emerald-700">Thanks! Your request has been received.</p>}
      </form>
    </div>
  )
}

export default ContactPage
