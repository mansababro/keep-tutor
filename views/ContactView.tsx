import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const ContactView: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [errors, setErrors] = useState<{[key:string]: string}>({});

  const validate = () => {
    const newErrors: {[key:string]: string} = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 font-sans">
       <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-5xl font-display font-black text-slate-900 mb-6">
                Let's <span className="text-accent-orange">Chat.</span>
             </h1>
             <p className="text-xl text-slate-600 mb-12">
                Have questions about finding a tutor or becoming one? We're here to help!
             </p>

             <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Mail size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 text-lg">Email Us</h4>
                      <p className="text-slate-500">support@keeptutors.com</p>
                      <p className="text-slate-500">careers@keeptutors.com</p>
                   </div>
                </div>
                
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-accent-teal/10 text-accent-teal rounded-2xl flex items-center justify-center shrink-0">
                      <Phone size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 text-lg">Call Us</h4>
                      <p className="text-slate-500">+92 300 1234567</p>
                      <p className="text-slate-400 text-sm">Mon-Fri, 9am - 6pm</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-accent-orange/10 text-accent-orange rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 text-lg">Visit Us</h4>
                      <p className="text-slate-500">Arfa Software Technology Park,</p>
                      <p className="text-slate-500">Ferozepur Road, Lahore.</p>
                   </div>
                </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-card relative overflow-hidden"
          >
             <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-10 text-center"
                    >
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                        <p className="text-slate-500 mb-8">We'll get back to you shortly.</p>
                        <Button variant="outline" onClick={() => setIsSuccess(false)}>Send Another</Button>
                    </motion.div>
                ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Input 
                                        label="First Name" 
                                        placeholder="John" 
                                        value={formData.firstName}
                                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                                    />
                                    {errors.firstName && <span className="text-xs text-red-500 ml-1 font-bold">{errors.firstName}</span>}
                                </div>
                                <Input 
                                    label="Last Name" 
                                    placeholder="Doe" 
                                    value={formData.lastName}
                                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                                />
                            </div>
                            <div>
                                <Input 
                                    label="Email" 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                                {errors.email && <span className="text-xs text-red-500 ml-1 font-bold">{errors.email}</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                                <textarea 
                                    className="w-full px-5 py-4 rounded-xl bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none transition-all duration-200 shadow-sm min-h-[150px]"
                                    placeholder="How can we help you?"
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                                {errors.message && <span className="text-xs text-red-500 ml-1 font-bold">{errors.message}</span>}
                            </div>
                            <div className="pt-2">
                                <Button fullWidth variant="primary" icon={<Send size={18} />} type="submit" loading={isSubmitting}>Send Message</Button>
                            </div>
                        </form>
                    </motion.div>
                )}
             </AnimatePresence>
          </motion.div>

       </div>
    </div>
  );
};

export default ContactView;