import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../../data/courses';

// Course Sub-components
import CourseHero from '../../components/course/CourseHero';
import CourseStatistics from '../../components/course/CourseStatistics';
import CourseImageSection from '../../components/course/CourseImageSection';
import CourseHighlights from '../../components/course/CourseHighlights';
import CourseRegistrationForm from '../../components/course/CourseRegistrationForm';
import CourseCurriculumTimeline from '../../components/course/CourseCurriculumTimeline';
import CourseProjects from '../../components/course/CourseProjects';
import CourseTechnologies from '../../components/course/CourseTechnologies';
import CourseCareer from '../../components/course/CourseCareer';
import CoursePlacement from '../../components/course/CoursePlacement';
import CourseBenefits from '../../components/course/CourseBenefits';
import CourseFAQ from '../../components/course/CourseFAQ';
import CourseFooterCTA from '../../components/course/CourseFooterCTA';
import { ArrowLeft, BookOpen } from 'lucide-react';

const LiveCourseDetails = () => {
  const { slug } = useParams();
  const registrationRef = useRef(null);

  const course = courses.find((c) => c.slug === slug);

  // Scroll to registration form helper
  const scrollToRegister = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // ── Course Not Found ──────────────────────────────────────────────────────
  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto">
          <BookOpen className="w-9 h-9 text-purple-650" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Course Not Found
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            The course <code className="px-1.5 py-0.5 rounded bg-slate-100 text-xs font-mono text-purple-650">{slug}</code> does not exist or may have been removed.
          </p>
        </div>
        <Link
          to="/live-classes"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
          <span>Browse All Live Classes</span>
        </Link>
      </div>
    );
  }

  // ── Course Details Page ────────────────────────────────────────────────────
  return (
    <div className="bg-slate-50">
      {/* Full-width Hero - no container restriction */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <CourseHero course={course} onRegisterClick={scrollToRegister} />
      </div>

      {/* Main two-column layout */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── Left Column: Main Content ───────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-16">

            {/* Statistics Section */}
            <CourseStatistics course={course} />

            {/* Course Image Section */}
            <CourseImageSection course={course} />

            {/* Why Choose This Course */}
            <CourseHighlights />

            {/* Curriculum Timeline */}
            <CourseCurriculumTimeline
              courseName={course.courseName}
              curriculum={course.curriculum}
            />

            {/* Real-Time Projects */}
            <CourseProjects
              courseName={course.courseName}
              projects={course.projects}
            />

            {/* Technologies */}
            <CourseTechnologies
              courseName={course.courseName}
              technologies={course.technologies}
            />

            {/* Career Opportunities */}
            <CourseCareer
              courseName={course.courseName}
              careerRoles={course.careerRoles}
            />

            {/* Placement Assistance */}
            <CoursePlacement />

            {/* Student Benefits */}
            <CourseBenefits />

            {/* FAQ */}
            <CourseFAQ
              courseName={course.courseName}
              faqs={course.faqs}
            />

            {/* Footer CTA */}
            <CourseFooterCTA
              courseName={course.courseName}
              onRegisterClick={scrollToRegister}
            />
          </div>

          {/* ── Right Column: Registration Form (sticky on desktop) ──────── */}
          <div
            ref={registrationRef}
            className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 lg:sticky lg:top-24 self-start"
          >
            <CourseRegistrationForm courseName={course.courseName} />

            {/* Quick info card below form */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5 text-xs text-slate-600">
              <p className="font-semibold text-slate-800 text-sm">Quick Facts</p>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold text-slate-800">{course.duration}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Level</span>
                <span className="font-semibold text-slate-800">{course.level}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Language</span>
                <span className="font-semibold text-slate-800">{course.language}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Mentor</span>
                <span className="font-semibold text-slate-800 text-right max-w-[60%] truncate">{course.mentorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Enrolled</span>
                <span className="font-semibold text-slate-800">{course.studentsEnrolled}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LiveCourseDetails;
