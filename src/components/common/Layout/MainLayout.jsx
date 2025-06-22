// src/components/common/Layout/MainLayout.jsx
import React, { useState } from 'react';
import { 
  Menu, 
  Home, 
  Users, 
  BookOpen, 
  FileText, 
  Settings,
  ChevronRight,
  Bell
} from 'lucide-react';

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  
  const menuItems = [
    {
      id: 'dashboard',
      icon: <Home size={14} />,
      label: 'หน้าหลัก',
      path: '/dashboard'
    },
    {
      id: 'users',
      icon: <Users size={14} />,
      label: 'จัดการผู้ใช้งาน',
      path: '/users'
    },
    {
      id: 'lessons',
      icon: <BookOpen size={14} />,
      label: 'จัดการบทเรียน',
      submenu: [
        { id: 'lessons-list', label: 'รายการบทเรียน', path: '/lessons' },
        { id: 'lessons-create', label: 'สร้างบทเรียนใหม่', path: '/lessons/create' }
      ]
    },
    {
      id: 'documents',
      icon: <FileText size={14} />,
      label: 'จัดการเอกสาร',
      submenu: [
        { id: 'docs-list', label: 'รายการเอกสาร', path: '/documents' },
        { id: 'docs-upload', label: 'อัปโหลดเอกสาร', path: '/documents/upload' }
      ]
    },
    {
      id: 'settings',
      icon: <Settings size={14} />,
      label: 'ตั้งค่าระบบ',
      path: '/settings'
    }
  ];
  
  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedMenus(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
    }
  };
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Sarabun, sans-serif', background: '#f5f5f5' }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        width: collapsed ? '80px' : '256px',
        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
        background: '#001529',
        boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flex: 1,
            minWidth: 0
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #1890ff, #722ed1)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              fontSize: '16px',
              flexShrink: 0
            }}>
              ED
            </div>
            {!collapsed && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0
              }}>
                <div style={{
                  fontFamily: 'Sarabun, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.5,
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  ระบบจัดการทรัพยากรการเรียนรู้ดิจิทัล
                </div>
                <div style={{
                  fontFamily: 'Sarabun, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.65)',
                  lineHeight: 1.5,
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  คณะศึกษาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: '8px 0',
          overflowY: 'auto'
        }}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {menuItems.map(item => (
              <li key={item.id} style={{ position: 'relative' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: collapsed ? '16px 24px' : '12px 24px',
                    color: item.id === 'dashboard' ? '#fff' : 'rgba(255, 255, 255, 0.75)',
                    textDecoration: 'none',
                    border: 'none',
                    background: item.id === 'dashboard' ? '#1890ff' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: 'Sarabun, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    textAlign: 'left',
                    position: 'relative',
                    justifyContent: collapsed ? 'center' : 'flex-start'
                  }}
                  onClick={() => handleMenuClick(item)}
                  title={collapsed ? item.label : ''}
                  onMouseEnter={(e) => {
                    if (item.id !== 'dashboard') {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (item.id !== 'dashboard') {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'rgba(255, 255, 255, 0.75)';
                    }
                  }}
                >
                  <span style={{
                    width: '14px',
                    height: '14px',
                    marginRight: collapsed ? 0 : '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </span>
                  
                  {!collapsed && (
                    <>
                      <span style={{
                        flex: 1,
                        minWidth: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {item.label}
                      </span>
                      {item.submenu && (
                        <span style={{
                          width: '14px',
                          height: '14px',
                          marginLeft: 'auto',
                          transition: 'transform 0.3s',
                          flexShrink: 0,
                          transform: expandedMenus[item.id] ? 'rotate(90deg)' : 'rotate(0deg)'
                        }}>
                          <ChevronRight size={14} />
                        </span>
                      )}
                    </>
                  )}
                </button>
                
                {/* Submenu */}
                {item.submenu && !collapsed && expandedMenus[item.id] && (
                  <ul style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    background: 'rgba(0, 0, 0, 0.2)'
                  }}>
                    {item.submenu.map(subItem => (
                      <li key={subItem.id}>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          padding: '12px 24px',
                          paddingLeft: '52px',
                          color: 'rgba(255, 255, 255, 0.75)',
                          textDecoration: 'none',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          fontFamily: 'Sarabun, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          textAlign: 'left'
                        }}>
                          <span style={{
                            flex: 1,
                            minWidth: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
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
        </nav>
        
        {/* User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: 'auto',
          gap: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s',
          justifyContent: collapsed ? 'center' : 'flex-start'
        }}>
          <div style={{
            position: 'relative',
            flexShrink: 0
          }}>
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face&auto=format&q=60" 
              alt="Profile"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '10px',
              height: '10px',
              background: '#52c41a',
              border: '2px solid #001529',
              borderRadius: '50%'
            }}></div>
          </div>
          {!collapsed && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0
            }}>
              <div style={{
                fontFamily: 'Sarabun, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.5,
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                สมหญิง ใจดี
              </div>
              <div style={{
                fontFamily: 'Sarabun, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.5,
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                ผู้ดูแลระบบ
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
        marginLeft: collapsed ? '80px' : '256px'
      }}>
        {/* Header */}
        <header style={{
          height: '64px',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 0,
          position: 'relative',
          zIndex: 10
        }}>
          <button 
            style={{
              width: '64px',
              height: '64px',
              border: 'none',
              background: 'transparent',
              color: 'rgba(0, 0, 0, 0.65)',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setCollapsed(!collapsed)}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0, 0, 0, 0.05)';
              e.target.style.color = 'rgba(0, 0, 0, 0.85)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'rgba(0, 0, 0, 0.65)';
            }}
          >
            <Menu size={16} />
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingRight: '24px'
          }}>
            <button style={{
              border: 'none',
              background: 'transparent',
              padding: '8px',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'rgba(0, 0, 0, 0.65)',
              transition: 'all 0.3s'
            }}>
              <Bell size={16} />
            </button>
          </div>
        </header>
        
        {/* Content */}
        <main style={{
          flex: 1,
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          borderRadius: '8px',
          minHeight: '280px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;