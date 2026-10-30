/**
 * Unified Resource Repository for SwordNex / Smart Academy LMS
 *
 * Synchronizes built-in educational resources with admin-uploaded notes, videos,
 * PPTs, coding files, and official study links.
 *
 * Features:
 * - Seamless offline & permission-denied resilience: if Firestore security rules
 *   block anonymous queries, the app continues to display genuine curriculum resources
 *   and admin uploads without crashing or alerting.
 * - Real-time synchronization between Admin panel and Student Resources Center.
 * - Unified category mapping for Notes, Videos, Links, PDFs, and Presentations.
 */

import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { CURRICULUM_RESOURCES } from '../data/curriculumResources.js';

const STORAGE_KEY_CUSTOM_RESOURCES = 'smartacademy_custom_resources';
const STORAGE_KEY_REMOTE_CACHE = 'smartacademy_remote_resources_cache';
const RESOURCES_UPDATE_EVENT = 'smartacademy_resources_updated';

// In-memory fallback for environments without localStorage (e.g. Node.js unit tests)
let inMemoryCustomResources = [];
let inMemoryRemoteCache = [];

const IDB_NAME = 'smartacademy_files_store';
const IDB_STORE = 'files';

const getIDB = () => {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
};

export const saveFileToIDB = async (key, data) => {
  try {
    const db = await getIDB();
    if (!db) return;
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(data, key);
  } catch {}
};

export const getFileFromIDB = async (key) => {
  try {
    const db = await getIDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
};

/**
 * Genuine, curriculum-aligned academic resources matching SwordNex Academy courses
 */
export const BUILT_IN_RESOURCES = CURRICULUM_RESOURCES;


/**
 * Reads custom resources from localStorage (safe in SSR / Node)
 */
export const getCustomResources = () => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_RESOURCES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Rehydrate any stored files from IDB asynchronously
          parsed.forEach((item) => {
            if (item.hasStoredFile && !item.fileUrl) {
              getFileFromIDB(item.id).then((fileData) => {
                if (fileData) {
                  item.fileUrl = fileData;
                  item.fileURL = fileData;
                  notifySubscribers();
                }
              });
            }
          });
          return parsed;
        }
      }
    } catch (_e) {
      // ignore JSON parse error
    }
  }
  return inMemoryCustomResources;
};

/**
 * Saves custom resources into localStorage (safe in SSR / Node)
 */
export const saveCustomResources = (resources) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_RESOURCES, JSON.stringify(resources));
    } catch (_e) {
      // Storage quota exceeded (e.g. large base64 file)
      // Save large files in IndexedDB, and keep trimmed payload in localStorage
      try {
        resources.forEach((r) => {
          if (r.fileUrl && r.fileUrl.startsWith('data:') && r.fileUrl.length > 300000) {
            saveFileToIDB(r.id, r.fileUrl);
          }
        });
        const trimmed = resources.map((r) => {
          if (r.fileUrl && r.fileUrl.startsWith('data:') && r.fileUrl.length > 300000) {
            return { ...r, hasStoredFile: true, fileUrl: '' };
          }
          return r;
        });
        localStorage.setItem(STORAGE_KEY_CUSTOM_RESOURCES, JSON.stringify(trimmed));
      } catch (_e2) {}
    }
  }
  inMemoryCustomResources = resources;
  notifySubscribers();
};

/**
 * Reads cached remote resources
 */
export const getRemoteCache = () => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_REMOTE_CACHE);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (_e) {
      // ignore JSON parse error
    }
  }
  return inMemoryRemoteCache;
};

/**
 * Saves remote resources into cache
 */
export const saveRemoteCache = (resources) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_REMOTE_CACHE, JSON.stringify(resources));
    } catch (_e) {
      // ignore storage quota error
    }
  }
  inMemoryRemoteCache = resources;
  notifySubscribers();
};

/**
 * Dispatches an event so all listening components update immediately
 */
const notifySubscribers = () => {
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    try {
      window.dispatchEvent(new CustomEvent(RESOURCES_UPDATE_EVENT));
    } catch (_e) {
      // ignore dispatch error
    }
  }
};

/**
 * Subscribes to resource changes across components and storage events
 */
