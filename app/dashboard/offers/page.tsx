'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Mail, DollarSign, Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Offer {
  id: string
  candidateName: string
  candidateArabic?: string
  position: string
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
  baseSalary: number
  currency: string
  benefits: string[]
  startDate: string
  expiryDate: string
  createdAt: string
  sentAt?: string
  respondedAt?: string
}

const mockOffers: Offer[] = [
  {
    id: '1',
    candidateName: 'Ahmed Mohamed',
    candidateArabic: 'أحمد محمد',
    position: 'ML Engineer',
    status: 'ACCEPTED',
    baseSalary: 250000,
    currency: 'SAR',
    benefits: ['تأمين صحي', 'إجازة سنوية 25 يوم', 'مكافأة نهاية الخدمة'],
    startDate: '2025-02-15',
    expiryDate: '2025-02-05',
    createdAt: '2025-01-12',
    sentAt: '2025-01-13',
    respondedAt: '2025-01-16',
  },
  {
    id: '2',
    candidateName: 'Fatima Ali',
    candidateArabic: 'فاطمة علي',
    position: 'Data Scientist',
    status: 'SENT',
    baseSalary: 200000,
    currency: 'SAR',
    benefits: ['تأمين صحي', 'إجازة سنوية 20 يوم', 'تدريب مستمر'],
    startDate: '2025-03-01',
    expiryDate: '2025-01-25',
    createdAt: '2025-01-14',
    sentAt: '2025-01-15',
  },
  {
    id: '3',
    candidateName: 'Mohammed Hassan',
    candidateArabic: 'محمد حسن',
    position: 'AI Researcher',
    status: 'DRAFT',
    baseSalary: 280000,
    currency: 'SAR',
    benefits: ['تأمين صحي شامل', 'إجازة سنوية 30 يوم', 'مكافأة أداء'],
    startDate: '2025-02-20',
    expiryDate: '2025-02-10',
    createdAt: '2025-01-17',
  },
  {
    id: '4',
    candidateName: 'Layla Ibrahim',
    candidateArabic: 'ليلى إبراهيم',
    position: 'ML Engineer',
    status: 'REJECTED',
    baseSalary: 220000,
    currency: 'SAR',
    benefits: ['تأمين صحي', 'إجازة سنوية 20 يوم'],
    startDate: '2025-03-01',
    expiryDate: '2025-01-20',
    createdAt: '2025-01-10',
    sentAt: '2025-01-11',
    respondedAt: '2025-01-18',
  },
]

const statusConfig: Record<
  string,
  { icon: React.ReactNode; label: string; color: string; bgColor: string }
> = {
  DRAFT: {
    icon: <Clock size={16} />,
    label: 'مسودة',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
  SENT: {
    icon: <Mail size={16} />,
    label: 'مرسلة',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  ACCEPTED: {
    icon: <CheckCircle size={16} />,
    label: 'مقبولة',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  REJECTED: {
    icon: <XCircle size={16} />,
    label: 'مرفوضة',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  EXPIRED: {
    icon: <XCircle size={16} />,
    label: 'منتهية الصلاحية',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
}

export default function OffersPage() {
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filteredOffers = mockOffers.filter(
    (offer) => statusFilter === 'ALL' || offer.status === statusFilter
  )

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">العروض</h1>
            <p className="text-gray-600">إدارة عروض التوظيف</p>
          </div>
          <Link
            href="/dashboard/offers/create"
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition flex items-center gap-2"
          >
            <Plus size={20} />
            عرض جديد
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="ALL">جميع الحالات</option>
            <option value="DRAFT">مسودة</option>
            <option value="SENT">مرسلة</option>
            <option value="ACCEPTED">مقبولة</option>
            <option value="REJECTED">مرفوضة</option>
            <option value="EXPIRED">منتهية الصلاحية</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">إجمالي العروض</p>
          <p className="text-2xl font-bold text-gray-900">{mockOffers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">مسودات</p>
          <p className="text-2xl font-bold text-gray-600">
            {mockOffers.filter((o) => o.status === 'DRAFT').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">مرسلة</p>
          <p className="text-2xl font-bold text-blue-600">
            {mockOffers.filter((o) => o.status === 'SENT').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">مقبولة</p>
          <p className="text-2xl font-bold text-green-600">
            {mockOffers.filter((o) => o.status === 'ACCEPTED').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">معدل القبول</p>
          <p className="text-2xl font-bold text-purple-600">
            {mockOffers.length > 0
              ? (
                  (mockOffers.filter((o) => o.status === 'ACCEPTED').length /
                    mockOffers.length) *
                  100
                ).toFixed(0)
              : 0}
            %
          </p>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {filteredOffers.map((offer) => {
          const statusInfo = statusConfig[offer.status]
          return (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {offer.candidateName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {offer.candidateArabic} - {offer.position}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
                >
                  {statusInfo.icon}
                  {statusInfo.label}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign size={16} />
                  <div>
                    <p className="text-xs text-gray-500">الراتب الأساسي</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {offer.baseSalary.toLocaleString()} {offer.currency}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={16} />
                  <div>
                    <p className="text-xs text-gray-500">تاريخ البدء</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {offer.startDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <div>
                    <p className="text-xs text-gray-500">تاريخ انتهاء الصلاحية</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {offer.expiryDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              {offer.benefits.length > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 mb-2">المزايا</p>
                  <div className="flex flex-wrap gap-2">
                    {offer.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  {offer.createdAt && `تم الإنشاء: ${offer.createdAt}`}
                </p>
                <div className="flex gap-2">
                  {offer.status === 'DRAFT' && (
                    <>
                      <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-medium">
                        إرسال
                      </button>
                      <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                        تعديل
                      </button>
                    </>
                  )}
                  {offer.status === 'SENT' && (
                    <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                      إعادة إرسال
                    </button>
                  )}
                  {(offer.status === 'ACCEPTED' ||
                    offer.status === 'REJECTED') && (
                    <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                      عرض
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredOffers.length === 0 && (
        <div className="p-12 text-center bg-white rounded-lg">
          <Mail size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">لا توجد عروض تطابق معايير البحث</p>
          <Link
            href="/dashboard/offers/create"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            إنشاء عرض جديد
          </Link>
        </div>
      )}
    </div>
  )
}
