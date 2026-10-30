import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitted(true);
    setError('');

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <span className="text-[10px] text-purple-650 font-bold uppercase tracking-wider">Contact Directory</span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase sm:text-4xl">CONTACT US</h1>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Have an inquiry about batches, pricing, or custom business training? Drop us a line.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact details list */}
        <section className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-100 pb-2">Contact Details:</h2>
            
            <ul className="space-y-4 text-xs text-slate-650">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-650 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 uppercase">Address</p>
                  <p className="mt-1 leading-normal">SWordNex Academy Headquarters, Chennai, Tamil Nadu, India</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-650 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 uppercase">Email</p>
                  <p className="mt-1"><a href="mailto:support@swordnexacademy.com" className="hover:text-purple-650 transition-colors">support@swordnexacademy.com</a></p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-purple-650 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 uppercase">Phone</p>
                  <p className="mt-1">+91 98765 43210</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact form submission */}
        <section className="md:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-200 pb-2">Send Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-200 text-emerald-400 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Message Sent Successfully! We will respond within 24 hours.</span>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-650">Message</label>
              <textarea 
                required
                placeholder="How can we help you?"
                value={message}
                onChange={(e) => { setMessage(e.target.value); setError(''); }}
                className="w-full h-28 rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-slate-800 focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="btn-primary py-2.5 px-6 text-xs flex items-center gap-2 group"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </form>
        </section>

      </div>

    </div>
  );
};

export default ContactUs;
