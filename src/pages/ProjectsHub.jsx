// import React, { useState, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   PlusCircle, ExternalLink, FileCode, CheckCircle, 
//   BarChart3, Users, Star, Award, Layers, Sparkles, FolderDot 
// } from 'lucide-react';

// const ProjectsHub = () => {
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [activeDifficulty, setActiveDifficulty] = useState('All');

//   // Submit project form states
//   const [subTitle, setSubTitle] = useState('');
//   const [subRepo, setSubRepo] = useState('');
//   const [subDemo, setSubDemo] = useState('');
//   const [subSuccess, setSubSuccess] = useState(false);

//   const categories = ['All', 'Web Development', 'Python', 'Java', 'AI & ML', 'Data Science', 'Full Stack'];
//   const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

//   const projectLibrary = [
//     {
//       id: 1,
//       title: 'E-Commerce Website',
//       tech: 'React • Node.js • MongoDB',
//       level: 'Advanced',
//       rating: 4.9,
//       category: 'Full Stack',
//     },
//     {
//       id: 2,
//       title: 'Real-Time Chat Application',
//       tech: 'React • Socket.io',
//       level: 'Intermediate',
//       rating: 4.8,
//       category: 'Web Development',
//     },
//     {
//       id: 3,
//       title: 'Student Management System',
//       tech: 'React • Express • MySQL',
//       level: 'Intermediate',
//       rating: 4.7,
//       category: 'Full Stack',
//     },
//     {
//       id: 4,
//       title: 'Task Management System',
//       tech: 'React • Firebase',
//       level: 'Beginner',
//       rating: 4.6,
//       category: 'Web Development',
//     },
//     {
//       id: 5,
//       title: 'AI Chatbot',
//       tech: 'Python • Machine Learning',
//       level: 'Advanced',
//       rating: 4.9,
//       category: 'AI & ML',
//     },
//     {
//       id: 6,
//       title: 'Weather Forecast App',
//       tech: 'HTML • CSS • JavaScript',
//       level: 'Beginner',
//       rating: 4.5,
//       category: 'Web Development',
//     }
//   ];

//   const filteredProjects = useMemo(() => {
//     return projectLibrary.filter(proj => {
//       const matchesCategory = activeCategory === 'All' || proj.category === activeCategory;
//       const matchesDifficulty = activeDifficulty === 'All' || proj.level === activeDifficulty;
//       return matchesCategory && matchesDifficulty;
//     });
//   }, [activeCategory, activeDifficulty]);

//   const handleSubmitProject = (e) => {
//     e.preventDefault();
//     if (!subTitle.trim() || !subRepo.trim()) return;
//     setSubSuccess(true);
//     setTimeout(() => {
//       setSubSuccess(false);
//       setSubTitle('');
//       setSubRepo('');
//       setSubDemo('');
//     }, 4000);
//   };

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">
      
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
//           <span>🚀 PROJECTS HUB</span>
//         </h1>
//         <p className="text-xs text-slate-500 mt-1">Build • Learn • Practice • Showcase</p>
//       </div>

//       {/* Categories & Difficulty Selector */}
//       <section className="space-y-4">
//         {/* Category Filters */}
//         <div className="flex flex-col gap-2">
//           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Category</span>
//           <div className="flex flex-wrap gap-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
//                   activeCategory === cat 
//                     ? 'bg-purple-600 text-slate-950 border-sky-400 font-bold' 
//                     : 'bg-white/50 border-slate-100 text-slate-650 '
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Difficulty Filters */}
//         <div className="flex flex-col gap-2">
//           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Difficulty</span>
//           <div className="flex gap-2">
//             {difficulties.map((diff) => (
//               <button
//                 key={diff}
//                 onClick={() => setActiveDifficulty(diff)}
//                 className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
//                   activeDifficulty === diff 
//                     ? 'bg-purple-50 border-indigo-500 text-purple-650' 
//                     : 'bg-white/50 border-slate-100 text-slate-500'
//                 }`}
//               >
//                 {diff === 'All' ? 'All Levels' : diff}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Project */}
//       <section className="relative rounded-3xl overflow-hidden border border-purple-200 bg-purple-600/[0.01] p-6 md:p-8">
//         <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-purple-50/50 blur-[80px]"></div>
        
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//           <div className="space-y-4 max-w-xl">
//             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-650 border border-purple-200">
//               <Sparkles className="w-3.5 h-3.5" />
//               🌟 FEATURED PROJECT
//             </span>
//             <h2 className="text-xl sm:text-2xl font-bold text-slate-900 uppercase">🛒 Full Stack E-Commerce Website</h2>
//             <p className="text-xs text-slate-650 leading-relaxed">
//               Build a complete online shopping application using React, Node.js, Express and MongoDB. Handle user authentication, database design, payment gateway checks, and admin controls.
//             </p>
            
