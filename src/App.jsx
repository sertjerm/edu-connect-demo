import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Users, BookOpen, GraduationCap, DollarSign, Monitor, Tablet, Smartphone } from 'lucide-react'
import Sidebar from './components/common/Sidebar'
import { dashboardStats, appInfo } from './data/mockData'
import './App.scss'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true) // เปิด sidebar by default เหมือน DeviasKit
  const [currentPage, setCurrentPage] = useState('dashboard')

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  // Stats cards เหมือน DeviasKit
  const stats = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: "24k",
      label: "BUDGET",
      trend: "+12%",
      trendText: "Since last month",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: `${dashboardStats.studentsJoined / 100}k`,
      label: "TOTAL CUSTOMERS", 
      trend: "-16%",
      trendText: "Since last month",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500",
      isNegative: true
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: "75.5%",
      label: "TASK PROGRESS",
      trend: null,
      progressValue: 75.5,
      color: "text-orange-400", 
      bgColor: "bg-orange-500"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      value: "15k",
      label: "TOTAL PROFIT",
      trend: null,
      color: "text-indigo-400",
      bgColor: "bg-indigo-600"
    }
  ]

  // Traffic source data เหมือน DeviasKit
  const trafficSources = [
    { name: "Desktop", value: 63, icon: <Monitor className="w-5 h-5" /> },
    { name: "Tablet", value: 15, icon: <Tablet className="w-5 h-5" /> },
    { name: "Phone", value: 22, icon: <Smartphone className="w-5 h-5" /> }
  ]

  return (
    <div className="app">
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <main className={`app-main ${sidebarOpen ? 'app-main--sidebar-open' : 'app-main--sidebar-closed'}`}>
        
        {/* Top Stats Cards */}
        <div className="dashboard-header">
          <div className="stats-row">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-card__header">
                  <div className="stat-card__info">
                    <div className="stat-card__label">{stat.label}</div>
                    <div className="stat-card__value">{stat.value}</div>
                  </div>
                  <div className={`stat-card__icon ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                </div>
                
                {/* Trend indicator */}
                {stat.trend && (
                  <div className="stat-card__trend">
                    {stat.isNegative ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    )}
                    <span className={stat.isNegative ? "text-red-400" : "text-green-400"}>
                      {stat.trend}
                    </span>
                    <span className="text-gray-400">{stat.trendText}</span>
                  </div>
                )}
                
                {/* Progress bar */}
                {stat.progressValue && (
                  <div className="stat-card__progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-bar__fill"
                        style={{ width: `${stat.progressValue}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="dashboard-content">
          
          {/* Sales Chart Section */}
          <div className="dashboard-section">
            <div className="chart-card">
              <div className="chart-header">
                <h2 className="chart-title">Sales</h2>
                <button className="sync-btn">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Sync
                </button>
              </div>
              
              {/* Mock Chart Area */}
              <div className="chart-area">
                <div className="chart-bars">
                  {[20, 18, 15, 8, 5, 14, 14, 17, 19, 21, 19, 23].map((height, index) => (
                    <div 
                      key={index}
                      className="chart-bar"
                      style={{ height: `${height * 8}px` }}
                    />
                  ))}
                </div>
                <div className="chart-months">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                    <span key={index} className="chart-month">{month}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Traffic Source Card */}
            <div className="traffic-card">
              <h3 className="traffic-title">Traffic source</h3>
              
              {/* Donut Chart */}
              <div className="donut-chart">
                <svg viewBox="0 0 100 100" className="donut-svg">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="8"/>
                  {/* Progress circles */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="8"
                          strokeDasharray={`${63 * 2.51} 251`} strokeDashoffset="0" transform="rotate(-90 50 50)"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="8"
                          strokeDasharray={`${15 * 2.51} 251`} strokeDashoffset={`-${63 * 2.51}`} transform="rotate(-90 50 50)"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8"
                          strokeDasharray={`${22 * 2.51} 251`} strokeDashoffset={`-${(63 + 15) * 2.51}`} transform="rotate(-90 50 50)"/>
                </svg>
              </div>
              
              {/* Traffic Legend */}
              <div className="traffic-legend">
                {trafficSources.map((source, index) => (
                  <div key={index} className="legend-item">
                    {source.icon}
                    <div className="legend-info">
                      <div className="legend-name">{source.name}</div>
                      <div className="legend-value">{source.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Products & Orders */}
          <div className="dashboard-section">
            <div className="table-card">
              <h3 className="table-title">Latest products</h3>
              {/* Table placeholder */}
              <div className="table-placeholder">
                <div className="placeholder-item">
                  <div className="placeholder-avatar"></div>
                  <div className="placeholder-text">
                    <div className="placeholder-line"></div>
                    <div className="placeholder-line short"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="table-card">
              <h3 className="table-title">Latest orders</h3>
              {/* Table headers */}
              <div className="table-headers">
                <span>Order</span>
                <span>Customer</span> 
                <span>Date</span>
                <span>Status</span>
              </div>
              <div className="table-placeholder">
                <div className="placeholder-row">
                  <div className="placeholder-line"></div>
                  <div className="placeholder-line"></div>
                  <div className="placeholder-line"></div>
                  <div className="placeholder-badge"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default App
