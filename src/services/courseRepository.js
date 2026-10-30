/**
 * Unified Course Repository for Smart Academy LMS
 *
 * Synchronizes built-in catalog courses with custom courses created by Admin.
 * Ensures consistent course details, IDs, categories, descriptions, and syllabus
 * across Admin and Student views.
 */

import { courseCatalog, getAllCourses as getCatalogCourses } from '../data/courseCatalog.js';
import { courses as detailedCourses } from '../data/courses.js';
import { detectCourseDomain } from './videoRetrievalService.js';

const STORAGE_KEY_CUSTOM_COURSES = 'smartacademy_custom_courses';
const COURSE_UPDATE_EVENT = 'smartacademy_courses_updated';

// In-memory fallback for environments without localStorage (e.g. Node.js unit tests)
let inMemoryCustomCourses = [];

/**
 * Standard structured syllabus generator for newly created courses
 */
export const generateSyllabusForCourse = (courseName, category = '', description = '') => {
  const name = (courseName || '').trim();
  const domain = detectCourseDomain({ title: name, category, description });

  if (domain === 'java') {
    return [
      { id: 1, num: 1, title: 'Java Basics & Setup (JDK & IDE)', topic: 'JDK installation, JVM concepts, and first Java application', duration: '25:00' },
      { id: 2, num: 2, title: 'Data Types, Operators & Control Flow', topic: 'Variables, loops, and conditional statements in Java', duration: '35:00' },
      { id: 3, num: 3, title: 'Object-Oriented Programming (OOP)', topic: 'Classes, Objects, Inheritance, Polymorphism, and Encapsulation', duration: '50:00' },
      { id: 4, num: 4, title: 'Java Collections Framework', topic: 'Lists, Sets, Maps, Queues, and Stream API', duration: '45:00' },
      { id: 5, num: 5, title: 'Spring Boot REST API Development', topic: 'Spring Boot setup, controller routing, JPA repository', duration: '55:00' },
      { id: 6, num: 6, title: 'Enterprise Full Stack Project', topic: 'End-to-end full stack Java enterprise capstone application', duration: '60:00' }
    ];
  }

  if (domain === 'python') {
    return [
      { id: 1, num: 1, title: 'Python Introduction & Core Syntax', topic: 'Python interpreter, indentation, and basic data types', duration: '20:15' },
      { id: 2, num: 2, title: 'Data Structures: Lists, Dicts & Sets', topic: 'Lists, tuples, dictionaries, and set operations', duration: '35:40' },
      { id: 3, num: 3, title: 'Functions, Scope & Error Handling', topic: 'Function definitions, *args, **kwargs, and try-except blocks', duration: '42:10' },
      { id: 4, num: 4, title: 'Object-Oriented Python Programming', topic: 'Classes, dunder methods, and object inheritance', duration: '50:00' },
      { id: 5, num: 5, title: 'Web Frameworks: Django & FastAPI', topic: 'Building backend routes, ORM models, and RESTful APIs', duration: '55:00' },
      { id: 6, num: 6, title: 'Python Capstone Application', topic: 'Building a complete full stack Python web application', duration: '60:00' }
    ];
  }

  if (domain === 'ml') {
    return [
      { id: 1, num: 1, title: 'Introduction to Machine Learning', topic: 'Supervised vs unsupervised learning, ML workflow, training sets', duration: '30:00' },
      { id: 2, num: 2, title: 'Regression & Classification Models', topic: 'Linear regression, logistic regression, cost functions', duration: '40:00' },
      { id: 3, num: 3, title: 'Decision Trees & Ensemble Learning', topic: 'Random forests, gradient boosting, and feature importance', duration: '45:00' },
      { id: 4, num: 4, title: 'Neural Networks & Deep Learning', topic: 'Perceptrons, backpropagation, and activation functions', duration: '50:00' },
      { id: 5, num: 5, title: 'Model Evaluation & Hyperparameter Tuning', topic: 'Cross-validation, ROC-AUC, grid search, and precision/recall', duration: '35:00' },
      { id: 6, num: 6, title: 'Machine Learning End-to-End Capstone', topic: 'Data preprocessing, model training, and production inference', duration: '55:00' }
    ];
  }

  if (domain === 'datascience') {
    return [
      { id: 1, num: 1, title: 'Data Science Foundations & Python', topic: 'Jupyter notebooks, data science workflow, and setup', duration: '35:00' },
      { id: 2, num: 2, title: 'Data Manipulation with Pandas & NumPy', topic: 'Data cleaning, indexing, transformations, and groupby', duration: '45:00' },
      { id: 3, num: 3, title: 'Data Visualization & Storytelling', topic: 'Matplotlib, Seaborn, plotting distributions and heatmaps', duration: '40:00' },
      { id: 4, num: 4, title: 'SQL & Database Queries for Analytics', topic: 'Aggregations, window functions, and multi-table joins', duration: '45:00' },
      { id: 5, num: 5, title: 'Statistical Inference & Hypothesis Testing', topic: 'Confidence intervals, p-values, and A/B testing methods', duration: '40:00' },
      { id: 6, num: 6, title: 'Real-World Data Science Capstone', topic: 'Exploratory data analysis and predictive insight report', duration: '50:00' }
    ];
  }

  if (domain === 'web') {
    return [
      { id: 1, num: 1, title: 'Web Architecture & Modern HTML5', topic: 'Client-server architecture, semantic markup, and accessibility', duration: '20:15' },
      { id: 2, num: 2, title: 'Responsive CSS3: Flexbox & Grid', topic: 'Modern layouts, media queries, and responsive design', duration: '35:40' },
      { id: 3, num: 3, title: 'JavaScript Logic & DOM Manipulation', topic: 'Event handling, ES6 syntax, and asynchronous logic', duration: '55:00' },
      { id: 4, num: 4, title: 'Frontend Engineering with React.js', topic: 'Components, props, useState, useEffect, and routing', duration: '48:30' },
      { id: 5, num: 5, title: 'Backend APIs with Node.js & Express', topic: 'Route handlers, middleware, JSON APIs, and controllers', duration: '60:15' },
      { id: 6, num: 6, title: 'Database Integration & Capstone App', topic: 'Database models, authentication, and full stack deployment', duration: '65:00' }
    ];
  }

  // Generic customized curriculum matching custom topic name
  return [
    { id: 1, num: 1, title: `${name}: Overview & Core Concepts`, topic: `Introduction to ${name}, environment setup and principles`, duration: '25:00' },
    { id: 2, num: 2, title: `${name}: Core Fundamentals & Architecture`, topic: `Fundamental building blocks, structures, and patterns`, duration: '35:00' },
    { id: 3, num: 3, title: `${name}: Practical Hands-on Exercises`, topic: `Applying concepts with practical exercises and guided implementation`, duration: '45:00' },
    { id: 4, num: 4, title: `${name}: Advanced Techniques & Best Practices`, topic: `Optimization, real-world patterns, and production guidelines`, duration: '50:00' },
    { id: 5, num: 5, title: `${name}: End-to-End Capstone Project`, topic: `Complete practical project applying all learned skills`, duration: '60:00' }
  ];
};

