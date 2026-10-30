import React from 'react';
import { ShieldCheck, Tag, ArrowRight, Sparkles } from 'lucide-react';

const EnrollmentSummaryCard = ({ course, couponDiscount = 0, currentStep, onProceed }) => {
  const originalPrice = course?.price || 15000;
  const offerPrice = course?.offerPrice || 9999;
  const baseDiscount = originalPrice - offerPrice;
  const afterCoupon = offerPrice - couponDiscount;
  const gst = Math.round(afterCoupon * 0.18);
  const grandTotal = afterCoupon + gst;
  const discountPct = Math.round((baseDiscount / originalPrice) * 100);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-indigo-50">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-650" />
          Enrollment Summary
        </h3>
      </div>

      <div className="p-6 space-y-5">
        {/* Course name + level */}
        <div className="space-y-0.5">
          <p className="text-sm font-bold text-slate-900 leading-snug">
            {course?.courseName || 'React JS Live Training'}
          </p>
          <p className="text-[11px] text-slate-500">
            {course?.level || 'Beginner to Advanced'} • {course?.duration || '12 Weeks'}
          </p>
        </div>

        {/* Price display */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              ₹{afterCoupon.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-slate-400 line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            You save {discountPct}%{couponDiscount > 0 ? ' + Coupon' : ''}
          </span>
        </div>

        {/* Breakdown */}
        <div className="border-t border-slate-100 pt-4 space-y-2.5">
          <PriceLine label="Course Fee" value={`₹${originalPrice.toLocaleString('en-IN')}`} />
          <PriceLine
            label="Special Discount"
            value={`−₹${baseDiscount.toLocaleString('en-IN')}`}
            className="text-emerald-600"
          />
          {couponDiscount > 0 && (
            <PriceLine
              label={
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Coupon Discount
                </span>
              }
              value={`−₹${couponDiscount.toLocaleString('en-IN')}`}
              className="text-purple-650"
            />
          )}
          <PriceLine label="GST (18%)" value={`₹${gst.toLocaleString('en-IN')}`} className="text-slate-500" />

          <div className="border-t border-slate-100 pt-2.5 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-900">Total Amount</span>
            <span className="text-base font-extrabold text-purple-650">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onProceed}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-purple-650 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-650/25 transition-all duration-200 active:scale-95"
        >
          {currentStep === 4 ? 'Proceed to Payment' : `Continue to Step ${currentStep + 1}`}
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secure badge */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>100% Secure &amp; Encrypted Payment</span>
        </div>
      </div>
    </div>
  );
};

const PriceLine = ({ label, value, className = 'text-slate-600' }) => (
  <div className="flex justify-between items-center">
    <span className={`text-xs ${className}`}>{label}</span>
    <span className={`text-xs font-semibold ${className}`}>{value}</span>
  </div>
);

export default EnrollmentSummaryCard;
