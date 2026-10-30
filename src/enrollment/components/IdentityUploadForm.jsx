import React, { useRef, useState } from 'react';
import { Upload, X, FileImage, FileCheck2 } from 'lucide-react';

const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5';

const UploadBox = ({ label, description, accept, fieldKey, value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange(fieldKey, file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange(fieldKey, null);
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => !value && fileRef.current.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
          value
            ? 'border-emerald-300 bg-emerald-50 cursor-default'
            : isDragging
            ? 'border-purple-500 bg-purple-50 cursor-copy'
            : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50/60 cursor-pointer'
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onChange(fieldKey, e.target.files[0])}
        />

        {value ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <FileCheck2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-emerald-700 truncate max-w-[180px] mx-auto">{value.name}</p>
              <p className="text-[10px] text-slate-400">{(value.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1 text-[10px] text-rose-500 hover:text-rose-600 font-semibold"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
              isDragging ? 'bg-purple-100' : 'bg-slate-100'
            }`}>
              <Upload className={`w-6 h-6 ${isDragging ? 'text-purple-500' : 'text-slate-400'}`} />
            </div>
            <p className="text-xs font-medium text-slate-600">
              <span className="text-purple-650 font-semibold">Click to upload</span> or drag & drop
            </p>
            <p className="text-[10px] text-slate-400">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const IdentityUploadForm = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-purple-650 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          6
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Identity Verification</h2>
          <p className="text-xs text-slate-500 mt-0.5">Upload your identity documents for verification</p>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-700 flex items-start gap-2">
        <FileImage className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>Documents are securely stored and used only for enrollment verification. Max file size: <strong>5 MB</strong> each.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <UploadBox
          label="Passport Size Photo"
          description="JPG, PNG up to 2MB"
          accept="image/*"
          fieldKey="passportPhoto"
          value={data.passportPhoto}
          onChange={onChange}
        />
        <UploadBox
          label="College / Work ID"
          description="JPG, PNG, PDF up to 5MB"
          accept="image/*,.pdf"
          fieldKey="collegeId"
          value={data.collegeId}
          onChange={onChange}
        />
        <UploadBox
          label="Aadhaar Card"
          description="JPG, PNG, PDF up to 5MB"
          accept="image/*,.pdf"
          fieldKey="aadhaar"
          value={data.aadhaar}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default IdentityUploadForm;
