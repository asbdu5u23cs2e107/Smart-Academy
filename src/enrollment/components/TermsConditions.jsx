import React from 'react';
import { ShieldCheck, Bell } from 'lucide-react';

const TermsConditions = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          10
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Terms &amp; Conditions</h2>
          <p className="text-xs text-slate-500 mt-0.5">Please read and accept before proceeding</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Terms Checkbox */}
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={data.agreeTerms}
              onChange={(e) => onChange('agreeTerms', e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
            />
          </div>
          <div className="flex items-start gap-2.5 flex-1">
            <ShieldCheck className="w-4 h-4 text-purple-650 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-700">
              I agree to the{' '}
              <a href="/terms" target="_blank" className="text-purple-650 underline underline-offset-2 hover:text-purple-700 font-semibold">
                Terms &amp; Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" className="text-purple-650 underline underline-offset-2 hover:text-purple-700 font-semibold">
                Privacy Policy
              </a>{' '}
              of SwordNex. <span className="text-rose-500">*</span>
            </p>
          </div>
        </label>

        {/* Updates Checkbox */}
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={data.agreeUpdates}
              onChange={(e) => onChange('agreeUpdates', e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
            />
          </div>
          <div className="flex items-start gap-2.5 flex-1">
            <Bell className="w-4 h-4 text-purple-650 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-700">
              I agree to receive updates, notifications, and promotional offers from SwordNex via email, SMS, and WhatsApp.
            </p>
          </div>
        </label>

        {/* Info box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed">
          By completing your enrollment, you confirm that all information provided is accurate and authentic.
          SwordNex reserves the right to revoke admission in case of false information.
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
