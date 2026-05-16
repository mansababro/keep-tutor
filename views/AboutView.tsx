import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Target, Sparkles, X } from 'lucide-react';

const AboutView: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 font-sans">
       <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
             <h1 className="text-5xl font-display font-black text-slate-900 mb-6">
                We're on a mission to <br/>
                <span className="text-brand-600">democratize education.</span>
             </h1>
             <p className="text-xl text-slate-600 leading-relaxed">
                Keep Tutors was born out of a simple frustration: finding a good tutor shouldn't be harder than learning the subject itself.
             </p>
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="relative rounded-[3rem] overflow-hidden aspect-video mb-20 shadow-card bg-slate-900 group"
             onClick={() => setShowVideo(true)}
          >
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" 
               alt="Team working together" 
               className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer group-hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
             </div>
          </motion.div>

          <AnimatePresence>
            {showVideo && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setShowVideo(false)}
                >
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button 
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <div className="w-full h-full flex items-center justify-center text-white">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Video Placeholder</h3>
                                <p className="text-slate-400">Promotional video would play here.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
             <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h3>
                <p className="text-slate-500 leading-relaxed mb-4">
                    Founded in 2020, amidst a global shift to online learning, Keep Tutors started as a small WhatsApp group connecting parents with university students in Lahore.
                </p>
                <p className="text-slate-500 leading-relaxed">
                    Today, we are Pakistan's largest tutoring marketplace, serving over 10,000 families and providing income opportunities to 3,000+ brilliant educators.
                </p>
             </div>
             <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Values</h3>
                <ul className="space-y-4">
                    {[
                        { icon: Heart, text: "Empathy first. Learning is emotional." },
                        { icon: Target, text: "Quality over quantity. Always." },
                        { icon: Users, text: "Community driven growth." },
                        { icon: Sparkles, text: "Innovation in teaching methods." }
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                            <div className="p-2 bg-brand-50 text-brand-600 rounded-lg"><item.icon size={18} /></div>
                            {item.text}
                        </li>
                    ))}
                </ul>
             </div>
          </div>

          <div className="bg-brand-900 text-white rounded-3xl p-10 text-center">
             <h2 className="text-3xl font-display font-bold mb-8">Meet the Team</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                        <img 
                           src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Team${i}`} 
                           alt="Team Member" 
                           className="w-20 h-20 rounded-full bg-white/10 mb-3"
                        />
                        <div className="font-bold">Member Name</div>
                        <div className="text-xs text-brand-200 uppercase tracking-widest">Co-Founder</div>
                    </div>
                ))}
             </div>
          </div>

       </div>
    </div>
  );
};

export default AboutView;