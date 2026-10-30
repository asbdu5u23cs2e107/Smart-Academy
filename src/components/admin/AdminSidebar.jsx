import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  LayoutDashboard,
  UserPlus,
  Users,
  BookOpen,
  FileText,
  Video,
  ClipboardList,
  Award,
  Database,
  Activity,
  ShieldAlert,
  BarChart3,
  ChevronDown,
  X,
} from 'lucide-react';


// =====================================================
// ADMIN SIDEBAR MENU
// =====================================================

const navSections = [
  // ---------------- DASHBOARD ----------------
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/admin',
    items: [],
  },

  // ---------------- STUDENT MANAGEMENT ----------------
  {
    id: 'students',
    label: 'Student Management',
    icon: <UserPlus className="w-5 h-5" />,
    path: '/admin/students',
    items: [
      {
        label: 'Add Student',
        path: '/admin/addStudent',
      },
      {
        label: 'Student List',
        path: '/admin/studentList',
      },
      {
        label: 'Attendance',
        path: '/admin/StudentAttendance',
      },
      {
        label: 'Fee Details',
        path: '/admin/FeeDetails',
      },
      {
        label: 'Certificates',
        path: '/admin/Certificates',
      },
    ],
  },

  // ---------------- TRAINER MANAGEMENT ----------------
  {
    id: 'trainers',
    label: 'Trainer Management',
    icon: <Users className="w-5 h-5" />,
    path: '/admin/trainers',
    items: [
      {
        label: 'Add Trainer',
        path: '/admin/AddTrainer',
      },
      {
        label: 'Trainer List',
        path: '/admin/TrainerList',
      },
      {
        label: 'Assign Courses',
        path: '/admin/AssignCourses',
      },
      {
        label: 'Trainer Attendance',
        path: '/admin/TrainerAttendance',
      },
    ],
  },

  // ---------------- COURSE MANAGEMENT ----------------
  {
    id: 'courses',
    label: 'Course Management',
    icon: <BookOpen className="w-5 h-5" />,
    path: '/admin/courses',
    items: [
      {
        label: 'Add Course',
        path: '/admin/AddCourse',
      },
      {
        label: 'Manage Course',
        path: '/admin/ManageCourse',
      },
      {
        label: 'Course Schedule',
        path: '/admin/CourseSchedule',
      },
      {
        label: 'Assignments',
        path: '/admin/Assignments',
      },
    ],
  },

  // ---------------- RESOURCE MANAGEMENT ----------------
  {
    id: 'resources',
    label: 'Resource Management',
    icon: <Database className="w-5 h-5" />,
    path: '/admin/resources',
    items: [
      {
        label: 'Upload Notes',
        path: '/admin/UploadNotes',
      },
      {
        label: 'Upload Videos',
        path: '/admin/Uploadvideos',
      },
      {
        label: 'Upload PPT',
        path: '/admin/uploadPPT',
      },
      {
        label: 'Coding Files',
        path: '/admin/CodingFiles',
      },
      {
        label: 'Manage Resources',
        path: '/admin/ManageResources',
      },
    ],
  },

  // ---------------- LIVE CLASS MONITORING ----------------
  {
    id: 'live-monitor',
    label: 'Live Class Monitoring',
    icon: <Activity className="w-5 h-5" />,
    path: '/admin/liveClassMonitoring',
    items: [],
  },

  // ---------------- AI WARNING PANEL ----------------
  {
    id: 'ai-warnings',
    label: 'AI Warning Panel',
    icon: <ShieldAlert className="w-5 h-5" />,
    path: '/admin/AIWarningPanel',
    items: [],
  },

  // ---------------- REPORTS ----------------
  {
    id: 'reports',
    label: 'Reports',
    icon: <BarChart3 className="w-5 h-5" />,
    path: '/admin/Reports',
    items: [],
  },
];


