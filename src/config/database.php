<?php
// config/database.php - การตั้งค่าฐานข้อมูล
return [
    'host' => 'localhost\SQLEXPRESS', // หรือ IP ของ SQL Server
    'database' => 'EduConnect',
    'username' => 'sa', // หรือ username ที่ใช้
    'password' => 'your_password',
    'charset' => 'utf8',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_UTF8
    ]
];

// config/upload.php - การตั้งค่าการอัพโหลด
return [
    'allowed_types' => [
        'application/pdf' => 'pdf',
        'application/msword' => 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
        'application/vnd.ms-powerpoint' => 'ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'pptx',
        'text/plain' => 'txt'
    ],
    'max_file_size' => 10485760, // 10MB
    'upload_path' => '../uploads/',
    'document_types' => [
        'pdf' => 'แผนการเรียนรู้',
        'doc' => 'เอกสารประกอบ',
        'docx' => 'เอกสารประกอบ',
        'ppt' => 'สื่อการเรียน',
        'pptx' => 'สื่อการเรียน',
        'txt' => 'เอกสารทั่วไป'
    ]
];

// includes/functions.php - ฟังก์ชันช่วยเหลือ
<?php

/**
 * ฟังก์ชันจัดรูปแบบขนาดไฟล์
 */
function formatFileSize($bytes, $precision = 2) {
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    
    for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
        $bytes /= 1024;
    }
    
    return round($bytes, $precision) . ' ' . $units[$i];
}

/**
 * ฟังก์ชันสร้าง UUID
 */
