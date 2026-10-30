import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, MapPin, Clock, ChevronRight, Search,
  Heart, Coffee, Monitor, Globe, Gift, Users,
  GraduationCap, CheckCircle, ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const JOB_OPENINGS = [
  {
    id: 1,
    title: "Full Stack Developer Trainer",
    type: "Full-Time",
    mode: "Hybrid",
    location: "Chennai",
    department: "Teaching",
    experience: "3+ Years",
    postedDaysAgo: 2,
    tags: ["React", "Node.js", "MongoDB"],
    hot: true,
  },
  {
    id: 2,
    title: "Python & AI Trainer",
    type: "Contract",
    mode: "Remote",
    location: "Remote",
    department: "Teaching",
    experience: "2+ Years",
    postedDaysAgo: 5,
    tags: ["Python", "Django", "AI/ML"],
    hot: true,
  },
  {
    id: 3,
    title: "Frontend Developer",
    type: "Full-Time",
    mode: "On-site",
    location: "Chennai",
    department: "Engineering",
    experience: "2+ Years",
    postedDaysAgo: 1,
    tags: ["React", "TypeScript", "CSS"],
    hot: false,
  },
  {
    id: 4,
    title: "Academic Counselor",
    type: "Full-Time",
    mode: "On-site",
    location: "Chennai",
    department: "Sales",
    experience: "Fresher",
    postedDaysAgo: 3,
    tags: ["Communication", "CRM", "Sales"],
    hot: false,
  },
  {
    id: 5,
    title: "UI/UX Designer",
    type: "Full-Time",
    mode: "Hybrid",
    location: "Chennai",
    department: "Design",
    experience: "2+ Years",
    postedDaysAgo: 7,
    tags: ["Figma", "Adobe XD", "Prototyping"],
    hot: false,
  },
  {
    id: 6,
    title: "DevOps Engineer",
    type: "Full-Time",
    mode: "Remote",
    location: "Remote",
    department: "Engineering",
    experience: "3+ Years",
    postedDaysAgo: 4,
    tags: ["Docker", "AWS", "CI/CD"],
    hot: false,
  },
];

const DEPARTMENTS = ["All", "Teaching", "Engineering", "Design", "Sales"];

const FEATURES = [
  { icon: "🎓", title: "Career Growth", desc: "We actively invest in your professional advancement, ensuring you always move forward." },
  { icon: "🧪", title: "Exam Prep", desc: "Work alongside industry experts and gain exposure to the most in-demand technologies." },
  { icon: "🎤", title: "Learn The Ecosystem", desc: "Our trainers stay aligned with industry-leading scholars and enterprise-level practices." },
  { icon: "🧑‍💻", title: "Continuous Learning", desc: "We value a culture where every person is committed to learning something new every day." },
  { icon: "🌐", title: "Privacy Commitment", desc: "A place of trust where confidentiality is maintained and ethical standards are upheld." },
  { icon: "📈", title: "Career Development", desc: "Tailored mentorship plans and learning roadmaps to take your skills to the next level." },
];

const PROCESS_STEPS = [
  { icon: "📝", step: "Apply", sub: "Submit your application" },
  { icon: "📋", step: "Resume Review", sub: "Evaluated in 48 hrs" },
  { icon: "🛠️", step: "Tech Interview", sub: "Domain-specific round" },
  { icon: "🤝", step: "HR Discussion", sub: "Culture & fit" },
  { icon: "🎉", step: "Hire", sub: "Welcome to Academy" },
];

const PERKS = [
  { icon: <Heart className="w-6 h-6" />, label: "Comprehensive Leave", color: "text-rose-500" },
  { icon: <Coffee className="w-6 h-6" />, label: "Health Insurance", color: "text-amber-500" },
  { icon: <Monitor className="w-6 h-6" />, label: "Learning Budget", color: "text-purple-600" },
  { icon: <Globe className="w-6 h-6" />, label: "Work From Home", color: "text-blue-500" },
  { icon: <Gift className="w-6 h-6" />, label: "Performance Bonus", color: "text-emerald-500" },
  { icon: <Users className="w-6 h-6" />, label: "Collaborative", color: "text-indigo-500" },
];

