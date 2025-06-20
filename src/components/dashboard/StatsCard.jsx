// src/components/dashboard/StatsCard/StatsCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import GlassCard from '../common/GlassCard';
import "../../styles/dashboard/StatsCard.scss"; // Import your CSS styles for the StatsCard

/**
 * StatsCard Component - Display statistical data
 * @param {Object} props - Component props
 * @param {string|number} props.value - Statistical value
 * @param {string} props.label - Label for the statistic
 * @param {string} props.icon - Icon component or emoji
 * @param {string} props.color - Color theme for the value
 * @param {string} props.trend - Trend indicator (up, down, stable)
 * @param {string} props.trendValue - Trend percentage
 * @param {boolean} props.animate - Enable animation
 * @param {Function} props.onClick - Click handler
 */
const StatsCard = ({
  value,
  label,
  icon,
  color = 'text-secondary-300',
  trend,
  trendValue,
  animate = true,
  onClick,
  className = '',
}) => {
  // Trend icon and color mapping
  const getTrendIcon = trendType => {
    switch (trendType) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      case 'stable':
        return '➡️';
      default:
        return '';
    }
  };

  const getTrendColor = trendType => {
    switch (trendType) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      case 'stable':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <GlassCard
      variant="stats"
      onClick={onClick}
      hover={!!onClick}
      className={`stats-card ${animate ? 'stats-card--animate' : ''} ${className}`}
    >
      {/* Icon */}
      {icon && (
        <div className="stats-card__icon">
          {typeof icon === 'string' ? (
            <span className="stats-card__emoji">{icon}</span>
          ) : (
            <div className="stats-card__icon-wrapper">{icon}</div>
          )}
        </div>
      )}

      {/* Value */}
      <div className={`stats-card__value ${color}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>

      {/* Label */}
      <div className="stats-card__label">{label}</div>

      {/* Trend Indicator */}
      {trend && trendValue && (
        <div className={`stats-card__trend ${getTrendColor(trend)}`}>
          <span className="stats-card__trend-icon">{getTrendIcon(trend)}</span>
          <span className="stats-card__trend-value">{trendValue}</span>
          <span className="stats-card__trend-text">จากเดือนที่แล้ว</span>
        </div>
      )}
    </GlassCard>
  );
};

StatsCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.string,
  trend: PropTypes.oneOf(['up', 'down', 'stable']),
  trendValue: PropTypes.string,
  animate: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default StatsCard;
