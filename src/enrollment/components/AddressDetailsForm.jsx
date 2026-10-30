import React from 'react';
import { MapPin, Building2, Flag } from 'lucide-react';

const inputClass =
  'w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-4 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition-colors';

const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5';

const AddressDetailsForm = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          2
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Address Details</h2>
          <p className="text-xs text-slate-500 mt-0.5">Your current residential address</p>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-5">
        {/* Address Line 1 */}
        <div>
          <label className={labelClass}>Address Line 1 <span className="text-rose-500">*</span></label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Street address, P.O. box, company name"
              value={data.addressLine1}
              onChange={(e) => onChange('addressLine1', e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        {/* Address Line 2 */}
        <div>
          <label className={labelClass}>Address Line 2 <span className="text-slate-400 font-normal">(Optional)</span></label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Apartment, suite, unit, building, floor, etc."
              value={data.addressLine2}
              onChange={(e) => onChange('addressLine2', e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        {/* City + District */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>City <span className="text-rose-500">*</span></label>
            <input
              type="text"
              placeholder="City"
              value={data.city}
              onChange={(e) => onChange('city', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>District <span className="text-rose-500">*</span></label>
            <input
              type="text"
              placeholder="District"
              value={data.district}
              onChange={(e) => onChange('district', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* State + Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>State <span className="text-rose-500">*</span></label>
            <input
              type="text"
              placeholder="State"
              value={data.state}
              onChange={(e) => onChange('state', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Country <span className="text-rose-500">*</span></label>
            <div className="relative">
              <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Country"
                value={data.country}
                onChange={(e) => onChange('country', e.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>
        </div>

        {/* Pincode */}
        <div className="max-w-xs">
          <label className={labelClass}>Pincode <span className="text-rose-500">*</span></label>
          <input
            type="text"
            placeholder="ZIP or Pincode"
            maxLength={6}
            value={data.pincode}
            onChange={(e) => onChange('pincode', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressDetailsForm;
