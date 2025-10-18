import { cn } from '@/lib/utils/tailwindcss';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  classes?: Partial<{
    input: string;
    label: string;
    error: string;
    container: string;
  }>;
}

const Input: React.FC<InputProps> = ({ label, error, icon, className = '', classes, ...props }) => {
  return (
    <div className={cn('space-y-1 w-full')}>
      {label && (
        <label className={cn('block text-xs font-medium text-gray-700 mb-1', classes?.label)}>
          {label}
        </label>
      )}
      <div className={cn('relative bg-transparent', classes?.container)}>
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white text-sm',
            icon && 'pl-9',
            error && 'border-red-300',
            className,
            classes?.input
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
