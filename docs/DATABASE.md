# شرح قاعدة البيانات

## 📊 نظرة عامة

قاعدة البيانات مبنية باستخدام:
- **PostgreSQL 16** - قاعدة البيانات الرئيسية
- **pgvector** - لتخزين واستعلام متجهات الـ embeddings
- **Prisma ORM** - لإدارة البيانات بسهولة

## 🗂️ الجداول الرئيسية

### 1. Users (المستخدمين)

```sql
CREATE TABLE users (
  id CUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  password VARCHAR,
  name VARCHAR,
  nameAr VARCHAR,
  role UserRole DEFAULT 'VIEWER',
  avatar VARCHAR,
  phone VARCHAR,
  department VARCHAR,
  isActive BOOLEAN DEFAULT true,
  lastLogin TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP
);

ENUM UserRole {
  ADMIN,
  HR_MANAGER,
  HR_SPECIALIST,
  TECH_REVIEWER,
  CONSULTANT,
  VIEWER
}
```

**الأدوار والصلاحيات:**
- **ADMIN**: صلاحيات كاملة في النظام
- **HR_MANAGER**: إدارة المشاريع والوظائف والمرشحين
- **HR_SPECIALIST**: تنفيذ عمليات التوظيف
- **TECH_REVIEWER**: تقييم تقني فقط
- **CONSULTANT**: استشاري (عرض فقط)
- **VIEWER**: مشاهد عام

### 2. Projects (المشاريع)

```sql
CREATE TABLE projects (
  id CUID PRIMARY KEY,
  name VARCHAR,
  nameAr VARCHAR,
  description TEXT,
  descriptionAr TEXT,
  status ProjectStatus DEFAULT 'ACTIVE',
  startDate TIMESTAMP,
  endDate TIMESTAMP,
  budget DECIMAL(12,2),
  charterDoc VARCHAR,  -- رابط وثيقة الميثاق
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP
);

ENUM ProjectStatus {
  DRAFT,
  ACTIVE,
  ON_HOLD,
  COMPLETED,
  CANCELLED
}
```

**الاستخدام:**
- تجميع الوظائف المرتبطة
- تتبع ميثاق المشروع (Charter)
- إدارة المخاطر والقرارات

### 3. Jobs (الوظائف)

```sql
CREATE TABLE jobs (
  id CUID PRIMARY KEY,
  projectId CUID,
  trackId CUID,
  levelId CUID,
  createdById CUID NOT NULL,

  title VARCHAR,
  titleAr VARCHAR,
  description TEXT,
  descriptionAr TEXT,

  department VARCHAR,
  location VARCHAR,
  isRemote BOOLEAN DEFAULT false,

  salaryMin DECIMAL(10,2),
  salaryMax DECIMAL(10,2),
  currency VARCHAR DEFAULT 'SAR',

  status JobStatus DEFAULT 'DRAFT',
  priority Priority DEFAULT 'MEDIUM',

  openings INT DEFAULT 1,
  deadline TIMESTAMP,

  rubricJson JSON,  -- معايير التقييم

  createdAt TIMESTAMP DEFAULT NOW(),
  publishedAt TIMESTAMP,
  closedAt TIMESTAMP
);

ENUM JobStatus {
  DRAFT, OPEN, ON_HOLD, CLOSED, FILLED
}

ENUM Priority {
  LOW, MEDIUM, HIGH, URGENT
}
```

**rubricJson المثال:**
```json
{
  "criteria": [
    {
      "name": "Technical Skills",
      "weight": 30,
      "description": "Skills in Python, ML frameworks"
    },
    {
      "name": "Experience",
      "weight": 25,
      "description": "Years in AI/ML field"
    },
    {
      "name": "Problem Solving",
      "weight": 20,
      "description": "Ability to solve complex problems"
    },
    {
      "name": "Communication",
      "weight": 15,
      "description": "Communication abilities"
    },
    {
      "name": "Teamwork",
      "weight": 10,
      "description": "Collaboration and teamwork"
    }
  ]
}
```

### 4. Candidates (المرشحين)

```sql
CREATE TABLE candidates (
  id CUID PRIMARY KEY,
  addedById CUID NOT NULL,

  firstName VARCHAR,
  lastName VARCHAR,
  firstNameAr VARCHAR,
  lastNameAr VARCHAR,
  email VARCHAR UNIQUE,
  phone VARCHAR,

  country VARCHAR,
  city VARCHAR,
  nationality VARCHAR,

  linkedinUrl VARCHAR,
  githubUrl VARCHAR,
  portfolioUrl VARCHAR,
  scholarUrl VARCHAR,

  cvUrl VARCHAR,
  cvParsedJson JSON,  -- السيرة المحللة

  aiSummary TEXT,
  aiStrengths STRING[],
  aiWeaknesses STRING[],

  tags STRING[],
  source VARCHAR,

  yearsExperience INT,
  currentCompany VARCHAR,
  currentTitle VARCHAR,
  expectedSalary DECIMAL(10,2),
  noticePeriod INT,  -- بالأيام

  isBlacklisted BOOLEAN DEFAULT false,
  blacklistReason VARCHAR,

  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP
);
```

