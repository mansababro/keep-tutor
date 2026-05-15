import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle, UserPlus, LogIn, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { mockBackend } from '../services/mockBackend';

const BENEFITS = [
  { icon: '💰', title: 'High Earnings', desc: 'Keep 90% of your earnings — the lowest platform fee in Pakistan!', color: 'bg-yellow-50 border-yellow-300', tag: 'bg-yellow-100 text-yellow-800' },
  { icon: '🌍', title: 'Teach Globally', desc: 'Reach students from all over the world with our online platform.', color: 'bg-sky-50 border-sky-300', tag: 'bg-sky-100 text-sky-800' },
  { icon: '⏰', title: 'Flexible Hours', desc: "You're the boss! Manage your own schedule and availability.", color: 'bg-purple-50 border-purple-300', tag: 'bg-purple-100 text-purple-800' },
  { icon: '🚀', title: 'Instant Bookings', desc: 'Get matched with students immediately after verification.', color: 'bg-green-50 border-green-300', tag: 'bg-green-100 text-green-800' },
];

const ONBOARDING_STEPS = [
  { num: '01', title: 'Create Your Profile', desc: 'Showcase your qualifications and teaching style.', icon: '👤' },
  { num: '02', title: 'Get Verified', desc: 'We review your credentials to maintain quality.', icon: '✅' },
  { num: '03', title: 'Start Teaching!', desc: 'Get booked by eager students right away!', icon: '🚀' },
];

type AuthState = 'none' | 'login' | 'signup' | 'authenticated';

