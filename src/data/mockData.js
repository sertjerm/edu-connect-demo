// Mock Data for EduConnect Application

export const dashboardStats = {
  totalLessons: 24,
  studentsJoined: 156,
  workSuccessRate: 89,
  averageRating: 4.8,
  totalDocuments: 342,
  activeTeachers: 12,
  completedCourses: 67,
  totalHours: 1024
};

export const subjects = [
  'ทั้งหมด',
  'คณิตศาสตร์',
  'วิทยาศาสตร์',
  'ภาษาอังกฤษ',
  'ภาษาไทย',
  'สังคมศึกษา',
  'ศิลปะ',
  'พลศึกษา',
  'คอมพิวเตอร์',
  'ดนตรี'
];

export const userRoles = [
  {
    id: 'teacher',
    name: 'อาจารย์',
    emoji: '👩‍🏫',
    description: 'สำหรับผู้สอนและผู้จัดการเนื้อหา',
    permissions: ['create', 'edit', 'delete', 'manage_users'],
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'student',
    name: 'นักเรียน',
    emoji: '👨‍🎓',
    description: 'สำหรับผู้เรียนและการเข้าถึงเนื้อหา',
    permissions: ['read', 'comment', 'submit'],
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 'admin',
    name: 'ผู้ดูแลระบบ',
    emoji: '👨‍💼',
    description: 'สำหรับการจัดการระบบทั้งหมด',
    permissions: ['all'],
    color: 'from-red-500 to-orange-500'
  }
];

export const platformFeatures = [
  'หน้าหลัก',
  'ทรัพยากรการเรียนรู้',
  'ระบบจัดการบัตร',
  'ระบบสะสมคะแนน',
  'ระบบให้คำปรึกษา',
  'อัปโหลดทรัพยากร',
  'จัดการผู้ใช้',
  'รายงานและสถิติ'
];

export const lessons = [
  {
    id: 1,
    title: 'เรขาคณิตเบื้องต้น',
    description: 'เรียนรู้เกี่ยวกับรูปทรงและการคำนวณพื้นที่',
    subject: 'คณิตศาสตร์',
    emoji: '📐',
    students: 45,
    duration: 2,
    date: 'วันนี้',
    level: 'เบื้องต้น',
    status: 'active',
    teacher: 'อาจารย์สมชาย',
    rating: 4.5,
    completionRate: 78,
    materials: ['PDF', 'Video', 'Quiz']
  },
  {
    id: 2,
    title: 'พันธุศาสตร์พื้นฐาน',
    description: 'ทำความเข้าใจกับหลักการพันธุกรรมและ DNA',
    subject: 'วิทยาศาสตร์',
    emoji: '🧬',
    students: 32,
    duration: 3,
    date: 'พรุ่งนี้',
    level: 'กลาง',
    status: 'upcoming',
    teacher: 'อาจารย์สมหญิง',
    rating: 4.8,
    completionRate: 0,
    materials: ['PDF', 'Interactive', 'Lab']
  },
  {
    id: 3,
    title: 'Grammar Fundamentals',
    description: 'Master basic English grammar rules and structures',
    subject: 'ภาษาอังกฤษ',
    emoji: '📝',
    students: 28,
    duration: 1.5,
    date: '2 วันที่แล้ว',
    level: 'เบื้องต้น',
    status: 'completed',
    teacher: 'Teacher Sarah',
    rating: 4.3,
    completionRate: 95,
    materials: ['PDF', 'Audio', 'Exercise']
  },
  {
    id: 4,
    title: 'ประวัติศาสตร์ไทย',
    description: 'เรียนรู้เหตุการณ์สำคัญในประวัติศาสตร์ไทย',
    subject: 'สังคมศึกษา',
    emoji: '🏛️',
    students: 38,
    duration: 2.5,
    date: 'สัปดาห์หน้า',
    level: 'กลาง',
    status: 'upcoming',
    teacher: 'อาจารย์วิชัย',
    rating: 4.6,
    completionRate: 0,
    materials: ['PDF', 'Video', 'Timeline']
  },
  {
    id: 5,
    title: 'การวาดภาพสีน้ำ',
    description: 'เทคนิคพื้นฐานในการวาดภาพด้วยสีน้ำ',
    subject: 'ศิลปะ',
    emoji: '🎨',
    students: 22,
    duration: 4,
    date: 'วันพฤหัสบดี',
    level: 'เบื้องต้น',
    status: 'active',
    teacher: 'อาจารย์นิดา',
    rating: 4.7,
    completionRate: 60,
    materials: ['Video', 'Tutorial', 'Practice']
  }
];

