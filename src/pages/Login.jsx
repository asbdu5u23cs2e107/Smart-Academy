import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, ShieldAlert, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    // Perform simulated login
    login(email, password, role);

    // Redirect based on role
    if (role === 'trainer') navigate('/trainer');
    else if (role === 'admin') navigate('/admin');
    else if (role === 'super-admin') navigate('/super-admin');
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
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">LOGIN</h2>
          <p className="text-xs text-slate-500 mt-1">Access your personalized LMS dashboard portal.</p>
        </div>

        {/* Login form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs text-rose-400">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">

            {/* Email input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-purple-650" htmlFor="email-address">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  id="email-address"
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-purple-650" htmlFor="password">Password</label>
                <button type="button" className="text-[10px] text-purple-650 hover:text-sky-300">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            {/* Simulated Role Selector (Extremely useful for review!) */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[10px] font-bold text-purple-650">Select Login Role </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'student', label: 'Student ' },
                   { value: 'trainer', label: 'Trainer ' },
                   
                  // <select value={role} onChange={(e) => setRole(e.target.value)}>
                  //   <option value="student">Student</option>
                  //   <option value="trainer">Trainer</option>
                  // </select>
                ].map((roleOpt) => (
                  <button
                    key={roleOpt.value}
                    type="button"
                    onClick={() => setRole(roleOpt.value)}
                    className={`py-2 px-3 text-[10px] font-semibold border rounded-xl transition-all capitalize text-center ${role === roleOpt.value
                        ? 'bg-purple-50 text-purple-650 border-sky-500/30'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-700'
                      }`}
                  >
                    {roleOpt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 group"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2">
            <span>New User? </span>
            <Link to="/register" className="text-purple-650 hover:text-sky-300 font-semibold">[Create Account]</Link>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;
