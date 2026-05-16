import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'fun' | 'glow' | 'anime';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  icon,
  type = "button",
  fullWidth = false,
  loading = false,
  disabled = false
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-200 overflow-hidden tracking-tight disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none";
  
  const variants = {
    primary: "bg-brand-700 text-white hover:bg-brand-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-fun",
    secondary: "bg-white text-brand-900 border-2 border-brand-200 hover:border-brand-400 hover:bg-brand-50 font-fun manga-border",
    fun: "bg-accent-orange text-white border-2 border-brand-900 shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-fun shine-btn overflow-hidden",
    accent: "bg-brand-900 text-white hover:bg-brand-800 shadow-lg font-fun",
    outline: "border-2 border-brand-300 text-brand-700 hover:border-brand-500 hover:bg-brand-50 font-fun",
    ghost: "text-brand-600 hover:text-brand-800 hover:bg-brand-50/50 font-fun",
    glow: "bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5 font-fun",
    anime: "bg-accent-yellow text-brand-900 border-3 border-brand-900 shadow-pop-orange hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-fun manga-border-orange",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <span className="relative z-10 flex items-center gap-2 font-display">
        {loading && <Loader2 className="animate-spin" size={20} />}
        {children}
        {!loading && icon && <span className="ml-1 transition-transform group-hover:translate-x-1">{icon}</span>}
      </span>
    </motion.button>
  );
};

export default Button;