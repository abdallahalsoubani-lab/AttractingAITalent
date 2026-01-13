# توثيق API

## 📌 ملاحظة مهمة

معظم نقاط النهاية في API تتطلب مصادقة. يتم التعامل مع المصادقة من خلال NextAuth.js مع JWT tokens.

## 🔐 المصادقة

### تسجيل الدخول

**POST** `/api/auth/signin`

```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "HR_MANAGER"
  },
  "token": "jwt-token"
}
```

### تسجيل حساب جديد

**POST** `/api/auth/register`

```json
Request:
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "nameAr": "مستخدم جديد"
}

Response:
{
  "success": true,
  "userId": "new-user-id",
  "message": "تم إنشاء الحساب بنجاح"
}
```

### الحصول على جلسة المستخدم الحالية

**GET** `/api/auth/session`

```json
Response:
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "HR_MANAGER"
  }
}
```

### تسجيل الخروج

**POST** `/api/auth/signout`

```json
Response:
{
  "success": true,
  "message": "تم تسجيل الخروج بنجاح"
}
```

## 💼 الوظائف (Jobs)

### الحصول على جميع الوظائف

**GET** `/api/jobs`

**Query Parameters:**
- `status` - تصفية حسب الحالة (OPEN, CLOSED, etc.)
- `priority` - تصفية حسب الأولوية
- `search` - بحث في العنوان والوصف
- `limit` - عدد النتائج (افتراضي: 20)
- `offset` - موضع البدء (للتصفح)

```json
Response:
{
  "data": [
    {
      "id": "job-id",
      "title": "Senior ML Engineer",
      "titleAr": "مهندس تعلم آلي أول",
      "status": "OPEN",
      "priority": "HIGH",
      "salaryMin": 200000,
      "salaryMax": 300000,
      "applicationsCount": 15,
      "createdAt": "2025-01-01"
    }
  ],
  "total": 25,
  "limit": 20,
  "offset": 0
}
```

### إنشاء وظيفة جديدة

**POST** `/api/jobs`

**Required Role:** `HR_MANAGER` أو أعلى

```json
Request:
{
  "title": "Senior ML Engineer",
  "titleAr": "مهندس تعلم آلي أول",
  "description": "Job description...",
  "descriptionAr": "وصف الوظيفة...",
  "trackId": "track-id",
  "levelId": "level-id",
  "salaryMin": 200000,
  "salaryMax": 300000,
  "location": "Riyadh",
  "isRemote": false,
  "status": "DRAFT",
  "priority": "HIGH",
  "openings": 2
}

Response:
{
  "id": "new-job-id",
  "title": "Senior ML Engineer",
  "status": "DRAFT",
  "message": "تم إنشاء الوظيفة بنجاح"
}
```

### الحصول على تفاصيل وظيفة

**GET** `/api/jobs/:jobId`

```json
Response:
{
  "id": "job-id",
  "title": "Senior ML Engineer",
  "titleAr": "مهندس تعلم آلي أول",
  "description": "...",
  "status": "OPEN",
  "priority": "HIGH",
  "salaryMin": 200000,
  "salaryMax": 300000,
  "rubric": {
    "criteria": [...]
  },
  "skillRequirements": [
    {
      "skillId": "skill-id",
      "skillName": "Python",
      "importance": "REQUIRED",
      "minLevel": 4
    }
  ],
  "applications": [...]
}
```

### تحديث وظيفة

**PATCH** `/api/jobs/:jobId`

**Required Role:** `HR_MANAGER` أو الذي أنشأ الوظيفة

```json
Request:
{
  "status": "OPEN",
  "priority": "MEDIUM",
  "salaryMax": 320000
}

Response:
{
  "success": true,
  "message": "تم تحديث الوظيفة بنجاح"
}
```

## 👤 المرشحين (Candidates)

### الحصول على جميع المرشحين

**GET** `/api/candidates`

**Query Parameters:**
- `search` - بحث في الاسم والبريد
- `skills` - تصفية حسب المهارات
- `experience` - تصفية حسب سنوات الخبرة
- `limit` - عدد النتائج
- `offset` - موضع البدء

