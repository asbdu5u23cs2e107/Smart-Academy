import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Target, Eye, Users, FolderCheck, Trophy, Star,
  CheckCircle, ArrowRight, Quote, Zap, Shield,
  BookOpen, Globe, TrendingUp, Heart
} from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STATS = [
  { value: "1K+", label: "Students Trained" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "100+", label: "Hiring Partners" },
  { value: "95%", label: "Placement Rate" },
];

const WHY_CHOOSE_US = [
  {
    icon: <Star className="w-5 h-5" />,
    title: "Live Interactive Classes",
    desc: "Attend real-time instructor-led sessions with live Q&A, code walkthroughs, and instant feedback for deeper understanding.",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Industry Curriculum",
    desc: "Our syllabus is built in collaboration with top-tier software companies, ensuring you learn exactly what the industry demands today.",
  },
  {
    icon: <FolderCheck className="w-5 h-5" />,
    title: "Hands-On Projects",
    desc: "Work on 2+ real-world projects per course to build an impressive developer portfolio that stands out to recruiters.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Proctored Assessments",
    desc: "Secure, AI-monitored assessments that validate your knowledge and prepare you for technical hiring challenges.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Career Mentorship",
    desc: "One-on-one mentorship, resume reviews, mock interviews, and direct referrals to our network of 100+ hiring partners.",
  },
];

const STUDENT_SUPPORT = [
  {
    icon: <Zap className="w-5 h-5 text-purple-600" />,
    title: "Doubt Clearing",
    desc: "Dedicated sessions every week to resolve your doubts with expert trainers. No question goes unanswered.",
  },
  {
    icon: <Globe className="w-5 h-5 text-indigo-500" />,
    title: "Community Access",
    desc: "Join our active learning community — share projects, collaborate on challenges, and grow together.",
  },
  {
    icon: <Heart className="w-5 h-5 text-rose-500" />,
    title: "24/7 Support",
    desc: "Our team is always available via chat and email to assist with technical, academic, or placement queries.",
  },
];

const TRAINERS = [
  {
    initials: "JD",
    name: "John David",
    role: "Full Stack & MERN Trainer",
    exp: "10+ Years",
    skills: "React • Node.js • MongoDB • AWS",
    rating: 5,
    gradient: "from-purple-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    initials: "PR",
    name: "Priya R.",
    role: "Python & AI/ML Trainer",
    exp: "7+ Years",
    skills: "Python • Django • TensorFlow • Data Science",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  },
  {
    initials: "KR",
    name: "Dr. Karthik R.",
    role: "Java & Spring Boot Trainer",
    exp: "12+ Years",
    skills: "Java • Spring Boot • JDBC • Microservices",
    rating: 5,
    gradient: "from-sky-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
  },
];

const CORE_VALUES = [
  { icon: "🎯", title: "Excellence", desc: "We hold ourselves to the highest standard of quality in everything we teach." },
  { icon: "🤝", title: "Integrity", desc: "Honest, transparent relationships with every student, trainer, and partner." },
  { icon: "🚀", title: "Innovation", desc: "Constantly evolving our curriculum to stay ahead of industry trends." },
  { icon: "💡", title: "Curiosity", desc: "We foster a culture where questions are celebrated and exploration is encouraged." },
];

