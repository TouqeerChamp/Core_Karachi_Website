import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-core-red disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-core-red text-white border border-core-red hover:bg-white hover:text-core-red hover:border-core-red',
    secondary: 'bg-core-orange text-white border border-core-orange hover:bg-white hover:text-core-orange hover:border-core-orange',
    outline: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black',
    'outline-red': 'bg-transparent text-core-red border-2 border-core-red hover:bg-core-red hover:text-white',
    dark: 'bg-black text-white border border-core-red hover:bg-core-red hover:text-black',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    disabledClasses,
    className
  ].join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;