```json
Response:
{
  "data": [
    {
      "id": "candidate-id",
      "name": "Ahmed Al-Khaldi",
      "email": "ahmed@example.com",
      "yearsExperience": 6,
      "skills": ["Python", "TensorFlow"],
      "currentCompany": "Tech Corp",
      "source": "LinkedIn",
      "matchScore": 92.5
    }
  ],
  "total": 50
}
```

### إنشاء مرشح جديد

**POST** `/api/candidates`

**Required Role:** `HR_SPECIALIST` أو أعلى

```json
Request:
{
  "firstName": "Ahmed",
  "lastName": "Al-Khaldi",
  "firstNameAr": "أحمد",
  "lastNameAr": "الخالدي",
  "email": "ahmed@example.com",
  "phone": "+966501111111",
  "yearsExperience": 6,
  "currentCompany": "Tech Corp",
  "currentTitle": "ML Engineer",
  "skills": ["Python", "TensorFlow"],
  "source": "LinkedIn"
}

Response:
{
  "id": "new-candidate-id",
  "name": "Ahmed Al-Khaldi",
  "message": "تم إضافة المرشح بنجاح"
}
```

### تحليل السيرة الذاتية

**POST** `/api/candidates/parse-cv`

**Required Role:** `HR_SPECIALIST` أو أعلى

```
Request: (multipart/form-data)
{
  "file": <PDF or DOCX file>,
  "extractEmails": true,
  "extractSkills": true
}

Response:
{
  "candidate": {
    "firstName": "Ahmed",
    "lastName": "Al-Khaldi",
    "email": "ahmed@example.com",
    "phone": "+966501111111",
    "yearsExperience": 6,
    "skills": ["Python", "TensorFlow", "Deep Learning"],
    "education": [...],
    "experience": [...]
  },
  "aiAnalysis": {
    "summary": "Strong ML engineer with...",
    "strengths": ["Deep expertise in ML"],
    "weaknesses": ["Limited leadership experience"]
  }
}
```

### البحث الدلالي عن المرشحين

**POST** `/api/candidates/search`

```json
Request:
{
  "query": "Machine learning engineer with Python",
  "jobId": "job-id",
  "limit": 10
}

Response:
{
  "results": [
    {
      "id": "candidate-id",
      "name": "Ahmed Al-Khaldi",
      "score": 0.92,
      "matchReasons": [
        "Has Python skill",
        "6 years ML experience",
        "Deep learning expertise"
      ]
    }
  ]
}
```

## 📝 التقديمات (Applications)

### الحصول على التقديمات

**GET** `/api/applications`

**Query Parameters:**
- `jobId` - تصفية حسب الوظيفة
- `candidateId` - تصفية حسب المرشح
- `stage` - تصفية حسب المرحلة
- `status` - تصفية حسب الحالة

```json
Response:
{
  "data": [
    {
      "id": "app-id",
      "candidateId": "candidate-id",
      "jobId": "job-id",
      "stage": "SHORTLISTED",
      "status": "ACTIVE",
      "matchScore": 92.5,
      "appliedAt": "2025-01-10"
    }
  ]
}
```

### تحديث مرحلة التقديم

**PATCH** `/api/applications/:applicationId`

```json
Request:
{
  "stage": "TECH_INTERVIEW",
  "reason": "Passed initial screening"
}

Response:
{
  "success": true,
  "message": "تم تحديث مرحلة التقديم بنجاح"
}
```

## 🎤 المقابلات (Interviews)

### جدولة مقابلة جديدة

**POST** `/api/interviews`

**Required Role:** `HR_SPECIALIST` أو أعلى

```json
Request:
{
  "applicationId": "app-id",
  "type": "TECHNICAL",
  "title": "Technical Interview",
  "scheduledAt": "2025-02-15T10:00:00Z",
  "duration": 60,
  "location": "https://zoom.us/j/123456",
  "isRemote": true,
  "panelMembers": ["user-id-1", "user-id-2"]
}

Response:
{
  "id": "interview-id",
  "applicationId": "app-id",
  "status": "SCHEDULED",
  "message": "تم جدولة المقابلة بنجاح"
}
```

### تحميل تفريغ المقابلة

**POST** `/api/interviews/:interviewId/transcript`

