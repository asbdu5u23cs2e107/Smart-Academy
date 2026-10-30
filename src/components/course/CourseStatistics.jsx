import React from 'react';
import {
  Users, Video, UserCheck, ShieldCheck,
  Clock, FolderCheck, Award, GraduationCap
} from 'lucide-react';

const CourseStatistics = ({ course }) => {
  const statsList = [
    {
      label: 'Live Instructor',
      value: 'Daily Live Classes',
      desc: 'Interactive 2-way audio/video sessions',
      icon: <Video className="w-6 h-6 text-purple-650" />
    },
    {
      label: 'One-to-One Training',
      value: 'Personalized Support',
      desc: 'Doubt clearing and mentor feedback',
      icon: <UserCheck className="w-6 h-6 text-purple-650" />
    },
    {
      label: 'Industry Experts',
      value: course.mentorName || 'Lead Mentors',
      desc: course.mentorExperience || 'Years of industry experience',
      icon: <GraduationCap className="w-6 h-6 text-purple-650" />
    },
    {
      label: 'Placement Support',
      value: '100% Career Assistance',
      desc: 'Mock interviews & hiring partners',
      icon: <ShieldCheck className="w-6 h-6 text-purple-650" />
    },
    {
      label: 'Course Duration',
      value: course.duration || 'Flexible',
      desc: 'Weekday and weekend batch options',
      icon: <Clock className="w-6 h-6 text-purple-650" />
    },
    {
      label: 'Real Projects',
      value: `${course.projects?.length || 4}+ Industry Projects`,
      desc: 'Hands-on practical development',
      icon: <FolderCheck className="w-6 h-6 text-purple-650" />
    },
    {
      label: 'Certificate',
      value: 'SwordNex Verified Certificate',
      desc: 'Sharable certificate on LinkedIn',
      icon: <Award className="w-6 h-6 text-purple-650" />
    },
    {
      label: 'Students Enrolled',
      value: course.studentsEnrolled || '5,000+',
      desc: 'Active student community',
      icon: <Users className="w-6 h-6 text-purple-650" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Course Key Highlights</h2>
        <p className="text-xs text-slate-500 mt-0.5">Key stats and metrics about this program.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsList.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">{stat.value}</h3>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 border-t border-slate-100 pt-2">{stat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseStatistics;
