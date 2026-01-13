'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Calendar, Clock, MapPin, Video, Phone, CheckCircle, XCircle } from 'lucide-react'

interface Interview {
  id: string
  candidateName: string
  candidateArabic?: string
  position: string
  type: 'PHONE_SCREEN' | 'TECHNICAL' | 'BEHAVIORAL' | 'FINAL' | 'HR'
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  scheduledAt: string
  duration: number
  isRemote: boolean
  location?: string
  aiSummary?: string
}

const mockInterviews: Interview[] = [
  {
    id: '1',
    candidateName: 'Ahmed Mohamed',
    candidateArabic: 'أحمد محمد',
    position: 'ML Engineer',
    type: 'PHONE_SCREEN',
    status: 'COMPLETED',
    scheduledAt: '2025-01-12 10:00 AM',
    duration: 30,
    isRemote: true,
    aiSummary: 'Excellent candidate with strong background in machine learning...',
  },
  {
    id: '2',
    candidateName: 'Fatima Ali',
    candidateArabic: 'فاطمة علي',
    position: 'Data Scientist',
    type: 'TECHNICAL',
    status: 'SCHEDULED',
    scheduledAt: '2025-01-15 2:00 PM',
    duration: 60,
    isRemote: true,
  },
  {
    id: '3',
    candidateName: 'Mohammed Hassan',
    candidateArabic: 'محمد حسن',
    position: 'AI Researcher',
    type: 'BEHAVIORAL',
    status: 'CONFIRMED',
    scheduledAt: '2025-01-16 3:30 PM',
    duration: 45,
    isRemote: false,
    location: 'مقر الشركة - الرياض',
  },
  {
    id: '4',
    candidateName: 'Layla Ibrahim',
    candidateArabic: 'ليلى إبراهيم',
    position: 'ML Engineer',
    type: 'FINAL',
    status: 'SCHEDULED',
    scheduledAt: '2025-01-18 11:00 AM',
    duration: 60,
    isRemote: true,
  },
  {
    id: '5',
    candidateName: 'Sara Ahmed',
    candidateArabic: 'سارة أحمد',
    position: 'NLP Specialist',
    type: 'HR',
    status: 'COMPLETED',
    scheduledAt: '2025-01-10 4:00 PM',
    duration: 30,
    isRemote: true,
    aiSummary: 'Great soft skills and team fit. Recommended for offer...',
  },
]

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  PHONE_SCREEN: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'فحص هاتفي' },
  TECHNICAL: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'مقابلة تقنية' },
  BEHAVIORAL: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    label: 'مقابلة سلوكية',
  },
  FINAL: { bg: 'bg-red-100', text: 'text-red-800', label: 'مقابلة نهائية' },
  HR: { bg: 'bg-green-100', text: 'text-green-800', label: 'مقابلة موارد بشرية' },
}

const statusConfig: Record<
  string,
  { icon: React.ReactNode; label: string; color: string }
> = {
  SCHEDULED: {
    icon: <Calendar size={16} />,
    label: 'مجدولة',
    color: 'text-gray-600',
  },
  CONFIRMED: {
    icon: <CheckCircle size={16} />,
    label: 'مؤكدة',
    color: 'text-green-600',
  },
  COMPLETED: {
    icon: <CheckCircle size={16} />,
    label: 'مكتملة',
    color: 'text-green-600',
  },
  CANCELLED: {
    icon: <XCircle size={16} />,
    label: 'ملغاة',
    color: 'text-red-600',
  },
}

export default function InterviewsPage() {
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filteredInterviews = mockInterviews.filter(
    (interview) =>
      statusFilter === 'ALL' || interview.status === statusFilter
  )

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">المقابلات</h1>
            <p className="text-gray-600">إدارة وجدولة المقابلات</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/interviews/schedule"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition flex items-center gap-2"
            >
              <Plus size={20} />
              جدول مقابلة جديدة
            </Link>
            <Link
              href="/dashboard/interviews/session"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition flex items-center gap-2"
            >
              <Video size={20} />
              جلسة مقابلة
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="ALL">جميع الحالات</option>
            <option value="SCHEDULED">مجدولة</option>
            <option value="CONFIRMED">مؤكدة</option>
            <option value="COMPLETED">مكتملة</option>
            <option value="CANCELLED">ملغاة</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">إجمالي المقابلات</p>
          <p className="text-2xl font-bold text-gray-900">{mockInterviews.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">المقابلات المجدولة</p>
          <p className="text-2xl font-bold text-orange-600">
            {mockInterviews.filter((i) => i.status === 'SCHEDULED').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">المكتملة</p>
          <p className="text-2xl font-bold text-green-600">
            {mockInterviews.filter((i) => i.status === 'COMPLETED').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">هذا الأسبوع</p>
          <p className="text-2xl font-bold text-blue-600">
            {mockInterviews.length}
          </p>
        </div>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        {filteredInterviews.map((interview) => {
          const typeColor = typeColors[interview.type]
          const statusInfo = statusConfig[interview.status]
          return (
            <div
              key={interview.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {interview.candidateName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {interview.candidateArabic} - {interview.position}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${typeColor.bg} ${typeColor.text}`}
                  >
                    {typeColor.label}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">{interview.scheduledAt}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">{interview.duration} دقيقة</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  {interview.isRemote ? (
                    <>
                      <Video size={16} />
                      <span className="text-sm">عن بُعد</span>
                    </>
                  ) : (
                    <>
                      <MapPin size={16} />
                      <span className="text-sm">{interview.location}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 ${statusInfo.color}`}>
                    {statusInfo.icon}
                    <span className="text-sm font-medium">{statusInfo.label}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  {interview.status === 'COMPLETED' && interview.aiSummary && (
                    <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                      عرض التقرير
                    </button>
                  )}
                  {interview.status === 'SCHEDULED' && (
                    <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-medium">
                      تأكيد
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                    تحرير
                  </button>
                </div>
              </div>

              {interview.aiSummary && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-700 font-semibold mb-2">
                    ملخص AI:
                  </p>
                  <p className="text-sm text-blue-700">{interview.aiSummary}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredInterviews.length === 0 && (
        <div className="p-12 text-center bg-white rounded-lg">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">لا توجد مقابلات تطابق معايير البحث</p>
          <Link
            href="/dashboard/interviews/schedule"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            جدول مقابلة جديدة
          </Link>
        </div>
      )}
    </div>
  )
}
