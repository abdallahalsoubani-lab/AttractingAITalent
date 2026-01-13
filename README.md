# نظام استقطاب كفاءات الذكاء الاصطناعي 🤖

نظام ويب متكامل لإدارة استقطاب كفاءات الذكاء الاصطناعي مع تقييم ذكي بـ AI، بحث دلالي، وإدارة شاملة للمسار الوظيفي.

## ✨ الميزات الرئيسية

- ✅ **إدارة وظائف متكاملة** - إنشاء وتعديل الوظائف مع توليد تلقائي للأوصاف والمعايير
- ✅ **قاعدة بيانات مرشحين** - استيراد CVs وتحليل ذكي بـ GPT-4o
- ✅ **بحث دلالي** - البحث عن مرشحين بالمهارات (Semantic Search)
- ✅ **نظام Pipeline متكامل** - لوحة Kanban بسحب وإفلات
- ✅ **نظام المقابلات** - جدولة، تفريغ صوتي، تلخيص بـ AI
- ✅ **تقييم ذكي** - نماذج تقييم موحدة مع تقييم بـ AI
- ✅ **رادار الخبراء** - سحب خبراء AI من Semantic Scholar و ORCID
- ✅ **تقارير متقدمة** - رسوم بيانية و KPIs
- ✅ **RTL كامل** - واجهة عربية بنسبة 100%
- ✅ **مدعوم على M4 Mac** - Docker support كامل

## 🚀 البدء السريع

### المتطلبات
- Docker Desktop
- Git

### التشغيل

```bash
# استنساخ المشروع
git clone <url>
cd AttractingAITalent

# تشغيل النظام
./run.sh

# أو مع البيانات التجريبية
./run.sh --seed

# الوصول للمنصة
# http://localhost:3000
```

### الإيقاف

```bash
./stop.sh
```

## 📦 التقنيات المستخدمة

| الطبقة | التقنيات |
|------|---------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL 16 + pgvector |
| **AI** | OpenAI GPT-4o, Embeddings, Whisper |
| **External APIs** | Semantic Scholar, ORCID |
| **DevOps** | Docker, Docker Compose |

## 📁 هيكل المشروع

```
├── app/                    # صفحات Next.js
├── src/
│   ├── components/        # مكونات React
│   ├── lib/               # مكتبات AI, APIs, etc.
│   ├── hooks/             # React Hooks
│   └── types/             # TypeScript Types
├── prisma/
│   ├── schema.prisma      # مخطط DB
│   └── seed.ts            # بيانات تجريبية
├── docs/                  # التوثيق المفصل
├── docker-compose.yml
├── run.sh & stop.sh       # سكريبتات التشغيل
└── README.md
```

## 🌐 الصفحات الرئيسية

| الصفحة | الرابط | الوصف |
|------|-------|-------|
| الرئيسية | `/` | الصفحة الترحيبية |
| تسجيل الدخول | `/login` | نموذج دخول |
| لوحة التحكم | `/dashboard` | عرض إحصائيات وملخصات |
| الوظائف | `/jobs` | إدارة الوظائف |
| المرشحين | `/candidates` | قاعدة بيانات المرشحين |
| Pipeline | `/pipeline` | لوحة Kanban |
| المقابلات | `/interviews` | جدولة وإدارة المقابلات |
| التقارير | `/reports` | تقارير شهرية |
| الخبراء | `/experts` | خبراء AI العالميين |

## ⚙️ الإعدادات

نسخ `.env.example` إلى `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_recruitment"
NEXTAUTH_SECRET="your-32-char-secret"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-proj-..."
```

## 📚 التوثيق المفصل

- **docs/SETUP.md** - دليل التثبيت والإعداد
- **docs/ARCHITECTURE.md** - بنية النظام
- **docs/DATABASE.md** - شرح قاعدة البيانات
- **docs/PAGES.md** - شرح الصفحات
- **docs/API.md** - توثيق API
- **docs/AI_TOOLS.md** - أدوات الذكاء الاصطناعي

## 🎨 الألوان

```
الأخضر السعودي: #006C35
الأزرق: #1E3A5F
الذهبي: #D4AF37
```

## 🧪 البيانات التجريبية

تشمل:
- 5 مستخدمين
- 3 مشاريع
- 10 وظائف
- 50 مرشح
- 50 خبير AI
- تقارير شهرية

## 📞 الدعم

راجع ملفات التوثيق في مجلد `docs/` أو فتح Issue

---

**آخر تحديث**: 13 يناير 2026