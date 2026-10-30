import React, { useState } from 'react';
import { ClipboardList, Upload, CheckCircle2, ShieldAlert, ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Assignment = () => {
  const navigate = useNavigate();
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Pending'); // 'Pending' | 'Completed'

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileSelected(true);
      setFileName(e.target.files[0].name);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!fileSelected) return;

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setStatus('Completed');
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
        <div>
          <span className="text-[10px] text-purple-650 font-bold uppercase tracking-wider">Assignments Panel</span>
          <h1 className="text-xl font-bold text-slate-900 uppercase mt-1">ASSIGNMENTS</h1>
          <p className="text-xs text-slate-500">Submit class project assignments and track grades</p>
        </div>
        <button onClick={() => navigate('/student-dashboard')} className="text-slate-650 hover:text-white text-xs font-semibold">
          ← Back to Dashboard
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
        
        {/* Assignment description */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-purple-650 flex-shrink-0">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div className="space-y-2 text-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase">React Project</h3>
            <p className="text-slate-650 leading-relaxed">
              Task: <strong className="text-slate-800">Create E-commerce Website</strong>
            </p>
            <p className="text-slate-500">
              Build a responsive layout using custom Tailwind components, implement product search filters, configure client routing with react-router-dom, and mock user shopping carts.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Submission Deadline: 31st July</span>
            </div>
          </div>
        </div>

        {/* Upload form container */}
        <form onSubmit={handleUploadSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-650 uppercase tracking-wide">Upload File:</label>
            
            <div className="relative border-2 border-dashed border-slate-200 hover:border-slate-700 bg-slate-50/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
              <input 
                type="file" 
                required
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-slate-650 group-hover:text-purple-650 transition-colors mb-3" />
              {fileSelected ? (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-900">{fileName}</p>
                  <p className="text-[10px] text-slate-500">Click or drag another file to replace</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-slate-650 font-semibold">[Choose File]</p>
                  <p className="text-[10px] text-slate-500">Supports ZIP, RAR, or PDF documents up to 50MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar for upload simulation */}
          {uploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>Uploading project codebase...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                <div className="h-full bg-purple-600" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {/* Status Display indicator */}
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs">
            <span className="text-slate-500">Status:</span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              status === 'Completed' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-200' 
                : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
            }`}>
              {status === 'Completed' ? 'Completed / Graded' : 'Pending'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            {status === 'Completed' ? (
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-200 text-emerald-400 text-xs flex items-center gap-2 w-full justify-center">
                <CheckCircle2 className="w-4 h-4" />
                <span>Project Uploaded Successfully! Status updated to Completed.</span>
              </div>
            ) : (
              <button 
                type="submit"
                disabled={!fileSelected || uploading}
                className={`btn-primary px-6 py-2.5 text-xs ${(!fileSelected || uploading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                [Submit]
              </button>
            )}
          </div>

        </form>

      </div>

    </div>
  );
};

export default Assignment;