const TRAINER_STATS = [
  { value: "10K+", label: "Students Taught" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "150+", label: "Hiring Partners" },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const CareerHub = () => {
  const [activeDept, setActiveDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedId, setAppliedId] = useState(null);

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const matchDept = activeDept === "All" || job.department === activeDept;
    const matchSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchDept && matchSearch;
  });

  const handleApply = (id) => {
    setAppliedId(id);
    setTimeout(() => setAppliedId(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-20">

      {/* ── HERO ──────────────────────────── */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-100 bg-white/10 p-8 md:p-12">
        <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-purple-50/60 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-60 w-60 rounded-full bg-indigo-50/40 blur-[80px]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold uppercase tracking-widest">
              We are Hiring!
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Build Your Career{" "}
              <span className="text-gradient">@ SwordNex</span>
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
              Join our mission to educate and upskill thousands of students across the country.
              Help us shape the future of learning by joining SwordNex&apos;s growing team.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#openings" className="btn-primary flex items-center gap-2 text-sm">
                View Open Positions
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#trainer" className="btn-secondary flex items-center gap-2 text-sm">
                Become a Trainer
              </a>
            </div>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-purple-100/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  SA
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">SwordNex</p>
                  <p className="text-xs text-slate-500">Empowering educators since 2021</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {TRAINER_STATS.map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <p className="font-extrabold text-purple-600 text-base">{s.value}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">
                🌟 Rated #1 ed-tech employer in Tamil Nadu 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN US ───────────────────── */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
            Why Join SwordNex
          </span>
          <h2 className="text-2xl font-bold text-slate-900 uppercase">More Than Just a Job</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-white/40 border border-slate-100 hover:border-purple-200 hover:bg-white/70 hover:shadow-md hover:shadow-purple-100/30 transition-all duration-300 space-y-3"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-bold text-slate-900 text-sm">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HIRING PROCESS ────────────────── */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Our Hiring Process</span>
          <h2 className="text-xl font-bold text-slate-900 uppercase">Getting Onboard is Simple</h2>
          <p className="text-xs text-slate-500">
            Starting your journey with us is easy — follow these steps to find your future here.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 flex-wrap">
          {PROCESS_STEPS.map((step, idx) => (
            <React.Fragment key={step.step}>
              <div className="flex flex-col items-center text-center gap-2 p-5">
                <div className="h-14 w-14 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-2xl shadow-md shadow-purple-100/30">
                  {step.icon}
                </div>
                <p className="font-bold text-slate-900 text-xs uppercase tracking-wide">{step.step}</p>
                <p className="text-[10px] text-slate-500">{step.sub}</p>
              </div>
              {idx < PROCESS_STEPS.length - 1 && (
                <ChevronRight className="w-5 h-5 text-purple-300 hidden sm:block flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── TRAINER BANNER ────────────────── */}
      <section
        id="trainer"
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 p-8 md:p-10"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-white/80" />
              <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">Trainer Program</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Share Your Knowledge,<br />Impact Thousands of Learners
            </h2>
            <ul className="space-y-2 text-sm text-white/90">
              {[
                "Teach industry-relevant courses",
                "Create and manage interactive sessions",
                "Inspire students from around the globe",
                "Earn competitive and rewarding pay",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-2 px-6 py-2.5 rounded-xl bg-white text-purple-700 font-bold text-sm hover:bg-purple-50 transition-colors">
              Apply as Trainer
            </button>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm space-y-4 w-full max-w-xs">
              <p className="text-white font-bold text-sm">Empowering educators since 2021</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {TRAINER_STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-extrabold text-white text-lg">{s.value}</p>
                    <p className="text-[10px] text-white/70">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOB OPENINGS ──────────────────── */}
      <section id="openings" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Now Hiring</span>
            <h2 className="text-2xl font-bold text-slate-900 uppercase mt-1">Career Openings</h2>
            <p className="text-xs text-slate-500 mt-1">
              Find the role that matches your ambitions and join our growing team.
            </p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search roles or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-300"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${activeDept === dept
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No openings found matching your search.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-white/40 border border-slate-100 hover:border-purple-200 hover:bg-white/70 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                      {job.hot && (
                        <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[9px] font-bold uppercase tracking-wider">
                          🔥 Hot
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-[9px] font-semibold uppercase">
                        {job.department}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-semibold uppercase">
                        {job.type}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-semibold">
                        {job.mode}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> {job.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Posted {job.postedDaysAgo}d ago
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {appliedId === job.id ? (
                      <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-200 text-emerald-600 text-xs font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Applied!
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApply(job.id)}
                        className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5"
                      >
                        Apply Now
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── PERKS & BENEFITS ──────────────── */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Perks & Benefits</span>
          <h2 className="text-2xl font-bold text-slate-900 uppercase">We Take Care of Our Team</h2>
          <p className="text-xs text-slate-500">
            We make sure all of our employees are well taken care of to help them do their best work.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PERKS.map((perk) => (
            <div
              key={perk.label}
              className="p-5 rounded-2xl bg-white/40 border border-slate-100 hover:border-purple-200 hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center gap-3"
            >
              <span className={perk.color}>{perk.icon}</span>
              <p className="text-xs font-semibold text-slate-700">{perk.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────── */}
      <section className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 relative overflow-hidden text-center space-y-5">
        <div className="absolute top-0 left-0 -z-10 h-40 w-40 rounded-full bg-purple-50 blur-[60px]" />
        <div className="absolute bottom-0 right-0 -z-10 h-40 w-40 rounded-full bg-indigo-50 blur-[60px]" />
        <h2 className="text-2xl font-bold text-slate-900">
          Ready To Start Your Career With SwordNex?
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          We are a community of learners. We help each other and celebrate every achievement together to keep growing.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#openings" className="btn-primary flex items-center gap-2 text-sm">
            Explore Jobs
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link to="/contact" className="btn-secondary text-sm">
            Contact HR
          </Link>
        </div>
      </section>

    </div>
  );
};

export default CareerHub;