//             <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-650 font-medium">
//               <div>Duration : <strong className="text-white">4 Weeks</strong></div>
//               <div>Level : <strong className="text-white">Advanced</strong></div>
//               <div>Mentor : <strong className="text-white">John David</strong></div>
//               <div>Skills : <strong className="text-purple-650">React • Node.js • MongoDB</strong></div>
//             </div>

//             <div className="flex gap-3 pt-2">
//               <Link to="/course/fsd" className="btn-secondary py-1.5 px-4 text-xs">
//                 [ View Details ]
//               </Link>
//               <button className="btn-primary py-1.5 px-4 text-xs">
//                 [ Start Project ]
//               </button>
//             </div>
//           </div>
//           <div className="h-32 w-full lg:w-48 rounded-2xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center text-slate-700 text-3xl font-bold">
//             💻 Mockup
//           </div>
//         </div>
//       </section>

//       {/* Project Library Grid */}
//       <section className="space-y-6">
//         <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
//           <FolderDot className="w-5 h-5 text-purple-650" />
//           <h2 className="text-lg font-bold text-slate-900 uppercase">📚 PROJECT LIBRARY</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProjects.map((proj) => (
//             <div 
//               key={proj.id}
//               className="p-5 rounded-2xl bg-white/40 border border-slate-100 hover:border-slate-200 transition-colors flex flex-col gap-4 text-xs"
//             >
//               <div className="space-y-1.5">
//                 <h3 className="font-bold text-slate-900 text-sm">🛒 {proj.title}</h3>
//                 <p className="text-slate-500">Technology : {proj.tech}</p>
//                 <p className="text-slate-500">Level : <span className="text-slate-700 font-semibold">{proj.level}</span></p>
//               </div>

//               <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-auto">
//                 <span className="text-amber-400 font-bold">⭐ {proj.rating} Rating</span>
//                 <button className="px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-purple-650 border border-slate-200 transition-colors text-xs font-semibold">
//                   [ View Project ]
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Features & Categories & Showcase */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Project categories checklist */}
//         <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
//           <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">🎯 PROJECT CATEGORIES</h3>
//           <ul className="space-y-2.5 text-xs text-slate-700">
//             <li className="flex items-center gap-2">💻 Web Development</li>
//             <li className="flex items-center gap-2">🌐 Full Stack Development</li>
//             <li className="flex items-center gap-2">🤖 Artificial Intelligence</li>
//             <li className="flex items-center gap-2">📱 Mobile App Development</li>
//             <li className="flex items-center gap-2">📊 Data Science</li>
//             <li className="flex items-center gap-2">☁ Cloud Computing</li>
//           </ul>
//         </div>

//         {/* Project features */}
//         <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
//           <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">📦 PROJECT FEATURES</h3>
//           <ul className="space-y-2.5 text-xs text-slate-650">
//             {['Complete Source Code', 'Video Tutorials', 'Project Documentation', 'Database Files', 'API Integration', 'Sample Output', 'Mentor Support', 'Completion Certificate'].map(feat => (
//               <li key={feat} className="flex items-center gap-2 text-slate-700">
//                 <span className="text-emerald-400">✔</span> {feat}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Student project showcase */}
//         <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
//           <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2 flex items-center gap-1.5">
//             <Award className="w-4 h-4 text-purple-650" />
//             <span>🏆 STUDENT PROJECT SHOWCASE</span>
//           </h3>
//           <div className="space-y-3 text-xs">
//             {[
//               { name: 'Rahul', desc: 'Food Delivery Website (React • Node.js)', award: 'Best Project Award' },
//               { name: 'Priya', desc: 'Hospital Management System (Java • MySQL)', award: 'Top Performer' },
//               { name: 'Arjun', desc: 'AI Attendance System (Python • OpenCV)', award: 'Innovation Award' }
//             ].map((show) => (
//               <div key={show.name} className="p-3 rounded-xl bg-slate-50/40 border border-slate-100 space-y-1.5">
//                 <div className="flex justify-between items-center font-bold text-slate-700">
//                   <span>👨 {show.name}</span>
//                   <span className="text-amber-500 font-mono text-[9px]">{show.award}</span>
//                 </div>
//                 <p className="text-slate-500 text-[10px]">{show.desc}</p>
//                 <button className="text-[9px] font-bold text-purple-650 hover:text-sky-300">[ View ]</button>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//       {/* Project Submission Form & Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
//         {/* Submit Form */}
//         <div className="md:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
//           <div className="border-b border-slate-200 pb-2">
//             <h3 className="text-xs font-bold uppercase tracking-wider text-purple-650 flex items-center gap-1.5">
//               <PlusCircle className="w-4 h-4 text-purple-650" />
//               <span>📤 SUBMIT YOUR PROJECT</span>
//             </h3>
//           </div>

