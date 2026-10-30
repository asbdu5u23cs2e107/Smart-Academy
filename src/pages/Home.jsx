import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Users, UserCheck, Code, Globe,
  Server, Brain, BarChart2, Star, CheckCircle,
  FileSignature, HelpCircle, Laptop, Award, ShieldCheck,
  Quote, Video, Sparkles,
  Cloud, Megaphone, Smartphone, Shield, GraduationCap,
  Rocket, Mail, Phone, Building2, ChevronLeft, ChevronRight
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // Hero live-class photo carousel
  const heroImages = [
    {
      src: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=900&auto=format&fit=crop&q=80',
      alt: 'Live group video class in session',
    },
    {
      src: 'https://images.unsplash.com/photo-1616531770192-6eaea74c2456?w=900&auto=format&fit=crop&q=80',
      alt: 'Student attending a live online class on a laptop',
    },
    {
      src: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=900&auto=format&fit=crop&q=80',
      alt: 'Learner wearing headphones during a live session',
    },
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    const revealTimer = setTimeout(() => setHeroVisible(true), 50);
    return () => {
      clearInterval(timer);
      clearTimeout(revealTimer);
    };
  }, []);

  // "Digital Competency Platform" — mirrors the pill-grid of domains
  const competencies = [
    { name: 'Generative AI', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'AI & Machine Learning', icon: <Brain className="w-4 h-4" /> },
    { name: 'Full Stack Development', icon: <Server className="w-4 h-4" /> },
    { name: 'Data Engineering', icon: <BarChart2 className="w-4 h-4" /> },
    { name: 'Cloud – AWS, Azure, GCP', icon: <Cloud className="w-4 h-4" /> },
    { name: 'Digital Marketing', icon: <Megaphone className="w-4 h-4" /> },
    { name: 'Mobile App Development', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Programming', icon: <Code className="w-4 h-4" /> },
    { name: 'Cybersecurity', icon: <Shield className="w-4 h-4" /> },
  ];

  const featuredCourses = [
    {
      id: 'fsd',
      title: 'Full Stack Development',
      tag: 'Online',
      category: 'Frontend',
      desc: 'Learn complete frontend, backend and database development with MERN stack.',
      rating: 5,
      reviews: 1420,
      duration: '6 Months',
      price: 30000,
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80',
      badge: 'Popular',
    },
    {
      id: 'python-fs',
      title: 'Python Full Stack',
      tag: 'Online Only',
      category: 'Programming',
      desc: 'Master Python OOP, Django framework, and modern SQL databases.',
      rating: 5,
      reviews: 980,
      duration: '4 Months',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80',
      badge: 'Featured',
    },
    {
      id: 'java-dev',
      title: 'Java Developer Bootcamp',
      tag: 'Online Only',
      category: 'Programming',
      desc: 'Deep dive into Core Java, multi-threading, Spring Boot and cloud deployments.',
      rating: 4.8,
      reviews: 820,
      duration: '5 Months',
      price: 28000,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      badge: 'Bestseller',
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      tag: 'Pro Course',
      category: 'AI & ML',
      desc: 'Build and deploy real models — from regression basics to deep learning.',
      rating: 4.9,
      reviews: 540,
      duration: '5 Months',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
      badge: 'New',
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps Essentials',
      tag: 'Online',
      category: 'Cloud',
      desc: 'AWS, Docker, Kubernetes and CI/CD pipelines, taught with hands-on labs.',
      rating: 4.7,
      reviews: 610,
      duration: '3 Months',
      price: 22000,
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80',
      badge: 'Trending',
    },
    {
      id: 'data-science',
      title: 'Data Science & Analytics',
      tag: 'Online Only',
      category: 'Data',
      desc: 'SQL, Power BI, and Python analytics for real business datasets.',
      rating: 4.8,
      reviews: 460,
      duration: '4 Months',
      price: 26000,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      badge: 'Featured',
    },
  ];

  const achievements = [
    { value: '60K+', label: 'Learners Trained', icon: <Users className="w-6 h-6 text-emerald-400" /> },
    { value: '500+', label: 'Live Batches Delivered', icon: <Video className="w-6 h-6 text-emerald-400" /> },
    { value: '80+', label: 'Instructors & Mentors', icon: <UserCheck className="w-6 h-6 text-emerald-400" /> },
    { value: '10K+', label: 'Careers Transformed', icon: <Rocket className="w-6 h-6 text-emerald-400" /> },
  ];

  const steps = [
    { num: '01', title: 'Register', desc: 'Create your account and select your role.' },
    { num: '02', title: 'Choose Course', desc: 'Explore industry-ready pathways.' },
    { num: '03', title: 'Make Payment', desc: 'Unlock access with lifetime materials.' },
    { num: '04', title: 'Start Learning', desc: 'Join daily proctored live classes.' },
    { num: '05', title: 'Complete Course', desc: 'Build 2+ professional projects.' },
    { num: '06', title: 'Get Certificate', desc: 'Unlock job-placement assistance.' },
  ];

  const placementSupport = [
    { title: 'Career Support', desc: '1-on-1 mentorship sessions with top industry professionals to map your career growth.', icon: <Award className="w-5 h-5 text-purple-650" /> },
    { title: 'Resume Building', desc: 'Construct a standout professional resume and optimize your GitHub/LinkedIn portfolios.', icon: <FileSignature className="w-5 h-5 text-purple-650" /> },
    { title: 'Mock Interviews', desc: 'Participate in rigorous technical and HR mock panels to build absolute confidence.', icon: <HelpCircle className="w-5 h-5 text-purple-650" /> },
    { title: 'Placement Training', desc: 'Solve extensive aptitude series, logic tests, and industry-standard coding tasks.', icon: <Laptop className="w-5 h-5 text-emerald-400" /> },
  ];

  const testimonials = [
    {
      name: 'Thirumathi C.',
      role: 'DevOps Engineer',
      quote: 'The DevOps certification course balances theory with hands-on labs really well. If you\'re serious about the field, it\'s worth the time.',
      initials: 'TC',
      company: 'Amazon',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Shiva A.',
      role: 'Frontend Developer',
      quote: 'I completed the React and MERN tracks back to back. Having source code for every session made revising concepts so much easier.',
      initials: 'SA',
      company: 'TCS',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Selva Kumar',
      role: 'Full Stack Developer',
      quote: 'Learning in a language I\'m comfortable with made everything click faster. The React path alone leveled up my career.',
      initials: 'SK',
      company: 'Infosys',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Seetha L.',
      role: 'Cloud Architect',
      quote: 'I was a homemaker returning to tech after a long gap. The mentor\'s teaching style rebuilt my confidence step by step.',
      initials: 'SL',
      company: 'Accenture',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Rajesh K.',
      role: 'Data Scientist',
      quote: 'The AI/ML program gave me practical skills that I could immediately apply at work. The projects were challenging but rewarding.',
      initials: 'RK',
      company: 'Cognizant',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Priya M.',
      role: 'Software Engineer',
      quote: 'The Full Stack Development course was comprehensive and well-structured. I got placed within 2 months of completion.',
      initials: 'PM',
      company: 'Wipro',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&auto=format&fit=crop&q=80'
    },
  ];

  // Partner companies with logos (text-based for now, you can replace with actual image URLs)
  const partners = [
    { name: 'Capgemini', color: 'from-red-500 to-red-600' },
    { name: 'TCS', color: 'from-blue-500 to-blue-600' },
    { name: 'Tata Consultancy', color: 'from-purple-500 to-purple-600' },
    { name: 'Wipro', color: 'from-green-500 to-green-600' },
    { name: 'Cognizant', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Infosys', color: 'from-indigo-500 to-indigo-600' },
  ];

  // State for scroll animations
  const [statsVisible, setStatsVisible] = useState(false);
  const [statsCounts, setStatsCounts] = useState([0, 0, 0, 0]);

  // Testimonial Carousel State
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !statsVisible) {
          setStatsVisible(true);
          const targetValues = [50, 100, 100, 5000];
          targetValues.forEach((target, index) => {
            let current = 0;
            const increment = Math.ceil(target / 40);
            const interval = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(interval);
              }
              setStatsCounts(prev => {
                const newCounts = [...prev];
                newCounts[index] = current;
                return newCounts;
              });
            }, 30);
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsVisible]);

  // Auto-play testimonial carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        handleNextTestimonial();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonialIndex, isTransitioning]);

  const handlePrevTestimonial = () => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNextTestimonial = () => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setTestimonialIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Get visible testimonials (3 at a time for card view)
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (testimonialIndex + i) % testimonials.length;
      items.push({ ...testimonials[index], index });
    }
    return items;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="space-y-24 pb-20">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-10 lg:pt-10">
        <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-purple-50 blur-[80px]"></div>
        <div className="absolute bottom-10 right-1/4 -z-10 h-96 w-96 rounded-full bg-purple-50 blur-[100px]"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div
              className={`lg:col-span-6 flex flex-col gap-6 text-center lg:text-left transition-all duration-700 ease-out ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="inline-flex items-center gap-1.5 self-center lg:self-start px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-650 border border-purple-200">
                <Star className="w-3.5 h-3.5 fill-current" />
                Upskill · Reskill · Get Hired
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                Accelerate Your Career With<br className="hidden sm:inline" />
                <span className="text-gradient">Hands-On Mentorship.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-650 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Start your tech journey with real-world practice, live proctored classes, and industry-ready guidance from mentors who've done the job.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
                <Link to="/courses" className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center">
                  Find Courses
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/register" className="btn-secondary w-full sm:w-auto text-center justify-center">
                  Join Now
                </Link>
              </div>
            </div>

            <div
              className={`lg:col-span-6 relative flex justify-center transition-all duration-700 delay-150 ease-out ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-full max-w-lg p-2 rounded-3xl bg-white/50 border border-slate-200 shadow-2xl backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-slate-900 group">
                  {heroImages.map((img, i) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                        i === heroIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-slate-200 text-[10px] text-red-500 font-bold uppercase tracking-wider">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                    Live Class
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 border border-slate-200 rounded-xl p-2.5 flex items-center gap-2 shadow-xl backdrop-blur">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <div className="text-[10px] text-slate-700">
                      <p className="font-bold text-slate-900 leading-none">AI Proctoring</p>
                      <p className="text-slate-500 mt-0.5">Enabled</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="bg-white/90 border border-slate-200 rounded-xl p-2.5 flex items-center gap-2 shadow-xl backdrop-blur">
                      <Users className="w-4 h-4 text-purple-650" />
                      <div className="text-[10px] text-slate-700">
                        <p className="font-bold text-slate-900 leading-none">Vishali</p>
                        <p className="text-slate-500 mt-0.5">Trainer Online</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {heroImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setHeroIndex(i)}
                          aria-label={`Show slide ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === heroIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-lg px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center transform transition-all duration-700 hover:scale-[1.02]">
          {[
            { value: statsCounts[0], label: 'Online Courses', icon: '📚', color: 'from-purple-200 to-purple-100' },
            { value: statsCounts[1], label: 'Expert Instructors', icon: '👨‍🏫', color: 'from-indigo-200 to-indigo-100' },
            { value: statsCounts[2], label: 'Certifications', icon: '🎓', color: 'from-blue-200 to-blue-100' },
            { value: statsCounts[3], label: 'Active Learners', icon: '👥', color: 'from-sky-200 to-sky-100' },
          ].map((stat, index) => (
            <div 
              key={index}
              className={`flex flex-col gap-1 transition-all duration-500 transform ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {stat.value}+
                </span>
              </div>
              <span className="text-xs text-white/90 uppercase tracking-wider font-semibold">
                {stat.label}
              </span>
              <div className={`mt-2 h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${stat.color} opacity-70`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Digital Competency Platform */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-650">Digital Competency Platform</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Focused Exclusively On In-Demand Skills
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {competencies.map((c, index) => (
            <Link
              key={c.name}
              to={`/courses?category=${c.name}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/40 border border-slate-100 hover:border-purple-200 hover:bg-purple-50 text-slate-700 hover:text-purple-650 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {c.icon}
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* About / Learn Anywhere panel */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white/40 border border-slate-100 shadow-lg p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center overflow-hidden transition-all duration-500 hover:shadow-xl">
          <div className="absolute top-0 right-0 -z-0 h-64 w-64 rounded-full bg-purple-50/60 blur-[70px]"></div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl flex items-center justify-center transform transition-all duration-500 hover:scale-105 hover:rotate-3">
              <GraduationCap className="w-24 h-24 text-white/90" />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-2 animate-bounce-slow">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <div className="text-left">
                  <p className="text-sm font-extrabold text-slate-900 leading-none">4.8</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Ratings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Empowering Learners With Job-Ready Skills
            </h2>
            <p className="text-sm text-slate-650 leading-relaxed">
              Learn and grow from anywhere, at your own pace, with a curriculum built around what employers actually ask for.
            </p>
            <ul className="space-y-3">
              {[
                'Learn offline with downloadable session recordings',
                'Job-focused learning paths, not generic playlists',
                'Upskill across AI, Python, Cloud, and Full Stack',
                'Topic-wise practice sets for focused preparation',
              ].map((item, index) => (
                <li 
                  key={item} 
                  className="flex items-start gap-3 text-sm text-slate-700 transition-all duration-300 hover:translate-x-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Job Ready Programs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-650">Popular Courses</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Job Ready Programs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white/40 border border-slate-100 hover:border-slate-200 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden bg-slate-50">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase bg-purple-600 text-white shadow-md transform transition-all duration-300 group-hover:scale-105">
                  {course.badge}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-50/90 backdrop-blur text-purple-650 border border-slate-200">
                  {course.tag}
                </span>
              </div>

              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">{course.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-650 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-650 line-clamp-2 leading-relaxed">
                    {course.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-650">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="font-bold text-slate-800">{course.rating}</span>
                  <span>({course.reviews} reviews)</span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-lg font-extrabold text-slate-900">
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                  <Link
                    to={`/course/${course.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-purple-650 border border-slate-200 transition-all duration-300 hover:shadow-md hover:border-purple-300"
                  >
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/courses" className="btn-secondary inline-flex items-center gap-2 transition-all duration-300 hover:scale-105">
            Browse More Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Achievements / Counters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 px-8 py-12 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/3 -z-0 h-64 w-64 rounded-full bg-purple-600/20 blur-[100px]"></div>
          {achievements.map((a, index) => (
            <div 
              key={a.label} 
              className="relative z-10 flex flex-col items-center text-center gap-2 transition-all duration-500 hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20">
                {a.icon}
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{a.value}</span>
              <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">{a.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-3 mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="text-slate-650 max-w-lg mx-auto text-sm">
            Our systematic learning pipeline guides you from registration to professional career placement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
          <div className="hidden lg:block absolute top-10 left-12 right-12 h-0.5 bg-slate-200 -z-10"></div>

          {steps.map((step, index) => (
            <div 
              key={step.num} 
              className="flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="relative mb-4">
                <div className="h-14 w-14 rounded-2xl bg-white border-2 border-slate-200 text-purple-650 flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:border-purple-500 group-hover:shadow-lg group-hover:scale-110">
                  {step.num}
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-purple-650 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-slate-500 leading-normal max-w-[150px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - Card Carousel */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-12">
          <div className="space-y-3 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-650">Testimonials</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What Our Students Have To Say
            </h2>
          </div>
          <div className="flex items-center gap-3 self-center sm:self-auto">
            <button
              onClick={handlePrevTestimonial}
              className="p-2 rounded-full bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-600 hover:text-purple-650 transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextTestimonial}
              className="p-2 rounded-full bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-600 hover:text-purple-650 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border border-slate-100 shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-200 ${
                  isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                style={{ 
                  transitionDelay: `${idx * 100}ms`,
                  transitionProperty: 'all',
                  transitionDuration: '500ms'
                }}
              >
                {/* Quote and Rating */}
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 text-purple-650 opacity-60" />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-sm text-slate-650 leading-relaxed mb-6 line-clamp-4">
                  "{testimonial.quote}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {testimonial.initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{testimonial.name}</p>
                    <p className="text-xs text-purple-650 font-medium">{testimonial.role}</p>
                    <p className="text-xs text-slate-400 mt-0.5">● {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning && index !== testimonialIndex) {
                    setIsTransitioning(true);
                    setTestimonialIndex(index);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === testimonialIndex 
                    ? 'w-8 bg-purple-600' 
                    : 'w-2 bg-purple-200 hover:bg-purple-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-3">
            <span className="text-xs text-slate-400 font-medium">
              {testimonialIndex + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </section>

      {/* Placement Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-50 via-white to-purple-50 border border-slate-100 p-8 md:p-12 shadow-2xl transition-all duration-500 hover:shadow-3xl">
          <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-purple-50/50 blur-[60px]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" />
                Placement Guaranteed Training
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Dedicated Career Placement Support
              </h2>
              <p className="text-sm text-slate-650 leading-relaxed">
                We provide a fully integrated career launchpad. We build your profile, run mock interviews, sharpen your aptitude, and directly present you to top companies.
              </p>
              <div className="pt-2">
                <Link to="/placements" className="btn-primary inline-flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105">
                  Visit Placement Cell
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {placementSupport.map((support, index) => (
                <div
                  key={support.title}
                  className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 hover:bg-white/40 transition-all duration-500 space-y-3 hover:shadow-lg hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    {support.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {support.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {support.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-650">Get In Touch</span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <a href="mailto:info@example.com" className="flex items-center gap-2 text-slate-900 font-bold text-lg hover:text-purple-650 transition-all duration-300 hover:scale-105">
              <Mail className="w-5 h-5 text-purple-650" />
              info@example.com
            </a>
            <span className="hidden sm:block text-slate-300">or</span>
            <a href="tel:+911234567890" className="flex items-center gap-2 text-slate-900 font-bold text-lg hover:text-purple-650 transition-all duration-300 hover:scale-105">
              <Phone className="w-5 h-5 text-emerald-400" />
              WhatsApp: +91 12345 67890
            </a>
          </div>
        </div>
      </section>

      {/* Certificate CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 md:px-16 md:py-16 text-center shadow-2xl transition-all duration-500 hover:shadow-3xl">
          <div className="absolute top-0 left-1/3 -z-0 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 -z-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold !text-white leading-tight">
              Your Next Skill Is One Batch Away
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join a live batch this week, learn alongside a mentor, and walk away with a certificate that means something.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/register" className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center transition-all duration-300 hover:scale-105">
                Join Our Community
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/courses" className="w-full sm:w-auto text-center justify-center px-6 py-3 rounded-xl border border-slate-700 text-slate-200 text-sm font-semibold hover:bg-slate-800 transition-all duration-300 hover:scale-105">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - SCROLLING VERSION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-650">Our Partners</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Our Learners Work At Top Companies
          </h2>
        </div>

        <div className="overflow-hidden relative">
          <div 
            className="flex"
            style={{
              animation: 'scroll 20s linear infinite',
              width: 'max-content'
            }}
            onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
          >
            {/* Double the partners for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-[calc(100%/2)] sm:w-[calc(100%/3)] md:w-[calc(100%/4)] lg:w-[calc(100%/6)] p-2"
              >
                <div
                  className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-200"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="relative p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-6 h-6 text-purple-650" />
                    </div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-purple-650 transition-colors duration-300">
                      {partner.name}
                    </p>
                    <div className="mt-2 h-0.5 w-8 bg-purple-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
            <ShieldCheck className="w-4 h-4 text-purple-650" />
            <span className="text-xs font-semibold text-purple-650">
              Trusted by 500+ companies worldwide
            </span>
          </div>
        </div>
      </section>

      {/* Keyframes for scroll animation */}
      <style >{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </div>
  );
};

export default Home;


