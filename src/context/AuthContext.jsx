import React, { createContext, useContext, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getStudentData, getStudentKey } from '../services/studentDataService';

const AuthContext = createContext();

// Format a clean, human-readable name from an email or user identifier
const formatNameFromIdentifier = (identifier, role) => {
  if (!identifier || typeof identifier !== 'string') {
    return role === 'student' ? 'Student' : role === 'trainer' ? 'Trainer' : role === 'admin' ? 'Admin Officer' : 'Super Admin';
  }

  const trimmed = identifier.trim();
  const localPart = trimmed.includes('@') ? trimmed.split('@')[0] : trimmed;
  const normalized = localPart.toLowerCase();

  if (['student', 'trainer', 'user', 'admin', 'super-admin'].includes(normalized)) {
    return role === 'student' ? 'Student' : role === 'trainer' ? 'Trainer' : role === 'admin' ? 'Admin Officer' : 'Super Admin';
  }

  if (normalized === 'johndavid') {
    return 'John David';
  }

  const cleaned = localPart
    .replace(/[._-]+/g, ' ')
    .replace(/\d+$/, '')
    .trim();

  if (!cleaned) {
    return role === 'student' ? 'Student' : role === 'trainer' ? 'Trainer' : role === 'admin' ? 'Admin Officer' : 'Super Admin';
  }

  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Search local profile storage without mixing Student and Trainer data
const fetchProfileFromLocalStorage = (identifier, role) => {
  if (!identifier) return null;
  const clean = identifier.trim().toLowerCase();

  try {
    const storeKey = role === 'student' ? 'smartacademy_student_profiles' : 'smartacademy_trainer_profiles';
    const raw = localStorage.getItem(storeKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const found = parsed.find(
          (p) =>
            (p.email || '').toLowerCase() === clean ||
            (p.id || '').toString().toLowerCase() === clean ||
            (p.studentName || p.name || '').toLowerCase() === clean
        );
        if (found) {
          return {
            name: found.studentName || found.name,
            email: found.email || identifier,
            phone: found.phone,
            course: found.course,
            specialization: found.specialization,
          };
        }
      } else if (typeof parsed === 'object' && parsed !== null) {
        if (parsed[clean]) {
          const found = parsed[clean];
          return {
            name: typeof found === 'string' ? found : found.studentName || found.name,
            email: found.email || identifier,
            phone: found.phone,
            course: found.course,
            specialization: found.specialization,
          };
        }
      }
    }
  } catch (_e) {
    // ignore local storage errors
  }
  return null;
};

