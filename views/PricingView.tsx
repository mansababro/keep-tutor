import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown } from 'lucide-react';
import Button from '../components/ui/Button';
import { ViewMode } from '../types';

interface PricingViewProps {
  onNavigate: (view: ViewMode) => void;
}

interface PricingCardProps {
  tier: any;
  index: number;
  onNavigate: (view: ViewMode) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, index, onNavigate }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`relative p-8 rounded-3xl border-2 flex flex-col h-full ${
        tier.popular 
        ? 'bg-white border-brand-500 shadow-xl scale-105 z-10' 
        : 'bg-white border-slate-100 shadow-sm'
    }`}
  >
    {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-1">
            <Crown size={12} /> Most Popular
        </div>
    )}
    
    <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
        <div className="flex items-baseline gap-1">
            <span className="text-4xl font-display font-black text-slate-900">{tier.price}</span>
            <span className="text-slate-500 text-sm">{tier.period}</span>
        </div>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed">{tier.desc}</p>
    </div>

    <div className="space-y-4 mb-8 flex-1">
        {tier.features.map((feat: string, i: number) => (
            <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
                <div className={`mt-0.5 p-0.5 rounded-full ${tier.popular ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500'}`}>
                    <Check size={12} strokeWidth={3} />
                </div>
                {feat}
            </div>
        ))}
    </div>

    <Button 
        fullWidth 
        variant={tier.popular ? 'primary' : 'outline'}
        size="lg"
        onClick={() => onNavigate(tier.targetView)}
    >
        {tier.cta}
    </Button>
  </motion.div>
);

const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  const tiers = [
    {
      name: "Basic",
      price: "Free",
      period: "forever",
      desc: "Perfect for browsing tutors and asking basic questions.",
      features: [
        "Create Student Profile",
        "Browse 3,000+ Tutors",
        "Contact 3 Tutors / Month",
        "Basic Support"
      ],
      cta: "Get Started",
      popular: false,
      targetView: ViewMode.PARENT
    },
    {
      name: "Premium Learner",
      price: "Rs 1,500",
      period: "/month",
      desc: "For serious students who want the best matches instantly.",
      features: [
        "Unlimited Tutor Contacts",
        "Priority Search Listing",
        "verified Badge on Profile",
        "Access to Video Intros",
        "24/7 Priority Support",
        "Satisfaction Guarantee"
      ],
      cta: "Upgrade Now",
      popular: true,
      targetView: ViewMode.PARENT
    },
    {
      name: "Tutor Pro",
      price: "Rs 2,000",
      period: "/month",
      desc: "For tutors who want to fill their schedule fast.",
      features: [
        "0% Commission on Earnings",
        "Top Ranking in Search",
        "Featured Profile Badge",
        "Advanced Analytics",
        "Instant Job Alerts"
      ],
      cta: "Become a Pro",
      popular: false,
      targetView: ViewMode.TEACHER
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 font-sans">
        <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-brand-600 font-bold tracking-widest text-sm uppercase mb-2 block">Simple Pricing</span>
                <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6">
                    Invest in your <span className="text-accent-orange">Future.</span>
                </h1>
                <p className="text-xl text-slate-500">
                    Transparent pricing for students and tutors. No hidden fees, cancel anytime.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
                {tiers.map((tier, idx) => (
                    <PricingCard key={idx} tier={tier} index={idx} onNavigate={onNavigate} />
                ))}
            </div>

            <div className="mt-20 text-center">
                <p className="text-slate-400 text-sm">
                    Have a large institution? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(ViewMode.CONTACT); }} className="text-brand-600 font-bold underline">Contact Sales</a> for enterprise plans.
                </p>
            </div>
        </div>
    </div>
  );
};

export default PricingView;