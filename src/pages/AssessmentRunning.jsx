import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  AlertTriangle, Shield, Flag, ChevronRight, CheckCircle, 
  HelpCircle, Monitor, Camera, Brain, Send 
} from 'lucide-react';

const AssessmentRunning = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock quiz questions
  const questions = [
    {
      q: 'What is React?',
      options: ['A JavaScript library for building user interfaces', 'A programming language', 'A database management system', 'A styling framework'],
      correct: 0
    },
    {
      q: 'Which hook is used to manage states in React functional components?',
      options: ['useEffect', 'useContext', 'useState', 'useReducer'],
      correct: 2
    },
    {
      q: 'What is the correct command to create a new Vite project?',
      options: ['npm create vite@latest', 'npx create-react-app', 'npm init react', 'vite create new'],
      correct: 0
    },
    {
      q: 'Which CSS grid property defines column sizes?',
      options: ['grid-template-rows', 'grid-template-columns', 'grid-gap', 'grid-auto-flow'],
      correct: 1
    },
    {
      q: 'What does SQL stand for?',
      options: ['Structured Query Language', 'Simple Query Language', 'Standard Queue List', 'System Query Logic'],
      correct: 0
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(50).fill(null));
  const [flagged, setFlagged] = useState(Array(50).fill(false));
  const [timeLeft, setTimeLeft] = useState(1800); // 30:00 minutes in seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Timer Tick
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIdx] = optIdx;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIdx < 49) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleToggleFlag = () => {
    const newFlagged = [...flagged];
    newFlagged[currentIdx] = !newFlagged[currentIdx];
    setFlagged(newFlagged);
  };

  const handleFinalSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowSubmitModal(false);
      // Navigate back to course page with PASS state simulated
      navigate('/course/fsd');
    }, 2000);
  };

  // Generate mock questions for indices >= 5
  const getQuestionDetail = (idx) => {
    if (idx < questions.length) return questions[idx];
    return {
      q: `Standard Technical Question #${idx + 1} relating to course concepts and core practices.`,
      options: ['Option Alpha', 'Option Beta', 'Option Gamma', 'Option Delta'],
      correct: 0
    };
  };

  const activeQuestion = getQuestionDetail(currentIdx);

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* Assessment Running Header */}
      <header className="h-16 border-b border-slate-100 bg-white/40 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-purple-650" />
          <div>
            <h1 className="text-sm font-bold text-slate-900 uppercase leading-none">React Assessment</h1>
            <span className="text-[9px] text-slate-500 font-mono mt-1 block">PROCTORED MODE ACTIVE</span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Time Left:</span>
            <span className={`text-sm font-extrabold font-mono ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-purple-650'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <button 
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl font-bold bg-rose-600 hover:bg-rose-500 text-white text-xs transition-all shadow-lg shadow-rose-600/10"
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Column: Proctor Feed & Questions navigator grid */}
        <aside className="w-full lg:w-72 border-r border-slate-100 p-6 flex flex-col gap-6 overflow-y-auto flex-shrink-0">
          
          {/* Proctoring camera simulation widget */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-purple-650" />
              <span>Camera Monitor feed</span>
            </h3>
            <div className="relative aspect-video rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-950 to-slate-950 opacity-40"></div>
              
              {/* Scanline overlay mockup */}
              <div className="absolute inset-x-4 inset-y-2 border border-purple-200 rounded-lg flex items-center justify-center">
                <span className="text-[8px] font-mono text-purple-650/50 uppercase tracking-widest animate-pulse">Eye-Tracking OK</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-600/20 border border-sky-400/30 flex items-center justify-center text-xs font-bold text-sky-300 z-10">
                K
              </div>
            </div>
          </div>

          {/* Question Grid Navigator */}
          <div className="space-y-3 flex-1">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Question Navigator</h3>
              <span className="text-[9px] text-slate-650 font-mono">Progress: {selectedAnswers.filter(x => x !== null).length}/50</span>
            </div>

            <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-64 lg:max-h-none pr-1">
              {[...Array(50)].map((_, idx) => {
                const isSelected = selectedAnswers[idx] !== null;
                const isFlagged = flagged[idx];
                const isActive = currentIdx === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-lg text-xs font-bold font-mono border transition-all ${
                      isActive 
                        ? 'bg-purple-600 text-slate-950 border-sky-400' 
                        : isFlagged 
                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' 
                        : isSelected 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                        : 'bg-white border-slate-200 text-slate-650 hover:border-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigator color legend footer */}
          <div className="text-[9px] text-slate-500 space-y-1 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-purple-600"></span>
              <span>Active Question</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-emerald-500/10 border border-emerald-500/30"></span>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-yellow-500/10 border border-yellow-500/30"></span>
              <span>Flagged for Review</span>
            </div>
          </div>

        </aside>

        {/* Right Column: Active Question Workspace */}
        <main className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto justify-between">
          
          <div className="space-y-8 max-w-3xl">
            {/* Question Label */}
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-650 text-xs font-semibold">
                Question {currentIdx + 1} of 50
              </span>
              <h2 className="text-lg font-bold text-slate-900 leading-normal pt-2">
                {activeQuestion.q}
              </h2>
            </div>

            {/* Answer Options Checklist Grid */}
            <div className="space-y-3 pt-2">
              {activeQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentIdx] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs font-medium transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-purple-50 border-sky-500 text-purple-650 shadow-md'
                        : 'bg-white/40 border-slate-100 hover:border-slate-200 text-slate-700 hover:text-white'
                    }`}
                  >
                    <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-sky-400 text-purple-650' : 'border-slate-700'
                    }`}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-sky-400"></div>}
                    </div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-100 mt-8">
            <button 
              onClick={handleToggleFlag}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all w-full sm:w-auto justify-center ${
                flagged[currentIdx] 
                  ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-500' 
                  : 'bg-white border-slate-200 text-slate-650 hover:text-white hover:bg-slate-100'
              }`}
            >
              <Flag className="w-4 h-4" />
              <span>Flag for Review</span>
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={handleSkip}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-white text-xs font-semibold flex-1 sm:flex-initial transition-colors"
              >
                Skip Question
              </button>
              
              <button 
                onClick={handleNext}
                disabled={currentIdx === 49}
                className={`px-5 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-sky-400 text-slate-950 text-xs transition-colors flex items-center gap-1.5 justify-center flex-1 sm:flex-initial ${
                  currentIdx === 49 ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </main>

      </div>

      {/* Submit Test Confirmation Overlay Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-6 text-center shadow-2xl relative overflow-hidden animate-zoom-in">
            
            <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-rose-500/5 blur-[50px]"></div>

            <div className="mx-auto h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Submit Assessment?</h3>
              <p className="text-xs text-slate-650">
                Are you sure you want to finish and submit the assessment? You have answered {selectedAnswers.filter(x => x !== null).length} out of 50 questions. This action is final.
              </p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowSubmitModal(false)}
                disabled={submitting}
                className="btn-secondary py-2 flex-1 text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={handleFinalSubmit}
                disabled={submitting}
                className="btn-primary py-2 flex-1 text-xs bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-3.5 w-3.5 border-2 border-slate-950 border-t-white rounded-full animate-spin"></span>
                    Grading...
                  </span>
                ) : (
                  <span>Submit Test</span>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AssessmentRunning;
