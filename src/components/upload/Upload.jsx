// src/components/Upload/Upload.jsx
import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, X } from 'lucide-react';
import ApiService from '../../services/api';

const UploadComponent = ({ onUploadSuccess, onUploadError }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // ประเภทไฟล์ที่รองรับ
  const allowedTypes = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'text/plain': 'txt'
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

  // ตรวจสอบไฟล์
  const validateFile = (file) => {
    const errors = [];
    
    if (!allowedTypes[file.type]) {
      errors.push('ประเภทไฟล์ไม่รองรับ');
    }
    
    if (file.size > 10485760) { // 10MB
      errors.push('ไฟล์ใหญ่เกิน 10MB');
    }
    
    return errors;
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

        // จำลองความคืบหน้า
        const progressInterval = setInterval(() => {
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id && f.progress < 90
              ? { ...f, progress: f.progress + 10 }
              : f
          ));
        }, 200);

        // เตรียม metadata
        const metadata = {
          title: fileObj.name.replace(/\.[^/.]+$/, ""),
          owner: 'อาจารย์สมชาย',
          subject: 'ความเสมอภาคทางการศึกษา',
          description: 'อัพโหลดจากระบบ EduConnect'
        };

        // เรียก API
        const response = await ApiService.uploadFile(fileObj.file, metadata);

        clearInterval(progressInterval);

        // อัพเดทสถานะเป็น success
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id 
            ? { ...f, status: 'success', progress: 100 }
            : f
        ));

        // Callback สำหรับแจ้งผลสำเร็จ
        if (onUploadSuccess) {
          onUploadSuccess(fileObj, response);
        }

      } catch (error) {
        console.error('Upload error:', error);

        // อัพเดทสถานะเป็น error
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id 
            ? { ...f, status: 'error', errors: [error.message || 'เกิดข้อผิดพลาดในการอัพโหลด'] }
            : f
        ));

        // Callback สำหรับแจ้งข้อผิดพลาด
        if (onUploadError) {
          onUploadError(error);
        }
      }
    }

    setUploading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        📚 อัพโหลดเอกสารการเรียนรู้
      </h2>

      {/* พื้นที่ Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-white bg-white/20' 
            : 'border-white/40 hover:border-white/60 hover:bg-white/10'
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
        
        <Upload className="mx-auto h-16 w-16 text-white/70 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์
        </h3>
        <p className="text-white/80 mb-4">
          รองรับไฟล์: PDF, DOC, DOCX, PPT, PPTX, TXT (สูงสุด 10MB)
        </p>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors font-medium backdrop-blur-sm border border-white/30"
        >
          เลือกไฟล์
        </button>
      </div>

      {/* รายการไฟล์ที่เลือก */}
      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            ไฟล์ที่เลือก ({files.length})
          </h3>
          
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-white/70">
                        {formatFileSize(file.size)}
                      </p>
                      
                      {/* Progress Bar */}
                      {file.status === 'uploading' && (
                        <div className="mt-2">
                          <div className="bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-green-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-white/70 mt-1">
                            อัพโหลด {file.progress}%
                          </p>
                        </div>
                      )}
                      
                      {/* Error Messages */}
                      {file.errors.length > 0 && (
                        <div className="mt-2">
                          {file.errors.map((error, index) => (
                            <p key={index} className="text-sm text-red-400 flex items-center">
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
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-white/60 hover:text-red-400 transition-colors"
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
              className="px-6 py-3 text-white/80 border border-white/30 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
              disabled={uploading}
            >
              ล้างทั้งหมด
            </button>
            
            <button
              onClick={uploadFiles}
              disabled={uploading || files.filter(f => f.status === 'ready').length === 0}
              className="px-8 py-3 bg-green-500/80 text-white rounded-xl hover:bg-green-500 transition-colors font-medium disabled:bg-gray-400/50 disabled:cursor-not-allowed backdrop-blur-sm"
            >
              {uploading ? 'กำลังอัพโหลด...' : 'อัพโหลดไฟล์'}
            </button>
          </div>
        </div>
      )}

      {/* ข้อมูลเพิ่มเติม */}
      <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
        <h4 className="font-semibold text-white mb-2">💡 คำแนะนำ:</h4>
        <ul className="text-sm text-white/80 space-y-1">
          <li>• ระบบจะจัดเก็บไฟล์ในโฟลเดอร์ตามประเภทเอกสารอัตโนมัติ</li>
          <li>• ชื่อไฟล์จะถูกใช้เป็นชื่อเอกสารในระบบ</li>
          <li>• สามารถอัพโหลดได้หลายไฟล์พร้อมกัน</li>
          <li>• ระบบจะตรวจสอบไฟล์ซ้ำและแจ้งเตือนอัตโนมัติ</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadComponent;