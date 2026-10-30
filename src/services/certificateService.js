import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getCourseById, getAllCourses } from './courseRepository';
import { getStudentData, getStudentKey } from './studentDataService';

const CERT_STORAGE_KEY = 'smartacademy_certificates';
const CERT_UPDATE_EVENT = 'smartacademy_certificates_updated';

/**
 * Generate a unique Certificate ID: CERT-YYYY-XXXXXX
 */
export const generateCertificateId = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `CERT-${year}-${randomNum}`;
};

/**
 * Reads local cached certificates from localStorage
 */
export const getLocalCertificates = () => {
  try {
    const raw = localStorage.getItem(CERT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading certificates from localStorage:', err);
    return [];
  }
};

/**
 * Saves certificates to localStorage and notifies listeners
 */
export const saveLocalCertificates = (certList) => {
  try {
    localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(certList));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(CERT_UPDATE_EVENT, { detail: certList }));
    }
  } catch (err) {
    console.error('Error saving certificates to localStorage:', err);
  }
};

/**
 * Subscribes to certificate update events
 */
export const subscribeCertificates = (callback) => {
  if (typeof window === 'undefined') return () => {};
  const handler = (e) => {
    callback(e.detail);
  };
  window.addEventListener(CERT_UPDATE_EVENT, handler);
  return () => window.removeEventListener(CERT_UPDATE_EVENT, handler);
};

/**
 * Merges two certificate lists, removing duplicates by certificateId or id
 */
export const mergeCertificates = (listA = [], listB = []) => {
  const map = new Map();
  [...listA, ...listB].forEach((item) => {
    if (!item) return;
    const key = item.certificateId || item.id;
    if (key) {
      const existing = map.get(key);
      if (!existing) {
        map.set(key, item);
      } else {
        // Keep the more recent or updated version
        map.set(key, { ...existing, ...item });
      }
    }
  });
  return Array.from(map.values()).sort((a, b) => {
    const dateA = new Date(a.createdAt || a.completionDate || 0).getTime();
    const dateB = new Date(b.createdAt || b.completionDate || 0).getTime();
    return dateB - dateA;
  });
};

/**
 * Fetches all certificates from Firestore and localStorage cache
 */
export const getAllCertificates = async () => {
  const localList = getLocalCertificates();
  try {
    const snapshot = await getDocs(collection(db, 'certificates'));
    const firestoreList = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    const merged = mergeCertificates(firestoreList, localList);
    saveLocalCertificates(merged);
    return merged;
  } catch (err) {
    console.warn('Firestore fetch certificates failed, returning local cache:', err);
    return localList;
  }
};

/**
 * Fetches certificates belonging to a specific student
 */
export const getCertificatesForStudent = async (user) => {
  if (!user) return [];
  const all = await getAllCertificates();
  const studentKey = getStudentKey(user);
  const userEmail = (user.email || '').trim().toLowerCase();
  const userName = (user.name || '').trim().toLowerCase();

  return all.filter((cert) => {
    const certStudentId = (cert.studentId || '').trim().toLowerCase();
    const certEmail = (cert.email || '').trim().toLowerCase();
    const certName = (cert.studentName || '').trim().toLowerCase();

    return (
      (certStudentId && (certStudentId === studentKey || certStudentId === user.id)) ||
      (certEmail && userEmail && certEmail === userEmail) ||
      (certName && userName && certName === userName)
    );
  });
};

/**
 * Issues a new certificate in both Firestore and localStorage
 */
