/**
 * Prisma Database Client
 *
 * إعدادات الوصول إلى قاعدة البيانات
 * يتم استخدام هذا الملف للوصول إلى قاعدة البيانات من جميع أجزاء التطبيق
 */

import { PrismaClient } from '@prisma/client'

// إنشاء instance واحد من Prisma Client
// لتجنب إنشاء عدة اتصالات في التطوير
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // في التطوير، نحتفظ بـ client واحد في global scope
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

// إضافة prisma إلى global namespace
// eslint-disable-next-line no-var
declare global {
  var prisma: PrismaClient | undefined
}
