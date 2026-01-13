'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Eye, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react'

interface Candidate {
  id: string
  firstName: string
  lastName: string
  firstNameAr?: string
  lastNameAr?: string
  email: string
  phone?: string
  country?: string
  yearsExperience?: number
  currentTitle?: string
  matchScore?: number
  tags: string[]
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Mohamed',
    firstNameAr: 'أحمد',
    lastNameAr: 'محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    country: 'السعودية',
    yearsExperience: 5,
    currentTitle: 'Senior ML Engineer',
    matchScore: 95,
    tags: ['machine-learning', 'python', 'tensorflow'],
  },
  {
    id: '2',
    firstName: 'Fatima',
    lastName: 'Ali',
    firstNameAr: 'فاطمة',
    lastNameAr: 'علي',
    email: 'fatima@example.com',
    phone: '+966501234568',
    country: 'الإمارات',
    yearsExperience: 3,
    currentTitle: 'Data Scientist',
    matchScore: 87,
    tags: ['data-science', 'python', 'statistics'],
  },
  {
    id: '3',
    firstName: 'Mohammed',
    lastName: 'Hassan',
    firstNameAr: 'محمد',
    lastNameAr: 'حسن',
    email: 'mohammed@example.com',
    phone: '+966501234569',
    country: 'السعودية',
    yearsExperience: 7,
    currentTitle: 'AI Researcher',
    matchScore: 92,
    tags: ['research', 'nlp', 'deep-learning'],
  },
  {
    id: '4',
    firstName: 'Layla',
    lastName: 'Ibrahim',
    firstNameAr: 'ليلى',
    lastNameAr: 'إبراهيم',
    email: 'layla@example.com',
    phone: '+966501234570',
    country: 'مصر',
    yearsExperience: 4,
    currentTitle: 'ML Engineer',
    matchScore: 78,
    tags: ['computer-vision', 'pytorch', 'ml'],
  },
]

const tagColors: Record<string, string> = {
  'machine-learning': 'bg-blue-100 text-blue-800',
  'data-science': 'bg-purple-100 text-purple-800',
  'python': 'bg-green-100 text-green-800',
  'tensorflow': 'bg-orange-100 text-orange-800',
  'statistics': 'bg-pink-100 text-pink-800',
  'research': 'bg-indigo-100 text-indigo-800',
  'nlp': 'bg-cyan-100 text-cyan-800',
  'deep-learning': 'bg-red-100 text-red-800',
  'pytorch': 'bg-yellow-100 text-yellow-800',
  'ml': 'bg-teal-100 text-teal-800',
  'computer-vision': 'bg-lime-100 text-lime-800',
}

function getTagColor(tag: string): string {
  return tagColors[tag] || 'bg-gray-100 text-gray-800'
}

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [minScore, setMinScore] = useState(0)

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.includes(searchTerm)
    const matchesScore = (candidate.matchScore || 0) >= minScore
    return matchesSearch && matchesScore
  })

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">المرشحون</h1>
            <p className="text-gray-600">إدارة قاعدة بيانات المرشحين</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/candidates/upload"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition flex items-center gap-2"
            >
              <Plus size={20} />
              تحميل سيرة ذاتية
            </Link>
            <Link
              href="/dashboard/candidates/database"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition flex items-center gap-2"
            >
              <Plus size={20} />
              إضافة مرشح
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ابحث عن مرشح..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="min-w-max">
            <label className="block text-xs text-gray-600 mb-1">الحد الأدنى للدرجة</label>
            <input
              type="range"
              min="0"
              max="100"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">إجمالي المرشحين</p>
          <p className="text-2xl font-bold text-gray-900">{mockCandidates.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">المطابقة العالية</p>
          <p className="text-2xl font-bold text-green-600">
            {mockCandidates.filter((c) => (c.matchScore || 0) >= 85).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">متوسط الخبرة</p>
          <p className="text-2xl font-bold text-blue-600">
            {(
              mockCandidates.reduce((sum, c) => sum + (c.yearsExperience || 0), 0) /
              mockCandidates.length
            ).toFixed(1)}
            {' سنة'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">متوسط الدرجة</p>
          <p className="text-2xl font-bold text-purple-600">
            {(
              mockCandidates.reduce((sum, c) => sum + (c.matchScore || 0), 0) /
              mockCandidates.length
            ).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {candidate.firstName} {candidate.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  {candidate.firstNameAr} {candidate.lastNameAr}
                </p>
              </div>
              {candidate.matchScore && (
                <div className="text-right">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-700 rounded-full font-bold">
                    {candidate.matchScore}%
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <a href={`mailto:${candidate.email}`} className="hover:text-green-700">
                  {candidate.email}
                </a>
              </div>
              {candidate.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>{candidate.phone}</span>
                </div>
              )}
              {candidate.country && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{candidate.country}</span>
                </div>
              )}
            </div>

            {/* Experience and Title */}
            <div className="mb-4">
              {candidate.currentTitle && (
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {candidate.currentTitle}
                </p>
              )}
              {candidate.yearsExperience && (
                <p className="text-xs text-gray-600">
                  {candidate.yearsExperience} سنة خبرة
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {candidate.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTagColor(
                    tag
                  )}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Link
                href={`/candidates/${candidate.id}`}
                className="flex-1 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium text-center flex items-center justify-center gap-2"
              >
                <Eye size={16} />
                عرض
              </Link>
              <button className="flex-1 py-2 px-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-medium flex items-center justify-center gap-2">
                <Edit size={16} />
                تعديل
              </button>
              <button className="py-2 px-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm font-medium flex items-center justify-center gap-2">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="p-12 text-center bg-white rounded-lg">
          <p className="text-gray-600 mb-4">لا توجد مرشحين تطابق معايير البحث</p>
          <Link
            href="/dashboard/candidates/upload"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            تحميل سيرة ذاتية جديدة
          </Link>
        </div>
      )}
    </div>
  )
}