export const documents = [
  {
    id: 1,
    name: 'คู่มือการใช้ระบบ.pdf',
    type: 'pdf',
    size: '2.5 MB',
    uploadDate: '2024-01-15',
    category: 'คู่มือ',
    downloads: 245,
    uploader: 'อาจารย์สมชาย'
  },
  {
    id: 2,
    name: 'บทเรียนคณิตศาสตร์.pptx',
    type: 'presentation',
    size: '15.2 MB',
    uploadDate: '2024-01-14',
    category: 'บทเรียน',
    downloads: 128,
    uploader: 'อาจารย์วิชัย'
  },
  {
    id: 3,
    name: 'วิดีโอการทดลอง.mp4',
    type: 'video',
    size: '125.8 MB',
    uploadDate: '2024-01-13',
    category: 'สื่อการเรียน',
    downloads: 89,
    uploader: 'อาจารย์สมหญิง'
  }
];

export const notifications = [
  {
    id: 1,
    title: 'บทเรียนใหม่: เรขาคณิตเบื้องต้น',
    message: 'มีบทเรียนใหม่ในวิชาคณิตศาสตร์',
    type: 'info',
    date: '2024-01-15T10:30:00',
    read: false
  },
  {
    id: 2,
    title: 'การบ้านที่มอบหมาย',
    message: 'คุณมีการบ้านใหม่ที่ต้องส่งภายในสัปดาห์นี้',
    type: 'warning',
    date: '2024-01-14T15:45:00',
    read: true
  },
  {
    id: 3,
    title: 'คะแนนสอบออกแล้ว',
    message: 'ผลสอบวิชาวิทยาศาสตร์ได้ออกแล้ว',
    type: 'success',
    date: '2024-01-13T09:15:00',
    read: false
  }
];

export const activities = [
  {
    id: 1,
    user: 'นักเรียนสมศรี',
    action: 'ส่งการบ้าน',
    target: 'เรขาคณิตเบื้องต้น',
    time: '5 นาทีที่แล้ว',
    type: 'submission'
  },
  {
    id: 2,
    user: 'อาจารย์สมชาย',
    action: 'อัปโหลดเอกสาร',
    target: 'บทเรียนคณิตศาสตร์ บท 3',
    time: '15 นาทีที่แล้ว',
    type: 'upload'
  },
  {
    id: 3,
    user: 'นักเรียนวิชัย',
    action: 'เข้าร่วมบทเรียน',
    target: 'พันธุศาสตร์พื้นฐาน',
    time: '1 ชั่วโมงที่แล้ว',
    type: 'join'
  }
];

export const fileTypes = [
  {
    extension: 'pdf',
    name: 'PDF Document',
    icon: '📄',
    color: 'text-red-500',
    maxSize: '10MB'
  },
  {
    extension: 'doc',
    name: 'Word Document',
    icon: '📝',
    color: 'text-blue-500',
    maxSize: '5MB'
  },
  {
    extension: 'docx',
    name: 'Word Document',
    icon: '📝',
    color: 'text-blue-500',
    maxSize: '5MB'
  },
  {
    extension: 'ppt',
    name: 'PowerPoint',
    icon: '📊',
    color: 'text-orange-500',
    maxSize: '20MB'
  },
  {
    extension: 'pptx',
    name: 'PowerPoint',
    icon: '📊',
    color: 'text-orange-500',
    maxSize: '20MB'
  },
  {
    extension: 'mp4',
    name: 'Video',
    icon: '🎥',
    color: 'text-purple-500',
    maxSize: '100MB'
  },
  {
    extension: 'jpg',
    name: 'Image',
    icon: '🖼️',
    color: 'text-green-500',
    maxSize: '5MB'
  },
  {
    extension: 'png',
    name: 'Image',
    icon: '🖼️',
    color: 'text-green-500',
    maxSize: '5MB'
  }
];

export const appInfo = {
  name: 'EduConnect',
  version: '1.0.0',
  description: 'ระบบจัดการทรัพยากรการเรียนรู้ดิจิทัล',
  organization: 'คณะศึกษาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์',
  contact: {
    email: 'support@educonnect.ac.th',
    phone: '02-123-4567',
    website: 'https://educonnect.ac.th'
  },
  social: {
    facebook: 'https://facebook.com/educonnect',
    line: 'https://line.me/ti/p/@educonnect',
    youtube: 'https://youtube.com/educonnect'
  }
};

export default {
  dashboardStats,
  subjects,
  userRoles,
  platformFeatures,
  lessons,
  documents,
  notifications,
  activities,
  fileTypes,
  appInfo
};