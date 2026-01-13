'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react'

interface Job {
  id: string
  title: string
  titleAr: string
  department?: string
  openings: number
  applicationsCount?: number
  status: 'OPEN' | 'ON_HOLD' | 'CLOSED' | 'DRAFT' | 'FILLED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  deadline?: string
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Machine Learning Engineer',
    titleAr: 'مهندس تعلم آلي',
    department: 'AI',
    openings: 3,
    applicationsCount: 45,
    status: 'OPEN',
    priority: 'HIGH',
    deadline: '2025-02-28',
  },
  {
    id: '2',
    title: 'Data Scientist',
    titleAr: 'عالم بيانات',
    department: 'Analytics',
    openings: 2,
    applicationsCount: 32,
    status: 'OPEN',
    priority: 'MEDIUM',
    deadline: '2025-02-28',
  },
  {
    id: '3',
    title: 'AI Researcher',
    titleAr: 'باحث ذكاء اصطناعي',
    department: 'Research',
    openings: 1,
    applicationsCount: 18,
    status: 'ON_HOLD',
    priority: 'HIGH',
    deadline: '2025-03-15',
  },
  {
    id: '4',
    title: 'NLP Specialist',
    titleAr: 'متخصص معالجة اللغات الطبيعية',
    department: 'AI',
    openings: 2,
    applicationsCount: 28,
    status: 'DRAFT',
    priority: 'MEDIUM',
    deadline: '2025-03-01',
  },
]

const statusColors = {
  OPEN: 'bg-green-100 text-green-800',
  ON_HOLD: 'bg-yellow-100 text-yellow-800',
  CLOSED: 'bg-red-100 text-red-800',
  DRAFT: 'bg-gray-100 text-gray-800',
  FILLED: 'bg-blue-100 text-blue-800',
}

const priorityColors = {
  LOW: 'text-gray-600',
  MEDIUM: 'text-blue-600',
  HIGH: 'text-orange-600',
  URGENT: 'text-red-600',
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.titleAr.includes(searchTerm)
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">الوظائف</h1>
            <p className="text-gray-600">إدارة الوظائف المفتوحة والمغلقة</p>
          </div>
          <Link
            href="/dashboard/jobs/create"
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition flex items-center gap-2"
          >
            <Plus size={20} />
            وظيفة جديدة
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ابحث عن وظيفة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="ALL">جميع الحالات</option>
            <option value="DRAFT">مسودة</option>
            <option value="OPEN">مفتوحة</option>
            <option value="ON_HOLD">معلقة</option>
            <option value="CLOSED">مغلقة</option>
            <option value="FILLED">ممتلئة</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">إجمالي الوظائف</p>
          <p className="text-2xl font-bold text-gray-900">{mockJobs.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">الوظائف المفتوحة</p>
          <p className="text-2xl font-bold text-green-600">
            {mockJobs.filter((j) => j.status === 'OPEN').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">المناصب المتاحة</p>
          <p className="text-2xl font-bold text-blue-600">
            {mockJobs.reduce((sum, job) => sum + job.openings, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">إجمالي التقديمات</p>
          <p className="text-2xl font-bold text-orange-600">
            {mockJobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0)}
          </p>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الوظيفة
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                القسم
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                المناصب
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                التقديمات
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الأولوية
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الحالة
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-600">{job.titleAr}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {job.department}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-medium text-sm">
                    {job.openings}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {job.applicationsCount || 0}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-medium ${priorityColors[job.priority]}`}
                  >
                    {job.priority === 'LOW' && 'منخفضة'}
                    {job.priority === 'MEDIUM' && 'متوسطة'}
                    {job.priority === 'HIGH' && 'عالية'}
                    {job.priority === 'URGENT' && 'عاجلة'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[job.status]
                    }`}
                  >
                    {job.status === 'DRAFT' && 'مسودة'}
                    {job.status === 'OPEN' && 'مفتوحة'}
                    {job.status === 'ON_HOLD' && 'معلقة'}
                    {job.status === 'CLOSED' && 'مغلقة'}
                    {job.status === 'FILLED' && 'ممتلئة'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Eye size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Edit size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredJobs.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-600">لا توجد وظائف تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  )
}
