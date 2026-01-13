import Link from 'next/link'
import { ArrowRight, Zap, Users, BarChart3, Brain } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" dir="rtl">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-green-700">
          🤖 استقطاب الكفاءات
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-green-700 font-medium">
            دخول
          </Link>
          <Link href="/register" className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 font-medium">
            إنشاء حساب
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            نظام استقطاب كفاءات الذكاء الاصطناعي
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            منصة متكاملة لإدارة عمليات استقطاب المتخصصين في مجال الذكاء الاصطناعي مع تقييم ذكي بالـ AI
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="px-8 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition flex items-center gap-2">
              ابدأ الآن <ArrowRight size={20} />
            </Link>
            <button className="px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
              اعرف المزيد
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <FeatureCard
            icon={<Brain size={32} />}
            title="تقييم ذكي"
            description="تحليل السير الذاتية وتقييم المرشحين باستخدام GPT-4o"
          />
          <FeatureCard
            icon={<Users size={32} />}
            title="إدارة شاملة"
            description="إدارة الوظائف والمرشحين والمقابلات في مكان واحد"
          />
          <FeatureCard
            icon={<BarChart3 size={32} />}
            title="تقارير متقدمة"
            description="رسوم بيانية وتقارير شهرية مفصلة عن الأداء"
          />
          <FeatureCard
            icon={<Zap size={32} />}
            title="البحث الذكي"
            description="بحث دلالي عن المرشحين المناسبين بالمهارات المطلوبة"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2025 نظام استقطاب كفاءات الذكاء الاصطناعي. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition">
      <div className="text-green-700 mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
