#!/bin/bash

# ===========================================
# نظام استقطاب كفاءات الذكاء الاصطناعي
# سكريبت التشغيل
# ===========================================

set -e

echo "🚀 بدء تشغيل نظام استقطاب الكفاءات..."

# التحقق من Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker غير مثبت. يرجى تثبيته أولاً."
    echo "   زيارة: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# التحقق من Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose غير مثبت. يرجى تثبيته أولاً."
    exit 1
fi

# إنشاء ملف .env إذا لم يكن موجوداً
if [ ! -f .env ]; then
    echo "📝 إنشاء ملف .env من المثال..."
    cp .env.example .env
    echo ""
    echo "⚠️  تنبيه: يرجى تعديل ملف .env بالقيم المناسبة:"
    echo "   - OPENAI_API_KEY: مفتاح OpenAI API"
    echo "   - NEXTAUTH_SECRET: مفتاح سري آمن (32 حرف على الأقل)"
    echo ""
    read -p "هل تريد المتابعة؟ (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "تم الإلغاء"
        exit 1
    fi
fi

# تشغيل Docker Compose
echo "🐳 تشغيل Docker Compose..."
docker-compose up -d

# انتظار قاعدة البيانات
echo "⏳ انتظار قاعدة البيانات (هذا قد يستغرق دقيقة...)..."
sleep 10

# تشغيل Prisma migrations
echo "📦 تنفيذ database migrations..."
docker-compose exec -T app npx prisma migrate deploy || true

# تشغيل Seed (اختياري)
if [ "$1" == "--seed" ]; then
    echo "🌱 تحميل البيانات التجريبية..."
    docker-compose exec -T app npx prisma db seed
fi

echo ""
echo "============================================"
echo "✅ تم تشغيل النظام بنجاح!"
echo "============================================"
echo ""
echo "🌐 الوصول للنظام:"
echo "   http://localhost:3000"
echo ""
echo "📊 Prisma Studio (لإدارة قاعدة البيانات):"
echo "   docker-compose exec app npx prisma studio"
echo ""
echo "📋 عرض السجلات:"
echo "   docker-compose logs -f app"
echo ""
echo "🛑 لإيقاف النظام:"
echo "   ./stop.sh"
echo ""
echo "💡 ملاحظات:"
echo "   - البيانات محفوظة في قاعدة البيانات حتى بعد إيقاف النظام"
echo "   - لحذف كل البيانات: docker-compose down -v"
echo ""