/**
 * Retrieves custom courses saved by Admin in localStorage
 */
export const getCustomCourses = () => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_COURSES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          inMemoryCustomCourses = parsed;
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed reading custom courses from localStorage', err);
    }
  }
  return [...inMemoryCustomCourses];
};

/**
 * Saves or updates a custom course created by Admin
 */
export const saveCustomCourse = (courseData) => {
  if (!courseData) return null;

  const customList = getCustomCourses();
  const rawId = courseData.id || courseData.courseId || `crs-${Date.now()}`;
  const courseId = String(rawId).toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
  const courseName = courseData.title || courseData.course || courseData.courseName || 'New Course';
  const category = courseData.category || 'General';
  const description = courseData.description || `Comprehensive training in ${courseName}.`;

  // Parse or auto-generate syllabus lessons
  let lessons = [];
  if (Array.isArray(courseData.lessons) && courseData.lessons.length > 0) {
    lessons = courseData.lessons.map((l, i) => ({
      id: l.id || i + 1,
      num: l.num || i + 1,
      title: l.title || `Lesson ${i + 1}`,
      topic: l.topic || 'Lesson Topic',
      duration: l.duration || '30:00',
      videoUrl: l.videoUrl || null
    }));
  } else if (typeof courseData.syllabus === 'string' && courseData.syllabus.trim()) {
    // Comma-separated or line-separated syllabus
    const topics = courseData.syllabus
      .split(/[\n,]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    lessons = topics.map((top, i) => ({
      id: i + 1,
      num: i + 1,
      title: top,
      topic: `Coverage of ${top}`,
      duration: '35:00',
      videoUrl: null
    }));
  } else {
    lessons = generateSyllabusForCourse(courseName, category, description);
  }

  const newCourseRecord = {
    ...courseData,
    id: courseId,
    courseId: courseData.courseId || courseId,
    title: courseName,
    course: courseName,
    courseName: courseName,
    category,
    description,
    trainer: courseData.trainer || courseData.instructor || 'Senior Instructor',
    instructor: courseData.trainer || courseData.instructor || 'Senior Instructor',
    duration: courseData.duration || '3 Months',
    price: Number(courseData.price || courseData.fee || 12000),
    level: courseData.level || 'Beginner to Advanced',
    mode: courseData.mode || 'Online Interactive',
    status: courseData.status || 'Active',
    image: courseData.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    lessons,
    isCustom: true,
    updatedAt: new Date().toISOString()
  };

  const existingIdx = customList.findIndex(
    (c) => String(c.id).toLowerCase() === courseId || String(c.courseId).toLowerCase() === courseId
  );

  if (existingIdx !== -1) {
    customList[existingIdx] = newCourseRecord;
  } else {
    customList.unshift(newCourseRecord);
  }

  inMemoryCustomCourses = customList;

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_COURSES, JSON.stringify(customList));
      window.dispatchEvent(new CustomEvent(COURSE_UPDATE_EVENT, { detail: newCourseRecord }));
    } catch (err) {
      console.error('Failed saving custom course', err);
    }
  }

  return newCourseRecord;
};

