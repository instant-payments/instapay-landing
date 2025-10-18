import React from 'react';
import { Link, ArrowRight } from 'lucide-react';

interface BuyNowButtonProps {
  onClick?: () => void;
  className?: string;
}

const BuyNowButton: React.FC<BuyNowButtonProps> = ({ onClick, className = '' }) => {
  return (
    <div className="relative">
      {/* Pulse animation around the button */}
      <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping" />
      <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse" />

      <button
        onClick={onClick}
        className={`
        relative
        bg-white/20
        hover:bg-white/30
        rounded-xl
        shadow-lg
        flex
        items-center
        justify-center
        gap-2
        px-4
        py-2
        transition-all
        duration-200
        active:bg-white/40
        hover:scale-105
        ${className}
      `}
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Link size={16} className="text-white" strokeWidth={1.5} />
        <span
          className="text-white font-bold text-lg"
          style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            letterSpacing: '0.5px',
          }}
        >
          BUY NOW
        </span>
        <ArrowRight size={16} className="text-white" />
      </button>
    </div>
  );
};

export default BuyNowButton;
