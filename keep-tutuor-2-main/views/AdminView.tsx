import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, User, BookOpen, Clock, RefreshCw, Lock, CheckCircle, ShieldCheck, LogOut, AlertCircle } from 'lucide-react';
import { mockBackend } from '../services/mockBackend';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const AdminView: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [data, setData] = useState<{ teacherApplications: any[], tutorRequests: any[] }>({ teacherApplications: [], tutorRequests: [] });
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  // Track mounted state to prevent memory leaks
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const fetchData = () => {
    if (!isMounted.current) return;
    setLoading(true);
    // Simulate fetch
    setTimeout(() => {
        if (!isMounted.current) return;
        const db = mockBackend.getDatabase();
        setData({ ...db });
        setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (isAuthenticated) {
        fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Validation
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
        setLoginError('Please enter both username and password.');
        return;
    }

    setIsLoggingIn(true);
    const res = await mockBackend.login(loginForm.email, loginForm.password, 'ADMIN');
    if (!isMounted.current) return;
    setIsLoggingIn(false);

    if (res.success) {
        setIsAuthenticated(true);
    } else {
        setLoginError(res.message || 'Login failed');
    }
  };

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    await mockBackend.approveTeacher(id);
    if (!isMounted.current) return;
    setProcessingId(null);
    fetchData(); // Refresh list
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-20 pb-10">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl shadow-card border border-slate-100 w-full max-w-md"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shadow-inner">
                        <Lock size={32} />
                    </div>
                </div>
                <h1 className="text-2xl font-display font-black text-center text-slate-900 mb-2">Admin Portal</h1>
                <p className="text-slate-500 text-center mb-8 text-sm">Please login to access sensitive data.</p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input 
                        label="Username" 
                        type="text" 
                        value={loginForm.email} 
                        onChange={e => setLoginForm({...loginForm, email: e.target.value})} 
                        placeholder="admin"
                    />
                    <Input 
                        label="Password" 
                        type="password" 
                        value={loginForm.password} 
                        onChange={e => setLoginForm({...loginForm, password: e.target.value})} 
                        placeholder="••••••••"
                    />
                    
                    {loginError && (
                        <div className="flex items-center gap-2 text-red-600 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                            <AlertCircle size={16} />
                            {loginError}
                        </div>
                    )}

                    <Button type="submit" fullWidth variant="primary" loading={isLoggingIn}>Login to Dashboard</Button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
                    <p className="mb-1">Default Credentials:</p>
                    <div className="inline-block bg-slate-100 px-3 py-1 rounded font-mono text-slate-600">
                        admin / admin123
                    </div>
                </div>
            </motion.div>
        </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-display font-black text-slate-900 flex items-center gap-3">
                <Database className="text-brand-600" />
                Admin Dashboard
                </h1>
                <p className="text-slate-500 mt-1">Manage applications and view request data.</p>
            </div>
            <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={fetchData} icon={<RefreshCw size={16} className={loading ? "animate-spin" : ""} />}>
                    Refresh
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsAuthenticated(false)} icon={<LogOut size={16} />}>
                    Logout
                </Button>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Tutor Requests Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden flex flex-col h-[600px]"
            >
                <div className="p-6 border-b border-slate-100 bg-brand-50/50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen size={20} className="text-accent-orange" />
                        Parent Requests
                    </h2>
                    <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-bold">
                        {data.tutorRequests.length} Total
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {data.tutorRequests.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <Database size={40} className="mb-4 opacity-20" />
                            <p>No requests received yet.</p>
                        </div>
                    ) : (
                        data.tutorRequests.map((req: any) => (
                            <div key={req.id} className="p-4 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-sm transition-all bg-slate-50/50">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-800">{req.name}</h3>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">{req.mode}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
                                    <div className="flex items-center gap-1"><span className="text-slate-400">Subject:</span> {req.subjects}</div>
                                    <div className="flex items-center gap-1"><span className="text-slate-400">City:</span> {req.city}</div>
                                    <div className="flex items-center gap-1"><span className="text-slate-400">Grade:</span> {req.grade}</div>
                                    <div className="flex items-center gap-1"><span className="text-slate-400">Phone:</span> {req.phone}</div>
                                </div>
                                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                    <Clock size={10} /> {new Date(req.submittedAt).toLocaleString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>

            {/* Teacher Applications Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden flex flex-col h-[600px]"
            >
                <div className="p-6 border-b border-slate-100 bg-brand-50/50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <User size={20} className="text-brand-600" />
                        Teacher Applications
                    </h2>
                    <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-bold">
                        {data.teacherApplications.length} Total
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {data.teacherApplications.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <User size={40} className="mb-4 opacity-20" />
                            <p>No applications received yet.</p>
                        </div>
                    ) : (
                        data.teacherApplications.map((app: any) => (
                            <div key={app.id} className="p-4 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-sm transition-all bg-slate-50/50 group">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                            {app.firstName} {app.lastName}
                                            {app.status === 'approved' && <ShieldCheck size={16} className="text-green-500" />}
                                        </h3>
                                        <p className="text-xs text-slate-500">{app.email}</p>
                                    </div>
                                    {app.status === 'approved' ? (
                                        <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-lg border border-green-200">
                                            Approved
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-lg border border-amber-200">
                                            Pending
                                        </span>
                                    )}
                                </div>
                                <div className="mt-3 text-xs text-slate-600 flex flex-wrap gap-2">
                                    <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">🎓 {app.education}</span>
                                    <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">📚 {app.subject}</span>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                        <Clock size={10} /> {new Date(app.submittedAt).toLocaleString()}
                                    </div>
                                    
                                    {app.status !== 'approved' && (
                                        <Button 
                                            size="sm" 
                                            variant="glow" 
                                            className="h-8 text-xs py-0 px-3"
                                            loading={processingId === app.id}
                                            onClick={() => handleApprove(app.id)}
                                            icon={<CheckCircle size={12} />}
                                        >
                                            Approve
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AdminView;