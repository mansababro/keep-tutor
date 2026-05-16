import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  "Found my perfect tutor! 🎉",
  "Math clicked in 1 session! ⚡",
  "A* on my O-Levels! 🏆",
  "Free demo today! 🎁",
  "Learning is SO fun now! 😄",
];

interface Props { size?: number; showBubble?: boolean; className?: string; }

const AnimatedMascot: React.FC<Props> = ({ size = 160, showBubble = true, className = '' }) => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [eyesClosed, setEyesClosed] = useState(false);

  useEffect(() => {
    const msgTimer = setInterval(() => setMsgIdx(i => (i + 1) % MESSAGES.length), 3200);
    return () => clearInterval(msgTimer);
  }, []);

  useEffect(() => {
    const blinkLoop = () => {
      const delay = 2500 + Math.random() * 4000;
      const t = setTimeout(() => { setEyesClosed(true); setTimeout(() => setEyesClosed(false), 140); blinkLoop(); }, delay);
      return t;
    };
    const t = blinkLoop();
    return () => clearTimeout(t);
  }, []);

  const s = size;

  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ width: s }}>
      {/* Speech Bubble */}
      {showBubble && (
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIdx}
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-3 relative"
          >
            <div className="bg-white border-2 border-brand-300 rounded-2xl px-4 py-2 text-xs font-fun font-bold text-brand-800 whitespace-nowrap shadow-pop max-w-[200px] text-center">
              {MESSAGES[msgIdx]}
            </div>
            {/* Bubble tail */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{ borderLeft:'8px solid transparent', borderRight:'8px solid transparent', borderTop:'10px solid #4b2444' }}
            />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{ borderLeft:'7px solid transparent', borderRight:'7px solid transparent', borderTop:'9px solid white' }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Character SVG */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: s, height: s * 1.35 }}
      >
        <svg viewBox="0 0 120 165" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          {/* Graduation Cap */}
          <rect x="28" y="20" width="64" height="9" rx="3" fill="#642b58" />
          <polygon points="60,10 28,20 92,20" fill="#642b58" />
          <line x1="92" y1="20" x2="96" y2="40" stroke="#F08C26" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="96" cy="43" r="3.5" fill="#F08C26" />

          {/* Head */}
          <circle cx="60" cy="58" r="24" fill="#FBBF8E" />

          {/* Ears */}
          <circle cx="36" cy="58" r="5" fill="#FBBF8E" />
          <circle cx="84" cy="58" r="5" fill="#FBBF8E" />

          {/* Hair tufts */}
          <path d="M44 36 Q48 28 54 34" stroke="#642b58" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M60 33 Q62 24 68 30" stroke="#642b58" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Eyebrows */}
          <path d="M45 50 Q51 47 56 50" stroke="#642b58" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M64 50 Q69 47 75 50" stroke="#642b58" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Eyes */}
          <ellipse cx="51" cy="57" rx="5" ry={eyesClosed ? 0.6 : 5} fill="white" />
          <ellipse cx="69" cy="57" rx="5" ry={eyesClosed ? 0.6 : 5} fill="white" />
          {!eyesClosed && (
            <>
              <circle cx="52" cy="58" r="3.2" fill="#2D1B2E" />
              <circle cx="70" cy="58" r="3.2" fill="#2D1B2E" />
              <circle cx="53.5" cy="56.5" r="1.1" fill="white" />
              <circle cx="71.5" cy="56.5" r="1.1" fill="white" />
            </>
          )}

          {/* Blush */}
          <ellipse cx="42" cy="65" rx="6" ry="4" fill="#FFB6C1" opacity="0.55" />
          <ellipse cx="78" cy="65" rx="6" ry="4" fill="#FFB6C1" opacity="0.55" />

          {/* Nose */}
          <circle cx="60" cy="62" r="1.5" fill="#E8856A" opacity="0.6" />

          {/* Smile */}
          <path d="M50 68 Q60 76 70 68" stroke="#E8856A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Body */}
          <rect x="40" y="82" width="40" height="44" rx="12" fill="#642b58" />

          {/* Collar white stripe */}
          <path d="M48 82 L60 96 L72 82" fill="white" opacity="0.25" />

          {/* Name tag */}
          <rect x="48" y="96" width="24" height="14" rx="3" fill="white" opacity="0.9" />
          <rect x="50" y="99" width="20" height="2" rx="1" fill="#642b58" opacity="0.6" />
          <rect x="50" y="103" width="14" height="2" rx="1" fill="#642b58" opacity="0.4" />

          {/* Left arm (down) */}
          <path d="M40 92 Q22 98 18 110" stroke="#642b58" strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="17" cy="113" r="7" fill="#FBBF8E" />

          {/* Right arm (waving) */}
          <motion.g
            animate={{ rotate: [-10, 20, -10] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '80px 90px' }}
          >
            <path d="M80 90 Q100 78 105 66" stroke="#642b58" strokeWidth="11" strokeLinecap="round" fill="none" />
            <circle cx="105" cy="63" r="7" fill="#FBBF8E" />
          </motion.g>

          {/* Legs */}
          <rect x="44" y="124" width="13" height="28" rx="7" fill="#2D1B2E" />
          <rect x="63" y="124" width="13" height="28" rx="7" fill="#2D1B2E" />

          {/* Shoes */}
          <ellipse cx="50" cy="154" rx="10" ry="6" fill="#642b58" />
          <ellipse cx="70" cy="154" rx="10" ry="6" fill="#642b58" />

          {/* Stars around character */}
          <motion.text x="8" y="50" fontSize="12" fill="#F08C26" opacity="0.7"
            animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>✦</motion.text>
          <motion.text x="100" y="75" fontSize="9" fill="#a6549f" opacity="0.6"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>★</motion.text>
          <motion.text x="12" y="100" fontSize="8" fill="#2DD4BF" opacity="0.5"
            animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>⚡</motion.text>
        </svg>
      </motion.div>
    </div>
  );
};

export default AnimatedMascot;
