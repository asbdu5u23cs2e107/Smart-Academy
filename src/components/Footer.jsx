import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { 
  GraduationCap, Mail, Phone, MapPin, CheckCircle2, ChevronRight, ChevronDown 
} from 'lucide-react';

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  const sections = [
    {
      title: 'COURSES',
      links: [
        { label: 'Full Stack Development', path: '/course/fsd' },
        { label: 'Python Programming', path: '/courses' },
        { label: 'Java Development', path: '/courses' },
        { label: 'AI & Machine Learning', path: '/courses' },
        { label: 'Data Science', path: '/courses' },
      ],
    },
    {
      title: 'LEARNING',
      links: [
        { label: 'Live Classes', path: '/live-classes' },
        { label: 'Practice Platform', path: '/practice' },
        { label: 'Online Exams', path: '/student-dashboard' },
        { label: 'Assignments', path: '/student-dashboard' },
        { label: 'Certificates', path: '/certificates' },
      ],
    },
    // {
    //   title: 'CAREER',
    //   links: [
    //     { label: 'Placement Support', path: '/placements' },
    //     // { label: 'Resume Builder', path: '/career' },
    //     { label: 'Mock Interviews', path: '/placements' },
    //     { label: 'Aptitude Training', path: '/career' },
    //     { label: 'Job Opportunities', path: '/placements' },
    //   ],
    // },
    {
      title: 'COMPANY',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Our Trainers', path: '/trainerspage' },
        { label: 'Careers', path: '/about' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'FAQs', path: '/faq' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'PDF Notes', path: '/resources' },
        { label: 'Video Tutorials', path: '/resources' },
        { label: 'PPT Files', path: '/resources' },
        { label: 'Coding Files', path: '/resources' },
        { label: 'Interview Questions', path: '/resources' },
      ],
    },
    {
      title: 'STUDENT',
      links: [
        { label: 'Student Dashboard', path: '/student-dashboard' },
        { label: 'My Courses', path: '/student-dashboard' },
        { label: 'Payment History', path: '/student-dashboard' },
        { label: 'Progress Tracking', path: '/student-dashboard' },
        { label: 'Download Certificates', path: '/certificates' },
      ],
    },
  ];
  // const [openFAQ, setOpenFAQ] = useState(null);

// const faqs = [
//   {
//     question: "What courses does SwordNex offer?",
//     answer:
//       "SwordNex offers Full Stack Development, Python, Java, AI & Machine Learning, Data Science and other technology courses."
//   },
//   {
//     question: "How can I enroll in a course?",
//     answer:
//       "Students can select a course, register, complete payment and start learning from the student dashboard."
//   },
//   {
//     question: "Do you provide certificates?",
//     answer:
//       "Yes, certificates will be provided after completing all lessons and passing the final assessment."
//   },
//   {
//     question: "Are live classes available?",
//     answer:
//       "Yes, students can attend live classes with expert trainers and interact during sessions."
//   },
//   {
//     question: "How can I contact support?",
//     answer:
//       "You can contact our support team through email or contact page for any queries."
//   }
// ];

  const features = [
    'Expert Trainers', 'Industry Projects', 'AI Monitoring',
    'Live Classes', 'Lifetime Access', 'Placement Assistance',
    'Certificates', 'Coding Practice', 'Career Guidance'
  ];

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-100 pt-16 pb-8 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-650">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-slate-500 hover:text-purple-650 transition-colors flex items-center group text-xs"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all mr-1 text-purple-650" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
{/* FAQ Section */}
{/* <div className="mb-12">

  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-650 mb-5">
    Frequently Asked Questions
  </h3>

  <div className="grid md:grid-cols-2 gap-4">

    {faqs.map((faq, index) => (
      <div 
        key={index}
        className="bg-white rounded-xl border border-slate-200 p-4"
      >

        <button
          onClick={() =>
            setOpenFAQ(openFAQ === index ? null : index)
          }
          className="w-full flex justify-between items-center text-left"
        >

          <span className="text-sm font-semibold text-slate-700">
            {faq.question}
          </span>

          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openFAQ === index ? "rotate-180" : ""
            }`}
          />

        </button>


        {openFAQ === index && (
          <p className="mt-3 text-xs text-slate-500 leading-5">
            {faq.answer}
          </p>
        )}

      </div>
    ))}

  </div>

</div> */}
        {/* Divider */}
        <div className="h-px bg-white w-full mb-12"></div>

        {/* Contact and Follow Us Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Logo & Intro */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-purple-650" />
              <span className="text-xl font-bold tracking-tight text-white">
                SwordNex
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Empowering learners with industry-aligned skills, expert-led live batches, interactive practice playgrounds, and complete placement opportunities.
            </p>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-650">CONTACT</h3>
            <ul className="flex flex-col gap-2.5 text-slate-500 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-650 flex-shrink-0" />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-650 flex-shrink-0" />
                <a href="mailto:support@swordnex.com" className="hover:text-purple-650 transition-colors">support@swordnex.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-650 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Social media links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-650">FOLLOW US</h3>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-650 hover:text-purple-650 hover:bg-slate-100 transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-650 hover:text-rose-500 hover:bg-slate-100 transition-all">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-650 hover:text-pink-500 hover:bg-slate-100 transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-650 hover:text-blue-500 hover:bg-slate-100 transition-all">
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white w-full mb-8"></div>

        {/* Features Checklist */}
        <div className="mb-8 bg-white/40 border border-slate-100 rounded-2xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-650 mb-4 flex items-center gap-2">
            <span>🎯 OUR FEATURES</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-1.5 text-xs text-slate-650">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-650 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright and Legal Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/60 text-xs text-slate-500">
          <span>&copy; 2026 SwordNex. All Rights Reserved.</span>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#" className="hover:text-purple-650 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-650 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-purple-650 transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-purple-650 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
