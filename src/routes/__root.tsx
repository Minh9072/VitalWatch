import { HeadContent, Outlet, Scripts, createRootRoute, Link, useRouterState } from '@tanstack/react-router'
import { createContext, useContext, useState, useEffect } from 'react'
import {
  LayoutDashboard,
  FileBarChart2,
  Settings,
  Mail,
  Home,
  Menu,
  X,
  Activity,
} from 'lucide-react'
import '../styles.css'

// ─── Theme Context ───────────────────────────────────────────────────────────

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

// ─── Route ───────────────────────────────────────────────────────────────────

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'VitalWatch – Health Monitoring' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

// ─── Shell ────────────────────────────────────────────────────────────────────

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

// ─── Sidebar nav items ────────────────────────────────────────────────────────

const navItems = [
  { to: '/' as const, label: 'Home', icon: Home },
  { to: '/dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/reports' as const, label: 'Reports', icon: FileBarChart2 },
  { to: '/settings' as const, label: 'Settings', icon: Settings },
  { to: '/contact' as const, label: 'Contact', icon: Mail },
]

// ─── Root Layout ──────────────────────────────────────────────────────────────

function RootLayout() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  useEffect(() => {
    const stored = localStorage.getItem('vitalwatch-theme') as Theme | null
    if (stored) setTheme(stored)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('vitalwatch-theme', next)
      return next
    })
  }

  const isDark = theme === 'dark'

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={isDark ? 'dark' : ''}>
        <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a14] transition-colors duration-300">

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={[
              'fixed top-0 left-0 h-full z-30 w-64 flex flex-col',
              'bg-white dark:bg-[#0f0f1e] border-r border-gray-200 dark:border-gray-800',
              'transition-transform duration-300',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full',
              'lg:translate-x-0 lg:fixed lg:flex',
            ].join(' ')}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="gradient-bg p-2 rounded-xl">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                VitalWatch
              </span>
              <button
                className="ml-auto lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => {
                const isActive = to === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(to)
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setSidebarOpen(false)}
                    className={[
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      isActive
                        ? 'gradient-bg text-white shadow-lg shadow-purple-500/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white',
                    ].join(' ')}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* System status */}
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">System Online</span>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
            {/* Mobile top bar */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#0f0f1e] border-b border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <div className="gradient-bg p-1.5 rounded-lg">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">VitalWatch</span>
              </div>
            </header>

            <main className="flex-1 overflow-auto pt-16 lg:pt-0">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}
