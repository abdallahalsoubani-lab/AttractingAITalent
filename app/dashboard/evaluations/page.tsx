'use client'

import { useState } from 'react'
import { Star, Download, Plus } from 'lucide-react'

interface Evaluation {
  id: string
  candidateName: string
  candidateArabic?: string
  position: string
  evaluationType: string
  overallScore: number
  technicalScore?: number
  communicationScore?: number
  cultureFitScore?: number
  strengths: string[]
  weaknesses: string[]
  recommendation: string
  evaluatedAt: string
  evaluator: string
}

const mockEvaluations: Evaluation[] = [
  {
    id: '1',
    candidateName: 'Ahmed Mohamed',
    candidateArabic: 'أحمد محمد',
    position: 'ML Engineer',
    evaluationType: 'Technical Interview',
    overallScore: 92,
    technicalScore: 95,
    communicationScore: 88,
    cultureFitScore: 90,
    strengths: ['خبرة عملية قوية', 'حل مشاكل ممتاز', 'تواصل فعال'],
    weaknesses: ['خبرة محدودة في البحث الأكاديمي'],
    recommendation: 'يوصى بقوة بتقديم عرض',
    evaluatedAt: '2025-01-12',
    evaluator: 'علي أحمد',
  },
  {
    id: '2',
    candidateName: 'Fatima Ali',
    candidateArabic: 'فاطمة علي',
    position: 'Data Scientist',
    evaluationType: 'Behavioral Interview',
    overallScore: 78,
    technicalScore: 82,
    communicationScore: 75,
    cultureFitScore: 76,
    strengths: ['مهارات تحليلية', 'عمل جماعي جيد'],
    weaknesses: ['قلة الخبرة في المشاريع الكبيرة', 'سرعة قليلة في التعلم'],
    recommendation: 'يمكن المتابعة مع المزيد من التدريب',
    evaluatedAt: '2025-01-11',
    evaluator: 'فاطمة خالد',
  },
  {
    id: '3',
    candidateName: 'Mohammed Hassan',
    candidateArabic: 'محمد حسن',
    position: 'AI Researcher',
    evaluationType: 'Technical Interview',
    overallScore: 95,
    technicalScore: 98,
    communicationScore: 92,
    cultureFitScore: 93,
    strengths: ['معرفة عميقة بـ AI', 'بحث متقدم', 'قدرة قيادية'],
    weaknesses: [],
    recommendation: 'مرشح استثنائي - تقديم عرض فوري',
    evaluatedAt: '2025-01-10',
    evaluator: 'محمود سالم',
  },
]

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const percentage = (score / max) * 100
  let color = 'bg-green-500'
  if (percentage < 60) color = 'bg-red-500'
  else if (percentage < 80) color = 'bg-yellow-500'
  else if (percentage < 90) color = 'bg-blue-500'

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
      <span className="font-bold text-gray-900 w-10">{score}</span>
    </div>
  )
}

export default function EvaluationsPage() {
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(
    null
  )

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">التقييمات</h1>
            <p className="text-gray-600">تقييمات المرشحين والتوصيات</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">إجمالي التقييمات</p>
          <p className="text-2xl font-bold text-gray-900">
            {mockEvaluations.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">متوسط الدرجة</p>
          <p className="text-2xl font-bold text-blue-600">
            {(
              mockEvaluations.reduce((sum, e) => sum + e.overallScore, 0) /
              mockEvaluations.length
            ).toFixed(1)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">موصى به</p>
          <p className="text-2xl font-bold text-green-600">
            {mockEvaluations.filter((e) =>
              e.recommendation.includes('يوصى')
            ).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">متوسط التقييم العالي</p>
          <p className="text-2xl font-bold text-purple-600">
            {mockEvaluations.filter((e) => e.overallScore >= 85).length}
          </p>
        </div>
      </div>

      {/* Evaluations Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-4">
          {mockEvaluations.map((evaluation) => (
            <button
              key={evaluation.id}
              onClick={() => setSelectedEvaluation(evaluation)}
              className={`w-full text-right p-4 rounded-lg border-2 transition ${
                selectedEvaluation?.id === evaluation.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {evaluation.candidateName}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {evaluation.candidateArabic}
                  </p>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {evaluation.overallScore}
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2">{evaluation.position}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(evaluation.overallScore / 20)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Detail View */}
        {selectedEvaluation && (
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedEvaluation.candidateName}
                </h2>
                <p className="text-gray-600">
                  {selectedEvaluation.candidateArabic} - {selectedEvaluation.position}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Download size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Overall Score */}
            <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <p className="text-gray-600 text-sm mb-2">الدرجة الكلية</p>
              <div className="flex items-end gap-4">
                <div className="text-4xl font-bold text-green-600">
                  {selectedEvaluation.overallScore}
                </div>
                <div className="flex-1">
                  <ScoreBar score={selectedEvaluation.overallScore} />
                </div>
              </div>
            </div>

            {/* Detailed Scores */}
            {(selectedEvaluation.technicalScore ||
              selectedEvaluation.communicationScore ||
              selectedEvaluation.cultureFitScore) && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  درجات التفاصيل
                </h3>
                <div className="space-y-4">
                  {selectedEvaluation.technicalScore && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        الدرجة التقنية
                      </label>
                      <ScoreBar score={selectedEvaluation.technicalScore} />
                    </div>
                  )}
                  {selectedEvaluation.communicationScore && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        درجة التواصل
                      </label>
                      <ScoreBar score={selectedEvaluation.communicationScore} />
                    </div>
                  )}
                  {selectedEvaluation.cultureFitScore && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        درجة الانسجام مع الثقافة
                      </label>
                      <ScoreBar score={selectedEvaluation.cultureFitScore} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Strengths and Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">نقاط القوة</h3>
                <ul className="space-y-2">
                  {selectedEvaluation.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">نقاط الضعف</h3>
                {selectedEvaluation.weaknesses.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedEvaluation.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-orange-600 font-bold mt-0.5">!</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 italic">لا توجد نقاط ضعف ملحوظة</p>
                )}
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">التوصية</h3>
              <p className="text-gray-700">{selectedEvaluation.recommendation}</p>
            </div>

            {/* Evaluator and Date */}
            <div className="text-xs text-gray-600 border-t border-gray-200 pt-4">
              <p>
                قيمه: {selectedEvaluation.evaluator} | التاريخ:{' '}
                {selectedEvaluation.evaluatedAt}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