// =====================================================
// ADMIN SIDEBAR COMPONENT
// =====================================================

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const activePath = location.pathname;

  const getActiveSection = () => {
    const section = navSections.find((section) => {
      if (activePath === section.path) {
        return true;
      }

      return section.items?.some(
        (item) =>
          activePath === item.path ||
          activePath.startsWith(item.path + '/')
      );
    });

    return section?.id || 'dashboard';
  };

  const [openSection, setOpenSection] = useState(
    getActiveSection()
  );


  // Automatically open current section
  useEffect(() => {
    setOpenSection(getActiveSection());
  }, [activePath]);


  const handleSectionToggle = (id) => {
    setOpenSection((current) =>
      current === id ? '' : id
    );
  };


  const sidebarContent = (
    <div className="flex h-full flex-col bg-white border-r border-slate-200 shadow-sm">

      {/* ================================================= */}
      {/* LOGO */}
      {/* ================================================= */}

      <div className="px-5 py-5 border-b border-slate-200">

        <div className="flex items-center justify-between">

          <img
            src="/dist/assets/Logo.png"
            alt="SwordNex"
            className="h-16 w-auto object-contain"
          />

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* NAVIGATION */}
      {/* ================================================= */}

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">

        {navSections.map((section) => {

          const hasChildren =
            section.items &&
            section.items.length > 0;

          const isExpanded =
            openSection === section.id;

          const sectionIsActive =
            activePath === section.path ||
            activePath.startsWith(section.path + '/') ||
            section.items?.some(
              (item) =>
                activePath === item.path ||
                activePath.startsWith(item.path + '/')
            );


          // =================================================
          // MENU WITHOUT CHILDREN
          // =================================================

          if (!hasChildren) {

            return (
              <NavLink
                key={section.id}
                to={section.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all
                  ${
                    isActive || sectionIsActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-purple-50 hover:text-purple-600'
                  }`
                }
              >

                <span>
                  {React.cloneElement(section.icon, {
                    className: 'w-5 h-5',
                  })}
                </span>

                <span>
                  {section.label}
                </span>

              </NavLink>
            );
          }


          // =================================================
          // MENU WITH CHILDREN
          // =================================================

          return (
            <div
              key={section.id}
              className="rounded-xl overflow-hidden"
            >

              {/* Parent Menu */}

              <div
                className={`
                  flex items-center rounded-xl transition-all
                  ${
                    sectionIsActive
                      ? 'bg-purple-50'
                      : 'bg-slate-50 hover:bg-purple-50'
                  }
                `}
              >

                <NavLink
                  to={section.path}
                  className={`
                    flex-1 flex items-center gap-3 px-4 py-3.5
                    text-sm font-semibold
                    ${
                      sectionIsActive
                        ? 'text-purple-600'
                        : 'text-slate-700'
                    }
                  `}
                >

                  <span
                    className={
                      sectionIsActive
                        ? 'text-purple-600'
                        : 'text-purple-500'
                    }
                  >
                    {section.icon}
                  </span>

                  <span>
                    {section.label}
                  </span>

                </NavLink>


                {/* Dropdown Button */}

                <button
                  type="button"
                  onClick={() =>
                    handleSectionToggle(section.id)
                  }
                  className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-purple-600"
                >

                  <ChevronDown
                    className={`
                      w-4 h-4 transition-transform
                      ${
                        isExpanded
                          ? 'rotate-180'
                          : ''
                      }
                    `}
                  />

                </button>

              </div>


              {/* ================================================= */}
              {/* SUB MENU */}
              {/* ================================================= */}

              {isExpanded && (

                <div className="ml-5 mt-1 pl-4 border-l-2 border-purple-100 space-y-1">

                  {section.items.map((item) => {

                    const itemIsActive =
                      activePath === item.path ||
                      activePath.startsWith(
                        item.path + '/'
                      );

                    return (

                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() =>
                          setSidebarOpen(false)
                        }
                        className={`
                          flex items-center gap-3
                          px-3 py-2.5
                          rounded-lg
                          text-sm
                          transition-all
                          ${
                            itemIsActive
                              ? 'bg-purple-600 text-white font-semibold'
                              : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'
                          }
                        `}
                      >

                        {/* Small bullet */}

                        <span
                          className={`
                            w-2 h-2 rounded-full shrink-0
                            ${
                              itemIsActive
                                ? 'bg-white'
                                : 'bg-purple-400'
                            }
                          `}
                        />

                        <span>
                          {item.label}
                        </span>

                      </NavLink>

                    );
                  })}

                </div>

              )}

            </div>
          );

        })}

      </nav>


      {/* ================================================= */}
      {/* ADMIN PROFILE */}
      {/* ================================================= */}

      <div className="border-t border-slate-200 p-4">

        <div className="flex items-center gap-3 rounded-xl bg-purple-50 border border-purple-100 p-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white font-bold">
            A
          </div>

          <div className="min-w-0">

            <p className="text-sm font-semibold text-slate-900">
              Admin Officer
            </p>

            <p className="text-xs text-slate-500 truncate">
              admin@swordnex.com
            </p>

          </div>

        </div>

      </div>

    </div>
  );


  return (
    <>
      {/* ================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================================= */}

      <aside className="hidden md:flex w-72 md:flex-shrink-0">
        {sidebarContent}
      </aside>


      {/* ================================================= */}
      {/* MOBILE SIDEBAR */}
      {/* ================================================= */}

      {sidebarOpen && (

        <div className="fixed inset-0 z-50 flex md:hidden">

          {/* Overlay */}

          <div
            className="fixed inset-0 bg-slate-900/50"
            onClick={() => setSidebarOpen(false)}
          />


          {/* Sidebar */}

          <div className="relative z-50 w-72">
            {sidebarContent}
          </div>

        </div>

      )}

    </>
  );
};


export default AdminSidebar;