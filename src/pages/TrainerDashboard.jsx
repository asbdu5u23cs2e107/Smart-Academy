import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { 
  Users, BookOpen, Video, FileText, ClipboardList, PlusCircle, 
  BarChart3, CheckSquare, Plus, Trash2, ShieldAlert, GraduationCap,
  Send, HelpCircle, Save, Loader2, CheckCircle2, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addResource } from '../services/resourceRepository';
import { getAllCourses } from '../services/courseRepository';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { subView } = useParams();

  const [activeSubView, setActiveSubView] = useState('summary');

  // Video upload state
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCourseId, setVideoCourseId] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState('');
  const [videoSuccess, setVideoSuccess] = useState('');
  const videoFileInputRef = useRef(null);

  // Notes upload state
  const [notesTitle, setNotesTitle] = useState('');
  const [notesCourseId, setNotesCourseId] = useState('');
  const [notesFile, setNotesFile] = useState(null);
  const [notesUrlInput, setNotesUrlInput] = useState('');
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesError, setNotesError] = useState('');
  const [notesSuccess, setNotesSuccess] = useState('');
  const notesFileInputRef = useRef(null);

  // Available courses for dropdown
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    try {
      const courses = getAllCourses();
      setCoursesList(courses);
    } catch (_e) {
      setCoursesList([]);
    }
  }, []);

  // Sync activeSubView with URL parameters / location
  useEffect(() => {
    if (subView) {
      if (['upload-videos', 'upload-notes', 'uploads'].includes(subView)) {
        setActiveSubView('uploads');
      } else if (subView === 'add-course') {
        setActiveSubView('add-course');
      } else if (subView === 'exam') {
        setActiveSubView('exam');
      } else if (subView === 'assignments') {
        setActiveSubView('assignments');
      } else if (subView === 'dashboard' || subView === 'summary') {
        setActiveSubView('summary');
      }
    } else if (location.hash === '#uploads' || location.pathname.includes('upload')) {
      setActiveSubView('uploads');
    }
  }, [subView, location]);

  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    setVideoError('');
    if (!file) return;

    if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|ogg|mov|m4v)$/i)) {
      setVideoError('Please select a valid video file (MP4, WebM, OGG, MOV).');
      if (videoFileInputRef.current) videoFileInputRef.current.value = '';
      setVideoFile(null);
      return;
    }

    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      setVideoError('Video file size exceeds the 500 MB limit.');
      if (videoFileInputRef.current) videoFileInputRef.current.value = '';
      setVideoFile(null);
      return;
    }

    setVideoFile(file);
    setVideoUrlInput('');
  };

  const clearVideoFile = () => {
    setVideoFile(null);
    if (videoFileInputRef.current) videoFileInputRef.current.value = '';
  };

  const handleNotesFileChange = (e) => {
    const file = e.target.files?.[0];
    setNotesError('');
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setNotesError('Please select a valid PDF file (.pdf).');
      if (notesFileInputRef.current) notesFileInputRef.current.value = '';
      setNotesFile(null);
      return;
    }

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setNotesError('Notes file size exceeds the 50 MB limit.');
      if (notesFileInputRef.current) notesFileInputRef.current.value = '';
      setNotesFile(null);
      return;
    }

    setNotesFile(file);
    setNotesUrlInput('');
  };

  const clearNotesFile = () => {
    setNotesFile(null);
    if (notesFileInputRef.current) notesFileInputRef.current.value = '';
  };

// Helper to format Firebase Storage and Firestore error messages clearly
const formatFirebaseError = (err, context = 'Upload') => {
  if (!err) return `${context} failed due to an unknown error.`;
  const code = err.code || '';
  const message = err.message || '';

  if (
    code === 'storage/unauthorized' || 
    code === 'permission-denied' || 
    message.includes('permission') || 
    message.includes('PERMISSION_DENIED')
  ) {
    return `${context} failed: Permission denied. Please verify that your Firestore and Firebase Storage security rules are properly deployed (see firestore.rules and storage.rules).`;
  }
  if (
    code === 'storage/bucket-not-found' || 
    message.includes('bucket') || 
    message.includes('404') ||
    code === 'storage/unknown'
  ) {
    return `${context} failed: Firebase Storage bucket not found or unprovisioned. Please verify your Firebase Storage configuration in Firebase Console.`;
  }
  if (
    code === 'storage/retry-limit-exceeded' || 
    message.includes('timed out') || 
    message.includes('timeout')
  ) {
    return `${context} timed out: Firebase Storage took too long to respond. Please check your network connection and Firebase Storage bucket.`;
  }
  if (code === 'storage/quota-exceeded') {
    return `${context} failed: Storage quota exceeded for this Firebase project.`;
  }
  if (code === 'storage/canceled') {
    return `${context} was canceled.`;
  }

  const prefix = code ? `[${code}] ` : '';
  return `${context} failed: ${prefix}${message || 'An unexpected error occurred.'}`;
};

