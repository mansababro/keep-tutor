import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, Shield, Zap, Globe, Users, Play, ChevronRight, BookOpen, Trophy, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import CardSwap, { Card } from '../components/ui/CardSwap';
import AnimatedMascot from '../components/ui/AnimatedMascot';
import { ViewMode } from '../types';

// ── Data ─────────────────────────────────────────────────────────────────────
const MARQUEE_ROW_1 = [
  {icon:"💻",text:"Coding"},{icon:"📚",text:"English"},{icon:"🧬",text:"Biology"},
  {icon:"💰",text:"Economics"},{icon:"🏛️",text:"History"},{icon:"🎨",text:"Art"},
  {icon:"📐",text:"Mathematics"},{icon:"⚛️",text:"Physics"},{icon:"🧪",text:"Chemistry"}
];
const MARQUEE_ROW_2 = [
  {icon:"📝",text:"SAT Prep"},{icon:"🏫",text:"Primary"},{icon:"🗣️",text:"IELTS"},
  {icon:"🎻",text:"Music"},{icon:"🚀",text:"Skill Dev"},{icon:"🔬",text:"Science"},
  {icon:"🎓",text:"A-Levels"},{icon:"🎒",text:"O-Levels"},{icon:"🔢",text:"Calculus"}
];

const LIVE_FEED = [
  "🔔 Ahmad just matched with a Maths tutor in Lahore!",
  "⭐ Sara gave her Physics tutor a 5-star review!",
  "🎉 Bilal passed his O-Level Chemistry with an A!",
  "🚀 Ayesha started her first online coding session!",
  "✅ 3 new tutors verified in Karachi today",
  "🏆 Omar scored 95% after 4 sessions with Miss Laraib!",
  "💡 New tutors available in Islamabad this week!",
  "🎓 Zainab just enrolled in A-Level Biology tutoring!",
];

const ORBIT_SUBJECTS = [
  {icon:"📐",label:"Math",r:90,speed:8,color:"#F08C26"},
  {icon:"⚛️",label:"Physics",r:130,speed:13,color:"#a6549f"},
  {icon:"🧪",label:"Chemistry",r:90,speed:11,color:"#2DD4BF"},
  {icon:"💻",label:"Coding",r:130,speed:17,color:"#38BDF8"},
  {icon:"📚",label:"English",r:165,speed:22,color:"#F472B6"},
  {icon:"🧬",label:"Biology",r:165,speed:19,color:"#A3E635"},
];

const ACHIEVEMENTS = [
  {icon:"🎯",title:"First Match",desc:"Get matched with your first tutor",xp:50,unlocked:true,color:"from-brand-500 to-brand-700"},
  {icon:"🏅",title:"Demo Star",desc:"Complete your free demo class",xp:100,unlocked:true,color:"from-accent-orange to-orange-700"},
  {icon:"🔥",title:"3-Session Streak",desc:"Attend 3 sessions in a row",xp:200,unlocked:false,color:"from-red-500 to-orange-600"},
  {icon:"🏆",title:"Grade Up!",desc:"Improve your grade by one level",xp:500,unlocked:false,color:"from-accent-yellow to-orange-400"},
];

const VIDEO_CHAPTERS = [
  {icon:"👋",title:"Introduction",time:"0:00",desc:"What is Keep Tutors?"},
  {icon:"🔍",title:"Find a Tutor",time:"0:45",desc:"How our matching works"},
  {icon:"🎯",title:"Demo Class",time:"1:30",desc:"Your free first session"},
  {icon:"🚀",title:"Start Learning",time:"2:15",desc:"Track your progress"},
];

