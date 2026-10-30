 import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, Bell, Info, Shield, HelpCircle, Phone, 
  Search, Users, Star, ArrowRight, CheckCircle 
} from 'lucide-react';

const LiveClasses = () => {
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const todayClasses = [
    {
      id: 'fsd',
      title: 'Full Stack Development',
      topics: 'HTML • CSS • JavaScript • React',
      trainer: 'John David',
      time: '10:00 AM – 12:00 PM',
      status: 'LIVE', // 'LIVE' | 'SOON' | 'UPCOMING'
      statusText: 'Live Now',
      ctaText: 'Join Class',
    },
    {
      id: 'python',
      title: 'Python Programming',
      topics: 'Core Python • OOP • Projects',
      trainer: 'Priya',
      time: '2:00 PM – 4:00 PM',
      status: 'SOON',
      statusText: 'Starts Soon',
      ctaText: 'Set Reminder',
    },
    {
      id: 'java',
      title: 'Java Development',
      topics: 'Core Java • JDBC • Spring Boot',
      trainer: 'Karthik',
      time: '6:00 PM – 8:00 PM',
      status: 'UPCOMING',
      statusText: 'Upcoming',
      ctaText: 'View Details',
    }
  ];

  const browseCategories = [
    {
      name: 'Web Development',
      icon: '💻',
      courseId: 'fsd',
      topics: ['HTML & CSS Live', 'JavaScript Masterclass', 'React.js Live', 'Full Stack MERN']
    },
    {
      name: 'Python',
      icon: '🐍',
      courseId: 'python-fs',
      topics: ['Python Basics', 'Advanced Python', 'Django Framework', 'Python Projects']
    },
    {
      name: 'Java',
      icon: '☕',
      courseId: 'java-dev',
      topics: ['Core Java', 'Advanced Java', 'Spring Boot', 'Java Projects']
    },
    {
      name: 'AI & Machine Learning',
      icon: '🤖',
      courseId: null,
      topics: ['Machine Learning', 'Deep Learning', 'Generative AI', 'AI Projects']
    },
    {
      name: 'Data Science',
      icon: '📊',
      courseId: null,
      topics: ['Data Analytics', 'SQL', 'Power BI', 'Python for Data Science']
    }
  ];

  // const featuredBatches = [
  //   {
  //     title: 'Full Stack Bootcamp',
  //     rating: 5,
  //     students: '500+ Students',
  //     start: 'Starts Tomorrow',
  //     badge: 'Bestseller'
  //   },
  //   {
  //     title: 'AI Masterclass',
  //     rating: 5,
  //     students: '250+ Students',
  //     start: 'Weekend Batch',
  //     badge: 'New Batch'
  //   },
  //   {
  //     title: 'React Workshop',
  //     rating: 5,
  //     students: '300+ Students',
  //     start: 'Today 6:00 PM',
  //     badge: 'Workshop'
  //   }
  // ];
  const featuredBatches = [
  {
    title: 'React Workshop',
    rating: 5,
    students: '300+ Students',
    start: 'Today 6:00 PM',
    badge: 'Workshop',
    dateTime: '2026-07-27T18:00:00'
  },
  {
    title: 'Full Stack Bootcamp',
    rating: 5,
    students: '500+ Students',
    start: 'Tomorrow 10:00 AM',
    badge: 'Bestseller',
    dateTime: '2026-07-28T10:00:00'
  },
  {
    title: 'AI Masterclass',
    rating: 5,
    students: '250+ Students',
    start: 'Weekend Batch',
    badge: 'New Batch',
    dateTime: '2026-07-29T09:00:00'
  }
];

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) return;
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackName('');
      setCallbackPhone('');
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span className="h-2 w-2 bg-rose-500 rounded-full animate-ping"></span>
          <span>LIVE CLASSES</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Join interactive classes proctored by expert trainers.</p>
      </div>

      {/* Today's Classes List */}
      <section className="space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>🟢 Today's Live Classes</span>
          </h2>
        </div>

        <div className="space-y-4">
          {todayClasses.map((liveClass) => (
            <div 
              key={liveClass.id}
              className={`p-6 rounded-2xl bg-white/40 border transition-all ${
                liveClass.status === 'LIVE' 
                  ? 'border-purple-200 bg-purple-600/[0.02]' 
                  : 'border-slate-100'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                {/* Info block */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-purple-650">
                      🎥
                    </span>
                    <h3 className="text-base font-bold text-slate-900 hover:text-purple-650 transition-colors">
                      {liveClass.title}
                    </h3>
                    
                    {/* Status Badge */}
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      liveClass.status === 'LIVE' 
                        ? 'bg-rose-500 text-white animate-pulse' 
                        : liveClass.status === 'SOON' 
                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
                        : 'bg-white text-slate-650 border border-slate-200'
                    }`}>
                      {liveClass.statusText}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-650 pl-8">{liveClass.topics}</p>
                  
                  <div className="flex items-center gap-4 text-slate-500 text-xs pl-8">
                    <span>👨‍🏫 Trainer : {liveClass.trainer}</span>
                    <span>🕘 {liveClass.time}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="self-stretch sm:self-auto flex items-center justify-end">
                  {liveClass.status === 'LIVE' ? (
                    <Link 
                      to={`/live-class/${liveClass.id}`}
                      className="px-5 py-2.5 rounded-xl font-bold bg-rose-600 hover:bg-rose-500 text-white text-xs shadow-lg shadow-rose-500/25 transition-all text-center"
                    >
                      [ Join Class ]
                    </Link>
                  ) : liveClass.status === 'SOON' ? (
                    <button className="px-5 py-2.5 rounded-xl font-bold bg-white hover:bg-slate-100 text-black-500 border border-purple-200 hover:border-yellow-500/30 text-xs transition-all flex items-center gap-1.5 justify-center">
                      <Bell className="w-3.5 h-3.5 animate-bounce" />
                      <span>[ Set Reminder ]</span>
                    </button>
                  ) : (
                    <button className="px-5 py-2.5 rounded-xl font-bold bg-white hover:bg-slate-100 text-slate-650 border border-purple-200 text-xs transition-all justify-center">
                      [ View Details ]
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse Live Classes by Category */}
      <section className="space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">BROWSE LIVE CLASSES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {browseCategories.map((cat) => (
            <div 
              key={cat.name}
              className="p-5 rounded-2xl bg-white/10 border border-slate-100 flex flex-col justify-between gap-4 text-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cat.icon}</span>
                  <h3 className="font-bold text-slate-900">{cat.name}</h3>
                </div>
                <ul className="space-y-1.5 text-slate-500">
                  {cat.topics.map((t) => (
                    <li key={t} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-850"></span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                to={cat.courseId ? `/course/${cat.courseId}` : '/courses'}
                className="text-center py-2.5 rounded-xl bg-white hover:bg-slate-100 text-purple-650 font-bold border border-slate-200 hover:border-purple-200 transition-all"
              >
                [ Explore ]
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured batches */}
      <section className="space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">FEATURED LIVE CLASSES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBatches.map((batch) => (
            <div 
              key={batch.title}
              className="p-6 rounded-2xl bg-white/40 border border-slate-100 hover:border-slate-200 transition-colors flex flex-col gap-4 text-xs"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-sm"> {batch.title}</h3>
                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-650 text-[9px] font-bold uppercase tracking-wider">{batch.badge}</span>
              </div>
              
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(batch.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-100">
                <span>{batch.students}</span>
                <span className="text-purple-650 font-medium">{batch.start}</span>
              </div>

              <button className="btn-primary w-full text-center py-2 text-xs">
                [ Join Batch ]
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Callback request advisor form */}
      <section className="p-8 rounded-3xl bg-white border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 -z-10 h-40 w-40 rounded-full bg-purple-50/50 blur-[60px]"></div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-lg font-bold text-slate-900 flex items-center justify-center lg:justify-start gap-2">
              <Phone className="w-5 h-5 text-purple-650" />
              Need Help Choosing a Live Class?
            </h3>
            <p className="text-xs text-slate-650 max-w-md">
              Fill in your contact information and one of our academic counselors will call you back to details.
            </p>
          </div>

          <form onSubmit={handleCallbackSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            {callbackSubmitted ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-200 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Request Submitted! Advisor will call shortly.</span>
              </div>
            ) : (
              <>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  value={callbackName}
                  onChange={(e) => setCallbackName(e.target.value)}
                  className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-2 text-xs text-slate-800 placeholder-slate-600 focus:outline-none"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-2 text-xs text-slate-800 placeholder-slate-600 focus:outline-none"
                />
                <button 
                  type="submit"
                  className="btn-primary py-2 px-5 text-xs"
                >
                  [ Contact Advisor ]
                </button>
              </>
            )}
          </form>
        </div>
      </section>

    </div>
  );
};

export default LiveClasses;
