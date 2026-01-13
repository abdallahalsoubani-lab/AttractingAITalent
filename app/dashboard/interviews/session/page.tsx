'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Video, Mic, Phone, Save, X } from 'lucide-react'

export default function InterviewSessionPage() {
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState('00:00')
  const [notes, setNotes] = useState('')

  const handleStartSession = () => {
    setIsActive(true)
    alert('تم بدء جلسة المقابلة - سيتم التسجيل والتفريغ التلقائي!')
  }

  const handleEndSession = () => {
    setIsActive(false)
    alert('انتهت المقابلة - جاري تفريغ التسجيل...')
  }

  const handleSaveReport = () => {
    alert('تم حفظ تقرير المقابلة!')
    router.push('/dashboard/interviews')
  }

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">جلسة مقابلة</h1>
          <p className="text-gray-600 mt-1">
            مقابلة مع أحمد محمد - مهندس تعلم آلي
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Area */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg shadow overflow-hidden">
            {/* Video Feed */}
            <div className="aspect-video bg-gray-800 flex items-center justify-center mb-4">
              <div className="text-center">
                <Video size={64} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  {isActive ? 'جلسة مقابلة مباشرة' : 'اضغط على "بدء المقابلة" لبدء الجلسة'}
                </p>
              </div>
            </div>

            {/* Session Info */}
            <div className="bg-gray-800 px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm">المدة</p>
                  <p className="text-white text-2xl font-bold font-mono">{duration}</p>
                </div>
                <div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive ? 'bg-red-600' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-red-400 animate-pulse' : 'bg-gray-500'}`} />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {!isActive ? (
                  <button
                    onClick={handleStartSession}
                    className="flex-1 px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    بدء المقابلة
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                        isMuted
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      <Mic size={20} />
                      {isMuted ? 'كتم الصوت' : 'الصوت مفعل'}
                    </button>
                    <button
                      onClick={handleEndSession}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <X size={20} />
                      إنهاء المقابلة
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Candidate Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">بيانات المرشح</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">الاسم</p>
                <p className="font-medium text-gray-900">أحمد محمد</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">الوظيفة</p>
                <p className="font-medium text-gray-900">مهندس تعلم آلي</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">البريد</p>
                <p className="font-medium text-gray-900 break-all">
                  ahmed@example.com
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">الخبرة</p>
                <p className="font-medium text-gray-900">5 سنوات</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">ملاحظات</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
              placeholder="أضف ملاحظات أثناء المقابلة..."
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveReport}
            disabled={isActive}
            className="w-full px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save size={20} />
            حفظ التقرير
          </button>
        </div>
      </div>

      {/* Transcription Area */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-4">التفريغ التلقائي</h3>
        <div className="bg-gray-50 rounded-lg p-4 min-h-40 text-gray-600 text-sm">
          {isActive ? (
            <p className="text-blue-600">جاري التسجيل والتفريغ التلقائي...</p>
          ) : (
            <p>سيظهر التفريغ التلقائي هنا بعد انتهاء المقابلة</p>
          )}
        </div>
      </div>
    </div>
  )
}
