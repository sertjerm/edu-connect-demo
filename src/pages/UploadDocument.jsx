import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

const FileUploadExample = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // ประเภทไฟล์ที่รองรับ
  const allowedTypes = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
    'text/plain': '.txt'
  };

  // ขนาดไฟล์สูงสุด (10MB)
  const maxFileSize = 10 * 1024 * 1024;

  // ตรวจสอบไฟล์
  const validateFile = (file) => {
    const errors = [];
    
    if (!allowedTypes[file.type]) {
      errors.push('ประเภทไฟล์ไม่รองรับ');
    }
    
    if (file.size > maxFileSize) {
      errors.push('ไฟล์ใหญ่เกิน 10MB');
    }
    
    return errors;
  };

  // จัดรูปแบบขนาดไฟล์
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // ไอคอนตามประเภทไฟล์
  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('powerpoint') || type.includes('presentation')) return '📊';
    return '📎';
  };

  // จัดการการเลือกไฟล์
  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const validFiles = [];

    fileArray.forEach(file => {
      const errors = validateFile(file);
      const fileObj = {
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        errors: errors,
        status: errors.length > 0 ? 'error' : 'ready',
        progress: 0
      };
      validFiles.push(fileObj);
    });

    setFiles(prev => [...prev, ...validFiles]);
  };

  // จัดการ Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // ลบไฟล์
  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  // อัพโหลดไฟล์
  const uploadFiles = async () => {
    const validFiles = files.filter(f => f.status === 'ready');
    if (validFiles.length === 0) return;

    setUploading(true);

    for (const fileObj of validFiles) {
      try {
        // อัพเดทสถานะเป็น uploading
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id 
            ? { ...f, status: 'uploading', progress: 0 }
            : f
        ));

        // สร้าง FormData
        const formData = new FormData();
        formData.append('file', fileObj.file);
        formData.append('title', fileObj.name.replace(/\.[^/.]+$/, "")); // ชื่อไฟล์โดยไม่มีนามสกุล
        formData.append('documentType', getDocumentType(fileObj.type));
        formData.append('owner', 'อาจารย์สมชาย'); // จริงๆ ต้องมาจาก user session
        formData.append('subject', 'ความเสมอภาคทางการศึกษา');
        formData.append('description', 'อัพโหลดจากระบบ EduConnect');

        // จำลองการอัพโหลดไฟล์
        await simulateUpload(fileObj.id);
        
        // บันทึกข้อมูลลงฐานข้อมูล
        await saveToDatabase(fileObj, formData);

        // อัพเดทสถานะเป็น success
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id 
            ? { ...f, status: 'success', progress: 100 }
            : f
        ));

      } catch (error) {
        // อัพเดทสถานะเป็น error
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id 
            ? { ...f, status: 'error', errors: ['เกิดข้อผิดพลาดในการอัพโหลด'] }
            : f
        ));
      }
    }

    setUploading(false);
  };

  // จำลองการอัพโหลด
  const simulateUpload = (fileId) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress }
            : f
        ));
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  };

  // บันทึกลงฐานข้อมูล
  const saveToDatabase = async (fileObj, formData) => {
    // จำลอง API call
    const response = await fetch('/api/documents/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload');
    }

    return response.json();
  };

  // กำหนดประเภทเอกสาร
  const getDocumentType = (mimeType) => {
    if (mimeType.includes('pdf')) return 'แผนการเรียนรู้';
    if (mimeType.includes('word')) return 'เอกสารประกอบ';
    if (mimeType.includes('powerpoint')) return 'สื่อการเรียน';
    return 'เอกสารทั่วไป';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          📚 อัพโหลดเอกสารการเรียนรู้
        </h1>

        {/* พื้นที่ Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          
          <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์
          </h3>
          <p className="text-gray-500 mb-4">
            รองรับไฟล์: PDF, DOC, DOCX, PPT, PPTX, TXT (สูงสุด 10MB)
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
          >
            เลือกไฟล์
          </button>
        </div>

        {/* รายการไฟล์ที่เลือก */}
        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              ไฟล์ที่เลือก ({files.length})
            </h3>
            
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="bg-gray-50 rounded-xl p-4 border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-2xl">{getFileIcon(file.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                        
                        {/* Progress Bar */}
                        {file.status === 'uploading' && (
                          <div className="mt-2">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              อัพโหลด {file.progress}%
                            </p>
                          </div>
                        )}
                        
                        {/* Error Messages */}
                        {file.errors.length > 0 && (
                          <div className="mt-2">
                            {file.errors.map((error, index) => (
                              <p key={index} className="text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {error}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {/* Status Icon */}
                      {file.status === 'success' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        disabled={file.status === 'uploading'}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setFiles([])}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                disabled={uploading}
              >
                ล้างทั้งหมด
              </button>
              
              <button
                onClick={uploadFiles}
                disabled={uploading || files.filter(f => f.status === 'ready').length === 0}
                className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {uploading ? 'กำลังอัพโหลด...' : 'อัพโหลดไฟล์'}
              </button>
            </div>
          </div>
        )}

        {/* ข้อมูลเพิ่มเติม */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <h4 className="font-semibold text-blue-800 mb-2">💡 คำแนะนำ:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• ระบบจะจัดเก็บไฟล์ในโฟลเดอร์ตามประเภทเอกสารอัตโนมัติ</li>
            <li>• ชื่อไฟล์จะถูกใช้เป็นชื่อเอกสารในระบบ</li>
            <li>• สามารถอัพโหลดได้หลายไฟล์พร้อมกัน</li>
            <li>• ระบบจะตรวจสอบไฟล์ซ้ำและแจ้งเตือนอัตโนมัติ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUploadExample;