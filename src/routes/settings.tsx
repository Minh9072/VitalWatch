import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTheme } from './__root'
import { Settings, Sun, Moon, Bell, Shield, Smartphone, User } from 'lucide-react'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={[
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
        checked ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  )
}

function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a14] px-4 sm:px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-6 h-6 text-purple-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Preferences & configuration</p>
          </div>
        </div>

        {/* Appearance */}
        <section className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4 hover-scale">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Appearance</h2>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10">
                {isDark ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-yellow-500" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isDark ? 'Deep dark theme active' : 'Light theme active'}
                </p>
              </div>
            </div>
            <Toggle checked={isDark} onChange={toggleTheme} />
          </div>

          {/* Theme preview */}
          <div className="mt-4 rounded-xl p-4 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a14]">
            <p className="text-xs text-gray-400 mb-2">Theme preview</p>
            <div className="flex gap-2">
              <div
                onClick={() => { if (isDark) toggleTheme() }}
                className={[
                  'flex-1 rounded-lg px-3 py-2 text-xs font-medium text-center cursor-pointer border-2 transition-all',
                  !isDark
                    ? 'border-purple-500 bg-white text-gray-800'
                    : 'border-gray-200 dark:border-gray-700 bg-white text-gray-600 opacity-50',
                ].join(' ')}
              >
                Light
              </div>
              <div
                onClick={() => { if (!isDark) toggleTheme() }}
                className={[
                  'flex-1 rounded-lg px-3 py-2 text-xs font-medium text-center cursor-pointer border-2 transition-all',
                  isDark
                    ? 'border-purple-500 bg-[#0f0f1e] text-white'
                    : 'border-gray-300 bg-gray-800 text-gray-300 opacity-50',
                ].join(' ')}
              >
                Dark
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4 hover-scale">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Notifications</h2>
          {[
            { label: 'Fall Detection Alerts', desc: 'Notify when a fall is detected', default: true },
            { label: 'Heart Rate Anomalies', desc: 'Alert on abnormal heart rate readings', default: true },
            { label: 'Low SpO2 Warnings', desc: 'Alert when blood oxygen drops below threshold', default: true },
            { label: 'Device Disconnected', desc: 'Notify when wearable loses connection', default: false },
          ].map(item => (
            <NotificationRow key={item.label} label={item.label} desc={item.desc} defaultEnabled={item.default} />
          ))}
        </section>

        {/* Device */}
        <section className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4 hover-scale">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Device</h2>
          <div className="flex items-center gap-3 py-2">
            <div className="p-2 rounded-xl bg-blue-500/10">
              <Smartphone className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">VitalBand Pro</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Connected · Firmware v2.4.1</p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full font-medium">Online</span>
          </div>
        </section>

        {/* Privacy */}
        <section className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover-scale">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Privacy & Security</h2>
          <div className="flex items-center gap-3 py-2">
            <div className="p-2 rounded-xl bg-green-500/10">
              <Shield className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Data Encryption</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">All health data is encrypted at rest and in transit</p>
            </div>
            <span className="ml-auto text-xs text-green-400">Active</span>
          </div>
          <div className="flex items-center gap-3 py-2">
            <div className="p-2 rounded-xl bg-purple-500/10">
              <User className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Emergency Contact</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Minh  —  +84 389072899</p>
            </div>
            <button className="ml-auto text-xs text-purple-400 hover:text-purple-300 transition-colors">Edit</button>
          </div>
        </section>
      </div>
    </div>
  )
}

function NotificationRow({ label, desc, defaultEnabled }: { label: string; desc: string; defaultEnabled: boolean }) {
  const [enabled, setEnabled] = useState(defaultEnabled)
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/5">
          <Bell className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
        </div>
      </div>
      <Toggle checked={enabled} onChange={() => setEnabled(v => !v)} />
    </div>
  )
}
