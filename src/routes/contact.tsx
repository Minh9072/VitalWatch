import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, MessageSquare, Phone, Clock, Send, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const contactMethods = [
  {
    icon: Mail,
    label: 'Email Support',
    value: 'truongngocminhvt2004@gmail.com',
    desc: 'Response within 24 hours',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+84 356950639',
    desc: 'Mon–Fri, 9am – 6pm EST',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: MessageSquare,
    label: 'Live Chat',
    value: 'Chat with an Chatbox',
    desc: 'Available during business hours',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Clock,
    label: 'Emergency Line',
    value: '+84 389072899',
    desc: '24/7 for critical device issues',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
]

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a14] px-4 sm:px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Mail className="w-6 h-6 text-purple-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Support</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Get help from the VitalWatch team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Contact methods */}
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map(({ icon: Icon, label, value, desc, color, bg }) => (
              <div
                key={label}
                className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-start gap-3 hover-scale"
              >
                <div className={`${bg} p-2.5 rounded-xl flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover-scale">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="gradient-bg p-4 rounded-2xl mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                  Thanks for reaching out. Our support team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="mt-6 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-semibold text-gray-900 dark:text-white mb-5 text-sm">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Name"
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="abc@example.com"
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Subject</label>
                    <select
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    >
                      <option value="">Select a topic…</option>
                      <option>Device connectivity issue</option>
                      <option>Heart rate / SpO2 readings</option>
                      <option>Fall detection problem</option>
                      <option>Account & billing</option>
                      <option>Feature request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Describe your issue or question in detail…"
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full gradient-bg text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