**cvParsedJson المثال:**
```json
{
  "personalInfo": {
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "phone": "+966501234567"
  },
  "summary": "AI Engineer with 5 years experience",
  "skills": ["Python", "TensorFlow", "PyTorch"],
  "experience": [
    {
      "company": "Tech Corp",
      "position": "Senior AI Engineer",
      "duration": "2020-2024",
      "description": "Led ML projects"
    }
  ],
  "education": [
    {
      "degree": "BS Computer Science",
      "university": "University Name",
      "year": "2019"
    }
  ]
}
```

### 5. Applications (التقديمات)

```sql
CREATE TABLE applications (
  id CUID PRIMARY KEY,
  candidateId CUID NOT NULL,
  jobId CUID NOT NULL,

  stage ApplicationStage DEFAULT 'NEW',
  status ApplicationStatus DEFAULT 'ACTIVE',

  matchScore DECIMAL(5,2),  -- 0-100
  aiRanking INT,

  appliedAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP,

  rejectionReason VARCHAR,
  withdrawReason VARCHAR
);

ENUM ApplicationStage {
  NEW, SCREENED, SHORTLISTED, TECH_INTERVIEW,
  HR_INTERVIEW, FINAL_INTERVIEW, OFFER, HIRED,
  REJECTED, WITHDRAWN
}

ENUM ApplicationStatus {
  ACTIVE, ON_HOLD, CLOSED
}
```

### 6. Interviews (المقابلات)

```sql
CREATE TABLE interviews (
  id CUID PRIMARY KEY,
  applicationId CUID NOT NULL,
  kitId CUID,

  type InterviewType,
  title VARCHAR,
  scheduledAt TIMESTAMP,
  duration INT DEFAULT 60,
  location VARCHAR,
  isRemote BOOLEAN DEFAULT true,

  status InterviewStatus DEFAULT 'SCHEDULED',

  recordingUrl VARCHAR,
  transcriptUrl VARCHAR,
  aiSummary TEXT,

  createdAt TIMESTAMP DEFAULT NOW()
);

ENUM InterviewType {
  PHONE_SCREEN, TECHNICAL, BEHAVIORAL,
  SYSTEM_DESIGN, FINAL, HR
}

ENUM InterviewStatus {
  SCHEDULED, CONFIRMED, IN_PROGRESS,
  COMPLETED, CANCELLED, NO_SHOW
}
```

### 7. Evaluations (التقييمات)

```sql
CREATE TABLE evaluations (
  id CUID PRIMARY KEY,
  applicationId CUID NOT NULL,
  evaluatorId CUID NOT NULL,

  type EvaluationType,
  overallScore DECIMAL(4,2),  -- 0-10

  scoresJson JSON,
  strengths STRING[],
  weaknesses STRING[],
  recommendation TEXT,

  isAiGenerated BOOLEAN DEFAULT false,
  humanOverride BOOLEAN DEFAULT false,
  overrideReason VARCHAR,

  createdAt TIMESTAMP DEFAULT NOW()
);

ENUM EvaluationType {
  CV_SCREENING, TECHNICAL_INTERVIEW,
  HR_INTERVIEW, FINAL_INTERVIEW, OVERALL
}
```

**scoresJson المثال:**
```json
{
  "criteria": {
    "technicalSkills": {
      "score": 8.5,
      "weight": 30,
      "evidence": "Strong Python and ML knowledge"
    },
    "experience": {
      "score": 7.0,
      "weight": 25,
      "evidence": "3 years in data science"
    },
    "problemSolving": {
      "score": 8.0,
      "weight": 20,
      "evidence": "Good approach to technical problems"
    },
    "communication": {
      "score": 7.5,
      "weight": 15,
      "evidence": "Clear explanations"
    },
    "teamwork": {
      "score": 7.0,
      "weight": 10,
      "evidence": "Collaborative approach"
    }
  },
  "overallScore": 7.65
}
```

### 8. AiExperts (خبراء AI)

