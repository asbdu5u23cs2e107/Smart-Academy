import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, User, Mail, Phone, Lock, ShieldAlert, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' | 'trainer'
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Simulate register
    login(email, password, role, name);
    
    // Redirect based on role
    if (role === 'trainer') navigate('/trainer');
    else navigate('/student-dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative backdrop blobs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-purple-50/50 blur-[80px]"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-purple-50/50 blur-[80px]"></div>

      <div className="w-full max-w-md space-y-8 bg-white/40 border border-slate-100 p-8 rounded-3xl backdrop-blur">
        
        {/* Logo and title */}
        <div className="text-center flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-10 w-10 text-purple-650" />
            <span className="text-2xl font-bold tracking-tight text-white">Smart<span className="text-purple-650">Academy</span></span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight text-center uppercase">Create Account</h2>
          <p className="text-xs text-slate-500 mt-1">Register to start your learning and career journey.</p>
        </div>

        {/* Register form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs text-rose-400">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3.5">
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650" htmlFor="full-name">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  id="full-name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="john@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650" htmlFor="phone">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Select Role: Radio options */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-slate-650">Select Role:</span>
              <div className="flex gap-6">
                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                    className="h-4 w-4 border-slate-200 bg-slate-50 text-purple-650 focus:ring-sky-500 focus:ring-offset-slate-950"
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={role === 'trainer'}
                    onChange={() => setRole('trainer')}
                    className="h-4 w-4 border-slate-200 bg-slate-50 text-purple-650 focus:ring-sky-500 focus:ring-offset-slate-950"
                  />
                  <span>Trainer</span>
                </label>
              </div>
            </div>

          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 group"
            >
              <span>Register</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="text-center text-xs text-slate-500">
            <span>Already have an account? </span>
            <Link to="/login" className="text-purple-650 hover:text-sky-300 font-semibold">[Login]</Link>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Register;