// Search Firestore database without mixing Student and Trainer collections
const fetchProfileFromFirestore = async (identifier, role) => {
  if (!identifier) return null;
  const clean = identifier.trim().toLowerCase();

  try {
    const colName = role === 'student' ? 'students' : role === 'trainer' ? 'trainers' : null;
    if (!colName) return null;

    const snap = await getDocs(collection(db, colName));
    for (const doc of snap.docs) {
      const data = doc.data() || {};
      const docEmail = (data.email || '').toLowerCase().trim();
      const docName = (data.studentName || data.name || '').trim();
      const docId = doc.id.toLowerCase().trim();

      if (docEmail === clean || docId === clean || docName.toLowerCase() === clean) {
        return {
          name: docName,
          email: data.email || identifier,
          phone: data.phone || '+91 98765 43210',
          course: data.course || '',
          specialization: data.specialization || '',
        };
      }
    }
  } catch (_err) {
    // Firestore may be unreachable or denied by rules
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('smartacademy_auth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          // Sanitize any previous hardcoded test artifacts
          if (parsed.role === 'student' && parsed.name === 'Kutty') {
            parsed.name = 'Student';
          }
          if (parsed.role === 'trainer' && parsed.name === 'John David') {
            if (!parsed.email?.toLowerCase().includes('john.david') && !parsed.email?.toLowerCase().includes('johndavid')) {
              parsed.name = 'Trainer';
            }
          }
          // Ensure unique ID exists
          if (!parsed.id) {
            parsed.id = getStudentKey(parsed);
          }
          // For student, synchronize current selected course
          if (parsed.role === 'student') {
            const studentData = getStudentData(parsed);
            if (studentData?.selectedCourse?.title) {
              parsed.course = studentData.selectedCourse.title;
            } else if (!studentData?.selectedCourseId) {
              parsed.course = '';
            }
          }
          return parsed;
        }
      }
    } catch (_e) {}

    return {
      id: 'admin_officer',
      name: 'Admin Officer',
      email: 'admin@swordnex.com',
      phone: '+91 98765 43210',
      role: 'admin',
      course: '',
      profileCompletion: 90,
      resumeUploaded: true,
    };
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password, role = 'student', extraName = null) => {
    setLoading(true);

    // 1. Resolve immediate profile synchronously (avoids flash or delay)
    let resolvedName = (typeof extraName === 'string' && extraName.trim())
      ? extraName.trim()
      : null;

    if (!resolvedName) {
      const localProfile = fetchProfileFromLocalStorage(email, role);
      if (localProfile?.name) {
        resolvedName = localProfile.name;
      }
    }

    if (!resolvedName) {
      resolvedName = formatNameFromIdentifier(email, role);
    }

    const cleanEmail = (email || `${role}@swordnex.com`).trim();
    const uniqueUserId = role === 'student'
      ? getStudentKey({ email: cleanEmail, name: resolvedName })
      : `${role}_${cleanEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    // For a student, check if they have a previously selected course
    let studentCourse = '';
    if (role === 'student') {
      const studentData = getStudentData({ id: uniqueUserId, email: cleanEmail });
      if (studentData?.selectedCourse?.title) {
        studentCourse = studentData.selectedCourse.title;
      }
    }

    const initialUser = {
      id: uniqueUserId,
      name: resolvedName,
      email: cleanEmail,
      phone: '+91 98765 43210',
      role,
      course: studentCourse,
      profileCompletion: 90,
      resumeUploaded: true,
    };

    setUser(initialUser);

    try {
      localStorage.setItem('smartacademy_auth_user', JSON.stringify(initialUser));
    } catch (_e) {}

    // 2. Asynchronously retrieve full profile from Firestore if available
    try {
      const remoteProfile = await fetchProfileFromFirestore(cleanEmail, role);
      if (remoteProfile && remoteProfile.name) {
        setUser((prev) => {
          const updated = {
            ...prev,
            name: remoteProfile.name,
            email: remoteProfile.email || prev.email,
            phone: remoteProfile.phone || prev.phone,
            course: remoteProfile.course || prev.course,
          };
          try {
            localStorage.setItem('smartacademy_auth_user', JSON.stringify(updated));
          } catch (_e) {}
          return updated;
        });
      }
    } catch (_err) {
      // safe fallback already active
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('smartacademy_auth_user');
    } catch (_e) {}
  };

  const switchRole = (role) => {
    const fallbackName =
      role === 'student'
        ? 'Student'
        : role === 'trainer'
        ? 'Trainer'
        : role === 'admin'
        ? 'Admin Officer'
        : 'Super Admin';

    const cleanEmail = `${role}@swordnex.com`;
    const uniqueUserId = role === 'student'
      ? getStudentKey({ email: cleanEmail, name: fallbackName })
      : `${role}_${cleanEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    let studentCourse = '';
    if (role === 'student') {
      const studentData = getStudentData({ id: uniqueUserId, email: cleanEmail });
      if (studentData?.selectedCourse?.title) {
        studentCourse = studentData.selectedCourse.title;
      }
    }

    const switchedUser = {
      id: uniqueUserId,
      name: fallbackName,
      email: cleanEmail,
      phone: '+91 98765 43210',
      role,
      course: studentCourse,
      profileCompletion: 90,
      resumeUploaded: true,
    };

    setUser(switchedUser);
    try {
      localStorage.setItem('smartacademy_auth_user', JSON.stringify(switchedUser));
    } catch (_e) {}
  };

  // IMPORTANT
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        switchRole,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);