```sql
CREATE TABLE ai_experts (
  id CUID PRIMARY KEY,

  name VARCHAR,
  nameAr VARCHAR,
  email VARCHAR,

  affiliation VARCHAR,  -- الجهة
  country VARCHAR,

  level ExpertLevel,
  specializations STRING[],

  hIndex INT,
  citations INT,
  publications INT,

  semanticScholarId VARCHAR UNIQUE,
  orcidId VARCHAR UNIQUE,
  dblpId VARCHAR,

  googleScholar VARCHAR,
  linkedinUrl VARCHAR,
  personalWebsite VARCHAR,

  summary TEXT,
  notableWork STRING[],

  lastUpdated TIMESTAMP DEFAULT NOW(),
  createdAt TIMESTAMP DEFAULT NOW(),
  isAutoImported BOOLEAN DEFAULT true
);

ENUM ExpertLevel {
  ELITE,      -- H-Index > 50
  TOP,        -- H-Index > 25
  EMERGING    -- H-Index > 10 أو مواهب واعدة
}
```

### 9. Reports (التقارير)

```sql
CREATE TABLE reports (
  id CUID PRIMARY KEY,
  projectId CUID,

  type ReportType,
  title VARCHAR,
  titleAr VARCHAR,

  period VARCHAR,  -- مثل: 2024-01

  dataJson JSON,      -- بيانات التقرير
  insightsJson JSON,  -- توصيات AI

  documentUrl VARCHAR,

  createdAt TIMESTAMP DEFAULT NOW(),
  publishedAt TIMESTAMP
);

ENUM ReportType {
  MONTHLY_RECRUITMENT,
  MONTHLY_EXPERTS,
  KPI_DASHBOARD,
  LESSONS_LEARNED,
  CUSTOM
}
```

## 🔍 العلاقات المهمة

```
Projects
  ├── Jobs (وظائف المشروع)
  ├── Decisions (قرارات المشروع)
  ├── Risks (مخاطر المشروع)
  └── Reports (تقارير المشروع)

Jobs
  ├── Applications (تقديمات على الوظيفة)
  ├── SkillRequirements (المهارات المطلوبة)
  ├── InterviewKits (أسئلة المقابلات)
  └── SourcingChannels (قنوات الاستقطاب)

Candidates
  ├── Applications (تقديمات المرشح)
  ├── CandidateSkills (مهارات المرشح)
  └── CandidateDocuments (ملفات المرشح)

Applications
  ├── Interviews (مقابلات التقديم)
  ├── Evaluations (تقييمات التقديم)
  ├── Offers (عروض للتقديم)
  └── StageHistory (سجل حركات المراحل)
```

## 🔐 Indexes المهمة

```sql
-- للبحث السريع
CREATE INDEX ON candidates(email);
CREATE INDEX ON candidates(linkedinUrl);
CREATE INDEX ON applications(candidateId, jobId);
CREATE INDEX ON interviews(applicationId);

-- للترتيب والفلترة
CREATE INDEX ON applications(stage);
CREATE INDEX ON jobs(status);
CREATE INDEX ON candidates(createdAt);

-- للـ Full Text Search
CREATE INDEX ON candidates USING gin(tsv_vector);
```

## 🎯 أمثلة استعلامات شائعة

### البحث عن مرشحين بمهارة معينة
```sql
SELECT c.* FROM candidates c
JOIN candidate_skills cs ON c.id = cs.candidate_id
JOIN skills s ON cs.skill_id = s.id
WHERE s.name = 'Python' AND cs.level >= 3;
```

### الحصول على حالة Pipeline للوظيفة
```sql
SELECT
  stage,
  COUNT(*) as count
FROM applications
WHERE job_id = 'job-123'
GROUP BY stage;
```

### أفضل مرشحين للوظيفة
```sql
SELECT
  c.*,
  a.match_score
FROM candidates c
JOIN applications a ON c.id = a.candidate_id
WHERE a.job_id = 'job-123'
ORDER BY a.match_score DESC
LIMIT 10;
```

## 💾 النسخ الاحتياطية

### إنشاء نسخة احتياطية
```bash
docker-compose exec db pg_dump -U postgres ai_recruitment > backup.sql
```

### استعادة من نسخة احتياطية
```bash
docker-compose exec -T db psql -U postgres ai_recruitment < backup.sql
```

## 📈 تحسين الأداء

### تحليل الاستعلام
```bash
# تشغيل EXPLAIN ANALYZE
docker-compose exec db psql -U postgres ai_recruitment
postgres=# EXPLAIN ANALYZE SELECT ...;
```

### مراقبة القاعدة
```bash
# عرض الاتصالات النشطة
docker-compose exec db psql -U postgres ai_recruitment -c "SELECT * FROM pg_stat_activity;"
```

---

**آخر تحديث**: 13 يناير 2026