const TeacherView: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('none');
  const [user, setUser] = useState<{name: string; email: string} | null>(null);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [appData, setAppData] = useState({ education: 'Bachelors', subject: 'Math' });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateAuth = (type: 'login' | 'signup') => {
    const errors: {[key: string]: string} = {};
    if (type === 'signup' && !authForm.name.trim()) errors.name = 'Full Name is required';
    if (!authForm.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(authForm.email)) errors.email = 'Invalid email format';
    if (!authForm.password) errors.password = 'Password is required';
    else if (authForm.password.length < 6) errors.password = 'Must be at least 6 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAuth = async (type: 'login' | 'signup') => {
    setAuthError('');
    if (!validateAuth(type)) return;
    setAuthLoading(true);
    const res = type === 'login'
      ? await mockBackend.login(authForm.email, authForm.password, 'TEACHER')
      : await mockBackend.signup(authForm.name, authForm.email, authForm.password, 'TEACHER');
    setAuthLoading(false);
    if (res.success && res.user) {
      setUser(res.user);
      setAuthState('authenticated');
      setAuthForm({ name: '', email: '', password: '' });
      setFormErrors({});
    } else {
      setAuthError(res.message || 'Authentication failed');
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    await mockBackend.submitTeacherApplication({
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1] || '',
      email: user.email,
      education: appData.education,
      subject: appData.subject
    });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans">

      {/* ===== HERO BANNER ===== */}
      <div className="relative pt-28 pb-20 px-4 overflow-hidden bg-gradient-to-br from-accent-orange via-orange-600 to-brand-700">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-8 right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-4 left-12 w-32 h-32 bg-brand-600/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

        {/* Stars */}
        <div className="absolute top-16 left-10 text-2xl text-white/40 animate-sparkle">✦</div>
        <div className="absolute top-32 right-24 text-xl text-accent-yellow/60 animate-sparkle" style={{ animationDelay: '0.6s' }}>✦</div>
        <div className="absolute bottom-16 right-10 text-3xl text-white/30 animate-sparkle" style={{ animationDelay: '1.1s' }}>✦</div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 font-fun font-bold text-sm mb-6 backdrop-blur-sm"
              >
                <span className="animate-sparkle">✦</span> Tutor Portal
                <span className="animate-sparkle" style={{ animationDelay: '0.5s' }}>✦</span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-fun font-bold mb-6 leading-[1.15]">
                <span className="block text-white">Teach Your Way.</span>
                <span className="block text-accent-yellow">Earn What You</span>
                <span className="text-white">Deserve! 🧑‍🏫</span>
              </h1>

              <p className="text-xl text-white/80 mb-8 max-w-lg leading-relaxed font-medium">
                Join the fastest-growing tutor network. Zero signup fees, guaranteed payments, and a community that has your back!
              </p>

              <div className="flex flex-wrap gap-4">
                {[
                  { val: '90%', label: 'You Keep', icon: '💰' },
                  { val: '3,019+', label: 'Active Tutors', icon: '🧑‍🏫' },
                  { val: 'Zero', label: 'Signup Fee', icon: '🎁' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-2xl px-4 py-2 backdrop-blur-sm"
                  >
                    <span className="text-xl">{stat.icon}</span>
                    <div>
                      <div className="font-fun font-bold text-white text-sm">{stat.val}</div>
                      <div className="text-white/60 text-xs">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Big emoji */}
            <motion.div
              initial={{ scale: 0, rotate: 20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.4, delay: 0.3 }}
              className="hidden lg:flex items-center justify-center w-48 h-48 rounded-3xl bg-white/10 border-2 border-white/20 text-8xl animate-float backdrop-blur-sm manga-border"
            >
              🧑‍🏫
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== BENEFITS ===== */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent-orange text-white font-fun font-bold text-sm manga-border mb-4">
              ⚡ Tutor Power-Ups
            </span>
            <h2 className="text-4xl font-fun font-bold text-brand-900">Why Tutors Love Us!</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-6 bg-white rounded-3xl manga-border ${b.color} flex flex-col gap-3`}
              >
                <div className="text-4xl animate-float inline-block" style={{ animationDelay: `${i * 0.4}s` }}>{b.icon}</div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-fun font-bold ${b.tag} w-fit`}>Power-Up!</span>
                <h3 className="text-lg font-fun font-bold text-slate-900">{b.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPLICATION SECTION ===== */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Onboarding Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-fun font-bold text-brand-900 mb-3">
              Simple Onboarding!
            </h2>
            <p className="text-slate-500 mb-10 text-lg">3 steps and you're ready to inspire young minds! ✦</p>

            <div className="space-y-8">
              {ONBOARDING_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-5 items-start"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-900 text-white font-fun font-bold text-lg flex items-center justify-center shrink-0 manga-border animate-pop-in" style={{ animationDelay: `${i * 0.2}s` }}>
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{step.icon}</span>
                      <h4 className="font-fun font-bold text-slate-900 text-xl">{step.title}</h4>
                    </div>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pro tip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-12 p-6 bg-accent-yellow/20 rounded-2xl border-2 border-accent-yellow manga-border relative overflow-hidden"
            >
              <div className="absolute top-2 right-4 text-4xl opacity-20">💡</div>
              <h4 className="font-fun font-bold text-brand-900 mb-2 flex items-center gap-2">
                <span className="animate-sparkle inline-block">✦</span> Sensei Pro Tip!
              </h4>
              <p className="text-sm text-slate-700 font-medium">
                Tutors with video introductions get <strong>3x more bookings!</strong> Add a short intro video to your profile for best results.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Auth + Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] manga-border-lg p-8 relative overflow-hidden min-h-[480px] flex flex-col justify-center"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent-orange via-brand-500 to-brand-700 rounded-t-[2rem]"></div>

            <AnimatePresence mode="wait">

              {/* STATE 1: INITIAL */}
              {authState === 'none' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="text-6xl mb-6 inline-block animate-float"
                  >
                    🧑‍🏫
                  </motion.div>
                  <h3 className="text-2xl font-fun font-bold text-brand-900 mb-3">Start Your Journey!</h3>
                  <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                    Create an account or log in to submit your teacher application.
                  </p>
                  <div className="space-y-3">
                    <Button fullWidth variant="fun" icon={<UserPlus size={18} />} onClick={() => { setFormErrors({}); setAuthError(''); setAuthState('signup'); }}>
                      Create Teacher Account
                    </Button>
                    <Button fullWidth variant="secondary" icon={<LogIn size={18} />} onClick={() => { setFormErrors({}); setAuthError(''); setAuthState('login'); }}>
                      Login to Account
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400 mt-6">✓ Free to join • ✓ Instant approval • ✓ No hidden fees</p>
                </motion.div>
              )}

              {/* STATE 2: LOGIN */}
              {authState === 'login' && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <button onClick={() => setAuthState('none')} className="text-slate-400 hover:text-brand-600 text-sm font-bold transition-colors">← Back</button>
                    <h3 className="text-2xl font-fun font-bold text-brand-900 mx-auto">🔑 Teacher Login</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Input label="📧 Email" type="email" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} placeholder="you@email.com" />
                      {formErrors.email && <span className="text-xs text-red-500 font-bold ml-1 mt-1 flex items-center gap-1">⚠️ {formErrors.email}</span>}
                    </div>
                    <div>
                      <Input label="🔒 Password" type="password" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} placeholder="••••••" />
                      {formErrors.password && <span className="text-xs text-red-500 font-bold ml-1 mt-1 flex items-center gap-1">⚠️ {formErrors.password}</span>}
                    </div>
                    {authError && (
                      <div className="text-red-600 text-xs font-bold bg-red-50 p-3 rounded-xl flex items-center gap-2 border border-red-200">
                        <AlertCircle size={14} /> {authError}
                      </div>
                    )}
                    <Button fullWidth loading={authLoading} onClick={() => handleAuth('login')}>Login →</Button>
                  </div>
                  <p className="text-center mt-4 text-sm text-slate-400">
                    No account?{' '}
                    <button onClick={() => { setFormErrors({}); setAuthError(''); setAuthState('signup'); }} className="text-brand-600 font-fun font-bold hover:text-brand-800">Sign Up</button>
                  </p>
                </motion.div>
              )}

              {/* STATE 3: SIGNUP */}
              {authState === 'signup' && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <button onClick={() => setAuthState('none')} className="text-slate-400 hover:text-brand-600 text-sm font-bold transition-colors">← Back</button>
                    <h3 className="text-2xl font-fun font-bold text-brand-900 mx-auto">✨ Create Account</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Input label="👤 Full Name" value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} placeholder="Sensei Jane Doe" />
                      {formErrors.name && <span className="text-xs text-red-500 font-bold ml-1 mt-1 flex items-center gap-1">⚠️ {formErrors.name}</span>}
                    </div>
                    <div>
                      <Input label="📧 Email" type="email" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} placeholder="you@email.com" />
                      {formErrors.email && <span className="text-xs text-red-500 font-bold ml-1 mt-1 flex items-center gap-1">⚠️ {formErrors.email}</span>}
                    </div>
                    <div>
                      <Input label="🔒 Password" type="password" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} placeholder="••••••" />
                      {formErrors.password && <span className="text-xs text-red-500 font-bold ml-1 mt-1 flex items-center gap-1">⚠️ {formErrors.password}</span>}
                    </div>
                    {authError && (
                      <div className="text-red-600 text-xs font-bold bg-red-50 p-3 rounded-xl flex items-center gap-2 border border-red-200">
                        <AlertCircle size={14} /> {authError}
                      </div>
                    )}
                    <Button fullWidth variant="fun" loading={authLoading} onClick={() => handleAuth('signup')}>
                      Create Account ✦
                    </Button>
                  </div>
                  <p className="text-center mt-4 text-sm text-slate-400">
                    Already a member?{' '}
                    <button onClick={() => { setFormErrors({}); setAuthError(''); setAuthState('login'); }} className="text-brand-600 font-fun font-bold hover:text-brand-800">Login</button>
                  </p>
                </motion.div>
              )}

              {/* STATE 4: APPLICATION FORM */}
              {authState === 'authenticated' && !isSuccess && (
                <motion.div
                  key="application"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="mb-6 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-fun font-bold text-brand-900 flex items-center gap-2">
                      📋 Complete Application
                    </h3>
                    <p className="text-sm text-accent-orange font-fun font-bold mt-1 flex items-center gap-1">
                      <span className="animate-sparkle">✦</span> Logged in as {user?.name}
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmitApplication}>
                    <div className="p-4 bg-brand-50 rounded-2xl border-2 border-brand-100 text-sm text-brand-800 font-medium">
                      🎯 Great! We have your contact info. Now tell us about your expertise!
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Select label="🎓 Education" value={appData.education} onChange={e => setAppData({...appData, education: e.target.value})}>
                        <option>Bachelors</option>
                        <option>Masters</option>
                        <option>PhD</option>
                      </Select>
                      <Select label="📚 Primary Subject" value={appData.subject} onChange={e => setAppData({...appData, subject: e.target.value})}>
                        <option>Math</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                        <option>English</option>
                        <option>Computer Science</option>
                      </Select>
                    </div>

                    <Button type="submit" fullWidth variant="fun" icon={<ChevronRight size={18} />} loading={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Application! 🚀'}
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* STATE 5: SUCCESS */}
              {isSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.6 }}
                    className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-6 text-6xl manga-border"
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-2xl font-fun font-bold text-brand-900 mb-3">Application Received!</h3>
                  <p className="text-slate-500 mb-2 max-w-xs leading-relaxed">
                    Welcome to the team, <strong>{user?.name}</strong>! 🎊
                  </p>
                  <p className="text-sm text-brand-600 font-fun font-bold mb-8">
                    Status: ⏳ Pending Approval
                  </p>
                  <Button variant="outline" onClick={() => { setIsSuccess(false); setAppData({ education: 'Bachelors', subject: 'Math' }); }}>
                    Update Profile
                  </Button>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute top-10 left-10 text-3xl text-white/30 animate-sparkle">✦</div>
        <div className="absolute bottom-10 right-10 text-2xl text-accent-yellow/40 animate-sparkle" style={{ animationDelay: '0.7s' }}>✦</div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-fun font-bold mb-4">
            Ready to Inspire?{' '}
            <span className="text-accent-yellow">✦</span>
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
            Join thousands of educators building their teaching careers on Keep Tutors!
          </p>
          <Button variant="fun" size="lg" onClick={() => { setFormErrors({}); setAuthError(''); setAuthState('signup'); }}>
            🧑‍🏫 Apply as Tutor
          </Button>
        </div>
      </section>

    </div>
  );
};

export default TeacherView;
