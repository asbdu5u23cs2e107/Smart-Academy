import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, Edit3, Hand, 
  MessageSquare, BookOpen, AlertTriangle, PlayCircle, LogOut,
  Users, CheckCircle, Wifi, Brain, ShieldAlert, Send, Plus
} from 'lucide-react';

const LiveClassSession = () => {
  const navigate = useNavigate();

  // Media state toggles
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRaiseHand, setIsRaiseHand] = useState(false);

  // Active view inside center screen
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'screenshare' | 'whiteboard' | 'code' | 'slides'

  // Chat message logs
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Trainer', text: 'Welcome everyone to Full Stack Development session.' },
    { sender: 'Rahul', text: 'Good Morning Sir.' },
    { sender: 'Priya', text: 'Good Morning, looking forward to React hooks.' },
    { sender: 'Arjun', text: 'Can you explain React Hooks again?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Simulated AI alert logs
  const [aiAlerts, setAiAlerts] = useState([
    { id: 1, type: 'Tab Switch', time: '10:05 AM', text: 'Student switched tabs' },
    { id: 2, type: 'Mobile Use', time: '10:12 AM', text: 'Student using mobile' }
  ]);

  // AI Monitor statuses
  const [attentionScore, setAttentionScore] = useState(94);
  const [sleepingDetected, setSleepingDetected] = useState(false);
  const [mobileDetected, setMobileDetected] = useState(false);
  const [faceDetected, setFaceDetected] = useState(true);
  const [leftSeat, setLeftSeat] = useState(false);
  const [multipleTabs, setMultipleTabs] = useState(false);

  // Whiteboard drawing variables
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (activeTab === 'whiteboard') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#38bdf8'; // sky-400
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
      }
    }
  }, [activeTab]);

  const startDrawing = ({ nativeEvent }) => {
    if (activeTab !== 'whiteboard') return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || activeTab !== 'whiteboard') return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Simulating alert triggers
  const triggerAlert = (type) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let text = '';
    
    if (type === 'tab') {
      setMultipleTabs(true);
      setAttentionScore(prev => Math.max(40, prev - 15));
      text = 'Student switched tabs';
      setTimeout(() => setMultipleTabs(false), 5000);
    } else if (type === 'mobile') {
      setMobileDetected(true);
      setAttentionScore(prev => Math.max(40, prev - 25));
      text = 'Student using mobile';
      setTimeout(() => setMobileDetected(false), 5000);
    } else if (type === 'sleep') {
      setSleepingDetected(true);
      setAttentionScore(prev => Math.max(40, prev - 30));
      text = 'Student sleeping';
      setTimeout(() => setSleepingDetected(false), 5000);
    } else if (type === 'left') {
      setLeftSeat(true);
      setFaceDetected(false);
      setAttentionScore(prev => Math.max(20, prev - 40));
      text = 'Student left camera';
      setTimeout(() => {
        setLeftSeat(false);
        setFaceDetected(true);
      }, 5000);
    }

    setAiAlerts(prev => [
      { id: Date.now(), type, time, text },
      ...prev
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setChatMessages([...chatMessages, { sender: 'Krish (You)', text: inputMessage }]);
    setInputMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* Session Title Header */}
      <header className="h-14 border-b border-slate-100 bg-white/40 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/live-classes" className="text-slate-500 hover:text-slate-700 text-xs">← Exit</Link>
          <div className="h-4 w-px bg-white"></div>
          <div className="text-xs">
            <span className="font-bold text-slate-900 uppercase">Course: Full Stack Development</span>
            <span className="text-slate-500 mx-2">|</span>
            <span className="text-slate-650">Trainer: John David</span>
            <span className="text-slate-500 mx-2">|</span>
            <span className="text-slate-650">Batch: FSD-2026</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
            🔴 LIVE
          </span>
        </div>
      </header>

      {/* Main Grid structure */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left column: Trainer Stream & Controls */}
        <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto space-y-6">
          
          {/* Main Media Player Viewport */}
          <div className="relative aspect-video rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-2xl flex-shrink-0 flex items-center justify-center">
            
            {/* Live Video stream view */}
            {activeTab === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.05)_0%,transparent_100%)]"></div>
                
                {/* Simulated webcam stream of trainer */}
                <div className="flex flex-col items-center gap-3 z-10 text-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white text-3xl shadow-xl shadow-sky-500/10">
                    👨‍🏫
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Trainer John David</h3>
                  <p className="text-xs text-slate-500">Sharing High-Fidelity Video Feed</p>
                </div>
              </div>
            )}

            {/* Screen sharing viewport */}
            {activeTab === 'screenshare' && (
              <div className="absolute inset-0 bg-slate-50 p-6 flex flex-col justify-between font-mono text-xs text-emerald-400 border border-slate-100">
                <div className="flex justify-between text-[10px] text-slate-500 border-b border-slate-100 pb-2">
                  <span>SYSTEM: /usr/bin/node</span>
                  <span>screenshare_feed.mp4</span>
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-1.5">
                  <p className="text-slate-650">// Rendering React App</p>
                  <p><span className="text-purple-650">import</span> React, &#123; useState, useEffect &#125; <span className="text-purple-650">from</span> <span className="text-yellow-300">'react'</span>;</p>
                  <p><span className="text-purple-650">const</span> <span className="text-blue-400">App</span> = () =&gt; &#123;</p>
                  <p>&nbsp;&nbsp;<span className="text-purple-650">const</span> [count, setCount] = <span className="text-blue-400">useState</span>(<span className="text-orange-400">0</span>);</p>
                  <p>&nbsp;&nbsp;<span className="text-purple-650">return</span> (</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-purple-650">div</span>className=<span className="text-yellow-300">"p-6"</span>&gt;</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-purple-650">h1</span>&gt;Hello React hooks!&lt;/<span className="text-purple-650">h1</span>&gt;</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-purple-650">div</span>&gt;</p>
                  <p>&nbsp;&nbsp;);</p>
                  <p>&#125;;</p>
                </div>
                <div className="border-t border-slate-100 pt-2 text-[10px] text-slate-500 text-right">
                  🔴 Screen Sharing Active
                </div>
              </div>
            )}

            {/* Whiteboard view */}
            {activeTab === 'whiteboard' && (
              <div className="absolute inset-0 bg-slate-50 flex flex-col">
                <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-white/40">
                  <span className="text-[10px] text-slate-650 font-bold uppercase tracking-wide">✍ Trainer Interactive Whiteboard</span>
                  <button 
                    onClick={clearCanvas}
                    className="px-2 py-0.5 rounded bg-white  text-[10px] font-semibold text-slate-650  border border-slate-200"
                  >
                    Clear Board
                  </button>
                </div>
                <div className="flex-1 relative cursor-crosshair">
                  <canvas 
                    ref={canvasRef}
                    width={800}
                    height={400}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Slides Viewport */}
            {activeTab === 'slides' && (
              <div className="absolute inset-0 bg-slate-50 flex flex-col justify-center items-center p-8 text-center space-y-4">
                <div className="max-w-md space-y-3">
                  <span className="text-xs text-purple-650 font-mono tracking-widest uppercase">Slide 12 of 30</span>
                  <h2 className="text-xl font-bold text-slate-900">Understanding CSS Grid vs. Flexbox</h2>
                  <p className="text-xs text-slate-650 leading-relaxed">
                    Use Flexbox for one-dimensional layouts (a single row or column), and CSS Grid for complex two-dimensional alignments (both rows and columns concurrently).
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                  <div className="h-2 w-2 rounded-full bg-slate-100"></div>
                  <div className="h-2 w-2 rounded-full bg-slate-100"></div>
                </div>
              </div>
            )}

            {/* Controls Tabs row inside player */}
            <div className="absolute bottom-4 left-4 bg-slate-50/80 backdrop-blur-md border border-slate-200 rounded-xl p-1 flex gap-1 z-20">
              {[
                { id: 'video', label: 'Live Video' },
                { id: 'screenshare', label: 'Screen Share' },
                { id: 'whiteboard', label: 'Whiteboard' },
                { id: 'slides', label: 'Slides' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-purple-600 text-slate-950' 
                      : 'text-slate-650  '
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>

          {/* Interactive controls panel */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-2xl border transition-all ${
                  isMicOn 
                    ? 'bg-slate-50 border-slate-200 text-slate-700 ' 
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button 
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-3 rounded-2xl border transition-all ${
                  isCameraOn 
                    ? 'bg-slate-50 border-slate-200 text-slate-700 ' 
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}
              >
                {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button 
                onClick={() => {
                  setIsScreenSharing(!isScreenSharing);
                  if(!isScreenSharing) setActiveTab('screenshare');
                  else setActiveTab('video');
                }}
                className={`p-3 rounded-2xl border transition-all ${
                  isScreenSharing 
                    ? 'bg-purple-50 border-sky-500 text-purple-650' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 '
                }`}
              >
                <Monitor className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setIsRaiseHand(!isRaiseHand)}
                className={`p-3 rounded-2xl border transition-all ${
                  isRaiseHand 
                    ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 '
                }`}
              >
                <Hand className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/live-classes')}
                className="px-4 py-2.5 rounded-xl font-bold bg-rose-600 hover:bg-rose-500 text-white text-xs transition-colors flex items-center gap-2 shadow-lg shadow-rose-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Leave Class</span>
              </button>
            </div>

          </div>

          {/* Classroom layout lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-shrink-0">
            
            {/* Today's topics checklist */}
            <div className="p-6 rounded-3xl bg-white/40 border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">📚 Today's Topics</h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {[
                  { name: 'HTML Forms', state: 'passed' },
                  { name: 'CSS Grid', state: 'passed' },
                  { name: 'JavaScript', state: 'active' },
                  { name: 'React Components', state: 'pending' },
                  { name: 'API Integration', state: 'pending' },
                  { name: 'Mini Project', state: 'pending' }
                ].map((top) => (
                  <li key={top.name} className="flex items-center justify-between">
                    <span className={top.state === 'passed' ? 'text-slate-500 line-through' : top.state === 'active' ? 'text-purple-650 font-bold' : ''}>
                      {top.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                      top.state === 'passed' 
                        ? 'bg-white text-slate-500' 
                        : top.state === 'active' 
                        ? 'bg-purple-50 text-purple-650 animate-pulse' 
                        : 'bg-slate-50 text-slate-600'
                    }`}>
                      {top.state}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Student learning stats progress */}
            <div className="p-6 rounded-3xl bg-white/40 border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">📊 Student Progress</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Attendance</p>
                  <p className="text-base font-bold text-slate-900 mt-1">100%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Assignment</p>
                  <p className="text-base font-bold text-emerald-400 mt-1">Submitted</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Quiz Score</p>
                  <p className="text-base font-bold text-slate-900 mt-1">18 / 20</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Course Progress</p>
                  <p className="text-base font-bold text-purple-650 mt-1">75%</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right column: Student Webcam, AI Proctoring & Chats */}
        <div className="w-full lg:w-80 border-l border-slate-100 bg-slate-50/40 flex flex-col flex-shrink-0 overflow-y-auto lg:overflow-hidden h-full">
          
          {/* Webcam Simulator Block */}
          <div className="p-5 border-b border-slate-100 flex-shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 mb-3 flex items-center justify-between">
              <span>👤 Student Webcam</span>
              <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <Wifi className="w-2.5 h-2.5 animate-pulse" /> Stable
              </span>
            </h3>

            {/* Webcam viewport */}
            <div className="relative aspect-video rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center">
              {isCameraOn ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Mock student canvas avatar representation */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky-950 to-indigo-950 opacity-40"></div>
                  
                  {leftSeat ? (
                    <span className="text-[10px] text-rose-400 font-semibold uppercase animate-pulse">Seat Vacant</span>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 z-10">
                      <div className="h-10 w-10 rounded-full bg-purple-600/20 border border-sky-400 flex items-center justify-center text-sm font-bold text-sky-300">
                        K
                      </div>
                      <span className="text-[10px] text-slate-650 font-mono">You (Krish)</span>
                    </div>
                  )}

                  {/* Face tracking mesh mockup visual */}
                  {faceDetected && !leftSeat && (
                    <div className="absolute inset-x-8 inset-y-4 border border-sky-500/30 rounded-xl flex items-center justify-center">
                      <div className="absolute top-2 left-2 border-t-2 border-l-2 border-sky-400 h-2.5 w-2.5"></div>
                      <div className="absolute top-2 right-2 border-t-2 border-r-2 border-sky-400 h-2.5 w-2.5"></div>
                      <div className="absolute bottom-2 left-2 border-b-2 border-l-2 border-sky-400 h-2.5 w-2.5"></div>
                      <div className="absolute bottom-2 right-2 border-b-2 border-r-2 border-sky-400 h-2.5 w-2.5"></div>
                      <span className="text-[8px] font-mono text-purple-650/60 uppercase">Face Verified</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-[10px] text-slate-600 font-semibold uppercase">Camera Feed Disabled</div>
              )}
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2">
              <span>🎤 Mic: {isMicOn ? '🟢 Enabled' : '🔴 Muted'}</span>
              <span>✅ Attendance: Present</span>
            </div>
          </div>

          {/* AI Proctoring Controls & Score */}
          <div className="p-5 border-b border-slate-100 flex-shrink-0 bg-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 mb-3 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-purple-650" />
              <span>🤖 AI Monitor</span>
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-650">😊 Attention Score:</span>
                <span className={`text-xs font-extrabold ${attentionScore > 75 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>{attentionScore}%</span>
              </div>

              {/* Toggles verification status */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold">
                <div className={`p-1.5 rounded-lg border text-center ${faceDetected && !leftSeat ? 'bg-emerald-500/5 text-emerald-400 border-emerald-200' : 'bg-rose-500/5 text-rose-400 border-rose-500/20 animate-pulse'}`}>
                  👁 Face Verified
                </div>
                <div className={`p-1.5 rounded-lg border text-center ${!mobileDetected ? 'bg-emerald-500/5 text-emerald-400 border-emerald-200' : 'bg-rose-500/5 text-rose-400 border-rose-500/20 animate-pulse'}`}>
                  📱 Mobile: {mobileDetected ? 'DET' : 'OK'}
                </div>
                <div className={`p-1.5 rounded-lg border text-center ${!sleepingDetected ? 'bg-emerald-500/5 text-emerald-400 border-emerald-200' : 'bg-rose-500/5 text-rose-400 border-rose-500/20 animate-pulse'}`}>
                  😴 Sleep: {sleepingDetected ? 'DET' : 'OK'}
                </div>
                <div className={`p-1.5 rounded-lg border text-center ${!multipleTabs ? 'bg-emerald-500/5 text-emerald-400 border-emerald-200' : 'bg-rose-500/5 text-rose-400 border-rose-500/20 animate-pulse'}`}>
                  🖥 Tabs: {multipleTabs ? 'ALT' : 'OK'}
                </div>
              </div>

              {/* Simulation testing triggers toolbar */}
              <div className="border-t border-slate-100 pt-2 space-y-1.5">
                <p className="text-[9px] uppercase font-bold text-slate-500 text-center">Trigger AI Warnings (Test controls):</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <button onClick={() => triggerAlert('tab')} className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[9px] font-bold text-slate-700">
                    Switch Tabs 🖥
                  </button>
                  <button onClick={() => triggerAlert('mobile')} className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[9px] font-bold text-slate-700">
                    Use Mobile 📱
                  </button>
                  <button onClick={() => triggerAlert('sleep')} className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[9px] font-bold text-slate-700">
                    Sleep 😴
                  </button>
                  <button onClick={() => triggerAlert('left')} className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[9px] font-bold text-slate-700">
                    Leave Seat 🚶
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI warnings Alerts Drawer logs list */}
          <div className="p-4 border-b border-slate-100 flex-shrink-0 max-h-36 overflow-y-auto">
            <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>🚨 AI Warnings feed</span>
            </h4>
            {aiAlerts.length === 0 ? (
              <p className="text-[10px] text-slate-600 italic">No warnings triggered.</p>
            ) : (
              <div className="space-y-1">
                {aiAlerts.map(alert => (
                  <div key={alert.id} className="text-[9px] text-rose-400 flex items-center justify-between bg-rose-500/5 px-2 py-1 rounded border border-rose-500/10">
                    <span>⚠ {alert.text}</span>
                    <span className="text-[8px] text-slate-500 font-mono">{alert.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Chat box Sidebar */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-[200px]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 p-4 border-b border-slate-100 bg-white/10 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-650" />
              <span>💬 Live Chat</span>
            </h3>

            {/* Chat message box scrolling logs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className="text-xs space-y-0.5">
                  <span className={`font-bold ${msg.sender === 'Trainer' ? 'text-rose-400' : msg.sender.includes('You') ? 'text-purple-650' : 'text-slate-700'}`}>
                    {msg.sender}:
                  </span>
                  <p className="text-slate-650 bg-white/50 p-2 rounded-xl border border-slate-100/80 leading-normal">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input Message Form box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-slate-50 flex gap-2 flex-shrink-0">
              <input 
                type="text" 
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs text-slate-800 focus:outline-none"
              />
              <button 
                type="submit"
                className="p-2 rounded-xl bg-purple-600 hover:bg-sky-400 text-slate-950 transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LiveClassSession;
