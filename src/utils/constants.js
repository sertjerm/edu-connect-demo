// Constants for EduConnect Application

export const APP_CONFIG = {
  NAME: 'EduConnect',
  VERSION: '1.0.0',
  DESCRIPTION: 'ระบบจัดการทรัพยากรการเรียนรู้ดิจิทัล',
  ORGANIZATION: 'คณะศึกษาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์'
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  MANAGEMENT: '/management',
  DOCUMENTS: '/documents',
  LESSONS: '/lessons',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register'
};

export const PAGE_TYPES = {
  DASHBOARD: 'dashboard',
  MANAGEMENT: 'management',
  DOCUMENTS: 'documents',
  LESSONS: 'lessons'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  GUEST: 'guest'
};

export const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  ADMIN: 'admin',
  MANAGE_USERS: 'manage_users',
  UPLOAD_FILES: 'upload_files',
  CREATE_LESSONS: 'create_lessons',
  GRADE_ASSIGNMENTS: 'grade_assignments'
};

export const FILE_TYPES = {
  DOCUMENT: {
    PDF: 'pdf',
    DOC: 'doc',
    DOCX: 'docx',
    TXT: 'txt'
  },
  PRESENTATION: {
    PPT: 'ppt',
    PPTX: 'pptx'
  },
  IMAGE: {
    JPG: 'jpg',
    JPEG: 'jpeg',
    PNG: 'png',
    GIF: 'gif',
    SVG: 'svg'
  },
  VIDEO: {
    MP4: 'mp4',
    AVI: 'avi',
    MOV: 'mov',
    WMV: 'wmv'
  },
  AUDIO: {
    MP3: 'mp3',
    WAV: 'wav',
    M4A: 'm4a'
  }
};

export const FILE_SIZE_LIMITS = {
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  IMAGE: 5 * 1024 * 1024,     // 5MB
  VIDEO: 100 * 1024 * 1024,   // 100MB
  AUDIO: 20 * 1024 * 1024,    // 20MB
  DEFAULT: 10 * 1024 * 1024   // 10MB
};

export const SUPPORTED_FILE_TYPES = [
  ...Object.values(FILE_TYPES.DOCUMENT),
  ...Object.values(FILE_TYPES.PRESENTATION),
  ...Object.values(FILE_TYPES.IMAGE),
  ...Object.values(FILE_TYPES.VIDEO),
  ...Object.values(FILE_TYPES.AUDIO)
];

export const LESSON_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived'
};

export const LESSON_LEVELS = {
  BEGINNER: 'เบื้องต้น',
  INTERMEDIATE: 'กลาง',
  ADVANCED: 'ขั้นสูง',
  EXPERT: 'ผู้เชี่ยวชาญ'
};

export const SUBJECTS = {
  ALL: 'ทั้งหมด',
  MATHEMATICS: 'คณิตศาสตร์',
  SCIENCE: 'วิทยาศาสตร์',
  ENGLISH: 'ภาษาอังกฤษ',
  THAI: 'ภาษาไทย',
  SOCIAL: 'สังคมศึกษา',
  ART: 'ศิลปะ',
  PE: 'พลศึกษา',
  COMPUTER: 'คอมพิวเตอร์',
  MUSIC: 'ดนตรี'
};

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

export const ACTIVITY_TYPES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  UPLOAD: 'upload',
  DOWNLOAD: 'download',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  SUBMIT: 'submit',
  JOIN: 'join',
  LEAVE: 'leave',
  COMPLETE: 'complete'
};

export const STORAGE_KEYS = {
  USER: 'educonnect_user',
  TOKEN: 'educonnect_token',
  PREFERENCES: 'educonnect_preferences',
  THEME: 'educonnect_theme',
  LANGUAGE: 'educonnect_language',
  RECENT_FILES: 'educonnect_recent_files',
  FAVORITES: 'educonnect_favorites'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    PROFILE: '/api/auth/profile'
  },
  USERS: {
    LIST: '/api/users',
    GET: '/api/users/:id',
    CREATE: '/api/users',
    UPDATE: '/api/users/:id',
    DELETE: '/api/users/:id'
  },
  LESSONS: {
    LIST: '/api/lessons',
    GET: '/api/lessons/:id',
    CREATE: '/api/lessons',
    UPDATE: '/api/lessons/:id',
    DELETE: '/api/lessons/:id',
    ENROLL: '/api/lessons/:id/enroll',
    UNENROLL: '/api/lessons/:id/unenroll'
  },
  DOCUMENTS: {
    LIST: '/api/documents',
    GET: '/api/documents/:id',
    UPLOAD: '/api/documents/upload',
    DOWNLOAD: '/api/documents/:id/download',
    DELETE: '/api/documents/:id'
  },
  STATS: {
    DASHBOARD: '/api/stats/dashboard',
    LESSONS: '/api/stats/lessons',
    USERS: '/api/stats/users',
    ACTIVITY: '/api/stats/activity'
  }
};

