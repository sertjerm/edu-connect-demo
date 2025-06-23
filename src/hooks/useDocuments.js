// src/hooks/useDocuments.js - Custom Hook สำหรับจัดการเอกสาร
import { useState, useEffect, useCallback } from 'react';
import ApiService from '../services/api';

export const useDocuments = (initialParams = {}) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // ดึงรายการเอกสาร
  const fetchDocuments = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.getDocuments({
        ...initialParams,
        ...params
      });

      if (response.success) {
        setDocuments(response.data);
        setPagination(response.pagination);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  // ลบเอกสาร
  const deleteDocument = useCallback(async (id) => {
    try {
      const response = await ApiService.deleteDocument(id);
      
      if (response.success) {
        // รีเฟรชรายการ
        await fetchDocuments();
        return true;
      } else {
        setError(response.message);
        return false;
      }
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [fetchDocuments]);

  // ค้นหาเอกสาร
  const searchDocuments = useCallback(async (searchTerm, filters = {}) => {
    await fetchDocuments({ 
      search: searchTerm, 
      ...filters 
    });
  }, [fetchDocuments]);

  // รีเฟรชข้อมูล
  const refresh = useCallback(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // โหลดข้อมูลครั้งแรก
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    error,
    pagination,
    fetchDocuments,
    deleteDocument,
    searchDocuments,
    refresh
  };
};