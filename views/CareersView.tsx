import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { ArrowRight, Briefcase } from 'lucide-react';
import { ViewMode } from '../types';

interface CareersViewProps {
  onNavigate: (view: ViewMode) => void;
}

const JobCard = ({ title, type, location, onClick }: { title: string, type: string, location: string, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:border-brand-200 hover:shadow-card transition-all cursor-pointer"
  >
     <div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{title}</h3>
        <div className="flex gap-4 mt-2 text-sm text-slate-500">
           <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md"><Briefcase size={12}/> {type}</span>
           <span>{location}</span>
        </div>
     </div>
     <div className="mt-4 md:mt-0">
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all">
            <ArrowRight size={18} />
        </div>
     </div>
  </div>
);

const CareersView: React.FC<CareersViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 font-sans">
       <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <span className="inline-block px-3 py-1 rounded-full bg-accent-teal/10 text-accent-teal font-bold text-xs uppercase tracking-widest mb-4">
                We are hiring!
             </span>
             <h1 className="text-5xl font-display font-black text-slate-900 mb-6">
                Join our <span className="text-brand-600">Rocketship.</span>
             </h1>
             <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Help us shape the future of education in Pakistan. We are looking for passionate individuals to join our remote-first team.
             </p>
          </div>

          <div className="space-y-4">
             <JobCard title="Senior React Developer" type="Full-time" location="Remote (Pakistan)" onClick={() => onNavigate(ViewMode.CONTACT)} />
             <JobCard title="Product Designer (UI/UX)" type="Full-time" location="Lahore / Hybrid" onClick={() => onNavigate(ViewMode.CONTACT)} />
             <JobCard title="Customer Success Manager" type="Full-time" location="Remote" onClick={() => onNavigate(ViewMode.CONTACT)} />
             <JobCard title="Marketing Specialist" type="Part-time" location="Karachi" onClick={() => onNavigate(ViewMode.CONTACT)} />
          </div>

          <div className="mt-16 bg-white p-8 rounded-3xl border border-slate-100 text-center">
             <h3 className="text-xl font-bold text-slate-900 mb-2">Don't see a fit?</h3>
             <p className="text-slate-500 mb-6">We are always looking for talent. Send us your CV.</p>
             <Button variant="outline" onClick={() => onNavigate(ViewMode.CONTACT)}>Email HR Team</Button>
          </div>
       </div>
    </div>
  );
};

export default CareersView;