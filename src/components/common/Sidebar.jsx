// src/components/common/Sidebar.jsx
import React, { useState } from 'react';
import {
  Home,
  BarChart3,
  GraduationCap,
  BookOpen,
  Upload,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Bell,
  User,
  HelpCircle,
} from 'lucide-react';
import '../../styles/common/Sidebar.scss';

const Sidebar = ({ isOpen, onToggle, currentPage, onPageChange }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    {
      id: 'dashboard',
      label: 'หน้าหลัก',
      icon: <Home className="h-5 w-5" />,
      path: 'dashboard',
    },
    {
      id: 'stats',
      label: 'สถิติการใช้งาน',
      icon: <BarChart3 className="h-5 w-5" />,
      path: 'stats',
    },
    {
      id: 'management',
      label: 'จัดการทรัพยากร',
      icon: <GraduationCap className="h-5 w-5" />,
      path: 'management',
      submenu: [
        {
          id: 'teacher',
          label: 'สำหรับอาจารย์',
          icon: <User className="h-4 w-4" />,
        },
        {
          id: 'student',
          label: 'สำหรับนักเรียน',
          icon: <GraduationCap className="h-4 w-4" />,
        },
      ],
    },
    {
      id: 'documents',
      label: 'เอกสารและบทเรียน',
      icon: <BookOpen className="h-5 w-5" />,
      path: 'documents',
    },
    {
      id: 'lessons',
      label: 'จัดการบทเรียน',
      icon: <FileText className="h-5 w-5" />,
      path: 'lessons',
    },
    {
      id: 'upload',
      label: 'อัปโหลดไฟล์',
      icon: <Upload className="h-5 w-5" />,
      path: 'upload',
    },
    {
      id: 'users',
      label: 'จัดการผู้ใช้',
      icon: <Users className="h-5 w-5" />,
      path: 'users',
    },
  ];

  const bottomMenuItems = [
    {
      id: 'notifications',
      label: 'การแจ้งเตือน',
      icon: <Bell className="h-5 w-5" />,
      path: 'notifications',
      badge: '3',
    },
    {
      id: 'help',
      label: 'ช่วยเหลือ',
      icon: <HelpCircle className="h-5 w-5" />,
      path: 'help',
    },
    {
      id: 'settings',
      label: 'ตั้งค่า',
      icon: <Settings className="h-5 w-5" />,
      path: 'settings',
    },
  ];

  const toggleSubmenu = menuId => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleMenuClick = item => {
    if (item.submenu) {
      toggleSubmenu(item.id);
    } else if (item.action === 'logout') {
      console.log('Logout clicked');
    } else {
      onPageChange(item.path);
    }
  };

  const handleLogout = () => {
    if (window.confirm('คุณต้องการออกจากระบบหรือไม่?')) {
      console.log('User logged out');
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && <div className="sidebar-backdrop" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}
      >
        {/* Header */}
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <div className="sidebar__logo">
              <BookOpen className="h-8 w-8" />
            </div>
            {/* // Alternative: แบบย่อคำสวยๆ */}
            {isOpen && (
              <div className="sidebar__brand-text">
                <h1 className="sidebar__title">
                  <span className="sidebar__title-main">
                    ระบบจัดการทรัพยากร
                  </span>
                  <span className="sidebar__title-sub">การเรียนรู้ดิจิทัล</span>
                </h1>
                <p className="sidebar__subtitle">
                  <span className="sidebar__org">คณะศึกษาศาสตร์</span>
                  <span className="sidebar__uni">มหาวิทยาลัยเกษตรศาสตร์</span>
                </p>
              </div>
            )}
          </div>

          <button
            className="sidebar__toggle"
            onClick={onToggle}
            aria-label={isOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* User Profile */}
        {isOpen && (
          <div className="sidebar__profile">
            <div className="sidebar__avatar">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format&q=60"
                alt="User Avatar"
                className="sidebar__avatar-img"
              />
              <div className="sidebar__avatar-status"></div>
            </div>
            <div className="sidebar__user-info">
              <p className="sidebar__user-name">สมชาย ใจดี</p>
              <p className="sidebar__user-role">อาจารย์</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="sidebar__nav">
          <div className="sidebar__section">
            {isOpen && <div className="sidebar__section-title">เมนูหลัก</div>}
            <ul className="sidebar__menu">
              {menuItems.map(item => (
                <li key={item.id} className="sidebar__menu-item">
                  <button
                    className={`sidebar__link ${
                      currentPage === item.path ? 'sidebar__link--active' : ''
                    }`}
                    onClick={() => handleMenuClick(item)}
                    title={!isOpen ? item.label : ''}
                  >
                    <span className="sidebar__icon">{item.icon}</span>
                    {isOpen && (
                      <>
                        <span className="sidebar__label">{item.label}</span>
                        {item.submenu && (
                          <span className="sidebar__chevron">
                            {expandedMenus[item.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  {item.submenu && isOpen && expandedMenus[item.id] && (
                    <ul className="sidebar__submenu">
                      {item.submenu.map(subItem => (
                        <li key={subItem.id}>
                          <button
                            className="sidebar__sublink"
                            onClick={() => onPageChange(subItem.id)}
                            title={subItem.label}
                          >
                            <span className="sidebar__subicon">
                              {subItem.icon}
                            </span>
                            <span className="sidebar__sublabel">
                              {subItem.label}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Section */}
          <div className="sidebar__bottom">
            {isOpen && <div className="sidebar__section-title">อื่นๆ</div>}
            <ul className="sidebar__menu">
              {bottomMenuItems.map(item => (
                <li key={item.id} className="sidebar__menu-item">
                  <button
                    className={`sidebar__link ${
                      currentPage === item.path ? 'sidebar__link--active' : ''
                    }`}
                    onClick={() => handleMenuClick(item)}
                    title={!isOpen ? item.label : ''}
                  >
                    <span className="sidebar__icon sidebar__icon--relative">
                      {item.icon}
                      {item.badge && (
                        <span className="sidebar__badge">{item.badge}</span>
                      )}
                    </span>
                    {isOpen && (
                      <span className="sidebar__label">{item.label}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Logout Button */}
            <button
              className="sidebar__logout"
              onClick={handleLogout}
              title={!isOpen ? 'ออกจากระบบ' : ''}
            >
              <span className="sidebar__icon">
                <LogOut className="h-5 w-5" />
              </span>
              {isOpen && <span className="sidebar__label">ออกจากระบบ</span>}
            </button>
          </div>
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="sidebar__footer">
            <div className="sidebar__version">
              <span>เวอร์ชัน 1.0.0</span>
            </div>
            <div className="sidebar__copyright">
              <span>คณะศึกษาศาสตร์</span>
              <span>มหาวิทยาลัยเกษตรศาสตร์</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