/**
 * Removes a custom course
 */
export const deleteCustomCourse = (courseId) => {
  if (!courseId) return;
  const customList = getCustomCourses();
  const filtered = customList.filter(
    (c) => String(c.id).toLowerCase() !== String(courseId).toLowerCase() &&
           String(c.courseId).toLowerCase() !== String(courseId).toLowerCase()
  );

  inMemoryCustomCourses = filtered;

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_COURSES, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent(COURSE_UPDATE_EVENT, { detail: { deletedId: courseId } }));
    } catch (_e) {}
  }
};

/**
 * Normalizes course IDs and aliases
 */
export const normalizeCourseId = (id) => {
  if (!id) return 'fsd';
  const clean = String(id).toLowerCase().trim();

  // Match Java
  if (clean === 'java' || clean === 'java-dev' || clean === 'java-bootcamp') return 'java';
  // Match Python
  if (clean === 'python' || clean === 'py' || clean === 'python-fs' || clean === 'python-basics') return 'python';
  // Match Machine Learning / AI
  if (clean === 'ai' || clean === 'machine-learning' || clean === 'ml' || clean === 'ai-machine-learning') return 'ai';
  // Match Data Science / SQL
  if (clean === 'sql' || clean === 'sql-db' || clean === 'sql-server' || clean === 'data-science') return 'sql';
  // Match React
  if (clean === 'react' || clean === 'react-js' || clean === 'react-advanced') return 'react-js';
  // Match FSD
  if (clean === 'fsd' || clean === 'fullstack') return 'fsd';
  // Match Web Design
  if (clean === 'web-design' || clean === 'responsive-web') return 'web-design';

  return clean;
};

/**
 * Retrieves a course by ID across Catalog and Custom Admin Courses.
 * If not found, builds a structured course model for that specific ID.
 * NEVER returns Python Full Stack for an unrelated course ID!
 */
