import { PrismaClient, UserRole, ProjectStatus, JobStatus, Priority, ApplicationStage, ExpertLevel } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 بدء تحميل البيانات التجريبية...')

  // Clean existing data
  console.log('🗑️  حذف البيانات القديمة...')
  await prisma.activityLog.deleteMany({})
  await prisma.comment.deleteMany({})
  await prisma.offerHistory.deleteMany({})
  await prisma.offer.deleteMany({})
  await prisma.evaluation.deleteMany({})
  await prisma.interviewNote.deleteMany({})
  await prisma.interviewPanel.deleteMany({})
  await prisma.interview.deleteMany({})
  await prisma.interviewQuestion.deleteMany({})
  await prisma.interviewKit.deleteMany({})
  await prisma.stageHistory.deleteMany({})
  await prisma.application.deleteMany({})
  await prisma.candidateDocument.deleteMany({})
  await prisma.candidateSkill.deleteMany({})
  await prisma.candidate.deleteMany({})
  await prisma.sourcingChannel.deleteMany({})
  await prisma.skillRequirement.deleteMany({})
  await prisma.job.deleteMany({})
  await prisma.skill.deleteMany({})
  await prisma.careerLevel.deleteMany({})
  await prisma.careerTrack.deleteMany({})
  await prisma.raciEntry.deleteMany({})
  await prisma.decision.deleteMany({})
  await prisma.risk.deleteMany({})
  await prisma.projectMember.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.report.deleteMany({})
  await prisma.aiExpert.deleteMany({})
  await prisma.user.deleteMany({})

  // Create users
  console.log('👥 إنشاء المستخدمين...')
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      nameAr: 'مدير النظام',
      role: UserRole.ADMIN,
      phone: '+966501234567',
      department: 'IT',
      isActive: true,
    },
  })

  const hrManager = await prisma.user.create({
    data: {
      email: 'hr@example.com',
      password: await bcrypt.hash('hr123', 10),
      name: 'HR Manager',
      nameAr: 'مدير الموارد البشرية',
      role: UserRole.HR_MANAGER,
      phone: '+966502234567',
      department: 'HR',
      isActive: true,
    },
  })

  const techReviewer = await prisma.user.create({
    data: {
      email: 'tech@example.com',
      password: await bcrypt.hash('tech123', 10),
      name: 'Tech Reviewer',
      nameAr: 'مراجع تقني',
      role: UserRole.TECH_REVIEWER,
      phone: '+966503234567',
      department: 'Engineering',
      isActive: true,
    },
  })

  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: await bcrypt.hash('demo123', 10),
      name: 'Demo User',
      nameAr: 'مستخدم تجريبي',
      role: UserRole.HR_SPECIALIST,
      phone: '+966504234567',
      department: 'HR',
      isActive: true,
    },
  })

  // Create projects
  console.log('📋 إنشاء المشاريع...')
  const project1 = await prisma.project.create({
    data: {
      name: 'AI Talent Acquisition 2025',
      nameAr: 'استقطاب كفاءات الذكاء الاصطناعي 2025',
      description: 'Strategic initiative to recruit AI talents',
      descriptionAr: 'مبادرة استراتيجية لاستقطاب كفاءات الذكاء الاصطناعي',
      status: ProjectStatus.ACTIVE,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      budget: 500000,
    },
  })

  // Create career tracks
  console.log('🎯 إنشاء المسارات الوظيفية...')
  const mlTrack = await prisma.careerTrack.create({
    data: {
      name: 'Machine Learning Engineer',
      nameAr: 'مهندس تعلم آلي',
      description: 'ML and Deep Learning Specialization',
      descriptionAr: 'تخصص في التعلم الآلي والتعلم العميق',
      category: 'AI',
    },
  })

  const dataTrack = await prisma.careerTrack.create({
    data: {
      name: 'Data Scientist',
      nameAr: 'عالم بيانات',
      description: 'Data Science and Analytics',
      descriptionAr: 'تحليل البيانات والإحصائيات',
      category: 'Data',
    },
  })

  // Create career levels
  console.log('📊 إنشاء مستويات المسارات الوظيفية...')
  const juniorLevel = await prisma.careerLevel.create({
    data: {
      trackId: mlTrack.id,
      name: 'Junior Engineer',
      nameAr: 'مهندس مبتدئ',
      yearsMin: 0,
      yearsMax: 2,
      salaryMin: 80000,
      salaryMax: 120000,
    },
  })

  const seniorLevel = await prisma.careerLevel.create({
    data: {
      trackId: mlTrack.id,
      name: 'Senior Engineer',
      nameAr: 'مهندس أول',
      yearsMin: 5,
      yearsMax: 10,
      salaryMin: 200000,
      salaryMax: 300000,
    },
  })

  // Create skills
  console.log('🛠️  إنشاء المهارات...')
  const pythonSkill = await prisma.skill.create({
    data: {
      name: 'Python',
      nameAr: 'بايثون',
      category: 'Technical',
      description: 'Python Programming Language',
    },
  })

  const tensorflowSkill = await prisma.skill.create({
    data: {
      name: 'TensorFlow',
      nameAr: 'تينسرفلو',
      category: 'Technical',
      description: 'TensorFlow ML Framework',
    },
  })

  const communicationSkill = await prisma.skill.create({
    data: {
      name: 'Communication',
      nameAr: 'التواصل',
      category: 'Soft',
      description: 'Communication and Presentation Skills',
    },
  })

  // Create jobs
  console.log('💼 إنشاء الوظائف...')
  const job1 = await prisma.job.create({
    data: {
      projectId: project1.id,
      trackId: mlTrack.id,
      levelId: seniorLevel.id,
      createdById: hrManager.id,
      title: 'Senior ML Engineer',
      titleAr: 'مهندس تعلم آلي أول',
      description: 'We are looking for a Senior ML Engineer with 5+ years experience',
      descriptionAr: 'نبحث عن مهندس تعلم آلي أول مع خبرة 5 سنوات فأكثر',
      department: 'AI Research',
      location: 'Riyadh',
      isRemote: false,
      salaryMin: 200000,
      salaryMax: 300000,
      currency: 'SAR',
      status: JobStatus.OPEN,
      priority: Priority.HIGH,
      openings: 2,
      deadline: new Date('2025-02-28'),
      publishedAt: new Date(),
      rubricJson: {
        criteria: [
          {
            name: 'Technical Skills',
            weight: 30,
            description: 'Proficiency in Python, TensorFlow, PyTorch',
          },
          {
            name: 'Experience',
            weight: 25,
            description: '5+ years in ML field',
          },
          {
            name: 'Problem Solving',
            weight: 20,
            description: 'Ability to solve complex ML problems',
          },
          {
            name: 'Communication',
            weight: 15,
            description: 'Clear communication abilities',
          },
          {
            name: 'Teamwork',
            weight: 10,
            description: 'Collaboration and teamwork',
          },
        ],
      },
      skillRequirements: {
        create: [
          {
            skillId: pythonSkill.id,
            importance: 'REQUIRED',
            minLevel: 4,
          },
          {
            skillId: tensorflowSkill.id,
            importance: 'REQUIRED',
            minLevel: 3,
          },
          {
            skillId: communicationSkill.id,
            importance: 'PREFERRED',
            minLevel: 3,
          },
        ],
      },
    },
  })

  // Create candidates
  console.log('👤 إنشاء المرشحين...')
  const candidate1 = await prisma.candidate.create({
    data: {
      addedById: hrManager.id,
      firstName: 'Ahmed',
      lastName: 'Al-Khaldi',
      firstNameAr: 'أحمد',
      lastNameAr: 'الخالدي',
      email: 'ahmed.alkhaldi@example.com',
      phone: '+966501111111',
      country: 'Saudi Arabia',
      city: 'Riyadh',
      nationality: 'Saudi',
      linkedinUrl: 'https://linkedin.com/in/ahmedkhaldi',
      yearsExperience: 6,
      currentCompany: 'Tech Corp',
      currentTitle: 'ML Engineer',
      expectedSalary: 250000,
      source: 'LinkedIn',
      aiSummary: 'Strong ML engineer with 6 years experience in deep learning',
      aiStrengths: ['Python', 'TensorFlow', 'Deep Learning'],
      aiWeaknesses: ['Project management'],
      tags: ['AI', 'ML', 'Python'],
      skills: {
        create: [
          {
            skillId: pythonSkill.id,
            level: 5,
            verified: true,
            yearsUsed: 6,
          },
          {
            skillId: tensorflowSkill.id,
            level: 4,
            verified: true,
            yearsUsed: 4,
          },
        ],
      },
    },
  })

  // Create applications
  console.log('📝 إنشاء التقديمات...')
  const application1 = await prisma.application.create({
    data: {
      candidateId: candidate1.id,
      jobId: job1.id,
      stage: ApplicationStage.SHORTLISTED,
      matchScore: 92.5,
      aiRanking: 1,
      appliedAt: new Date('2025-01-10'),
    },
  })

  // Create AI Experts
  console.log('🧠 إنشاء خبراء الذكاء الاصطناعي...')
  await prisma.aiExpert.create({
    data: {
      name: 'Yoshua Bengio',
      nameAr: 'يوشوع بينجيو',
      affiliation: 'Mila, University of Montreal',
      country: 'Canada',
      level: ExpertLevel.ELITE,
      specializations: ['Deep Learning', 'Neural Networks', 'AI Safety'],
      hIndex: 180,
      citations: 500000,
      publications: 450,
      semanticScholarId: 'Y_Bengio_1234',
      summary: 'Pioneer in deep learning and neural networks',
      notableWork: [
        'Backpropagation algorithm',
        'LSTM networks',
        'Attention mechanisms',
      ],
    },
  })

  await prisma.aiExpert.create({
    data: {
      name: 'Yann LeCun',
      nameAr: 'يان لوكان',
      affiliation: 'Facebook AI Research',
      country: 'United States',
      level: ExpertLevel.ELITE,
      specializations: ['Computer Vision', 'Convolutional Neural Networks'],
      hIndex: 170,
      citations: 480000,
      publications: 400,
      semanticScholarId: 'Y_LeCun_5678',
      summary: 'Inventor of convolutional neural networks',
      notableWork: ['CNN', 'LeNet', 'Deep Learning'],
    },
  })

  // Create reports
  console.log('📊 إنشاء التقارير...')
  await prisma.report.create({
    data: {
      projectId: project1.id,
      type: 'MONTHLY_RECRUITMENT',
      title: 'Monthly Recruitment Report - January 2025',
      titleAr: 'تقرير الاستقطاب الشهري - يناير 2025',
      period: '2025-01',
      dataJson: {
        totalApplications: 50,
        screened: 30,
        shortlisted: 15,
        interviewed: 8,
        offered: 3,
        hired: 1,
      },
      insightsJson: {
        recommendations: [
          'Increase sourcing from AI communities',
          'Improve interview process efficiency',
        ],
      },
    },
  })

  console.log('✅ تم تحميل البيانات التجريبية بنجاح!')
  console.log('')
  console.log('📝 بيانات الاختبار:')
  console.log('   البريد: demo@example.com')
  console.log('   كلمة المرور: demo123')
  console.log('')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ خطأ:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