// Safe upload wrapper that bounds Firebase Storage operations to prevent indefinite hanging
const uploadToStorageWithTimeout = async (storageRef, file, metadata, timeoutMs = 25000) => {
  let timerId;
  const timeoutPromise = new Promise((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error(`Firebase Storage upload timed out after ${Math.round(timeoutMs / 1000)} seconds. Please check your network and Firebase Storage bucket configuration.`));
    }, timeoutMs);
  });

  try {
    const uploadPromise = uploadBytes(storageRef, file, metadata);
    const snapshot = await Promise.race([uploadPromise, timeoutPromise]);
    return snapshot;
  } finally {
    clearTimeout(timerId);
  }
};

  const handleUploadVideo = async (e) => {
    e.preventDefault();
    if (videoLoading) return;

    setVideoError('');
    setVideoSuccess('');

    const trimmedTitle = videoTitle.trim();
    if (!trimmedTitle) {
      setVideoError('Please enter video lesson title.');
      return;
    }

    if (!videoCourseId) {
      setVideoError('Please select a course for this video.');
      return;
    }

    if (!videoFile && !videoUrlInput.trim()) {
      setVideoError('Please select a video file or enter a video URL.');
      return;
    }

    const selectedCourseObj = coursesList.find(
      (c) => String(c.id).toLowerCase() === String(videoCourseId).toLowerCase()
    );
    const courseTitle = selectedCourseObj?.title || videoCourseId;

    try {
      setVideoLoading(true);

      let downloadURL = '';
      let storageFullPath = '';

      if (videoFile) {
        const safeName = videoFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const storagePath = `videos/${Date.now()}-${safeName}`;
        const storageRef = ref(storage, storagePath);

        const metadata = {
          contentType: videoFile.type || 'video/mp4',
        };

        // 1. Upload video to Firebase Storage and properly await
        const snapshot = await uploadToStorageWithTimeout(storageRef, videoFile, metadata, 60000);

        // 2. Retrieve Firebase download URL using getDownloadURL()
        downloadURL = await getDownloadURL(snapshot.ref || storageRef);
        storageFullPath = storageRef.fullPath;
      } else {
        const rawUrl = videoUrlInput.trim();
        if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
          setVideoError('Please enter a valid URL starting with http:// or https://');
          setVideoLoading(false);
          return;
        }
        downloadURL = rawUrl;
      }

      const videoPayload = {
        title: trimmedTitle,
        course: courseTitle,
        courseId: videoCourseId,
        fileName: videoFile ? videoFile.name : `${trimmedTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.mp4`,
        fileSize: videoFile ? videoFile.size : 0,
        fileType: videoFile ? (videoFile.type || 'video/mp4') : 'video/mp4',
        fileUrl: downloadURL,
        fileURL: downloadURL,
        storagePath: storageFullPath,
        type: 'Video',
        category: 'Video Tutorials',
        trainer: user?.name || 'SwordNex Trainer',
        status: 'Published',
        createdAt: new Date().toISOString(),
        views: 0,
        downloads: 0,
      };

      // 3. Save into Firestore collection 'videos' and properly await
      const docRef = await addDoc(collection(db, 'videos'), videoPayload);
      const firestoreDocId = docRef?.id || '';

      // 4. Save into Unified Resource Repository for local caching and instant display across page reloads
      await addResource({
        ...videoPayload,
        firestoreId: firestoreDocId,
        collectionName: 'videos',
      });

      // 5. Show success message ONLY after both Storage upload and Firestore save are successful
      setVideoSuccess('Video uploaded and saved to course successfully!');
      setVideoTitle('');
      setVideoCourseId('');
      setVideoFile(null);
      setVideoUrlInput('');
      if (videoFileInputRef.current) {
        videoFileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Video upload error:', err);
      setVideoError(formatFirebaseError(err, 'Video upload'));
      setVideoSuccess('');
    } finally {
      // 6. Loading spinner always stops, even when an error occurs
      setVideoLoading(false);
    }
  };

  const handleUploadNotes = async (e) => {
    e.preventDefault();
    if (notesLoading) return;

    setNotesError('');
    setNotesSuccess('');

    const trimmedTitle = notesTitle.trim();
    if (!trimmedTitle) {
      setNotesError('Please enter document title.');
      return;
    }

    if (!notesCourseId) {
      setNotesError('Please select a course for these notes.');
      return;
    }

    if (!notesFile && !notesUrlInput.trim()) {
      setNotesError('Please select a PDF file or enter a document URL.');
      return;
    }

    if (notesFile) {
      if (notesFile.type !== 'application/pdf' && !notesFile.name.toLowerCase().endsWith('.pdf')) {
        setNotesError('Please select a valid PDF file (.pdf).');
        return;
      }
      const maxSize = 50 * 1024 * 1024;
      if (notesFile.size > maxSize) {
        setNotesError('Notes file size exceeds the 50 MB limit.');
        return;
      }
    }

    const selectedCourseObj = coursesList.find(
      (c) => String(c.id).toLowerCase() === String(notesCourseId).toLowerCase()
    );
    const courseTitle = selectedCourseObj?.title || notesCourseId;

    try {
      setNotesLoading(true);

      let downloadURL = '';
      let storageFullPath = '';

      if (notesFile) {
        const safeName = notesFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const storagePath = `notes/${Date.now()}-${safeName}`;
        const storageRef = ref(storage, storagePath);

        const metadata = {
          contentType: 'application/pdf',
        };

        // 1. Upload to Firebase Storage and properly await
        const snapshot = await uploadToStorageWithTimeout(storageRef, notesFile, metadata, 30000);

        // 2. Retrieve Firebase download URL using getDownloadURL()
        downloadURL = await getDownloadURL(snapshot.ref || storageRef);
        storageFullPath = storageRef.fullPath;
      } else {
        const rawUrl = notesUrlInput.trim();
        if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
          setNotesError('Please enter a valid URL starting with http:// or https://');
          setNotesLoading(false);
          return;
        }
        downloadURL = rawUrl;
      }

      const notesPayload = {
        title: trimmedTitle,
        course: courseTitle,
        courseId: notesCourseId,
        fileName: notesFile ? notesFile.name : `${trimmedTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`,
        fileSize: notesFile ? notesFile.size : 0,
        fileType: notesFile ? (notesFile.type || 'application/pdf') : 'application/pdf',
        fileUrl: downloadURL,
        fileURL: downloadURL,
        storagePath: storageFullPath,
        type: 'Notes',
        category: 'Study Notes',
        trainer: user?.name || 'SwordNex Trainer',
        status: 'Published',
        createdAt: new Date().toISOString(),
        views: 0,
        downloads: 0,
      };

      // 3. Save into Firestore collection 'resources' and properly await
      const docRef = await addDoc(collection(db, 'resources'), notesPayload);
      const firestoreDocId = docRef?.id || '';

      // 4. Save into Unified Resource Repository for local caching and instant display across page reloads
      await addResource({
        ...notesPayload,
        firestoreId: firestoreDocId,
        collectionName: 'resources',
      });

      // 5. Show success message ONLY after both Storage upload and Firestore save are successful
      setNotesSuccess('PDF Notes uploaded and saved to course successfully!');
      setNotesTitle('');
      setNotesCourseId('');
      setNotesFile(null);
      setNotesUrlInput('');
      if (notesFileInputRef.current) {
        notesFileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Notes upload error:', err);
      setNotesError(formatFirebaseError(err, 'PDF Notes upload'));
      setNotesSuccess('');
    } finally {
      // 6. Loading spinner always stops, even when an error occurs
      setNotesLoading(false);
    }
  };

  // Add Course state
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [courseSuccess, setCourseSuccess] = useState(false);

  // Exam creator state
  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState([
    { q: 'What is Node.js?', opt1: 'Runtime', opt2: 'Language', opt3: 'Library', opt4: 'Database', ans: '1' }
  ]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseTitle.trim() || !coursePrice) return;
    setCourseSuccess(true);
    setTimeout(() => {
      setCourseSuccess(false);
      setCourseTitle('');
      setCourseDesc('');
      setCoursePrice('');
    }, 3000);
  };

  const handleAddExamQuestion = () => {
    setQuestions([...questions, { q: '', opt1: '', opt2: '', opt3: '', opt4: '', ans: '1' }]);
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    alert(`Exam "${examName}" created with ${questions.length} questions!`);
    setExamName('');
    setQuestions([{ q: '', opt1: '', opt2: '', opt3: '', opt4: '', ans: '1' }]);
  };

  const stats = [
    { label: 'My Students', value: '142', icon: <Users className="w-5 h-5 text-purple-650" /> },
    { label: 'Active Courses', value: '3', icon: <BookOpen className="w-5 h-5 text-purple-650" /> },
    { label: 'Videos Uploaded', value: '15', icon: <Video className="w-5 h-5 text-purple-650" /> },
    { label: 'Notes Uploaded', value: '28', icon: <FileText className="w-5 h-5 text-emerald-400" /> },
    { label: 'Assignments Checked', value: '84/102', icon: <ClipboardList className="w-5 h-5 text-yellow-500" /> }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
        <div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider border border-emerald-200 px-2 py-0.5 rounded-full bg-emerald-500/5">Trainer Workspace</span>
          <h1 className="text-xl font-bold text-slate-900 uppercase mt-1">TRAINER PANEL</h1>
          <p className="text-xs text-slate-500">Manage courses, upload lectures, build tests, and audit grades</p>
        </div>

        {/* Workspace Subtabs */}
        <div className="flex flex-wrap gap-1 bg-slate-50 p-1 border border-slate-100 rounded-xl">
          {[
            { id: 'summary', label: 'Dashboard' },
            { id: 'add-course', label: 'Add Course' },
            { id: 'uploads', label: 'Upload Files' },
            { id: 'exam', label: 'Create Exam' },
            { id: 'assignments', label: 'Check Work' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubView(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold transition-all ${
                activeSubView === tab.id 
                  ? 'bg-white text-emerald-400 border border-slate-200' 
                  : 'text-slate-500 '
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewport */}
      {activeSubView === 'summary' && (
        <div className="space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-white/40 border border-slate-100 text-center space-y-2">
                <div className="mx-auto h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[10px] text-slate-500 block leading-tight">{item.label}</span>
                <span className="text-xl font-black text-white mt-1 block">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Student Performance SVG Chart */}
            <div className="p-6 rounded-3xl bg-white/40 border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">📊 Student Performance Metrics</h3>
              
              <div className="h-48 flex items-end justify-between gap-2 pt-4 relative px-2">
                
                {/* Horizontal reference lines */}
                <div className="absolute inset-x-0 bottom-1/4 h-px bg-white/50"></div>
                <div className="absolute inset-x-0 bottom-2/4 h-px bg-white/50"></div>
                <div className="absolute inset-x-0 bottom-3/4 h-px bg-white/50"></div>

                {[
                  { label: 'HTML', val: 92, fill: 'bg-purple-600' },
                  { label: 'CSS', val: 88, fill: 'bg-indigo-500' },
                  { label: 'JS', val: 78, fill: 'bg-purple-600' },
                  { label: 'React', val: 65, fill: 'bg-rose-500' },
                  { label: 'Node', val: 40, fill: 'bg-yellow-500 animate-pulse' }
                ].map((bar) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 group z-10">
                    <span className="text-[9px] font-mono text-slate-650 group-transition-colors">{bar.val}%</span>
                    <div className="w-full max-w-[28px] bg-slate-50 rounded-t-lg h-28 flex items-end overflow-hidden border border-slate-100">
                      <div className={`w-full rounded-t-sm transition-all duration-500 ${bar.fill}`} style={{ height: `${bar.val}%` }}></div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrolled Courses lists */}
            <div className="p-6 rounded-3xl bg-white/40 border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">📚 My Assigned Courses</h3>
              <ul className="space-y-3.5 text-xs text-slate-700">
                {[
                  { title: 'Full Stack Development', students: '54 Students', completed: '24' },
                  { title: 'Python Full Stack', students: '42 Students', completed: '12' },
                  { title: 'React Advanced', students: '46 Students', completed: '18' }
                ].map((course, idx) => (
                  <li key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-50/40 border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-900 uppercase">{course.title}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{course.students} • {course.completed} graduates</p>
                    </div>
                    <button className="text-purple-650 font-semibold">[ Manage ]</button>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Add Course View */}
      {activeSubView === 'add-course' && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-650 border-b border-slate-200 pb-2">➕ Add New Course</h2>
          
          <form onSubmit={handleAddCourse} className="space-y-4 text-xs">
            {courseSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-200 text-emerald-400 font-semibold">
                Course added successfully to catalog!
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-650">Course Title</label>
              <input 
                type="text" 
                required
                placeholder="Data Science Masterclass"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-650">Description</label>
              <textarea 
                placeholder="Learn comprehensive database design, data mining, and machine learning structures..."
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                className="w-full h-24 rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-slate-800 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Duration (e.g. 3 Months)</label>
                <input 
                  type="text" 
                  required
                  placeholder="3 Months"
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Course Price (₹)</label>
                <input 
                  type="number" 
                  required
                  placeholder="15000"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="btn-primary py-2.5 px-6 text-xs flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-slate-950" />
                <span>Create Course</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upload files View */}
      {activeSubView === 'uploads' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Upload Videos */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Video className="w-4 h-4 text-purple-650" />
              <span>Upload Lecture Video</span>
            </h3>

            {/* Error Message */}
            {videoError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="break-all">{videoError}</span>
              </div>
            )}

            {/* Success Message */}
            {videoSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{videoSuccess}</span>
              </div>
            )}
            
            <form onSubmit={handleUploadVideo} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Video Lesson Title *</label>
                <input 
                  type="text" 
                  required 
                  disabled={videoLoading}
                  value={videoTitle}
                  onChange={(e) => { setVideoTitle(e.target.value); setVideoError(''); }}
                  placeholder="React hooks deep dive" 
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-300 disabled:opacity-50" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Select Course *</label>
                <select
                  required
                  disabled={videoLoading}
                  value={videoCourseId}
                  onChange={(e) => { setVideoCourseId(e.target.value); setVideoError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-300 disabled:opacity-50"
                >
                  <option value="">-- Choose Course --</option>
                  {coursesList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Video File (MP4, WebM)</label>
                <input 
                  ref={videoFileInputRef}
                  type="file" 
                  accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
                  disabled={videoLoading}
                  onChange={handleVideoFileChange}
                  className="w-full file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border file:border-slate-200 file:bg-slate-50 file:text-slate-650 file:text-xs text-xs disabled:opacity-50" 
                />
                {videoFile && (
                  <p className="text-[11px] text-slate-500 flex items-center justify-between mt-1">
                    <span>Selected: <strong className="text-slate-700">{videoFile.name}</strong> ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)</span>
                    <button type="button" onClick={clearVideoFile} className="text-rose-500 hover:text-rose-700 font-semibold text-[10px]">Remove</button>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Or Video URL (YouTube or Direct Link)</label>
                <input 
                  type="url" 
                  disabled={videoLoading}
                  value={videoUrlInput}
                  onChange={(e) => { setVideoUrlInput(e.target.value); setVideoError(''); }}
                  placeholder="https://www.youtube.com/watch?v=... or direct MP4 link" 
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-300 disabled:opacity-50" 
                />
              </div>

              <button 
                type="submit" 
                disabled={videoLoading}
                className="btn-primary py-2 px-5 text-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                {videoLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading Video...</span>
                  </>
                ) : (
                  <span>Upload Video</span>
                )}
              </button>
            </form>
          </div>

          {/* Upload Notes */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-200 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Upload PDF Notes</span>
            </h3>

            {/* Error Message */}
            {notesError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="break-all">{notesError}</span>
              </div>
            )}

            {/* Success Message */}
            {notesSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{notesSuccess}</span>
              </div>
            )}
            
            <form onSubmit={handleUploadNotes} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Document Title *</label>
                <input 
                  type="text" 
                  required 
                  disabled={notesLoading}
                  value={notesTitle}
                  onChange={(e) => { setNotesTitle(e.target.value); setNotesError(''); }}
                  placeholder="SQL Joins Cheat Sheet.pdf" 
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-300 disabled:opacity-50" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Select Course *</label>
                <select
                  required
                  disabled={notesLoading}
                  value={notesCourseId}
                  onChange={(e) => { setNotesCourseId(e.target.value); setNotesError(''); }}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-300 disabled:opacity-50"
                >
                  <option value="">-- Choose Course --</option>
                  {coursesList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">PDF File</label>
                <input 
                  ref={notesFileInputRef}
                  type="file" 
                  accept=".pdf,application/pdf"
                  disabled={notesLoading}
                  onChange={handleNotesFileChange}
                  className="w-full file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border file:border-slate-200 file:bg-slate-50 file:text-slate-650 file:text-xs text-xs disabled:opacity-50" 
                />
                {notesFile && (
                  <p className="text-[11px] text-slate-500 flex items-center justify-between mt-1">
                    <span>Selected: <strong className="text-slate-700">{notesFile.name}</strong> ({(notesFile.size / (1024 * 1024)).toFixed(1)} MB)</span>
                    <button type="button" onClick={clearNotesFile} className="text-rose-500 hover:text-rose-700 font-semibold text-[10px]">Remove</button>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-650">Or Document URL</label>
                <input 
                  type="url" 
                  disabled={notesLoading}
                  value={notesUrlInput}
                  onChange={(e) => { setNotesUrlInput(e.target.value); setNotesError(''); }}
                  placeholder="https://... or hosted document link" 
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-300 disabled:opacity-50" 
                />
              </div>

              <button 
                type="submit" 
                disabled={notesLoading}
                className="btn-primary py-2 px-5 text-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                {notesLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading PDF...</span>
                  </>
                ) : (
                  <span>Upload PDF</span>
                )}
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Exam creation panel */}
      {activeSubView === 'exam' && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-650 border-b border-slate-200 pb-2">📝 Create Exam Assessment</h2>
          
          <form onSubmit={handleCreateExam} className="space-y-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-650">Assessment Name</label>
              <input 
                type="text" 
                required
                placeholder="JavaScript Operators Test"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none"
              />
            </div>

            {/* Dynamic question builder */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Questions Setup</span>
              
              {questions.map((qObj, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-slate-650 font-bold border-b border-slate-100 pb-1.5">
                    <span>Question #{idx + 1}</span>
                    <button 
                      type="button" 
                      onClick={() => setQuestions(questions.filter((_, qIdx) => qIdx !== idx))}
                      className="text-rose-400 hover:text-rose-300 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="font-semibold">Question Content</label>
                    <input 
                      type="text" 
                      placeholder="What is React?" 
                      className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <input type="text" placeholder="Option A" className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-slate-800" />
                    <input type="text" placeholder="Option B" className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-slate-800" />
                    <input type="text" placeholder="Option C" className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-slate-800" />
                    <input type="text" placeholder="Option D" className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-slate-800" />
                  </div>
                </div>
              ))}

              <button 
                type="button" 
                onClick={handleAddExamQuestion}
                className="flex items-center justify-center gap-1 py-2 border border-slate-200 hover:border-slate-700 bg-slate-50 text-purple-650  rounded-xl w-full font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question Form</span>
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button type="submit" className="btn-primary py-2.5 px-6 text-xs flex items-center gap-1.5">
                <Save className="w-4 h-4 text-slate-950" />
                <span>Save Exam</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Check student assignments View */}
      {activeSubView === 'assignments' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-650">Verify Submissions</h2>
          
          <div className="rounded-xl border border-slate-100 bg-slate-50 overflow-hidden text-xs">
            <table className="w-full text-left text-slate-700">
              <thead className="bg-white border-b border-slate-950 text-slate-650 text-[10px] font-bold uppercase">
                <tr>
                  <th className="px-5 py-3">Student Name</th>
                  <th className="px-5 py-3">Assignment Title</th>
                  <th className="px-5 py-3">Submission file</th>
                  <th className="px-5 py-3 text-right">Audit Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {[
                  { name: 'Rahul K.', task: 'E-commerce React site', file: 'react_code.zip' },
                  { name: 'Arjun M.', task: 'Hospital management system', file: 'mysql_schema.sql' },
                  { name: 'Priya R.', task: 'Task manager app', file: 'task_app.zip' }
                ].map((sub, i) => (
                  <tr key={i} className="hover:bg-white/10">
                    <td className="px-5 py-3 font-semibold text-slate-900">👤 {sub.name}</td>
                    <td className="px-5 py-3">{sub.task}</td>
                    <td className="px-5 py-3 text-slate-500 font-mono">{sub.file}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold transition-all">
                        Grade Work
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default TrainerDashboard;
