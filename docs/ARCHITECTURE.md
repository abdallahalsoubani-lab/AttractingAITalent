# بنية النظام

## 🏗️ المعمارية العامة

```
┌─────────────────────────────────────────────────────────────┐
│                      المستخدم النهائي                        │
│                    (متصفح الويب - RTL)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
│  • Next.js 14 (App Router)                                 │
│  • React 18 + TypeScript                                   │
│  • Tailwind CSS + Shadcn UI                                │
│  • الحالة: React Hooks + Context API                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Routes)                       │
│  • /api/auth/* - المصادقة (NextAuth.js)                    │
│  • /api/jobs/* - الوظائف                                   │
│  • /api/candidates/* - المرشحين                            │
│  • /api/applications/* - التقديمات                         │
│  • /api/interviews/* - المقابلات                           │
│  • /api/ai/* - خدمات الذكاء الاصطناعي                       │
│  • /api/cron/* - الوظائف المجدولة                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
      ┌────────────────────┼────────────────────┐
      ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Database     │   │ OpenAI API   │   │ External     │
│ (PostgreSQL) │   │ • GPT-4o     │   │ APIs         │
│ + pgvector   │   │ • Embeddings │   │ • Scholar    │
│              │   │ • Whisper    │   │ • ORCID      │
└──────────────┘   └──────────────┘   └──────────────┘
```

## 📁 هيكل الملفات

```
ai-recruitment-system/
│
├── app/                           # Next.js Pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   │
│   ├── (dashboard)/               # Protected pages
│   │   ├── dashboard/page.tsx
│   │   ├── jobs/
│   │   ├── candidates/
│   │   ├── pipeline/
│   │   ├── interviews/
│   │   ├── evaluations/
│   │   └── reports/
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/
│   │   ├── jobs/
│   │   ├── candidates/
│   │   ├── applications/
│   │   ├── interviews/
│   │   ├── evaluations/
│   │   ├── reports/
│   │   ├── ai/
│   │   └── cron/
│   │
│   ├── globals.css
│   └── layout.tsx
│
├── src/
│   ├── components/               # Reusable components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── forms/               # Input forms
│   │   │   ├── JobForm.tsx
│   │   │   ├── CandidateForm.tsx
│   │   │   └── EvaluationForm.tsx
│   │   │
│   │   ├── tables/              # Data tables
│   │   │   ├── JobsTable.tsx
│   │   │   ├── CandidatesTable.tsx
│   │   │   └── ApplicationsTable.tsx
│   │   │
│   │   ├── kanban/              # Pipeline Kanban
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── KanbanColumn.tsx
│   │   │   └── KanbanCard.tsx
│   │   │
│   │   ├── charts/              # Charts and graphs
│   │   │   ├── FunnelChart.tsx
│   │   │   ├── TimeToHireChart.tsx
│   │   │   └── KPIDashboard.tsx
│   │   │
│   │   └── common/              # Common components
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       ├── Toast.tsx
│   │       └── Loading.tsx
│   │
│   ├── lib/                     # Utilities
│   │   ├── ai/
│   │   │   ├── openai.ts       # OpenAI client setup
│   │   │   ├── cvParser.ts     # CV analysis
│   │   │   ├── evaluator.ts    # AI evaluation
│   │   │   ├── summarizer.ts   # Text summarization
│   │   │   └── embeddings.ts   # Vector embeddings
│   │   │
│   │   ├── experts/
│   │   │   ├── semanticScholar.ts
│   │   │   ├── orcid.ts
│   │   │   ├── classifier.ts   # Level classification
│   │   │   └── enricher.ts     # Data enrichment
│   │   │
│   │   ├── api/
│   │   │   ├── jobs.ts         # Job API methods
│   │   │   ├── candidates.ts   # Candidate API methods
│   │   │   ├── applications.ts # Application API methods
│   │   │   └── interviews.ts   # Interview API methods
│   │   │
│   │   ├── database.ts         # Prisma client
│   │   ├── auth.ts             # Auth utilities
│   │   ├── validation.ts       # Form validation
│   │   └── utils.ts            # General utilities
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts          # Auth hook
│   │   ├── useJobs.ts          # Jobs data hook
│   │   ├── useCandidates.ts    # Candidates data hook
│   │   ├── useApplications.ts  # Applications hook
│   │   ├── useToast.ts         # Toast notifications
│   │   └── useDebounce.ts      # Debounce hook
│   │
│   ├── types/                  # TypeScript types
│   │   ├── index.ts            # Common types
│   │   ├── api.ts              # API types
│   │   ├── models.ts           # Database models
│   │   └── forms.ts            # Form types
│   │
│   └── styles/                 # Global styles
│       └── variables.css       # CSS variables
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Seed data
│   └── migrations/             # Database migrations
│
├── docs/
│   ├── SETUP.md
│   ├── DATABASE.md
│   ├── ARCHITECTURE.md
│   ├── PAGES.md
│   ├── API.md
│   └── AI_TOOLS.md
│
├── public/
│   ├── images/
│   └── fonts/
│
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
│
├── run.sh                      # Startup script
└── stop.sh                     # Shutdown script
```

