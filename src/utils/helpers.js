// Helper Functions for EduConnect Application

import { FILE_SIZE_LIMITS, FILE_TYPES, SUPPORTED_FILE_TYPES } from './constants.js';

/**
 * Format file size to human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size string
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file extension from filename
 * @param {string} filename - Name of the file
 * @returns {string} File extension in lowercase
 */
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
};

/**
 * Check if file type is supported
 * @param {string} filename - Name of the file
 * @returns {boolean} True if supported
 */
export const isSupportedFileType = (filename) => {
  const extension = getFileExtension(filename);
  return SUPPORTED_FILE_TYPES.includes(extension);
};

/**
 * Get file type category
 * @param {string} filename - Name of the file
 * @returns {string} File type category
 */
export const getFileTypeCategory = (filename) => {
  const extension = getFileExtension(filename);
  
  if (Object.values(FILE_TYPES.DOCUMENT).includes(extension)) return 'document';
  if (Object.values(FILE_TYPES.PRESENTATION).includes(extension)) return 'presentation';
  if (Object.values(FILE_TYPES.IMAGE).includes(extension)) return 'image';
  if (Object.values(FILE_TYPES.VIDEO).includes(extension)) return 'video';
  if (Object.values(FILE_TYPES.AUDIO).includes(extension)) return 'audio';
  
  return 'unknown';
};

/**
 * Get file icon based on extension
 * @param {string} filename - Name of the file
 * @returns {string} Emoji icon for the file type
 */
export const getFileIcon = (filename) => {
  const extension = getFileExtension(filename);
  
  const iconMap = {
    pdf: '📄',
    doc: '📝', docx: '📝', txt: '📝',
    ppt: '📊', pptx: '📊',
    jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', svg: '🖼️',
    mp4: '🎥', avi: '🎥', mov: '🎥', wmv: '🎥',
    mp3: '🎵', wav: '🎵', m4a: '🎵'
  };
  
  return iconMap[extension] || '📎';
};

/**
 * Validate file size
 * @param {File} file - File object
 * @returns {boolean} True if file size is valid
 */
export const validateFileSize = (file) => {
  const category = getFileTypeCategory(file.name);
  const limit = FILE_SIZE_LIMITS[category.toUpperCase()] || FILE_SIZE_LIMITS.DEFAULT;
  return file.size <= limit;
};

/**
 * Format date to Thai format
 * @param {Date|string} date - Date to format
 * @param {boolean} includeTime - Include time in format
 * @returns {string} Formatted date string
 */
export const formatDateThai = (date, includeTime = false) => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return 'วันที่ไม่ถูกต้อง';
  
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  
  const day = dateObj.getDate();
  const month = thaiMonths[dateObj.getMonth()];
  const year = dateObj.getFullYear() + 543; // Convert to Buddhist Era
  
  let formatted = `${day} ${month} ${year}`;
  
  if (includeTime) {
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    formatted += ` เวลา ${hours}:${minutes} น.`;
  }
  
  return formatted;
};

/**
 * Get relative time in Thai
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTimeThai = (date) => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSeconds < 60) return 'เมื่อสักครู่';
  if (diffMinutes < 60) return `${diffMinutes} นาทีที่แล้ว`;
  if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
  if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
  
  return formatDateThai(date);
};

/**
 * Generate unique ID
 * @returns {string} Unique ID string
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Deep clone object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Check if object is empty
 * @param {object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  return Object.keys(obj).length === 0;
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generate random color
 * @returns {string} Random hex color
 */
export const getRandomColor = () => {
  const colors = [
    '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
    '#ef4444', '#ec4899', '#84cc16', '#f97316'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Thai phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidThaiPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

/**
 * Format phone number
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};

/**
 * Get greeting based on time
 * @returns {string} Greeting message in Thai
 */
export const getTimeGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'สวัสดีตอนเช้า';
  if (hour < 17) return 'สวัสดีตอนบ่าย';
  if (hour < 20) return 'สวัสดีตอนเย็น';
  return 'สวัสดีตอนค่ำ';
};

/**
 * Calculate reading time
 * @param {string} text - Text to calculate reading time
 * @param {number} wordsPerMinute - Reading speed (default: 200)
 * @returns {number} Reading time in minutes
 */
export const calculateReadingTime = (text, wordsPerMinute = 200) => {
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return Math.max(1, time);
};

/**
 * Convert percentage to color
 * @param {number} percentage - Percentage value (0-100)
 * @returns {string} Color class
 */
export const getPercentageColor = (percentage) => {
  if (percentage >= 80) return 'text-green-500';
  if (percentage >= 60) return 'text-yellow-500';
  if (percentage >= 40) return 'text-orange-500';
  return 'text-red-500';
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch (err) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

/**
 * Download file from URL
 * @param {string} url - File URL
 * @param {string} filename - Desired filename
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Check if device is mobile
 * @returns {boolean} True if mobile device
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Get browser name
 * @returns {string} Browser name
 */
export const getBrowserName = () => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  
  return 'Unknown';
};

export default {
  formatFileSize,
  getFileExtension,
  isSupportedFileType,
  getFileTypeCategory,
  getFileIcon,
  validateFileSize,
  formatDateThai,
  getRelativeTimeThai,
  generateId,
  debounce,
  throttle,
  deepClone,
  isEmpty,
  capitalize,
  truncateText,
  getInitials,
  getRandomColor,
  isValidEmail,
  isValidThaiPhone,
  formatPhoneNumber,
  getTimeGreeting,
  calculateReadingTime,
  getPercentageColor,
  copyToClipboard,
  downloadFile,
  isMobile,
  getBrowserName
};