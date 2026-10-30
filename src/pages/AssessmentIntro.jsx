import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Info, FileText, CheckCircle2, AlertCircle, Camera, Check } from 'lucide-react';

const AssessmentIntro = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState(false);

  const instructions = [
    'Keep only the assessment window open.',
    'Close all unnecessary applications running in the background.',
    'Do not switch tabs or open other browser windows.',
    'Disable notifications to avoid interruptions.',
    'Ensure a stable internet connection.',
    'Do not refresh or close the page during the assessment.',
    'Your activity may be monitored during the assessment.',
    'Click "Start Assessment" only when you are ready.'
  ];

  const assessmentDetails = [
    { label: 'Assessment Type', value: 'Multiple Choice Questions (MCQ)' },
    { label: 'Total Questions', value: '50' },
    { label: 'Total Marks', value: '100' },
    { label: 'Duration', value: '60 Minutes' },
    { label: 'Passing Marks', value: '60' },
    { label: 'Attempts Allowed', value: '1' },
    { label: 'Negative Marking', value: 'No' },
    { label: 'Status', value: 'Not Started' }
  ];

  const aiChecks = [
    'Face Detection',
    'Camera Verification',
    'Tab Switch Detection',
    'Multiple Person Detection',
    'Background Application Detection',
    'Screen Activity Monitoring'
  ];

  const systemCheck = [
    { name: 'Camera', status: 'Connected' },
    { name: 'Microphone', status: 'Connected' },
    { name: 'Internet', status: 'Stable' },
    { name: 'Browser', status: 'Supported' },
    { name: 'Fullscreen Mode', status: 'Ready' }
  ];

  const handleStart = () => {
    if (!agreed) return;
    navigate(`/assessment/${id || 'l3-ops'}/take`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Assessment Header panel banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[10px] text-purple-650 font-bold uppercase tracking-wider">Assessment Portal</span>
          <h1 className="text-2xl font-bold text-slate-900 uppercase">Java Full Stack Assessment</h1>
          <p className="text-xs text-slate-500">Course: Full Stack Development</p>
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-650">
          <div>Duration: <strong className="text-white font-mono">⏱ 60:00</strong></div>
          <div>Questions: <strong className="text-white">50</strong></div>
          <div>Marks: <strong className="text-white">100</strong></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Instructions and details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Instructions checklist */}
          <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText className="w-4 h-4 text-purple-650" />
              <span>📝 Assessment Instructions</span>
            </h2>
            <p className="text-xs text-slate-650">Read all instructions carefully before starting the assessment.</p>
            
            <ul className="space-y-2 text-xs text-slate-700 pl-4 list-disc marker:text-purple-650">
              {instructions.map((inst, i) => (
                <li key={i} className="leading-relaxed">{inst}</li>
              ))}
            </ul>
          </div>

          {/* Details list */}
          <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase flex items-center gap-2 border-b border-slate-100 pb-2">
              <Info className="w-4 h-4 text-purple-650" />
              <span>📋 Assessment Details</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {assessmentDetails.map((detail) => (
                <div key={detail.label} className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                  <span className="text-slate-500">{detail.label}</span>
                  <span className="font-bold text-slate-800">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Proctored checks & system verify */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Monitor verify indicator */}
          <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-purple-650" />
              <span>🎥 AI Monitoring</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {aiChecks.map((check) => (
                <li key={check} className="flex items-center gap-2 bg-slate-50/40 p-2 rounded-lg border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* System Check list */}
          <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Camera className="w-4 h-4 text-purple-650" />
              <span>📷 System Check</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {systemCheck.map((check) => (
                <li key={check.name} className="flex justify-between items-center p-2 rounded-lg bg-slate-50/40 border border-slate-100">
                  <span className="text-slate-500">{check.name}</span>
                  <span className="font-semibold text-emerald-400">✅ {check.status}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Start Checklist Consent box */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <label className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer max-w-xl">
          <input 
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4.5 w-4.5 rounded border-slate-200 bg-slate-50 text-purple-650 focus:ring-sky-500 mt-0.5"
          />
          <span className="leading-relaxed">I have read and agree to all assessment instructions. I understand that my webcam feed, tab focus, and screen activity will be monitored and logged.</span>
        </label>

        <div className="flex gap-4">
          <Link to="/courses" className="btn-secondary py-2 px-5 text-xs">
            Cancel
          </Link>
          <button 
            onClick={handleStart}
            disabled={!agreed}
            className={`btn-primary py-2 px-5 text-xs ${!agreed ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Start Assessment
          </button>
        </div>
      </div>

    </div>
  );
};

export default AssessmentIntro;
