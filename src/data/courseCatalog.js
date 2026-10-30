// Central Course and Video Catalog for Smart Academy
// Single source of truth for all course lessons, video URLs, and topic curriculum

export const courseCatalog = {
  // 1. Python Courses
  "python": {
    id: "python",
    aliases: ["python", "py", "python-fs", "python-basics"],
    title: "Python Full Stack",
    category: "Python",
    price: 25000,
    duration: "40 Hours",
    image: "https://images.unsplash.com/photo-1581091870620-3c1e7f5b8f4d?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "Python Introduction", topic: "Getting started with Python, installation", duration: "20:15", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: true },
      { id: 2, num: 2, title: "Variables & Data Types", topic: "Variables, integers, floats, strings, booleans", duration: "35:40", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: true },
      { id: 3, num: 3, title: "Operators & Expressions", topic: "Arithmetic, comparison and logical operators", duration: "42:10", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: true },
      { id: 4, num: 4, title: "Conditional Statements", topic: "if, elif, and else decision making structures", duration: "55:00", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: true },
      { id: 5, num: 5, title: "Python Loops", topic: "for loops, while loops, range function, control flow", duration: "48:30", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: false },
      { id: 6, num: 6, title: "Functions & Scope", topic: "Defining functions with def, parameters and scope", duration: "60:15", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: false },
      { id: 7, num: 7, title: "Modules & Packages", topic: "Standard library modules and importing packages", duration: "30:00", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: false },
      { id: 8, num: 8, title: "File Handling", topic: "Reading, writing, and managing file streams", duration: "25:00", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: false },
      { id: 9, num: 9, title: "Object Oriented Programming", topic: "Classes, objects, methods, and inheritance", duration: "45:00", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: false },
      { id: 10, num: 10, title: "Final Project", topic: "Capstone project building an end-to-end Python app", duration: "50:00", videoUrl: "https://www.youtube.com/embed/Js05B8Z1ivE", isCompleted: false }
    ]
  },

  // 2. Full Stack Web Development
  "fsd": {
    id: "fsd",
    aliases: ["fsd", "fullstack"],
    title: "Full Stack Development",
    category: "Web Development",
    price: 30000,
    duration: "6 Months",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "Introduction to Full Stack", topic: "Full stack architecture, client-server model", duration: "20:15", videoUrl: "https://www.youtube.com/embed/pQN-pnXPaVg", isCompleted: true },
      { id: 2, num: 2, title: "HTML Basics & Markup Structures", topic: "HTML5 semantic elements, forms, accessibility", duration: "35:40", videoUrl: "https://www.youtube.com/embed/kUMe1FH4CHE", isCompleted: true },
      { id: 3, num: 3, title: "CSS Layouts: Flexbox vs. Grid", topic: "Modern CSS layout techniques: Flexbox and Grid", duration: "42:10", videoUrl: "https://www.youtube.com/embed/fYq5PXgSsbE", isCompleted: true },
      { id: 4, num: 4, title: "JavaScript Logic & Event Handling", topic: "DOM manipulation, addEventListener, async JS", duration: "55:00", videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk", isCompleted: true },
      { id: 5, num: 5, title: "React.js Components & State Management", topic: "Functional components, JSX, props, useState hook", duration: "48:30", videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8", isCompleted: false },
      { id: 6, num: 6, title: "Node.js Express API Foundations", topic: "Node runtime, Express routes, JSON responses", duration: "60:15", videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE", isCompleted: false },
      { id: 7, num: 7, title: "Database Integration with MongoDB", topic: "NoSQL document storage, schemas, CRUD operations", duration: "45:00", videoUrl: "https://www.youtube.com/embed/ofme2o29ngU", isCompleted: false },
      { id: 8, num: 8, title: "Authentication & Security", topic: "JWT tokens, password hashing, protected routes", duration: "40:00", videoUrl: "https://www.youtube.com/embed/mbsmsi7l3r4", isCompleted: false },
      { id: 9, num: 9, title: "Full Stack Capstone Project", topic: "Building an end-to-end full stack web application", duration: "65:00", videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE", isCompleted: false }
    ]
  },

  // 3. Responsive Web Design
  "web-design": {
    id: "web-design",
    aliases: ["web-design", "responsive-web"],
    title: "Responsive Web Design",
    category: "Web Development",
    price: 10000,
    duration: "3 Months",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "HTML5 Semantic Structure", topic: "Semantic tags, document outline, accessibility", duration: "30:00", videoUrl: "https://www.youtube.com/embed/kUMe1FH4CHE", isCompleted: true },
      { id: 2, num: 2, title: "CSS Box Model & Typography", topic: "Margin, border, padding, and web fonts", duration: "35:00", videoUrl: "https://www.youtube.com/embed/fYq5PXgSsbE", isCompleted: true },
      { id: 3, num: 3, title: "Flexbox Layout Architecture", topic: "1D layout alignment with Flexbox", duration: "40:00", videoUrl: "https://www.youtube.com/embed/fYq5PXgSsbE", isCompleted: false },
      { id: 4, num: 4, title: "CSS Grid Multi-Column Systems", topic: "2D grid templates, areas and gaps", duration: "45:00", videoUrl: "https://www.youtube.com/embed/jV8B24rSN5o", isCompleted: false },
      { id: 5, num: 5, title: "Media Queries & Mobile-First Design", topic: "Breakpoints, fluid layouts, responsive images", duration: "50:00", videoUrl: "https://www.youtube.com/embed/fYq5PXgSsbE", isCompleted: false }
    ]
  },

  // 4. React JS Development
  "react-js": {
    id: "react-js",
    aliases: ["react-js", "react", "react-advanced"],
    title: "React JS Development",
    category: "Frontend Development",
    price: 15000,
    duration: "3 Months",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "React Introduction & Setup", topic: "Single page applications, Virtual DOM, and Vite setup", duration: "25:00", videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8", isCompleted: true },
      { id: 2, num: 2, title: "JSX & Functional Components", topic: "JSX syntax, expressions, and composing components", duration: "35:00", videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8", isCompleted: true },
      { id: 3, num: 3, title: "Props and Component State", topic: "Passing data with props and internal state", duration: "40:00", videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8", isCompleted: true },
      { id: 4, num: 4, title: "React Hooks: useState & useEffect", topic: "Managing reactive state and side effects", duration: "50:00", videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8", isCompleted: false },
      { id: 5, num: 5, title: "React Router DOM Navigation", topic: "Client-side routing, params, and navigation", duration: "45:00", videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8", isCompleted: false },
      { id: 6, num: 6, title: "Redux State Management", topic: "Global store, reducers, actions, and dispatch", duration: "48:00", videoUrl: "https://www.youtube.com/embed/9boMnm5X9ak", isCompleted: false }
    ]
  },

  // 5. Java Developer Bootcamp
  "java": {
    id: "java",
    aliases: ["java", "java-dev", "java-bootcamp"],
    title: "Java Developer Bootcamp",
    category: "Java",
    price: 28000,
    duration: "5 Months",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "Java Basics & JVM Setup", topic: "JDK, JVM, JRE, and writing your first Java class", duration: "25:00", videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34", isCompleted: true },
      { id: 2, num: 2, title: "Data Types & Control Flow", topic: "Primitive types, conditionals, and loops in Java", duration: "35:00", videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34", isCompleted: true },
      { id: 3, num: 3, title: "OOP: Classes & Inheritance", topic: "Classes, objects, inheritance, encapsulation", duration: "50:00", videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34", isCompleted: false },
      { id: 4, num: 4, title: "Java Collections Framework", topic: "Lists, Sets, Maps, and Iterators in Java", duration: "45:00", videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34", isCompleted: false },
      { id: 5, num: 5, title: "Spring Boot REST APIs", topic: "Building backend RESTful microservices with Spring Boot", duration: "55:00", videoUrl: "https://www.youtube.com/embed/9SGDpan58Hg", isCompleted: false }
    ]
  },

  // 6. SQL Database Masterclass
  "sql": {
    id: "sql",
    aliases: ["sql", "sql-db", "sql-server"],
    title: "SQL Database Masterclass",
    category: "Data Science",
    price: 9000,
    duration: "2 Months",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "SQL Queries & Table Basics", topic: "Relational database concepts, SELECT, INSERT, UPDATE, DELETE", duration: "30:00", videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", isCompleted: true },
      { id: 2, num: 2, title: "Filtering & Joins Masterclass", topic: "WHERE clauses, aggregate functions, and table JOINs", duration: "45:00", videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", isCompleted: false },
      { id: 3, num: 3, title: "Grouping & Aggregate Queries", topic: "GROUP BY, HAVING, COUNT, SUM, AVG", duration: "40:00", videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", isCompleted: false },
      { id: 4, num: 4, title: "Subqueries and Views", topic: "Nested SELECT queries and database views", duration: "35:00", videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", isCompleted: false }
    ]
  },

  // 7. Artificial Intelligence & Machine Learning
  "ai": {
    id: "ai",
    aliases: ["ai", "ai-machine-learning"],
    title: "Artificial Intelligence & Machine Learning",
    category: "AI",
    price: 12000,
    duration: "3 Months",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "Introduction to AI & Machine Learning", topic: "AI concepts, ML vs. Deep Learning, applications", duration: "30:00", videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk", isCompleted: true },
      { id: 2, num: 2, title: "Supervised & Unsupervised Learning", topic: "Classification, regression, clustering models", duration: "40:00", videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk", isCompleted: false },
      { id: 3, num: 3, title: "Neural Networks & Deep Learning", topic: "Perceptrons, activation functions, backpropagation", duration: "50:00", videoUrl: "https://www.youtube.com/embed/aircAruvnKk", isCompleted: false },
      { id: 4, num: 4, title: "Generative AI & LLMs", topic: "Prompt engineering, transformers, building AI tools", duration: "45:00", videoUrl: "https://www.youtube.com/embed/aircAruvnKk", isCompleted: false }
    ]
  },

  // 8. Digital Marketing
  "digital-marketing": {
    id: "digital-marketing",
    aliases: ["digital-marketing", "marketing"],
    title: "Digital Marketing Mastery",
    category: "Digital Marketing",
    price: 8500,
    duration: "2 Months",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "Digital Marketing Channels & Strategy", topic: "Organic vs paid, funnel building, conversion metrics", duration: "25:00", videoUrl: "https://www.youtube.com/embed/bixR-KIJKYM", isCompleted: true },
      { id: 2, num: 2, title: "Search Engine Optimization (SEO)", topic: "On-page, off-page, technical SEO and keyword research", duration: "35:00", videoUrl: "https://www.youtube.com/embed/bixR-KIJKYM", isCompleted: false },
      { id: 3, num: 3, title: "Social Media & Google Ads", topic: "PPC campaigns, ad targeting, and ROI tracking", duration: "40:00", videoUrl: "https://www.youtube.com/embed/bixR-KIJKYM", isCompleted: false }
    ]
  },

  // 9. Node.js
  "node-js": {
    id: "node-js",
    aliases: ["node-js", "node"],
    title: "Node.js Backend Development",
    category: "Backend Development",
    price: 14000,
    duration: "2.5 Months",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "Node.js Architecture & Event Loop", topic: "Non-blocking asynchronous I/O and runtime", duration: "30:00", videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE", isCompleted: true },
      { id: 2, num: 2, title: "Express.js RESTful API Design", topic: "Route handlers, middleware, request and response", duration: "45:00", videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE", isCompleted: false },
      { id: 3, num: 3, title: "Middleware & Error Handling", topic: "Custom middleware, express.json, and async catchers", duration: "40:00", videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE", isCompleted: false }
    ]
  },

  // 10. MongoDB
  "mongodb": {
    id: "mongodb",
    aliases: ["mongodb", "mongo"],
    title: "MongoDB Database Masterclass",
    category: "Database",
    price: 11000,
    duration: "2 Months",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "NoSQL Architecture & Collections", topic: "JSON BSON documents, collections, Atlas setup", duration: "30:00", videoUrl: "https://www.youtube.com/embed/ofme2o29ngU", isCompleted: true },
      { id: 2, num: 2, title: "CRUD Operations in MongoDB", topic: "find, insertOne, updateMany, deleteOne queries", duration: "40:00", videoUrl: "https://www.youtube.com/embed/ofme2o29ngU", isCompleted: false },
      { id: 3, num: 3, title: "Aggregation Framework & Indexing", topic: "Match, group, sort pipelines, indexing strategies", duration: "45:00", videoUrl: "https://www.youtube.com/embed/ofme2o29ngU", isCompleted: false }
    ]
  },

  // 11. Angular
  "angular": {
    id: "angular",
    aliases: ["angular"],
    title: "Angular Complete Guide",
    category: "Frontend Development",
    price: 16000,
    duration: "3 Months",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "Angular Architecture & CLI Setup", topic: "TypeScript setup, components, decorators", duration: "30:00", videoUrl: "https://www.youtube.com/embed/3qBXWUpoPHo", isCompleted: true },
      { id: 2, num: 2, title: "Data Binding & Directives", topic: "Two-way binding, ngIf, ngFor, custom directives", duration: "40:00", videoUrl: "https://www.youtube.com/embed/3qBXWUpoPHo", isCompleted: false },
      { id: 3, num: 3, title: "Services & Dependency Injection", topic: "Injectable services, RxJS observables, HTTP client", duration: "45:00", videoUrl: "https://www.youtube.com/embed/3qBXWUpoPHo", isCompleted: false }
    ]
  },

  // 12. UI/UX Design
  "ui-ux": {
    id: "ui-ux",
    aliases: ["ui-ux", "ui-ux-design"],
    title: "UI/UX Design Masterclass",
    category: "Design",
    price: 15000,
    duration: "3 Months",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "UI/UX Principles & Design Thinking", topic: "User research, empathy mapping, design heuristics", duration: "30:00", videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU", isCompleted: true },
      { id: 2, num: 2, title: "Wireframing & Information Architecture", topic: "Low-fidelity wireframes, user flows, site maps", duration: "35:00", videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU", isCompleted: false },
      { id: 3, num: 3, title: "Figma Prototyping & Design Systems", topic: "Components, auto-layout, interactive prototypes", duration: "45:00", videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU", isCompleted: false }
    ]
  },

  // 13. ASP.NET Core
  "aspnet-core": {
    id: "aspnet-core",
    aliases: ["aspnet-core", "aspnet"],
    title: "ASP.NET Core Web APIs",
    category: "Backend Development",
    price: 18000,
    duration: "3 Months",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    lessons: [
      { id: 1, num: 1, title: "Introduction to .NET & C# Environment", topic: ".NET runtime, project structure, C# syntax", duration: "30:00", videoUrl: "https://www.youtube.com/embed/BfEjDD8mWYg", isCompleted: true },
      { id: 2, num: 2, title: "Building Web APIs with ASP.NET Core", topic: "Controllers, routing, JSON serialization", duration: "45:00", videoUrl: "https://www.youtube.com/embed/BfEjDD8mWYg", isCompleted: false },
      { id: 3, num: 3, title: "Entity Framework Core & SQL Integration", topic: "DbContext, migrations, database queries", duration: "50:00", videoUrl: "https://www.youtube.com/embed/BfEjDD8mWYg", isCompleted: false }
    ]
  }
};

/**
 * Normalizes course ID and retrieves the course object.
 * Returns null if the course is unknown or has no configured data.
 */
export const getCourseById = (courseId) => {
  if (!courseId) return courseCatalog["fsd"];
  const id = String(courseId).toLowerCase().trim();

  // 1. Direct key match
  if (courseCatalog[id]) return courseCatalog[id];

  // 2. Alias match
  for (const key of Object.keys(courseCatalog)) {
    const course = courseCatalog[key];
    if (course.aliases && course.aliases.includes(id)) {
      return course;
    }
  }

  // 3. Fallback: if course has no configured video source, return a descriptor identifying missing source
  return {
    id: id,
    aliases: [id],
    title: id.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    category: "General",
    price: 10000,
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    hasMissingSource: true,
    lessons: [
      {
        id: 1,
        num: 1,
        title: "Introduction",
        topic: "Topic overview",
        duration: "00:00",
        videoUrl: null, // Identified missing source
        isCompleted: false
      }
    ]
  };
};

/**
 * Returns all configured courses in catalog.
 */
export const getAllCourses = () => {
  return Object.values(courseCatalog);
};
