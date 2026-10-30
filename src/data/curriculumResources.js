/**
 * Comprehensive Academic Curriculum Resources for SwordNex / Smart Academy LMS
 *
 * Provides genuine, structured educational resources for all academy courses:
 * - Readable Study Notes with structured modules, syntax explanations, code examples, and cheat sheets
 * - Interactive Video Lectures & Tutorials (playable in embedded video player)
 * - Authoritative Educational Links & Official Documentation
 * - PDF Architecture Handbooks & Guides (with reading viewer and working PDF download)
 */

export const CURRICULUM_RESOURCES = [
  // =========================================================================
  // 1. PYTHON PROGRAMMING / PYTHON FULL STACK
  // =========================================================================
  {
    id: 'res-py-notes',
    title: 'Python Full Stack Comprehensive Notes & Syntax Handbook',
    course: 'Python Programming',
    subject: 'Python Programming',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'SwordNex Technical Faculty',
    chapter: 'Core & Advanced Python',
    uploadedBy: 'SwordNex Technical Faculty',
    fileSize: 2450000,
    fileName: 'Python_FullStack_Comprehensive_Notes.pdf',
    fileUrl: '',
    description: 'Complete modular study notes covering Python syntax, data structures, OOP principles, FastAPI REST APIs, and asynchronous programming.',
    status: 'Published',
    views: 420,
    downloads: 185,
    createdAt: '2026-03-10T10:00:00.000Z',
    notesContent: {
      subtitle: 'From Fundamentals to Asynchronous Backend Architecture',
      overview: 'Python is a high-level, interpreted programming language known for readability, clean syntax, and immense versatility across web development, data engineering, and AI.',
      modules: [
        {
          num: 1,
          title: 'Python Core Syntax & Data Types',
          summary: 'Variables are dynamically typed. Key primitives include int, float, str, and bool.',
          code: `# Variables & Type Annotations
user_name: str = "Prakash"
user_age: int = 24
is_enrolled: bool = True
cgpa: float = 8.92

# Dynamic String Interpolation (f-strings)
print(f"Student {user_name} ({user_age} yrs) - Enrolled: {is_enrolled}")`,
          takeaways: [
            'Python uses indentation (4 spaces) rather than curly braces for block scoping.',
            'Type hints (PEP 484) enhance IDE autocompletion and static analysis without enforcing runtime types.',
            'Always use immutable tuples for fixed records and lists for dynamic collections.'
          ]
        },
        {
          num: 2,
          title: 'Collections & Comprehensions',
          summary: 'Mastery over lists, dictionaries, tuples, sets, and generator expressions.',
          code: `# List Comprehensions & Dictionary Comprehensions
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [n ** 2 for n in numbers if n % 2 == 0]

scores = {"Tamil": 94, "English": 88, "Maths": 98, "Science": 92}
distinctions = {subj: mark for subj, mark in scores.items() if mark >= 90}
print("Distinctions:", distinctions)`,
          takeaways: [
            'List comprehensions offer faster bytecode execution compared to traditional for-loops.',
            'Dictionaries preserve insertion order as of Python 3.7+.',
            'Sets compute mathematical union, intersection, and difference in O(1) average time.'
          ]
        },
        {
          num: 3,
          title: 'Object-Oriented Programming (OOP)',
          summary: 'Classes, encapsulation, inheritance, method overriding, and dunder methods.',
          code: `class Student:
    def __init__(self, name: str, course: str):
        self.name = name
        self.course = course
        self._completed_lessons = []

    def complete_lesson(self, lesson_id: int):
        if lesson_id not in self._completed_lessons:
            self._completed_lessons.append(lesson_id)

    @property
    def progress_count(self) -> int:
        return len(self._completed_lessons)

    def __repr__(self) -> str:
        return f"<Student: {self.name} ({self.course}) - {self.progress_count} done>"`,
          takeaways: [
            'Use @property decorators for getter/setter encapsulation.',
            'Inheritance promotes code reuse via super() constructor delegation.',
            'Dunder methods like __repr__ and __str__ clarify object representation.'
          ]
        },
        {
          num: 4,
          title: 'Backend REST APIs with FastAPI',
          summary: 'Building high-performance asynchronous web endpoints with Pydantic validation.',
          code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Academy Student API")

class CourseRegister(BaseModel):
    student_name: str
    course_name: str
    year: int

@app.post("/api/enroll")
async def enroll_student(payload: CourseRegister):
    if not payload.student_name:
        raise HTTPException(status_code=400, detail="Student name required")
    return {"status": "success", "enrolled": payload.student_name}`,
          takeaways: [
            'FastAPI leverages ASGI and type hints to automatically generate OpenAPI/Swagger documentation.',
            'Pydantic models enforce request schema validation automatically.',
            'Async/await prevents thread starvation during I/O bound database operations.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'List Slicing', syntax: 'items[start:stop:step]' },
        { topic: 'Dictionary Access', syntax: 'data.get("key", default_value)' },
        { topic: 'Lambda Function', syntax: 'lambda x: x * 2' },
        { topic: 'Context Manager', syntax: 'with open("file.txt", "r") as f:' },
        { topic: 'Exception Handling', syntax: 'try: ... except ValueError as e: ... finally: ...' }
      ],
      interviewTips: [
        {
          q: 'What is the Global Interpreter Lock (GIL) in Python?',
          a: 'The GIL is a mutex in CPython that prevents multiple native threads from executing Python bytecodes simultaneously. For CPU-bound tasks, multiprocessing or C-extensions are preferred over threading.'
        },
        {
          q: 'Difference between shallow copy and deep copy?',
          a: 'A shallow copy constructs a new collection object and populates it with references to child objects. A deep copy recursively copies all nested objects, isolating them completely.'
        }
      ]
    }
  },
  {
    id: 'res-py-video',
    title: 'Python Backend REST API Development with FastAPI',
    course: 'Python Programming',
    subject: 'Python Programming',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'Sneha Reddy',
    chapter: 'Backend REST APIs',
    uploadedBy: 'Sneha Reddy',
    fileSize: 22000000,
    fileName: 'FastAPI_Backend_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/Js05B8Z1ivE',
    description: 'Practical video guide to building asynchronous REST APIs using Python FastAPI, Pydantic data models, and database ORM.',
    status: 'Published',
    views: 740,
    downloads: 95,
    createdAt: '2026-03-14T15:30:00.000Z'
  },
  {
    id: 'res-py-link',
    title: 'Official Python 3 Documentation & Standard Library Reference',
    course: 'Python Programming',
    subject: 'Python Programming',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Python Software Foundation',
    chapter: 'Language Specification',
    uploadedBy: 'Python Software Foundation',
    fileSize: 0,
    fileName: 'Python Official Docs',
    fileUrl: 'https://docs.python.org/3/',
    description: 'Complete official documentation for Python 3 syntax, built-in functions, standard library modules, and best practice guidelines.',
    status: 'Published',
    views: 1120,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-py-pdf',
    title: 'Python Architecture & Data Structures PDF Handbook',
    course: 'Python Programming',
    subject: 'Python Programming',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'SwordNex Technical Faculty',
    chapter: 'Architecture & Cheat Sheets',
    uploadedBy: 'SwordNex Technical Faculty',
    fileSize: 3100000,
    fileName: 'Python_Architecture_and_Data_Structures.pdf',
    fileUrl: 'https://docs.python.org/3/',
    description: 'Comprehensive PDF study handbook covering Python memory model, algorithmic complexity, collections framework, and clean code practices.',
    status: 'Published',
    views: 580,
    downloads: 320,
    createdAt: '2026-03-16T10:00:00.000Z'
  },

  // =========================================================================
  // 2. FULL STACK WEB DEVELOPMENT / FSD
  // =========================================================================
  {
    id: 'res-fsd-notes',
    title: 'Full Stack Web Development - HTML5, CSS3, JS & Node Notes',
    course: 'Full Stack Development',
    subject: 'Full Stack Development',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'SwordNex Web Faculty',
    chapter: 'Modern Web Architecture',
    uploadedBy: 'SwordNex Web Faculty',
    fileSize: 2800000,
    fileName: 'FullStack_Web_Development_Master_Notes.pdf',
    fileUrl: '',
    description: 'Complete reference notes on HTML5 semantics, Tailwind CSS, JavaScript event-driven concurrency, Express controllers, and MongoDB schemas.',
    status: 'Published',
    views: 610,
    downloads: 310,
    createdAt: '2026-03-15T09:15:00.000Z',
    notesContent: {
      subtitle: 'Client-Server Architecture, Responsive UI & Full Stack REST APIs',
      overview: 'Full Stack Web Development integrates client-side user interfaces with robust server-side processing, databases, and continuous deployment workflows.',
      modules: [
        {
          num: 1,
          title: 'Semantic HTML5 & Accessibility (a11y)',
          summary: 'Proper document outlines, semantic tagging, and keyboard accessible navigation.',
          code: `<!-- Semantic Document Structure -->
<header role="banner" class="navbar">
  <nav aria-label="Main Navigation">
    <a href="/courses">Courses</a>
    <a href="/resources">Resources</a>
  </nav>
</header>
<main id="main-content" role="main">
  <article>
    <h1>Modern Web Architecture</h1>
    <p>Semantic tags improve SEO indexing and screen-reader parsing.</p>
  </article>
</main>`,
          takeaways: [
            'Use <main>, <header>, <nav>, <section>, and <article> rather than generic <div> containers.',
            'Ensure all interactive elements have visible focus indicators and aria-labels where icons lack text.',
            'Alt attributes on images must describe visual context or be explicitly empty (alt="") for decorative elements.'
          ]
        },
        {
          num: 2,
          title: 'Modern CSS3 Layouts: Flexbox & Grid',
          summary: 'Building fluid, mobile-first responsive interfaces using Flexbox and 2D Grid.',
          code: `/* Responsive 12-Column Grid Layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  align-items: start;
}

/* Flexbox Header Alignment */
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
          takeaways: [
            'Use Flexbox for one-dimensional layouts (rows or columns) and Grid for two-dimensional page structures.',
            'Mobile-first media queries use min-width breakpoints for progressive enhancement.',
            'CSS Custom Properties (CSS variables) allow dynamic runtime theming.'
          ]
        },
        {
          num: 3,
          title: 'JavaScript Event Loop & Async Programming',
          summary: 'Non-blocking I/O, Call Stack, Web APIs, Microtask queue, and Promises.',
          code: `// Fetching API data with robust error handling
async function loadCurriculumResources(courseId) {
  try {
    const response = await fetch(\`/api/resources?course=\${courseId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Resource fetch failed:", error);
    return [];
  }
}`,
          takeaways: [
            'Promises in the Microtask queue execute immediately after the current call stack clears, before setTimeout macrotasks.',
            'Always handle rejected promises using try/catch blocks.',
            'Closures enable data privacy and state encapsulation in JavaScript functions.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'Box Model', syntax: 'box-sizing: border-box (width = content + padding + border)' },
        { topic: 'Flex Center', syntax: 'display: flex; justify-content: center; align-items: center;' },
        { topic: 'Grid Auto Fit', syntax: 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));' },
        { topic: 'Destructuring', syntax: 'const { title, course } = resource;' },
        { topic: 'Async IIFE', syntax: '(async () => { await loadData(); })();' }
      ],
      interviewTips: [
        {
          q: 'Explain the difference between client-side rendering (CSR) and server-side rendering (SSR).',
          a: 'CSR compiles UI in the browser using JavaScript bundles; SSR renders complete HTML on the server before sending to the client, improving initial page load time (FCP) and SEO.'
        }
      ]
    }
  },
  {
    id: 'res-fsd-video',
    title: 'Modern Full Stack Web Architecture & React Masterclass',
    course: 'Full Stack Development',
    subject: 'Full Stack Development',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'John David',
    chapter: 'Web Architecture',
    uploadedBy: 'John David',
    fileSize: 18500000,
    fileName: 'FullStack_Architecture_Masterclass.mp4',
    fileUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    description: 'Video tutorial covering modern web component composition, custom state management hooks, and scalable full stack architecture.',
    status: 'Published',
    views: 890,
    downloads: 120,
    createdAt: '2026-03-11T12:00:00.000Z'
  },
  {
    id: 'res-fsd-link',
    title: 'MDN Web Docs - HTML, CSS & JavaScript Developer Guide',
    course: 'Full Stack Development',
    subject: 'Full Stack Development',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Mozilla Developer Network',
    chapter: 'Web Standards Reference',
    uploadedBy: 'Mozilla Developer Network',
    fileSize: 0,
    fileName: 'MDN Web Docs Reference',
    fileUrl: 'https://developer.mozilla.org/en-US/',
    description: 'Authoritative, official web standards reference for semantic HTML5 elements, CSS specifications, Web APIs, and ECMAScript.',
    status: 'Published',
    views: 1250,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-fsd-pdf',
    title: 'Frontend & Backend Web Architecture PDF Reference',
    course: 'Full Stack Development',
    subject: 'Full Stack Development',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'SwordNex Technical Faculty',
    chapter: 'Architecture Guides',
    uploadedBy: 'SwordNex Technical Faculty',
    fileSize: 3800000,
    fileName: 'Web_Development_Architecture_Reference.pdf',
    fileUrl: 'https://developer.mozilla.org/en-US/',
    description: 'Comprehensive PDF handbook on web protocols, REST API security, caching headers, responsive design patterns, and deployment pipelines.',
    status: 'Published',
    views: 490,
    downloads: 260,
    createdAt: '2026-03-18T11:00:00.000Z'
  },

  // =========================================================================
  // 3. REACT JS DEVELOPMENT
  // =========================================================================
  {
    id: 'res-react-notes',
    title: 'React.js Complete Developer Handbook & Hooks Reference',
    course: 'React JS',
    subject: 'React JS',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'Rohan Sharma',
    chapter: 'React Architecture & Hooks',
    uploadedBy: 'Rohan Sharma',
    fileSize: 2650000,
    fileName: 'ReactJS_Developer_Handbook_Notes.pdf',
    fileUrl: '',
    description: 'In-depth study notes covering React 19 functional components, JSX compilation, Virtual DOM diffing, useState, useEffect, custom hooks, and state management.',
    status: 'Published',
    views: 780,
    downloads: 410,
    createdAt: '2026-03-12T14:00:00.000Z',
    notesContent: {
      subtitle: 'Component Lifecycle, Modern Hooks & Scalable Application Architecture',
      overview: 'React is a declarative, component-based JavaScript library for building interactive user interfaces efficiently with a reactive virtual DOM.',
      modules: [
        {
          num: 1,
          title: 'React Components, Props & State',
          summary: 'Components receive input as immutable props and manage local reactive data with useState.',
          code: `import React, { useState } from 'react';

export const CounterCard = ({ initialCount = 0, title }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="p-4 rounded-xl border border-slate-200">
      <h3 className="font-bold">{title}</h3>
      <p className="text-2xl font-mono">{count}</p>
      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
      >
        Increment
      </button>
    </div>
  );
};`,
          takeaways: [
            'State updates are queued and batched by React for optimal rendering performance.',
            'Never mutate state directly; always pass a new reference or updater callback function.',
            'Props flow unidirectionally from parent to child components.'
          ]
        },
        {
          num: 2,
          title: 'Side Effects with useEffect & Custom Hooks',
          summary: 'Managing subscriptions, network calls, and lifecycle cleanup properly.',
          code: `import { useState, useEffect } from 'react';

// Custom hook to subscribe to window dimensions
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    // Cleanup function prevents memory leaks
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array runs once on mount

  return dimensions;
}`,
          takeaways: [
            'The return function inside useEffect acts as the cleanup handler when component unmounts.',
            'Include all referenced reactive values in the dependency array to prevent stale closures.',
            'Extract repeated stateful logic into clean, reusable custom hooks.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'useState', syntax: 'const [state, setState] = useState(initialVal);' },
        { topic: 'useEffect', syntax: 'useEffect(() => { ... return () => cleanup(); }, [deps]);' },
        { topic: 'useMemo', syntax: 'const cached = useMemo(() => computeHeavy(a, b), [a, b]);' },
        { topic: 'useCallback', syntax: 'const fn = useCallback(() => doWork(id), [id]);' },
        { topic: 'useRef', syntax: 'const ref = useRef(null); // persists across renders' }
      ],
      interviewTips: [
        {
          q: 'How does React Virtual DOM reconciliation work?',
          a: 'React compares the new Virtual DOM tree against the previous snapshot using a heuristic O(n) diffing algorithm. It identifies changed nodes and updates only the necessary physical DOM elements via batching.'
        }
      ]
    }
  },
  {
    id: 'res-react-video',
    title: 'React JS Single Page Application Architecture Tutorial',
    course: 'React JS',
    subject: 'React JS',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'Rohan Sharma',
    chapter: 'Component Architecture',
    uploadedBy: 'Rohan Sharma',
    fileSize: 24000000,
    fileName: 'ReactJS_Architecture_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
    description: 'Step-by-step video lecture covering React components, reactive state, custom hooks, and client-side routing.',
    status: 'Published',
    views: 890,
    downloads: 140,
    createdAt: '2026-03-14T11:00:00.000Z'
  },
  {
    id: 'res-react-link',
    title: 'Official React.js Documentation & Guides',
    course: 'React JS',
    subject: 'React JS',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Meta Open Source',
    chapter: 'Official Reference',
    uploadedBy: 'Meta Open Source',
    fileSize: 0,
    fileName: 'React Official Docs',
    fileUrl: 'https://react.dev/',
    description: 'Official modern React documentation with interactive examples, thinking in React, and hook references.',
    status: 'Published',
    views: 1450,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-react-pdf',
    title: 'React Component Lifecycle & State Management PDF Guide',
    course: 'React JS',
    subject: 'React JS',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'Rohan Sharma',
    chapter: 'Architecture & Patterns',
    uploadedBy: 'Rohan Sharma',
    fileSize: 2900000,
    fileName: 'React_Component_Lifecycle_Guide.pdf',
    fileUrl: 'https://react.dev/',
    description: 'Comprehensive PDF study manual detailing React render cycles, reconciliation algorithms, Redux Toolkit, and performance memoization.',
    status: 'Published',
    views: 620,
    downloads: 380,
    createdAt: '2026-03-17T15:00:00.000Z'
  },

  // =========================================================================
  // 4. JAVA ENTERPRISE / JAVA BOOTCAMP
  // =========================================================================
  {
    id: 'res-java-notes',
    title: 'Core Java & Spring Boot Enterprise Architecture Notes',
    course: 'Java Enterprise',
    subject: 'Java Enterprise',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'Amit Patel',
    chapter: 'Core Java & Spring Boot',
    uploadedBy: 'Amit Patel',
    fileSize: 3100000,
    fileName: 'Java_Enterprise_SpringBoot_Notes.pdf',
    fileUrl: '',
    description: 'Detailed study notes covering JVM memory models, multithreading, Collections framework, Spring Data JPA, and Spring Boot REST API patterns.',
    status: 'Published',
    views: 530,
    downloads: 240,
    createdAt: '2026-03-12T11:30:00.000Z',
    notesContent: {
      subtitle: 'Object-Oriented Architecture, JVM Internals & Cloud-Native Microservices',
      overview: 'Java is an established, robust, object-oriented language. Combined with the Spring Boot framework, it powers enterprise-grade backend microservices worldwide.',
      modules: [
        {
          num: 1,
          title: 'JVM Memory Model & Garbage Collection',
          summary: 'Heap memory, Stack frames, Metaspace, and generational garbage collection.',
          code: `// Immutable Record in Java 17+
public record StudentDTO(
    Long id,
    String name,
    String course,
    boolean isEnrolled
) {}

// Standard Spring Boot REST Controller
@RestController
@RequestMapping("/api/students")
public class StudentController {
    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudent(@PathVariable Long id) {
        StudentDTO student = new StudentDTO(id, "Prakash", "Java Enterprise", true);
        return ResponseEntity.ok(student);
    }
}`,
          takeaways: [
            'Primitives and method stack frames live on the Thread Stack; all objects reside on the Heap.',
            'Generational GC divides Heap into Young (Eden, Survivor) and Old (Tenured) spaces.',
            'Java 16+ records provide immutable, boilerplate-free data transfer objects.'
          ]
        },
        {
          num: 2,
          title: 'Java Collections & Streams API',
          summary: 'List, Set, Map implementations, and functional stream transformations.',
          code: `List<String> names = List.of("Prakash", "Anand", "Divya", "Priya", "Arun");

// Filter and transform using Stream API
List<String> filtered = names.stream()
    .filter(name -> name.startsWith("P"))
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());

System.out.println(filtered); // [PRAKASH, PRIYA]`,
          takeaways: [
            'ArrayList provides O(1) random access; LinkedList provides O(1) insertion at ends.',
            'HashMap uses bucket arrays with linked lists converted to red-black trees at threshold 8.',
            'Streams are lazy; intermediate operations only execute when a terminal operation is invoked.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'HashMap Complexity', syntax: 'get() / put(): O(1) average, O(log n) worst' },
        { topic: 'Thread Safety', syntax: 'ConcurrentHashMap, synchronized, volatile' },
        { topic: 'Optional Handling', syntax: 'opt.orElseThrow(() -> new NotFoundException());' },
        { topic: 'Dependency Injection', syntax: '@Autowired / @RequiredArgsConstructor' }
      ],
      interviewTips: [
        {
          q: 'Explain the difference between String, StringBuilder, and StringBuffer.',
          a: 'String is immutable (stored in String Pool). StringBuilder is mutable and not thread-safe (fastest for single-threaded concatenations). StringBuffer is mutable and thread-safe (synchronized methods).'
        }
      ]
    }
  },
  {
    id: 'res-java-video',
    title: 'Spring Boot Microservices & Database Integration Tutorial',
    course: 'Java Enterprise',
    subject: 'Java Enterprise',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'Amit Patel',
    chapter: 'Spring Boot Services',
    uploadedBy: 'Amit Patel',
    fileSize: 26000000,
    fileName: 'SpringBoot_Microservices_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
    description: 'Step-by-step video lecture explaining Spring Data JPA, Hibernate ORM, service transaction boundaries, and REST controller routes.',
    status: 'Published',
    views: 680,
    downloads: 88,
    createdAt: '2026-03-16T17:45:00.000Z'
  },
  {
    id: 'res-java-link',
    title: 'Spring Framework & Spring Boot Official Guides',
    course: 'Java Enterprise',
    subject: 'Java Enterprise',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Spring by VMware',
    chapter: 'Spring Boot Architecture',
    uploadedBy: 'Spring by VMware',
    fileSize: 0,
    fileName: 'Spring Official Guides',
    fileUrl: 'https://spring.io/guides',
    description: 'Official quick-start guides and architectural documentation for building scalable cloud-native microservices with Spring Boot.',
    status: 'Published',
    views: 980,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-java-pdf',
    title: 'Java Design Patterns & Microservices Architecture PDF',
    course: 'Java Enterprise',
    subject: 'Java Enterprise',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'Amit Patel',
    chapter: 'Enterprise Architecture',
    uploadedBy: 'Amit Patel',
    fileSize: 4200000,
    fileName: 'Java_Microservices_Architecture.pdf',
    fileUrl: 'https://spring.io/guides',
    description: 'Enterprise PDF handbook detailing GoF design patterns (Singleton, Factory, Strategy), Spring Security JWT filters, and Docker deployment.',
    status: 'Published',
    views: 450,
    downloads: 210,
    createdAt: '2026-03-18T10:00:00.000Z'
  },

  // =========================================================================
  // 5. SQL DATABASE MASTERCLASS
  // =========================================================================
  {
    id: 'res-sql-notes',
    title: 'SQL Database Architecture, Joins & Query Optimization Notes',
    course: 'SQL Database',
    subject: 'SQL Database',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'Vikram Malhotra',
    chapter: 'Database Management',
    uploadedBy: 'Vikram Malhotra',
    fileSize: 2300000,
    fileName: 'SQL_Database_Masterclass_Notes.pdf',
    fileUrl: '',
    description: 'Comprehensive study notes on relational schemas, DDL/DML, JOIN operations, subqueries, grouping, B-Tree indexes, and ACID transactions.',
    status: 'Published',
    views: 590,
    downloads: 280,
    createdAt: '2026-03-13T12:00:00.000Z',
    notesContent: {
      subtitle: 'Relational Modeling, Query Tuning & Transaction Management',
      overview: 'Structured Query Language (SQL) is the foundational language for querying, updating, and managing relational database systems like PostgreSQL, MySQL, and SQL Server.',
      modules: [
        {
          num: 1,
          title: 'Relational Database Schema & Constraints',
          summary: 'Tables, keys, check constraints, and relational normalization principles.',
          code: `-- Students Table with Constraints
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    enrolled_date DATE DEFAULT CURRENT_DATE,
    cgpa NUMERIC(3, 2) CHECK (cgpa >= 0.0 AND cgpa <= 10.0)
);

-- Enrollments Table with Foreign Key
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    course_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active'
);`,
          takeaways: [
            'PRIMARY KEY guarantees uniqueness and automatically builds an underlying clustered index.',
            'FOREIGN KEY preserves referential integrity across related parent and child records.',
            'Normalization (1NF, 2NF, 3NF) removes update anomalies and data redundancy.'
          ]
        },
        {
          num: 2,
          title: 'Mastering SQL Table Joins & Aggregations',
          summary: 'INNER, LEFT, RIGHT, FULL OUTER joins, GROUP BY, and HAVING filters.',
          code: `-- Retrieve student details with total enrolled courses
SELECT 
    s.student_id,
    s.full_name,
    COUNT(e.enrollment_id) AS total_courses,
    MAX(s.enrolled_date) AS latest_enrollment
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
WHERE s.cgpa >= 7.5
GROUP BY s.student_id, s.full_name
HAVING COUNT(e.enrollment_id) > 0
ORDER BY total_courses DESC;`,
          takeaways: [
            'WHERE filters rows before aggregation; HAVING filters groups after aggregation.',
            'LEFT JOIN retains all rows from the left table even if right table matches are absent (NULL).',
            'Always index foreign key columns to avoid expensive table scans during JOIN queries.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'INNER JOIN', syntax: 'SELECT * FROM A INNER JOIN B ON A.id = B.a_id;' },
        { topic: 'Aggregates', syntax: 'COUNT(), SUM(), AVG(), MIN(), MAX()' },
        { topic: 'B-Tree Index', syntax: 'CREATE INDEX idx_student_email ON students(email);' },
        { topic: 'Transactions', syntax: 'BEGIN TRANSACTION; ... COMMIT; / ROLLBACK;' }
      ],
      interviewTips: [
        {
          q: 'Explain ACID properties in relational databases.',
          a: 'Atomicity (all operations succeed or entire transaction rolls back), Consistency (database transitions from one valid state to another), Isolation (concurrent transactions execute independently without cross-interference), Durability (committed changes persist permanently even after hardware failures).'
        }
      ]
    }
  },
  {
    id: 'res-sql-video',
    title: 'SQL Database Queries, Table Joins & Optimization Tutorial',
    course: 'SQL Database',
    subject: 'SQL Database',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'Vikram Malhotra',
    chapter: 'SQL Queries & Joins',
    uploadedBy: 'Vikram Malhotra',
    fileSize: 21000000,
    fileName: 'SQL_Database_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
    description: 'Visual video tutorial demonstrating practical SQL queries, multi-table joins, subqueries, grouping, and index tuning.',
    status: 'Published',
    views: 650,
    downloads: 90,
    createdAt: '2026-03-15T14:30:00.000Z'
  },
  {
    id: 'res-sql-link',
    title: 'PostgreSQL & SQL Standards Educational Reference',
    course: 'SQL Database',
    subject: 'SQL Database',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'W3Schools Educational Reference',
    chapter: 'Interactive SQL Guide',
    uploadedBy: 'W3Schools Educational Reference',
    fileSize: 0,
    fileName: 'SQL Educational Docs',
    fileUrl: 'https://www.w3schools.com/sql/',
    description: 'Interactive SQL reference covering all standard SQL commands, clauses, aggregate queries, and relational database best practices.',
    status: 'Published',
    views: 1100,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-sql-pdf',
    title: 'SQL Query Cheat Sheet & Database Schema Design PDF',
    course: 'SQL Database',
    subject: 'SQL Database',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'Vikram Malhotra',
    chapter: 'Database Schema Design',
    uploadedBy: 'Vikram Malhotra',
    fileSize: 2800000,
    fileName: 'SQL_Queries_and_Schema_Design.pdf',
    fileUrl: 'https://www.w3schools.com/sql/',
    description: 'Compact PDF reference handbook with SQL syntax cheat sheets, indexing best practices, query execution plan analysis, and normalization checklists.',
    status: 'Published',
    views: 510,
    downloads: 290,
    createdAt: '2026-03-18T16:00:00.000Z'
  },

  // =========================================================================
  // 6. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
  // =========================================================================
  {
    id: 'res-ai-notes',
    title: 'Machine Learning & Deep Learning Mathematical Foundations Notes',
    course: 'AI / Machine Learning',
    subject: 'AI / Machine Learning',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'Dr. Rajesh Sen',
    chapter: 'Machine Learning Foundations',
    uploadedBy: 'Dr. Rajesh Sen',
    fileSize: 3400000,
    fileName: 'Machine_Learning_Foundations_Notes.pdf',
    fileUrl: '',
    description: 'In-depth study notes on supervised and unsupervised learning, linear regression, gradient descent, neural networks, activation functions, and LLM transformers.',
    status: 'Published',
    views: 480,
    downloads: 195,
    createdAt: '2026-03-18T14:20:00.000Z',
    notesContent: {
      subtitle: 'Statistical Learning, Neural Networks & Generative AI',
      overview: 'Machine Learning empowers computer systems to learn patterns from data and make predictions without explicit programmatic rules.',
      modules: [
        {
          num: 1,
          title: 'Supervised Learning: Regression & Classification',
          summary: 'Cost functions, gradient descent optimization, and evaluation metrics.',
          code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Instantiate and fit model
clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)

# Evaluation
predictions = clf.predict(X_test)
print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions))`,
          takeaways: [
            'Supervised learning trains on labeled target data; unsupervised clustering detects latent clusters without ground truth labels.',
            'Avoid overfitting by using regularizations (L1 Lasso, L2 Ridge) and k-fold cross validation.',
            'Evaluation metrics: Precision, Recall, F1-Score, and ROC-AUC curve.'
          ]
        },
        {
          num: 2,
          title: 'Deep Learning & Neural Architectures',
          summary: 'Multi-layer perceptrons, forward propagation, backpropagation, and loss optimizers.',
          code: `# PyTorch Neural Network Definition
import torch
import torch.nn as nn

class AcademyClassifier(nn.Module):
    def __init__(self, input_dim: int, hidden_dim: int, num_classes: int):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, num_classes)
        )

    def forward(self, x):
        return self.network(x)`,
          takeaways: [
            'Non-linear activation functions (ReLU, GELU) allow neural networks to approximate complex mathematical functions.',
            'Backpropagation applies the calculus chain rule to calculate weight gradients relative to loss.',
            'Transformers utilize self-attention mechanisms to process tokens in parallel rather than sequentially.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'Cross Entropy Loss', syntax: 'L = -sum(y_true * log(y_pred))' },
        { topic: 'Gradient Descent', syntax: 'W_new = W_old - learning_rate * dL/dW' },
        { topic: 'Softmax', syntax: 'exp(z_i) / sum(exp(z_j)) -> probability distribution' }
      ],
      interviewTips: [
        {
          q: 'What is the Bias-Variance tradeoff in Machine Learning?',
          a: 'High bias causes underfitting (model is too simple to capture patterns). High variance causes overfitting (model memorizes training noise). The optimal model minimizes the sum of bias squared, variance, and irreducible error.'
        }
      ]
    }
  },
  {
    id: 'res-ai-video',
    title: 'Neural Networks & Deep Learning Foundations Explained',
    course: 'AI / Machine Learning',
    subject: 'AI / Machine Learning',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'Dr. Rajesh Sen',
    chapter: 'Deep Learning',
    uploadedBy: 'Dr. Rajesh Sen',
    fileSize: 29000000,
    fileName: 'Neural_Networks_DeepLearning.mp4',
    fileUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    description: 'Visual video explanation of artificial neural networks, activation functions, backpropagation calculus, and loss optimization.',
    status: 'Published',
    views: 820,
    downloads: 110,
    createdAt: '2026-03-19T13:00:00.000Z'
  },
  {
    id: 'res-ai-link',
    title: 'Scikit-Learn Machine Learning in Python Reference',
    course: 'AI / Machine Learning',
    subject: 'AI / Machine Learning',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Scikit-Learn Consortium',
    chapter: 'Machine Learning Library',
    uploadedBy: 'Scikit-Learn Consortium',
    fileSize: 0,
    fileName: 'Scikit-Learn Docs',
    fileUrl: 'https://scikit-learn.org/stable/',
    description: 'Official documentation and practical API references for machine learning models, cross-validation, pipelines, and evaluation metrics.',
    status: 'Published',
    views: 890,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-ai-pdf',
    title: 'Deep Learning Architectures & Transformer Models PDF',
    course: 'AI / Machine Learning',
    subject: 'AI / Machine Learning',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'Dr. Rajesh Sen',
    chapter: 'Neural Networks & LLMs',
    uploadedBy: 'Dr. Rajesh Sen',
    fileSize: 4500000,
    fileName: 'Deep_Learning_Transformers_Reference.pdf',
    fileUrl: 'https://scikit-learn.org/stable/',
    description: 'Comprehensive PDF study manual covering self-attention calculations, transformer encoder-decoder layers, fine-tuning techniques, and evaluation metrics.',
    status: 'Published',
    views: 610,
    downloads: 290,
    createdAt: '2026-03-20T11:00:00.000Z'
  },

  // =========================================================================
  // 7. DATA SCIENCE
  // =========================================================================
  {
    id: 'res-ds-notes',
    title: 'Data Science & Pandas Data Wrangling Complete Handbook',
    course: 'Data Science',
    subject: 'Data Science',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'Vikram Malhotra',
    chapter: 'Data Cleaning & Analytics',
    uploadedBy: 'Vikram Malhotra',
    fileSize: 2150000,
    fileName: 'DataScience_Pandas_Reference_Notes.pdf',
    fileUrl: '',
    description: 'Exploratory data analysis cheat sheet, Pandas indexing, NumPy array vectorization, data cleaning, and statistical analytical queries.',
    status: 'Published',
    views: 390,
    downloads: 160,
    createdAt: '2026-03-20T16:00:00.000Z',
    notesContent: {
      subtitle: 'Data Manipulation, Exploratory Data Analysis & Statistical Modeling',
      overview: 'Data Science extracts actionable insights from structured and unstructured data using programming, statistics, and visualization.',
      modules: [
        {
          num: 1,
          title: 'Data Wrangling with Pandas & NumPy',
          summary: 'Vectorized operations, handling missing values, and group aggregations.',
          code: `import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv('students_data.csv')

# Data cleaning pipeline
df['cgpa'] = df['cgpa'].fillna(df['cgpa'].median())
df['is_honors'] = df['cgpa'] >= 8.5

# Group by analytics
summary = df.groupby('course').agg(
    total_students=('student_id', 'count'),
    average_cgpa=('cgpa', 'mean')
).reset_index()

print(summary)`,
          takeaways: [
            'Vectorized NumPy/Pandas operations execute in compiled C, running 50-100x faster than Python loops.',
            'Use .loc for label-based indexing and .iloc for integer position indexing.',
            'Always inspect missing value distributions before applying mean or median imputation.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'Filtering', syntax: 'df[df["score"] > 80]' },
        { topic: 'Pivot Table', syntax: 'pd.pivot_table(df, values="score", index="course", columns="year")' },
        { topic: 'Merge/Join', syntax: 'pd.merge(df1, df2, on="student_id", how="left")' }
      ],
      interviewTips: [
        {
          q: 'Difference between correlation and causation in data analysis?',
          a: 'Correlation indicates a statistical association between two variables; causation proves that a change in one variable directly produces a change in the other. Controlled A/B experiments are required to establish causality.'
        }
      ]
    }
  },
  {
    id: 'res-ds-video',
    title: 'Python for Data Science & Pandas Wrangling Tutorial',
    course: 'Data Science',
    subject: 'Data Science',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'Vikram Malhotra',
    chapter: 'Data Analytics',
    uploadedBy: 'Vikram Malhotra',
    fileSize: 22000000,
    fileName: 'DataScience_Pandas_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    description: 'Practical video tutorial on data manipulation with Pandas, statistical plotting, and data cleaning pipelines.',
    status: 'Published',
    views: 670,
    downloads: 95,
    createdAt: '2026-03-17T14:00:00.000Z'
  },
  {
    id: 'res-ds-link',
    title: 'Official Pandas Documentation & Tutorials',
    course: 'Data Science',
    subject: 'Data Science',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Pandas Development Team',
    chapter: 'Pandas User Guide',
    uploadedBy: 'Pandas Development Team',
    fileSize: 0,
    fileName: 'Pandas Docs',
    fileUrl: 'https://pandas.pydata.org/docs/',
    description: 'Official Pandas documentation, API reference guide, and practical recipes for exploratory data analysis.',
    status: 'Published',
    views: 890,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-ds-pdf',
    title: 'Data Science Statistical Analysis & Visualization PDF',
    course: 'Data Science',
    subject: 'Data Science',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'Vikram Malhotra',
    chapter: 'Statistical Methods',
    uploadedBy: 'Vikram Malhotra',
    fileSize: 3100000,
    fileName: 'Data_Science_Statistical_Analysis.pdf',
    fileUrl: 'https://pandas.pydata.org/docs/',
    description: 'Statistical inference reference handbook covering hypothesis testing, p-values, regression modeling, and Matplotlib visualizations.',
    status: 'Published',
    views: 470,
    downloads: 230,
    createdAt: '2026-03-19T10:00:00.000Z'
  },

  // =========================================================================
  // 8. NODE.JS BACKEND DEVELOPMENT
  // =========================================================================
  {
    id: 'res-node-notes',
    title: 'Node.js & Express.js REST API Architecture Handbook',
    course: 'Node.js Backend',
    subject: 'Node.js Backend',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'John David',
    chapter: 'Backend Architecture',
    uploadedBy: 'John David',
    fileSize: 2500000,
    fileName: 'NodeJS_Express_Architecture_Notes.pdf',
    fileUrl: '',
    description: 'Complete notes on Node.js event-driven runtime, Express middleware routing, JWT authentication, error handling, and MongoDB data access.',
    status: 'Published',
    views: 520,
    downloads: 230,
    createdAt: '2026-03-14T09:00:00.000Z',
    notesContent: {
      subtitle: 'Asynchronous Runtime, RESTful Services & Middleware Design',
      overview: 'Node.js is an open-source, cross-platform JavaScript runtime built on Chrome V8 engine, executing server-side code with non-blocking I/O.',
      modules: [
        {
          num: 1,
          title: 'Express.js REST Architecture & Middleware',
          summary: 'Middleware request processing pipeline and clean controller structure.',
          code: `const express = require('express');
const app = express();

app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next();
});

// Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.listen(5000, () => console.log('Server running on port 5000'));`,
          takeaways: [
            'Middleware functions have access to the request object (req), response object (res), and the next middleware function.',
            'Centralize error handling with custom 4-parameter error middleware (err, req, res, next).',
            'Use cluster or PM2 to scale Node.js across multi-core server processors.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'Route Params', syntax: 'req.params.id' },
        { topic: 'Query Strings', syntax: 'req.query.search' },
        { topic: 'Status Codes', syntax: '200 OK, 201 Created, 400 Bad Req, 401 Unauthorized, 404 Not Found, 500 Server Err' }
      ],
      interviewTips: [
        {
          q: 'Explain process.nextTick vs setImmediate in Node.js.',
          a: 'process.nextTick executes immediately after the current phase completes before the event loop continues; setImmediate fires in the Check phase of the event loop.'
        }
      ]
    }
  },
  {
    id: 'res-node-video',
    title: 'Node.js REST API & Backend Architecture Tutorial',
    course: 'Node.js Backend',
    subject: 'Node.js Backend',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'John David',
    chapter: 'REST APIs',
    uploadedBy: 'John David',
    fileSize: 23000000,
    fileName: 'NodeJS_REST_API_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
    description: 'Step-by-step video lecture covering Node runtime, Express routes, authentication controllers, and JSON responses.',
    status: 'Published',
    views: 710,
    downloads: 115,
    createdAt: '2026-03-16T12:00:00.000Z'
  },
  {
    id: 'res-node-link',
    title: 'Official Node.js API Reference & Documentation',
    course: 'Node.js Backend',
    subject: 'Node.js Backend',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'OpenJS Foundation',
    chapter: 'Core Modules',
    uploadedBy: 'OpenJS Foundation',
    fileSize: 0,
    fileName: 'Node.js Docs',
    fileUrl: 'https://nodejs.org/docs/latest/api/',
    description: 'Official Node.js documentation for core modules, file system, HTTP server, events, and stream processing.',
    status: 'Published',
    views: 1040,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-node-pdf',
    title: 'Node.js Enterprise API Design & Security PDF',
    course: 'Node.js Backend',
    subject: 'Node.js Backend',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'John David',
    chapter: 'Security & Microservices',
    uploadedBy: 'John David',
    fileSize: 3200000,
    fileName: 'NodeJS_Enterprise_API_Security.pdf',
    fileUrl: 'https://nodejs.org/docs/latest/api/',
    description: 'Enterprise guide covering CORS policies, rate limiting, JWT token revocation, Helmet headers, and input sanitization.',
    status: 'Published',
    views: 430,
    downloads: 190,
    createdAt: '2026-03-18T14:00:00.000Z'
  },

  // =========================================================================
  // 9. MONGODB DATABASE MASTERCLASS
  // =========================================================================
  {
    id: 'res-mongo-notes',
    title: 'MongoDB NoSQL Architecture & Aggregation Pipeline Notes',
    course: 'MongoDB Database',
    subject: 'MongoDB Database',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'Vikram Malhotra',
    chapter: 'NoSQL Databases',
    uploadedBy: 'Vikram Malhotra',
    fileSize: 2200000,
    fileName: 'MongoDB_NoSQL_Architecture_Notes.pdf',
    fileUrl: '',
    description: 'Structured notes on BSON documents, collections, indexing strategies, schema validation, and the multi-stage aggregation pipeline.',
    status: 'Published',
    views: 410,
    downloads: 175,
    createdAt: '2026-03-14T11:00:00.000Z',
    notesContent: {
      subtitle: 'Document Data Modeling, Aggregations & Production Sharding',
      overview: 'MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like BSON documents with powerful indexing and aggregation capabilities.',
      modules: [
        {
          num: 1,
          title: 'Document Modeling & Aggregation Pipeline',
          summary: 'Multi-stage aggregation using $match, $group, $sort, and $lookup.',
          code: `// Multi-stage MongoDB Aggregation Pipeline
db.enrollments.aggregate([
  { $match: { status: "Active" } },
  { 
    $group: {
      _id: "$course_name",
      total_students: { $sum: 1 },
      avg_progress: { $avg: "$progress" }
    }
  },
  { $sort: { total_students: -1 } },
  { $limit: 10 }
]);`,
          takeaways: [
            'MongoDB documents can embed subdocuments or reference foreign document IDs.',
            'Indexes (compound, multikey, TTL, text) prevent unindexed collection scans.',
            'Aggregation pipelines process documents through sequential filter and transform stages.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'Insert', syntax: 'db.collection.insertOne({ key: "value" })' },
        { topic: 'Find', syntax: 'db.collection.find({ status: "Active" }).limit(5)' },
        { topic: 'Update', syntax: 'db.collection.updateOne({ _id }, { $set: { status } })' }
      ],
      interviewTips: [
        {
          q: 'When to embed documents vs when to reference documents in MongoDB?',
          a: 'Embed when data has a 1-to-few relationship and is accessed together frequently. Reference when data has 1-to-many or many-to-many relationships, or when embedded documents would exceed the 16MB BSON limit.'
        }
      ]
    }
  },
  {
    id: 'res-mongo-video',
    title: 'MongoDB Schema Design & Aggregation Framework Tutorial',
    course: 'MongoDB Database',
    subject: 'MongoDB Database',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'Vikram Malhotra',
    chapter: 'Schema Design',
    uploadedBy: 'Vikram Malhotra',
    fileSize: 20000000,
    fileName: 'MongoDB_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/ofme2o29ngU',
    description: 'In-depth video lecture on NoSQL schema design patterns, query optimization, and Atlas deployment.',
    status: 'Published',
    views: 630,
    downloads: 85,
    createdAt: '2026-03-16T15:00:00.000Z'
  },
  {
    id: 'res-mongo-link',
    title: 'Official MongoDB Documentation & Manual',
    course: 'MongoDB Database',
    subject: 'MongoDB Database',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'MongoDB Inc.',
    chapter: 'Database Reference',
    uploadedBy: 'MongoDB Inc.',
    fileSize: 0,
    fileName: 'MongoDB Docs',
    fileUrl: 'https://www.mongodb.com/docs/',
    description: 'Official MongoDB manual covering drivers, queries, aggregations, and database administration.',
    status: 'Published',
    views: 920,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-mongo-pdf',
    title: 'MongoDB Query Operators & Performance Tuning PDF',
    course: 'MongoDB Database',
    subject: 'MongoDB Database',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'Vikram Malhotra',
    chapter: 'Performance Optimization',
    uploadedBy: 'Vikram Malhotra',
    fileSize: 2700000,
    fileName: 'MongoDB_Query_Optimization_Guide.pdf',
    fileUrl: 'https://www.mongodb.com/docs/',
    description: 'PDF guide detailing index analysis using explain(), compound indexes, write concern levels, and transaction management.',
    status: 'Published',
    views: 380,
    downloads: 160,
    createdAt: '2026-03-19T14:00:00.000Z'
  },

  // =========================================================================
  // 10. ANGULAR COMPLETE GUIDE
  // =========================================================================
  {
    id: 'res-angular-notes',
    title: 'Angular Framework & TypeScript Architecture Notes',
    course: 'Angular',
    subject: 'Angular',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'SwordNex Frontend Lead',
    chapter: 'Angular Architecture',
    uploadedBy: 'SwordNex Frontend Lead',
    fileSize: 2700000,
    fileName: 'Angular_TypeScript_Architecture_Notes.pdf',
    fileUrl: '',
    description: 'Complete notes on Angular standalone components, dependency injection, RxJS observables, reactive forms, and route guards.',
    status: 'Published',
    views: 390,
    downloads: 145,
    createdAt: '2026-03-15T10:00:00.000Z',
    notesContent: {
      subtitle: 'Enterprise Frontend Architecture, RxJS Observables & Dependency Injection',
      overview: 'Angular is a full-featured, batteries-included TypeScript framework for building scalable enterprise web applications.',
      modules: [
        {
          num: 1,
          title: 'Angular Standalone Components & Services',
          summary: 'Component composition, signals, and injectable services.',
          code: `import { Component, signal, inject } from '@angular/core';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  template: \`
    <div class="p-4 border rounded-xl">
      <h2>{{ courseTitle() }}</h2>
      <button (click)="refresh()">Refresh</button>
    </div>
  \`
})
export class CourseCardComponent {
  private courseService = inject(CourseService);
  courseTitle = signal('Angular Complete Guide');

  refresh() {
    this.courseTitle.set('Angular 19 Enterprise Architecture');
  }
}`,
          takeaways: [
            'Angular Standalone components remove the need for NgModules.',
            'Signals introduce fine-grained reactivity without Zone.js overhead.',
            'Dependency Injection provides singleton services and loose coupling.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'Interpolation', syntax: '{{ propertyName }}' },
        { topic: 'Property Binding', syntax: '[src]="imageUrl"' },
        { topic: 'Event Binding', syntax: '(click)="handleClick()"' },
        { topic: 'Two-way Binding', syntax: '[(ngModel)]="username"' }
      ],
      interviewTips: [
        {
          q: 'Explain the difference between Promise and RxJS Observable in Angular.',
          a: 'Promises emit a single value asynchronously and are not cancellable. Observables emit a continuous stream of multiple values over time, are lazy (execute only when subscribed), and support rich functional operators like map, filter, debounceTime, and switchMap.'
        }
      ]
    }
  },
  {
    id: 'res-angular-video',
    title: 'Angular Components, Services & Routing Masterclass',
    course: 'Angular',
    subject: 'Angular',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'SwordNex Frontend Lead',
    chapter: 'Angular Core',
    uploadedBy: 'SwordNex Frontend Lead',
    fileSize: 25000000,
    fileName: 'Angular_Masterclass_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
    description: 'Comprehensive video lecture on building enterprise single-page applications with Angular.',
    status: 'Published',
    views: 540,
    downloads: 75,
    createdAt: '2026-03-17T11:00:00.000Z'
  },
  {
    id: 'res-angular-link',
    title: 'Official Angular Documentation & Tutorials',
    course: 'Angular',
    subject: 'Angular',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Google Angular Team',
    chapter: 'Official Documentation',
    uploadedBy: 'Google Angular Team',
    fileSize: 0,
    fileName: 'Angular Docs',
    fileUrl: 'https://angular.dev/',
    description: 'Official Angular documentation, CLI commands, tutorial guides, and API reference.',
    status: 'Published',
    views: 860,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-angular-pdf',
    title: 'Angular Enterprise Architecture & RxJS PDF Guide',
    course: 'Angular',
    subject: 'Angular',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'SwordNex Frontend Lead',
    chapter: 'Enterprise Architecture',
    uploadedBy: 'SwordNex Frontend Lead',
    fileSize: 3400000,
    fileName: 'Angular_Enterprise_Architecture.pdf',
    fileUrl: 'https://angular.dev/',
    description: 'In-depth PDF study guide on RxJS operators, NgRx state management, lazy routing, and performance optimization.',
    status: 'Published',
    views: 390,
    downloads: 180,
    createdAt: '2026-03-19T13:00:00.000Z'
  },

  // =========================================================================
  // 11. UI/UX DESIGN MASTERCLASS
  // =========================================================================
  {
    id: 'res-uiux-notes',
    title: 'UI/UX Design Principles, Wireframing & Design Systems Notes',
    course: 'UI/UX Design',
    subject: 'UI/UX Design',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'SwordNex Design Lab',
    chapter: 'Design Systems',
    uploadedBy: 'SwordNex Design Lab',
    fileSize: 2400000,
    fileName: 'UI_UX_Design_Principles_Notes.pdf',
    fileUrl: '',
    description: 'Complete notes on user research, empathy mapping, Figma auto-layout, typography hierarchies, WCAG color contrast, and interactive prototyping.',
    status: 'Published',
    views: 480,
    downloads: 210,
    createdAt: '2026-03-16T10:00:00.000Z',
    notesContent: {
      subtitle: 'Design Thinking, Information Architecture & Figma Prototyping',
      overview: 'UI/UX Design focuses on understanding user needs, crafting intuitive interactions, and building accessible, visually captivating digital interfaces.',
      modules: [
        {
          num: 1,
          title: 'Design Thinking Process & Accessibility',
          summary: 'Empathize, Define, Ideate, Prototype, and Test cycles with WCAG guidelines.',
          code: `/* CSS Variables for Cohesive UI Design Tokens */
:root {
  --primary-500: #9333ea;
  --primary-600: #7e22ce;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --bg-card: #ffffff;
  --radius-xl: 1rem;
}`,
          takeaways: [
            'Maintain minimum 4.5:1 color contrast ratio for normal body text to satisfy WCAG AA.',
            'Hierarchy is created through font weight, size, whitespace, and color saturation.',
            'Figma Auto-Layout models standard CSS Flexbox alignment behavior.'
          ]
        }
      ],
      cheatSheet: [
        { topic: '8pt Grid', syntax: 'Spacing in multiples of 8 (8px, 16px, 24px, 32px)' },
        { topic: 'Typography Scale', syntax: 'Heading 1: 32px, H2: 24px, Body: 14px/16px, Caption: 12px' },
        { topic: 'Hick’s Law', syntax: 'Time to make a decision increases with the number of choices' }
      ],
      interviewTips: [
        {
          q: 'Explain the difference between UX and UI.',
          a: 'UX (User Experience) is the analytical, psychological process of designing how a product functions and solves user problems. UI (User Interface) is the aesthetic, sensory presentation including typography, colors, layout, and visual feedback.'
        }
      ]
    }
  },
  {
    id: 'res-uiux-video',
    title: 'Figma Prototyping & Design Systems Video Tutorial',
    course: 'UI/UX Design',
    subject: 'UI/UX Design',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'SwordNex Design Lab',
    chapter: 'Figma Prototyping',
    uploadedBy: 'SwordNex Design Lab',
    fileSize: 22000000,
    fileName: 'Figma_Design_Systems_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    description: 'Practical tutorial covering Figma auto-layout, interactive prototyping, design tokens, and component variants.',
    status: 'Published',
    views: 610,
    downloads: 90,
    createdAt: '2026-03-18T12:00:00.000Z'
  },
  {
    id: 'res-uiux-link',
    title: 'Nielsen Norman Group UX Research & Heuristics',
    course: 'UI/UX Design',
    subject: 'UI/UX Design',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Nielsen Norman Group',
    chapter: 'UX Standards',
    uploadedBy: 'Nielsen Norman Group',
    fileSize: 0,
    fileName: 'NNGroup Heuristics',
    fileUrl: 'https://www.nngroup.com/articles/',
    description: 'Authoritative UX research articles, usability heuristics, and user-centered design standards.',
    status: 'Published',
    views: 790,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-uiux-pdf',
    title: 'Design Thinking & Figma Design System PDF Handbook',
    course: 'UI/UX Design',
    subject: 'UI/UX Design',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'SwordNex Design Lab',
    chapter: 'Design Handbook',
    uploadedBy: 'SwordNex Design Lab',
    fileSize: 3100000,
    fileName: 'UI_UX_Design_System_Handbook.pdf',
    fileUrl: 'https://www.nngroup.com/articles/',
    description: 'Comprehensive PDF handbook covering user research methodologies, wireframe templates, and design system governance.',
    status: 'Published',
    views: 450,
    downloads: 220,
    createdAt: '2026-03-20T14:00:00.000Z'
  },

  // =========================================================================
  // 12. ASP.NET CORE WEB APIS
  // =========================================================================
  {
    id: 'res-dotnet-notes',
    title: 'ASP.NET Core & C# Enterprise Web API Architecture Notes',
    course: 'ASP.NET Core',
    subject: 'ASP.NET Core',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'SwordNex Backend Team',
    chapter: '.NET Web APIs',
    uploadedBy: 'SwordNex Backend Team',
    fileSize: 2600000,
    fileName: 'ASPNET_Core_WebAPI_Architecture_Notes.pdf',
    fileUrl: '',
    description: 'Complete notes on .NET 8 runtime, C# OOP features, Entity Framework Core, LINQ queries, dependency injection, and JWT security.',
    status: 'Published',
    views: 380,
    downloads: 140,
    createdAt: '2026-03-15T12:00:00.000Z',
    notesContent: {
      subtitle: 'High-Performance Web APIs, Entity Framework Core & C# Architecture',
      overview: 'ASP.NET Core is a modern, cross-platform, high-performance framework for building cloud-connected web APIs and microservices on .NET.',
      modules: [
        {
          num: 1,
          title: 'ASP.NET Core Dependency Injection & Minimal APIs',
          summary: 'Service lifetimes (Transient, Scoped, Singleton) and controller routing.',
          code: `var builder = WebApplication.CreateBuilder(args);

// Register Scoped DB Service
builder.Services.AddDbContext<AppDbContext>(opt => 
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IStudentService, StudentService>();

var app = builder.Build();

// Minimal API Endpoint
app.MapGet("/api/courses", async (IStudentService service) => {
    return Results.Ok(await service.GetAllCoursesAsync());
});

app.Run();`,
          takeaways: [
            'Transient creates a new instance each request; Scoped creates one per HTTP request; Singleton creates one per application lifetime.',
            'Entity Framework Core maps C# domain classes to database tables with automatic migrations.',
            'Minimal APIs minimize ceremony and memory footprint for microservice endpoints.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'LINQ Select', syntax: 'context.Students.Where(s => s.IsActive).ToListAsync();' },
        { topic: 'Async Method', syntax: 'public async Task<IActionResult> GetAsync()' }
      ],
      interviewTips: [
        {
          q: 'Explain the difference between IEnumerable and IQueryable in C#.',
          a: 'IEnumerable executes in-memory after fetching all records from the database. IQueryable translates LINQ expressions into native SQL queries executed on the database server, returning only filtered rows.'
        }
      ]
    }
  },
  {
    id: 'res-dotnet-video',
    title: 'ASP.NET Core Web APIs & Entity Framework Core Tutorial',
    course: 'ASP.NET Core',
    subject: 'ASP.NET Core',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'SwordNex Backend Team',
    chapter: 'Web APIs',
    uploadedBy: 'SwordNex Backend Team',
    fileSize: 24000000,
    fileName: 'ASPNET_Core_Tutorial.mp4',
    fileUrl: 'https://www.youtube.com/embed/BfEjDD8mWYg',
    description: 'Practical video tutorial on creating high-performance RESTful APIs with ASP.NET Core and SQL integration.',
    status: 'Published',
    views: 490,
    downloads: 70,
    createdAt: '2026-03-17T15:00:00.000Z'
  },
  {
    id: 'res-dotnet-link',
    title: 'Microsoft Learn - ASP.NET Core Official Documentation',
    course: 'ASP.NET Core',
    subject: 'ASP.NET Core',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Microsoft Developer Network',
    chapter: 'Microsoft Reference',
    uploadedBy: 'Microsoft Developer Network',
    fileSize: 0,
    fileName: 'ASP.NET Core Docs',
    fileUrl: 'https://learn.microsoft.com/en-us/aspnet/core/',
    description: 'Official Microsoft documentation for building cloud-native web apps and APIs with ASP.NET Core.',
    status: 'Published',
    views: 740,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-dotnet-pdf',
    title: 'ASP.NET Core Microservices & EF Core Architecture PDF',
    course: 'ASP.NET Core',
    subject: 'ASP.NET Core',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'SwordNex Backend Team',
    chapter: 'Enterprise .NET',
    uploadedBy: 'SwordNex Backend Team',
    fileSize: 3600000,
    fileName: 'ASPNET_Core_Microservices_Architecture.pdf',
    fileUrl: 'https://learn.microsoft.com/en-us/aspnet/core/',
    description: 'In-depth PDF study guide covering Clean Architecture, Repository Pattern, MediatR CQRS, and SQL migrations.',
    status: 'Published',
    views: 360,
    downloads: 150,
    createdAt: '2026-03-19T16:00:00.000Z'
  },

  // =========================================================================
  // 13. DIGITAL MARKETING
  // =========================================================================
  {
    id: 'res-marketing-notes',
    title: 'Digital Marketing Strategy, SEO & Performance Marketing Notes',
    course: 'Digital Marketing',
    subject: 'Digital Marketing',
    category: 'Study Notes',
    type: 'Notes',
    trainer: 'SwordNex Growth Team',
    chapter: 'Digital Marketing',
    uploadedBy: 'SwordNex Growth Team',
    fileSize: 2100000,
    fileName: 'Digital_Marketing_Strategy_Notes.pdf',
    fileUrl: '',
    description: 'Comprehensive notes on search engine optimization (SEO), Google Analytics 4, keyword research, Meta advertising, and conversion rate optimization.',
    status: 'Published',
    views: 350,
    downloads: 130,
    createdAt: '2026-03-14T10:00:00.000Z',
    notesContent: {
      subtitle: 'Inbound Growth, Search Optimization & Paid Campaign Strategies',
      overview: 'Digital Marketing utilizes digital channels such as search engines, social media, email, and websites to connect with prospects and drive measurable business growth.',
      modules: [
        {
          num: 1,
          title: 'Search Engine Optimization (SEO) & Analytics',
          summary: 'On-page SEO, technical audits, backlink authority, and conversion tracking.',
          code: `<!-- Essential SEO Meta Tags -->
<title>Learn Data Science & AI | SwordNex Academy</title>
<meta name="description" content="Master industry-ready tech skills with real-time projects and verified certification.">
<meta property="og:title" content="SwordNex Academy Live Courses">
<meta property="og:type" content="website">
<link rel="canonical" href="https://swordnex.academy/courses">`,
          takeaways: [
            'Technical SEO ensures crawler discoverability through XML sitemaps and fast server response times.',
            'Quality content aligned with search intent drives long-term organic traffic.',
            'Conversion Rate Optimization (CRO) uses A/B testing to maximize ROI on existing traffic.'
          ]
        }
      ],
      cheatSheet: [
        { topic: 'CTR', syntax: '(Clicks / Impressions) * 100' },
        { topic: 'ROAS', syntax: 'Revenue from Ads / Ad Spend' },
        { topic: 'CPC', syntax: 'Cost per Click' }
      ],
      interviewTips: [
        {
          q: 'What is the difference between On-Page SEO and Off-Page SEO?',
          a: 'On-Page SEO involves optimizing elements directly on your website (content, keywords, meta tags, heading hierarchy, internal links, performance). Off-Page SEO involves external actions that build domain authority, such as high-quality backlinks, brand citations, and social signals.'
        }
      ]
    }
  },
  {
    id: 'res-marketing-video',
    title: 'Digital Marketing Channels, SEO & PPC Video Masterclass',
    course: 'Digital Marketing',
    subject: 'Digital Marketing',
    category: 'Video Tutorials',
    type: 'Video',
    trainer: 'SwordNex Growth Team',
    chapter: 'Marketing Strategy',
    uploadedBy: 'SwordNex Growth Team',
    fileSize: 21000000,
    fileName: 'Digital_Marketing_Masterclass.mp4',
    fileUrl: 'https://www.youtube.com/embed/bixR-KIJKYM',
    description: 'Video lecture covering digital marketing funnels, keyword planning, audience targeting, and conversion tracking.',
    status: 'Published',
    views: 520,
    downloads: 80,
    createdAt: '2026-03-16T14:00:00.000Z'
  },
  {
    id: 'res-marketing-link',
    title: 'Google Search Central - SEO Starter Guide',
    course: 'Digital Marketing',
    subject: 'Digital Marketing',
    category: 'Official Documentation',
    type: 'Link',
    trainer: 'Google Search Central',
    chapter: 'SEO Guide',
    uploadedBy: 'Google Search Central',
    fileSize: 0,
    fileName: 'Google SEO Guide',
    fileUrl: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
    description: 'Official Google SEO starter guide and search engine optimization documentation.',
    status: 'Published',
    views: 820,
    downloads: 0,
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'res-marketing-pdf',
    title: 'SEO Audit Checklist & Campaign Planning PDF Guide',
    course: 'Digital Marketing',
    subject: 'Digital Marketing',
    category: 'PDF Notes',
    type: 'PDF',
    trainer: 'SwordNex Growth Team',
    chapter: 'Campaign Planning',
    uploadedBy: 'SwordNex Growth Team',
    fileSize: 2600000,
    fileName: 'Digital_Marketing_SEO_Audit_Checklist.pdf',
    fileUrl: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
    description: 'Actionable PDF checklist for site audits, competitive keyword research, Google Ads budget planning, and email funnel design.',
    status: 'Published',
    views: 410,
    downloads: 185,
    createdAt: '2026-03-18T16:00:00.000Z'
  }
];
