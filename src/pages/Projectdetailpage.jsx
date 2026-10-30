// ProjectDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Gauge, 
    Clock, 
    Monitor, 
    ShoppingCart, 
    LayoutDashboard,
    ShieldCheck, 
    Palette, 
    MessageSquareCode, 
    Check, 
    Network,
    ArrowLeft,
    Clapperboard,
    User,
    Star,
    Users,
    Award,
    Code,
    Server,
    Database,
    Cloud,
    Lock,
    Zap,
    GitBranch,
    Terminal,
    Layers,
    Sparkles
} from 'lucide-react';

// Project data
const projects = [
    {
        id: 1,
        slug: 'full-stack-ecommerce',
        title: 'Full-Stack Ecommerce',
        shortDesc: 'Build a complete e-commerce platform with Stripe integration, Redux state management, and an admin dashboard.',
        desc: 'Build a complete e-commerce platform with Stripe integration, Redux state management, and an admin dashboard.',
        level: 'Advanced',
        tags: ['React', 'Node.js', 'MongoDB'],
        hours: '12 Hours',
        icon: <ShoppingCart className="w-10 h-10 text-white/90" />,
        gradient: 'from-indigo-500 to-purple-650',
        mentor: 'Sarah Chen',
        mentorTitle: 'Senior Staff Engineer',
        price: '$199',
        duration: '6-8 Weeks',
        techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
        features: [
            { title: 'Cart & Checkout', desc: 'Robust state management for cart operations, integrated seamlessly with Stripe checkout sessions.', icon: <ShoppingCart className="w-4 h-4 text-purple-650" /> },
            { title: 'Admin Dashboard', desc: 'Secure CMS for managing products, viewing orders, and tracking revenue analytics.', icon: <LayoutDashboard className="w-4 h-4 text-purple-650" /> },
            { title: 'Payment Processing', desc: 'Complete payment flow with Stripe integration including webhooks and payment confirmation.', icon: <ShieldCheck className="w-4 h-4 text-purple-650" /> },
            { title: 'User Authentication', desc: 'Secure authentication system with JWT tokens, password reset, and email verification.', icon: <Lock className="w-4 h-4 text-purple-650" /> }
        ],
        longDescription: 'This project is designed to bridge the gap between theoretical knowledge and production-ready implementation. You will build a complete, end-to-end ecommerce platform that handles real-world complexities like inventory management, secure authentication, and payment webhooks. We focus heavily on best practices, performance optimization, and architectural decisions that scale. By the end of this project, you will have a standout portfolio piece that demonstrates senior-level thinking.',
        whatYouLearn: [
            'Build a full-stack application from scratch',
            'Implement secure payment processing with Stripe',
            'Design and manage a PostgreSQL database',
            'Create RESTful APIs with Node.js and Express',
            'Build a responsive React frontend with Next.js',
            'Implement user authentication and authorization',
            'Deploy application to production',
            'Write clean, maintainable code'
        ],
        prerequisites: ['React Basics', 'REST APIs', 'Git', 'JavaScript ES6', 'Basic Node.js'],
        perks: ['Source Code Access', 'Figma Design Files', 'Mentor Code Review', 'Video Tutorials', 'Project Documentation'],
        stats: {
            students: '1,240+',
            rating: '4.9',
            reviews: '342',
            completed: '890+'
        }
    },
    {
        id: 2,
        slug: 'netflix-clone',
        title: 'Netflix Clone',
        shortDesc: 'Create a responsive streaming UI pulling real movie data from TMDB API, featuring user authentication and my-list functionality.',
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
        techStack: ['React', 'Firebase', 'Tailwind CSS', 'TMDB API'],
        features: [
            { title: 'Movie Streaming UI', desc: 'Netflix-style interface with smooth animations and responsive design.', icon: <Monitor className="w-4 h-4 text-purple-650" /> },
            { title: 'User Authentication', desc: 'Firebase authentication with login, signup, and profile management.', icon: <Lock className="w-4 h-4 text-purple-650" /> },
            { title: 'My List Feature', desc: 'Users can save their favorite movies and shows to a personalized list.', icon: <Star className="w-4 h-4 text-purple-650" /> },
            { title: 'Real Movie Data', desc: 'Integration with TMDB API to fetch real movie data including ratings and details.', icon: <Database className="w-4 h-4 text-purple-650" /> }
        ],
        longDescription: 'Build a fully functional Netflix clone with real movie data from TMDB API. Learn how to implement authentication, manage user sessions, and create a responsive streaming interface that works across all devices. You will master Firebase authentication, API integration, and state management with React hooks.',
        whatYouLearn: [
            'Create a Netflix-like user interface',
            'Integrate with TMDB API',
            'Implement Firebase authentication',
            'Manage state with React hooks',
            'Build responsive layouts with Tailwind CSS',
            'Handle API requests and responses',
            'Implement search and filter functionality',
            'Deploy to Firebase hosting'
        ],
        prerequisites: ['React Basics', 'CSS', 'JavaScript ES6', 'Git'],
        perks: ['Source Code Access', 'Video Tutorials', 'Mentor Code Review', 'Project Documentation', 'Design Assets'],
        stats: {
            students: '950+',
            rating: '4.8',
            reviews: '215',
            completed: '670+'
        }
    },
    {
        id: 3,
        slug: 'portfolio-website',
        title: 'Portfolio Website',
        shortDesc: 'Design and build a personal portfolio to showcase your projects, featuring smooth animations and a contact form integration.',
        desc: 'Design and build a personal portfolio to showcase your projects, featuring smooth animations and a contact form integration.',
        level: 'Beginner',
        tags: ['HTML/CSS', 'JavaScript', 'Framer Motion'],
        hours: '4 Hours',
        icon: <User className="w-10 h-10 text-white/90" />,
        gradient: 'from-sky-400 to-indigo-500',
        mentor: 'Emily Patel',
        mentorTitle: 'UX Designer & Developer',
        price: '$99',
        duration: '2-3 Weeks',
        techStack: ['HTML/CSS', 'JavaScript', 'Framer Motion', 'EmailJS'],
        features: [
            { title: 'Responsive Design', desc: 'Mobile-first design that looks great on all screen sizes.', icon: <Monitor className="w-4 h-4 text-purple-650" /> },
            { title: 'Smooth Animations', desc: 'Framer Motion animations for engaging user experience.', icon: <Sparkles className="w-4 h-4 text-purple-650" /> },
            { title: 'Contact Form', desc: 'Integrated contact form with EmailJS for handling submissions.', icon: <MessageSquareCode className="w-4 h-4 text-purple-650" /> },
            { title: 'Project Showcase', desc: 'Beautiful grid layout to display your work and achievements.', icon: <Award className="w-4 h-4 text-purple-650" /> }
        ],
        longDescription: 'Create a stunning personal portfolio that showcases your work and skills. Learn about responsive design principles, animation techniques, and how to integrate a contact form with email services. This project is perfect for beginners looking to create their first professional website.',
        whatYouLearn: [
            'Design a professional portfolio website',
            'Implement responsive design principles',
            'Create smooth animations with Framer Motion',
            'Build interactive UI components',
            'Integrate contact form with EmailJS',
            'Optimize website for performance',
            'Deploy to Vercel or Netlify',
            'Showcase projects effectively'
        ],
        prerequisites: ['HTML & CSS Basics', 'JavaScript Fundamentals'],
        perks: ['Source Code Access', 'Design Files', 'Video Tutorials', 'Mentor Review', 'Customization Guide'],
        stats: {
            students: '2,100+',
            rating: '4.7',
            reviews: '580',
            completed: '1,500+'
        }
    }
];

