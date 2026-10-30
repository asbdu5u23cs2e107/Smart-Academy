// Dynamic Course Data for SwordNex Live Classes
export const courses = [
  {
    id: "react-js",
    slug: "react-js",
    courseName: "React JS",
    shortTitle: "React JS Development",
    subtitle: "Master Modern Frontend Web Development & Single Page Applications",
    category: "Frontend Development",
    rating: 4.9,
    reviewCount: 1840,
    duration: "3 Months",
    level: "Beginner to Advanced",
    language: "English",
    studentsEnrolled: "12,500+",
    mentorName: "Rohan Sharma",
    mentorExperience: "8+ Years in UI Engineering",
    bannerImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&auto=format&fit=crop&q=80",
    description: "Build robust, scalable, and lightning-fast web applications using React JS. Master hooks, state management, routing, and APIs through live hands-on projects.",
    longDescription: "Our Live React JS certification course is designed to take you from a Javascript developer to a professional frontend engineer. You will learn modern React features, including state management with Redux Toolkit, client-side routing, integration with REST APIs, and production deployment on Vercel.",
    price: 15000,
    offerPrice: 9999,
    discount: "33% OFF",
    certificate: "Industry-recognized certificate from SwordNex",
    placementSupport: "100% Placement Assistance with resume reviews & mock interviews",
    downloadCurriculum: "/curriculum/react-js-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "Live Interactive Classes",
      "Expert Mentors",
      "Real-Time Projects",
      "Placement Support"
    ],
    highlights: [
      "35+ Hours of Live Instruction",
      "6 Real-World Capstone Projects",
      "Resume Prep & LinkedIn Makeover",
      "SwordNex Verified Certificate",
      "Lifetime Access to Recorded Sessions",
      "Active Peer & Mentor Discord Support"
    ],
    curriculum: [
      {
        moduleName: "Module 1: React Introduction",
        topics: [
          "Understanding Single Page Applications (SPA)",
          "React vs. Angular vs. Vue",
          "Setting up the Development Environment (Node, NPM, Vite)",
          "First React App structure and workflow"
        ]
      },
      {
        moduleName: "Module 2: JSX & Components",
        topics: [
          "Understanding JSX syntax and expression embedding",
          "Functional Components vs. Class Components",
          "Creating and nesting custom components",
          "Styling React components using CSS and Tailwind CSS"
        ]
      },
      {
        moduleName: "Module 3: Props & State",
        topics: [
          "Passing data via component Props",
          "PropTypes validation",
          "Understanding internal component State",
          "State vs. Props: Differences and best practices"
        ]
      },
      {
        moduleName: "Module 4: Hooks",
        topics: [
          "Introduction to React Hooks",
          "Working with useState and useEffect",
          "Handling side effects and component lifecycles",
          "Building custom hooks for reusable logic"
        ]
      },
      {
        moduleName: "Module 5: Forms",
        topics: [
          "Controlled vs. Uncontrolled Components",
          "Handling form input events",
          "Form validation strategies",
          "Integration with React Hook Form"
        ]
      },
      {
        moduleName: "Module 6: Routing",
        topics: [
          "React Router DOM configuration",
          "Defining client-side routes, nested routes",
          "URL Parameters and useParams Hook",
          "Programmatic navigation using useNavigate"
        ]
      },
      {
        moduleName: "Module 7: Axios API Integration",
        topics: [
          "HTTP methods (GET, POST, PUT, DELETE)",
          "Fetching data with Axios inside useEffect",
          "Handling loading states and error boundaries",
          "Using async/await in React data fetching"
        ]
      },
      {
        moduleName: "Module 8: Redux Toolkit",
        topics: [
          "Global state management concepts",
          "Setting up Redux Store and Slices",
          "Dispatching actions and using useSelector",
          "Handling async actions with Redux Thunk"
        ]
      },
      {
        moduleName: "Module 9: Authentication",
        topics: [
          "Implementing JWT authentication flows",
          "Creating protected routes in React Router",
          "Managing session states and token storage"
        ]
      },
      {
        moduleName: "Module 10: Deployment",
        topics: [
          "Vite build optimization",
          "Deploying React applications to Vercel, Netlify, and GitHub Pages",
          "Configuring redirects for client-side routing"
        ]
      }
    ],
    projects: [
      {
        title: "Student Management Portal",
        desc: "A dashboard for tracking student enrollment, grades, and fee payments.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
        tech: ["React", "Tailwind CSS", "Context API"]
      },
      {
        title: "E-Commerce Website",
        desc: "Full checkout experience featuring catalog browsing, shopping cart, and filter options.",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80",
        tech: ["React", "Redux Toolkit", "Stripe API"]
      },
      {
        title: "Hospital Management System",
        desc: "Appointment scheduler, doctor dashboard, and patient medical record registry.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
        tech: ["React", "Axios", "Node.js"]
      },
      {
        title: "Developer Portfolio",
        desc: "An interactive personal website featuring project showcases, experience timeline, and contact form.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        tech: ["React", "Framer Motion", "Tailwind"]
      },
      {
        title: "Admin Analytics Dashboard",
        desc: "An admin panel featuring real-time graphical data, user management controls, and activity logs.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        tech: ["React", "Recharts", "Redux"]
      },
      {
        title: "Real-time Chat Application",
        desc: "An instant messaging platform supporting private rooms and group chats.",
        image: "https://images.unsplash.com/photo-1611605698335-8b15d27e03f9?w=600&auto=format&fit=crop&q=80",
        tech: ["React", "Socket.io", "Express"]
      }
    ],
    tools: ["VS Code", "Vite", "Git", "GitHub", "Chrome DevTools", "Postman"],
    technologies: ["React", "JavaScript", "Vite", "Tailwind CSS", "Axios", "Redux Toolkit", "React Router", "Git", "GitHub", "REST API"],
    careerRoles: [
      "React Developer",
      "Frontend Developer",
      "UI Developer",
      "JavaScript Developer",
      "Software Engineer"
    ],
    benefits: [
      "Lifetime Access to Resources",
      "Recorded Videos & Materials",
      "Full Project Source Code",
      "Syllabus Study Notes",
      "Top Interview Questions PDF",
      "Verified Course Certificate",
      "Private Discord Channel Access",
      "Hands-on Coding Exercises"
    ],
    prerequisites: [
      "Basic understanding of HTML and CSS",
      "Core familiarity with JavaScript (Variables, Functions, Arrays, Objects)",
      "ES6 basics (Arrow functions, destructuring, modules) is helpful but covered in class"
    ],
    faqs: [
      {
        question: "Is this course suitable for absolute beginners in coding?",
        answer: "While we start from React fundamentals, you should have a basic understanding of JavaScript concepts like functions, loops, and objects. If you need a refresher, we provide basic JS modules as pre-reads."
      },
      {
        question: "Do you offer placement referrals after course completion?",
        answer: "Yes, SwordNex offers full placement support, including resume reviews, mock interviews, and direct referrals to our 100+ hiring partners."
      },
      {
        question: "Can I watch recordings if I miss a live session?",
        answer: "Absolutely! Recording of every live class is uploaded to your student dashboard within 24 hours. You have lifetime access to these videos."
      }
    ]
  },
  {
    id: "angular",
    slug: "angular",
    courseName: "Angular",
    shortTitle: "Angular Masterclass",
    subtitle: "Build Enterprise-Grade Robust Client-Side Web Applications",
    category: "Frontend Development",
    rating: 4.8,
    reviewCount: 950,
    duration: "3 Months",
    level: "Intermediate to Advanced",
    language: "English",
    studentsEnrolled: "6,200+",
    mentorName: "Deepak Verma",
    mentorExperience: "9+ Years in Enterprise UI Architectures",
    bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80",
    description: "Deep dive into TypeScript, RxJS, Modules, Components, Directives, Pipes, Services, Dependency Injection, and Routing in Angular.",
    longDescription: "Learn to build high-performance, enterprise-ready web applications using Angular. The curriculum covers TypeScript foundations, Angular CLI, reactive forms, state management, HTTP requests, and structural directives.",
    price: 16000,
    offerPrice: 10999,
    discount: "31% OFF",
    certificate: "Verified Certification from SwordNex",
    placementSupport: "Corporate hiring referrals and soft-skills preparation",
    downloadCurriculum: "/curriculum/angular-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "Live Sessions",
      "Corporate Projects",
      "RxJS Deep Dive",
      "Mock Interviews"
    ],
    highlights: [
      "40 Hours of Live Lectures",
      "4 Capstone Enterprise Apps",
      "TypeScript from Scratch",
      "Interview Cracking Modules",
      "Lifetime Video Access"
    ],
    curriculum: [
      {
        moduleName: "Module 1: TypeScript Basics & Setup",
        topics: [
          "Introduction to TypeScript, types, interfaces",
          "Classes, inheritance, and decorators",
          "Setting up Angular CLI",
          "Angular folder structures and entry files"
        ]
      },
      {
        moduleName: "Module 2: Angular Components & Directives",
        topics: [
          "Creating components manually and via CLI",
          "Component templates and CSS scoping",
          "Built-in Directives: *ngIf, *ngFor, ngClass",
          "Building Custom Directives"
        ]
      },
      {
        moduleName: "Module 3: Data Binding & Pipes",
        topics: [
          "Property Binding and Event Binding",
          "Two-way data binding with ngModel",
          "Understanding custom and built-in Pipes",
          "Pure vs Impure pipes"
        ]
      },
      {
        moduleName: "Module 4: Services & Dependency Injection",
        topics: [
          "Creating services to share business logic",
          "Understanding Injectors and Providers hierarchical architecture",
          "Injecting services across components"
        ]
      },
      {
        moduleName: "Module 5: Observables & RxJS",
        topics: [
          "Introduction to Reactive Programming",
          "RxJS Operators: map, filter, switchMap, debounceTime",
          "Managing subscription memory leaks"
        ]
      },
      {
        moduleName: "Module 6: Routing & Navigation",
        topics: [
          "Configuring RouterModule and routes",
          "Route parameters and query parameters",
          "Route Guards for authentication (CanActivate)",
          "Lazy Loading modules for performance"
        ]
      }
    ],
    projects: [
      {
        title: "Enterprise HR Dashboard",
        desc: "A comprehensive internal tracking portal for large corporate HR departments.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
        tech: ["Angular", "TypeScript", "RxJS"]
      },
      {
        title: "B2B SaaS Inventory Tracker",
        desc: "An inventory system supporting stock updates, vendor directories, and audit reports.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        tech: ["Angular", "RxJS", "Tailwind CSS"]
      }
    ],
    tools: ["VS Code", "Angular CLI", "Node.js", "Chrome DevTools", "Git"],
    technologies: ["Angular", "TypeScript", "RxJS", "Angular CLI", "Karma", "Jasmine", "Tailwind CSS", "REST API", "Git"],
    careerRoles: [
      "Angular Developer",
      "Frontend Engineer",
      "UI Architect",
      "Software Developer"
    ],
    benefits: [
      "Lifetime Reference Material Access",
      "Project Code Repositories",
      "Resume Enhancement Guides",
      "Corporate Recruitment Opportunities"
    ],
    prerequisites: [
      "Familiarity with HTML5, CSS3",
      "Strong conceptual grasp of Javascript functions and ES6 concepts"
    ],
    faqs: [
      {
        question: "Does this course cover TypeScript?",
        answer: "Yes! Since Angular is built entirely on TypeScript, we dedicate the initial module of the course to TypeScript syntax, types, and object-oriented patterns."
      }
    ]
  },
  {
    id: "java",
    slug: "java",
    courseName: "Java",
    shortTitle: "Java Backend Development",
    subtitle: "Master Enterprise Backend Software Engineering with Java & Spring Boot",
    category: "Backend Development",
    rating: 4.8,
    reviewCount: 2200,
    duration: "4 Months",
    level: "Beginner to Advanced",
    language: "English",
    studentsEnrolled: "14,000+",
    mentorName: "Amit Patel",
    mentorExperience: "12+ Years Lead Backend Engineer",
    bannerImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&auto=format&fit=crop&q=80",
    description: "Learn Core Java, Advanced OOP, JDBC, Hibernate, Spring Core, and Spring Boot to build robust enterprise microservices.",
    longDescription: "Master backend software development using Java. This live course covers everything from basic variable declarations to OOP principles, Maven dependency manager, database ORM using Hibernate, and API creation using Spring Boot.",
    price: 18000,
    offerPrice: 11999,
    discount: "33% OFF",
    certificate: "Verified Certification from SwordNex",
    placementSupport: "Dedicated job referrals and interview prep sessions",
    downloadCurriculum: "/curriculum/java-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "Core & Advanced Java",
      "Spring Boot APIs",
      "Microservices Architecture",
      "Live Databases"
    ],
    highlights: [
      "55 Hours of Live Mentorship",
      "8 backend capstones",
      "Database configurations (SQL & Hibernate)",
      "Unit testing with JUnit",
      "SwordNex Verified Certificate"
    ],
    curriculum: [
      {
        moduleName: "Module 1: Java Basics & OOP Principles",
        topics: [
          "Java Virtual Machine (JVM) internals",
          "Data types, operators, loops, arrays",
          "Classes, Objects, Methods, Constructors",
          "Inheritance, Polymorphism, Abstraction, Encapsulation"
        ]
      },
      {
        moduleName: "Module 2: Collections & Exception Handling",
        topics: [
          "List, Set, Map interfaces and implementation classes",
          "Generics in Java",
          "Checked vs Unchecked Exceptions",
          "Creating Custom Exceptions"
        ]
      },
      {
        moduleName: "Module 3: Database & JDBC Integration",
        topics: [
          "SQL Query Basics",
          "Connecting Java to Database via JDBC",
          "Statement and PreparedStatement usage",
          "ResultSet parsing"
        ]
      },
      {
        moduleName: "Module 4: Hibernate & JPA Basics",
        topics: [
          "Understanding ORM (Object Relational Mapping)",
          "Hibernate Configuration & Entity Mapping",
          "CRUD operations using SessionFactory",
          "HQL (Hibernate Query Language)"
        ]
      },
      {
        moduleName: "Module 5: Spring Boot & REST APIs",
        topics: [
          "Spring Core IoC container & Dependency Injection",
          "Creating REST controllers in Spring Boot",
          "Handling Request Methods, PathVariables, QueryParams",
          "Connecting JPA Data Repositories"
        ]
      }
    ],
    projects: [
      {
        title: "E-Commerce Backend",
        desc: "A backend service featuring user registration, database catalog indexing, and order checkouts.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=80",
        tech: ["Java", "Spring Boot", "MySQL", "Hibernate"]
      },
      {
        title: "Employee Leave Portal Backend",
        desc: "An internal corporate API for managing employee data, leaves, approvals, and departments.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
        tech: ["Java", "Spring Boot", "PostgreSQL"]
      }
    ],
    tools: ["Eclipse/IntelliJ", "Maven", "Postman", "Git", "MySQL Workbench"],
    technologies: ["Java", "Spring Boot", "Hibernate", "JPA", "SQL Server", "Maven", "JUnit", "PostgreSQL", "Git"],
    careerRoles: [
      "Java Backend Developer",
      "Software Engineer",
      "Spring Boot Developer",
      "System Architect"
    ],
    benefits: [
      "Access to backend template projects",
      "Syllabus notes and reference codes",
      "Mock interviews and interview cheatsheets"
    ],
    prerequisites: [
      "Basic mathematical logic and algorithm foundations",
      "No prior coding experience is strictly required"
    ],
    faqs: [
      {
        question: "Do you teach databases in this course?",
        answer: "Yes, we cover SQL databases, schema designs, JDBC, JPA, and Hibernate ORM in detail before jumping into Spring Boot."
      }
    ]
  },
  {
    id: "python",
    slug: "python",
    courseName: "Python",
    shortTitle: "Python Development & Scripting",
    subtitle: "Learn Python from Scratch to Advanced Automation & Web Apps",
    category: "Backend Development",
    rating: 4.9,
    reviewCount: 3100,
    duration: "3 Months",
    level: "Beginner to Advanced",
    language: "English",
    studentsEnrolled: "18,500+",
    mentorName: "Sneha Reddy",
    mentorExperience: "7+ Years Python Developer",
    bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format&fit=crop&q=80",
    description: "Master variables, loops, data structures, libraries, OOP, Web scraping, and Django/Flask frameworks.",
    longDescription: "Learn one of the world's most popular and versatile programming languages. From writing simple automated scripts to creating full-scale web applications using Django, this course covers everything dynamic Python developers need.",
    price: 14000,
    offerPrice: 8999,
    discount: "35% OFF",
    certificate: "SwordNex Verified Python Certification",
    placementSupport: "HR and tech screening assistance",
    downloadCurriculum: "/curriculum/python-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "Interactive Python Coding",
      "Automation Scripts",
      "Django Web Dev",
      "Career Support"
    ],
    highlights: [
      "32+ Hours of Live Classes",
      "5 Web & Scripting Projects",
      "Basics to OOP logic structures",
      "GitHub profile reviews",
      "24/7 Slack assistance"
    ],
    curriculum: [
      {
        moduleName: "Module 1: Python Essentials",
        topics: [
          "Python interpreter, variables, identifiers",
          "Data types: Strings, Integers, Booleans",
          "Control Flow: If-else conditions, for/while loops",
          "Functions, scope, and docstrings"
        ]
      },
      {
        moduleName: "Module 2: Advanced Data Collections",
        topics: [
          "Lists, Tuples, Dictionaries, Sets",
          "List Comprehensions and lambda expressions",
          "File Handling (Reading, writing files, JSON files)"
        ]
      },
      {
        moduleName: "Module 3: Object Oriented Python",
        topics: [
          "Classes, instance variables, methods",
          "Inheritance, encapsulation, polymorphism",
          "Dunder methods and custom decorators"
        ]
      },
      {
        moduleName: "Module 4: Web Scraping & Automation",
        topics: [
          "Requesting web pages using requests library",
          "Parsing HTML elements with BeautifulSoup",
          "Automating browser actions with Selenium"
        ]
      },
      {
        moduleName: "Module 5: Django Framework",
        topics: [
          "Django MVT architecture overview",
          "Setting up apps, models, views, and templates",
          "Database migration and SQLite connection",
          "Handling user inputs and HTML forms"
        ]
      }
    ],
    projects: [
      {
        title: "Automated News Scraper",
        desc: "A script that extracts top articles from news portals, saves them in JSON, and emails a summary daily.",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80",
        tech: ["Python", "BeautifulSoup", "smtplib"]
      },
      {
        title: "Blog Engine Portal",
        desc: "A fully functional blog web app supporting markdown articles, comments, and admin moderation panels.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
        tech: ["Python", "Django", "Bootstrap", "SQLite"]
      }
    ],
    tools: ["VS Code", "PyCharm", "Jupyter Notebook", "Git", "GitHub"],
    technologies: ["Python", "Django", "Flask", "SQLite", "BeautifulSoup", "Selenium", "Requests", "Git", "GitHub"],
    careerRoles: [
      "Python Developer",
      "Backend Developer",
      "Automation Engineer",
      "Software Engineer"
    ],
    benefits: [
      "Lifetime access to scripts & templates",
      "Detailed notes on core algorithms",
      "Preparation questions for tech round"
    ],
    prerequisites: [
      "No coding background needed. Great for absolute beginners!"
    ],
    faqs: [
      {
        question: "Is Python a good starting language?",
        answer: "Yes, Python is widely considered the best language for beginners due to its clean syntax and readability."
      }
    ]
  },
  {
    id: "node-js",
    slug: "node-js",
    courseName: "Node.js",
    shortTitle: "Node.js Developer",
    subtitle: "Build Fast, Scalable APIs & Real-Time Server Applications",
    category: "Backend Development",
    rating: 4.8,
    reviewCount: 1650,
    duration: "3 Months",
    level: "Intermediate to Advanced",
    language: "English",
    studentsEnrolled: "9,800+",
    mentorName: "Vikram Malhotra",
    mentorExperience: "10+ Years Node Architect",
    bannerImage: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&auto=format&fit=crop&q=80",
    description: "Learn Node.js core modules, Express framework, MongoDB integration, JWT authentications, Socket.io, and server hosting.",
    longDescription: "Become an expert in asynchronous JavaScript. Learn about event loops, non-blocking I/O operations, writing RESTful Web APIs, connecting MongoDB databases, configuring middleware, and debugging Node processes.",
    price: 15000,
    offerPrice: 9999,
    discount: "33% OFF",
    certificate: "SwordNex Node Developer Certificate",
    placementSupport: "HR mock rounds and referral logs",
    downloadCurriculum: "/curriculum/node-js-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "Async Web Services",
      "Express.js Routing",
      "Database Integration",
      "Socket.io Chats"
    ],
    highlights: [
      "35+ Hours of Live Lectures",
      "6 Scalable Backend Projects",
      "Deep dive into JavaScript V8 engine",
      "Server deployment on AWS",
      "Interactive code-along sessions"
    ],
    curriculum: [
      {
        moduleName: "Module 1: Node.js Runtime Essentials",
        topics: [
          "Understanding Node.js architecture and V8 Engine",
          "Non-blocking I/O and the Event Loop",
          "Working with core modules (fs, path, http, os)",
          "Node Package Manager (NPM) workflow"
        ]
      },
      {
        moduleName: "Module 2: Express.js Framework",
        topics: [
          "Introduction to Express framework",
          "Defining routes, sub-routers, route methods",
          "Working with request/response objects",
          "Understanding custom and global middleware"
        ]
      },
      {
        moduleName: "Module 3: Database & Mongoose Integration",
        topics: [
          "Connecting Express app to MongoDB Atlas",
          "Defining schemas and models with Mongoose",
          "Performing CRUD queries",
          "Validation and schema hooks"
        ]
      },
      {
        moduleName: "Module 4: JWT Authentication",
        topics: [
          "Introduction to JSON Web Tokens (JWT)",
          "Hashing passwords using bcryptjs",
          "Building authentication middleware",
          "Managing route security"
        ]
      }
    ],
    projects: [
      {
        title: "Secure Task Management API",
        desc: "A backend service supporting JWT logins, input validations, database registries, and category filters.",
        image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=600&auto=format&fit=crop&q=80",
        tech: ["Node.js", "Express", "MongoDB", "JWT"]
      },
      {
        title: "Real-time Poll Application",
        desc: "An API supporting voting channels, live tally updates, and database session triggers.",
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&auto=format&fit=crop&q=80",
        tech: ["Node.js", "Express", "Socket.io", "MongoDB"]
      }
    ],
    tools: ["VS Code", "Postman", "Git", "MongoDB Atlas", "Compass"],
    technologies: ["Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "JavaScript", "REST API", "Git", "GitHub"],
    careerRoles: [
      "Node.js Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Software Engineer"
    ],
    benefits: [
      "Ready-to-use boilerplate code templates",
      "Live API integration test guidelines",
      "SwordNex verified certificate",
      "Lifetime video archive access"
    ],
    prerequisites: [
      "Good understanding of fundamental JavaScript (variables, async/await, arrays)"
    ],
    faqs: [
      {
        question: "Is this database covered from scratch?",
        answer: "Yes, MongoDB and document schemas are taught from the ground up."
      }
    ]
  },
  {
    id: "aspnet-core",
    slug: "aspnet-core",
    courseName: "ASP.NET Core",
    shortTitle: "ASP.NET Core API",
    subtitle: "Build Production-Ready Web Apps & Web APIs using C# & ASP.NET Core",
    category: "Backend Development",
    rating: 4.8,
    reviewCount: 820,
    duration: "3 Months",
    level: "Intermediate to Advanced",
    language: "English",
    studentsEnrolled: "5,400+",
    mentorName: "Manoj Kumar",
    mentorExperience: "11+ Years .NET Specialist",
    bannerImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=80",
    description: "Learn C#, .NET runtime architecture, Web API design patterns, Entity Framework Core, SQL Server database migrations, JWT security, and dependency injections.",
    longDescription: "Master building industrial, high-throughput microservices using C# and Microsoft's powerful ASP.NET Core web platform. Includes detailed modules on middleware pipelines, Dependency Injection, REST APIs, and database transactions.",
    price: 17000,
    offerPrice: 10999,
    discount: "35% OFF",
    certificate: "SwordNex Certified C# / ASP.NET Developer",
    placementSupport: "Exclusive job logs & mock certifications",
    downloadCurriculum: "/curriculum/aspnet-core-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "C# OOP Foundations",
      "ASP.NET Core APIs",
      "EF Core Migrations",
      "SQL Server Connection"
    ],
    highlights: [
      "35+ Hours of Live Classes",
      "3 Full Backend Projects",
      "Entity Framework migrations setup",
      "Mock interviews and resume tuning",
      "Direct mentor feedback sessions"
    ],
    curriculum: [
      {
        moduleName: "Module 1: C# and OOP Concepts",
        topics: [
          "C# data types, loops, lists, structures",
          "OOP: Inheritances, encapsulation, interfaces",
          "Working with delegates and LINQ queries",
          "Introduction to .NET CLI"
        ]
      },
      {
        moduleName: "Module 2: Web API Setup & Routing",
        topics: [
          "ASP.NET Core Program.cs and middleware configuration",
          "Controllers, Routing, HTTP actions (HttpGet, HttpPost)",
          "Model Binding and Data Transfer Objects (DTO)"
        ]
      },
      {
        moduleName: "Module 3: Entity Framework Core",
        topics: [
          "Configuring DbContext for database operations",
          "EF migrations workflow and seed data",
          "One-to-many and Many-to-many relationship mapping",
          "Using LINQ with DbContext queries"
        ]
      }
    ],
    projects: [
      {
        title: "Medical Consultation Booking API",
        desc: "A backend service matching doctors and clinics with patient scheduler calendars.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80",
        tech: ["C#", "ASP.NET Core Web API", "Entity Framework", "SQL Server"]
      },
      {
        title: "Corporate Asset Tracker API",
        desc: "An internal office tracker for inventory hardware, software licenses, and check-in logs.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
        tech: ["C#", "ASP.NET Core Web API", "SQL Server"]
      }
    ],
    tools: ["Visual Studio", "VS Code", "SQL Server Management Studio (SSMS)", "Postman", "Git"],
    technologies: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "LINQ", "JWT", "REST API", "Git", "GitHub"],
    careerRoles: [
      "ASP.NET Developer",
      "C# Backend Engineer",
      "Dotnet Software Engineer",
      "API Developer"
    ],
    benefits: [
      "Lifetime access to database boilerplates",
      "Direct technical feedback logs",
      "Mock interviews and interview questions database",
      "Course completion certificate"
    ],
    prerequisites: [
      "Basic understanding of programming logic and objects"
    ],
    faqs: [
      {
        question: "Do you cover Entity Framework?",
        answer: "Yes, we teach Code-First database migrations using Entity Framework Core and SQL Server configurations."
      }
    ]
  },
  {
    id: "sql-server",
    slug: "sql-server",
    courseName: "SQL Server",
    shortTitle: "SQL Server Database",
    subtitle: "Master Database Design, Queries, and Performance Tuning",
    category: "Database Development",
    rating: 4.7,
    reviewCount: 710,
    duration: "2.5 Months",
    level: "Beginner to Advanced",
    language: "English",
    studentsEnrolled: "4,600+",
    mentorName: "Rakesh Gupta",
    mentorExperience: "14+ Years Lead DBA",
    bannerImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&auto=format&fit=crop&q=80",
    description: "Learn relational database concepts, write advanced SQL queries, joins, aggregates, store procedures, indexing, and query optimization.",
    longDescription: "Understand the fundamentals of relational database design, write complex T-SQL queries, design relational schemas with primary and foreign keys, write store procedures and triggers, and optimize slow execution plans.",
    price: 12000,
    offerPrice: 7999,
    discount: "33% OFF",
    certificate: "SwordNex Database Master Certificate",
    placementSupport: "Direct referral directories & SQL screenings",
    downloadCurriculum: "/curriculum/sql-server-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "T-SQL Mastery",
      "Schema Design",
      "Stored Procedures",
      "Query Tuning"
    ],
    highlights: [
      "25+ Hours of Live Classes",
      "4 Database Design Projects",
      "Database backup/restore processes",
      "Advanced indexes and optimizations",
      "Mock DBA interview questions"
    ],
    curriculum: [
      {
        moduleName: "Module 1: Relational Database Basics",
        topics: [
          "Understanding DBMS and RDBMS",
          "Data types in SQL Server",
          "Creating tables, primary keys, and foreign keys",
          "Writing basic SELECT, WHERE, and ORDER BY statements"
        ]
      },
      {
        moduleName: "Module 2: Advanced Queries & Joins",
        topics: [
          "Inner Join, Left Join, Right Join, Full Join",
          "Group By, Having, and aggregate functions (SUM, AVG)",
          "Subqueries and nested SQL structures",
          "Common Table Expressions (CTE)"
        ]
      },
      {
        moduleName: "Module 3: Programmability & Indexing",
        topics: [
          "Creating Views",
          "Writing Stored Procedures and User Defined Functions",
          "Understanding Triggers",
          "Clustered vs Non-Clustered Indexes"
        ]
      }
    ],
    projects: [
      {
        title: "E-Commerce Database Schema Design",
        desc: "Design the tables, foreign keys, constraints, and audit logs for a multi-vendor retail store database.",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
        tech: ["T-SQL", "SQL Server Management Studio", "Entity Relations"]
      },
      {
        title: "Database Query Tuner Challenge",
        desc: "Refactor slow, inefficient nested subqueries and missing indexes to speed up system reports.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        tech: ["T-SQL", "Query execution plan tuning"]
      }
    ],
    tools: ["SQL Server", "SSMS", "Postman", "Git"],
    technologies: ["SQL Server", "T-SQL", "SSMS", "Database Normalization", "Query Execution Plans", "Git", "GitHub"],
    careerRoles: [
      "SQL Developer",
      "Database Administrator (DBA)",
      "Data Analyst",
      "Backend Engineer"
    ],
    benefits: [
      "SQL scripts collections library",
      "Database schema samples",
      "Syllabus notes and exercises"
    ],
    prerequisites: [
      "No programming backgrounds required."
    ],
    faqs: [
      {
        question: "Do you teach DBA concepts?",
        answer: "We cover core development T-SQL queries, indexing, and basic DBA routines like backup, restore, and plan analyzing."
      }
    ]
  },
  {
    id: "mongodb",
    slug: "mongodb",
    courseName: "MongoDB",
    shortTitle: "MongoDB Database",
    subtitle: "Master Document-Based NoSQL Databases & Scale Large Applications",
    category: "Database Development",
    rating: 4.7,
    reviewCount: 630,
    duration: "2 Months",
    level: "Beginner to Advanced",
    language: "English",
    studentsEnrolled: "3,800+",
    mentorName: "Divya Teja",
    mentorExperience: "8+ Years NoSQL Specialist",
    bannerImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&auto=format&fit=crop&q=80",
    description: "Learn NoSQL database architectures, document storage, JSON/BSON structures, indexes, aggregate pipelines, and database replication.",
    longDescription: "Deep dive into MongoDB, the world's most popular NoSQL database. Learn how to configure local server instances, Mongo Atlas cloud systems, write complex query arrays, schema design models, and high-performance aggregation pipelines.",
    price: 11000,
    offerPrice: 6999,
    discount: "36% OFF",
    certificate: "SwordNex Certified MongoDB Specialist",
    placementSupport: "Industry job logs and resume profiling",
    downloadCurriculum: "/curriculum/mongodb-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "NoSQL Storage",
      "Document Modeling",
      "Aggregation Pipelines",
      "Cloud Atlas Support"
    ],
    highlights: [
      "20+ Hours of Live Instruction",
      "3 Real Schema Design Projects",
      "Atlas cluster management",
      "Performance index tuning",
      "Syllabus notes and scripts"
    ],
    curriculum: [
      {
        moduleName: "Module 1: NoSQL & MongoDB Setup",
        topics: [
          "SQL vs NoSQL key differences",
          "Understanding JSON, BSON formats",
          "Installing MongoDB and Compass GUI",
          "Setting up MongoDB Atlas Cloud clusters"
        ]
      },
      {
        moduleName: "Module 2: CRUD and Query Operations",
        topics: [
          "Inserting documents (insertOne, insertMany)",
          "Query filters (gt, lt, in, regex)",
          "Updating nested documents",
          "Deleting documents"
        ]
      },
      {
        moduleName: "Module 3: Aggregation Framework",
        topics: [
          "Understanding the Aggregation Pipeline",
          "Stages: match, group, project, sort, limit, lookup",
          "Performing inner joins in MongoDB"
        ]
      }
    ],
    projects: [
      {
        title: "Social Media Platform Database",
        desc: "Design user profile documents, nested comments, followers list, and post timelines.",
        image: "https://images.unsplash.com/photo-1611605698335-8b15d27e03f9?w=600&auto=format&fit=crop&q=80",
        tech: ["MongoDB", "NoSQL Document Modeling"]
      },
      {
        title: "Retail Product Inventory Schema",
        desc: "Highly scalable product collection schema featuring variations, attributes, inventory tallies, and user reviews.",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80",
        tech: ["MongoDB Compass", "Document Schemas"]
      }
    ],
    tools: ["MongoDB Compass", "MongoDB Shell", "Atlas Cloud", "VS Code", "Git"],
    technologies: ["MongoDB", "NoSQL", "BSON", "Atlas", "Mongoose", "Database Sharding", "Git", "GitHub"],
    careerRoles: [
      "NoSQL Developer",
      "MongoDB Database Engineer",
      "Data Engineer",
      "Backend Developer"
    ],
    benefits: [
      "Sample database dump scripts",
      "Advanced query cheatsheet",
      "Private Discord chat rooms"
    ],
    prerequisites: [
      "Basic concepts of lists and JSON format is good"
    ],
    faqs: [
      {
        question: "Is Mongoose covered?",
        answer: "Yes, we teach Mongoose schemas when integrating Node.js with MongoDB."
      }
    ]
  },
  {
    id: "ui-ux",
    slug: "ui-ux",
    courseName: "UI/UX Design",
    shortTitle: "UI/UX Design Masterclass",
    subtitle: "Design Elegant, User-Centered Interfaces & Mobile App Experiences",
    category: "Design",
    rating: 4.9,
    reviewCount: 1420,
    duration: "3 Months",
    level: "Beginner to Advanced",
    language: "English",
    studentsEnrolled: "8,900+",
    mentorName: "Pooja Hegde",
    mentorExperience: "9+ Years Lead Product Designer",
    bannerImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&auto=format&fit=crop&q=80",
    description: "Learn user research, wireframing, prototyping, Figma, design systems, layouts, typography, colors, and responsive designs.",
    longDescription: "Learn to design beautiful, user-friendly digital products. This live class covers UX research methodologies, building information architectures, responsive web designs, mobile apps layout guidelines, Figma components, Auto-layout, and clickable prototypes.",
    price: 15000,
    offerPrice: 8999,
    discount: "40% OFF",
    certificate: "SwordNex Product Designer Certificate",
    placementSupport: "Portfolio reviews and design agency referrals",
    downloadCurriculum: "/curriculum/uiux-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "Figma Mastery",
      "UX Research",
      "Interactive Prototypes",
      "Portfolio Prep"
    ],
    highlights: [
      "35+ Hours of Live Instruction",
      "3 High-Fidelity UI Portfolios",
      "Figma components and design systems",
      "Direct design critiques from mentor",
      "Certificate of Course Completion"
    ],
    curriculum: [
      {
        moduleName: "Module 1: UX Design Foundations",
        topics: [
          "Introduction to User Centered Design",
          "UX Research: Interviews, Personas, User Journeys",
          "Information Architecture & User Flow mapping",
          "Low-fidelity wireframing on paper"
        ]
      },
      {
        moduleName: "Module 2: Figma Essentials",
        topics: [
          "Figma Interface, vector paths, grids",
          "Figma Components, variants, and properties",
          "Auto-layout 4.0 for responsive design",
          "Figma Library and local style systems"
        ]
      },
      {
        moduleName: "Module 3: UI Design Principles",
        topics: [
          "Color Theory and visual hierarchy",
          "Typography styling and grids",
          "Form styling, inputs, states, buttons",
          "Accessibility standards (WCAG)"
        ]
      },
      {
        moduleName: "Module 4: Prototyping & Handoff",
        topics: [
          "Adding interactions, hover states, transitions",
          "Smart Animate in Figma",
          "Developer handoff processes and asset export"
        ]
      }
    ],
    projects: [
      {
        title: "Food Delivery Mobile App UI",
        desc: "A complete mobile app interface featuring catalog browsing, cart reviews, tracking map, and checkout screens.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
        tech: ["Figma", "Mobile UI Design", "Prototyping"]
      },
      {
        title: "SaaS Analytics Web Portal UI",
        desc: "A responsive dashboard design system featuring visual graphs, data lists, tables, and settings tabs.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        tech: ["Figma", "Design Systems", "Web UI Design"]
      }
    ],
    tools: ["Figma", "FigJam", "Adobe Photoshop", "Zeplin", "Miro"],
    technologies: ["Figma", "UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems", "Information Architecture", "Git", "GitHub"],
    careerRoles: [
      "UI/UX Designer",
      "Product Designer",
      "UX Researcher",
      "Visual Designer",
      "Web Designer"
    ],
    benefits: [
      "Exclusive UI asset kits templates",
      "Portfolio case study guides",
      "Figma shortcuts cheatsheet",
      "Mock designer critiques logs"
    ],
    prerequisites: [
      "No design or artistic background required!"
    ],
    faqs: [
      {
        question: "Do I need to learn coding?",
        answer: "No, UI/UX design is completely non-coding. We focus entirely on design tools, visual designs, and user research."
      }
    ]
  },
  {
    id: "ai-machine-learning",
    slug: "ai-machine-learning",
    courseName: "AI & Machine Learning",
    shortTitle: "AI & Machine Learning Program",
    subtitle: "Build Intelligent Predictive Models & Neural Network Software",
    category: "Artificial Intelligence",
    rating: 4.9,
    reviewCount: 1540,
    duration: "4.5 Months",
    level: "Intermediate to Advanced",
    language: "English",
    studentsEnrolled: "9,600+",
    mentorName: "Dr. Alok Prasad",
    mentorExperience: "15+ Years AI Research & Industry",
    bannerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&auto=format&fit=crop&q=80",
    courseImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=80",
    description: "Learn Python data analysis, regression, classification, clustering, neural networks, Deep Learning, and Generative AI models.",
    longDescription: "Master the fields of Artificial Intelligence and Machine Learning. The course begins with data handling using NumPy and Pandas, reviews core mathematical formulations, builds classical ML models (Regression, Decison Trees, Random Forests), and dives into Deep Learning neural networks and Generative AI setups.",
    price: 22000,
    offerPrice: 14999,
    discount: "31% OFF",
    certificate: "SwordNex Certified AI Specialist",
    placementSupport: "Premium mock interviews and direct referrals to AI tech hubs",
    downloadCurriculum: "/curriculum/ai-ml-syllabus.pdf",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      "Python Data Science",
      "Predictive Modeling",
      "Deep Learning Networks",
      "GenAI Foundations"
    ],
    highlights: [
      "60+ Hours of Live Mentorship",
      "5 Capstone AI Projects",
      "Linear Algebra & Stat refresher modules",
      "Keras & TensorFlow libraries basics",
      "Lifetime access to study notebooks"
    ],
    curriculum: [
      {
        moduleName: "Module 1: Data Analytics Foundations",
        topics: [
          "Python refresher for data science",
          "Matrix operations with NumPy",
          "Data clean-up and analysis with Pandas",
          "Plotting graphs using Matplotlib & Seaborn"
        ]
      },
      {
        moduleName: "Module 2: Classical Machine Learning",
        topics: [
          "Linear Regression and Logistic Regression",
          "Supervised vs Unsupervised models",
          "K-Nearest Neighbors (KNN), Decision Trees",
          "Random Forest and ensemble models"
        ]
      },
      {
        moduleName: "Module 3: Neural Networks & Deep Learning",
        topics: [
          "Perceptron and multi-layer networks math",
          "Activation functions: Relu, Sigmoid, Softmax",
          "Building models with TensorFlow and Keras",
          "Image classifications with CNNs"
        ]
      },
      {
        moduleName: "Module 4: Generative AI & Large Language Models",
        topics: [
          "Introduction to Transformers architecture",
          "GPT, BERT models usage",
          "Prompt Engineering basics",
          "Connecting OpenAI API to custom python scripts"
        ]
      }
    ],
    projects: [
      {
        title: "Real Estate Value Predictor",
        desc: "A machine learning regression model predicting housing market prices based on zip codes, sizes, and attributes.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80",
        tech: ["Python", "Pandas", "Scikit-Learn"]
      },
      {
        title: "Pneumonia Chest X-Ray Classifier",
        desc: "A deep learning Convolutional Neural Network (CNN) classifying medical chest images for clinical scans.",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&auto=format&fit=crop&q=80",
        tech: ["Python", "TensorFlow", "Keras", "OpenCV"]
      }
    ],
    tools: ["VS Code", "Jupyter Notebook", "Google Colab", "GitHub", "Git"],
    technologies: ["Python", "NumPy", "Pandas", "Scikit-Learn", "TensorFlow", "Keras", "OpenCV", "OpenAI API", "Git", "GitHub"],
    careerRoles: [
      "Machine Learning Engineer",
      "Data Scientist",
      "AI Developer",
      "Data Analyst",
      "Research Engineer"
    ],
    benefits: [
      "Access to Jupiter Notebooks scripts",
      "Machine learning mathematical guides",
      "Mock interviews and interview questions database",
      "Private Discord channel access"
    ],
    prerequisites: [
      "Good logic skills, core Python syntax, and secondary-school level math (algebra, statistics)"
    ],
    faqs: [
      {
        question: "Is this course mathematically intensive?",
        answer: "We explain mathematical concepts visually first, focusing on practical Python applications rather than complex proofs."
      }
    ]
  }
];