## 🔄 تدفق البيانات

### 1. Pipeline التقديم

```
CV Upload
    ↓
Parse CV (GPT-4o)
    ↓
Extract Skills & Experience
    ↓
Create Candidate Record
    ↓
Create Application
    ↓
Initial Screening (AI)
    ↓
Shortlisting
    ↓
Schedule Interview
    ↓
Conduct Interview (Record)
    ↓
Transcribe (Whisper)
    ↓
Evaluate (GPT-4o + Human)
    ↓
Offer Decision
    ↓
Extend Offer
    ↓
Acceptance/Rejection
```

### 2. تدفق الخبراء التلقائي

```
Weekly Cron Job (الأحد)
    ↓
Search Semantic Scholar
    ↓
Search ORCID
    ↓
Classify Level (ELITE/TOP/EMERGING)
    ↓
Enrich with GPT-4o
    ↓
Store in Database
    ↓
Update Embeddings (for Search)
```

## 🎯 طبقات التطبيق

### 1. Presentation Layer
- **المكونات**: صفحات Next.js ومكونات React
- **الأسلوب**: RTL عربي 100%
- **الحالة**: React Hooks و Context API
- **التوقيت الفعلي**: Socket.io (اختياري)

### 2. Business Logic Layer
- **معالجة الطلبات**: API Routes
- **التحقق من البيانات**: Zod validation
- **المصادقة**: NextAuth.js
- **الصلاحيات**: Role-based access control

### 3. Data Access Layer
- **ORM**: Prisma
- **الاستعلامات**: Prisma Client
- **العلاقات**: معالجة جميع العلاقات الخارجية

### 4. External Services Layer
- **OpenAI**: GPT-4o, Embeddings, Whisper
- **Semantic Scholar**: بيانات الأبحاث
- **ORCID**: بيانات الباحثين

## 🔐 الأمان

### Authentication
```
User Login
    ↓
Email & Password Validation
    ↓
Hash password (bcryptjs)
    ↓
Create JWT Token (NextAuth)
    ↓
Set Secure Cookie
    ↓
Redirect to Dashboard
```

### Authorization
```
Each API Route
    ↓
Check Session
    ↓
Check User Role
    ↓
Check Resource Ownership
    ↓
Allow/Deny Access
```

### Data Protection
- ✅ Passwords hashed dengan bcryptjs
- ✅ All API calls require authentication
- ✅ CORS configured
- ✅ SQL Injection prevention via Prisma
- ✅ XSS prevention via React escaping
- ✅ CSRF protection via NextAuth

## 📊 الأداء والتحسينات

### Caching Strategy
```
Frontend
├── React Query (Data Fetching)
├── Next.js Image Optimization
└── Service Workers (Offline)

Backend
├── Prisma Query Caching
├── Database Indexes
└── Redis (اختياري للـ sessions)
```

### Database Optimization
```
Indexes
├── ON candidates(email)
├── ON applications(candidateId, jobId)
├── ON interviews(applicationId)
└── ON candidates USING gin(full_text_search)

Relationships
├── Lazy Loading
├── Eager Loading (where needed)
└── Select specific fields
```

## 🚀 Deployment

### Docker Build Process
```
1. Build Frontend
   └── npm run build

2. Generate Prisma Client
   └── npx prisma generate

3. Create Docker Image
   └── Multi-stage build

4. Deploy Container
   └── Run on port 3000
```

### Environment Variables
```
.env.local (Development)
├── DATABASE_URL
├── NEXTAUTH_SECRET
├── NEXTAUTH_URL
├── OPENAI_API_KEY
└── CRON_SECRET

.env.production (Production)
├── DATABASE_URL (prod database)
├── NEXTAUTH_SECRET (long random string)
├── NEXTAUTH_URL (production domain)
├── OPENAI_API_KEY (prod key)
└── CRON_SECRET (prod cron secret)
```

## 🔌 Integration Points

### External APIs
```
OpenAI
├── ChatCompletions (/v1/chat/completions)
├── Embeddings (/v1/embeddings)
└── Audio (/v1/audio/transcriptions)

Semantic Scholar
├── Search Authors (/graph/v1/author/search)
└── Author Details (/graph/v1/author/{id})

ORCID
├── Search (/search/)
└── Record (/record/)
```

## 📈 Monitoring & Logging

### Logging Strategy
```
Frontend
├── Console logs (dev)
└── Error tracking (Sentry)

Backend
├── API request logs
├── Database query logs
├── Error logs
└── Audit logs (ActivityLog table)

Database
└── Query performance
```

---

**آخر تحديث**: 13 يناير 2026
