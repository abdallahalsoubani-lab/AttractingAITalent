/**
 * مكتبة المصادقة والتفويض
 *
 * تحتوي على:
 * - إعدادات NextAuth
 * - دوال التحقق من الصلاحيات
 * - دوال معالجة الأدوار
 */

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

/**
 * إعدادات NextAuth الأساسية
 *
 * سيتم توسيع هذا لاحقاً ليشمل:
 * - قاعدة البيانات الفعلية
 * - معالجة كلمات المرور المشفرة
 * - التحديثات التلقائية للـ tokens
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // سيتم استبدال هذا بمصادقة قاعدة البيانات الفعلية
        if (
          credentials?.email === 'demo@example.com' &&
          credentials?.password === 'demo123'
        ) {
          return {
            id: '1',
            email: 'demo@example.com',
            name: 'Demo User',
            role: 'HR_SPECIALIST',
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
        (session.user as any).role = token.role
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

/**
 * أنواع الأدوار والصلاحيات
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  HR_SPECIALIST = 'HR_SPECIALIST',
  TECH_REVIEWER = 'TECH_REVIEWER',
  CONSULTANT = 'CONSULTANT',
  VIEWER = 'VIEWER',
}

/**
 * تحديد الصلاحيات لكل دور
 */
export const rolePermissions = {
  [UserRole.ADMIN]: [
    'CREATE_USER',
    'EDIT_USER',
    'DELETE_USER',
    'CREATE_PROJECT',
    'EDIT_PROJECT',
    'CREATE_JOB',
    'EDIT_JOB',
    'DELETE_JOB',
    'CREATE_CANDIDATE',
    'EDIT_CANDIDATE',
    'DELETE_CANDIDATE',
    'EVALUATE_CANDIDATE',
    'CREATE_OFFER',
    'VIEW_REPORTS',
    'MANAGE_SETTINGS',
  ],
  [UserRole.HR_MANAGER]: [
    'CREATE_PROJECT',
    'EDIT_PROJECT',
    'CREATE_JOB',
    'EDIT_JOB',
    'CREATE_CANDIDATE',
    'EDIT_CANDIDATE',
    'VIEW_REPORTS',
    'MANAGE_HR_TEAM',
  ],
  [UserRole.HR_SPECIALIST]: [
    'CREATE_CANDIDATE',
    'EDIT_CANDIDATE',
    'CREATE_APPLICATION',
    'SCHEDULE_INTERVIEW',
    'EVALUATE_CANDIDATE',
    'CREATE_OFFER',
  ],
  [UserRole.TECH_REVIEWER]: [
    'VIEW_CANDIDATE',
    'EVALUATE_CANDIDATE',
    'VIEW_APPLICATIONS',
  ],
  [UserRole.CONSULTANT]: [
    'VIEW_CANDIDATE',
    'VIEW_APPLICATIONS',
    'VIEW_REPORTS',
  ],
  [UserRole.VIEWER]: [
    'VIEW_CANDIDATE',
    'VIEW_APPLICATIONS',
  ],
}

/**
 * التحقق من صلاحية المستخدم
 */
export function hasPermission(userRole: UserRole, permission: string): boolean {
  const permissions = rolePermissions[userRole] || []
  return permissions.includes(permission)
}

/**
 * التحقق من أن المستخدم لديه أحد الأدوار المحددة
 */
export function hasRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole)
}
