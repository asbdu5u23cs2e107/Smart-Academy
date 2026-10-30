import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, PlayCircle, Clock, Search, Filter, ChevronRight, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getStudentData,
  recordVideoWatch,
  subscribeStudentData
} from '../../services/studentDataService';

const catalogVideos = [
  // FSD / Web
  { id: 1, courseId: 'fsd', title: 'Introduction to HTML5 & Semantic Structure', duration: '32 mins', trainer: 'John David', topic: 'HTML', path: '/course/fsd/learn?lesson=1', thumb: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&auto=format&fit=crop&q=60' },
  { id: 2, courseId: 'fsd', title: 'HTML Forms & Inputs Deep Dive',             duration: '45 mins', trainer: 'John David', topic: 'HTML', path: '/course/fsd/learn?lesson=2', thumb: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&auto=format&fit=crop&q=60' },
  { id: 3, courseId: 'fsd', title: 'CSS Grid Layouts Masterclass',              duration: '50 mins', trainer: 'John David', topic: 'CSS',  path: '/course/fsd/learn?lesson=3', thumb: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&auto=format&fit=crop&q=60' },
  { id: 4, courseId: 'fsd', title: 'Responsive Design with Flexbox',            duration: '38 mins', trainer: 'John David', topic: 'CSS',  path: '/course/fsd/learn?lesson=3', thumb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&auto=format&fit=crop&q=60' },
  { id: 5, courseId: 'fsd', title: 'JavaScript Promises & Async/Await',         duration: '60 mins', trainer: 'John David', topic: 'JS',   path: '/course/fsd/learn?lesson=4', thumb: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&auto=format&fit=crop&q=60' },
  { id: 6, courseId: 'fsd', title: 'React Fundamentals & JSX',                  duration: '55 mins', trainer: 'John David', topic: 'React',path: '/course/fsd/learn?lesson=5', thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60' },
  { id: 7, courseId: 'fsd', title: 'State Management with Redux',               duration: '48 mins', trainer: 'John David', topic: 'React',path: '/course/fsd/learn?lesson=5', thumb: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&auto=format&fit=crop&q=60' },
  { id: 8, courseId: 'fsd', title: 'Node.js REST API Design',                   duration: '65 mins', trainer: 'John David', topic: 'Node', path: '/course/fsd/learn?lesson=6', thumb: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=60' },

  // Python
  { id: 9, courseId: 'python', title: 'Python Introduction & Core Syntax',       duration: '20 mins', trainer: 'Sneha Reddy', topic: 'Python', path: '/course/python/learn?lesson=1', thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=60' },
  { id: 10, courseId: 'python', title: 'Python Variables and Data Types',       duration: '35 mins', trainer: 'Sneha Reddy', topic: 'Python', path: '/course/python/learn?lesson=2', thumb: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format&fit=crop&q=60' },
  { id: 11, courseId: 'python', title: 'Python Operators & Expressions',        duration: '42 mins', trainer: 'Sneha Reddy', topic: 'Python', path: '/course/python/learn?lesson=3', thumb: 'https://images.unsplash.com/photo-1581091870620-3c1e7f5b8f4d?w=400&auto=format&fit=crop&q=60' },
  { id: 12, courseId: 'python', title: 'Conditional Statements in Python',      duration: '55 mins', trainer: 'Sneha Reddy', topic: 'Python', path: '/course/python/learn?lesson=4', thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=60' },
  { id: 13, courseId: 'python', title: 'Python Loops & Control Structures',     duration: '48 mins', trainer: 'Sneha Reddy', topic: 'Python', path: '/course/python/learn?lesson=5', thumb: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format&fit=crop&q=60' },
  { id: 14, courseId: 'python', title: 'Python Functions & Scope',              duration: '60 mins', trainer: 'Sneha Reddy', topic: 'Python', path: '/course/python/learn?lesson=6', thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=60' },

  // React JS
  { id: 15, courseId: 'react-js', title: 'React Introduction & Project Setup',   duration: '25 mins', trainer: 'Rohan Sharma', topic: 'React', path: '/course/react-js/learn?lesson=1', thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60' },
  { id: 16, courseId: 'react-js', title: 'JSX & Functional Components',         duration: '35 mins', trainer: 'Rohan Sharma', topic: 'React', path: '/course/react-js/learn?lesson=2', thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60' },
  { id: 17, courseId: 'react-js', title: 'Props and Component State',           duration: '40 mins', trainer: 'Rohan Sharma', topic: 'React', path: '/course/react-js/learn?lesson=3', thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60' },
  { id: 18, courseId: 'react-js', title: 'React Hooks: useState and useEffect', duration: '50 mins', trainer: 'Rohan Sharma', topic: 'React', path: '/course/react-js/learn?lesson=4', thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60' },

  // Java
  { id: 19, courseId: 'java', title: 'Java Basics & JVM Setup',                 duration: '25 mins', trainer: 'Amit Patel', topic: 'Java', path: '/course/java/learn?lesson=1', thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=60' },
  { id: 20, courseId: 'java', title: 'Java Data Types & Control Flow',          duration: '35 mins', trainer: 'Amit Patel', topic: 'Java', path: '/course/java/learn?lesson=2', thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=60' },
  { id: 21, courseId: 'java', title: 'Object-Oriented Programming in Java',      duration: '50 mins', trainer: 'Amit Patel', topic: 'Java', path: '/course/java/learn?lesson=3', thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=60' },

  // SQL
  { id: 22, courseId: 'sql', title: 'SQL Queries & Table Fundamentals',         duration: '30 mins', trainer: 'Vikram Malhotra', topic: 'SQL', path: '/course/sql/learn?lesson=1', thumb: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&auto=format&fit=crop&q=60' },
  { id: 23, courseId: 'sql', title: 'SQL Filtering & Table Joins',              duration: '45 mins', trainer: 'Vikram Malhotra', topic: 'SQL', path: '/course/sql/learn?lesson=2', thumb: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&auto=format&fit=crop&q=60' },

  // Machine Learning / AI
  { id: 24, courseId: 'ai', title: 'Introduction to Machine Learning & Concepts', duration: '30 mins', trainer: 'Dr. Rajesh Sen', topic: 'Machine Learning', path: '/course/ai/learn?lesson=1', thumb: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=60' },
  { id: 25, courseId: 'ai', title: 'Supervised & Unsupervised Learning',         duration: '40 mins', trainer: 'Dr. Rajesh Sen', topic: 'Machine Learning', path: '/course/ai/learn?lesson=2', thumb: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=60' },
  { id: 26, courseId: 'ai', title: 'Neural Networks & Deep Learning',            duration: '50 mins', trainer: 'Dr. Rajesh Sen', topic: 'Machine Learning', path: '/course/ai/learn?lesson=3', thumb: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=60' },

  // Data Science
  { id: 27, courseId: 'data-science', title: 'Python for Data Science Full Course', duration: '35 mins', trainer: 'Vikram Malhotra', topic: 'Data Science', path: '/course/data-science/learn?lesson=1', thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60' },
  { id: 28, courseId: 'data-science', title: 'Pandas & NumPy Data Wrangling',     duration: '45 mins', trainer: 'Vikram Malhotra', topic: 'Data Science', path: '/course/data-science/learn?lesson=2', thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60' }
];

const topics = ['All', 'My Course', 'Python', 'HTML', 'CSS', 'JS', 'React', 'Java', 'SQL', 'Node', 'Machine Learning', 'Data Science'];

const Videos = () => {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(() => getStudentData(user));
  const [search, setSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState('My Course');

  useEffect(() => {
    setStudentData(getStudentData(user));
    const unsubscribe = subscribeStudentData((detail) => {
      if (detail?.data) {
        setStudentData(detail.data);
      } else {
        setStudentData(getStudentData(user));
      }
    });
    return () => unsubscribe();
  }, [user]);

  const hasSelectedCourse = !!studentData?.selectedCourseId;
  const currentCourseId = studentData?.selectedCourseId || 'fsd';

  // Normalize course ID check
  const isCourseMatch = (videoCourseId, selectedId) => {
    if (!selectedId) return false;
    const v = videoCourseId.toLowerCase();
    const s = selectedId.toLowerCase();
    if (v === s) return true;
    if (s.includes('python') && v === 'python') return true;
    if (s.includes('fsd') && v === 'fsd') return true;
    if (s.includes('react') && v === 'react-js') return true;
    if (s.includes('java') && v === 'java') return true;
    if ((s.includes('sql') || s.includes('database')) && v === 'sql') return true;
    if ((s.includes('ai') || s.includes('machine-learning') || s.includes('ml')) && v === 'ai') return true;
    if (s.includes('data-science') && (v === 'data-science' || v === 'sql')) return true;
    return false;
  };

  const isVideoWatched = (vid) => {
    const list = studentData?.watchedVideos || [];
    return list.includes(String(vid.id)) || list.includes(String(vid.path));
  };

  const handleVideoClick = (vid) => {
    recordVideoWatch(user, vid.id, vid.title);
  };

  // Filter videos
  const filtered = catalogVideos.filter((v) => {
    let matchTopic = true;
    if (activeTopic === 'My Course') {
      matchTopic = hasSelectedCourse ? isCourseMatch(v.courseId, currentCourseId) : true;
    } else if (activeTopic !== 'All') {
      matchTopic = v.topic === activeTopic;
    }
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchSearch;
  });

  const watchedCount = filtered.filter((v) => isVideoWatched(v)).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs text-purple-650 font-bold uppercase tracking-widest">Student Dashboard</span>
          <h1 className="text-xl font-extrabold text-slate-900 uppercase mt-0.5 flex items-center gap-2">
            <Video className="w-5 h-5 text-sky-500" /> Video Lessons
          </h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          {watchedCount} / {filtered.length} watched
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-purple-300 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1.5 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTopic(t)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all ${
                activeTopic === t ? 'bg-purple-600 text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* When student has not chosen any course yet */}
      {!hasSelectedCourse && (
        <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-900 uppercase">No Course Selected Yet</h3>
            <p className="text-xs text-slate-600">
              Select your primary course to unlock your curriculum video track and personalized progress.
            </p>
          </div>
          <Link
            to="/student-dashboard"
            className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
          >
            Select a Course <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((vid) => {
          const watched = isVideoWatched(vid);

          return (
            <div
              key={vid.id}
              className="rounded-2xl overflow-hidden border border-slate-100 bg-white/60 transition-all hover:shadow-md group"
            >
              {/* Thumbnail */}
              <div className="relative h-36 bg-slate-100 overflow-hidden">
                <img
                  src={vid.thumb}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                  <Link
                    to={vid.path}
                    onClick={() => handleVideoClick(vid)}
                    className="p-3 rounded-full bg-purple-600/90 backdrop-blur-sm hover:bg-purple-700 transition-colors"
                  >
                    <PlayCircle className="w-6 h-6 text-white" />
                  </Link>
                </div>
                {watched && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold uppercase tracking-wider shadow">
                    Watched
                  </div>
                )}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" /> {vid.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-3.5 flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{vid.title}</h4>
                  <p className="text-[10px] text-slate-400">{vid.trainer}</p>
                </div>
                <Link
                  to={vid.path}
                  onClick={() => handleVideoClick(vid)}
                  className="flex-shrink-0 p-1.5 rounded-lg bg-purple-50 text-purple-650 hover:bg-purple-600 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Video className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-medium">No videos found for your search.</p>
        </div>
      )}

    </div>
  );
};

export default Videos;
