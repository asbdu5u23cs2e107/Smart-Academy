import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen, Video, TrendingUp, Clock, CheckCircle2,
  PlayCircle, ArrowRight, Sparkles, GraduationCap,
  Layers, Check, Compass, Star
} from 'lucide-react';
import {
  getStudentData,
  selectStudentCourse,
  getAvailableCourses,
  subscribeStudentData
} from '../../services/studentDataService';

const StudentDashboardHome = () => {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(() => getStudentData(user));
  const availableCourses = getAvailableCourses();

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

  const handleSelectCourse = (course) => {
    const updated = selectStudentCourse(user, course);
    if (updated) {
      setStudentData(updated);
    }
  };

  const isNewStudent = !studentData?.selectedCourseId || !studentData?.selectedCourse;
  const currentCourse = studentData?.selectedCourse;

  const stats = [
    {
      label: 'Course Progress',
      value: `${studentData?.progress || 0}%`,
      icon: TrendingUp,
      color: 'text-purple-650'
    },
    {
      label: 'Videos Watched',
      value: `${studentData?.watchedVideos?.length || 0}`,
      icon: PlayCircle,
      color: 'text-sky-500'
    },
    {
      label: 'Lessons Completed',
      value: `${studentData?.completedLessons?.length || 0}/${currentCourse?.lessonsCount || 6}`,
      icon: CheckCircle2,
      color: 'text-emerald-500'
    },
    {
      label: 'Selected Track',
      value: currentCourse?.title ? 'Active' : 'None',
      icon: Star,
      color: 'text-amber-500'
    },
  ];

  return (
    <div className="space-y-8">

      {/* ======================================================== */}
      {/* 1. WELCOME BANNER (Dynamic: New Student vs Returning)    */}
      {/* ======================================================== */}
      {isNewStudent ? (
        // NEW STUDENT WELCOME BANNER
        <div className="relative rounded-2xl overflow-hidden border border-purple-200 bg-gradient-to-br from-purple-100/70 via-white to-indigo-50 p-6 sm:p-8 shadow-sm">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-200/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-indigo-100/50 blur-2xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-purple-100 text-purple-700 border border-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-purple-650" />
                Welcome New Student
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase">
                Welcome to Smart Academy, {user?.name || 'Student'}! 🎉
              </h1>
              <p className="text-xs text-slate-600 leading-relaxed">
                You have no previous learning history yet. To get started, please select your course below.
                Once you select a course, your curriculum lessons, video player, and learning room will be activated.
              </p>
            </div>
            <a
              href="#course-selection"
              className="btn-primary inline-flex items-center gap-2 text-xs flex-shrink-0 self-start md:self-center"
            >
              <Compass className="w-4 h-4" />
              Select Your Course
            </a>
          </div>
        </div>
      ) : (
        // RETURNING STUDENT WELCOME BANNER
        <div className="relative rounded-2xl overflow-hidden border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 sm:p-8">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-indigo-100/40 blur-2xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs text-purple-650 font-bold uppercase tracking-widest">Student Dashboard</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 uppercase">
                Welcome back, {user?.name || 'Student'} 👋
              </h1>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Monitor your syllabus checklist, watch lessons, and continue learning <strong className="text-slate-800">{currentCourse?.title}</strong>.
              </p>
            </div>
            <Link
              to={`/course/${studentData.selectedCourseId}/learn`}
              className="btn-primary inline-flex items-center gap-2 text-sm flex-shrink-0"
            >
              <PlayCircle className="w-4 h-4" />
              Continue Learning
            </Link>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. COURSE SELECTION (Primary for New, Switcher for Return) */}
      {/* ======================================================== */}
      {isNewStudent ? (
        // NEW STUDENT: COURSE SELECTION SECTION
        <div id="course-selection" className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[10px] text-purple-650 font-bold uppercase tracking-widest">Step 1 of 1</span>
            <h2 className="text-lg font-extrabold text-slate-900 uppercase">
              Choose Your Course to Begin
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select one of the available programs below. Your videos, quizzes, and learning materials will match your selected course.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {availableCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
              >
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-white/90 text-purple-700 shadow-sm border border-purple-100">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                    {course.duration}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 uppercase group-hover:text-purple-650 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                      <span>Instructor: <strong>{course.trainer}</strong></span>
                      <span className="text-purple-650 font-bold">{course.lessonsCount} Video Lessons</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectCourse(course)}
                    className="btn-primary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Select Course & Start</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // RETURNING STUDENT: STATS + CURRENT COURSE
        <>
          {/* Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="p-4 rounded-2xl bg-white/60 border border-slate-100 flex flex-col gap-2 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
              </div>
            ))}
          </div>

          {/* Current Selected Course Snapshot */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">My Enrolled Course</h2>
              <Link to="/student-dashboard/courses" className="text-xs text-purple-650 font-semibold hover:underline flex items-center gap-1">
                View All Courses <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-5 rounded-2xl bg-white/60 border border-slate-100 flex flex-col md:flex-row gap-5 items-center">
              <div className="h-24 w-full md:w-36 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img
                  src={currentCourse?.image || 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80'}
                  alt={currentCourse?.title || 'Selected Course'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow space-y-3 w-full text-xs">
                <div>
                  <h3 className="text-base font-bold text-slate-900 uppercase">
                    {currentCourse?.title}
                  </h3>
                  <p className="text-slate-500 mt-0.5">
                    Instructor: {currentCourse?.trainer} &bull; Completed {studentData.completedLessons?.length || 0}/{currentCourse?.lessonsCount || 6} lessons
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-650">Course Progress</span>
                    <span className="text-purple-650">{studentData.progress || 0}%</span>
                  </div>
                  <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${studentData.progress || 0}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <Link
                  to={`/course/${studentData.selectedCourseId}/learn`}
                  className="btn-primary w-full text-center text-xs flex justify-center items-center gap-1.5"
                >
                  Continue Learning <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Switch / Select Another Course */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-650" /> Available Courses
              </h2>
              <span className="text-xs text-slate-400">Switch or explore another subject</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availableCourses.map((c) => {
                const isCurrent = c.id === studentData.selectedCourseId;
                return (
                  <div
                    key={c.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                      isCurrent
                        ? 'bg-purple-50/70 border-purple-200'
                        : 'bg-white/60 border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate uppercase text-[11px]">{c.title}</p>
                      <p className="text-[10px] text-slate-500">{c.lessonsCount} Lessons &bull; {c.duration}</p>
                    </div>
                    {isCurrent ? (
                      <span className="px-2 py-1 rounded-md bg-purple-600 text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSelectCourse(c)}
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-650 text-[10px] font-semibold border border-slate-200 transition-colors"
                      >
                        Select
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" /> Recent Activity
              </h2>
            </div>
            <div className="space-y-2">
              {studentData.recentActivity && studentData.recentActivity.length > 0 ? (
                studentData.recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/60 border border-slate-100 text-xs">
                    <div className="p-2 rounded-xl flex-shrink-0 text-purple-650 bg-purple-50">
                      <PlayCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="flex-grow text-slate-700 font-medium">{act.action}</span>
                    <span className="text-slate-400 font-mono flex-shrink-0 text-[10px]">{act.time}</span>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-white/40 border border-slate-100 text-xs text-slate-500 text-center">
                  No learning activity yet. Click "Continue Learning" to watch your first video lesson!
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default StudentDashboardHome;
