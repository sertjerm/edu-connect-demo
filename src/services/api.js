// src/services/api.js - Service สำหรับเรียก PHP API
const API_BASE_URL = 'http://localhost/educonnect/api'; // ปรับ URL ตามที่ตั้ง

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper สำหรับจัดการ HTTP requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers,
      },
      ...options,
    };

    // ไม่ต้องเพิ่ม Content-Type header สำหรับ FormData
    if (options.body && !(options.body instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // อัพโหลดไฟล์
  async uploadFile(file, metadata = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // เพิ่ม metadata
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key]);
    });

    return this.request('/documents/upload', {
      method: 'POST',
      body: formData,
    });
  }

  // ดึงรายการเอกสาร
  async getDocuments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/documents${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  // ดึงเอกสารเดียว
  async getDocument(id) {
    return this.request(`/documents/${id}`, {
      method: 'GET',
    });
  }

  // ลบเอกสาร
  async deleteDocument(id) {
    return this.request(`/documents/${id}`, {
      method: 'DELETE',
    });
  }

  // ดาวน์โหลดเอกสาร
  getDownloadUrl(id) {
    return `${this.baseURL}/documents/${id}/download`;
  }

  // ค้นหาเอกสาร
  async searchDocuments(searchTerm, filters = {}) {
    const params = {
      search: searchTerm,
      ...filters,
    };
    
    return this.getDocuments(params);
  }
}

// Export singleton instance
export default new ApiService();