function generateUUID() {
    return sprintf(
        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

/**
 * ฟังก์ชันส่งข้อมูล JSON Response
 */
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * ฟังก์ชันล็อกข้อผิดพลาด
 */
function logError($message, $data = []) {
    $logData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'message' => $message,
        'data' => $data,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];
    
    $logFile = __DIR__ . '/../logs/error_' . date('Y-m-d') . '.log';
    $logDir = dirname($logFile);
    
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    file_put_contents($logFile, json_encode($logData, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}

/**
 * ฟังก์ชันสำหรับ CORS
 */
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }
}

/**
 * ฟังก์ชันตรวจสอบว่าเป็น AJAX request หรือไม่
 */
function isAjaxRequest() {
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

/**
 * ฟังก์ชันสร้างชื่อไฟล์ที่ปลอดภัย
 */
function sanitizeFileName($filename) {
    // ลบอักขระที่ไม่ต้องการ
    $filename = preg_replace('/[^a-zA-Z0-9ก-๙._-]/', '_', $filename);
    
    // ลบจุดซ้ำ
    $filename = preg_replace('/\.+/', '.', $filename);
    
    // ตัดความยาวไม่เกิน 100 ตัวอักษร
    if (strlen($filename) > 100) {
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $name = pathinfo($filename, PATHINFO_FILENAME);
        $filename = substr($name, 0, 100 - strlen($extension) - 1) . '.' . $extension;
    }
    
    return $filename;
}

/**
 * ฟังก์ชันตรวจสอบประเภทไฟล์จากเนื้อหา
 */
function getFileTypeFromContent($filePath) {
    if (!file_exists($filePath)) {
        return false;
    }
    
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $filePath);
    finfo_close($finfo);
    
    return $mimeType;
}

/**
 * ฟังก์ชันเข้ารหัสชื่อไฟล์
 */
function encodeFileName($filename) {
    return base64_encode($filename);
}

/**
 * ฟังก์ชันถอดรหัสชื่อไฟล์
 */
function decodeFileName($encodedFilename) {
    return base64_decode($encodedFilename);
}

// api/documents.php - API endpoint หลัก
<?php
require_once '../includes/functions.php';

setCorsHeaders();

// โหลด config
$dbConfig = include '../config/database.php';
$uploadConfig = include '../config/upload.php';

class DocumentAPI {
    private $db;
    private $config;
    
    public function __construct($dbConfig, $uploadConfig) {
        $this->config = $uploadConfig;
        $this->connectDatabase($dbConfig);
    }
    
    private function connectDatabase($config) {
        try {
            $dsn = "sqlsrv:server={$config['host']};Database={$config['database']}";
            $this->db = new PDO($dsn, $config['username'], $config['password'], $config['options']);
        } catch (PDOException $e) {
            logError('Database connection failed', ['error' => $e->getMessage()]);
            sendJsonResponse(['success' => false, 'message' => 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้'], 500);
        }
    }
    
    public function handleRequest() {
        try {
            $method = $_SERVER['REQUEST_METHOD'];
            $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            $pathParts = explode('/', trim($path, '/'));
            
            switch ($method) {
                case 'POST':
                    if (end($pathParts) === 'upload') {
                        $this->uploadDocument();
                    } else {
                        $this->createDocument();
                    }
                    break;
                    
                case 'GET':
                    if (isset($pathParts[2]) && is_numeric($pathParts[2])) {
                        if (isset($pathParts[3]) && $pathParts[3] === 'download') {
                            $this->downloadDocument($pathParts[2]);
                        } else {
                            $this->getDocument($pathParts[2]);
                        }
                    } else {
                        $this->getDocuments();
                    }
                    break;
                    
                case 'PUT':
                    if (isset($pathParts[2]) && is_numeric($pathParts[2])) {
                        $this->updateDocument($pathParts[2]);
                    }
                    break;
                    
                case 'DELETE':
                    if (isset($pathParts[2]) && is_numeric($pathParts[2])) {
                        $this->deleteDocument($pathParts[2]);
                    }
                    break;
                    
                default:
                    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
            }
            
        } catch (Exception $e) {
            logError('API Error', [
                'method' => $_SERVER['REQUEST_METHOD'],
                'uri' => $_SERVER['REQUEST_URI'],
                'error' => $e->getMessage()
            ]);
            sendJsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    
    // อัพโหลดเอกสาร
    private function uploadDocument() {
        if (!isset($_FILES['file'])) {
            sendJsonResponse(['success' => false, 'message' => 'ไม่พบไฟล์ที่อัพโหลด'], 400);
        }
        
        $file = $_FILES['file'];
        $errors = $this->validateFile($file);
        
        if (!empty($errors)) {
            sendJsonResponse(['success' => false, 'message' => implode(', ', $errors)], 400);
        }
        
        // ข้อมูลจากฟอร์ม
        $title = $_POST['title'] ?? pathinfo($file['name'], PATHINFO_FILENAME);
        $documentType = $_POST['documentType'] ?? $this->getDocumentTypeFromFile($file);
        $owner = $_POST['owner'] ?? 'ไม่ระบุ';
        $subject = $_POST['subject'] ?? '';
        $description = $_POST['description'] ?? '';
        
        // สร้างไดเรกทอรีและบันทึกไฟล์
        $savedFile = $this->saveFile($file, $documentType);
        
        // บันทึกลงฐานข้อมูล
        $documentId = $this->saveToDatabase([
            'title' => $title,
            'documentType' => $documentType,
            'filePath' => $savedFile['path'],
            'fileName' => $savedFile['name'],
            'fileExtension' => $savedFile['extension'],
            'fileSize' => $file['size'],
            'owner' => $owner,
            'description' => $description,
            'subject' => $subject
        ]);
        
        sendJsonResponse([
            'success' => true,
            'message' => 'อัพโหลดไฟล์สำเร็จ',
            'data' => [
                'documentId' => $documentId,
                'title' => $title,
                'fileName' => $savedFile['name'],
                'fileSize' => formatFileSize($file['size']),
                'uploadDate' => date('Y-m-d H:i:s')
            ]
        ]);
    }
    
    // ตรวจสอบความถูกต้องของไฟล์
    private function validateFile($file) {
        $errors = [];
        
        if ($file['error'] !== UPLOAD_ERR_OK) {
            $errors[] = $this->getUploadErrorMessage($file['error']);
            return $errors;
        }
        
        // ตรวจสอบ MIME type
        $mimeType = getFileTypeFromContent($file['tmp_name']);
        if (!array_key_exists($mimeType, $this->config['allowed_types'])) {
            $errors[] = 'ประเภทไฟล์ไม่ได้รับอนุญาต';
        }
        
        // ตรวจสอบขนาดไฟล์
        if ($file['size'] > $this->config['max_file_size']) {
            $errors[] = 'ไฟล์มีขนาดใหญ่เกิน ' . formatFileSize($this->config['max_file_size']);
        }
        
        return $errors;
    }
    
    // บันทึกไฟล์
    private function saveFile($file, $documentType) {
        $year = date('Y');
        $month = date('m');
        $uploadDir = $this->config['upload_path'] . $documentType . '/' . $year . '/' . $month . '/';
        
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $fileName = time() . '_' . bin2hex(random_bytes(4)) . '.' . $extension;
        $filePath = $uploadDir . $fileName;
        
        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            throw new Exception('ไม่สามารถบันทึกไฟล์ได้');
        }
        
        return [
            'path' => $filePath,
            'name' => $fileName,
            'extension' => '.' . $extension
        ];
    }
    
    // บันทึกข้อมูลลงฐานข้อมูล
    private function saveToDatabase($data) {
        $sql = "INSERT INTO Documents (
                    Title, DocumentType, FilePath, FileName, FileExtension,
                    FileSize, Owner, Description, Subject, CreatedDate, UpdatedDate
                ) VALUES (
                    :title, :documentType, :filePath, :fileName, :fileExtension,
                    :fileSize, :owner, :description, :subject, GETDATE(), GETDATE()
                )";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':title' => $data['title'],
            ':documentType' => $data['documentType'],
            ':filePath' => $data['filePath'],
            ':fileName' => $data['fileName'],
            ':fileExtension' => $data['fileExtension'],
            ':fileSize' => $data['fileSize'],
            ':owner' => $data['owner'],
            ':description' => $data['description'],
            ':subject' => $data['subject']
        ]);
        
        // ดึง ID ที่เพิ่งสร้าง
        $stmt = $this->db->query("SELECT SCOPE_IDENTITY() as DocumentID");
        return $stmt->fetch()['DocumentID'];
    }
    
    // ดึงรายการเอกสาร
    private function getDocuments() {
        $page = (int)($_GET['page'] ?? 1);
        $limit = (int)($_GET['limit'] ?? 10);
        $type = $_GET['type'] ?? '';
        $owner = $_GET['owner'] ?? '';
        $subject = $_GET['subject'] ?? '';
        $search = $_GET['search'] ?? '';
        
        $whereConditions = ["Status = 'Active'"];
        $params = [];
        
        if (!empty($type)) {
            $whereConditions[] = "DocumentType = :type";
            $params[':type'] = $type;
        }
        
        if (!empty($owner)) {
            $whereConditions[] = "Owner LIKE :owner";
            $params[':owner'] = "%{$owner}%";
        }
        
        if (!empty($subject)) {
            $whereConditions[] = "Subject = :subject";
            $params[':subject'] = $subject;
        }
        
        if (!empty($search)) {
            $whereConditions[] = "(Title LIKE :search OR Description LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        $whereClause = implode(' AND ', $whereConditions);
        $offset = ($page - 1) * $limit;
        
        // Query ข้อมูล
        $sql = "SELECT 
                    DocumentID, Title, DocumentType, FileName, FileExtension,
                    FileSize, Owner, Description, Subject, CreatedDate, UpdatedDate
                FROM Documents 
                WHERE {$whereClause}
                ORDER BY UpdatedDate DESC
                OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY";
        
        $stmt = $this->db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        $documents = $stmt->fetchAll();
        
        // นับจำนวนทั้งหมด
        $countSql = "SELECT COUNT(*) as total FROM Documents WHERE {$whereClause}";
        $countStmt = $this->db->prepare($countSql);
        foreach ($params as $key => $value) {
            $countStmt->bindValue($key, $value);
        }
        $countStmt->execute();
        $total = $countStmt->fetch()['total'];
        
        // จัดรูปแบบข้อมูล
        foreach ($documents as &$doc) {
            $doc['FileSizeFormatted'] = formatFileSize($doc['FileSize']);
            $doc['CreatedDateFormatted'] = date('d/m/Y H:i', strtotime($doc['CreatedDate']));
            $doc['UpdatedDateFormatted'] = date('d/m/Y H:i', strtotime($doc['UpdatedDate']));
        }
        
        sendJsonResponse([
            'success' => true,
            'data' => $documents,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'totalPages' => ceil($total / $limit)
            ]
        ]);
    }
    
    // ดาวน์โหลดเอกสาร
    private function downloadDocument($documentId) {
        $sql = "SELECT FilePath, Title, FileName FROM Documents 
                WHERE DocumentID = :id AND Status = 'Active'";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $documentId]);
        
        $document = $stmt->fetch();
        
        if (!$document || !file_exists($document['FilePath'])) {
            sendJsonResponse(['success' => false, 'message' => 'ไม่พบไฟล์ที่ร้องขอ'], 404);
        }
        
        $filePath = $document['FilePath'];
        $fileName = $document['Title'];
        
        // กำหนด headers
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $fileName . '"');
        header('Content-Length: ' . filesize($filePath));
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        
        readfile($filePath);
        exit;
    }
    
    // ลบเอกสาร
    private function deleteDocument($documentId) {
        $sql = "UPDATE Documents 
                SET Status = 'Deleted', UpdatedDate = GETDATE()
                WHERE DocumentID = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $documentId]);
        
        if ($stmt->rowCount() === 0) {
            sendJsonResponse(['success' => false, 'message' => 'ไม่พบเอกสารที่ร้องขอ'], 404);
        }
        
        sendJsonResponse(['success' => true, 'message' => 'ลบเอกสารสำเร็จ']);
    }
    
    // ข้อความข้อผิดพลาดการอัพโหลด
    private function getUploadErrorMessage($errorCode) {
        $messages = [
            UPLOAD_ERR_INI_SIZE => 'ไฟล์มีขนาดใหญ่เกินที่กำหนดในระบบ',
            UPLOAD_ERR_FORM_SIZE => 'ไฟล์มีขนาดใหญ่เกินที่กำหนดในฟอร์ม',
            UPLOAD_ERR_PARTIAL => 'การอัพโหลดไฟล์ไม่สมบูรณ์',
            UPLOAD_ERR_NO_FILE => 'ไม่พบไฟล์ที่อัพโหลด',
            UPLOAD_ERR_NO_TMP_DIR => 'ไม่พบโฟลเดอร์ชั่วคราว',
            UPLOAD_ERR_CANT_WRITE => 'ไม่สามารถเขียนไฟล์ได้',
            UPLOAD_ERR_EXTENSION => 'นามสกุลไฟล์ไม่ได้รับอนุญาต'
        ];
        
        return $messages[$errorCode] ?? 'เกิดข้อผิดพลาดในการอัพโหลด';
    }
    
    // กำหนดประเภทเอกสารจากไฟล์
    private function getDocumentTypeFromFile($file) {
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        return $this->config['document_types'][$extension] ?? 'เอกสารทั่วไป';
    }
}

// เริ่มต้น API
$api = new DocumentAPI($dbConfig, $uploadConfig);
$api->handleRequest();

// .htaccess - สำหรับ URL Rewriting
# RewriteEngine On
# RewriteCond %{REQUEST_FILENAME} !-f
# RewriteCond %{REQUEST_FILENAME} !-d
# RewriteRule ^api/documents(/.*)?$ api/documents.php [QSA,L]
# RewriteRule ^api/upload$ api/upload.php [QSA,L]

# # CORS Headers
# Header always set Access-Control-Allow-Origin "*"
# Header always set Access-Control-Allow-Methods "GET,POST,PUT,DELETE,OPTIONS"
# Header always set Access-Control-Allow-Headers "Content-Type,Authorization,X-Requested-With"

# # Security Headers
# Header always set X-Content-Type-Options nosniff
# Header always set X-Frame-Options DENY
# Header always set X-XSS-Protection "1; mode=block"

# # File Upload Settings
# php_value upload_max_filesize 10M
# php_value post_max_size 12M
# php_value max_execution_time 300
# php_value max_input_time 300