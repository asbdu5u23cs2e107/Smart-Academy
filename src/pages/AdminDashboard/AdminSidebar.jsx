import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  BookOpen,
  Database,
  Activity,
  ShieldAlert,
  BarChart3,
  ChevronDown,
  X,
} from "lucide-react";

const navSections = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
    items: [],
  },

  {
    id: "students",
    label: "Student Management",
    icon: UserPlus,
    path: "/admin/students",
    items: [
      { label: "Add Student", path: "/admin/addStudent" },
      { label: "Student List", path: "/admin/students/list" },
      { label: "Attendance", path: "/admin/students/attendance" },
      { label: "Fee Details", path: "/admin/students/fees" },
      { label: "Certificates", path: "/admin/students/certificates" },
    ],
  },

  {
    id: "trainers",
    label: "Trainer Management",
    icon: Users,
    path: "/admin/trainers",
    items: [
      { label: "Add Trainer", path: "/admin/trainers/add" },
      { label: "Trainer List", path: "/admin/trainers/list" },
      { label: "Assign Courses", path: "/admin/trainers/assign-courses" },
      { label: "Trainer Attendance", path: "/admin/trainers/attendance" },
    ],
  },

  {
    id: "courses",
    label: "Course Management",
    icon: BookOpen,
    path: "/admin/courses",
    items: [
      { label: "Add Course", path: "/admin/courses/add" },
      { label: "Manage Course", path: "/admin/courses/manage" },
      { label: "Course Schedule", path: "/admin/courses/schedule" },
      { label: "Assignments", path: "/admin/courses/assignments" },
    ],
  },

  {
    id: "resources",
    label: "Resource Management",
    icon: Database,
    path: "/admin/resources",
    items: [
      { label: "Upload Notes", path: "/admin/resources/upload-notes" },
      { label: "Upload Videos", path: "/admin/resources/upload-videos" },
      { label: "Upload PPT", path: "/admin/resources/upload-ppt" },
      { label: "Coding Files", path: "/admin/resources/coding-files" },
      { label: "Manage Resources", path: "/admin/resources/manage" },
    ],
  },

  {
    id: "live",
    label: "Live Class Monitoring",
    icon: Activity,
    path: "/admin/live-monitor",
    items: [],
  },

  {
    id: "warnings",
    label: "AI Warning Panel",
    icon: ShieldAlert,
    path: "/admin/ai-warnings",
    items: [],
  },

  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
    items: [],
  },
];

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const currentPath = location.pathname;

  const getActiveSection = () => {
    if (currentPath === "/admin") {
      return "dashboard";
    }

    const section = navSections.find((section) => {
      if (
        currentPath === section.path ||
        currentPath.startsWith(section.path + "/")
      ) {
        return true;
      }

      return section.items.some(
        (item) =>
          currentPath === item.path ||
          currentPath.startsWith(item.path + "/")
      );
    });

    return section?.id || "dashboard";
  };

  const [openSection, setOpenSection] = useState(getActiveSection());

  useEffect(() => {
    setOpenSection(getActiveSection());
  }, [currentPath]);

  const toggleSection = (id) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  const closeMobile = () => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white border-r border-slate-200">

      {/* LOGO */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-200">
        <img
          src="/assets/Logo.png"
          alt="SwordNex"
          className="h-12 w-auto object-contain"
        />

        <button
          onClick={closeMobile}
          className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">

        {navSections.map((section) => {
          const Icon = section.icon;

          const hasChildren = section.items.length > 0;

          const sectionActive =
            currentPath === section.path ||
            currentPath.startsWith(section.path + "/") ||
            section.items.some(
              (item) =>
                currentPath === item.path ||
                currentPath.startsWith(item.path + "/")
            );

          /* SIMPLE MENU */
          if (!hasChildren) {
            return (
              <NavLink
                key={section.id}
                to={section.path}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-slate-700 hover:bg-purple-50 hover:text-purple-600"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </NavLink>
            );
          }

          /* DROPDOWN MENU */
          return (
            <div key={section.id}>

              <div
                className={`flex items-center rounded-xl transition ${
                  sectionActive
                    ? "bg-purple-50"
                    : "bg-slate-50 hover:bg-purple-50"
                }`}
              >

                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className={`flex-1 flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-left ${
                    sectionActive
                      ? "text-purple-600"
                      : "text-slate-700"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      sectionActive
                        ? "text-purple-600"
                        : "text-purple-500"
                    }`}
                  />

                  <span>{section.label}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-12 h-12 flex items-center justify-center"
                >
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openSection === section.id
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
              </div>

              {/* SUB MENU */}
              {openSection === section.id && (
                <div className="ml-5 mt-2 pl-4 border-l-2 border-purple-100 space-y-1">

                  {section.items.map((item) => {
                    const active =
                      currentPath === item.path ||
                      currentPath.startsWith(item.path + "/");

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={closeMobile}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                          active
                            ? "bg-purple-600 text-white font-semibold shadow-sm"
                            : "text-slate-600 hover:bg-purple-50 hover:text-purple-600"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            active
                              ? "bg-white"
                              : "bg-purple-400"
                          }`}
                        />

                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}

                </div>
              )}
            </div>
          );
        })}

      </nav>

      {/* ADMIN PROFILE */}
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
      {/* DESKTOP */}
      <aside className="hidden md:flex w-72 flex-shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* MOBILE */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeMobile}
          />

          <aside className="relative z-50 w-72 h-full">
            {sidebarContent}
          </aside>

        </div>
      )}
    </>
  );
};

export default AdminSidebar;