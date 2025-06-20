# EduConnect - ระบบจัดการทรัพยากรการเรียนรู้ดิจิทัล

## 📋 รายละเอียดโปรเจ็ค

EduConnect เป็นระบบจัดการทรัพยากรการเรียนรู้ดิจิทัลที่พัฒนาขึ้นเพื่อสร้างความเสมอภาคทางการศึกษา โดยคณะศึกษาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์

### ✨ Features

- 📊 **Dashboard การใช้งาน** - แสดงสถิติและข้อมูลการใช้งานแบบ Real-time
- 🎓 **ระบบจัดการทรัพยากร** - จัดการเนื้อหาการเรียนรู้สำหรับอาจารย์และนักเรียน
- 📚 **นำเข้าเอกสารและบทเรียน** - อัปโหลดและจัดการไฟล์การเรียนการสอน
- 📝 **จัดการบทเรียน** - สร้างและจัดการบทเรียนออนไลน์
- 🔍 **ค้นหาและกรองข้อมูล** - ค้นหาเนื้อหาตามหมวดหมู่
- 📱 **Responsive Design** - รองรับการใช้งานบนทุกอุปกรณ์
- 🎨 **Glass Morphism UI** - ดีไซน์สวยงามและทันสมัย

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + SCSS
- **Icons**: Lucide React + React Icons
- **Language**: JavaScript (ES6+)
- **Development Tools**: VS Code, ESLint, Prettier
- **Project Scaffolding**: Vite (React Template)

## 📁 โครงสร้างโปรเจ็ค

```
edu-connect-tailwind/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images, icons, fonts
│   ├── components/        # React components
│   │   ├── common/        # Reusable components
│   │   │   ├── Sidebar/   # Navigation sidebar
│   │   │   ├── GlassCard/ # Glass morphism cards
│   │   │   ├── ActionButton/
│   │   │   ├── Layout/    # Main layout wrapper
│   │   │   └── PlatformInfo/
│   │   ├── dashboard/     # Dashboard components
│   │   ├── lesson/        # Lesson components
│   │   ├── document/      # Document components
│   │   └── auth/          # Authentication components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context providers
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── data/              # Mock data
│   ├── styles/            # SCSS files
│   │   ├── globals.scss   # Global styles
│   │   ├── variables.scss # SCSS variables
│   │   ├── mixins.scss    # SCSS mixins
│   │   └── animations.scss
│   ├── App.jsx
│   ├── App.scss
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 การติดตั้งและเริ่มต้นใช้งาน

### ข้อกำหนดระบบ

- Node.js 18+ 
- npm หรือ yarn
- VS Code (แนะนำ)

### การติดตั้ง

1. **Clone repository**
```bash
git clone https://github.com/sertjerm/edu-connect-tailwind.git
cd edu-connect-tailwind
```

2. **ติดตั้ง dependencies**
```bash
npm install
# หรือ
yarn install
```

3. **เริ่มต้น development server**
```bash
npm run dev
# หรือ
yarn dev
```

4. **เปิดเบราว์เซอร์ไปที่** `http://localhost:3000`

### คำสั่งที่มีประโยชน์

```bash
# Development
npm run dev          # เริ่ม dev server
npm run build        # Build สำหรับ production
npm run preview      # Preview build
npm run lint         # ตรวจสอบ code quality
npm run format       # จัดรูปแบบ code
npm run clean        # ลบ cache และ build files
```

## 🎨 การใช้งาน SCSS + Tailwind CSS

โปรเจ็คนี้ใช้ SCSS ร่วมกับ Tailwind CSS เพื่อให้ได้ประโยชน์ทั้งสองด้าน:

### SCSS Variables และ Mixins
```scss
// ใช้ variables
$primary-color: #8b5cf6;
$glass-bg: rgba(255, 255, 255, 0.2);

// ใช้ mixins
@include glass-effect(0.2, 10px);
@include button-variant('primary');
@include thai-text('lg');
```

### Tailwind Utilities
```jsx
// ใช้ Tailwind classes ตามปกติ
<div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6">
  <h1 className="text-thai-xl font-bold text-white">
    หัวข้อ
  </h1>
</div>
```

## 📱 Responsive Design

- **Mobile First**: เริ่มออกแบบสำหรับมือถือก่อน
- **Breakpoints**: xs(475px), sm(640px), md(768px), lg(1024px), xl(1280px)
- **Sidebar**: Auto-collapse บนหน้าจอเล็ก
- **Typography**: ปรับขนาดฟอนต์อัตโนมัติ

## 🌟 Design System

### สี (Colors)
- **Primary**: เฉดสีม่วง (#8b5cf6 - #4c1d95)
- **Secondary**: เฉดสีฟ้า (#06b6d4 - #3b82f6)
- **Glass**: rgba(255, 255, 255, 0.1-0.3)

### Typography
- **Font**: Sarabun (สำหรับภาษาไทย)
- **Sizes**: thai-xs, thai-sm, thai-base, thai-lg, thai-xl, thai-2xl
- **Line Height**: 1.6 (เหมาะสำหรับภาษาไทย)

### Components
- **GlassCard**: การ์ดแบบ Glass Morphism
- **ActionButton**: ปุ่มที่มีหลายรูปแบบ
- **Sidebar**: แถบเมนูข้าง
- **StatsCard**: การ์ดแสดงสถิติ

## 🔧 การ Customize

### เพิ่ม Component ใหม่

1. สร้างโฟลเดอร์ใน `src/components/`
2. สร้างไฟล์ `.jsx` และ `.scss`
3. Export component

```jsx
// src/components/common/NewComponent/NewComponent.jsx
import React from 'react';
import './NewComponent.scss';

const NewComponent = ({ children }) => {
  return (
    <div className="new-component">
      {children}
    </div>
  );
};

export default NewComponent;
```

### เพิ่ม SCSS Variables

```scss
// src/styles/variables.scss
$new-color: #ff6b6b;
$new-size: 2rem;
```

### เพิ่ม Tailwind Classes

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom': '#ff6b6b'
      }
    }
  }
}
```

## 🚀 Deployment

### Build สำหรับ Production

```bash
npm run build
```

### Deploy ไปยัง Vercel

```bash
npm install -g vercel
vercel
```

### Deploy ไปยัง Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 การร่วมพัฒนา

### Git Workflow

1. Fork repository
2. สร้าง feature branch: `git checkout -b feature/new-feature`
3. Commit การเปลี่ยนแปลง: `git commit -m 'Add new feature'`
4. Push ไปยัง branch: `git push origin feature/new-feature`
5. สร้าง Pull Request

### Code Style

- ใช้ ESLint และ Prettier
- ตั้งชื่อ component แบบ PascalCase
- ตั้งชื่อไฟล์ตาม component name
- เขียน PropTypes สำหรับ components
- Comment โค้ดเป็นภาษาไทย/อังกฤษ

## 📝 TODO

- [ ] เพิ่มระบบ Authentication
- [ ] เชื่อมต่อกับ Backend API
- [ ] เพิ่ม Unit Tests
- [ ] เพิ่มระบบ Notification
- [ ] เพิ่มการ Export ข้อมูล
- [ ] เพิ่ม Dark Mode
- [ ] เพิ่ม PWA Support

## 📞 การติดต่อ

- **Email**: support@educonnect.ac.th
- **Phone**: 02-123-4567
- **Website**: https://educonnect.ac.th

## 📄 License

MIT License - ดูรายละเอียดใน LICENSE# edu-connect-tailwind
# edu-connect-demo
