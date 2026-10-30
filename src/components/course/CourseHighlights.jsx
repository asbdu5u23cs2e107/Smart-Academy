import React from 'react';
import { 
  Radio, Users, FolderKanban, Award, FileUser, 
  UserCheck, ShieldCheck, Film, Bookmark, MessageSquare, 
  ClipboardList, Compass 
} from 'lucide-react';

const CourseHighlights = () => {
  const highlightsList = [
    {
      title: 'Live Interactive Classes',
      desc: 'Connect directly with instructions in real-time, ask doubts instantly and learn together.',
      icon: <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
    },
    {
      title: 'Expert Mentors',
      desc: 'Learn directly from industry veterans and practitioners who have built real scale products.',
      icon: <Users className="w-5 h-5 text-purple-650" />
    },
    {
      title: 'Real-Time Projects',
      desc: 'Build client-grade systems, websites and applications during code-along workshops.',
      icon: <FolderKanban className="w-5 h-5 text-sky-500" />
    },
    {
      title: 'Industry Certificate',
      desc: 'Earn a recognized SwordNex certificate on completing modules, quizzes and assignments.',
      icon: <Award className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Resume Building',
      desc: 'Workshops for crafting premium developer resumes, highlight hooks, and projects.',
      icon: <FileUser className="w-5 h-5 text-blue-500" />
    },
    {
      title: 'Mock Interviews',
      desc: 'Mock HR rounds and live system design interviews proctored by expert recruiters.',
      icon: <UserCheck className="w-5 h-5 text-indigo-500" />
    },
    {
      title: 'Placement Assistance',
      desc: 'Referral log access to over 100+ hiring partners in tech startups and global MNCs.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
    },
    {
      title: 'Recorded Sessions',
      desc: 'Every session recording is compiled and uploaded within 24 hours on student portal.',
      icon: <Film className="w-5 h-5 text-violet-500" />
    },
    {
      title: 'Lifetime Learning Access',
      desc: 'Revisit classes, projects, materials, cheatsheets and document guides forever.',
      icon: <Bookmark className="w-5 h-5 text-teal-500" />
    },
    {
      title: 'Community Support',
      desc: 'Dedicated Discord peer servers to interact, discuss assignments and form coding teams.',
      icon: <MessageSquare className="w-5 h-5 text-purple-500" />
    },
    {
      title: 'Assignments & Exercises',
      desc: 'Daily code quizzes and homework assignments to benchmark your performance indicators.',
      icon: <ClipboardList className="w-5 h-5 text-orange-500" />
    },
    {
      title: 'Career Guidance',
      desc: 'One-on-one consulting callbacks with mentors to choose engineering career roadmaps.',
      icon: <Compass className="w-5 h-5 text-pink-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Why Choose This Course</h2>
        <p className="text-xs text-slate-500 mt-0.5">Explore the features and perks of our live curriculum models.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlightsList.map((highlight, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-50 transition-colors duration-300">
                {highlight.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-650 transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {highlight.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseHighlights;
