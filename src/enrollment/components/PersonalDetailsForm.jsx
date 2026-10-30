import React, { useRef, useState } from 'react';
import { User, Mail, Phone, Calendar, ChevronDown, Camera, Upload } from 'lucide-react';

const inputClass =
  'w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-4 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition-colors';

const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5';

const PersonalDetailsForm = ({ data, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange('profilePhoto', file);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          1
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Personal Details</h2>
          <p className="text-xs text-slate-500 mt-0.5">Tell us about yourself</p>
        </div>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label className={labelClass}>Full Name <span className="text-rose-500">*</span></label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email Address <span className="text-rose-500">*</span></label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        {/* Mobile */}
        <div>
          <label className={labelClass}>Mobile Number <span className="text-rose-500">*</span></label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">+91</div>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={data.mobile}
              onChange={(e) => onChange('mobile', e.target.value)}
              className={`${inputClass} pl-12`}
            />
          </div>
        </div>

        {/* Alternate Mobile */}
        <div>
          <label className={labelClass}>Alternate Mobile <span className="text-slate-400 font-normal">(Optional)</span></label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">+91</div>
            <input
              type="tel"
              placeholder="Enter alternate number"
              value={data.alternateMobile}
              onChange={(e) => onChange('alternateMobile', e.target.value)}
              className={`${inputClass} pl-12`}
            />
          </div>
        </div>

        {/* DOB */}
        <div>
          <label className={labelClass}>Date of Birth <span className="text-rose-500">*</span></label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={data.dob}
              onChange={(e) => onChange('dob', e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>Gender <span className="text-rose-500">*</span></label>
          <div className="relative">
            <select
              value={data.gender}
              onChange={(e) => onChange('gender', e.target.value)}
              className={`${inputClass} pr-10 appearance-none`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Profile Photo */}
      <div>
        <label className={labelClass}>Profile Photo</label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileRef.current.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50/50'
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChange('profilePhoto', e.target.files[0])}
          />
          {data.profilePhoto ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200 mx-auto">
                <img
                  src={URL.createObjectURL(data.profilePhoto)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-semibold text-purple-650">{data.profilePhoto.name}</p>
              <p className="text-[10px] text-slate-400">Click to change</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
                <Camera className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                <span className="text-purple-650 font-semibold">Upload a file</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