export const getCourseById = (id) => {
  if (!id) return courseCatalog['fsd'];
  const cleanId = String(id).toLowerCase().trim();
  const normalizedKey = normalizeCourseId(cleanId);

  // 1. Check custom courses created by Admin
  const customList = getCustomCourses();
  const foundCustom = customList.find(
    (c) =>
      String(c.id).toLowerCase() === cleanId ||
      String(c.courseId).toLowerCase() === cleanId ||
      normalizeCourseId(c.id) === normalizedKey
  );
  if (foundCustom) return foundCustom;

  // 2. Check courseCatalog by key
  if (courseCatalog[normalizedKey]) {
    return courseCatalog[normalizedKey];
  }

  // 3. Check detailed courses list in courses.js
  const foundDetailed = detailedCourses.find(
    (c) =>
      String(c.id).toLowerCase() === cleanId ||
      String(c.slug).toLowerCase() === cleanId ||
      normalizeCourseId(c.id) === normalizedKey
  );
  if (foundDetailed) {
    // Map detailed courses into structured format with syllabus lessons
    const syllabusLessons = Array.isArray(foundDetailed.curriculum) && foundDetailed.curriculum.length > 0
      ? foundDetailed.curriculum.map((mod, idx) => ({
          id: idx + 1,
          num: idx + 1,
          title: mod.moduleName || `Module ${idx + 1}`,
          topic: Array.isArray(mod.topics) ? mod.topics.join(', ') : 'Module coverage',
          duration: '40:00',
          videoUrl: null
        }))
      : generateSyllabusForCourse(foundDetailed.courseName, foundDetailed.category, foundDetailed.description);

    return {
      id: foundDetailed.id,
      title: foundDetailed.courseName || foundDetailed.shortTitle,
      category: foundDetailed.category,
      duration: foundDetailed.duration,
      price: foundDetailed.price,
      description: foundDetailed.description,
      image: foundDetailed.bannerImage || foundDetailed.courseImage,
      trainer: foundDetailed.mentorName,
      lessons: syllabusLessons
    };
  }

  // 4. Check aliases in courseCatalog
  for (const key of Object.keys(courseCatalog)) {
    const c = courseCatalog[key];
    if (c.aliases && c.aliases.includes(cleanId)) {
      return c;
    }
  }

  // 5. Build dynamic course model for ANY other ID
  // Accurately reflects the requested course topic without defaulting to Python!
  const formattedTitle = cleanId
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    id: cleanId,
    courseId: cleanId,
    title: formattedTitle,
    course: formattedTitle,
    courseName: formattedTitle,
    category: detectCourseDomain({ title: formattedTitle }) ? 'Technology' : 'General',
    duration: '3 Months',
    price: 15000,
    description: `Comprehensive training program in ${formattedTitle}.`,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    lessons: generateSyllabusForCourse(formattedTitle, 'Technology', '')
  };
};

/**
 * Returns all available courses combining built-in catalog and custom Admin courses
 */
export const getAllCourses = () => {
  const catalogList = getCatalogCourses();
  const customList = getCustomCourses();

  // Combine and deduplicate by id
  const map = new Map();

  for (const c of catalogList) {
    map.set(String(c.id).toLowerCase(), {
      ...c,
      lessonsCount: c.lessons?.length || 6,
      trainer: c.category === 'Web Development' ? 'John David' : c.category === 'Python' ? 'Sneha Reddy' : c.category === 'Frontend Development' ? 'Rohan Sharma' : c.category === 'Java' ? 'Amit Patel' : 'Senior Industry Mentor'
    });
  }

  for (const c of customList) {
    const key = String(c.id).toLowerCase();
    map.set(key, {
      ...c,
      lessonsCount: c.lessons?.length || 6,
      trainer: c.trainer || c.instructor || 'Senior Industry Mentor'
    });
  }

  return Array.from(map.values());
};

/**
 * Subscribes to course repository update events
 */
export const subscribeCourses = (callback) => {
  if (typeof window === 'undefined') return () => {};
  const handler = (e) => callback(e.detail);
  window.addEventListener(COURSE_UPDATE_EVENT, handler);
  return () => window.removeEventListener(COURSE_UPDATE_EVENT, handler);
};

export default {
  getAllCourses,
  getCourseById,
  saveCustomCourse,
  deleteCustomCourse,
  generateSyllabusForCourse,
  normalizeCourseId,
  subscribeCourses
};
