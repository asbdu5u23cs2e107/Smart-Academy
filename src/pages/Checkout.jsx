import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Smartphone, Building, User, Mail, Phone, ArrowLeft, ShieldAlert } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, finalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all student detail fields.');
      return;
    }
    
    setIsPaying(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      clearCart();
      setIsPaying(false);
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="w-full max-w-lg space-y-8 bg-white/40 border border-slate-100 p-8 rounded-3xl backdrop-blur relative">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate('/cart')}
          className="absolute top-6 left-6 text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1 text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>

        {/* Title */}
        <div className="text-center pt-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Checkout</h2>
          <p className="text-xs text-slate-500 mt-1">Provide your enrollment details and complete transaction.</p>
        </div>

        {/* Form panel */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs text-rose-400">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Enrolled Courses preview summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Courses in Checkout</span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {cartItems.length === 0 ? (
                <li className="text-slate-500 italic">No courses in cart (Simulating default checkout)</li>
              ) : (
                cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between font-medium">
                    <span>{item.title}</span>
                    <span className="text-slate-650">₹{item.price.toLocaleString('en-IN')}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-1.5">Student Details:</h3>
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Payment Method Option Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-1.5">Payment Method:</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'upi' 
                  ? 'bg-purple-50 border-sky-500 text-purple-650' 
                  : 'bg-slate-50 border-slate-200 hover:border-slate-700 text-slate-650'
              }`}>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="sr-only"
                />
                <Smartphone className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs font-semibold">UPI</span>
              </label>

              <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'card' 
                  ? 'bg-purple-50 border-sky-500 text-purple-650' 
                  : 'bg-slate-50 border-slate-200 hover:border-slate-700 text-slate-650'
              }`}>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="sr-only"
                />
                <CreditCard className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs font-semibold">Card</span>
              </label>

              <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'netbanking' 
                  ? 'bg-purple-50 border-sky-500 text-purple-650' 
                  : 'bg-slate-50 border-slate-200 hover:border-slate-700 text-slate-650'
              }`}>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                  className="sr-only"
                />
                <Building className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs font-semibold">Net Banking</span>
              </label>
            </div>
          </div>

          {/* Pricing display */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Amount:</span>
            <span className="text-2xl font-extrabold text-slate-900">₹{finalPrice === 0 ? '30,000' : finalPrice.toLocaleString('en-IN')}</span>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPaying}
              className={`btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 ${
                isPaying ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isPaying ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-slate-950 border-t-white rounded-full animate-spin"></span>
                  Processing Payment...
                </span>
              ) : (
                <span>PAY NOW</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Checkout;