const TESTIMONIALS = [
  {
    name: "Arjun K.",
    role: "Full Stack Developer @ Zoho",
    comment:
      "SwordNex completely transformed my career. The live coding sessions and real-world projects gave me the confidence to crack my first job interview in just 3 months.",
    rating: 5,
    avatar: "AK",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    name: "Meena R.",
    role: "Python Developer @ TCS",
    comment:
      "The proctored assessments and mock interviews were game-changers. I felt fully prepared on Day 1 of my job. Best investment I ever made.",
    rating: 5,
    avatar: "MR",
    gradient: "from-pink-400 to-rose-500",
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const AboutUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-20">

      {/* ── HERO ──────────────────────────── */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-100 bg-white/10 p-8 md:p-12 text-center">
        <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-purple-50/60 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-60 w-60 rounded-full bg-indigo-50/40 blur-[80px]" />

        <div className="space-y-5 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold uppercase tracking-widest">
            Empowering Students Through Smart Learning
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            About Us:{" "}
            <span className="text-gradient">SwordNex</span>
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            SwordNex is a next-generation ed-tech platform dedicated to providing high-quality, practical, and industry-relevant tech education — empowering every student to land their dream career.
          </p>
        </div>

        {/* Hero Image Row */}
        <div className="mt-8 relative rounded-2xl overflow-hidden border border-slate-200 max-w-3xl mx-auto h-48 bg-gradient-to-br from-purple-100 via-indigo-50 to-slate-50 flex items-center justify-center">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">👩‍💻</div>
              <span className="text-xs text-slate-600 font-medium">Students</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-purple-200">SA</div>
              <span className="text-xs text-slate-600 font-bold">SwordNex</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 to-sky-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">🚀</div>
              <span className="text-xs text-slate-600 font-medium">Careers</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-1">
              <p className="text-2xl font-extrabold text-purple-600">{stat.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Image */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&auto=format&fit=crop&q=80"
              alt="SwordNex classroom"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-bold shadow">
                🎓 Our Story
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Who We Are</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 uppercase">
              Built for Learners,<br />By Industry Experts
            </h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            SwordNex was founded with one clear goal — to democratize quality tech education. We combine live instructor-led classes, real-world project experience, and AI-powered assessments to create a learning environment that truly prepares students for the modern job market.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Target className="w-4 h-4 text-purple-600" />, title: "Our Mission", desc: "Bridge the gap between traditional learning and global industry requirements." },
              { icon: <Eye className="w-4 h-4 text-indigo-500" />, title: "Our Vision", desc: "Build a world-class platform that helps every student unlock their dream career." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-white/40 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────── */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-2xl font-bold text-slate-900 uppercase">What Makes Us Different</h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white/40 border border-slate-100 hover:border-purple-200 hover:bg-white/70 hover:shadow-sm transition-all duration-300"
            >
              <div className="h-9 w-9 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STUDENT SUPPORT BANNER ────────── */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-50 border border-purple-100 p-8 md:p-10">
        <div className="absolute top-0 right-0 -z-10 h-40 w-40 rounded-full bg-purple-200/30 blur-[60px]" />
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs text-purple-600 font-bold uppercase tracking-widest">Putting Students First</span>
          <h2 className="text-2xl font-bold text-slate-900 uppercase">Student Support System</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STUDENT_SUPPORT.map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                {item.icon}
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEET THE TRAINERS ─────────────── */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Our Faculty</span>
          <h2 className="text-2xl font-bold text-slate-900 uppercase">Meet Your Trainers</h2>
          <p className="text-xs text-slate-500">Learn from the best — certified experts with real industry experience.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TRAINERS.map((trainer) => (
            <div key={trainer.name} className="p-6 rounded-2xl bg-white/40 border border-slate-100 hover:border-purple-200 hover:shadow-md hover:shadow-purple-100/30 transition-all duration-300 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="h-14 w-14 rounded-xl object-cover border-2 border-purple-200 shadow-md"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{trainer.name}</h3>
                  <p className="text-[10px] text-purple-600 font-semibold">{trainer.role}</p>
                  <p className="text-[10px] text-slate-500">{trainer.exp} Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(trainer.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[10px] text-slate-500 border-t border-slate-100 pt-3">{trainer.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUCCESS NUMBERS DARK BANNER ───── */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 p-8 md:p-12">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 20%, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Success Numbers That<br />Speak for Themselves
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-[10px] text-white/70 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Slide */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm space-y-4">
              <Quote className="w-6 h-6 text-white/60" />
              <p className="text-sm text-white/90 leading-relaxed italic">
                {TESTIMONIALS[activeTestimonial].comment}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/20">
                <div>
                  <p className="font-bold text-white text-xs">{TESTIMONIALS[activeTestimonial].name}</p>
                  <p className="text-[10px] text-white/60">{TESTIMONIALS[activeTestimonial].role}</p>
                </div>
                <div className="flex gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2 rounded-full transition-all ${i === activeTestimonial ? "w-5 bg-white" : "w-2 bg-white/40"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ───────────────────── */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">What Drives Us</span>
          <h2 className="text-2xl font-bold text-slate-900 uppercase">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORE_VALUES.map((val) => (
            <div
              key={val.title}
              className="p-6 rounded-2xl bg-white/40 border border-slate-100 hover:border-purple-200 hover:shadow-sm transition-all duration-300 text-center space-y-3"
            >
              <span className="text-4xl">{val.icon}</span>
              <h3 className="font-bold text-slate-900 text-sm">{val.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────── */}
      <section className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 relative overflow-hidden text-center space-y-5">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative space-y-5">
          <h2 className="text-2xl font-extrabold text-white">
            Start Your Journey at SwordNex
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Join thousands of students who have already transformed their careers with us. Your future starts today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/courses" className="px-6 py-2.5 rounded-xl bg-white text-purple-700 font-bold text-sm hover:bg-purple-50 transition-colors flex items-center gap-2">
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="px-6 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
