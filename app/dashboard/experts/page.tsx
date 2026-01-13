'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Globe, Award, BookOpen, LinkIcon } from 'lucide-react'

interface Expert {
  id: string
  name: string
  nameAr: string
  level: 'ELITE' | 'TOP' | 'EMERGING'
  specializations: string[]
  affiliation?: string
  country?: string
  hIndex?: number
  citations?: number
  publications?: number
  googleScholar?: string
  linkedinUrl?: string
  personalWebsite?: string
  notableWork: string[]
}

const mockExperts: Expert[] = [
  {
    id: '1',
    name: 'Yann LeCun',
    nameAr: 'يان لوكان',
    level: 'ELITE',
    specializations: [
      'Deep Learning',
      'Computer Vision',
      'Neural Networks',
    ],
    affiliation: 'Meta AI',
    country: 'USA',
    hIndex: 180,
    citations: 150000,
    publications: 200,
    personalWebsite: 'http://yann.lecun.com',
    notableWork: ['Convolutional Neural Networks', 'Backpropagation'],
  },
  {
    id: '2',
    name: 'Yoshua Bengio',
    nameAr: 'يوشوا بينجيو',
    level: 'ELITE',
    specializations: ['Deep Learning', 'AI Safety', 'Neural Networks'],
    affiliation: 'Université de Montréal',
    country: 'Canada',
    hIndex: 190,
    citations: 160000,
    publications: 250,
    notableWork: ['Deep Learning', 'Backpropagation'],
  },
  {
    id: '3',
    name: 'Geoffrey Hinton',
    nameAr: 'جيفري هينتون',
    level: 'ELITE',
    specializations: ['Deep Learning', 'Neural Networks', 'Machine Learning'],
    affiliation: 'University of Toronto',
    country: 'Canada',
    hIndex: 170,
    citations: 140000,
    publications: 180,
    notableWork: ['Backpropagation', 'Boltzmann Machines'],
  },
  {
    id: '4',
    name: 'Fei-Fei Li',
    nameAr: 'فيه-فيه لي',
    level: 'TOP',
    specializations: ['Computer Vision', 'AI Ethics', 'Machine Learning'],
    affiliation: 'Stanford University',
    country: 'USA',
    hIndex: 140,
    citations: 120000,
    publications: 150,
    notableWork: ['ImageNet', 'Human-Centered AI'],
  },
  {
    id: '5',
    name: 'Demis Hassabis',
    nameAr: 'ديميس حسابيس',
    level: 'TOP',
    specializations: ['AI', 'Neuroscience', 'Deep Learning'],
    affiliation: 'Google DeepMind',
    country: 'UK',
    hIndex: 130,
    citations: 100000,
    publications: 120,
    notableWork: ['AlphaGo', 'AlphaFold'],
  },
]

const levelColors: Record<string, { bg: string; text: string; label: string }> = {
  ELITE: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'نخبة عالمية',
  },
  TOP: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'أفضل الخبراء' },
  EMERGING: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'الصاعدون',
  },
}

const specializationColors: Record<string, string> = {
  'Deep Learning': 'bg-purple-100 text-purple-800',
  'Computer Vision': 'bg-blue-100 text-blue-800',
  'Neural Networks': 'bg-indigo-100 text-indigo-800',
  'AI Safety': 'bg-red-100 text-red-800',
  'Machine Learning': 'bg-green-100 text-green-800',
  'AI Ethics': 'bg-pink-100 text-pink-800',
  'Neuroscience': 'bg-orange-100 text-orange-800',
  'NLP': 'bg-cyan-100 text-cyan-800',
}

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('ALL')

  const filteredExperts = mockExperts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.nameAr.includes(searchTerm) ||
      (expert.affiliation?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false)
    const matchesLevel = levelFilter === 'ALL' || expert.level === levelFilter
    return matchesSearch && matchesLevel
  })

  return (
    <div className="p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">خبراء الذكاء الاصطناعي</h1>
            <p className="text-gray-600">قاعدة بيانات الخبراء العالميين في مجال AI</p>
          </div>
          <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition flex items-center gap-2">
            <Plus size={20} />
            إضافة خبير
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ابحث عن خبير..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="ALL">جميع المستويات</option>
            <option value="ELITE">نخبة عالمية</option>
            <option value="TOP">أفضل الخبراء</option>
            <option value="EMERGING">الصاعدون</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">إجمالي الخبراء</p>
          <p className="text-2xl font-bold text-gray-900">{mockExperts.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">النخبة العالمية</p>
          <p className="text-2xl font-bold text-yellow-600">
            {mockExperts.filter((e) => e.level === 'ELITE').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">متوسط H-Index</p>
          <p className="text-2xl font-bold text-purple-600">
            {(
              mockExperts.reduce((sum, e) => sum + (e.hIndex || 0), 0) /
              mockExperts.filter((e) => e.hIndex).length
            ).toFixed(0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-2">إجمالي الاستشهادات</p>
          <p className="text-2xl font-bold text-blue-600">
            {(
              mockExperts.reduce((sum, e) => sum + (e.citations || 0), 0) / 1000
            ).toFixed(0)}
            K
          </p>
        </div>
      </div>

      {/* Experts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => {
          const levelColor = levelColors[expert.level]
          return (
            <div
              key={expert.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Level Badge */}
              <div
                className={`px-4 py-3 ${levelColor.bg} ${levelColor.text}`}
              >
                <span className="text-xs font-semibold">{levelColor.label}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name and Info */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {expert.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{expert.nameAr}</p>

                {/* Affiliation */}
                {expert.affiliation && (
                  <p className="text-sm text-gray-700 mb-2 font-medium">
                    {expert.affiliation}
                  </p>
                )}
                {expert.country && (
                  <p className="text-xs text-gray-600 mb-4">{expert.country}</p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-200">
                  {expert.hIndex && (
                    <div className="text-center">
                      <Award size={16} className="text-purple-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">H-Index</p>
                      <p className="font-bold text-gray-900">{expert.hIndex}</p>
                    </div>
                  )}
                  {expert.citations && (
                    <div className="text-center">
                      <BookOpen size={16} className="text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">استشهادات</p>
                      <p className="font-bold text-gray-900">
                        {(expert.citations / 1000).toFixed(0)}K
                      </p>
                    </div>
                  )}
                  {expert.publications && (
                    <div className="text-center">
                      <BookOpen size={16} className="text-green-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">منشورات</p>
                      <p className="font-bold text-gray-900">
                        {expert.publications}
                      </p>
                    </div>
                  )}
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    التخصصات
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {expert.specializations.slice(0, 2).map((spec, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded ${
                          specializationColors[spec] ||
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {spec}
                      </span>
                    ))}
                    {expert.specializations.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                        +{expert.specializations.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {expert.googleScholar && (
                    <a
                      href={expert.googleScholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-xs font-medium flex items-center justify-center gap-1"
                    >
                      <Globe size={14} />
                      Scholar
                    </a>
                  )}
                  {expert.linkedinUrl && (
                    <a
                      href={expert.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-xs font-medium flex items-center justify-center gap-1"
                    >
                      <LinkIcon size={14} />
                      LinkedIn
                    </a>
                  )}
                  {expert.personalWebsite && (
                    <a
                      href={expert.personalWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-xs font-medium flex items-center justify-center gap-1"
                    >
                      <Globe size={14} />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredExperts.length === 0 && (
        <div className="p-12 text-center bg-white rounded-lg">
          <Globe size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">لا توجد خبراء تطابق معايير البحث</p>
        </div>
      )}
    </div>
  )
}