//           <form onSubmit={handleSubmitProject} className="space-y-4 text-xs">
            
//             {subSuccess && (
//               <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-200 text-emerald-400 font-semibold">
//                 Project Submitted Successfully! Our mentor will review the codebase shortly.
//               </div>
//             )}

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <div className="space-y-1.5">
//                 <label className="font-semibold text-slate-650">Project Title</label>
//                 <input 
//                   type="text" 
//                   required
//                   placeholder="E-Commerce Website"
//                   value={subTitle}
//                   onChange={(e) => setSubTitle(e.target.value)}
//                   className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="font-semibold text-slate-650">GitHub Repository</label>
//                 <input 
//                   type="url" 
//                   required
//                   placeholder="https://github.com/.../repo"
//                   value={subRepo}
//                   onChange={(e) => setSubRepo(e.target.value)}
//                   className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="font-semibold text-slate-650">Live Demo URL</label>
//                 <input 
//                   type="url" 
//                   placeholder="https://live-demo.com"
//                   value={subDemo}
//                   onChange={(e) => setSubDemo(e.target.value)}
//                   className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1.5">
//               <label className="font-semibold text-slate-650">Upload Project File</label>
//               <div className="flex items-center gap-2">
//                 <input 
//                   type="file"
//                   className="file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border file:border-slate-200 file:bg-slate-50 file:text-slate-650 hover:file:text-white file:text-xs text-xs text-slate-500 cursor-pointer"
//                 />
//               </div>
//             </div>

//             <div className="pt-2">
//               <button type="submit" className="btn-primary py-2 px-5 text-xs">
//                 Submit Project
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Stats card */}
//         <div className="md:col-span-4 p-6 rounded-3xl bg-white/40 border border-slate-100 space-y-4">
//           <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2 flex items-center gap-1.5">
//             <BarChart3 className="w-4 h-4 text-purple-650" />
//             <span>📊 PROJECT STATISTICS</span>
//           </h3>
//           <div className="grid grid-cols-2 gap-4 text-xs">
//             <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
//               <p className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Projects Available</p>
//               <p className="text-base font-bold text-slate-900 mt-1">150+</p>
//             </div>
//             <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
//               <p className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Students Active</p>
//               <p className="text-base font-bold text-slate-900 mt-1">5000+</p>
//             </div>
//             <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
//               <p className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Completed Projects</p>
//               <p className="text-base font-bold text-slate-900 mt-1">1200+</p>
//             </div>
//             <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
//               <p className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Avg Rating</p>
//               <p className="text-base font-bold text-slate-900 mt-1">4.9</p>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Start Building Promo Banner footer */}
//       <section className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-100 p-8 text-center">
//         <div className="space-y-4 max-w-2xl mx-auto">
//           <h2 className="text-2xl font-bold text-slate-900 uppercase">🚀 START BUILDING REAL-WORLD PROJECTS</h2>
//           <p className="text-xs text-slate-650 leading-relaxed">
//             Learn by doing, improve your portfolio, and gain industry-ready experience. Work with expert trainers to debug, optimize, and present your code to global recruitment hubs.
//           </p>
//           <div className="pt-2">
//             <button className="btn-primary py-2 px-6 text-xs">
//               Explore Projects
//             </button>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default ProjectsHub;
// ProjectsHub.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { Clock, ChevronRight, ShoppingCart, Clapperboard, User } from 'lucide-react';

const filters = ['All Projects', 'Beginner', 'Intermediate', 'Advanced', 'Full Stack'];

