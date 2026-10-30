import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Trash2, Plus, ArrowLeft, Ticket, Check, ShieldCheck, 
  BookOpen, Star, HelpCircle 
} from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, couponCode, discount, totalOriginalPrice, 
    finalPrice, removeFromCart, addToCart, applyCoupon 
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    
    const isSuccess = applyCoupon(couponInput);
    if (isSuccess) {
      setCouponSuccess(true);
      setCouponMessage('Coupon "SMART5000" applied successfully! ₹5,000 discount applied.');
    } else {
      setCouponSuccess(false);
      setCouponMessage('Invalid coupon code. Try entering "SMART5000".');
    }
  };

  const recommendations = [
    {
      id: 'python-fs',
      title: 'Python Programming',
      trainer: 'Priya',
      duration: '4 Months',
      rating: 4.8,
      price: 25000,
    },
    {
      id: 'node-master',
      title: 'Node.js Masterclass',
      trainer: 'John David',
      duration: '3 Months',
      rating: 4.9,
      price: 15000,
    },
    {
      id: 'aws-cloud',
      title: 'AWS Cloud Foundations',
      trainer: 'Karthik',
      duration: '2 Months',
      rating: 4.7,
      price: 18000,
    }
  ];

  const handleAddRecommended = (course) => {
    addToCart({
      ...course,
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span>🛒 MY CART</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Review your selected courses and continue to payment.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center bg-white/20 border border-slate-100 border-dashed rounded-3xl gap-4">
          <BookOpen className="w-12 h-12 text-slate-700 animate-bounce" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-700">Your Cart is Empty</p>
            <p className="text-xs text-slate-500">Explore our professional training programs to populate your checkout list.</p>
          </div>
          <Link to="/courses" className="btn-primary py-2 text-xs">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart items */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">Selected Courses</h2>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-white/40 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  {/* Mock thumbnail */}
                  <div className="h-20 w-full sm:w-28 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80'} 
                      alt={item.title} 
                      className="h-full w-full object-cover opacity-80"
                    />
                  </div>

                  {/* Body description */}
                  <div className="flex-grow flex flex-col gap-1 text-xs">
                    <h3 className="font-bold text-slate-900 text-sm hover:text-purple-650 transition-colors">
                      <Link to={`/course/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="text-slate-500">👨 Trainer : {item.trainer}</p>
                    <p className="text-slate-500">⏳ Duration : {item.duration}</p>
                    
                    <div className="flex items-center gap-1.5 text-amber-400 mt-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-slate-700">{item.rating} Rating</span>
                    </div>
                  </div>

                  {/* Remove and Price */}
                  <div className="flex sm:flex-col justify-between items-center sm:items-end gap-2 flex-shrink-0">
                    <span className="font-extrabold text-slate-900 text-base">💰 ₹{item.price.toLocaleString('en-IN')}</span>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Section */}
            <div className="space-y-4 pt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">Recommended Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendations.map((course) => (
                  <div 
                    key={course.id}
                    className="p-4 rounded-xl bg-white/10 border border-slate-100 flex flex-col justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 line-clamp-1">{course.title}</h4>
                      <p className="text-slate-500">₹{course.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleAddRecommended(course)}
                      className="flex items-center justify-center gap-1 py-1 px-3 rounded-lg border border-slate-200 hover:border-slate-700 bg-white text-purple-650 hover:text-white font-semibold w-full transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Checkout summaries */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Cart summary box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Order Summary</h2>
              
              <div className="space-y-2 text-xs border-b border-slate-200 pb-4 text-slate-650">
                <div className="flex justify-between">
                  <span>Courses ({cartItems.length}) :</span>
                  <span className="text-slate-800">₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount :</span>
                  <span className="text-emerald-400">- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
                  <span>Total Amount :</span>
                  <span>₹{finalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Coupon inputs form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Coupon Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="ENTER COUPON (SMART5000)" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-grow rounded-xl bg-slate-50 border border-slate-200 text-xs px-3.5 py-2 text-slate-800 placeholder-slate-600 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs rounded-xl font-bold transition-colors text-white"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-[10px] font-semibold leading-normal ${couponSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {couponMessage}
                  </p>
                )}
              </form>

              {/* Benefits Checklist */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Included Benefits</h4>
                <ul className="space-y-1.5 text-xs text-slate-650">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Lifetime Access</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Certificate Included</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Mentor Support</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Downloadable Resources</li>
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <Link 
                  to="/checkout"
                  className="btn-primary w-full text-center py-3 text-sm flex justify-center items-center gap-2"
                >
                  Buy Now
                </Link>
                
                <Link 
                  to="/courses"
                  className="btn-secondary w-full text-center py-2.5 text-xs"
                >
                  Continue Shopping
                </Link>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;
