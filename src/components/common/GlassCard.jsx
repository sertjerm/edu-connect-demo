import React from 'react';
import PropTypes from 'prop-types';

/**
 * GlassCard Component - Reusable glass morphism card
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.hover - Enable hover effects
 * @param {string} props.variant - Card variant (default, stats, nav, lesson)
 * @param {boolean} props.center - Center content
 * @param {string} props.padding - Custom padding
 */
const GlassCard = ({
  children,
  className = '',
  onClick,
  hover = false,
  variant = 'default',
  center = false,
  padding = 'p-6',
  ...props
}) => {
  // Base classes for glass effect
  const baseClasses = 'glass rounded-3xl text-white backdrop-blur-lg border border-white/20';
  
  // Variant-specific classes
  const variantClasses = {
    default: '',
    stats: 'text-center animate-fade-in',
    nav: 'text-center hover:scale-105',
    lesson: 'space-y-4',
    upload: 'border-2 border-dashed border-white/40 hover:border-white/60 hover:bg-white/10'
  };
  
  // Hover effect classes
  const hoverClasses = hover || onClick ? 
    'hover:bg-white/30 hover:border-white/30 hover:shadow-glow-purple cursor-pointer transition-all duration-300 transform hover:scale-105' : 
    'transition-all duration-300';
  
  // Center content classes
  const centerClasses = center ? 'flex items-center justify-center' : '';
  
  // Combine all classes
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    centerClasses,
    padding,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={combinedClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  hover: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'stats', 'nav', 'lesson', 'upload']),
  center: PropTypes.bool,
  padding: PropTypes.string
};

export default GlassCard;