import { createFileRoute, Link } from '@tanstack/react-router'
import { Activity, Heart, Shield, Wifi, ChevronRight, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const features = [
  {
    icon: Heart,
    title: 'Heart Rate Monitoring',
    description: 'Continuous real-time pulse tracking with dynamic chart visualizations and instant anomaly alerts.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    icon: Activity,
    title: 'SpO2 Blood Oxygen',
    description: 'Wave-form blood oxygen saturation charts keeping you informed of your respiratory health.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Shield,
    title: 'Fall Detection',
    description: 'AI-powered fall detection with real-time alerts and chronological incident history logging.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Wifi,
    title: 'Device Connectivity',
    description: 'Seamless wearable sensor integration with live connection status and automatic reconnection.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
]

const highlights = [
  'Real-time health metrics with Chart.js visualizations',
  'Dark & Light theme with persistent user preferences',
  'Responsive layout — works on desktop and mobile',
  'Color-coded alerts: green for safe, red for critical',
  'Historical reports and fall incident logs',
]

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a14]">
      {/* Hero */}
      <section className="px-6 py-16 lg:py-24 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
          Live Health Monitoring Platform
        </div>

        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Monitor Your Health{' '}
          <span className="gradient-text">in Real Time</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          VitalWatch connects to your wearable devices to deliver continuous health insights — heart rate, blood oxygen, fall detection, and more — all in a beautiful, intuitive dashboard.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 gradient-bg text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:opacity-90 transition-opacity"
          >
            Open Dashboard
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            to="/reports"
            className="inline-flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
          >
            View Reports
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-purple-500/40 transition-colors hover-scale"
            >
              <div className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover-scale">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Platform Highlights</h2>
          <ul className="space-y-3">
            {highlights.map(h => (
              <li key={h} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
