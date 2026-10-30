import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MessageSquare, GraduationCap, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CourseRegistrationForm = ({ courseName }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [batch, setBatch] = useState('');
  const [message, setMessage] = useState('');

  // Validation States
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = 'Full Name is required';

    if (!email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Invalid Email address';
    }

    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/[\s-+]/g, ''))) {
      tempErrors.phone = 'Phone must be a valid 10-digit number';
    }

    if (!status) tempErrors.status = 'Current Status is required';
    if (!batch) tempErrors.batch = 'Preferred Batch is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSubmitted(true);


      setTimeout(() => {
        setSubmitted(false);

        setFullName("");
        setEmail("");
        setPhone("");
        setStatus("");
        setBatch("");
        setMessage("");

        // navigate("/live-classes");
      }, 2000);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xl">
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-650 animate-ping"></span>
          <span>Register for {courseName}</span>
        </h3>
        <p className="text-xs text-slate-500">Submit your details to secure your batch seat. Our academic advisors will call you shortly.</p>
      </div>

      {submitted ? (
        <div className="p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h4 className="text-sm font-bold text-slate-900">Registration Successful!</h4>
          <p className="text-xs text-slate-650 leading-relaxed">
            Thank you, <strong>{fullName}</strong>. Your inquiry for {courseName} has been logged. An advisor will contact you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-650" htmlFor="fullName">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); if (errors.fullName) validate(); }}
                className={`w-full rounded-xl bg-slate-50 border py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-purple-650 focus:outline-none transition-colors ${errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200'
                  }`}
              />
            </div>
            {errors.fullName && <p className="text-[10px] text-rose-550 font-medium">{errors.fullName}</p>}
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-650" htmlFor="email">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) validate(); }}
                className={`w-full rounded-xl bg-slate-50 border py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-purple-650 focus:outline-none transition-colors ${errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200'
                  }`}
              />
            </div>
            {errors.email && <p className="text-[10px] text-rose-550 font-medium">{errors.email}</p>}
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-650" htmlFor="phone">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); if (errors.phone) validate(); }}
                className={`w-full rounded-xl bg-slate-50 border py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-purple-650 focus:outline-none transition-colors ${errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200'
                  }`}
              />
            </div>
            {errors.phone && <p className="text-[10px] text-rose-550 font-medium">{errors.phone}</p>}
          </div>

          {/* Current Status Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-650" htmlFor="status">Current Status</label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <select
                id="status"
                value={status}
                onChange={(e) => { setStatus(e.target.value); if (errors.status) validate(); }}
                className={`w-full rounded-xl bg-slate-50 border py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-purple-650 focus:outline-none appearance-none transition-colors ${errors.status ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200'
                  }`}
              >
                <option value="">Select your status</option>
                <option value="student">College Student</option>
                <option value="professional">Working Professional</option>
                <option value="seeker">Job Seeker</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.status && <p className="text-[10px] text-rose-550 font-medium">{errors.status}</p>}
          </div>

          {/* Preferred Batch Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-650" htmlFor="batch">Preferred Batch</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <select
                id="batch"
                value={batch}
                onChange={(e) => { setBatch(e.target.value); if (errors.batch) validate(); }}
                className={`w-full rounded-xl bg-slate-50 border py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-purple-650 focus:outline-none appearance-none transition-colors ${errors.batch ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200'
                  }`}
              >
                <option value="">Select a batch</option>
                <option value="weekday-morning">Weekday Morning (7 AM - 9 AM)</option>
                <option value="weekday-evening">Weekday Evening (7 PM - 9 PM)</option>
                <option value="weekend">Weekend Batches (Sat & Sun)</option>
              </select>
            </div>
            {errors.batch && <p className="text-[10px] text-rose-550 font-medium">{errors.batch}</p>}
          </div>

          {/* Message Textarea */}
          {/* <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-650" htmlFor="message">Message / Queries (Optional)</label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <textarea
                id="message"
                rows="2"
                placeholder="Ask about placement, fees, syllabus, etc."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-purple-650 focus:outline-none transition-colors resize-none"
              />
            </div>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold transition-all shadow-md mt-2 text-white"
          >
            Register Now
          </button>
        </form>
      )}
    </div>
  );
};

export default CourseRegistrationForm;