export const subscribeResources = (callback) => {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = () => {
    callback(getAllResources());
  };

  window.addEventListener(RESOURCES_UPDATE_EVENT, handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener(RESOURCES_UPDATE_EVENT, handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
};

/**
 * Normalizes a raw resource object to standard format
 */
export const normalizeResource = (data, fallbackId = '') => {
  const id = data.id || data.resourceId || fallbackId || `res-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const title = (data.title || data.name || 'Untitled Resource').trim();
  const course = (data.course || data.subject || 'General').trim();
  const category = (data.category || data.chapter || 'Study Materials').trim();
  const trainer = (data.trainer || data.uploadedBy || data.author || 'SwordNex Faculty').trim();
  const description = (data.description || '').trim();
  let fileUrl = (data.fileUrl || data.fileURL || data.url || data.link || '').trim();
  
  // Sanitize: never allow raw markdown or source code URLs to be passed directly as fileUrl
  if (fileUrl.includes('raw.githubusercontent.com') || fileUrl.endsWith('.md')) {
    fileUrl = '';
  }

  const fileName = data.fileName || data.file || (fileUrl ? fileUrl.split('/').pop().split('?')[0] : `${title.replace(/\s+/g, '_')}.pdf`);
  const fileSize = Number(data.fileSize || data.size || 0);
  const status = data.status || 'Published';
  const createdAt = data.createdAt || new Date().toISOString();

  // Normalize Type
  let rawType = (data.type || '').trim();
  if (!rawType) {
    if (data.collectionName === 'videos' || fileUrl.includes('.mp4') || fileName.includes('.mp4')) {
      rawType = 'Video';
    } else if (data.collectionName === 'ppts' || fileUrl.includes('.ppt') || fileName.includes('.ppt')) {
      rawType = 'PPT';
    } else if (data.collectionName === 'codingFiles' || fileUrl.includes('.zip') || fileName.includes('.zip')) {
      rawType = 'Code';
    } else if (fileUrl.startsWith('http') && !fileUrl.includes('.pdf') && !fileUrl.includes('.mp4') && !fileUrl.includes('.ppt')) {
      rawType = 'Link';
    } else if (fileName.endsWith('.pdf')) {
      rawType = 'PDF';
    } else {
      rawType = 'Notes';
    }
  }

  // Map type to one of standard: 'Notes', 'Video', 'PPT', 'Link', 'Code', 'PDF'
  let type = rawType;
  if (/video/i.test(rawType)) type = 'Video';
  else if (/ppt|presentation/i.test(rawType)) type = 'PPT';
  else if (/link|url|website|doc/i.test(rawType)) type = 'Link';
  else if (/code|script|zip/i.test(rawType)) type = 'Code';
  else if (/pdf/i.test(rawType)) type = 'PDF';
  else if (/note/i.test(rawType)) type = 'Notes';

  return {
    id,
    resourceId: id,
    title,
    course,
    courseId: data.courseId || data.courseID || '',
    subject: course,
    category,
    chapter: category,
    type,
    trainer,
    uploadedBy: trainer,
    description,
    fileUrl,
    fileName,
    fileSize,
    status,
    createdAt,
    views: Number(data.views || 0),
    downloads: Number(data.downloads || 0),
    storagePath: data.storagePath || '',
    collectionName: data.collectionName || (type === 'Video' ? 'videos' : type === 'PPT' ? 'ppts' : type === 'Code' ? 'codingFiles' : 'resources'),
    notesContent: data.notesContent || data.content || null,
  };
};

/**
 * Returns all active resources by merging:
 * 1. Built-in curriculum resources
 * 2. Cached remote resources from Firestore
 * 3. Custom resources saved by Admin in localStorage
 */
export const getAllResources = () => {
  const custom = getCustomResources();
  const remote = getRemoteCache();

  // Merge map keyed by ID
  const resourceMap = new Map();

  // 1. Built-in
  BUILT_IN_RESOURCES.forEach((item) => {
    const norm = normalizeResource(item, item.id);
    resourceMap.set(norm.id, norm);
  });

  // 2. Remote
  remote.forEach((item) => {
    const norm = normalizeResource(item, item.id);
    resourceMap.set(norm.id, norm);
  });

  // 3. Custom / Admin uploads (takes highest priority)
  custom.forEach((item) => {
    const norm = normalizeResource(item, item.id);
    resourceMap.set(norm.id, norm);
  });

  return Array.from(resourceMap.values());
};

/**
 * Accurately determines if a resource matches the selected course or topic.
 * Strictly prevents cross-course contamination (e.g. Python does not match HTML or Java).
 */
export const isCourseMatch = (resourceCourse, targetCourse) => {
  if (!targetCourse || targetCourse === 'All' || targetCourse === 'All Courses') return true;

  const res = (resourceCourse || '').toLowerCase().trim();
  const tgt = targetCourse.toLowerCase().trim();

  if (res === tgt) return true;

  // Python
  if (tgt.includes('python')) {
    return res.includes('python');
  }

  // React
  if (tgt.includes('react')) {
    return res.includes('react');
  }

  // Java (strictly exclude JavaScript)
  if (tgt.includes('java') && !tgt.includes('javascript')) {
    return res.includes('java') && !res.includes('javascript');
  }

  // MongoDB / NoSQL
  if (tgt.includes('mongo') || tgt.includes('nosql')) {
    return res.includes('mongo') || res.includes('nosql');
  }

  // SQL
  if (tgt.includes('sql') || tgt === 'sql database') {
    return (res.includes('sql') || res === 'sql database') && !res.includes('mongo') && !res.includes('nosql');
  }

  // AI & Machine Learning
  if (tgt.includes('ai') || tgt.includes('machine learning') || tgt.includes('machine-learning') || tgt.includes('ml')) {
    return res.includes('ai') || res.includes('machine learning') || res.includes('deep learning');
  }

  // Data Science
  if (tgt.includes('data science') || tgt.includes('datascience')) {
    return res.includes('data science') || res.includes('datascience') || res.includes('pandas');
  }

  // Node.js
  if (tgt.includes('node')) {
    return res.includes('node');
  }

  // MongoDB
  if (tgt.includes('mongo')) {
    return res.includes('mongo');
  }

  // Angular
  if (tgt.includes('angular')) {
    return res.includes('angular');
  }

  // UI/UX
  if (tgt.includes('ui') || tgt.includes('ux') || tgt.includes('design')) {
    return res.includes('ui') || res.includes('ux') || res.includes('design');
  }

  // ASP.NET
  if (tgt.includes('asp') || tgt.includes('.net') || tgt.includes('dotnet')) {
    return res.includes('asp') || res.includes('.net') || res.includes('dotnet');
  }

  // Digital Marketing
  if (tgt.includes('marketing') || tgt.includes('seo')) {
    return res.includes('marketing') || res.includes('seo');
  }

  // Web Development / FSD
  if (tgt.includes('web') || tgt.includes('full stack') || tgt.includes('fsd')) {
    return res.includes('web') || res.includes('full stack') || res.includes('fsd');
  }

  return res.includes(tgt) || tgt.includes(res);
};

/**
 * Matches a resource against category filter
 */
export const matchesCategory = (resource, selectedCategory) => {
  if (!selectedCategory || selectedCategory === 'All') {
    return true;
  }

  const cat = selectedCategory.toLowerCase().trim();
  const resType = (resource.type || '').toLowerCase().trim();
  const resCat = (resource.category || '').toLowerCase().trim();
  const resTitle = (resource.title || '').toLowerCase().trim();
  const resFile = (resource.fileName || '').toLowerCase().trim();
  const resUrl = (resource.fileUrl || '').toLowerCase().trim();

  // 1. NOTES
  if (cat === 'notes') {
    return (
      resType === 'notes' ||
      resType === 'ppt' ||
      resCat.includes('note') ||
      resCat.includes('study') ||
      resTitle.includes('note')
    );
  }

  // 2. VIDEOS
  if (cat === 'videos' || cat === 'video') {
    return resType === 'video' || resCat.includes('video') || resFile.endsWith('.mp4');
  }

  // 3. LINKS
  if (cat === 'links' || cat === 'link') {
    return (
      resType === 'link' ||
      resType === 'url' ||
      resCat.includes('link') ||
      resCat.includes('doc') ||
      resCat.includes('official')
    );
  }

  // 4. PDFS
  if (cat === 'pdfs' || cat === 'pdf') {
    return (
      resType === 'pdf' ||
      resFile.endsWith('.pdf') ||
      resUrl.includes('.pdf') ||
      resCat.includes('pdf') ||
      resType === 'notes'
    );
  }

  // 5. CODE
  if (cat === 'code') {
    return (
      resType === 'code' ||
      resCat.includes('code') ||
      resFile.endsWith('.zip')
    );
  }

  return resType === cat || resCat.includes(cat);
};

/**
 * Filters resources based on search query, category, and course
 */
export const filterResources = (resources, { category = 'All', search = '', course = 'All' }) => {
  const q = (search || '').toLowerCase().trim();

  return resources.filter((resource) => {
    // 1. Course match
    if (course && course !== 'All' && course !== 'All Courses') {
      const courseMatch = isCourseMatch(resource.course || resource.subject, course) ||
                          (resource.courseId && isCourseMatch(resource.courseId, course)) ||
                          (resource.courseId && String(resource.courseId).toLowerCase() === String(course).toLowerCase());
      if (!courseMatch) return false;
    }

    // 2. Category match
    const catMatch = matchesCategory(resource, category);
    if (!catMatch) return false;

    // 3. Search match
    if (!q) return true;

    const haystack = [
      resource.title,
      resource.subject,
      resource.course,
      resource.category,
      resource.chapter,
      resource.uploadedBy,
      resource.trainer,
      resource.description,
      resource.fileName,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(q);
  });
};


/**
 * Adds or updates a resource.
 * - Immediately persists to localStorage
 * - Notifies all subscribers so the student UI reflects the new resource instantly
 * - Asynchronously attempts to save to Firestore without breaking on permission error
 */
export const addResource = async (resourceData) => {
  const norm = normalizeResource(resourceData);

  // 1. Save to local storage custom resources
  const custom = getCustomResources();
  const existingIdx = custom.findIndex((r) => r.id === norm.id);

  if (existingIdx >= 0) {
    custom[existingIdx] = norm;
  } else {
    custom.unshift(norm);
  }
  saveCustomResources(custom);

  // 2. Persist large file to IndexedDB if data URL
  if (norm.fileUrl && norm.fileUrl.startsWith('data:')) {
    saveFileToIDB(norm.id, norm.fileUrl);
  }

  // 3. Attempt remote Firestore save asynchronously if not already saved
  if (!norm.firestoreId) {
    try {
      const colName = norm.collectionName || (norm.type === 'Video' ? 'videos' : norm.type === 'PPT' ? 'ppts' : norm.type === 'Code' ? 'codingFiles' : 'resources');
      
      // Prepare doc data
      const firestoreData = {
        title: norm.title,
        course: norm.course,
        courseId: norm.courseId || '',
        category: norm.category,
        trainer: norm.trainer,
        description: norm.description,
        status: norm.status,
        fileName: norm.fileName,
        fileSize: norm.fileSize,
        fileUrl: norm.fileUrl,
        fileURL: norm.fileUrl, // backward compatibility
        storagePath: norm.storagePath,
        type: norm.type,
        views: norm.views,
        downloads: norm.downloads,
        createdAt: norm.createdAt,
      };

      const docRef = await addDoc(collection(db, colName), firestoreData);
      if (docRef && docRef.id) {
        norm.firestoreId = docRef.id;
        // Update custom storage with firestore id
        const updated = getCustomResources().map((r) => (r.id === norm.id ? { ...r, firestoreId: docRef.id } : r));
        saveCustomResources(updated);
      }
    } catch (error) {
      console.warn(
        `[ResourceRepository] Remote Firestore write not available (${error.code || error.message}). Resource persisted locally.`
      );
    }
  }

  return norm;
};

/**
 * Deletes a resource by ID.
 * - Removes from localStorage immediately
 * - Attempts Firestore deleteDoc if doc exists
 */
export const deleteResource = async (resourceId) => {
  // 1. Remove from custom
  const custom = getCustomResources().filter((r) => r.id !== resourceId && r.resourceId !== resourceId);
  saveCustomResources(custom);

  // 2. Remove from remote cache
  const remote = getRemoteCache().filter((r) => r.id !== resourceId && r.resourceId !== resourceId);
  saveRemoteCache(remote);

  // 3. Attempt Firestore delete
  try {
    const all = getAllResources();
    const target = all.find((r) => r.id === resourceId);
    if (target && (target.firestoreId || target.id)) {
      const docId = target.firestoreId || target.id;
      const colName = target.collectionName || 'resources';
      await deleteDoc(doc(db, colName, docId));
    }
  } catch (error) {
    console.warn(`[ResourceRepository] Remote deleteDoc skipped or failed: ${error.message}`);
  }

  notifySubscribers();
  return true;
};

/**
 * Asynchronously fetches remote resources from Firestore.
 * Handles permission errors gracefully without throwing or popping alerts.
 */
export const fetchRemoteResources = async () => {
  const collectionsToFetch = [
    { name: 'resources', defaultType: 'Notes' },
    { name: 'videos', defaultType: 'Video' },
    { name: 'ppts', defaultType: 'PPT' },
    { name: 'codingFiles', defaultType: 'Code' },
  ];

  const results = await Promise.allSettled(
    collectionsToFetch.map(async (col) => {
      const snap = await getDocs(collection(db, col.name));
      return snap.docs.map((docSnap) => {
        const data = docSnap.data() || {};
        return normalizeResource(
          {
            id: docSnap.id,
            collectionName: col.name,
            type: data.type || col.defaultType,
            ...data,
          },
          docSnap.id
        );
      });
    })
  );

  const remoteItems = [];
  let permissionDeniedCount = 0;

  results.forEach((res, index) => {
    if (res.status === 'fulfilled') {
      remoteItems.push(...res.value);
    } else {
      const error = res.reason;
      if (error && (error.code === 'permission-denied' || (error.message && error.message.includes('permission')))) {
        permissionDeniedCount++;
      }
    }
  });

  if (permissionDeniedCount > 0) {
    console.info(
      `[ResourceRepository] Firestore permissions require authenticated session. Using local synchronized resource store.`
    );
  }

  if (remoteItems.length > 0) {
    saveRemoteCache(remoteItems);
  }

  return getAllResources();
};
