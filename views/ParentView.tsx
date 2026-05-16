import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { mockBackend } from '../services/mockBackend';

const SUBJECT_ICONS: Record<string, string> = {
  Math: '📐', Physics: '⚛️', Chemistry: '🧪', Biology: '🧬',
  English: '📚', History: '🏛️', Computer: '💻', Art: '🎨',
};

const FEATURES = [
  { icon: '🛡️', title: 'Background Checked', desc: 'Every tutor passes strict security & identity verification.', color: 'bg-green-50 border-green-200' },
  { icon: '🎯', title: 'Subject Specialists', desc: 'We match you with experts in your exact subject & level.', color: 'bg-blue-50 border-blue-200' },
  { icon: '⭐', title: '4.9/5 Rated', desc: 'Consistently top-rated by 3,000+ students & families.', color: 'bg-yellow-50 border-yellow-200' },
  { icon: '🎁', title: 'Free Demo Class', desc: 'Try a session for free before committing. No pressure!', color: 'bg-purple-50 border-purple-200' },
];

const ParentView: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    mode: 'Home Tutor', grade: 'Class 1-5', city: 'Lahore', subjects: '', name: '', phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errors: {[key: string]: string} = {};
    if (!formData.subjects.trim()) errors.subjects = 'Please specify a subject!';
    if (!formData.name.trim()) errors.name = 'Your name is required!';
    const phoneRegex = /^[\d\s\-\+]{10,15}$/;
    if (!formData.phone.trim()) errors.phone = 'Phone number is required!';
    else if (!phoneRegex.test(formData.phone)) errors.phone = 'Invalid phone number format.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await mockBackend.requestTutor(formData);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="w-full min-h-screen bg-brand-50 font-sans">

      {/* ===== HERO BANNER ===== */}
      <div className="relative pt-28 pb-16 px-4 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-purple-800">
        {/* Anime grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        {/* Floating blobs */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-5 left-10 w-32 h-32 bg-accent-orange/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>

        {/* Floating decorative stars */}
        <div className="absolute top-16 left-8 text-2xl text-white/40 animate-sparkle">✦</div>
        <div className="absolute top-24 right-20 text-xl text-accent-yellow/60 animate-sparkle" style={{ animationDelay: '0.7s' }}>✦</div>
        <div className="absolute bottom-12 right-8 text-3xl text-white/30 animate-sparkle" style={{ animationDelay: '1.2s' }}>✦</div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-center gap-8"
          >
            {/* Left text */}
            <div className="flex-1 text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 font-fun font-bold text-sm mb-6 backdrop-blur-sm"
              >
                <span className="animate-sparkle">✦</span> Student Portal
                <span className="animate-sparkle" style={{ animationDelay: '0.5s' }}>✦</span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-fun font-bold mb-6 leading-[1.15]">
                <span className="block text-white">Find Your</span>
                <span className="block text-accent-yellow">Perfect Tutor!</span>
                <span className="text-4xl">🎒</span>
              </h1>

              <p className="text-xl text-white/80 mb-8 max-w-lg leading-relaxed font-medium">
                Stop stressing about grades! Connect with verified, subject-specialist tutors who'll unlock your true potential.
              </p>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-4">
                {[
                  { val: '3,019', label: 'Expert Tutors', icon: '👩‍🏫' },
                  { val: 'Free', label: 'Demo Class', icon: '🎁' },
                  { val: '4.9★', label: 'Rating', icon: '⭐' },
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
            </div>

            {/* Big emoji decoration */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.4, delay: 0.3 }}
              className="hidden lg:flex items-center justify-center w-48 h-48 rounded-3xl bg-white/10 border-2 border-white/20 text-8xl animate-float backdrop-blur-sm"
            >
              🎒
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-12 gap-12">

        {/* Left: Features */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-fun font-bold text-brand-900 mb-8 flex items-center gap-3">
              <span className="animate-wobble inline-block">⚡</span> Why Choose Keep Tutors?
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`p-6 bg-white rounded-3xl manga-border ${f.color} cursor-default`}
                >
                  <div className="text-4xl mb-4 animate-float inline-block" style={{ animationDelay: `${i * 0.5}s` }}>{f.icon}</div>
                  <h4 className="font-fun font-bold text-slate-900 text-lg mb-2">{f.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Subjects available */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl manga-border p-8"
          >
            <h3 className="text-2xl font-fun font-bold text-brand-900 mb-6">
              📚 Subjects We Cover
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(SUBJECT_ICONS).map(([subj, icon]) => (
                <span key={subj} className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border-2 border-brand-200 font-fun font-bold text-sm text-brand-800 hover:bg-brand-100 transition-colors cursor-default">
                  <span>{icon}</span> {subj}
                </span>
              ))}
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border-2 border-accent-orange/30 font-fun font-bold text-sm text-accent-orange">
                ✦ + Many More!
              </span>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-3xl manga-border p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 text-8xl opacity-10 font-fun">❝</div>
            <div className="relative z-10">
              <div className="flex gap-1 text-accent-yellow mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-white/90 text-lg font-medium leading-relaxed mb-6 italic">
                "Keep Tutors literally saved my O-Levels. My math went from a D to an A* in just 3 months. My tutor was like a superhero!"
              </p>
              <div className="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima99" alt="Student" className="w-10 h-10 rounded-full border-2 border-white/30" />
                <div>
                  <div className="font-fun font-bold">Fatima K.</div>
                  <div className="text-white/60 text-xs">O-Level Student, Lahore</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Request Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative bg-white manga-border-lg p-8 rounded-[2rem] min-h-[500px]"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-600 via-accent-orange to-brand-400 rounded-t-[2rem]"></div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.6 }}
                      className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-6 text-6xl manga-border"
                    >
                      🎉
                    </motion.div>
                    <h2 className="text-3xl font-fun font-bold text-brand-900 mb-3">Request Sent!</h2>
                    <p className="text-slate-500 mb-4 max-w-xs leading-relaxed">
                      Our AI is matching you with the best tutors right now! We'll contact you soon. ⚡
                    </p>
                    <div className="flex gap-1 text-accent-orange mb-8">
                      {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                    <Button variant="outline" onClick={() => { setIsSuccess(false); setFormData({ mode: 'Home Tutor', grade: 'Class 1-5', city: 'Lahore', subjects: '', name: '', phone: '' }); }}>
                      Send Another Request
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mb-7">
                      <h2 className="text-2xl font-fun font-bold text-brand-900 mb-1 flex items-center gap-2">
                        🎯 Find a Tutor
                      </h2>
                      <p className="text-slate-500 text-sm">Get matched with 3 expert profiles today — it's free!</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                      {/* Mode toggle */}
                      <div className="p-4 bg-brand-50 rounded-2xl border-2 border-brand-100">
                        <label className="text-xs font-bold font-fun text-brand-800 uppercase tracking-wider mb-3 block">📍 I Need A...</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Home Tutor', 'Online Tutor'].map(mode => (
                            <label key={mode} className="cursor-pointer">
                              <input type="radio" name="mode" className="peer hidden" checked={formData.mode === mode} onChange={() => setFormData(p => ({ ...p, mode }))} />
                              <div className="py-3 text-center rounded-xl bg-white text-slate-500 peer-checked:bg-brand-600 peer-checked:text-white peer-checked:shadow-lg transition-all font-fun font-bold text-sm manga-border cursor-pointer">
                                {mode === 'Home Tutor' ? '🏠 ' : '💻 '}{mode}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Select name="grade" label="📚 Grade" value={formData.grade} onChange={handleChange}>
                          <option>Class 1-5</option>
                          <option>Class 6-8</option>
                          <option>Matric/O-Level</option>
                          <option>FSc/A-Level</option>
                        </Select>
                        <Select name="city" label="📍 City" value={formData.city} onChange={handleChange}>
                          <option>Lahore</option>
                          <option>Karachi</option>
                          <option>Islamabad</option>
                          <option>Other</option>
                        </Select>
                      </div>

                      <div>
                        <Input name="subjects" label="🔬 Subjects" placeholder="Math, English, Science..." value={formData.subjects} onChange={handleChange} />
                        {formErrors.subjects && <span className="text-xs text-red-500 font-bold ml-1 flex items-center gap-1 mt-1">⚠️ {formErrors.subjects}</span>}
                      </div>

                      <div className="h-px bg-brand-100 w-full"></div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Input name="name" label="👤 Your Name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                          {formErrors.name && <span className="text-xs text-red-500 font-bold ml-1 flex items-center gap-1 mt-1">⚠️ {formErrors.name}</span>}
                        </div>
                        <div>
                          <Input name="phone" label="📞 Phone" placeholder="0300..." value={formData.phone} onChange={handleChange} />
                          {formErrors.phone && <span className="text-xs text-red-500 font-bold ml-1 flex items-center gap-1 mt-1">⚠️ {formErrors.phone}</span>}
                        </div>
                      </div>

                      <Button type="submit" fullWidth variant="fun" size="lg" icon={<Search size={18} />} loading={isSubmitting}>
                        {isSubmitting ? 'Finding Tutors...' : 'Find My Tutor! 🎯'}
                      </Button>

                      <p className="text-center text-xs text-slate-400">
                        ✓ Free demo • ✓ No commitment • ✓ Cancel anytime
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentView;
