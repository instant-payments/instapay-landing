const sizeClasses = {
  sm: 'w-8 h-8 rounded-lg',
  md: 'w-12 h-12 rounded-xl',
  lg: 'w-16 h-16 rounded-2xl',
  xl: 'w-20 h-20 rounded-2xl',
  '2xl': 'w-24 h-24 rounded-3xl',
};

const variantClasses = {
  purple: 'bg-gradient-to-br from-purple-500 to-purple-700',
  pink: 'bg-gradient-to-br from-purple-500 to-pink-500',
  blue: 'bg-gradient-to-br from-blue-500 to-purple-600',
  dark: 'bg-slate-900',
  light: 'bg-white border border-slate-200',
};

type Props = {
  size: keyof typeof sizeClasses;
  variant: keyof typeof variantClasses;
  className?: string;
};

const IconBackground: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  size = 'md',
  variant = 'purple',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        flex items-center justify-center 
        shadow-lg 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default IconBackground;
