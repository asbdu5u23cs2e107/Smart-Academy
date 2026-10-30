import React from 'react';
import {
  Smartphone, CreditCard, Landmark, Wallet, Banknote, BadgeCheck
} from 'lucide-react';

const paymentMethods = [
  {
    id: 'upi',
    label: 'UPI',
    desc: 'Google Pay, PhonePe, Paytm',
    icon: <Smartphone className="w-5 h-5" />,
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
    badge: 'Instant',
    badgeColor: 'text-green-700 bg-green-100',
  },
  {
    id: 'credit_card',
    label: 'Credit Card',
    desc: 'Visa, Mastercard, RuPay',
    icon: <CreditCard className="w-5 h-5" />,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 'debit_card',
    label: 'Debit Card',
    desc: 'All major bank debit cards',
    icon: <CreditCard className="w-5 h-5" />,
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    desc: 'All Indian banks supported',
    icon: <Landmark className="w-5 h-5" />,
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'wallet',
    label: 'Wallet',
    desc: 'Mobikwik, Freecharge, etc.',
    icon: <Wallet className="w-5 h-5" />,
    bg: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    id: 'cash',
    label: 'Cash After Approval',
    desc: 'Pay at our office after admission confirmation',
    icon: <Banknote className="w-5 h-5" />,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    badge: 'Offline',
    badgeColor: 'text-amber-700 bg-amber-100',
  },
];

const PaymentMethod = ({ selected, onSelect }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          9
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Payment Method</h2>
          <p className="text-xs text-slate-500 mt-0.5">Choose your preferred payment option</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selected === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 w-full ${
                isSelected
                  ? 'border-purple-500 bg-purple-50 shadow-sm shadow-purple-100'
                  : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
              }`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${method.bg} flex items-center justify-center flex-shrink-0 ${method.iconColor}`}>
                {method.icon}
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-bold ${isSelected ? 'text-purple-650' : 'text-slate-800'}`}>
                    {method.label}
                  </p>
                  {method.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${method.badgeColor}`}>
                      {method.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">{method.desc}</p>
              </div>

              {/* Radio dot */}
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected ? 'border-purple-600' : 'border-slate-300'
              }`}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-purple-600" />}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-700">
          <BadgeCheck className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>{paymentMethods.find((m) => m.id === selected)?.label}</strong> selected. Click "Complete Enrollment" to finalize.
          </span>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