// Update projects with unique IDs and slugs
const projects = [
  {
    id: 1,
    slug: 'full-stack-ecommerce',
    title: 'Full-Stack Ecommerce',
    desc: 'Build a complete e-commerce platform with Stripe integration, Redux state management, and an admin dashboard.',
    level: 'Advanced',
    tags: ['React', 'Node.js', 'MongoDB'],
    hours: '12 Hours',
    icon: <ShoppingCart className="w-10 h-10 text-white/90" />,
    gradient: 'from-indigo-500 to-purple-650',
    // Add more details for detail page
    mentor: 'Sarah Chen',
    mentorTitle: 'Senior Staff Engineer',
    price: '$199',
    duration: '6-8 Weeks',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL'],
    features: [
      { title: 'Cart & Checkout', desc: 'Robust state management for cart operations, integrated seamlessly with Stripe checkout sessions.' },
      { title: 'Admin Dashboard', desc: 'Secure CMS for managing products, viewing orders, and tracking revenue analytics.' }
    ]
  },
  {
    id: 2,
    slug: 'netflix-clone',
    title: 'Netflix Clone',
    desc: 'Create a responsive streaming UI pulling real movie data from TMDB API, featuring user authentication and my-list functionality.',
    level: 'Intermediate',
    tags: ['React', 'Firebase', 'Tailwind'],
    hours: '8 Hours',
    icon: <Clapperboard className="w-10 h-10 text-white/90" />,
    gradient: 'from-rose-500 to-orange-500',
    mentor: 'Michael Rodriguez',
    mentorTitle: 'Senior Frontend Developer',
    price: '$149',
    duration: '4-6 Weeks',
    techStack: ['React', 'Firebase', 'Tailwind CSS'],
    features: [
      { title: 'Movie Streaming UI', desc: 'Netflix-style interface with smooth animations and responsive design.' },
      { title: 'User Authentication', desc: 'Firebase authentication with login, signup, and profile management.' }
    ]
  },
  {
    id: 3,
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    desc: 'Design and build a personal portfolio to showcase your projects, featuring smooth animations and a contact form integration.',
    level: 'Beginner',
    tags: ['HTML/CSS', 'JavaScript', 'Framer Motion'],
    hours: '4 Hours',
    icon: <User className="w-10 h-10 text-white/90" />,
    gradient: 'from-sky-400 to-indigo-500',
    mentor: 'Emily Patel',
    mentorTitle: 'UX Designer',
    price: '$99',
    duration: '2-3 Weeks',
    techStack: ['HTML/CSS', 'JavaScript', 'Framer Motion'],
    features: [
      { title: 'Responsive Design', desc: 'Mobile-first design that looks great on all screen sizes.' },
      { title: 'Smooth Animations', desc: 'Framer Motion animations for engaging user experience.' }
    ]
  },
];

const ProjectsHub = () => {
  const [active, setActive] = useState('All Projects');
  const navigate = useNavigate(); // Initialize navigate

  const visibleProjects = active === 'All Projects'
    ? projects
    : projects.filter((p) => p.level === active || (active === 'Full Stack' && p.title.includes('Ecommerce')));

  // Navigate to project detail
  const handleProjectClick = (slug) => {
    navigate(`/projects/${slug}`);
  };

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-purple-650 px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Explore Real-World Projects</h1>
        <p className="mt-3 max-w-xl mx-auto text-sm text-purple-100 leading-relaxed">
          Master your skills by building production-ready applications. From simple components to full-stack architectures.
        </p>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-0 pt-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                active === f
                  ? 'bg-purple-650 text-white'
                  : 'bg-indigo-50 text-slate-650 hover:bg-indigo-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {visibleProjects.map((p) => (
            <div 
              key={p.id} 
              className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProjectClick(p.slug)} // Make entire card clickable
            >
              <div className={`relative h-40 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                {p.icon}
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  p.level === 'Advanced' ? 'bg-purple-100 text-purple-650' :
                  p.level === 'Intermediate' ? 'bg-sky-100 text-sky-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  {p.level}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[9px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock className="w-3 h-3" /> {p.hours}
                  </span>
                  <button 
                    className="text-[10px] font-bold text-purple-650 flex items-center gap-0.5 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent double navigation
                      handleProjectClick(p.slug);
                    }}
                  >
                    View Details <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-lg font-extrabold text-purple-650 leading-tight">SwordNex<br />Academy</h4>
            <p className="mt-3 text-[10px] text-slate-400">© 2024 SwordNex Academy. Mastery through Practice.</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-900">Explore</h5>
            <p className="text-xs text-slate-500">Curriculum</p>
            <p className="text-xs text-purple-650 font-semibold">Projects</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-900">Company</h5>
            <p className="text-xs text-slate-500">Pricing</p>
            <p className="text-xs text-slate-500">FAQ</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-900">Connect</h5>
            <p className="text-xs text-slate-500">Support</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default ProjectsHub;