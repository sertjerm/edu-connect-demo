// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
} from 'lucide-react';
import './App.scss';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for stats
  const stats = [
    {
      label: 'Total Users',
      value: '8,549',
      icon: <Users className="h-6 w-6" />,
      bgColor: 'bg-blue-500',
      trend: '+12%',
      trendText: 'from last month',
      isNegative: false,
      progressValue: 75,
    },
    {
      label: 'Sales',
      value: '$12,426',
      icon: <ShoppingCart className="h-6 w-6" />,
      bgColor: 'bg-green-500',
      trend: '+8%',
      trendText: 'from last month',
      isNegative: false,
      progressValue: 60,
    },
    {
      label: 'Revenue',
      value: '$45,678',
      icon: <DollarSign className="h-6 w-6" />,
      bgColor: 'bg-purple-500',
      trend: '-3%',
      trendText: 'from last month',
      isNegative: true,
      progressValue: 45,
    },
    {
      label: 'Page Views',
      value: '1,24,567',
      icon: <Eye className="h-6 w-6" />,
      bgColor: 'bg-orange-500',
      trend: '+15%',
      trendText: 'from last month',
      isNegative: false,
      progressValue: 80,
    },
  ];

  // Mock data for traffic sources
  const trafficSources = [
    {
      name: 'Desktop',
      value: '63',
      icon: (
        <div
          className="legend-dot"
          style={{ backgroundColor: '#6366f1' }}
        ></div>
      ),
    },
    {
      name: 'Tablet',
      value: '15',
      icon: (
        <div
          className="legend-dot"
          style={{ backgroundColor: '#f59e0b' }}
        ></div>
      ),
    },
    {
      name: 'Phone',
      value: '22',
      icon: (
        <div
          className="legend-dot"
          style={{ backgroundColor: '#10b981' }}
        ></div>
      ),
    },
  ];

  return (
    <div className="app">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main
        className={`app-main ${
          sidebarOpen ? 'app-main--sidebar-open' : 'app-main--sidebar-closed'
        }`}
      >
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
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    )}
                    <span
                      className={
                        stat.isNegative ? 'text-red-400' : 'text-green-400'
                      }
                    >
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
        <div className="dashboard-content">dfsdfdsfsdf</div>
      </main>
    </div>
  );
}

export default App;
