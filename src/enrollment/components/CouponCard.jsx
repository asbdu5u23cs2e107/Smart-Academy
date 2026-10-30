import React, { useState } from 'react';
import { Tag, CheckCircle, XCircle, Loader2 } from 'lucide-react';

// Valid coupons: SWORD20 = 20%, LAUNCH10 = flat ₹500
const VALID_COUPONS = {
  SWORD20: { type: 'percent', value: 20, label: '20% Off' },
  LAUNCH10: { type: 'flat', value: 500, label: '₹500 Off' },
  SWORDNEX: { type: 'percent', value: 15, label: '15% Off' },
};

const CouponCard = ({ offerPrice, couponDiscount, onCouponApply }) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [appliedCode, setAppliedCode] = useState('');

  const handleApply = () => {
    if (!code.trim()) return;
    setStatus('loading');

    setTimeout(() => {
      const coupon = VALID_COUPONS[code.trim().toUpperCase()];
      if (coupon) {
        const discount =
          coupon.type === 'percent'
            ? Math.round((offerPrice * coupon.value) / 100)
            : coupon.value;
        onCouponApply(discount);
        setAppliedCode(code.trim().toUpperCase());
        setMessage(`Coupon applied! ${coupon.label} discount activated.`);
        setStatus('success');
      } else {
        onCouponApply(0);
        setMessage('Invalid or expired coupon code. Please try again.');
        setStatus('error');
      }
    }, 1000);
  };

  const handleRemove = () => {
    setCode('');
    setAppliedCode('');
    setMessage('');
    setStatus(null);
    onCouponApply(0);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-5">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          7
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Coupon Code</h2>
          <p className="text-xs text-slate-500 mt-0.5">Have a coupon? Apply it to get additional discount</p>
        </div>
      </div>

      {/* Input Row */}
      {!appliedCode ? (
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Enter coupon code (e.g. SWORD20)"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
              className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition-colors uppercase tracking-widest"
              disabled={status === 'loading'}
            />
          </div>
          <button
            onClick={handleApply}
            disabled={!code.trim() || status === 'loading'}
            className="px-5 py-2.5 rounded-xl bg-purple-650 hover:bg-purple-700 text-white text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Apply'
            )}
          </button>
        </div>
      ) : (
        /* Applied State */
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-emerald-800">
              <span className="font-mono tracking-widest">{appliedCode}</span> applied!
            </p>
            <p className="text-xs text-emerald-600 mt-0.5">
              Saving ₹{couponDiscount.toLocaleString('en-IN')} on this order
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-semibold"
          >
            <XCircle className="w-4 h-4" /> Remove
          </button>
        </div>
      )}

      {/* Status Message */}
      {message && status === 'error' && (
        <div className="flex items-center gap-2 text-xs text-rose-600">
          <XCircle className="w-4 h-4" />
          {message}
        </div>
      )}

      {/* Hint chips */}
      {!appliedCode && status !== 'success' && (
        <div className="flex flex-wrap gap-2">
          {Object.keys(VALID_COUPONS).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCode(c)}
              className="text-[10px] font-mono font-bold text-purple-650 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full hover:bg-purple-100 transition-colors"
            >
              {c}
            </button>
          ))}
          <span className="text-[10px] text-slate-400 self-center">← Try these</span>
        </div>
      )}
    </div>
  );
};

export default CouponCard;
