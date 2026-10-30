import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import {
  Play, CheckCircle, FileText, Upload, Download,
  ArrowRight, Award, MessageSquare, BookOpen, Film, AlertCircle, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AIStudyAssistant from '../components/AIStudyAssistant';
import {
  getStudentData,
  recordVideoWatch,
  toggleLessonCompletion,
  selectStudentCourse,
  subscribeStudentData
} from '../services/studentDataService';
import { getCourseById } from '../services/courseRepository';
import { getCourseLessonsWithVideos, getYouTubeApiKey } from '../services/videoRetrievalService';

const CourseLearning = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const lessonParam = searchParams.get('lesson');

  const [studentData, setStudentData] = useState(() => getStudentData(user));

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

  // Baseline verified reference lessons (maintained for offline seed & instant start)
  const rawPythonLessons = [
    { id: 1, title: 'Python Introduction', duration: '20:15', videoUrl: 'https://www.youtube.com/embed/Js05B8Z1ivE' },
    { id: 2, title: 'Variables & Data Types', duration: '35:40', videoUrl: 'https://www.youtube.com/embed/Js05B8Z1ivE' },
    { id: 3, title: 'Operators & Expressions', duration: '42:10', videoUrl: 'https://www.youtube.com/embed/Js05B8Z1ivE' },
    { id: 4, title: 'Conditional Statements', duration: '55:00', videoUrl: 'https://www.youtube.com/embed/Js05B8Z1ivE' },
    { id: 5, title: 'Python Loops', duration: '48:30', videoUrl: 'https://www.youtube.com/embed/Js05B8Z1ivE' },
    { id: 6, title: 'Functions & Scope', duration: '60:15', videoUrl: 'https://www.youtube.com/embed/Js05B8Z1ivE' }
  ];

  const rawFsdLessons = [
    { id: 1, title: 'Introduction to Full Stack', duration: '20:15', videoUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg' },
    { id: 2, title: 'HTML Basics & Markup Structures', duration: '35:40', videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE' },
    { id: 3, title: 'CSS Layouts: Flexbox vs. Grid', duration: '42:10', videoUrl: 'https://www.youtube.com/embed/fYq5PXgSsbE' },
    { id: 4, title: 'JavaScript Logic & Event Handling', duration: '55:00', videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk' },
    { id: 5, title: 'React.js Components & State Management', duration: '48:30', videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8' },
    { id: 6, title: 'Node.js Express API Foundations', duration: '60:15', videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE' }
  ];

  const rawReactLessons = [
    { id: 1, title: 'React Introduction & Setup', duration: '25:00', videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8' },
    { id: 2, title: 'JSX & Functional Components', duration: '35:00', videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8' },
    { id: 3, title: 'Props and Component State', duration: '40:00', videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8' },
    { id: 4, title: 'React Hooks: useState & useEffect', duration: '50:00', videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8' },
    { id: 5, title: 'React Router DOM Navigation', duration: '45:00', videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8' }
  ];

  const rawJavaLessons = [
    { id: 1, title: 'Java Basics & Setup', duration: '25:00', videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34' },
    { id: 2, title: 'Data Types & Control Flow', duration: '35:00', videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34' },
    { id: 3, title: 'OOP: Classes & Inheritance', duration: '50:00', videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34' }
  ];

  const rawSqlLessons = [
    { id: 1, title: 'SQL Queries & Table Basics', duration: '30:00', videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY' },
    { id: 2, title: 'Filtering & Joins Masterclass', duration: '45:00', videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY' }
  ];

  // Retrieve course record from unified repository
  const currentCourse = getCourseById(id);
  const courseKey = String(currentCourse?.id || id || 'fsd').toLowerCase().trim();
  const courseTitle = currentCourse?.title || currentCourse?.courseName || currentCourse?.course || 'Course Learning';

  // Dynamic video lessons state
  const [resolvedLessons, setResolvedLessons] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const [needsApiKey, setNeedsApiKey] = useState(false);

  // Dynamic Video Retrieval when course ID changes or opens
  useEffect(() => {
    let isCancelled = false;
    setLoadingVideos(true);
    setVideoError(null);
    setNeedsApiKey(false);

    // Immediate cleanup of previous course videos to prevent stale playback
    setResolvedLessons([]);

    const fetchVideos = async () => {
      try {
        const result = await getCourseLessonsWithVideos(currentCourse);
        if (isCancelled) return;

        if (result.error) {
          setVideoError(result.error);
          setNeedsApiKey(!!result.needsApiKey);
        }

        if (Array.isArray(result.lessons) && result.lessons.length > 0) {
          setResolvedLessons(result.lessons);
        } else {
          // If no lessons, use course syllabus without video
          const fallbackList = (currentCourse.lessons || []).map((l, i) => ({
            id: l.id || i + 1,
            num: l.num || i + 1,
            title: l.title || `Lesson ${i + 1}`,
            topic: l.topic || 'Lesson Topic',
            duration: l.duration || '00:00',
            videoUrl: null
          }));
          setResolvedLessons(fallbackList);
          setVideoError('No relevant videos found for this course.');
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Error retrieving videos for course:', err);
          setVideoError('No relevant videos found for this course.');
        }
      } finally {
        if (!isCancelled) {
          setLoadingVideos(false);
        }
      }
    };

    fetchVideos();

    return () => {
      isCancelled = true;
    };
  }, [id, currentCourse?.id, currentCourse?.title]);

  // Lessons mapped with student completion status
  const lessons = resolvedLessons.map((l) => ({
    ...l,
    isCompleted: (studentData?.completedLessons || []).includes(l.id)
  }));

  // Determine initial lesson index based on lesson param or default to 0
  const getIndexFromParam = () => {
    if (!lessonParam) return 0;
    const foundIdx = lessons.findIndex((l) => String(l.id) === String(lessonParam));
    return foundIdx !== -1 ? foundIdx : 0;
  };

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  // Reset or adjust active index whenever course or param changes
  useEffect(() => {
    if (lessonParam && lessons.length > 0) {
      const idx = lessons.findIndex((l) => String(l.id) === String(lessonParam));
      if (idx !== -1) {
        setActiveLessonIdx(idx);
        return;
      }
    }
    // Default to first lesson on course switch
    if (activeLessonIdx >= lessons.length) {
      setActiveLessonIdx(0);
    }
  }, [id, lessonParam, lessons.length]);

  const activeLesson = lessons[activeLessonIdx] || lessons[0];

  // Record video watch for student when lesson is viewed
  useEffect(() => {
    if (activeLesson?.id && user && activeLesson?.videoUrl) {
      recordVideoWatch(user, activeLesson.id, activeLesson.title);
    }
  }, [activeLesson?.id, activeLesson?.videoUrl, user]);

  const handleLessonSelect = (idx) => {
    setActiveLessonIdx(idx);
    const selected = lessons[idx];
    if (selected) {
      setSearchParams({ lesson: selected.id });
      if (user && selected.videoUrl) {
        recordVideoWatch(user, selected.id, selected.title);
      }
    }
  };

  const handleToggleComplete = () => {
    if (!activeLesson || !user) return;
    const updated = toggleLessonCompletion(user, courseKey, activeLesson.id, activeLesson.title);
    if (updated) {
      setStudentData(updated);
    }
  };

  const isCurrentLessonCompleted = (studentData?.completedLessons || []).includes(activeLesson?.id);

  return (
    <div className="space-y-8">

      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
        <div>
          <span className="text-[10px] text-purple-650 font-bold uppercase tracking-wider">LMS Learning Room</span>
          <h1 className="text-xl font-bold text-slate-900 uppercase mt-1">{courseTitle}</h1>
          <p className="text-xs text-slate-500">Video Lectures & Resource Downloads workspace</p>
        </div>

        <Link to="/student-dashboard" className="text-slate-650 hover:text-white text-xs font-semibold">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Video player & resources */}
        <div className="lg:col-span-8 space-y-6">

          {/* Video Player */}
          <div className="relative aspect-video rounded-3xl bg-slate-900 border border-slate-100 overflow-hidden shadow-2xl flex items-center justify-center">

            {loadingVideos ? (
              <div className="flex flex-col items-center justify-center text-center p-8 space-y-3">
                <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                <p className="text-sm font-semibold text-slate-200">Retrieving relevant educational videos...</p>
                <p className="text-xs text-slate-400">Searching verified video sources for {courseTitle}</p>
              </div>
            ) : activeLesson?.videoUrl ? (
              <iframe
                key={`${courseKey}-${activeLesson.id}-${activeLesson.videoId || activeLesson.videoUrl}`}
                className="w-full h-full"
                src={activeLesson.videoUrl}
                title={activeLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 space-y-3 max-w-md">
                <Film className="w-10 h-10 text-slate-500" />
                <p className="text-sm font-semibold text-slate-200">
                  {videoError || 'No video available for this lesson.'}
                </p>
                <p className="text-xs text-slate-400">
                  {needsApiKey
                    ? 'To automatically retrieve live educational videos for newly created or custom topics, please configure your YouTube Data API key (VITE_YOUTUBE_API_KEY).'
                    : 'No verified educational video is currently mapped for this specific topic.'}
                </p>
              </div>
            )}

            {/* Overlay Title */}
            {activeLesson?.videoUrl && !loadingVideos && (
              <div className="absolute top-4 left-4 bg-slate-50/80 backdrop-blur border border-slate-100 rounded-xl px-3 py-1.5 text-[10px] font-bold text-purple-650 uppercase tracking-wide">
                Playing: Lesson {activeLesson.id}
              </div>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-white/40 border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase border-b border-slate-100 pb-2">Active Lesson Detail</h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Lesson {activeLesson?.id || 1} : {activeLesson?.title || 'Overview'}</h4>
                <p className="text-slate-500">Duration: {activeLesson?.duration || 'Flexible'} &bull; Status: {isCurrentLessonCompleted ? '✓ Completed' : '🔄 In Progress'}</p>
                {activeLesson?.topic && (
                  <p className="text-[11px] text-slate-600 font-medium">Topic: {activeLesson.topic}</p>
                )}
              </div>
              <button
                onClick={handleToggleComplete}
                disabled={!activeLesson}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-center ${
                  isCurrentLessonCompleted
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {isCurrentLessonCompleted ? 'Completed ✓' : 'Mark Lesson as Completed'}
              </button>
            </div>
          </div>

          {/* AI Study Assistant for Currently Selected Video */}
          <AIStudyAssistant
            courseId={courseKey}
            activeLesson={activeLesson}
          />

          {/* Resources panel links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Notes download */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex justify-between items-center text-xs">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-650" />
                <div>
                  <h4 className="font-bold text-slate-900">Download Notes</h4>
                  <p className="text-[10px] text-slate-500">PDF Cheat sheets</p>
                </div>
              </div>
              <button className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white text-purple-650 hover:text-white transition-all">
                <Download className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Assignment Submit */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex justify-between items-center text-xs">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-purple-650" />
                <div>
                  <h4 className="font-bold text-slate-900">Submit Assignment</h4>
                  <p className="text-[10px] text-slate-500">Project Exercise task</p>
                </div>
              </div>
              <Link to="/assignments" className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white text-purple-650 hover:text-white transition-all">
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>

          </div>

        </div>

        {/* Right Column: Lessons list playlist */}
        <aside className="lg:col-span-4 bg-white/20 border border-slate-100 rounded-3xl p-6 space-y-4">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650">Course Syllabus</h3>
            <span className="text-[10px] text-purple-650 font-bold">
              {studentData?.completedLessons?.length || 0}/{lessons.length} done
            </span>
          </div>

          <div className="space-y-2">
            {lessons.map((lesson, idx) => {
              const isActive = activeLessonIdx === idx;
              return (
                <button
                  key={lesson.id || idx}
                  onClick={() => handleLessonSelect(idx)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between gap-3 ${isActive
                    ? 'bg-purple-50 border-sky-500 text-purple-650 shadow-md font-bold'
                    : 'bg-slate-50/40 border-slate-100 hover:border-slate-200 text-slate-650 hover:text-slate-800'
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {lesson.isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Film className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-purple-650' : 'text-slate-650'}`} />
                    )}
                    <span className="line-clamp-1">{lesson.id}. {lesson.title}</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono flex-shrink-0">{lesson.duration}</span>
                </button>
              );
            })}
          </div>
        </aside>

      </div>

    </div>
  );
};

export default CourseLearning;
