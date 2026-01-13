'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Plus, Search } from 'lucide-react'

export default function CandidateDatabasePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const mockDatabase = [
    {
      id: '1',
      name: 'Ahmed Mohamed',
      nameAr: 'أحمد محمد',
      email: 'ahmed@example.com',
      specialization: 'Machine Learning',
      university: 'King Saud University',
      experience: 5,
    },
    {
      id: '2',
      name: 'Fatima Ali',
      nameAr: 'فاطمة علي',
      email: 'fatima@example.com',
      specialization: 'Data Science',
      university: 'Riyadh College',
      experience: 3,
    },
  ]

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowRight size={24} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">قاعدة بيانات المرشحين</h1>
          <p className="text-gray-600 mt-1">
            قاعدة بيانات متكاملة للمرشحين من الجامعات والمؤسسات
          </p>
        </div>
        <button
          onClick={() => router.push('/dashboard/candidates')}
          className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition flex items-center gap-2"
        >
          <Plus size={20} />
          إضافة مرشح
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ابحث عن مرشح..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Database Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الاسم
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                البريد الإلكتروني
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                التخصص
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الجامعة
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الخبرة
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockDatabase.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{candidate.name}</p>
                    <p className="text-sm text-gray-600">{candidate.nameAr}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {candidate.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {candidate.specialization}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {candidate.university}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {candidate.experience} سنة
                </td>
                <td className="px-6 py-4">
                  <button className="text-green-700 hover:text-green-800 font-medium text-sm">
                    إضافة
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">
          💡 يمكنك إضافة مرشحين من قاعدة البيانات مباشرة أو تحميل السيرة الذاتية
        </p>
      </div>
    </div>
  )
}