// Helper function to get level badge styles
const getLevelStyles = (level) => {
    const styles = {
        'Advanced': 'bg-purple-100 text-purple-650',
        'Intermediate': 'bg-sky-100 text-sky-600',
        'Beginner': 'bg-emerald-100 text-emerald-600'
    };
    return styles[level] || 'bg-gray-100 text-gray-600';
};

const ProjectDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find the project based on the slug
    const project = projects.find(p => p.slug === slug);

    // If project not found, show error or redirect
    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-6 p-8 max-w-md">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-2xl font-bold text-slate-900">Project Not Found</h1>
                    <p className="text-sm text-slate-500">The project you're looking for doesn't exist or may have been removed.</p>
                    <button 
                        onClick={() => navigate('/projects')}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-650 text-white text-sm font-semibold hover:bg-purple-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">

            {/* Back button */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
                <button 
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-purple-650 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    Back to Projects
                </button>
            </div>

            {/* Hero Section */}
            <section className={`bg-gradient-to-br ${project.gradient} px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                
                <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                            <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold border border-white/10`}>
                                <Gauge className="w-4 h-4" /> {project.level}
                            </span>
                            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold border border-white/10">
                                <Clock className="w-4 h-4" /> {project.duration}
                            </span>
                            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold border border-white/10">
                                <Users className="w-4 h-4" /> {project.stats.students} enrolled
                            </span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                            {project.title}
                        </h1>
                        
                        <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-lg">
                            {project.desc}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg border-2 border-white/30">
                                    {project.mentor.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Mentored by {project.mentor}</p>
                                    <p className="text-xs text-white/70">{project.mentorTitle}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-white/90">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold">{project.stats.rating}</span>
                                <span className="text-white/60 text-sm">({project.stats.reviews} reviews)</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-semibold border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <div className="rounded-3xl overflow-hidden shadow-2xl w-full max-w-md aspect-video bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center relative group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Monitor className="w-24 h-24 text-white/20 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white/70 text-xs font-semibold">
                                Project Preview
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="rounded-2xl bg-white border border-slate-100 shadow-lg grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="p-6 text-center">
                            <p className="text-2xl font-extrabold text-purple-650">{value}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                                {key === 'students' ? 'Students Enrolled' : 
                                 key === 'rating' ? 'Rating' :
                                 key === 'reviews' ? 'Reviews' :
                                 key === 'completed' ? 'Completed' : key}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Content */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column - Main Content */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Overview */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Layers className="w-6 h-6 text-purple-650" />
                            Project Overview
                        </h2>
                        <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed">
                            <p className="text-sm">{project.longDescription}</p>
                        </div>
                    </div>

                    {/* What You'll Learn */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Zap className="w-6 h-6 text-purple-650" />
                            What You'll Learn
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.whatYouLearn.map((item, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <Check className="w-4 h-4 text-purple-650 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-slate-600">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Star className="w-6 h-6 text-purple-650" />
                            Key Features
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.features.map((feature) => (
                                <div key={feature.title} className="p-4 rounded-xl bg-white border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all group">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-1">{feature.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Code className="w-6 h-6 text-purple-650" />
                            Technology Stack
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {project.techStack.map((tech) => (
                                <div key={tech} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
                                    <Server className="w-4 h-4 text-indigo-600" />
                                    <span className="text-sm font-semibold text-indigo-600">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Enrollment Card */}
                    <div className="sticky top-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-lg space-y-5">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Start Building</h3>
                            <p className="text-xs text-slate-500 mt-1">Get immediate access to the starter repo, design assets, and video guides.</p>
                        </div>
                        
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold text-purple-650">{project.price}</span>
                            <span className="text-xs text-slate-400">/ one-time</span>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-slate-900">What's Included:</h4>
                            <ul className="space-y-2">
                                {project.perks.map((perk) => (
                                    <li key={perk} className="flex items-start gap-2 text-xs text-slate-600">
                                        <Check className="w-4 h-4 text-purple-650 mt-0.5 flex-shrink-0" />
                                        <span>{perk}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="w-full py-3 px-4 rounded-xl bg-purple-650 text-white text-sm font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-100">
                            Enroll in Project
                        </button>

                        <p className="text-center text-[10px] text-slate-400">30-day money-back guarantee</p>
                    </div>

                    {/* Prerequisites Card */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-purple-650" />
                            Prerequisites
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.prerequisites.map((req) => (
                                <span key={req} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-semibold">
                                    {req}
                                </span>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-400">Don't worry, we'll guide you through everything!</p>
                    </div>

                    {/* Mentor Card */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
                        <h4 className="text-sm font-bold text-slate-900">Meet Your Mentor</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-base">
                                {project.mentor.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{project.mentor}</p>
                                <p className="text-xs text-slate-500">{project.mentorTitle}</p>
                            </div>
                        </div>
                        <button className="w-full py-2 px-4 rounded-xl bg-slate-50 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors border border-slate-200">
                            Ask a Question
                        </button>
                    </div>
                </div>
            </section>

            {/* Related Projects Section */}
            <section className="border-t border-slate-100 bg-slate-50/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
                        Explore More Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {projects
                            .filter(p => p.id !== project.id)
                            .slice(0, 3)
                            .map((relatedProject) => (
                                <div 
                                    key={relatedProject.id}
                                    className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all cursor-pointer"
                                    onClick={() => navigate(`/projects/${relatedProject.slug}`)}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${relatedProject.gradient} flex items-center justify-center`}>
                                            {relatedProject.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-650 transition-colors">
                                                {relatedProject.title}
                                            </h3>
                                            <span className={`text-[10px] font-semibold ${getLevelStyles(relatedProject.level)} px-2 py-0.5 rounded`}>
                                                {relatedProject.level}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2">{relatedProject.shortDesc}</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs font-bold text-purple-650">{relatedProject.price}</span>
                                        <button className="text-xs text-purple-650 font-semibold group-hover:underline">
                                            View Details →
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            {/* <footer className="border-t border-slate-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div className="col-span-2 sm:col-span-1">
                            <h4 className="text-lg font-extrabold text-purple-650 leading-tight">SwordNex<br />Academy</h4>
                            <p className="mt-3 text-[10px] text-slate-400">© 2024 SwordNex Academy. Mastery through Practice.</p>
                        </div>
                        <div className="space-y-2">
                            <h5 className="text-xs font-bold text-slate-900">Explore</h5>
                            <p className="text-xs text-slate-500">Curriculum</p>
                            <p className="text-xs text-purple-650 font-semibold">Projects</p>
                            <p className="text-xs text-slate-500">Courses</p>
                        </div>
                        <div className="space-y-2">
                            <h5 className="text-xs font-bold text-slate-900">Company</h5>
                            <p className="text-xs text-slate-500">About</p>
                            <p className="text-xs text-slate-500">Pricing</p>
                            <p className="text-xs text-slate-500">FAQ</p>
                        </div>
                        <div className="space-y-2">
                            <h5 className="text-xs font-bold text-slate-900">Connect</h5>
                            <p className="text-xs text-slate-500">Support</p>
                            <p className="text-xs text-slate-500">Community</p>
                            <p className="text-xs text-slate-500">Blog</p>
                        </div>
                    </div>
                </div>
            </footer> */}
        </div>
    );
};

export default ProjectDetailPage;