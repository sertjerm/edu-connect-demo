// src/components/Upload/index.js
export { default } from './UploadDocument';

// ในหน้าอื่นๆ
import UploadDocument from './components/Upload/UploadDocument';
// หรือ
import UploadDocument from './components/Upload'; // ถ้ามี index.js

const DocumentsPage = () => {
  const handleUploadSuccess = (file, response) => {
    console.log('อัพโหลดสำเร็จ:', file.name);
    // รีเฟรชรายการเอกสาร
  };

  const handleUploadError = (error) => {
    console.error('เกิดข้อผิดพลาด:', error);
  };

  return (
    <UploadDocument 
      onUploadSuccess={handleUploadSuccess}
      onUploadError={handleUploadError}
    />
  );
};