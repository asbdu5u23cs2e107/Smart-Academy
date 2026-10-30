import React from 'react';
import { Star, Clock, Globe, Award, Sparkles, BookOpen } from 'lucide-react';
import { FaGraduationCap } from 'react-icons/fa';

const CourseHero = ({ course, onRegisterClick }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative inline-block text-amber-400">
            <Star className="w-4 h-4 text-slate-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-slate-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-slate-100 p-8 md:p-12 shadow-xl border border-slate-800">
      {/* Decorative Blur Background Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Live Certification Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-semibold text-emerald-400 animate-pulse">
          <Award className="w-4 h-4 text-emerald-400" />
          <span className=" text-emerald-400">Live Certification Program</span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight !text-white leading-tight">
            {course.courseName} <span className="text-purple-450 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400">Live Training</span>
          </h1>
          <p className="text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        {/* Ratings & Reviews */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <span className="font-bold text-amber-400 text-base">{course.rating}</span>
            <div className="flex items-center gap-0.5 ml-1">
              {renderStars(course.rating)}
            </div>
          </div>
          <span className="text-slate-650">|</span>
          <span>({course.reviewCount} reviews)</span>
          <span className="text-slate-650">|</span>
          <span className="flex items-center gap-1.5">
            <FaGraduationCap className="w-4 h-4 text-purple-400" />
            <span>{course.studentsEnrolled} Students Enrolled</span>
          </span>
        </div>

        {/* Badges/Details Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2 text-sm max-w-2xl">
          <div className="flex items-center gap-2.5 bg-slate-800/40 border border-slate-700/30 p-3 rounded-2xl">
            <BookOpen className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Level</p>
              <p className="font-semibold text-slate-200">{course.level}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-800/40 border border-slate-700/30 p-3 rounded-2xl">
            <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Duration</p>
              <p className="font-semibold text-slate-200">{course.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-800/40 border border-slate-700/30 p-3 rounded-2xl col-span-2 sm:col-span-1">
            <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Language</p>
              <p className="font-semibold text-slate-200">{course.language}</p>
            </div>
          </div>
        </div>

        {/* Long Description */}
        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
          {course.longDescription}
        </p>

        {/* Pricing details */}
        <div className="flex items-baseline gap-3 pt-2">
          <span className="text-2xl md:text-3xl font-extrabold text-white">₹{course.offerPrice.toLocaleString()}</span>
          <span className="text-sm text-slate-500 line-through">₹{course.price.toLocaleString()}</span>
          <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
            {course.discount}
          </span>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
          <button 
            onClick={onRegisterClick}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Talk to Advisor</span>
          </button>
          <a
            href={course.downloadCurriculum}
            download
            onClick={(e) => e.preventDefault()} // Dummy download action
            className="btn-secondary flex items-center justify-center gap-2 border border-slate-750 text-slate-200 hover:text-white"
          >
            <span>Download Curriculum</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;
