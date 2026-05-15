import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewMode } from './types';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy load views for better performance
const HomeView = lazy(() => import('./views/HomeView'));
const TeacherView = lazy(() => import('./views/TeacherView'));
const ParentView = lazy(() => import('./views/ParentView'));
const AdminView = lazy(() => import('./views/AdminView'));
const PricingView = lazy(() => import('./views/PricingView'));
const AboutView = lazy(() => import('./views/AboutView'));
const CareersView = lazy(() => import('./views/CareersView'));
const ContactView = lazy(() => import('./views/ContactView'));
const LegalView = lazy(() => import('./views/LegalView'));

// Enhanced loading component with brand theme
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-50">
    <div className="text-center max-w-md w-full px-4">
      {/* Animated Logo */}
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 animate-pulse shadow-lg"></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 animate-ping opacity-75"></div>
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-2xl font-display font-bold text-brand-900 mb-3">Keep Tutors</h2>
      <p className="text-brand-600 font-medium mb-6">Loading your learning experience...</p>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-brand-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-brand-500 via-accent-orange to-brand-500 animate-pulse"></div>
      </div>

      {/* Skeleton Cards */}
      <div className="mt-12 space-y-4">
        <div className="h-16 skeleton rounded-2xl"></div>
        <div className="h-12 skeleton rounded-2xl w-3/4"></div>
        <div className="h-12 skeleton rounded-2xl w-1/2"></div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.HOME);

  // Transition variants for switching views
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.5
  };

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case ViewMode.TEACHER:
        return <TeacherView />;
      case ViewMode.PARENT:
        return <ParentView />;
      case ViewMode.ADMIN:
        return <AdminView />;
      case ViewMode.PRICING:
        return <PricingView onNavigate={setCurrentView} />;
      case ViewMode.ABOUT:
        return <AboutView />;
      case ViewMode.CAREERS:
        return <CareersView onNavigate={setCurrentView} />;
      case ViewMode.CONTACT:
        return <ContactView />;
      case ViewMode.PRIVACY:
        return <LegalView type="PRIVACY" />;
      case ViewMode.TERMS:
        return <LegalView type="TERMS" />;
      case ViewMode.HOME:
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white selection:bg-brand-100 selection:text-brand-900">
      <Navbar currentView={currentView} setView={setCurrentView} />

      <main>
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Pass navigate function to Footer so we can trigger navigation */}
      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

export default App;