'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, ArrowRight, X } from 'lucide-react'

export default function UploadCVPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert('اختر ملف أولاً')
      return
    }
    alert(`تم تحميل الملف: ${file.name}`)
    router.push('/dashboard/candidates')
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
          <h1 className="text-3xl font-bold text-gray-900">تحميل السيرة الذاتية</h1>
          <p className="text-gray-600 mt-1">حمّل السيرة الذاتية للمرشح وسيتم تحليلها تلقائياً</p>
        </div>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-lg shadow p-8 space-y-6">
          {/* Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
              isDragging
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <Upload
              size={48}
              className={`mx-auto mb-4 ${
                isDragging ? 'text-green-600' : 'text-gray-400'
              }`}
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              اسحب الملف هنا أو اضغط للاختيار
            </h3>
            <p className="text-gray-600 mb-4">
              يدعم الملفات: PDF, DOC, DOCX (الحد الأقصى 10MB)
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="inline-block px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition cursor-pointer"
            >
              اختر ملف
            </label>
          </div>

          {/* Selected File */}
          {file && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                ✓ الملف المختار: <strong>{file.name}</strong>
              </p>
              <p className="text-xs text-green-600 mt-1">
                الحجم: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={!file}
              className="flex-1 px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Upload size={20} />
              تحميل وتحليل
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <X size={20} />
              إلغاء
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
