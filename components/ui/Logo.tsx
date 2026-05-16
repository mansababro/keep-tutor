import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC<{ light?: boolean }> = ({ light = true }) => (
  <motion.div 
    className="flex items-center gap-2"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Logo Icon SVG */}
    <div className="relative w-12 h-12">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* The 'K' part - Deep Purple */}
            <path d="M10 10 H30 V90 H10 V10 Z" fill="#642b58" />
            <path d="M30 50 L50 10 H70 L45 50 L75 90 H50 L30 50 Z" fill="#642b58" />
            
            {/* The Lightbulb/Circle Part - Orange */}
            <circle cx="75" cy="50" r="22" fill="#F08C26" />
            
            {/* White lines inside bulb representing books/E */}
            <path d="M68 40 H82" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <path d="M68 50 H82" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <path d="M68 60 H82" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            
            {/* Rays on top */}
            <path d="M75 18 V24" stroke="#F08C26" strokeWidth="3" strokeLinecap="round"/>
            <path d="M90 22 L86 27" stroke="#F08C26" strokeWidth="3" strokeLinecap="round"/>
            <path d="M60 22 L64 27" stroke="#F08C26" strokeWidth="3" strokeLinecap="round"/>
            
            {/* Bulb Base */}
            <path d="M70 72 H80 L78 80 H72 L70 72 Z" fill="#F08C26" />
        </svg>
    </div>
    
    <div className="flex flex-col justify-center leading-none">
      <span className="font-display font-black text-2xl tracking-wide text-brand-700">KEEP</span>
      <span className="font-display font-bold text-[10px] tracking-[0.2em] uppercase text-brand-700 mt-0.5 ml-0.5">TUTORS</span>
    </div>
  </motion.div>
);