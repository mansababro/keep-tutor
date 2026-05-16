import React from 'react';
import { Shield, FileText } from 'lucide-react';

interface LegalViewProps {
  type: 'PRIVACY' | 'TERMS';
}

const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  const isPrivacy = type === 'PRIVACY';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';
  const icon = isPrivacy ? <Shield className="text-brand-600" size={32} /> : <FileText className="text-brand-600" size={32} />;
  const lastUpdated = "February 24, 2025";

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 font-sans">
       <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
             <div className="p-4 bg-brand-50 rounded-2xl">
                {icon}
             </div>
             <div>
                <h1 className="text-3xl md:text-4xl font-display font-black text-slate-900">{title}</h1>
                <p className="text-slate-500 mt-1">Last Updated: {lastUpdated}</p>
             </div>
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
             {isPrivacy ? (
                <>
                   <p>At Keep Tutors, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website.</p>
                   
                   <h3>1. Collection of Information</h3>
                   <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                   <ul>
                      <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                      <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                   </ul>

                   <h3>2. Use of Your Information</h3>
                   <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                   <ul>
                      <li>Create and manage your account.</li>
                      <li>Email you regarding your account or order.</li>
                      <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                   </ul>
                </>
             ) : (
                <>
                   <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Keep Tutors (“we,” “us” or “our”), concerning your access to and use of the website.</p>
                   
                   <h3>1. Agreement to Terms</h3>
                   <p>By accessing the Site, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>

                   <h3>2. Intellectual Property Rights</h3>
                   <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.</p>

                   <h3>3. User Representations</h3>
                   <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.</p>
                </>
             )}
          </div>
       </div>
    </div>
  );
};

export default LegalView;