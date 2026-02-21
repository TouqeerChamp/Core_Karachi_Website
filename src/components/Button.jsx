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
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-primary text-white border border-brand-primary hover:bg-brand-primary/90 hover:text-white hover:border-brand-primary',
    secondary: 'bg-brand-dark text-white border border-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary',
    outline: 'bg-transparent text-brand-dark border-2 border-brand-dark hover:bg-brand-dark hover:text-white',
    'outline-orange': 'bg-transparent text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white',
    'outline-dark': 'bg-transparent text-brand-dark border-2 border-brand-dark hover:bg-brand-dark hover:text-white',
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