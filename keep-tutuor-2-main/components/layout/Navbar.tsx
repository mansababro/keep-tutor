import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ViewMode } from '../../types';
import { Logo } from '../ui/Logo';
import Button from '../ui/Button';

interface NavbarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '🏠 Home', view: ViewMode.HOME },
    { label: '🎒 Student Portal', view: ViewMode.PARENT },
    { label: '📚 Tutor Portal', view: ViewMode.TEACHER },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'circOut' }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className={`pointer-events-auto relative transition-all duration-300 ease-out w-full max-w-5xl rounded-full border-2 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-brand-200 shadow-xl py-2'
            : 'bg-white border-brand-100 shadow-soft py-3'
        }`}
          style={scrolled ? { boxShadow: '0 4px 20px rgba(100,43,88,0.15), 3px 3px 0px rgba(100,43,88,0.1)' } : {}}
        >
          <div className="px-6 flex items-center justify-between">
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => setView(ViewMode.HOME)}>
              <Logo />
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => setView(link.view)}
                  className={`relative px-4 py-2 rounded-full text-sm font-fun font-bold transition-all duration-200 ${
                    currentView === link.view
                      ? 'text-brand-700'
                      : 'text-slate-500 hover:text-brand-800 hover:bg-brand-50'
                  }`}
                >
                  {currentView === link.view && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-brand-100 border-2 border-brand-300"
                      transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => setView(ViewMode.TEACHER)}>
                📚 Teach
              </Button>
              <Button size="sm" variant="fun" onClick={() => setView(ViewMode.PARENT)}>
                🎒 Find Tutor
              </Button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-brand-900 bg-brand-100 hover:bg-brand-200 transition-colors border-2 border-brand-200"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-28 px-6 overflow-y-auto"
          >
            {/* Stars decoration */}
            <div className="absolute top-20 right-8 text-2xl text-brand-200 animate-sparkle">✦</div>
            <div className="absolute bottom-20 left-8 text-xl text-accent-orange/30 animate-sparkle" style={{ animationDelay: '0.5s' }}>✦</div>

            <div className="flex flex-col gap-4 items-center">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => { setView(link.view); setMobileMenuOpen(false); }}
                  className={`w-full max-w-xs py-4 px-6 rounded-2xl text-xl font-fun font-bold transition-all manga-border ${
                    currentView === link.view
                      ? 'bg-brand-600 text-white border-brand-900'
                      : 'bg-brand-50 text-brand-900 border-brand-200 hover:bg-brand-100'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="mt-6 w-full max-w-xs space-y-3">
                <Button fullWidth size="lg" variant="fun" onClick={() => { setView(ViewMode.PARENT); setMobileMenuOpen(false); }}>
                  🎒 Student Portal
                </Button>
                <Button fullWidth size="lg" variant="primary" onClick={() => { setView(ViewMode.TEACHER); setMobileMenuOpen(false); }}>
                  📚 Tutor Portal
                </Button>
              </div>

              <p className="text-xs text-slate-400 mt-4 font-fun">✦ Keep Tutors — Level Up Your Learning!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
