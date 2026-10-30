import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Clock, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getStudentData,
  selectStudentCourse,
  getAvailableCourses,
  subscribeStudentData
} from '../../services/studentDataService';

const MyCourses = () => {
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

  const enrolledCourses = studentData?.enrolledCourses || [];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs text-purple-650 font-bold uppercase tracking-widest">Student Dashboard</span>
          <h1 className="text-xl font-extrabold text-slate-900 uppercase mt-0.5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-650" /> My Courses
          </h1>
        </div>
        <Link to="/courses" className="btn-primary inline-flex items-center gap-2 text-xs">
          Browse More Courses <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Course Cards / Empty State */}
      {enrolledCourses.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white/60 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-650 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase">No Courses Selected Yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              You haven't enrolled in any courses yet. Choose an available course below to start your learning journey.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/student-dashboard"
              className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-5"
            >
              Go to Course Selection <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {enrolledCourses.map((course) => {
            const pct = typeof course.progress === 'number' ? course.progress : 0;
            const completedCount = typeof course.completedLessons === 'number' ? course.completedLessons : 0;
            const totalLessons = course.lessonsCount || 6;

            return (
              <div
                key={course.id}
                className="rounded-2xl bg-white/60 border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-0">
                  {/* Thumbnail */}
                  <div className="w-full md:w-48 h-40 md:h-auto flex-shrink-0 overflow-hidden bg-slate-100">
                    <img
                      src={course.image || 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80'}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="text-base font-extrabold text-slate-900 uppercase">{course.title}</h3>
                        <p className="text-xs text-slate-500">Instructor: {course.trainer}</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(course.tags || ['Tech']).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-650 text-[9px] font-bold uppercase border border-purple-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        to={`/course/${course.id}/learn`}
                        className="btn-primary text-xs flex items-center gap-1.5 flex-shrink-0"
                      >
                        Continue Learning <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-650">Course Progress</span>
                        <span className="text-purple-650">{pct}%</span>
                      </div>
                      <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {completedCount} of {totalLessons} lessons completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Available Courses Selection Panel */}
      <div className="pt-6 border-t border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-purple-650" /> Available Courses to Enroll
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {availableCourses.map((c) => {
            const isEnrolled = enrolledCourses.some((ec) => ec.id === c.id);
            return (
              <div
                key={c.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                  isEnrolled ? 'bg-purple-50/50 border-purple-200' : 'bg-white/60 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate uppercase text-[11px]">{c.title}</p>
                  <p className="text-[10px] text-slate-500">{c.duration} &bull; {c.lessonsCount} Lessons</p>
                </div>
                {isEnrolled ? (
                  <Link
                    to={`/course/${c.id}/learn`}
                    className="px-2.5 py-1 rounded-md bg-purple-600 text-white text-[9px] font-bold uppercase tracking-wide flex-shrink-0"
                  >
                    Open
                  </Link>
                ) : (
                  <button
                    onClick={() => handleSelectCourse(c)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-650 text-[10px] font-semibold border border-slate-200 transition-colors flex-shrink-0"
                  >
                    Enroll
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default MyCourses;
