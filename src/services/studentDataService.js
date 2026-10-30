// Student-specific learning data service for Smart Academy LMS
// Manages per-student course selection, watch history, and progress using unique user ID

import { getAllCourses, getCourseById } from './courseRepository.js';
import { courseCatalog } from '../data/courseCatalog.js';

const STORAGE_PREFIX = 'smartacademy_student_data_';
const UPDATE_EVENT_NAME = 'smartacademy_student_data_updated';

/**
 * Derives a stable, unique student key from user object
 */
export const getStudentKey = (user) => {
  if (!user) return 'guest_student';
  if (user.id && typeof user.id === 'string' && user.id.trim()) {
    return user.id.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  }
  if (user.email && typeof user.email === 'string' && user.email.trim()) {
    return 'student_' + user.email.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
  }
  return 'student_' + (user.name || 'user').trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
};

/**
 * Creates empty initial student record for a brand-new student
 */
const createInitialStudentData = (user) => {
  const key = getStudentKey(user);
  return {
    studentId: key,
    studentName: user?.name || 'Student',
    studentEmail: user?.email || '',
    isNewStudent: true,
    selectedCourseId: null,
    selectedCourse: null,
    enrolledCourses: [],
    watchedVideos: [],
    completedLessons: [],
    progress: 0,
    recentActivity: [],
    createdAt: new Date().toISOString()
  };
};

/**
 * Retrieves student-specific data from localStorage for the given student
 */
export const getStudentData = (user) => {
  if (!user || user.role !== 'student') {
    return createInitialStudentData(user);
  }

  const key = getStudentKey(user);
  const storageKey = STORAGE_PREFIX + key;

  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          studentId: key,
          studentName: user.name || parsed.studentName || 'Student',
          studentEmail: user.email || parsed.studentEmail || '',
          isNewStudent: !parsed.selectedCourseId && (!parsed.enrolledCourses || parsed.enrolledCourses.length === 0),
          selectedCourseId: parsed.selectedCourseId || null,
          selectedCourse: parsed.selectedCourse || null,
          enrolledCourses: Array.isArray(parsed.enrolledCourses) ? parsed.enrolledCourses : [],
          watchedVideos: Array.isArray(parsed.watchedVideos) ? parsed.watchedVideos : [],
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          progress: typeof parsed.progress === 'number' ? parsed.progress : 0,
          recentActivity: Array.isArray(parsed.recentActivity) ? parsed.recentActivity : [],
          createdAt: parsed.createdAt || new Date().toISOString()
        };
      }
    }
  } catch (err) {
    console.error('Error reading student data for key:', key, err);
  }

  return createInitialStudentData(user);
};

/**
 * Saves student data to localStorage and emits an update event
 */
export const saveStudentData = (user, data) => {
  if (!user || user.role !== 'student') return;

  const key = getStudentKey(user);
  const storageKey = STORAGE_PREFIX + key;

  try {
    const payload = {
      ...data,
      studentId: key,
      studentName: user.name || data.studentName || 'Student',
      studentEmail: user.email || data.studentEmail || '',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));

    // Notify all listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME, { detail: { studentKey: key, data: payload } }));
    }
  } catch (err) {
    console.error('Error saving student data for key:', key, err);
  }
};

/**
 * Subscribes to student data update events
 */
export const subscribeStudentData = (callback) => {
  if (typeof window === 'undefined') return () => {};
  const handler = (e) => {
    callback(e.detail);
  };
  window.addEventListener(UPDATE_EVENT_NAME, handler);
  return () => window.removeEventListener(UPDATE_EVENT_NAME, handler);
};

/**
 * Returns available courses for course selection
 */
export const getAvailableCourses = () => {
  const catalogList = getAllCourses();
  return catalogList.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    price: c.price,
    duration: c.duration,
    image: c.image,
    lessonsCount: c.lessons?.length || 6,
    description: c.lessons?.[0]?.topic ? `Includes ${c.lessons.length} structured video lessons from ${c.lessons[0].title} onwards.` : 'Comprehensive industry-aligned course.',
    trainer: c.category === 'Web Development' ? 'John David' : c.category === 'Python' ? 'Sneha Reddy' : c.category === 'Frontend Development' ? 'Rohan Sharma' : c.category === 'Java' ? 'Amit Patel' : 'Senior Industry Mentor'
  }));
};

/**
 * Selects a course for a student and saves it under their user ID
 */
