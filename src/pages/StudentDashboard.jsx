import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, Video, FileText, ClipboardList, Database, 
  FileCheck, Award, CreditCard, ArrowRight, PlayCircle, Download 
} from 'lucide-react';
import {
  getCertificatesForStudent,
  checkAndAutoGenerateAllEligible,
  subscribeCertificates,
} from '../services/certificateService';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchCerts = async () => {
      try {
        await checkAndAutoGenerateAllEligible(user);
        const list = await getCertificatesForStudent(user);
        setCertificates(list.filter((c) => c.status !== 'Revoked'));
      } catch (err) {
        console.error('Error fetching student dashboard certificates:', err);
      }
    };
    fetchCerts();
    const unsub = subscribeCertificates(() => {
      fetchCerts();
    });
    return () => unsub();
  }, [user]);

  const enrolledCourses = [
    {
      id: 'fsd',
      title: 'Full Stack Development',
      progress: 60,
      trainer: 'John David',
      lessonsCount: 10,
      completedLessons: 6,
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const menuItems = [
    { id: 'courses', label: 'My Courses', icon: <BookOpen className="w-4 h-4 text-purple-650" /> },
    { id: 'videos', label: 'Videos', icon: <Video className="w-4 h-4 text-purple-650" /> },
    { id: 'notes', label: 'Notes', icon: <FileText className="w-4 h-4 text-purple-650" /> },
    { id: 'assignments', label: 'Assignments', icon: <ClipboardList className="w-4 h-4 text-rose-400" /> },
    { id: 'projects', label: 'Projects', icon: <Database className="w-4 h-4 text-emerald-400" /> },
    { id: 'exams', label: 'Exams / Tests', icon: <FileCheck className="w-4 h-4 text-amber-500" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-4 h-4 text-purple-650" /> },
    { id: 'payments', label: 'Payment History', icon: <CreditCard className="w-4 h-4 text-slate-650" /> }
  ];

  const mockVideos = [
    { title: 'HTML Forms & Inputs', duration: '45 mins', trainer: 'John David', path: '/course/fsd/learn?lesson=2' },
    { title: 'CSS Grid Layouts Masterclass', duration: '50 mins', trainer: 'John David', path: '/course/fsd/learn?lesson=3' },
    { title: 'JavaScript Promises & Async/Await', duration: '60 mins', trainer: 'John David', path: '/course/fsd/learn?lesson=4' }
  ];

  const mockNotes = [
    { title: 'HTML5 Semantic Elements.pdf', size: '1.4 MB', subject: 'HTML' },
    { title: 'CSS Grid & Flexbox Cheat Sheet.pdf', size: '2.1 MB', subject: 'CSS' },
    { title: 'React Lifecycle Hooks Guide.pdf', size: '1.8 MB', subject: 'React' }
  ];

  const mockAssignments = [
    { title: 'Responsive Portfolio Page', status: 'Graded (90%)', due: 'Passed' },
    { title: 'React Calculator App', status: 'Submitted', due: 'Under Review' },
    { title: 'E-commerce API Integration', status: 'Pending', due: 'Due in 2 days' }
  ];

  const mockProjects = [
    { title: 'E-Commerce Website', level: 'Advanced', status: 'In Progress' },
    { title: 'Weather Forecast App', level: 'Beginner', status: 'Completed' }
  ];

  const mockExams = [
    { title: 'HTML & CSS Aptitude test', status: 'Passed (85%)', marks: '85/100' },
    { title: 'JavaScript Logic Quiz', status: 'Passed (78%)', marks: '78/100' },
    { title: 'React Hooks Assessment', status: 'Not Started', duration: '30 mins' }
  ];

  const mockPayments = [
    { id: 'TXN-980124', date: '24 Jul 2026', course: 'Full Stack Development', amount: '₹30,000', status: 'Success' },
    { id: 'TXN-820712', date: '12 Jul 2026', course: 'React Advanced', amount: '₹10,000', status: 'Success' }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs text-purple-650 font-bold uppercase tracking-wider">Student Dashboard</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 uppercase">Welcome, {user?.name || 'Student'}</h1>
          <p className="text-xs text-slate-500 mt-1">Monitor your syllabus checklist, watch lessons, and manage exams.</p>
        </div>
      </div>

      {/* Main Grid: Menu grid & content panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Shortcut links */}
        {/* <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3 bg-white/20 border border-slate-100 rounded-2xl p-4">
          <p className="hidden lg:block text-[10px] font-bold text-slate-500 uppercase tracking-wide px-3 py-1.5">Quick Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-left font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-white text-purple-650 border border-slate-200' 
                  : 'text-slate-650 hover:bg-white/40 hover:text-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div> */}

        {/* Right Side: Active Workspace views */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* My Enrolled Courses view */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">My Enrolled Courses</h2>
              
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div 
                    key={course.id}
                    className="p-6 rounded-2xl bg-white/40 border border-slate-100 flex flex-col md:flex-row gap-6 items-center"
                  >
                    <div className="h-24 w-full md:w-36 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="h-full w-full object-cover opacity-80"
                      />
                    </div>

                    <div className="flex-grow space-y-3.5 w-full text-xs">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900 hover:text-purple-650 transition-colors uppercase">{course.title}</h3>
                        <p className="text-slate-500">Instructor: {course.trainer} • Enrolled {course.completedLessons}/{course.lessonsCount} lessons</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between font-semibold">
                          <span className="text-slate-650">Course Progress</span>
                          <span className="text-purple-650">60%</span>
                        </div>
                        <div className="relative h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div className="absolute top-0 left-0 bottom-0 bg-purple-600 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto">
                      <Link 
                        to={`/course/${course.id}/learn`}
                        className="btn-primary w-full text-center py-2.5 text-xs flex justify-center items-center gap-1.5"
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos Playlist view */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">Video Lessons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {mockVideos.map((vid, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/40 border border-slate-100 flex justify-between items-center gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 leading-normal">{vid.title}</h4>
                      <p className="text-slate-500">{vid.trainer} • {vid.duration}</p>
                    </div>
                    <Link to={vid.path} className="p-2 rounded-full bg-purple-50 text-purple-650 hover:bg-purple-600 hover:text-slate-950 transition-colors">
                      <PlayCircle className="w-6 h-6" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes list view */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">Class PDF Notes</h2>
              <div className="space-y-3 text-xs">
                {mockNotes.map((note, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/40 border border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-650" />
                      <div>
                        <h4 className="font-bold text-slate-900">{note.title}</h4>
                        <p className="text-[10px] text-slate-500">Subject: {note.subject} • {note.size}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white text-purple-650 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assignments list view */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">Class Assignments</h2>
                <Link to="/assignments" className="text-purple-650 hover:text-sky-300 font-semibold text-xs">[ Submit Assignment ]</Link>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden text-xs">
                <table className="w-full text-left text-slate-700">
                  <thead className="bg-white border-b border-slate-950 text-slate-650 text-[10px] font-bold uppercase">
                    <tr>
                      <th className="px-5 py-3">Assignment</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Schedule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60">
                    {mockAssignments.map((ass, i) => (
                      <tr key={i} className="hover:bg-white/10">
                        <td className="px-5 py-3 font-semibold text-slate-900">{ass.title}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide ${
                            ass.status.includes('Graded') ? 'bg-emerald-500/10 text-emerald-400' : ass.status === 'Submitted' ? 'bg-purple-50 text-purple-650' : 'bg-yellow-500/10 text-yellow-500'
                          }`}>{ass.status}</span>
                        </td>
                        <td className="px-5 py-3 text-right text-slate-500 font-mono">{ass.due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Projects showcase list */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">My Showcase Projects</h2>
                <Link to="/projects" className="text-purple-650 hover:text-sky-300 font-semibold text-xs">[ Go to Projects Hub ]</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {mockProjects.map((proj, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/40 border border-slate-100 space-y-2">
                    <div className="flex justify-between items-center font-bold text-slate-900">
                      <span>{proj.title}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-650 text-[9px] uppercase tracking-wide border border-slate-100">{proj.level}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-[10px] text-slate-500">
                      <span>Status : <strong className={proj.status === 'Completed' ? 'text-emerald-400' : 'text-yellow-500'}>{proj.status}</strong></span>
                      <button className="text-purple-650 hover:text-sky-300 font-semibold">[ View ]</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exams list */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">Exams / Assessments</h2>
              <div className="space-y-3 text-xs">
                {mockExams.map((exam, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/40 border border-slate-100 flex justify-between items-center">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900">{exam.title}</h4>
                      <p className="text-[10px] text-slate-500">{exam.marks || `Duration: ${exam.duration}`}</p>
                    </div>
                    {exam.status === 'Not Started' ? (
                      <Link to="/assessment/react-hooks" className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all">
                        Take Exam
                      </Link>
                    ) : (
                      <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">{exam.status}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificate listing links */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">My Certificates</h2>
                <Link to="/certificates" className="text-purple-650 hover:text-sky-300 font-semibold text-xs">[ View Certificates ]</Link>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-200 text-center max-w-md mx-auto space-y-4">
                <span className="text-xs text-purple-650 font-bold uppercase tracking-wider">
                  {certificates.length > 0
                    ? `${certificates.length} Verified Certificate${certificates.length > 1 ? 's' : ''} Available`
                    : 'No Certificates Earned Yet'}
                </span>
                <p className="text-xs text-slate-650">
                  {certificates.length > 0
                    ? 'Congratulations! You have completed course requirements and earned your verified credentials.'
                    : 'Complete all lessons in your courses to earn an official SwordNex Academy certificate.'}
                </p>
                <div className="flex justify-center gap-3">
                  <Link to="/certificates" className="px-4 py-2 bg-purple-600 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition-all">
                    {certificates.length > 0 ? 'View Certificate' : 'Check Certificates'}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Payment history transactions */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">Payment History</h2>
              <div className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden text-xs">
                <table className="w-full text-left text-slate-700">
                  <thead className="bg-white border-b border-slate-950 text-slate-650 text-[10px] font-bold uppercase">
                    <tr>
                      <th className="px-5 py-3">Transaction ID</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Course</th>
                      <th className="px-5 py-3">Amount</th>
                      <th className="px-5 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60">
                    {mockPayments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-white/10">
                        <td className="px-5 py-3 font-mono font-bold text-slate-900">{pay.id}</td>
                        <td className="px-5 py-3 text-slate-500 font-mono">{pay.date}</td>
                        <td className="px-5 py-3">{pay.course}</td>
                        <td className="px-5 py-3 font-semibold text-slate-800">{pay.amount}</td>
                        <td className="px-5 py-3 text-right text-emerald-400 font-bold">✅ {pay.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;
