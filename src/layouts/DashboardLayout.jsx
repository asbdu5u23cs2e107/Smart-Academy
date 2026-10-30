import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import {
  BookOpen, Video, FileText, ClipboardList, Briefcase,
  Award, CreditCard, ChevronRight, Menu, X, BarChart3,
  UserPlus, PlusCircle, Settings, ShieldAlert, School,
  ShieldCheck, LayoutDashboard, Database, Activity, FileCheck
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, switchRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hideSidebar =
    location.pathname === '/placements' ||
    user.role === 'student' &&
    location.pathname === '/student-dashboard/placements';

  if (!user) {
    // Fallback if not logged in, redirect to login
    React.useEffect(() => {
      navigate('/login');
    }, [navigate]);
    return null;
  }

  // Define sidebar links based on user role
  const getSidebarLinks = (role) => {
    switch (role) {
      case 'trainer':
        return [
          { label: 'Dashboard', path: '/trainer/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: 'Courses', path: '/trainer/courses', icon: <BookOpen className="w-5 h-5" /> },
          { label: 'Add Course', path: '/trainer/add-course', icon: <PlusCircle className="w-5 h-5" /> },
          { label: 'Upload Videos', path: '/trainer/upload-videos', icon: <Video className="w-5 h-5" /> },
          { label: 'Upload Notes', path: '/trainer/upload-notes', icon: <FileText className="w-5 h-5" /> },
          { label: 'Create Exam', path: '/trainer/exam', icon: <FileCheck className="w-5 h-5" /> },
          { label: 'Check Assignments', path: '/trainer/assignments', icon: <ClipboardList className="w-5 h-5" /> },
          { label: 'Student Performance', path: '/trainer/student-performance', icon: <BarChart3 className="w-5 h-5" /> },
        ];
        case 'admin':
  return [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard className="w-5 h-5" />
    },

    {
      label: 'Student Management',
      icon: <UserPlus className="w-5 h-5" />,
      children: [
        {
          label: 'Add Student',
          path: '/admin#add-student'
        },
        {
          label: 'Student List',
          path: '/admin#student-list'
        },
        {
          label: 'Attendance',
          path: '/admin#student-attendance'
        },
        {
          label: 'Fee Details',
          path: '/admin#fee-details'
        },
        {
          label: 'Certificates',
          path: '/admin/certificates'
        }
      ]
    },

    {
      label: 'Trainer Management',
      icon: <UserPlus className="w-5 h-5" />,
      children: [
        {
          label: 'Add Trainer',
          path: '/admin#add-trainer'
        },
        {
          label: 'Trainer List',
          path: '/admin#trainer-list'
        },
        {
          label: 'Assign Courses',
          path: '/admin#assign-courses'
        },
        {
          label: 'Trainer Attendance',
          path: '/admin#trainer-attendance'
        }
      ]
    },

    {
      label: 'Course Management',
      icon: <BookOpen className="w-5 h-5" />,
      children: [
        {
          label: 'Add Course',
          path: '/admin#add-course'
        },
        {
          label: 'Manage Course',
          path: '/admin#manage-course'
        },
        {
          label: 'Course Schedule',
          path: '/admin#course-schedule'
        },
        {
          label: 'Assignments',
          path: '/admin#assignments'
        }
      ]
    },

    {
      label: 'Resource Management',
      icon: <Database className="w-5 h-5" />,
      children: [
        {
          label: 'Upload Notes',
          path: '/admin#upload-notes'
        },
        {
          label: 'Upload Videos',
          path: '/admin#upload-videos'
        },
        {
          label: 'Upload PPT',
          path: '/admin#upload-ppt'
        },
        {
          label: 'Coding Files',
          path: '/admin#coding-files'
        },
        {
          label: 'Manage Resources',
          path: '/admin#manage-resources'
        }
      ]
    },

    {
      label: 'Live Class Monitoring',
      path: '/admin#live-monitor',
      icon: <Activity className="w-5 h-5" />
    },

    {
      label: 'AI Warning Panel',
      path: '/admin#ai-warnings',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />
    },

    {
      label: 'Reports',
      path: '/admin#reports',
      icon: <BarChart3 className="w-5 h-5" />
    }
  ];
      case 'super-admin':
        return [
          { label: 'Dashboard', path: '/super-admin', icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: 'Academies', path: '/super-admin#academies', icon: <School className="w-5 h-5" /> },
          { label: 'Admins', path: '/super-admin#admins', icon: <ShieldCheck className="w-5 h-5" /> },
          { label: 'AI Monitoring', path: '/super-admin#ai-monitoring', icon: <Activity className="w-5 h-5" /> },
          { label: 'Reports', path: '/super-admin#reports', icon: <BarChart3 className="w-5 h-5" /> },
          { label: 'System Settings', path: '/super-admin#settings', icon: <Settings className="w-5 h-5" /> },
        ];
      case 'student':
      default:
        return [
          { label: 'My Dashboard', path: '/student-dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: 'My Courses', path: '/student-dashboard/courses', icon: <BookOpen className="w-5 h-5" /> },
          { label: 'Videos', path: '/student-dashboard/videos', icon: <Video className="w-5 h-5" /> },
          { label: 'Notes', path: '/student-dashboard/notes', icon: <FileText className="w-5 h-5" /> },
          { label: 'Assignments', path: '/student-dashboard/assignments', icon: <ClipboardList className="w-5 h-5" /> },
          { label: 'Projects', path: '/student-dashboard/projects', icon: <Database className="w-5 h-5" /> },
          { label: 'Exams / Tests', path: '/student-dashboard/exams', icon: <FileCheck className="w-5 h-5" /> },
          { label: 'Certificates', path: '/student-dashboard/certificates', icon: <Award className="w-5 h-5" /> },
          { label: 'Payment History', path: '/student-dashboard/payments', icon: <CreditCard className="w-5 h-5" /> },
          { label: 'Placements', path: '/student-dashboard/placements', icon: <Briefcase className="w-5 h-5" /> },
        ];
    }
  };


  const menuLinks = getSidebarLinks(user.role);

  // Set style accents based on roles
  const getRoleAccentColor = (role) => {
    switch (role) {
      case 'trainer': return 'text-emerald-400 border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20';
      case 'admin': return 'text-purple-650 border-purple-500 bg-purple-50 hover:bg-purple-600/20';
      case 'super-admin': return 'text-rose-400 border-rose-500 bg-rose-500/10 hover:bg-rose-500/20';
      default: return 'text-purple-650 border-sky-500 bg-purple-50 hover:bg-purple-600/20';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Sticky Header */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">

        {/* Sidebar Desktop */}
        {!hideSidebar && (
          <aside className="hidden md:flex flex-col w-64 border-r border-slate-100 bg-slate-50/40 backdrop-blur-md overflow-y-auto">
            {/* Dashboard Title Header inside sidebar */}
            <div className="p-6 border-b border-slate-200/60">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getRoleAccentColor(user.role)} capitalize mb-2`}>
                {user.role.replace('-', ' ')} PANEL
              </span>
              <h2 className="text-lg font-bold text-slate-900 tracking-wide">
                Navigation Menu
              </h2>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
              {menuLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${isActive
                      ? 'bg-white text-purple-650 border border-slate-200'
                      : 'text-slate-650 hover:bg-white/50 hover:text-slate-800'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <span className={isActive ? 'text-purple-650' : 'text-slate-500'}>
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-0 transition-transform group-hover:opacity-40 group-hover:translate-x-0.5" />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Sidebar Footer User Info */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-slate-900 shadow-lg">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Mobile Sidebar Toggle Header (only on mobile) */}
        <div className="md:hidden absolute top-4 left-4 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-slate-50/80 backdrop-blur-sm">
            <div className="relative flex flex-col w-64 max-w-xs bg-slate-50 border-r border-slate-100 p-6 animate-slide-in">
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white border border-slate-200 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pt-4">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getRoleAccentColor(user.role)} capitalize mb-2`}>
                  {user.role.replace('-', ' ')} PANEL
                </span>
                <h2 className="text-lg font-bold text-slate-900">Menu Navigation</h2>
              </div>

              <nav className="flex-grow space-y-1 overflow-y-auto">
                {menuLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    end
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                        ? 'bg-white text-purple-650 border border-slate-200'
                        : 'text-slate-650 hover:bg-white/50 hover:text-slate-800'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={isActive ? 'text-purple-650' : 'text-slate-500'}>
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-slate-900">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 md:pl-8 pt-16 md:pt-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;