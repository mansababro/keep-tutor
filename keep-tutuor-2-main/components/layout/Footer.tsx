import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Lock } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ViewMode } from '../../types';

interface FooterProps {
  onNavigate?: (view: ViewMode) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 border-t-4 border-brand-700 pt-16 pb-8 text-white relative overflow-hidden">
      {/* Anime grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-700/20 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent-orange/10 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-1">
            <div className="mb-5 bg-white p-2 rounded-xl inline-block cursor-pointer manga-border" onClick={() => onNavigate?.(ViewMode.HOME)}>
              <Logo />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Making education accessible, fun, and results-driven for everyone! ⚡
            </p>
            {/* Anime mascot badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-800 border border-brand-700 text-xs font-fun font-bold text-brand-300">
              <span className="animate-sparkle inline-block">✦</span> Level Up Your Learning
            </div>
          </div>

          {/* Portals */}
          <div>
            <h4 className="font-fun font-bold mb-5 text-white text-lg flex items-center gap-2">
              <span className="text-accent-orange">⚡</span> Portals
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate?.(ViewMode.PARENT)} className="hover:text-accent-yellow transition-colors text-left font-medium flex items-center gap-2 group">
                  <span className="group-hover:animate-sparkle">🎒</span> Student Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.(ViewMode.TEACHER)} className="hover:text-accent-yellow transition-colors text-left font-medium flex items-center gap-2 group">
                  <span className="group-hover:animate-sparkle">📚</span> Tutor Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.(ViewMode.PRICING)} className="hover:text-accent-yellow transition-colors text-left font-medium flex items-center gap-2 group">
                  <span className="group-hover:animate-sparkle">💰</span> Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-fun font-bold mb-5 text-white text-lg flex items-center gap-2">
              <span className="text-brand-400">✦</span> Company
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><button onClick={() => onNavigate?.(ViewMode.ABOUT)} className="hover:text-white transition-colors text-left">About Us</button></li>
              <li><button onClick={() => onNavigate?.(ViewMode.CAREERS)} className="hover:text-white transition-colors text-left">Careers</button></li>
              <li><button onClick={() => onNavigate?.(ViewMode.CONTACT)} className="hover:text-white transition-colors text-left">Contact</button></li>
              <li>
                <button onClick={() => onNavigate?.(ViewMode.ADMIN)} className="hover:text-brand-400 transition-colors font-semibold text-left flex items-center gap-1">
                  <Lock size={12} /> Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-fun font-bold mb-5 text-white text-lg flex items-center gap-2">
              <span className="text-accent-teal">★</span> Follow Us
            </h4>
            <div className="flex gap-3 mb-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all manga-border border-slate-700">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-brand-800/50 border border-brand-700">
              <p className="text-xs text-slate-400 leading-relaxed">
                📍 Pakistan's #1 tutoring platform since 2016.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-fun">
            © 2025 KEEP TUTORS ✦ MADE WITH ❤️ IN PAKISTAN
          </p>
          <div className="flex gap-5 text-xs text-slate-500 uppercase font-bold items-center">
            <button onClick={() => onNavigate?.(ViewMode.PRIVACY)} className="hover:text-white transition-colors font-fun">Privacy</button>
            <button onClick={() => onNavigate?.(ViewMode.TERMS)} className="hover:text-white transition-colors font-fun">Terms</button>
            <button
              onClick={() => onNavigate?.(ViewMode.ADMIN)}
              className="flex items-center gap-1 text-slate-700 hover:text-brand-400 transition-colors"
              title="Admin Login"
            >
              <Lock size={10} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
