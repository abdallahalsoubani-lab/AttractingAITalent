'use client'

import { useState } from 'react'
import { Save, Lock, Bell, Database, Zap, HelpCircle } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'شركة الاستقطاب للتقنية',
    companyNameEn: 'Tech Recruitment Co.',
    email: 'admin@example.com',
    phone: '+966501234567',
    emailNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    monthlyReports: true,
    openaiApiKey: '',
    semanticScholarApi: true,
    orcidApi: true,
    language: 'ar',
    theme: 'light',
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">الإعدادات</h1>
        <p className="text-gray-600">إدارة إعدادات النظام والتفضيلات</p>
      </div>

      {/* Notification */}
      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          ✓ تم حفظ الإعدادات بنجاح
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Company Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <HelpCircle size={24} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              معلومات الشركة
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الشركة (عربي)
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) =>
                  setSettings({ ...settings, companyName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الشركة (English)
              </label>
              <input
                type="text"
                value={settings.companyNameEn}
                onChange={(e) =>
                  setSettings({ ...settings, companyNameEn: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bell size={24} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">الإشعارات</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                إشعارات البريد الإلكتروني
              </label>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailNotifications: e.target.checked,
                  })
                }
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                إشعارات الرسائل القصيرة
              </label>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smsNotifications: e.target.checked,
                  })
                }
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                التقارير الأسبوعية
              </label>
              <input
                type="checkbox"
                checked={settings.weeklyReports}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    weeklyReports: e.target.checked,
                  })
                }
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                التقارير الشهرية
              </label>
              <input
                type="checkbox"
                checked={settings.monthlyReports}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    monthlyReports: e.target.checked,
                  })
                }
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>

        {/* API & Integrations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap size={24} className="text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              التكاملات والـ APIs
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                placeholder="sk-proj-..."
                value={settings.openaiApiKey}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    openaiApiKey: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-600 mt-1">
                مفتاح API من OpenAI لاستخدام GPT-4o والنماذج الأخرى
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Semantic Scholar API
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  للبحث عن الأوراق البحثية والخبراء
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.semanticScholarApi}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    semanticScholarApi: e.target.checked,
                  })
                }
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  ORCID API
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  للوصول إلى معلومات الباحثين والعلماء
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.orcidApi}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    orcidApi: e.target.checked,
                  })
                }
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Lock size={24} className="text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">التفضيلات</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اللغة
              </label>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({ ...settings, language: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المظهر
              </label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  setSettings({ ...settings, theme: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="light">فاتح</option>
                <option value="dark">مظلم</option>
                <option value="auto">تلقائي</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-red-200">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Database size={24} className="text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-red-900">منطقة الخطر</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium">
              مسح جميع البيانات
            </button>
            <button className="w-full px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium">
              إعادة تعيين كلمة المرور
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition flex items-center justify-center gap-2"
          >
            <Save size={20} />
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  )
}