```json
Request:
{
  "audioUrl": "https://example.com/interview.mp3"
}

Response:
{
  "transcript": "Full transcript text...",
  "summary": "Key points from interview...",
  "aiAnalysis": {
    "strengths": [...],
    "weaknesses": [...],
    "overallAssessment": "..."
  }
}
```

## ⭐ التقييمات (Evaluations)

### إنشاء تقييم

**POST** `/api/evaluations`

**Required Role:** `TECH_REVIEWER` أو `HR_SPECIALIST`

```json
Request:
{
  "applicationId": "app-id",
  "type": "TECHNICAL_INTERVIEW",
  "scores": {
    "technicalSkills": 8.5,
    "problemSolving": 8.0,
    "communication": 7.5,
    "experience": 8.0,
    "teamwork": 7.0
  },
  "strengths": ["Strong Python skills", "Good problem solver"],
  "weaknesses": ["Limited team experience"],
  "recommendation": "RECOMMEND",
  "notes": "Very promising candidate"
}

Response:
{
  "id": "evaluation-id",
  "applicationId": "app-id",
  "overallScore": 7.8,
  "message": "تم حفظ التقييم بنجاح"
}
```

## 📊 التقارير (Reports)

### إنشاء تقرير شهري

**POST** `/api/reports`

**Required Role:** `HR_MANAGER`

```json
Request:
{
  "projectId": "project-id",
  "type": "MONTHLY_RECRUITMENT",
  "period": "2025-01"
}

Response:
{
  "id": "report-id",
  "type": "MONTHLY_RECRUITMENT",
  "period": "2025-01",
  "data": {
    "totalApplications": 50,
    "screened": 30,
    "shortlisted": 15,
    "interviewed": 8,
    "offered": 3,
    "hired": 1
  },
  "insights": {
    "recommendations": [...]
  }
}
```

## 🤖 خدمات الذكاء الاصطناعي (AI)

### توليد وصف وظيفي

**POST** `/api/ai/generate-job-description`

```json
Request:
{
  "jobTitle": "Senior ML Engineer",
  "trackId": "track-id",
  "keywords": ["Python", "Deep Learning", "Research"],
  "language": "ar"
}

Response:
{
  "description": "Generated job description...",
  "keyResponsibilities": [...],
  "requirements": [...]
}
```

### تقييم ذكي للمرشح

**POST** `/api/ai/evaluate-candidate`

```json
Request:
{
  "candidateId": "candidate-id",
  "jobId": "job-id",
  "interviewTranscript": "..."
}

Response:
{
  "overallScore": 8.2,
  "strengths": ["Deep technical knowledge"],
  "weaknesses": ["Limited industry experience"],
  "recommendation": "HIGHLY_RECOMMEND",
  "confidence": 0.95
}
```

## 🔐 أكواد الأخطاء

```
200 - OK - تمت العملية بنجاح
201 - Created - تم إنشاء مورد جديد
400 - Bad Request - طلب غير صحيح
401 - Unauthorized - غير مصرح
403 - Forbidden - محظور
404 - Not Found - لم يتم العثور على المورد
500 - Internal Server Error - خطأ في الخادم
```

## 📚 الأمثلة المتكاملة

### تدفق كامل: من التقديم إلى العرض

```bash
# 1. إنشاء وظيفة
curl -X POST http://localhost:3000/api/jobs \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior ML Engineer",
    "description": "...",
    "status": "OPEN"
  }'

# 2. إضافة مرشح
curl -X POST http://localhost:3000/api/candidates \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ahmed",
    "email": "ahmed@example.com"
  }'

# 3. إنشاء تقديم
curl -X POST http://localhost:3000/api/applications \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "candidateId": "candidate-id",
    "jobId": "job-id"
  }'

# 4. جدولة مقابلة
curl -X POST http://localhost:3000/api/interviews \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId": "app-id",
    "type": "TECHNICAL",
    "scheduledAt": "2025-02-15T10:00:00Z"
  }'

# 5. إضافة تقييم
curl -X POST http://localhost:3000/api/evaluations \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId": "app-id",
    "scores": { "technicalSkills": 8.5 }
  }'
```

---

**آخر تحديث**: 13 يناير 2026
