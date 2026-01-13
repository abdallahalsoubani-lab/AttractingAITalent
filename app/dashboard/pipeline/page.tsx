'use client'

import { useState } from 'react'
import { GripVertical, Plus, X } from 'lucide-react'

interface Application {
  id: string
  candidateName: string
  candidateArabic?: string
  position: string
  matchScore: number
  stage: ApplicationStage
}

type ApplicationStage =
  | 'NEW'
  | 'SCREENED'
  | 'SHORTLISTED'
  | 'TECH_INTERVIEW'
  | 'HR_INTERVIEW'
  | 'FINAL_INTERVIEW'
  | 'OFFER'
  | 'HIRED'
  | 'REJECTED'

const stages: {
  key: ApplicationStage
  label: string
  labelAr: string
  color: string
}[] = [
  { key: 'NEW', label: 'New', labelAr: 'جديد', color: 'bg-gray-100' },
  { key: 'SCREENED', label: 'Screened', labelAr: 'تم الفحص', color: 'bg-blue-100' },
  {
    key: 'SHORTLISTED',
    label: 'Shortlisted',
    labelAr: 'مختار',
    color: 'bg-purple-100',
  },
  {
    key: 'TECH_INTERVIEW',
    label: 'Tech Interview',
    labelAr: 'مقابلة تقنية',
    color: 'bg-yellow-100',
  },
  {
    key: 'HR_INTERVIEW',
    label: 'HR Interview',
    labelAr: 'مقابلة موارد بشرية',
    color: 'bg-orange-100',
  },
  {
    key: 'FINAL_INTERVIEW',
    label: 'Final Interview',
    labelAr: 'المقابلة النهائية',
    color: 'bg-red-100',
  },
  { key: 'OFFER', label: 'Offer', labelAr: 'عرض', color: 'bg-green-100' },
  { key: 'HIRED', label: 'Hired', labelAr: 'تم التوظيف', color: 'bg-emerald-100' },
  { key: 'REJECTED', label: 'Rejected', labelAr: 'مرفوض', color: 'bg-red-100' },
]

const mockApplications: Application[] = [
  {
    id: '1',
    candidateName: 'Ahmed Mohamed',
    candidateArabic: 'أحمد محمد',
    position: 'ML Engineer',
    matchScore: 95,
    stage: 'NEW',
  },
  {
    id: '2',
    candidateName: 'Fatima Ali',
    candidateArabic: 'فاطمة علي',
    position: 'Data Scientist',
    matchScore: 87,
    stage: 'SCREENED',
  },
  {
    id: '3',
    candidateName: 'Mohammed Hassan',
    candidateArabic: 'محمد حسن',
    position: 'AI Researcher',
    matchScore: 92,
    stage: 'SHORTLISTED',
  },
  {
    id: '4',
    candidateName: 'Layla Ibrahim',
    candidateArabic: 'ليلى إبراهيم',
    position: 'ML Engineer',
    matchScore: 78,
    stage: 'TECH_INTERVIEW',
  },
  {
    id: '5',
    candidateName: 'Sara Ahmed',
    candidateArabic: 'سارة أحمد',
    position: 'NLP Specialist',
    matchScore: 88,
    stage: 'HR_INTERVIEW',
  },
  {
    id: '6',
    candidateName: 'Ali Hassan',
    candidateArabic: 'علي حسن',
    position: 'Data Engineer',
    matchScore: 82,
    stage: 'FINAL_INTERVIEW',
  },
  {
    id: '7',
    candidateName: 'Noor Abdullah',
    candidateArabic: 'نور عبدالله',
    position: 'ML Engineer',
    matchScore: 91,
    stage: 'OFFER',
  },
  {
    id: '8',
    candidateName: 'Omar Khalil',
    candidateArabic: 'عمر خليل',
    position: 'AI Researcher',
    matchScore: 85,
    stage: 'HIRED',
  },
]

export default function PipelinePage() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [draggedItem, setDraggedItem] = useState<{
    id: string
    fromStage: ApplicationStage
  } | null>(null)

  const handleDragStart = (
    e: React.DragEvent,
    id: string,
    stage: ApplicationStage
  ) => {
    setDraggedItem({ id, fromStage: stage })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStage: ApplicationStage) => {
    e.preventDefault()
    if (!draggedItem) return

    setApplications((prev) =>
      prev.map((app) =>
        app.id === draggedItem.id ? { ...app, stage: newStage } : app
      )
    )
    setDraggedItem(null)
  }

  const getApplicationsByStage = (stage: ApplicationStage) => {
    return applications.filter((app) => app.stage === stage)
  }

  const stageConfig = stages.reduce(
    (acc, s) => {
      acc[s.key] = s
      return acc
    },
    {} as Record<ApplicationStage, (typeof stages)[0]>
  )

  return (
    <div className="p-8 h-full overflow-auto" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">خط الأنابيب</h1>
        <p className="text-gray-600">إدارة مراحل المرشحين باستخدام Kanban Board</p>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {stages.map((stageInfo) => {
          const stageApps = getApplicationsByStage(stageInfo.key)
          return (
            <div
              key={stageInfo.key}
              className="flex-shrink-0 w-80 flex flex-col"
            >
              {/* Stage Header */}
              <div
                className={`${stageInfo.color} rounded-t-lg px-4 py-3 border-b-2 border-gray-200`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {stageInfo.labelAr}
                  </h3>
                  <span className="bg-white px-2 py-1 rounded text-xs font-bold text-gray-900">
                    {stageApps.length}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{stageInfo.label}</p>
              </div>

              {/* Cards Container */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stageInfo.key)}
                className="flex-1 bg-gray-50 rounded-b-lg p-4 min-h-96 space-y-3 border-2 border-dashed border-gray-300 transition-colors hover:border-green-500"
              >
                {stageApps.map((app) => (
                  <div
                    key={app.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, app.id, stageInfo.key)}
                    className="bg-white rounded-lg p-4 shadow hover:shadow-md cursor-grab active:cursor-grabbing transition border-l-4 border-green-500"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <GripVertical
                        size={16}
                        className="text-gray-400 flex-shrink-0 mt-0.5"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {app.candidateName}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {app.candidateArabic}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3 pb-3 border-b border-gray-100">
                      <p className="text-xs text-gray-600">{app.position}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">مطابقة</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${app.matchScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-900 w-8">
                            {app.matchScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium">
                      عرض التفاصيل
                    </button>
                  </div>
                ))}

                {stageApps.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                    <Plus size={32} className="mb-2 opacity-50" />
                    <p className="text-sm">لا توجد مرشحين</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">إجمالي التطبيقات</p>
          <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">المقابلات المتبقية</p>
          <p className="text-2xl font-bold text-orange-600">
            {applications.filter((a) => a.stage.includes('INTERVIEW')).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">العروض المعلقة</p>
          <p className="text-2xl font-bold text-green-600">
            {applications.filter((a) => a.stage === 'OFFER').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">المعينين</p>
          <p className="text-2xl font-bold text-blue-600">
            {applications.filter((a) => a.stage === 'HIRED').length}
          </p>
        </div>
      </div>
    </div>
  )
}
