import React from 'react';
import PropTypes from 'prop-types';

/**
 * ActionButton Component - Reusable button with various styles
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {string} props.size - Button size
 * @param {boolean} props.fullWidth - Full width button
 * @param {string} props.className - Additional CSS classes
 */
const ActionButton = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  size = 'default',
  fullWidth = true,
  className = '',
  type = 'button',
  ...props
}) => {
  // Base button classes
  const baseClasses = 'font-semibold rounded-full flex items-center justify-center gap-3 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-white/20';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl',
    upload: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl',
    glass: 'bg-white/20 backdrop-blur-lg border border-white/20 text-white hover:bg-white/30',
    outline: 'border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl'
  };
  
  // Size classes
  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    default: 'py-4 px-6 text-base',
    large: 'py-5 px-8 text-lg'
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Hover and active effects
  const interactionClasses = !disabled && !loading ? 
    'hover:scale-105 active:scale-95' : 
    '';
  
  // Disabled state classes
  const disabledClasses = disabled || loading ? 
    'opacity-50 cursor-not-allowed transform-none' : 
    'cursor-pointer';
  
  // Combine all classes
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    interactionClasses,
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary', 'secondary', 'upload', 'glass', 'outline', 
    'success', 'warning', 'danger'
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default ActionButton;