interface Tutor {id:number;name:string;degree:string;location:string;image:string;bg:string;tag:string;}
const TUTORS_DATA: Tutor[] = [
  {id:1,name:"Maham",degree:"MS Child Guidance & Counselling",location:"Lahore",image:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",bg:"from-pink-500 to-purple-500",tag:"⭐ Top Rated"},
  {id:2,name:"Syeda Zunaira",degree:"Software Engineering",location:"Karachi",image:"https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",bg:"from-purple-500 to-brand-600",tag:"💻 Tech Expert"},
  {id:3,name:"Muhammad Sami",degree:"Undergraduate",location:"Karachi",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",bg:"from-blue-500 to-cyan-500",tag:"📐 Math Pro"},
  {id:4,name:"Mubeen Nawaz",degree:"Graduate",location:"Lahore",image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",bg:"from-orange-500 to-pink-500",tag:"🔬 Science"},
  {id:5,name:"Babar Afzal",degree:"BEE - Electrical Engineering",location:"Islamabad",image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",bg:"from-red-500 to-orange-500",tag:"⚡ EE Spec"},
  {id:6,name:"Laraib Sana",degree:"Master in Islamic Studies",location:"Karachi",image:"https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=600&auto=format&fit=crop",bg:"from-teal-500 to-emerald-500",tag:"📖 Scholar"},
];

const REVIEWS_DATA = [
  {name:"Ali Khan",handle:"@alikhan_99",text:"Found a calculus tutor in 2 hours. The matching is genuinely impressive!",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Ali"},
  {name:"Sarah Ahmed",handle:"@sarah_studies",text:"Keep Tutors saved my O-Level grades. My tutor Ayesha is phenomenal.",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"},
  {name:"Bilal Raza",handle:"@bilal_dev",text:"Teaching on here is seamless. Payments are always on time.",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal"},
  {name:"Zainab B.",handle:"@zainab_art",text:"Finally a tutoring platform that feels truly modern. The UX is unmatched.",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab"},
  {name:"Omar Farooq",handle:"@omar_f",text:"Background-verified tutors gave me total peace of mind for my kids.",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Omar"},
];

const QUEST_STEPS = [
  {title:"Tell Us Your Goals",desc:"Quick 2-min form — subject, grade, city. Done.",icon:"📋",color:"border-pink-300 bg-pink-50"},
  {title:"Get Matched Instantly",desc:"AI-powered matching finds your ideal verified tutor.",icon:"🎯",color:"border-yellow-300 bg-yellow-50"},
  {title:"Start Learning Free",desc:"Book a FREE demo class. No commitment required.",icon:"🚀",color:"border-teal-300 bg-teal-50"},
];

// ── Particle system ───────────────────────────────────────────────────────────
const Particles = React.memo(() => {
  const particles = Array.from({length: 12}, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 4,
    size: 3 + Math.random() * 5,
    dur: 3 + Math.random() * 3,
    color: ['#a6549f','#F08C26','#2DD4BF','#FCD34D'][i % 4],
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left:`${p.x}%`, bottom: 0, width: p.size, height: p.size, background: p.color, opacity: 0 }}
          animate={{ y: [0, -140], opacity: [0, 0.7, 0], scale: [1, 0.5, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
});

// ── Sub-components ────────────────────────────────────────────────────────────
const MarqueeItem = React.memo(({icon, text, dark=false}: {icon:string;text:string;dark?:boolean}) => (
  <div className={`flex items-center gap-2.5 px-5 py-3 rounded-full font-fun font-bold text-sm whitespace-nowrap min-w-max border-2 ${
    dark ? 'bg-brand-800 text-white/90 border-brand-700' : 'bg-white text-brand-900 border-brand-100 shadow-sm'
  }`}>
    <span className="text-base">{icon}</span><span>{text}</span>
  </div>
));

const InfiniteMarquee = ({items, reverse=false, speed=35, dark=false}: {items:{icon:string;text:string}[];reverse?:boolean;speed?:number;dark?:boolean}) => (
  <div className="flex overflow-hidden relative w-full py-2 select-none">
    <div className={`absolute inset-y-0 left-0 w-24 bg-gradient-to-r ${dark?'from-brand-900':'from-white'} to-transparent z-10 pointer-events-none`}/>
    <div className={`absolute inset-y-0 right-0 w-24 bg-gradient-to-l ${dark?'from-brand-900':'from-white'} to-transparent z-10 pointer-events-none`}/>
    {[0,1].map(n => (
      <div key={n} aria-hidden={n===1} className="flex gap-4 px-4" style={{width:'max-content', animation:`${reverse?'marquee-reverse':'marquee'} ${speed}s linear infinite`}}>
        {[...items,...items].map((item,idx) => <MarqueeItem key={`${n}-${item.text}-${idx}`} icon={item.icon} text={item.text} dark={dark}/>)}
      </div>
    ))}
  </div>
);

const CountUp = ({to, label, suffix="", icon}: {to:number;label:string;suffix?:string;icon:string}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-50px"});
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const t = setInterval(() => { start += to/100; if(start>=to){setCount(to);clearInterval(t);}else setCount(Math.floor(start)); }, 20);
    return ()=>clearInterval(t);
  }, [inView, to]);
  return (
    <div ref={ref} className="text-center p-6 group">
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-4xl md:text-5xl font-fun font-bold text-brand-900 mb-2 group-hover:text-brand-600 transition-colors">{count}{suffix}</div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  );
};

const TutorCard = React.memo(({tutor}: {tutor:Tutor}) => (
  <motion.div whileHover={{y:-8}} className="snap-center shrink-0 w-[280px] md:w-[295px] bg-white rounded-3xl border-2 border-slate-100 shadow-card overflow-hidden flex flex-col group cursor-pointer">
    <div className="h-58 overflow-hidden relative" style={{height:232}}>
      <div className={`absolute inset-0 bg-gradient-to-b ${tutor.bg} opacity-0 group-hover:opacity-25 transition-opacity`}/>
      <img loading="lazy" src={tutor.image} alt={tutor.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
      <div className="absolute top-3 left-3"><span className="px-3 py-1 rounded-full bg-white/95 text-xs font-fun font-bold text-brand-900 shadow-sm border border-slate-100">{tutor.tag}</span></div>
    </div>
    <div className="p-5 bg-white">
      <h3 className="text-base font-fun font-bold text-slate-900 uppercase tracking-wide mb-1">{tutor.name}</h3>
      <p className="text-xs text-slate-500 leading-tight mb-3">{tutor.degree}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-brand-600">📍 {tutor.location}</span>
        <div className="flex gap-0.5 text-accent-orange">{[1,2,3,4,5].map(i=><Star key={i} size={11} fill="currentColor"/>)}</div>
      </div>
    </div>
  </motion.div>
));

const ReviewCard = React.memo(({review}: {review:any}) => (
  <motion.div whileHover={{y:-4}} className="snap-center shrink-0 w-[380px] glass-dark rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
    <div className="absolute -right-8 -top-8 w-28 h-28 bg-brand-500/20 rounded-full blur-3xl"/>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img loading="lazy" src={review.avatar} alt={review.name} className="w-11 h-11 rounded-full border-2 border-white/20"/>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-orange rounded-full flex items-center justify-center border-2 border-slate-900"><Quote size={8} className="text-white fill-white"/></div>
          </div>
          <div>
            <h4 className="text-white font-fun font-bold text-sm">{review.name}</h4>
            <p className="text-brand-300 text-xs">{review.handle}</p>
          </div>
        </div>
        <div className="flex gap-0.5 text-accent-orange">{[1,2,3,4,5].map(i=><Star key={i} size={12} fill="currentColor"/>)}</div>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed font-medium">"{review.text}"</p>
    </div>
    <div className="relative z-10 pt-4 mt-4 border-t border-white/5">
      <span className="text-[10px] font-bold text-accent-teal/80 uppercase tracking-widest font-fun">✓ Verified Student</span>
    </div>
  </motion.div>
));

const PortalCard = ({type, label, subtitle, emoji, features, gradient, accentBg, btnLabel, onClick}:
  {type:'student'|'tutor';label:string;subtitle:string;emoji:string;features:string[];gradient:string;accentBg:string;btnLabel:string;onClick:()=>void;}) => (
  <motion.div
    initial={{opacity:0,y:40}} animate={{opacity:1,y:0}}
    transition={{delay:type==='student'?0.35:0.5, type:'spring', bounce:0.3}}
    whileHover={{y:-8, scale:1.01}} onClick={onClick}
    className={`cursor-pointer relative overflow-hidden rounded-3xl border-2 border-white/20 p-8 flex flex-col gap-5 ${gradient} shadow-2xl transition-all duration-300`}
    style={{boxShadow:type==='student'?'0 20px 60px rgba(100,43,88,0.35)':'0 20px 60px rgba(240,140,38,0.3)'}}
  >
    <div className="beam-overlay"/>
    <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${accentBg} rounded-full blur-3xl opacity-50 pointer-events-none`}/>
    <div className="absolute top-5 right-8 text-white/25 text-xl animate-sparkle">✦</div>
    <div className="absolute bottom-14 right-6 text-white/15 text-sm animate-sparkle" style={{animationDelay:'0.8s'}}>✦</div>
    <div className="flex items-start justify-between">
      <div className="w-[70px] h-[70px] rounded-2xl bg-white/15 flex items-center justify-center text-5xl animate-float border border-white/20">
        {emoji}
      </div>
      <span className="text-xs font-fun font-bold px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/25">{type==='student'?'🎒 Student':'📚 Tutor'}</span>
    </div>
    <div>
      <h3 className="text-3xl font-fun font-bold text-white mb-2">{label}</h3>
      <p className="text-white/75 text-sm leading-relaxed font-medium">{subtitle}</p>
    </div>
    <ul className="space-y-2">
      {features.map((f,i) => (
        <li key={i} className="flex items-center gap-2 text-white/90 text-sm">
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">✓</span>{f}
        </li>
      ))}
    </ul>
    <motion.button whileTap={{scale:0.97}} className="w-full py-3.5 mt-1 rounded-2xl bg-white text-brand-900 font-fun font-bold text-base hover:bg-brand-50 transition-all flex items-center justify-center gap-2 border-2 border-white/80 shadow-lg">
      {btnLabel} <span className="text-lg">→</span>
    </motion.button>
  </motion.div>
);

// ── Video Guide Section ───────────────────────────────────────────────────────
const VideoGuide = ({onNavigate}: {onNavigate:(v:ViewMode)=>void}) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-28 bg-slate-900 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-brand-700/20 rounded-full blur-[100px] pointer-events-none"/>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-accent-orange/10 rounded-full blur-[80px] pointer-events-none"/>
      <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',backgroundSize:'22px 22px'}}/>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/85 font-fun font-bold text-sm border border-white/15 mb-5">
            🎬 See It in Action
          </span>
          <h2 className="text-4xl md:text-5xl font-fun font-bold text-white mb-4">
            How Keep Tutors Works <span className="neon-text-orange">⚡</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Watch our 3-minute walkthrough — from sign-up to your first breakthrough session.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Video Player */}
          <motion.div
            initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            className="lg:col-span-3 relative group"
          >
            <div className="rounded-3xl overflow-hidden video-glow relative aspect-video bg-gradient-to-br from-brand-900 via-slate-900 to-purple-950 border border-white/10">
              {/* Animated screen content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Background grid animation */}
                <div className="absolute inset-0 opacity-10" style={{backgroundImage:'linear-gradient(rgba(166,84,159,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(166,84,159,0.4) 1px, transparent 1px)', backgroundSize:'40px 40px'}}/>

                {/* Floating chapter content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChapter}
                    initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:1.05}}
                    className="text-center relative z-10 px-8"
                  >
                    <div className="text-7xl mb-4 animate-float inline-block">{VIDEO_CHAPTERS[activeChapter].icon}</div>
                    <h3 className="text-2xl font-fun font-bold text-white mb-2">{VIDEO_CHAPTERS[activeChapter].title}</h3>
                    <p className="text-slate-400 font-medium">{VIDEO_CHAPTERS[activeChapter].desc}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Decorative neon rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border border-brand-500/20 animate-pulse-slow"/>
                  <div className="absolute w-72 h-72 rounded-full border border-brand-500/10 animate-pulse-slow" style={{animationDelay:'1s'}}/>
                </div>

                {/* Play button */}
                <motion.button
                  whileHover={{scale:1.1}} whileTap={{scale:0.95}}
                  onClick={() => {
                    setPlaying(true);
                    setActiveChapter(c => (c+1) % VIDEO_CHAPTERS.length);
                    setTimeout(()=>setPlaying(false), 800);
                  }}
                  className="absolute play-pulse w-20 h-20 rounded-full bg-accent-orange flex items-center justify-center shadow-neon-orange border-4 border-white/20"
                >
                  <Play size={28} fill="white" className="text-white ml-1"/>
                </motion.button>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <motion.div
                  className="h-full bg-accent-orange"
                  animate={{width:`${((activeChapter+1)/VIDEO_CHAPTERS.length)*100}%`}}
                  transition={{duration:0.5}}
                />
              </div>

              {/* Time indicator */}
              <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-fun font-bold text-white">
                {VIDEO_CHAPTERS[activeChapter].time}
              </div>
            </div>

            {/* Glow frame border */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-brand-500/30 via-transparent to-accent-orange/30 pointer-events-none -z-10"/>
          </motion.div>

          {/* Chapters */}
          <motion.div
            initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true, delay:0.2}}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            <h3 className="text-white font-fun font-bold text-lg mb-2 flex items-center gap-2">
              <BookOpen size={18} className="text-accent-orange"/> Chapters
            </h3>
            {VIDEO_CHAPTERS.map((ch, i) => (
              <motion.button
                key={i}
                whileHover={{x:4}}
                onClick={() => setActiveChapter(i)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all text-left border ${
                  activeChapter === i
                    ? 'bg-brand-600/30 border-brand-500/50 neon-border-purple'
                    : 'glass-dark border-white/5 hover:border-white/15'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                  activeChapter===i ? 'bg-accent-orange' : 'bg-white/10'
                }`}>{ch.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-fun font-bold text-sm">{ch.title}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{ch.desc}</div>
                </div>
                <div className="text-slate-500 text-xs font-mono">{ch.time}</div>
              </motion.button>
            ))}

            <div className="mt-4 p-4 rounded-2xl bg-accent-orange/10 border border-accent-orange/20">
              <p className="text-accent-orange text-sm font-fun font-bold mb-3">🎯 Ready to start?</p>
              <Button variant="fun" fullWidth onClick={() => onNavigate(ViewMode.PARENT)}>
                Find My Tutor Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Subject Orbit Universe ────────────────────────────────────────────────────
const OrbitUniverse = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
        <span className="inline-block px-4 py-2 rounded-full bg-brand-100 text-brand-800 font-fun font-bold text-sm border-2 border-brand-200 mb-4">
          🌌 Learning Universe
        </span>
        <h2 className="text-4xl md:text-5xl font-fun font-bold text-brand-900">
          Every Subject. <span className="text-brand-600">One Platform.</span>
        </h2>
        <p className="text-slate-500 mt-3 max-w-md mx-auto">From STEM to Arts — we cover every subject your child needs, at every level.</p>
      </motion.div>

      <div className="flex justify-center">
        <div className="relative flex items-center justify-center" style={{width:380, height:380}}>
          {/* Orbit rings */}
          {[90,130,165].map(r => (
            <div key={r} className="orbit-ring" style={{width:r*2, height:r*2, borderColor:`rgba(100,43,88,${0.08 + (r===90?0.08:0)})`}}/>
          ))}

          {/* Center */}
          <motion.div
            animate={{scale:[1,1.05,1]}}
            transition={{duration:3, repeat:Infinity}}
            className="absolute w-24 h-24 rounded-full bg-brand-700 flex items-center justify-center flex-col shadow-neon-purple z-10 border-4 border-brand-500"
            style={{boxShadow:'0 0 20px rgba(166,84,159,0.5), 0 0 60px rgba(166,84,159,0.2)'}}
          >
            <span className="text-white font-fun font-bold text-xs leading-none">KEEP</span>
            <span className="text-accent-orange font-fun font-bold text-xs leading-none">TUTORS</span>
            <div className="text-white/60 text-lg mt-1">✦</div>
          </motion.div>

          {/* Orbiting items */}
          {ORBIT_SUBJECTS.map((sub, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{rotate:360}}
              transition={{duration:sub.speed, repeat:Infinity, ease:'linear'}}
              style={{width:sub.r*2, height:sub.r*2, top:'50%', left:'50%', marginTop:-(sub.r), marginLeft:-(sub.r)}}
            >
              <motion.div
                animate={{rotate:-360}}
                transition={{duration:sub.speed, repeat:Infinity, ease:'linear'}}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center bg-white border-2 shadow-card text-lg cursor-default hover:scale-110 transition-transform"
                  style={{borderColor: sub.color, boxShadow:`0 0 12px ${sub.color}40`}}
                  title={sub.label}
                >
                  <span>{sub.icon}</span>
                  <span className="text-[8px] font-fun font-bold text-slate-600 leading-none mt-0.5">{sub.label}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── Achievement Badges ────────────────────────────────────────────────────────
const AchievementSection = ({onNavigate}: {onNavigate:(v:ViewMode)=>void}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:'-80px'});

  return (
    <section ref={ref} className="py-24 bg-brand-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-anime-grid opacity-30" style={{backgroundSize:'28px 28px'}}/>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-accent-yellow/30 text-brand-900 font-fun font-bold text-sm border-2 border-accent-yellow mb-4">
            🏆 Achievement System
          </span>
          <h2 className="text-4xl md:text-5xl font-fun font-bold text-brand-900">
            Level Up As You Learn!
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            Earn XP, unlock achievements, and track your academic journey like a game.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={i}
              initial={{opacity:0,y:30,scale:0.9}}
              animate={inView ? {opacity:1,y:0,scale:1} : {opacity:0,y:30,scale:0.9}}
              transition={{delay:i*0.15, type:'spring', bounce:0.4}}
              className={`relative overflow-hidden rounded-3xl p-6 flex flex-col items-center text-center border-2 ${
                ach.unlocked
                  ? 'bg-white border-accent-yellow shadow-card'
                  : 'bg-white/60 border-slate-200 achievement-locked'
              }`}
            >
              {/* Gradient top strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${ach.color}`}/>

              {/* Glow for unlocked */}
              {ach.unlocked && (
                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{boxShadow:'inset 0 0 20px rgba(252,211,77,0.1)'}}/>
              )}

              <div className={`w-18 h-18 w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-4xl mb-4 border-2 ${
                ach.unlocked ? 'bg-accent-yellow/20 border-accent-yellow animate-glow-badge' : 'bg-slate-100 border-slate-200'
              }`}>
                {ach.unlocked ? ach.icon : '🔒'}
              </div>

              {ach.unlocked && (
                <div className="absolute top-4 right-4">
                  <motion.div animate={{rotate:360}} transition={{duration:3,repeat:Infinity,ease:'linear'}} className="w-6 h-6 flex items-center justify-center">
                    <span className="text-accent-yellow text-base">★</span>
                  </motion.div>
                </div>
              )}

              <h4 className="font-fun font-bold text-brand-900 text-base mb-1">{ach.title}</h4>
              <p className="text-xs text-slate-500 mb-4">{ach.desc}</p>

              <div className={`px-4 py-1.5 rounded-full text-xs font-fun font-bold ${
                ach.unlocked
                  ? 'bg-accent-yellow/20 text-brand-800 border border-accent-yellow'
                  : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}>
                {ach.unlocked ? `+${ach.xp} XP Earned ✓` : `${ach.xp} XP — Locked`}
              </div>
            </motion.div>
          ))}
        </div>

        {/* XP Progress Bar */}
        <motion.div
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="bg-white rounded-3xl border-2 border-brand-100 p-8 max-w-2xl mx-auto shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-fun font-bold text-brand-900 text-lg">Your Learning Journey</p>
              <p className="text-xs text-slate-500">150 XP earned • Level 2 Scholar</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-3xl border-2 border-brand-300 animate-float">
              🎓
            </div>
          </div>
          <div className="w-full h-4 bg-brand-100 rounded-full overflow-hidden">
            <motion.div
              initial={{width:'0%'}}
              animate={inView ? {width:'45%'} : {width:'0%'}}
              transition={{delay:0.5, duration:1.2, ease:'easeOut'}}
              className="h-full bg-gradient-to-r from-brand-500 to-accent-orange rounded-full relative overflow-hidden"
            >
              <div className="absolute inset-0 shine-btn"/>
            </motion.div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400 font-fun font-bold">
            <span>150 XP</span><span>Next: 335 XP</span>
          </div>
          <div className="mt-5 text-center">
            <Button variant="fun" onClick={() => onNavigate(ViewMode.PARENT)}>
              🎯 Unlock Your First Achievement
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── Live Activity Ticker ──────────────────────────────────────────────────────
const LiveTicker = () => (
  <div className="bg-brand-900 py-3 overflow-hidden border-y-2 border-brand-700 relative">
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-900 to-transparent z-10 pointer-events-none"/>
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-900 to-transparent z-10 pointer-events-none"/>
    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 bg-accent-orange px-3 py-1 rounded-full">
      <div className="w-2 h-2 rounded-full bg-white animate-pulse"/>
      <span className="text-white text-xs font-fun font-bold">LIVE</span>
    </div>
    <div className="ticker-track pl-32">
      {[...LIVE_FEED,...LIVE_FEED].map((msg,i) => (
        <span key={i} className="text-white/80 text-sm font-medium whitespace-nowrap flex items-center gap-8">
          {msg}
          <span className="text-brand-600 mx-4">◆</span>
        </span>
      ))}
    </div>
  </div>
);

// ── MAIN ──────────────────────────────────────────────────────────────────────
interface HomeViewProps { onNavigate: (view: ViewMode) => void; }

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full overflow-hidden bg-white">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-10 px-4 overflow-hidden bg-brand-50">
        <div className="absolute inset-0 bg-anime-grid opacity-40" style={{backgroundSize:'32px 32px'}}/>

        {/* Ambient glows */}
        <div className="absolute top-16 left-6 w-60 h-60 bg-brand-300/35 rounded-full blur-3xl animate-float pointer-events-none"/>
        <div className="absolute bottom-10 right-8 w-72 h-72 bg-accent-orange/15 rounded-full blur-3xl animate-float pointer-events-none" style={{animationDelay:'2.5s'}}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-brand-200/15 rounded-full blur-3xl pointer-events-none"/>

        {/* Sparkles */}
        {[{top:'18%',left:'3%',sz:22,d:'0s'},{top:'28%',left:'94%',sz:16,d:'0.9s'},{top:'64%',left:'2%',sz:26,d:'1.6s'},{top:'72%',left:'92%',sz:14,d:'0.4s'},{top:'45%',left:'97%',sz:18,d:'1.1s'}].map((s,i) => (
          <div key={i} className="absolute pointer-events-none text-brand-300 animate-sparkle select-none" style={{top:s.top,left:s.left,fontSize:s.sz,animationDelay:s.d}}>✦</div>
        ))}

        {/* Particles */}
        <Particles/>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} className="flex justify-center lg:justify-start mb-7 gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-brand-200 font-fun font-bold text-sm text-brand-800 shadow-sm">
                  <span className="animate-sparkle inline-block text-accent-orange">✦</span> Trusted by 10,000+ Families
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange text-white font-fun font-bold text-sm border-2 border-brand-900 shadow-pop">
                  <span className="animate-wobble inline-block">⭐</span> Pakistan's #1
                </div>
              </motion.div>

              <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-5xl md:text-7xl font-fun font-bold tracking-tight mb-6 leading-[1.1] text-brand-900">
                Make Learning
                <br/>
                <span className="relative inline-block">
                  <span className="anime-gradient-text">An Adventure.</span>
                  <motion.span initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:0.6,duration:0.6}} className="absolute -bottom-2 left-0 w-full h-3 bg-accent-orange/30 rounded-full" style={{transformOrigin:'left'}}/>
                </span>
              </motion.h1>

              <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-xl text-brand-800/65 max-w-xl mb-10 font-medium leading-relaxed">
                Expert, verified tutors for <span className="text-brand-700 font-bold">1-on-1 sessions</span> — online or at home.
                Grades 1 through University, across every subject.
              </motion.p>

              <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                <PortalCard
                  type="student" label="Student Portal" emoji="🎒"
                  subtitle="Find your perfect tutor match — fast."
                  features={["Free demo class","Verified tutors","Any grade & subject"]}
                  gradient="bg-gradient-to-br from-brand-600 via-brand-700 to-purple-900"
                  accentBg="bg-brand-400" btnLabel="Find My Tutor"
                  onClick={() => onNavigate(ViewMode.PARENT)}
                />
                <PortalCard
                  type="tutor" label="Tutor Portal" emoji="🧑‍🏫"
                  subtitle="Teach flexibly. Keep 90% of earnings."
                  features={["Zero signup fees","Flexible schedule","Instant bookings"]}
                  gradient="bg-gradient-to-br from-orange-500 via-accent-orange to-brand-700"
                  accentBg="bg-orange-300" btnLabel="Apply as Tutor"
                  onClick={() => onNavigate(ViewMode.TEACHER)}
                />
              </motion.div>

              {/* Social Proof */}
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.55}} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8">
                <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-100 overflow-hidden"><img loading="lazy" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+30}`} alt=""/></div>)}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-accent-orange flex items-center justify-center font-fun font-bold text-[8px] text-white">+2k</div>
                  </div>
                  <div>
                    <div className="flex text-accent-orange gap-0.5">{[1,2,3,4,5].map(i=><Star key={i} size={12} fill="currentColor"/>)}</div>
                    <div className="text-xs font-bold text-slate-700">4.9 / 5.0</div>
                  </div>
                </div>
                {[{icon:'🏆',b:'9+ Years',s:'Excellence'},{icon:'⚡',b:'24hr',s:'Matching'}].map((item,i) => (
                  <div key={i} className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border-2 border-slate-100 shadow-sm">
                    <span className="text-xl">{item.icon}</span>
                    <div><div className="text-xs font-fun font-bold text-slate-800">{item.b}</div><div className="text-xs text-slate-400">{item.s}</div></div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Animated Mascot */}
            <motion.div
              initial={{opacity:0, x:40}} animate={{opacity:1, x:0}} transition={{delay:0.4, type:'spring', bounce:0.3}}
              className="lg:col-span-5 hidden lg:flex items-center justify-center"
            >
              <AnimatedMascot size={200} showBubble={true} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ LIVE TICKER ═══ */}
      <LiveTicker/>

      {/* ═══ MARQUEE ═══ */}
      <section className="py-20 bg-brand-50 overflow-hidden">
        <div className="bg-brand-900 w-[120%] -ml-[10%] -rotate-2 py-10 shadow-2xl flex flex-col gap-4 border-y-4 border-brand-700">
          <InfiniteMarquee items={MARQUEE_ROW_1} speed={35} dark/>
          <InfiniteMarquee items={MARQUEE_ROW_2} reverse speed={35}/>
        </div>
      </section>

      {/* ═══ VALUE PROPS ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
            <span className="inline-block px-4 py-2 rounded-full bg-brand-100 text-brand-800 font-fun font-bold text-sm border-2 border-brand-200 mb-4">✦ Why 10,000+ Students Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-fun font-bold text-brand-900">Education, Elevated.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {icon:<Shield size={24}/>,title:"Fully Verified",desc:"Every tutor passes background checks, credential reviews, and personal interviews.",c:"text-emerald-600",bg:"bg-emerald-50 border-emerald-200"},
              {icon:<Zap size={24}/>,title:"Matched in 24hrs",desc:"Our AI-powered system finds your perfect tutor match in under 24 hours.",c:"text-accent-orange",bg:"bg-orange-50 border-orange-200"},
              {icon:<Globe size={24}/>,title:"Home or Online",desc:"Flexible learning modes — in-person home tutoring or live online sessions.",c:"text-blue-600",bg:"bg-blue-50 border-blue-200"},
              {icon:<Users size={24}/>,title:"3,000+ Students",desc:"Trusted by thousands of families across Pakistan for 9+ years.",c:"text-brand-600",bg:"bg-brand-50 border-brand-200"},
            ].map((vp,i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} whileHover={{y:-5}} className={`p-7 rounded-3xl border-2 ${vp.bg} flex flex-col gap-4`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${vp.c} bg-white shadow-sm`}>{vp.icon}</div>
                <h3 className="text-lg font-fun font-bold text-slate-900">{vp.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{vp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO GUIDE ═══ */}
      <VideoGuide onNavigate={onNavigate}/>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 bg-brand-50 overflow-hidden">
        <div className="max-w-6xl w-full mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
              <span className="inline-block px-4 py-2 rounded-full bg-white text-brand-800 font-fun font-bold text-sm border-2 border-brand-200 mb-6">⚡ 3 Steps to Success</span>
              <h2 className="text-4xl md:text-5xl font-fun font-bold text-brand-900 mb-6 leading-tight">
                Getting Started is <br/>
                <span className="text-brand-600 relative inline-block">
                  Ridiculously Easy
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-orange" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 10 10 20 5 T 40 5 T 60 5 T 80 5 T 100 5" stroke="currentColor" strokeWidth="3.5" fill="none"/>
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-slate-500 mb-8 max-w-md font-medium leading-relaxed">
                We've designed the entire process to be fast, simple, and stress-free. Your perfect tutor is closer than you think.
              </p>
              <Button variant="fun" size="lg" onClick={() => onNavigate(ViewMode.PARENT)}>🎯 Get Started Free</Button>
            </motion.div>
          </div>
          <div className="relative w-full h-[520px] flex items-center justify-center">
            <CardSwap width={380} height={440} cardDistance={42} verticalDistance={42}>
              {QUEST_STEPS.map((step,idx) => (
                <Card key={idx} customClass={`bg-white rounded-[2.5rem] border-2 shadow-card p-10 flex flex-col items-center text-center justify-center ${step.color}`}>
                  <div className="absolute top-6 right-8 text-6xl font-black text-slate-100/60 select-none font-fun">0{idx+1}</div>
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-5xl mb-6 animate-float shadow-sm">{step.icon}</div>
                  <h3 className="text-2xl font-fun font-bold text-brand-900 mb-4">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed max-w-xs text-sm">{step.desc}</p>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </section>

      {/* ═══ ORBIT UNIVERSE ═══ */}
      <OrbitUniverse/>

      {/* ═══ STATS ═══ */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-10">
            <span className="text-brand-600 font-fun font-bold uppercase tracking-widest text-sm">⚡ By The Numbers</span>
            <h2 className="text-2xl md:text-3xl text-slate-600 mt-2 max-w-xl mx-auto font-medium">Nearly a decade of delivering real academic results across Pakistan.</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-[2.5rem] border-2 border-brand-100 shadow-card p-4">
            <CountUp to={3019} label="Active Tutors" icon="👩‍🏫"/>
            <CountUp to={3000} label="Students Served" suffix="+" icon="🎓"/>
            <CountUp to={9} label="Years of Legacy" suffix="+" icon="⭐"/>
            <CountUp to={4} label="Google Rating" suffix=".9★" icon="🏆"/>
          </div>
        </div>
      </section>

      {/* ═══ ACHIEVEMENTS ═══ */}
      <AchievementSection onNavigate={onNavigate}/>

      {/* ═══ TUTORS ═══ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
            <span className="inline-block px-4 py-2 rounded-full bg-white text-brand-800 font-fun font-bold text-sm border-2 border-brand-200 mb-4 shadow-sm">🏆 Meet Our Educators</span>
            <h2 className="text-4xl md:text-5xl font-fun font-bold text-brand-900 mb-3">Find Your Perfect Tutor</h2>
            <p className="text-brand-600 font-medium text-lg">Handpicked experts — verified, rated, and ready to inspire.</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"/>
            <div className="absolute right-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"/>
            <div className="flex overflow-x-auto gap-6 pb-10 pt-4 px-4 snap-x snap-mandatory no-scrollbar">
              {TUTORS_DATA.map(t => <TutorCard key={t.id} tutor={t}/>)}
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="fun" onClick={() => onNavigate(ViewMode.PARENT)}>View All Tutors →</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="py-28 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-700/25 rounded-full blur-[120px] pointer-events-none"/>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-orange/8 rounded-full blur-[120px] pointer-events-none"/>
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',backgroundSize:'20px 20px'}}/>
        <div className="max-w-7xl mx-auto px-4 relative z-10 mb-14 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/85 font-fun font-bold text-sm border border-white/15 mb-5">💌 Community Reviews</span>
          <h2 className="text-4xl md:text-5xl font-fun font-bold text-white mb-4">What People Are Saying</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Thousands of students and parents trust Keep Tutors for real academic results.</p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none"/>
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none"/>
          <motion.div className="flex gap-6 px-4" animate={{x:["0%","-50%"]}} transition={{duration:40,ease:"linear",repeat:Infinity}} style={{width:"max-content"}}>
            {[...REVIEWS_DATA,...REVIEWS_DATA].map((r,idx) => <ReviewCard key={`${r.handle}-${idx}`} review={r}/>)}
          </motion.div>
        </div>
      </section>

      {/* ═══ NEON CTA ═══ */}
      <section className="py-28 px-4 bg-slate-900 relative overflow-hidden">
        {/* Beams */}
        <div className="beam-overlay" style={{borderRadius:0}}/>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{position:'absolute',top:'-50%',left:'-20%',width:'50%',height:'200%',background:'linear-gradient(90deg,transparent,rgba(166,84,159,0.06),transparent)',transform:'rotate(-20deg)',animation:'beam 7s ease-in-out infinite'}}/>
          <div style={{position:'absolute',top:'-50%',right:'-20%',width:'40%',height:'200%',background:'linear-gradient(90deg,transparent,rgba(240,140,38,0.05),transparent)',transform:'rotate(20deg)',animation:'beam 9s ease-in-out 2s infinite'}}/>
        </div>

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{background:'radial-gradient(ellipse at center, rgba(100,43,88,0.3) 0%, transparent 70%)'}}/>

        {/* Grid */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'linear-gradient(rgba(166,84,159,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(166,84,159,0.5) 1px, transparent 1px)',backgroundSize:'40px 40px'}}/>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{scale:0}} whileInView={{scale:1}} viewport={{once:true}} transition={{type:'spring',bounce:0.5}} className="inline-block text-5xl mb-6 animate-float">🌟</motion.div>

          <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-5xl md:text-7xl font-fun font-bold mb-6 leading-tight">
            <span className="text-white">Ready to </span>
            <span className="neon-text-orange">Level Up?</span>
          </motion.h2>

          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.2}} className="text-xl text-slate-400 mb-12 max-w-lg mx-auto font-medium">
            Join 10,000+ students and educators already succeeding on Keep Tutors. Your journey starts here.
          </motion.p>

          <motion.div initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.3}} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{scale:1.05}} whileTap={{scale:0.97}}
              onClick={() => onNavigate(ViewMode.PARENT)}
              className="relative overflow-hidden px-8 py-4 rounded-2xl font-fun font-bold text-lg text-white border-2 border-brand-400 neon-border-purple transition-all"
              style={{background:'rgba(100,43,88,0.3)',backdropFilter:'blur(8px)'}}
            >
              <div className="beam-overlay" style={{borderRadius:'1rem'}}/>
              🎒 Student Portal
            </motion.button>

            <motion.button
              whileHover={{scale:1.05}} whileTap={{scale:0.97}}
              onClick={() => onNavigate(ViewMode.TEACHER)}
              className="relative overflow-hidden px-8 py-4 rounded-2xl font-fun font-bold text-lg text-white border-2 border-accent-orange neon-border-orange transition-all"
              style={{background:'rgba(240,140,38,0.15)',backdropFilter:'blur(8px)'}}
            >
              <div className="beam-overlay" style={{borderRadius:'1rem'}}/>
              📚 Tutor Portal
            </motion.button>
          </motion.div>

          <p className="text-sm text-slate-600 mt-8 font-medium">Free to start • No commitment required • Cancel anytime</p>
        </div>
      </section>

    </div>
  );
};

export default HomeView;