export const BREAKPOINTS = {
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

export const COLORS = {
  PRIMARY: {
    50: '#f3f4f6',
    100: '#e5e7eb',
    200: '#d1d5db',
    300: '#9ca3af',
    400: '#6b7280',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95'
  },
  SECONDARY: {
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4'
  },
  STATUS: {
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    INFO: '#3b82f6'
  }
};

export const ANIMATIONS = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

export const GRID_CONFIGS = {
  STATS: 'grid-cols-2',
  NAVIGATION: 'grid-cols-2',
  LESSONS: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  DOCUMENTS: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  USERS: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
};

export const BUTTON_VARIANTS = {
  PRIMARY: 'btn-primary',
  SECONDARY: 'btn-secondary',
  UPLOAD: 'btn-upload',
  GLASS: 'btn-glass',
  BACK: 'btn-back'
};

export const CARD_VARIANTS = {
  GLASS: 'glass-card',
  GLASS_HOVER: 'glass-card-hover',
  STATS: 'stats-card',
  NAVIGATION: 'nav-card',
  LESSON: 'lesson-card',
  USER_TYPE: 'user-type-card'
};

export const TEXT_VARIANTS = {
  THAI_XS: 'text-thai-xs',
  THAI_SM: 'text-thai-sm',
  THAI_BASE: 'text-thai-base',
  THAI_LG: 'text-thai-lg',
  THAI_XL: 'text-thai-xl',
  THAI_2XL: 'text-thai-2xl',
  THAI_3XL: 'text-thai-3xl'
};

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10}$/,
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  },
  THAI_NAME: /^[ก-๏\s]+$/,
  ENGLISH_NAME: /^[a-zA-Z\s]+$/
};

export const ERROR_MESSAGES = {
  REQUIRED: 'กรุณากรอกข้อมูลในช่องนี้',
  INVALID_EMAIL: 'รูปแบบอีเมลไม่ถูกต้อง',
  INVALID_PHONE: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง',
  PASSWORD_TOO_SHORT: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
  PASSWORD_WEAK: 'รหัสผ่านต้องมีตัวพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข',
  FILE_TOO_LARGE: 'ไฟล์มีขนาดใหญ่เกินไป',
  FILE_TYPE_NOT_SUPPORTED: 'ไม่รองรับประเภทไฟล์นี้',
  NETWORK_ERROR: 'เกิดข้อผิดพลาดในการเชื่อมต่อ',
  UNAUTHORIZED: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้',
  SERVER_ERROR: 'เกิดข้อผิดพลาดของเซิร์ฟเวอร์'
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'เข้าสู่ระบบสำเร็จ',
  LOGOUT: 'ออกจากระบบสำเร็จ',
  REGISTER: 'สมัครสมาชิกสำเร็จ',
  UPLOAD: 'อัปโหลดไฟล์สำเร็จ',
  SAVE: 'บันทึกข้อมูลสำเร็จ',
  DELETE: 'ลบข้อมูลสำเร็จ',
  UPDATE: 'อัปเดตข้อมูลสำเร็จ',
  SUBMIT: 'ส่งข้อมูลสำเร็จ'
};

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  PER_PAGE: 10,
  MAX_PER_PAGE: 100
};

export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm',
  TIME: 'HH:mm'
};

export const TIMEOUTS = {
  API_REQUEST: 30000,      // 30 seconds
  FILE_UPLOAD: 300000,     // 5 minutes
  SESSION: 3600000,        // 1 hour
  NOTIFICATION: 5000       // 5 seconds
};

export default {
  APP_CONFIG,
  ROUTES,
  PAGE_TYPES,
  USER_ROLES,
  PERMISSIONS,
  FILE_TYPES,
  FILE_SIZE_LIMITS,
  SUPPORTED_FILE_TYPES,
  LESSON_STATUS,
  LESSON_LEVELS,
  SUBJECTS,
  NOTIFICATION_TYPES,
  ACTIVITY_TYPES,
  STORAGE_KEYS,
  API_ENDPOINTS,
  BREAKPOINTS,
  COLORS,
  ANIMATIONS,
  GRID_CONFIGS,
  BUTTON_VARIANTS,
  CARD_VARIANTS,
  TEXT_VARIANTS,
  VALIDATION_RULES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEFAULT_PAGINATION,
  DATE_FORMATS,
  TIMEOUTS
};