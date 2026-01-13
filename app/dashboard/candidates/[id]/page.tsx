'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Mail, Phone, MapPin, Download, Edit, MessageSquare } from 'lucide-react'

export default function CandidateProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const mockCandidate = {
    id: params.id,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    country: 'السعودية',
    yearsExperience: 5,
    currentTitle: 'Senior ML Engineer',
    matchScore: 95,
    tags: ['machine-learning', 'python', 'tensorflow'],
    about:
      'مهندس تعلم آلي متخصص مع خبرة 5 سنوات في بناء نماذج التعلم الآلي والتعلم العميق. شغل مناصب في شركات تقنية رائدة.',
    education: [
      {
        degree: 'ماجستير في علوم الحاسوب',
        university: 'جامعة الملك سعود',
        graduationYear: 2020,
      },
    ],
    experience: [
      {
        title: 'Senior ML Engineer',
        company: 'Tech Company',
        duration: '2023 - Present',
        description: 'بناء نماذج التعلم الآلي',
      },
      {
        title: 'ML Engineer',
        company: 'Another Tech Co',
        duration: '2021 - 2023',
        description: 'تطوير حلول الذكاء الاصطناعي',
      },
    ],
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
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">ملف المرشح</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition flex items-center gap-2">
            <MessageSquare size={20} />
            تواصل
          </button>
          <button className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition flex items-center gap-2">
            <Edit size={20} />
            تعديل
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {mockCandidate.name}
                </h2>
                <p className="text-gray-600">{mockCandidate.currentTitle}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-2xl mb-2">
                  {mockCandidate.matchScore}%
                </div>
                <p className="text-xs text-gray-600">درجة التطابق</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail size={18} className="text-gray-400" />
                <a href={`mailto:${mockCandidate.email}`} className="hover:text-green-700">
                  {mockCandidate.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone size={18} className="text-gray-400" />
                <span>{mockCandidate.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={18} className="text-gray-400" />
                <span>{mockCandidate.country}</span>
              </div>
            </div>

            {/* About */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">نبذة</h3>
              <p className="text-gray-700 leading-relaxed">{mockCandidate.about}</p>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">الخبرة</h3>
            <div className="space-y-6">
              {mockCandidate.experience.map((exp, idx) => (
                <div key={idx} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">التعليم</h3>
            <div className="space-y-4">
              {mockCandidate.education.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-sm text-gray-600">{edu.university}</p>
                  <p className="text-xs text-gray-500">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">المهارات</h3>
            <div className="flex flex-wrap gap-2">
              {mockCandidate.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CV Download */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">المستندات</h3>
            <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium flex items-center justify-center gap-2">
              <Download size={18} />
              تحميل السيرة الذاتية
            </button>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">الحالة</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">الخبرة</span>
                <span className="font-semibold text-gray-900">
                  {mockCandidate.yearsExperience} سنة
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">الدرجة</span>
                <span className="font-semibold text-green-600">
                  {mockCandidate.matchScore}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
