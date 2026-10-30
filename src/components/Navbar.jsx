import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  BookOpen, Search, ShoppingCart, User, LogOut, ChevronDown,
  Menu, X, Radio, GraduationCap, Briefcase, Award, Shield,
  Video, Calendar, HelpCircle, Code, FileText, Layers,
  Newspaper, ClipboardList, BookMarked, FolderKanban, Rocket, Trophy
} from 'lucide-react';
import { courses } from '../data/courses';
import { FaReact, FaAngular, FaJava, FaPython, FaNodeJs, FaDatabase, FaFigma, FaBrain } from 'react-icons/fa';
import { SiDotnet, SiMongodb } from 'react-icons/si';

const Navbar = () => {
  const { user, switchRole, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  // Desktop: which nav dropdown is currently open (by label), null = none
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimer = useRef(null);

  // Mobile: which nav dropdown is expanded (by label), null = none
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  const getCourseIcon = (slug) => {
    switch (slug) {
      case 'react-js': return <FaReact className="w-4 h-4 text-sky-500" />;
      case 'angular': return <FaAngular className="w-4 h-4 text-rose-500" />;
      case 'java': return <FaJava className="w-4 h-4 text-amber-600" />;
      case 'python': return <FaPython className="w-4 h-4 text-blue-500" />;
      case 'node-js': return <FaNodeJs className="w-4 h-4 text-emerald-600" />;
      case 'aspnet-core': return <SiDotnet className="w-4 h-4 text-violet-600" />;
      case 'sql-server': return <FaDatabase className="w-4 h-4 text-indigo-500" />;
      case 'mongodb': return <SiMongodb className="w-4 h-4 text-emerald-500" />;
      case 'ui-ux': return <FaFigma className="w-4 h-4 text-pink-500" />;
      case 'ai-machine-learning': return <FaBrain className="w-4 h-4 text-indigo-650 animate-pulse" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const navItems = [
    {
      label: 'Live Classes',
      path: '',
      icon: <Radio className="w-4 h-4 text-rose-500 animate-pulse" />,
      dropdown: courses.map(c => ({
        label: c.courseName,
        path: `/live-course/${c.slug}`,
        icon: getCourseIcon(c.slug)
      }))
    },
    {
      label: 'Courses',
      path: '/courses',

    },
    {
      label: 'Practice',
      path: '/practice',
      // dropdown: [
      //   { label: 'Coding Problems', path: '/practice/problems', icon: <Code className="w-4 h-4" /> },
      //   { label: 'Mock Tests', path: '/practice/mock-tests', icon: <ClipboardList className="w-4 h-4" /> },
      //   { label: 'Quizzes', path: '/practice/quizzes', icon: <FileText className="w-4 h-4" /> },
      //   { label: 'Contests', path: '/practice/contests', icon: <Trophy className="w-4 h-4" /> },
      // ]
    },
    {
      label: 'Resources',
      path: '/resources',
      // dropdown: [
      //   { label: 'Articles & Blogs', path: '/resources/blogs', icon: <Newspaper className="w-4 h-4" /> },
      //   { label: 'Cheat Sheets', path: '/FFresources/cheat-sheets', icon: <Layers className="w-4 h-4" /> },
      //   { label: 'Interview Prep', path: '/resources/interview-prep', icon: <Briefcase className="w-4 h-4" /> },
      //   { label: 'E-books', path: '/resources/ebooks', icon: <BookMarked className="w-4 h-4" /> },
      // ]
    },
    { label: 'Career', path: '/career' },
    {
      label: 'Projects',
      path: '/projects',
      // dropdown: [
      //   { label: 'Beginner Projects', path: '/projects/beginner', icon: <Rocket className="w-4 h-4" /> },
      //   { label: 'Intermediate Projects', path: '/projects/intermediate', icon: <FolderKanban className="w-4 h-4" /> },
      //   { label: 'Advanced Projects', path: '/projects/advanced', icon: <Award className="w-4 h-4" /> },
      //   { label: 'Project Showcase', path: '/projects/showcase', icon: <Trophy className="w-4 h-4" /> },
      // ]
    },
    // { label: 'Placements', path: '/placements' },
  ];

  const getDashboardPath = (role) => {
    switch (role) {
      case 'trainer': return '/trainer';
      case 'admin': return '/admin';
      case 'super-admin': return '/super-admin';
      default: return '/student-dashboard';
    }
  };

  // Small delay before closing so moving the mouse from the link to the
  // dropdown panel doesn't cause it to flicker shut.
  const handleMouseEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return false;

    return (
      course.courseName?.toLowerCase().includes(query) ||
      course.slug?.toLowerCase().includes(query)
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);

    setShowSearchResults(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-slate-50/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-purple-650" />
          <span className="text-xl font-bold tracking-tight text-white">
            SwordNex
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={() => item.dropdown && handleMouseLeave()}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-1.5 transition-colors hover:text-purple-650 ${location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                  ? 'text-purple-650 font-semibold'
                  : 'text-slate-700'
                  }`}
              >
                {item.icon}
                {item.label}
                {item.dropdown && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                  />
                )}
              </Link>

              {item.dropdown && openDropdown === item.label && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 z-50">
                  <div className="rounded-xl bg-white border border-slate-200 p-2 shadow-2xl">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-100 hover:text-purple-650 transition-colors"
                      >
                        <span className="text-purple-650">{sub.icon}</span>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search & Actions */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-650" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => {
              if (searchQuery.trim()) {
                setShowSearchResults(true);
              }
            }}
            placeholder="Search Courses..."
            className="w-48 lg:w-60 rounded-xl bg-white border border-slate-200 py-1.5 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all duration-300"
          />

          {showSearchResults && searchQuery.trim() && (
            <div className="absolute top-full left-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-2xl z-50 overflow-hidden">

              {filteredCourses.length > 0 ? (
                <div className="max-h-80 overflow-y-auto p-2">

                  {filteredCourses.slice(0, 6).map((course) => (
                    <Link
                      key={course.slug}
                      to={`/live-course/${course.slug}`}
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <div className="h-9 w-9 rounded-lg bg-purple-50 flex items-center justify-center">
                        {getCourseIcon(course.slug)}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {course.courseName}
                        </p>

                        <p className="text-xs text-slate-500">
                          View course
                        </p>
                      </div>
                    </Link>
                  ))}

                  <button
                    type="submit"
                    className="w-full mt-1 px-3 py-2.5 text-sm font-semibold text-purple-650 hover:bg-purple-50 rounded-lg text-left"
                  >
                    View all results for "{searchQuery}"
                  </button>

                </div>
              ) : (
                <div className="px-4 py-6 text-center">
                  <Search className="w-6 h-6 mx-auto text-slate-300 mb-2" />

                  <p className="text-sm font-semibold text-slate-700">
                    No courses found
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Try searching for React, Python, Java, etc.
                  </p>
                </div>
              )}

            </div>
          )}
        </form>

        {/* Cart Icon */}
        <Link to="/cart" className="relative p-2 text-slate-700 hover:text-purple-650 transition-colors">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-slate-900">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* Active Testing Role Switcher Badge */}
        {/* <div className="relative">
            <button 
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-purple-650 hover:bg-slate-100 transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              Role: <span className="capitalize text-slate-800">{user?.role || 'Guest'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {showRoleSelector && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 p-2 shadow-2xl z-50">
                <p className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1.5">Switch Mock Role</p>
                {['student', 'trainer', 'admin', 'super-admin'].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setShowRoleSelector(false);
                      navigate(getDashboardPath(r));
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs rounded-lg hover:bg-slate-100 transition-colors capitalize ${
                      user?.role === r ? 'text-purple-650 font-bold bg-slate-100' : 'text-slate-700'
                    }`}
                  >
                    {r.replace('-', ' ')}
                  </button>
                ))}
              </div>
            )}
          </div> */}

        {/* Auth State */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 rounded-xl p-1 text-slate-700 hover:text-purple-650 focus:outline-none"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 font-bold text-slate-900 shadow-md">
                {user.name.charAt(0)}
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 p-2 shadow-2xl z-50">
                <div className="px-3 py-2 border-b border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to={getDashboardPath(user.role)}
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4 text-purple-650" />
                    Dashboard
                  </Link>
                </div>
                <div className="border-t border-slate-200 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileDropdown(false);
                      navigate('/login');
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-secondary py-1.5 px-4 text-sm">
              Login
            </Link>
            <Link to="/register" className="btn-primary py-1.5 px-4 text-sm">
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile menu toggle */}
      <div className="flex items-center gap-2 lg:hidden">
        <Link to="/cart" className="relative p-2 text-slate-700 hover:text-purple-650 transition-colors">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-slate-900">
              {cartItems.length}
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-slate-200 p-2 text-slate-700 hover:bg-white"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>



      {/* Mobile Drawer menu */}
      {
        isOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-slate-50 px-4 pt-4 pb-6 space-y-3">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-650" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                placeholder="Search Courses..."
                className="w-full rounded-xl bg-white border border-slate-200 py-2 pl-9 pr-4 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              {showSearchResults && searchQuery.trim() && (
                <div className="mt-2 rounded-xl bg-white border border-slate-200 shadow-lg overflow-hidden">

                  {filteredCourses.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto p-2">

                      {filteredCourses.slice(0, 5).map((course) => (
                        <Link
                          key={course.slug}
                          to={`/live-course/${course.slug}`}
                          onClick={() => {
                            setSearchQuery('');
                            setShowSearchResults(false);
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-purple-50"
                        >
                          <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center">
                            {getCourseIcon(course.slug)}
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {course.courseName}
                          </span>
                        </Link>
                      ))}

                      <button
                        type="submit"
                        className="w-full text-left px-3 py-2 text-sm font-semibold text-purple-650 hover:bg-purple-50 rounded-lg"
                      >
                        View all results
                      </button>

                    </div>
                  ) : (
                    <p className="p-4 text-center text-sm text-slate-500">
                      No courses found
                    </p>
                  )}

                </div>
              )}
            </form>
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenMobileDropdown(
                            openMobileDropdown === item.label ? null : item.label
                          )
                        }
                        className="flex w-full items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-white"
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${openMobileDropdown === item.label ? 'rotate-180' : ''
                            }`}
                        />
                      </button>
                      {openMobileDropdown === item.label && (
                        <div className="ml-4 mt-1 mb-2 space-y-0.5 border-l border-slate-200 pl-3">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.path}
                              onClick={() => {
                                setIsOpen(false);
                                setOpenMobileDropdown(null);
                              }}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-white hover:text-purple-650"
                            >
                              {sub.icon}
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-white hover:text-white"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
              {/* Mobile Mock Role Selector */}
              <div className="bg-white border border-slate-200 rounded-xl p-3">
                <p className="text-xs font-bold text-purple-650 mb-2">Switch Test Role</p>
                <div className="grid grid-cols-2 gap-2">
                  {['student', 'trainer', 'admin', 'super-admin'].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setIsOpen(false);
                        navigate(getDashboardPath(r));
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs capitalize text-center ${user?.role === r
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                      {r.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to={getDashboardPath(user.role)}
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary text-center text-sm py-2"
                  >
                    Dashboard ({user.name})
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                      navigate('/login');
                    }}
                    className="btn-secondary border-rose-950 text-rose-400 text-center text-sm py-2 hover:bg-rose-950/20"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="btn-secondary text-center text-sm py-2">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary text-center text-sm py-2">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
      }
    </header >
  );
};

export default Navbar;