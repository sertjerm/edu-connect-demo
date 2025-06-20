// src/components/common/Sidebar/Sidebar.jsx
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
  ChevronRight
} from 'lucide-react';
import '../../styles/common/Sidebar.scss'; // Import your CSS styles for the sidebar

const Sidebar = ({ isOpen, onToggle, currentPage, onPageChange }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    {
      id: 'dashboard',
      label: 'หน้าหลัก',
      icon: <Home className="w-5 h-5" />,
      path: 'dashboard'
    },
    {
      id: 'stats',
      label: 'สถิติการใช้งาน',
      icon: <BarChart3 className="w-5 h-5" />,
      path: 'stats'
    },
    {
      id: 'management',
      label: 'ระบบจัดการทรัพยากร',
      icon: <GraduationCap className="w-5 h-5" />,
      path: 'management',
      submenu: [
        { id: 'teacher', label: 'อาจารย์', icon: '👩‍🏫' },
        { id: 'student', label: 'นักเรียน', icon: '👨‍🎓' }
      ]
    },
    {
      id: 'documents',
      label: 'นำเข้าเอกสารและบทเรียน',
      icon: <BookOpen className="w-5 h-5" />,
      path: 'documents'
    },
    {
      id: 'lessons',
      label: 'จัดการบทเรียน',
      icon: <FileText className="w-5 h-5" />,
      path: 'lessons'
    },
    {
      id: 'upload',
      label: 'อัปโหลดไฟล์',
      icon: <Upload className="w-5 h-5" />,
      path: 'upload'
    },
    {
      id: 'users',
      label: 'จัดการผู้ใช้',
      icon: <Users className="w-5 h-5" />,
      path: 'users'
    }
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'ตั้งค่า',
      icon: <Settings className="w-5 h-5" />,
      path: 'settings'
    },
    {
      id: 'logout',
      label: 'ออกจากระบบ',
      icon: <LogOut className="w-5 h-5" />,
      action: 'logout'
    }
  ];

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleMenuClick = (item) => {
    if (item.submenu) {
      toggleSubmenu(item.id);
    } else if (item.action === 'logout') {
      // Handle logout
      console.log('Logout clicked');
    } else {
      onPageChange(item.path);
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
        {/* Header */}
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <BookOpen className="w-8 h-8 text-white" />
            {isOpen && (
              <div className="sidebar__logo-text">
                <h1 className="sidebar__title">EduConnect</h1>
                <p className="sidebar__subtitle">ระบบจัดการการเรียนรู้</p>
              </div>
            )}
          </div>
          
          <button 
            className="sidebar__toggle"
            onClick={onToggle}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav">
          <div className="sidebar__menu">
            {menuItems.map((item) => (
              <div key={item.id} className="sidebar__menu-item">
                <button
                  className={`sidebar__button ${
                    currentPage === item.path ? 'sidebar__button--active' : ''
                  }`}
                  onClick={() => handleMenuClick(item)}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  {isOpen && (
                    <>
                      <span className="sidebar__label">{item.label}</span>
                      {item.submenu && (
                        <span className="sidebar__chevron">
                          {expandedMenus[item.id] ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </span>
                      )}
                    </>
                  )}
                </button>

                {/* Submenu */}
                {item.submenu && isOpen && expandedMenus[item.id] && (
                  <div className="sidebar__submenu">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.id}
                        className="sidebar__submenu-button"
                        onClick={() => onPageChange(subItem.id)}
                      >
                        <span className="sidebar__submenu-icon">{subItem.icon}</span>
                        <span className="sidebar__submenu-label">{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Menu */}
          <div className="sidebar__bottom-menu">
            {bottomMenuItems.map((item) => (
              <button
                key={item.id}
                className={`sidebar__button ${
                  currentPage === item.path ? 'sidebar__button--active' : ''
                }`}
                onClick={() => handleMenuClick(item)}
              >
                <span className="sidebar__icon">{item.icon}</span>
                {isOpen && <span className="sidebar__label">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="sidebar__footer">
            <p className="sidebar__version">v1.0.0</p>
            <p className="sidebar__copyright">
              คณะศึกษาศาสตร์<br />
              มหาวิทยาลัยเกษตรศาสตร์
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;