export const selectStudentCourse = (user, courseOrId) => {
  if (!user) return null;

  const currentData = getStudentData(user);
  let courseObj = typeof courseOrId === 'object' ? courseOrId : null;

  if (!courseObj) {
    const found = getCourseById(courseOrId);
    if (found) {
      courseObj = {
        id: found.id,
        title: found.title,
        category: found.category,
        image: found.image,
        duration: found.duration,
        lessonsCount: found.lessons?.length || 6,
        trainer: 'Expert Mentor'
      };
    }
  }

  if (!courseObj) return currentData;

  const courseId = courseObj.id;
  const courseTitle = courseObj.title || 'Course';

  // Check if course already enrolled
  const existingEnrolled = (currentData.enrolledCourses || []).find((c) => c.id === courseId);
  let updatedEnrolled = [...(currentData.enrolledCourses || [])];

  if (!existingEnrolled) {
    updatedEnrolled.push({
      id: courseId,
      title: courseTitle,
      progress: 0,
      trainer: courseObj.trainer || 'Expert Mentor',
      lessonsCount: courseObj.lessonsCount || 6,
      completedLessons: 0,
      image: courseObj.image,
      tags: [courseObj.category || 'Tech'],
      duration: courseObj.duration || 'Flexible',
      enrolledAt: new Date().toISOString()
    });
  }

  const updatedData = {
    ...currentData,
    isNewStudent: false,
    selectedCourseId: courseId,
    selectedCourse: {
      id: courseId,
      title: courseTitle,
      category: courseObj.category || 'Tech',
      image: courseObj.image,
      duration: courseObj.duration || 'Flexible',
      lessonsCount: courseObj.lessonsCount || 6,
      trainer: courseObj.trainer || 'Expert Mentor'
    },
    enrolledCourses: updatedEnrolled,
    recentActivity: [
      {
        action: `Enrolled in "${courseTitle}"`,
        time: 'Just now',
        icon: 'BookOpen'
      },
      ...currentData.recentActivity.slice(0, 4)
    ]
  };

  saveStudentData(user, updatedData);

  // Also update session user object's course name if currently authenticated
  try {
    const rawUser = localStorage.getItem('smartacademy_auth_user');
    if (rawUser) {
      const parsedUser = JSON.parse(rawUser);
      parsedUser.course = courseTitle;
      localStorage.setItem('smartacademy_auth_user', JSON.stringify(parsedUser));
    }
  } catch (_e) {}

  return updatedData;
};

/**
 * Records that a video was watched by the authenticated student
 */
export const recordVideoWatch = (user, videoId, videoTitle) => {
  if (!user || !videoId) return;

  const currentData = getStudentData(user);
  const watchedSet = new Set(currentData.watchedVideos || []);

  const videoKey = String(videoId);
  if (!watchedSet.has(videoKey)) {
    watchedSet.add(videoKey);

    const updatedData = {
      ...currentData,
      watchedVideos: Array.from(watchedSet),
      recentActivity: [
        {
          action: `Watched lesson "${videoTitle || 'Lesson ' + videoKey}"`,
          time: 'Just now',
          icon: 'Video'
        },
        ...currentData.recentActivity.slice(0, 4)
      ]
    };

    saveStudentData(user, updatedData);
  }
};

/**
 * Toggles a lesson's completion status for the student
 */
export const toggleLessonCompletion = (user, courseId, lessonId, lessonTitle) => {
  if (!user || lessonId == null) return;

  const currentData = getStudentData(user);
  const completedList = [...(currentData.completedLessons || [])];
  const lessonKey = Number(lessonId);

  const idx = completedList.indexOf(lessonKey);
  const isNowCompleted = idx === -1;

  if (isNowCompleted) {
    completedList.push(lessonKey);
  } else {
    completedList.splice(idx, 1);
  }

  // Calculate new progress for this course
  const catalogCourse = getCourseById(courseId);
  const totalLessons = catalogCourse?.lessons?.length || currentData.selectedCourse?.lessonsCount || 6;
  const progressPercent = Math.min(100, Math.round((completedList.length / totalLessons) * 100));

  // Also update enrolledCourses array
  const updatedEnrolled = (currentData.enrolledCourses || []).map((c) => {
    if (c.id === courseId) {
      return {
        ...c,
        progress: progressPercent,
        completedLessons: completedList.length
      };
    }
    return c;
  });

  // Ensure watchedVideos includes this lesson
  const watchedSet = new Set(currentData.watchedVideos || []);
  if (isNowCompleted) {
    watchedSet.add(String(lessonKey));
  }

  const updatedData = {
    ...currentData,
    completedLessons: completedList,
    watchedVideos: Array.from(watchedSet),
    progress: progressPercent,
    enrolledCourses: updatedEnrolled,
    recentActivity: [
      {
        action: isNowCompleted
          ? `Completed lesson "${lessonTitle || 'Lesson ' + lessonKey}"`
          : `Marked lesson "${lessonTitle || 'Lesson ' + lessonKey}" as in-progress`,
        time: 'Just now',
        icon: 'CheckCircle'
      },
      ...currentData.recentActivity.slice(0, 4)
    ]
  };

  saveStudentData(user, updatedData);

  // Auto-generate certificate if all lessons completed (100% progress)
  if (isNowCompleted && progressPercent >= 100) {
    import('./certificateService.js')
      .then(({ autoGenerateCertificateIfEligible }) => {
        autoGenerateCertificateIfEligible(user, courseId).catch((err) => {
          console.warn('Auto-generation of certificate error:', err);
        });
      })
      .catch((err) => {
        console.warn('Could not load certificateService:', err);
      });
  }

  return updatedData;
};
