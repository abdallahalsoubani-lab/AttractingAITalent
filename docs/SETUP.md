# دليل التثبيت والإعداد

## 📋 المتطلبات الأساسية

### الإجبارية
- **Docker Desktop** - للعمل على أي نظام تشغيل (macOS, Windows, Linux)
- **Git** - للعمل مع المشروع
- **مسافة تخزين**: 5 GB على الأقل

### الاختيارية
- **مفتاح OpenAI API** - لتجربة ميزات الذكاء الاصطناعي (اختياري للاختبار الأساسي)

## 🚀 خطوات التثبيت

### 1. استنساخ المشروع

```bash
git clone <repository-url>
cd AttractingAITalent
```

### 2. إعداد متغيرات البيئة

نسخ ملف البيئة الافتراضي:

```bash
cp .env.example .env
```

ثم تعديل الملف بالقيم المناسبة:

```env
# قاعدة البيانات (لا تحتاج تعديل محلياً)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_recruitment"

# المصادقة (غيّر هذا بقيمة عشوائية قوية)
NEXTAUTH_SECRET="change-me-to-a-random-32-char-secret-key-min"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI (اختياري)
OPENAI_API_KEY="sk-proj-your-key-here"

# Cron Jobs (لا تحتاج تعديل محلياً)
CRON_SECRET="your-cron-secret"
```

### 3. تشغيل النظام

#### الطريقة السهلة (موصى به)

```bash
./run.sh
```

يقوم سكريبت `run.sh` بـ:
- ✅ التحقق من Docker
- ✅ إنشاء ملف `.env` إذا لم يكن موجوداً
- ✅ تشغيل Docker Compose
- ✅ تنفيذ database migrations
- ✅ تحضير النظام

#### مع البيانات التجريبية

```bash
./run.sh --seed
```

يقوم بتحميل:
- 5 مستخدمين اختبار
- 3 مشاريع
- 10 وظائف
- 50 مرشح
- 50 خبير AI
- تقارير تجريبية

### 4. الوصول للنظام

بعد التشغيل الناجح:

```
🌐 الوصول للمنصة: http://localhost:3000
📊 Prisma Studio:  docker-compose exec app npx prisma studio
📋 السجلات:         docker-compose logs -f app
```

## 🔐 بيانات الاختبار

إذا استخدمت `--seed`:

```
البريد: demo@example.com
كلمة المرور: demo123
```

الأدوار المتاحة:
- **Admin** - صلاحيات كاملة
- **HR Manager** - إدارة التوظيف
- **HR Specialist** - تنفيذ العمليات
- **Tech Reviewer** - مراجع تقني
- **Viewer** - عرض فقط

## 🛑 إيقاف النظام

```bash
./stop.sh
```

## 🐳 أوامر Docker المفيدة

### عرض السجلات

```bash
# جميع السجلات
docker-compose logs

# فقط سجلات التطبيق
docker-compose logs -f app

# آخر 50 سطر
docker-compose logs --tail=50
```

### الدخول للـ Shell

```bash
# Shell الحاوية
docker-compose exec app sh

# قاعدة البيانات
docker-compose exec db psql -U postgres -d ai_recruitment
```

### إدارة البيانات

```bash
# مشاهدة الجداول
docker-compose exec db psql -U postgres -d ai_recruitment -c "\dt"

# عمل نسخة احتياطية
docker-compose exec db pg_dump -U postgres ai_recruitment > backup.sql

# استعادة من نسخة احتياطية
docker-compose exec -T db psql -U postgres ai_recruitment < backup.sql

# حذف البيانات (حذر!)
docker-compose down -v
```

## 🔧 استكشاف الأخطاء

### الخطأ: منفذ 3000 مشغول

```bash
# البحث عن العملية المستخدمة
lsof -i :3000

# قتل العملية
kill -9 <PID>

# أو استخدام منفذ مختلف
PORT=3001 npm run dev
```

### الخطأ: قاعدة البيانات لا تتصل

```bash
# التحقق من حالة الحاويات
docker-compose ps

# إعادة تشغيل قاعدة البيانات
docker-compose restart db

# إعادة بناء من الصفر
docker-compose down -v
./run.sh
```

### الخطأ: نقص المساحة التخزينية

```bash
# تنظيف الصور والحاويات غير المستخدمة
docker system prune -a

# إزالة البيانات (حذر!)
docker-compose down -v
```

## 📝 تخصيص الإعدادات

### تغيير الرقم السري لقاعدة البيانات

**ملف docker-compose.yml:**
```yaml
environment:
  - POSTGRES_PASSWORD=your-secure-password
```

**ملف .env:**
```env
DATABASE_URL="postgresql://postgres:your-secure-password@db:5432/ai_recruitment"
```

### تغيير المنفذ

**ملف docker-compose.yml:**
```yaml
ports:
  - "3001:3000"  # من 3001 بدلاً من 3000
```

### تفعيل وضع التطوير المباشر

```bash
# الملفات سيتم مراقبتها وإعادة تحميل تلقائياً
npm run dev
```

## 📦 تحديث المكتبات

```bash
# التحقق من التحديثات
npm outdated

# تحديث جميع المكتبات
npm update

# تثبيت مكتبة جديدة
npm install package-name
```

## 🎯 الخطوات التالية

بعد التثبيت الناجح:

1. **استكشاف الواجهة** - قم بزيارة http://localhost:3000
2. **قراءة التوثيق** - راجع ملفات docs الأخرى
3. **تجريب الميزات** - استخدم بيانات الاختبار
4. **تخصيص الإعدادات** - غيّر البيانات حسب احتياجك

## 🆘 الدعم والمساعدة

- 📚 راجع ملفات التوثيق الأخرى
- 🐛 فتح Issue إذا واجهت مشكلة
- 💬 استشر فريق التطوير

---

**آخر تحديث**: 13 يناير 2026
