import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-sm font-fun font-bold text-brand-800 ml-1">{label}</label>
    <input
      {...props}
      className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-brand-200 text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none transition-all duration-200 shadow-sm font-medium hover:border-brand-300"
    />
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, children, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-sm font-fun font-bold text-brand-800 ml-1">{label}</label>
    <div className="relative">
      <select
        {...props}
        className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-brand-200 text-slate-900 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none transition-all duration-200 appearance-none cursor-pointer shadow-sm font-medium hover:border-brand-300"
      >
        {children}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
);