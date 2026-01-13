import { BarChart3, Users, Briefcase, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
        <p className="text-gray-600">مرحباً بك في نظام استقطاب كفاءات الذكاء الاصطناعي</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Briefcase size={32} />}
          label="الوظائف المفتوحة"
          value="12"
          trend={+3}
        />
        <StatCard
          icon={<Users size={32} />}
          label="المرشحين"
          value="245"
          trend={+15}
        />
        <StatCard
          icon={<TrendingUp size={32} />}
          label="معدل التوظيف"
          value="78%"
          trend={+5}
        />
        <StatCard
          icon={<BarChart3 size={32} />}
          label="التقديمات الجديدة"
          value="34"
          trend={+8}
        />
      </div>

      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 مرحباً بك</h2>
        <p className="text-gray-700 mb-4">
          نظام استقطاب كفاءات الذكاء الاصطناعي جاهز الآن! هذا هو الإصدار الأولي من المنصة.
        </p>
        <p className="text-gray-600 mb-6">
          يمكنك الآن البدء في:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">📝 إنشاء وظيفة</h3>
            <p className="text-blue-700 text-sm">انتقل إلى صفحة الوظائف لإنشاء وظيفة جديدة</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">👤 إضافة مرشح</h3>
            <p className="text-green-700 text-sm">أضف مرشحين وحلل سيرهم الذاتية تلقائياً</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">📊 عرض Pipeline</h3>
            <p className="text-purple-700 text-sm">تابع مراحل المرشحين بسهولة على لوحة Kanban</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-2">🎤 جدولة مقابلة</h3>
            <p className="text-orange-700 text-sm">جدول المقابلات وسجل التفريغات التلقائية</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ الميزات الرئيسية</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureBox
            icon="🤖"
            title="تقييم ذكي بـ AI"
            description="تحليل السير الذاتية والمقابلات باستخدام GPT-4o"
          />
          <FeatureBox
            icon="🔍"
            title="بحث دلالي"
            description="ابحث عن المرشحين بالمهارات والخبرة"
          />
          <FeatureBox
            icon="📊"
            title="تقارير متقدمة"
            description="رسوم بيانية وتقارير شهرية شاملة"
          />
          <FeatureBox
            icon="🎤"
            title="تفريغ صوتي"
            description="تفريغ تسجيلات المقابلات تلقائياً"
          />
          <FeatureBox
            icon="🌍"
            title="خبراء عالميون"
            description="قاعدة بيانات خبراء AI العالميين"
          />
          <FeatureBox
            icon="📱"
            title="واجهة عربية"
            description="واجهة كاملة بالعربية (RTL)"
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">💡 نصيحة</h3>
        <p className="text-blue-700 mb-2">
          للوصول الكامل إلى ميزات الذكاء الاصطناعي، تأكد من تعيين مفتاح OpenAI API في ملف .env
        </p>
        <code className="block mt-2 p-2 bg-white rounded text-blue-900 font-mono text-sm">
          OPENAI_API_KEY=sk-proj-your-key-here
        </code>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode
  label: string
  value: string
  trend: number
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-green-700">{icon}</div>
        <span className={`text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function FeatureBox({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="text-center p-4">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
