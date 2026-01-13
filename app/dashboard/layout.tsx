'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  Users,
  GitBranch,
  Calendar,
  FileText,
  Star,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  subItems?: NavItem[]
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'لوحة التحكم',
    icon: <LayoutDashboard size={20} />,
  },
  {
    href: '/dashboard/jobs',
    label: 'الوظائف',
    icon: <Briefcase size={20} />,
    subItems: [
      { href: '/dashboard/jobs', label: 'قائمة الوظائف', icon: null },
      { href: '/dashboard/jobs/create', label: 'إنشاء وظيفة جديدة', icon: null },
    ],
  },
  {
    href: '/dashboard/candidates',
    label: 'المرشحون',
    icon: <Users size={20} />,
    subItems: [
      { href: '/dashboard/candidates', label: 'قائمة المرشحين', icon: null },
      { href: '/dashboard/candidates/upload', label: 'تحميل السيرة الذاتية', icon: null },
      { href: '/dashboard/candidates/database', label: 'قاعدة البيانات', icon: null },
    ],
  },
  {
    href: '/dashboard/pipeline',
    label: 'خط الأنابيب',
    icon: <GitBranch size={20} />,
  },
  {
    href: '/dashboard/interviews',
    label: 'المقابلات',
    icon: <Calendar size={20} />,
    subItems: [
      { href: '/dashboard/interviews', label: 'جدول المقابلات', icon: null },
      { href: '/dashboard/interviews/session', label: 'جلسة مقابلة', icon: null },
    ],
  },
  {
    href: '/dashboard/evaluations',
    label: 'التقييمات',
    icon: <FileText size={20} />,
  },
  {
    href: '/dashboard/offers',
    label: 'العروض',
    icon: <Star size={20} />,
  },
  {
    href: '/dashboard/reports',
    label: 'التقارير',
    icon: <FileText size={20} />,
  },
  {
    href: '/dashboard/experts',
    label: 'الخبراء',
    icon: <Star size={20} />,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const router = useRouter()

  const toggleExpanded = (href: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(href)) {
      newExpanded.delete(href)
    } else {
      newExpanded.add(href)
    }
    setExpandedItems(newExpanded)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">🤖 الاستقطاب</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-800 p-2 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.href}>
              <button
                onClick={() => {
                  if (item.subItems) {
                    toggleExpanded(item.href)
                  } else {
                    router.push(item.href)
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition text-right"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {sidebarOpen && <span>{item.label}</span>}
                </div>
                {sidebarOpen && item.subItems && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      expandedItems.has(item.href) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Sub Items */}
              {sidebarOpen && item.subItems && expandedItems.has(item.href) && (
                <div className="pr-8 space-y-2">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm text-gray-300 hover:text-white"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <Settings size={20} />
            {sidebarOpen && <span>الإعدادات</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition text-left"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-600">مرحباً</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-bold">
              👤
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
