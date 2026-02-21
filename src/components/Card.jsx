import React from 'react';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hoverEffect = true,
  ...props
}) => {
  const baseClasses = 'card rounded-lg transition-all duration-300 border border-brand-dark/20 bg-brand-bg/50 backdrop-blur-sm';

  const variants = {
    default: '',
    featured: 'ring-2 ring-core-red/20 bg-gradient-to-br from-core-gray-800/80 to-core-gray-900/80',
    dark: 'bg-core-gray-900/80 border-core-gray-600',
    light: 'bg-core-gray-700/30 border-core-gray-600',
    gradient: 'bg-gradient-to-br from-core-gray-800/70 to-core-gray-900/70 border-core-red/30',
  };

  const hoverClass = hoverEffect
    ? 'card-hover hover:border-2 hover:border-brand-primary hover:shadow-[0_0_25px_rgba(255,102,0,0.6)] hover:bg-brand-primary/10 transition-all duration-500'
    : 'hover:border-core-gray-600';

  const classes = [
    baseClasses,
    variants[variant],
    hoverClass,
    className
  ].join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-2xl font-bold leading-none tracking-tight text-white ${className}`} {...props}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-sm text-core-gray-400 ${className}`} {...props}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Fitness-specific card variants
const WorkoutCard = ({ title, description, duration, calories, ...props }) => {
  return (
    <Card variant="gradient" className="relative overflow-hidden" {...props}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-core-red/10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-core-orange/10 rounded-full -ml-12 -mb-12"></div>
      <CardHeader>
        <CardTitle className="text-core-white">{title}</CardTitle>
        <CardDescription className="text-core-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mt-4">
          <div className="text-core-gray-300">
            <p className="text-sm">Duration: <span className="text-core-orange font-bold">{duration}</span></p>
          </div>
          <div className="text-core-gray-300">
            <p className="text-sm">Calories: <span className="text-core-red font-bold">{calories}</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MembershipCard = ({ title, price, features, popular = false, ...props }) => {
  return (
    <Card
      variant={popular ? "featured" : "gradient"}
      className={popular ? "relative border-core-red/50" : ""}
      {...props}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-core-red text-white text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-core-white">{title}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold text-core-white">{price}</span>
          <span className="text-core-gray-400">/month</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-5 h-5 text-core-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-core-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

Card.Workout = WorkoutCard;
Card.Membership = MembershipCard;

export default Card;