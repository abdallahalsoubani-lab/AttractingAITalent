'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, Users, Briefcase, Download, Filter } from 'lucide-react'

interface Report {
  id: string
  title: string
  titleAr: string
  type: string
  period: string
  createdAt: string
  metrics: {
    totalApplications: number
    totalInterviews: number
    offersGiven: number
    offersAccepted: number
    hireRate: number
  }
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Recruitment Report',
    titleAr: 'تقرير الاستقطاب الشهري',
    type: 'MONTHLY_RECRUITMENT',
    period: 'January 2025',
    createdAt: '2025-01-01',
    metrics: {
      totalApplications: 234,
      totalInterviews: 45,
      offersGiven: 12,
      offersAccepted: 10,
      hireRate: 83,
    },
  },
  {
    id: '2',
    title: 'KPI Dashboard Report',
    titleAr: 'تقرير لوحة معدلات الأداء الرئيسية',
    type: 'KPI_DASHBOARD',
    period: 'Q4 2024',
    createdAt: '2024-12-31',
    metrics: {
      totalApplications: 891,
      totalInterviews: 156,
      offersGiven: 48,
      offersAccepted: 42,
      hireRate: 87,
    },
  },
  {
    id: '3',
    title: 'AI Experts Discovery Report',
    titleAr: 'تقرير اكتشاف خبراء الذكاء الاصطناعي',
    type: 'MONTHLY_EXPERTS',
    period: 'January 2025',
    createdAt: '2025-01-15',
    metrics: {
      totalApplications: 52,
      totalInterviews: 18,
      offersGiven: 4,
      offersAccepted: 3,
      hireRate: 75,
    },
  },
]

const reportTypeLabels: Record<string, string> = {
  MONTHLY_RECRUITMENT: 'تقرير الاستقطاب الشهري',
  MONTHLY_EXPERTS: 'تقرير الخبراء الشهري',
  KPI_DASHBOARD: 'لوحة معدلات الأداء',
  LESSONS_LEARNED: 'الدروس المستفادة',
  CUSTOM: 'تقرير مخصص',
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(
    mockReports[0]
  )
  const [reportType, setReportType] = useState('ALL')

  const filteredReports = mockReports.filter(
    (report) => reportType === 'ALL' || report.type === reportType
  )

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">التقارير</h1>
        <p className="text-gray-600">تقارير ولوحات معلومات شاملة</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="ALL">جميع التقارير</option>
            <option value="MONTHLY_RECRUITMENT">تقرير الاستقطاب الشهري</option>
            <option value="MONTHLY_EXPERTS">تقرير الخبراء الشهري</option>
            <option value="KPI_DASHBOARD">لوحة معدلات الأداء</option>
            <option value="LESSONS_LEARNED">الدروس المستفادة</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-4">
          {filteredReports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`w-full text-right p-4 rounded-lg border-2 transition ${
                selectedReport?.id === report.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.titleAr}</h3>
                  <p className="text-xs text-gray-600 mt-1">{report.period}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                {reportTypeLabels[report.type]}
              </p>
              <p className="text-xs text-gray-500">{report.createdAt}</p>
            </button>
          ))}
        </div>

        {/* Detail View */}
        {selectedReport && (
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedReport.titleAr}
                  </h2>
                  <p className="text-gray-600 mt-1">{selectedReport.period}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Download size={20} className="text-gray-600" />
                </button>
              </div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {reportTypeLabels[selectedReport.type]}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">إجمالي التقديمات</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {selectedReport.metrics.totalApplications}
                    </p>
                  </div>
                  <Briefcase size={32} className="text-blue-500 opacity-20" />
                </div>
                <p className="text-xs text-gray-600">
                  المرشحين الذين تقدموا هذا الشهر
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">إجمالي المقابلات</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {selectedReport.metrics.totalInterviews}
                    </p>
                  </div>
                  <Users size={32} className="text-purple-500 opacity-20" />
                </div>
                <p className="text-xs text-gray-600">
                  المقابلات التي تم إجراؤها
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">العروض المعطاة</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {selectedReport.metrics.offersGiven}
                    </p>
                  </div>
                  <BarChart3 size={32} className="text-green-500 opacity-20" />
                </div>
                <p className="text-xs text-gray-600">عروض التوظيف المقدمة</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">معدل التوظيف</p>
                    <p className="text-3xl font-bold text-green-600">
                      {selectedReport.metrics.hireRate}%
                    </p>
                  </div>
                  <TrendingUp size={32} className="text-orange-500 opacity-20" />
                </div>
                <p className="text-xs text-gray-600">
                  نسبة قبول العروض المقدمة
                </p>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                نظرة عامة
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-600">
                  سيتم إضافة الرسوم البيانية قريباً (استخدام Recharts)
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition flex items-center justify-center gap-2">
                <Download size={20} />
                تنزيل PDF
              </button>
              <button className="flex-1 px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition flex items-center justify-center gap-2">
                <BarChart3 size={20} />
                عرض مفصل
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
