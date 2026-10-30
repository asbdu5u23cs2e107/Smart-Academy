import React from 'react';
import { ReceiptText } from 'lucide-react';

const PaymentSummary = ({ course, couponDiscount = 0 }) => {
  const originalPrice = course?.price || 15000;
  const offerPrice = course?.offerPrice || 9999;
  const baseDiscount = originalPrice - offerPrice;
  const afterCoupon = offerPrice - couponDiscount;
  const gst = Math.round(afterCoupon * 0.18);
  const grandTotal = afterCoupon + gst;

  const rows = [
    { label: 'Course Fee', value: `₹${originalPrice.toLocaleString('en-IN')}`, color: 'text-slate-700' },
    { label: 'Offer Discount', value: `−₹${baseDiscount.toLocaleString('en-IN')}`, color: 'text-emerald-600' },
    { label: 'Coupon Discount', value: couponDiscount > 0 ? `−₹${couponDiscount.toLocaleString('en-IN')}` : '—', color: couponDiscount > 0 ? 'text-purple-650' : 'text-slate-400' },
    { label: 'GST (18%)', value: `₹${gst.toLocaleString('en-IN')}`, color: 'text-slate-500' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          8
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Payment Summary</h2>
          <p className="text-xs text-slate-500 mt-0.5">Review your order before proceeding</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 overflow-hidden">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center px-5 py-4 ${
              idx < rows.length - 1 ? 'border-b border-slate-100' : ''
            } bg-white hover:bg-slate-50/50 transition-colors`}
          >
            <span className="text-sm text-slate-600">{row.label}</span>
            <span className={`text-sm font-semibold ${row.color}`}>{row.value}</span>
          </div>
        ))}

        {/* Grand Total */}
        <div className="flex justify-between items-center px-5 py-5 bg-gradient-to-r from-purple-50 to-indigo-50 border-t-2 border-purple-200">
          <div className="flex items-center gap-2">
            <ReceiptText className="w-4 h-4 text-purple-650" />
            <span className="text-sm font-extrabold text-slate-900">Grand Total</span>
          </div>
          <span className="text-xl font-extrabold text-purple-650">
            ₹{grandTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 text-center">
        * Prices are inclusive of all applicable taxes and GST.
      </p>
    </div>
  );
};

export default PaymentSummary;
