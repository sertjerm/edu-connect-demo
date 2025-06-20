import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // จำลองการเรียก API
    setTimeout(() => {
      console.log('Login attempt:', formData);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="cool-gradient flex flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* การ์ดหลัก */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
          {/* หัวข้อ */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-white">ยินดีต้อนรับ</h1>
            <p className="text-white/80">เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน</p>
          </div>

          {/* ฟอร์ม */}
          <div className="space-y-6">
            {/* ช่องอีเมล */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-white/60" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-white/60 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="อีเมล"
                required
              />
            </div>

            {/* ช่องรหัสผ่าน */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-white/60" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-12 text-white placeholder-white/60 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="รหัสผ่าน"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white/60 transition-colors hover:text-white" />
                ) : (
                  <Eye className="h-5 w-5 text-white/60 transition-colors hover:text-white" />
                )}
              </button>
            </div>

            {/* จำฉันไว้ และ ลืมรหัสผ่าน */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-white focus:ring-2 focus:ring-white/50"
                />
                <span className="ml-2 text-sm text-white/80">จำฉันไว้</span>
              </label>
              <a
                href="#"
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                ลืมรหัสผ่าน?
              </a>
            </div>

            {/* ปุ่มเข้าสู่ระบบ */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full transform rounded-lg bg-white px-4 py-3 font-semibold text-indigo-600 transition-all duration-200 hover:scale-105 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-indigo-600"></div>
                  กำลังเข้าสู่ระบบ...
                </div>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
          </div>

          {/* เส้นแบ่ง */}
          <div className="mb-6 mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-transparent px-2 text-white/60">หรือ</span>
              </div>
            </div>
          </div>

          {/* ปุ่ม Social Login */}
          <div className="space-y-3">
            <button className="w-full transform rounded-lg border border-white/20 bg-white/10 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-white/20">
              เข้าสู่ระบบด้วย Google
            </button>
            <button className="w-full transform rounded-lg border border-white/20 bg-white/10 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-white/20">
              เข้าสู่ระบบด้วย Facebook
            </button>
          </div>

          {/* ลิงก์สมัครสมาชิก */}
          <div className="mt-8 text-center">
            <p className="text-white/80">
              ยังไม่มีบัญชี?{' '}
              <Link
                to="/register"
                className="font-semibold text-white transition-all hover:underline"
              >
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>

        {/* ข้อความด้านล่าง */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            โดยการเข้าสู่ระบบ คุณยินยอมตาม
            <a
              href="#"
              className="text-white/80 transition-colors hover:text-white"
            >
              {' '}
              เงื่อนไขการใช้งาน{' '}
            </a>
            และ
            <a
              href="#"
              className="text-white/80 transition-colors hover:text-white"
            >
              {' '}
              นโยบายความเป็นส่วนตัว
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