export const issueCertificate = async (certificateData) => {
  const certificateId = certificateData.certificateId || generateCertificateId();
  const newRecord = {
    ...certificateData,
    certificateId,
    provider: 'SwordNex Academy',
    status: certificateData.status || 'Issued',
    completionDate: certificateData.completionDate || new Date().toISOString().split('T')[0],
    createdAt: certificateData.createdAt || new Date().toISOString(),
  };

  let firestoreId = null;
  try {
    const docRef = await addDoc(collection(db, 'certificates'), newRecord);
    firestoreId = docRef.id;
  } catch (err) {
    console.warn('Could not save certificate to Firestore (saved locally):', err);
  }

  const savedRecord = {
    ...newRecord,
    id: firestoreId || `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  };

  const currentLocal = getLocalCertificates();
  const updatedLocal = mergeCertificates([savedRecord], currentLocal);
  saveLocalCertificates(updatedLocal);

  return savedRecord;
};

/**
 * Revokes a certificate in both Firestore and localStorage
 */
export const revokeCertificate = async (certificate) => {
  if (!certificate) return false;
  const certId = certificate.id;
  const certificateId = certificate.certificateId;

  try {
    if (certId && !certId.startsWith('local_')) {
      await updateDoc(doc(db, 'certificates', certId), {
        status: 'Revoked',
        revokedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn('Could not update Firestore certificate status to Revoked:', err);
  }

  const currentLocal = getLocalCertificates();
  const updatedLocal = currentLocal.map((c) => {
    if (c.id === certId || c.certificateId === certificateId) {
      return {
        ...c,
        status: 'Revoked',
        revokedAt: new Date().toISOString(),
      };
    }
    return c;
  });

  saveLocalCertificates(updatedLocal);
  return true;
};

/**
 * Automatically generates a certificate when a student satisfies course completion requirements:
 * 1. Checks if all lessons are completed (or course progress is 100%)
 * 2. Checks if certificate already exists for this student and course (prevents duplicates)
 * 3. Does not generate for incomplete courses
 * 4. Generates with SwordNex Academy provider, student registered name, course title, completion date, unique ID
 */
export const autoGenerateCertificateIfEligible = async (user, courseIdOrKey) => {
  if (!user || user.role !== 'student') {
    return { eligible: false, reason: 'User must be an authenticated student' };
  }

  const studentKey = getStudentKey(user);
  const studentData = getStudentData(user);
  const course = getCourseById(courseIdOrKey);

  if (!course) {
    return { eligible: false, reason: `Course ${courseIdOrKey} not found` };
  }

  // 1. Check completion requirements
  const courseLessons = course.lessons || [];
  const completedLessons = studentData.completedLessons || [];

  let isComplete = false;
  if (courseLessons.length > 0) {
    // Check if every lesson in this course has been completed
    const completedForThisCourse = courseLessons.filter((l) => completedLessons.includes(l.id));
    isComplete = completedForThisCourse.length === courseLessons.length;
  }

  // Fallback check: enrolled course object progress === 100
  if (!isComplete && Array.isArray(studentData.enrolledCourses)) {
    const enrolled = studentData.enrolledCourses.find(
      (c) => c.id === course.id || (c.title && c.title.toLowerCase() === course.title.toLowerCase())
    );
    if (enrolled && (enrolled.progress >= 100 || enrolled.completedLessons >= (courseLessons.length || 6))) {
      isComplete = true;
    }
  }

  // Also check global studentData.progress if single course selected
  if (!isComplete && studentData.selectedCourseId === course.id && studentData.progress >= 100) {
    isComplete = true;
  }

  if (!isComplete) {
    return { eligible: false, reason: 'Course incomplete: student has not completed all required lessons' };
  }

  // 2. Prevent duplicate certificates for the same student and course
  const existingCerts = await getAllCertificates();
  const userEmail = (user.email || '').trim().toLowerCase();
  const userName = (user.name || '').trim().toLowerCase();
  const courseTitleLower = course.title.trim().toLowerCase();

  const duplicate = existingCerts.find((cert) => {
    if (cert.status === 'Revoked') return false; // revoked certificates can be re-issued if needed

    const certStudentId = (cert.studentId || '').trim().toLowerCase();
    const certEmail = (cert.email || '').trim().toLowerCase();
    const certName = (cert.studentName || '').trim().toLowerCase();
    const certCourse = (cert.course || '').trim().toLowerCase();
    const certCourseId = (cert.courseId || '').trim().toLowerCase();

    const matchesStudent =
      certStudentId === studentKey ||
      certStudentId === (user.id || '').toLowerCase() ||
      (certEmail && userEmail && certEmail === userEmail) ||
      (certName && userName && certName === userName);

    const matchesCourse =
      certCourse === courseTitleLower ||
      certCourseId === course.id.toLowerCase();

    return matchesStudent && matchesCourse;
  });

  if (duplicate) {
    return {
      eligible: false,
      reason: 'Certificate already issued for this student and course',
      certificate: duplicate,
    };
  }

  // 3. Issue certificate with real registered name and completed course information
  const registeredName = user.name || studentData.studentName || 'Student';
  const registeredEmail = user.email || studentData.studentEmail || '';
  const registeredPhone = user.phone || studentData.phone || '';

  const newCertificateData = {
    certificateId: generateCertificateId(),
    studentId: studentKey,
    studentName: registeredName,
    email: registeredEmail,
    phone: registeredPhone,
    course: course.title,
    courseId: course.id,
    completionDate: new Date().toISOString().split('T')[0],
    provider: 'SwordNex Academy',
    status: 'Issued',
    createdAt: new Date().toISOString(),
  };

  const saved = await issueCertificate(newCertificateData);

  return {
    eligible: true,
    certificate: saved,
  };
};

/**
 * Checks all enrolled courses for an authenticated student and auto-generates any missing certificates
 */
export const checkAndAutoGenerateAllEligible = async (user) => {
  if (!user || user.role !== 'student') return [];
  const studentData = getStudentData(user);
  const enrolledCourses = studentData.enrolledCourses || [];

  const newlyGenerated = [];
  for (const enrolled of enrolledCourses) {
    const res = await autoGenerateCertificateIfEligible(user, enrolled.id);
    if (res.eligible && res.certificate) {
      newlyGenerated.push(res.certificate);
    }
  }

  if (studentData.selectedCourseId) {
    const res = await autoGenerateCertificateIfEligible(user, studentData.selectedCourseId);
    if (res.eligible && res.certificate) {
      newlyGenerated.push(res.certificate);
    }
  }

  return newlyGenerated;
};

/**
 * Exports certificate list to downloadable CSV
 */
export const exportCertificatesToCSV = (certList = []) => {
  if (!certList || certList.length === 0) {
    alert('No certificates available to export.');
    return;
  }

  const headers = ['"Certificate ID"', '"Student Name"', '"Email"', '"Course"', '"Completion Date"', '"Status"', '"Provider"'];
  const rows = certList.map((c) => [
    `"${(c.certificateId || '').replace(/"/g, '""')}"`,
    `"${(c.studentName || '').replace(/"/g, '""')}"`,
    `"${(c.email || '').replace(/"/g, '""')}"`,
    `"${(c.course || '').replace(/"/g, '""')}"`,
    `"${(c.completionDate || '').replace(/"/g, '""')}"`,
    `"${(c.status || '').replace(/"/g, '""')}"`,
    `"${(c.provider || 'SwordNex Academy').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `swordnex_certificates_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
