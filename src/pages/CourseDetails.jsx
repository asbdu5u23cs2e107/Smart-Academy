import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getStudentKey, getStudentData, recordVideoWatch, toggleLessonCompletion } from '../services/studentDataService';
import {
    Check, Play, Download, Lock, Award, Clock, FileText,
    Database, User, Star, ShieldCheck, HelpCircle, ArrowRight, Radio, Bell, X, Film
} from 'lucide-react';
import { getCourseById } from '../services/courseRepository';
import { getCourseLessonsWithVideos } from '../services/videoRetrievalService';

const QuizModal = ({ quiz, onPass, onClose, courseTitle }) => {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Dynamic questions based on quiz type
    const questions = quiz.type === 'final' ? [
        { q: `What is the primary focus of ${courseTitle || 'this course'}?`, options: ['Web Dev', 'Data Science', 'Both', 'None'], correct: 2 },
        { q: 'Which of the following is used for looping?', options: ['if', 'while', 'def', 'class'], correct: 1 },
        { q: 'How do you create a reusable block of code?', options: ['Variable', 'Function/Method', 'String', 'Boolean'], correct: 1 }
    ] : [
        { q: `Review Question 1 for up to Lesson ${quiz.afterLesson}`, options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 0 },
        { q: `Review Question 2 for up to Lesson ${quiz.afterLesson}`, options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 1 }
    ];

    const handleSelect = (qIndex, optionIndex) => {
        if (submitted) return;
        setAnswers({ ...answers, [qIndex]: optionIndex });
    };

    const score = Object.keys(answers).reduce((acc, key) => {
        return acc + (answers[key] === questions[key].correct ? 1 : 0);
    }, 0);

    // 100% pass mark for simplicity
    const passed = score === questions.length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800 text-lg">
                        {quiz.type === 'final' ? 'Final Assessment' : `Mini Assessment (Lessons ${quiz.afterLesson - 1}-${quiz.afterLesson})`}
                    </h3>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    {!submitted ? (
                        <div className="space-y-6">
                            <p className="text-sm text-slate-500 mb-4">You must answer all questions correctly to proceed.</p>
                            {questions.map((q, i) => (
                                <div key={i} className="space-y-3">
                                    <h4 className="font-medium text-slate-800 text-sm">{i + 1}. {q.q}</h4>
                                    <div className="space-y-2">
                                        {q.options.map((opt, optIdx) => (
                                            <label key={optIdx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                                                <input
                                                    type="radio"
                                                    name={`q-${i}`}
                                                    className="text-purple-600 focus:ring-purple-500 w-4 h-4"
                                                    checked={answers[i] === optIdx}
                                                    onChange={() => handleSelect(i, optIdx)}
                                                />
                                                <span className="text-sm text-slate-700">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center space-y-4 py-8">
                            {passed ? (
                                <>
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Award size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800">Congratulations!</h3>
                                    <p className="text-slate-600">You scored {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)</p>
                                    <p className="text-sm text-emerald-600 font-medium">Assessment Passed successfully.</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <X size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800">Assessment Failed</h3>
                                    <p className="text-slate-600">You scored {score}/{questions.length}. You need a perfect score to proceed.</p>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    {!submitted ? (
                        <button
                            onClick={() => setSubmitted(true)}
                            disabled={Object.keys(answers).length < questions.length}
                            className="btn-primary px-6 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Answers
                        </button>
                    ) : (
                        <>
                            {!passed && (
                                <button
                                    onClick={() => { setSubmitted(false); setAnswers({}); }}
                                    className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100"
                                >
                                    Retry
                                </button>
                            )}
                            {passed && (
                                <button
                                    onClick={() => onPass(quiz.afterLesson)}
                                    className="btn-primary px-6 py-2 text-sm"
                                >
                                    Continue
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const getVideoEmbedUrl = (url) => {
    if (!url) return '';
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}enablejsapi=1`;
};

const CourseDetails = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const studentKey = getStudentKey(user);

    const [completedLessons, setCompletedLessons] = useState([]);
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [courseCompleted, setCourseCompleted] = useState(false);

    const lessonParam = searchParams.get('lesson');
    const [openLesson, setOpenLesson] = useState(() => {
        if (lessonParam && !isNaN(Number(lessonParam))) {
            return Number(lessonParam);
        }
        return 1;
    });

    const contentRefs = useRef({});

    // Dynamically retrieve course details from unified repository
    const courseRecord = getCourseById(id);
    const [rawLessons, setRawLessons] = useState(() => courseRecord?.lessons || []);
    const [videoError, setVideoError] = useState(null);

    useEffect(() => {
        let isCancelled = false;
        const loadVideos = async () => {
            try {
                const result = await getCourseLessonsWithVideos(courseRecord);
                if (!isCancelled && Array.isArray(result.lessons) && result.lessons.length > 0) {
                    setRawLessons(result.lessons);
                    setVideoError(result.error || null);
                }
            } catch (err) {
                console.error("Error loading course lessons:", err);
            }
        };
        loadVideos();
        return () => { isCancelled = true; };
    }, [id, courseRecord?.id, courseRecord?.title]);

    const courseTitle = courseRecord?.title || courseRecord?.courseName || 'Course';
    const coursePrice = Number(courseRecord?.price || 15000);
    const courseDuration = courseRecord?.duration || '3 Months';

    // Sync lessonParam changes into openLesson
    useEffect(() => {
        if (lessonParam && !isNaN(Number(lessonParam))) {
            setOpenLesson(Number(lessonParam));
        }
    }, [lessonParam]);

    // Restore student completion progress from localStorage and studentDataService
    useEffect(() => {
        const studentData = getStudentData(user);
        const saved = localStorage.getItem(`course_progress_${studentKey}_${id || 'default'}`);
        let completed = [];
        let isDone = false;

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed.completedLessons)) completed = parsed.completedLessons;
                if (parsed.courseCompleted) isDone = parsed.courseCompleted;
            } catch (_e) {}
        }

        // Also merge any completions from studentDataService
        if (Array.isArray(studentData?.completedLessons)) {
            studentData.completedLessons.forEach(num => {
                const n = Number(num);
                if (!isNaN(n) && !completed.includes(n)) completed.push(n);
            });
        }

        setCompletedLessons(completed);
        setCourseCompleted(isDone);
    }, [id, studentKey, user]);

    // Save progress to localStorage
    useEffect(() => {
        if (!studentKey) return;
        localStorage.setItem(`course_progress_${studentKey}_${id || 'default'}`, JSON.stringify({
            completedLessons,
            courseCompleted
        }));
    }, [completedLessons, courseCompleted, id, studentKey]);

    const studentData = getStudentData(user);
    const isEnrolled = !!(
        studentData?.selectedCourseId === id ||
        (studentData?.enrolledCourses || []).some(c => String(c.id).toLowerCase() === String(id).toLowerCase())
    );

    // Dynamic lesson resolution - NO unintended sequential locking!
    const lessons = rawLessons.map((l, idx) => {
        const lessonNum = Number(l.num || l.id || idx + 1);
        const isCompleted = completedLessons.includes(lessonNum) || (studentData?.completedLessons || []).includes(lessonNum);

        // Preserve legitimate access restrictions (explicit isLocked or un-enrolled premium)
        const isExplicitlyLocked = l.isLocked === true || (courseRecord?.isLocked === true && !isEnrolled) || (l.isPremium === true && !isEnrolled);

        let status = 'available';
        if (isExplicitlyLocked) {
            status = 'locked';
        } else if (isCompleted) {
            status = 'completed';
        } else if (openLesson === lessonNum) {
            status = 'current';
        }

        return {
            ...l,
            num: lessonNum,
            status,
            isLocked: isExplicitlyLocked
        };
    });

    const progressPercentage = Math.round((completedLessons.length / (lessons.length || 1)) * 100) || 0;

    const toggleLesson = (num) => {
        const target = lessons.find(l => l.num === num);
        if (target?.status === 'locked') return;

        const nextOpen = openLesson === num ? null : num;
        setOpenLesson(nextOpen);
        if (nextOpen) {
            setSearchParams({ lesson: nextOpen });
            if (user && target?.videoUrl) {
                recordVideoWatch(user, target.id || target.num, target.title);
            }
        }
    };

    const handleCompleteLesson = (lessonNum) => {
        if (!completedLessons.includes(lessonNum)) {
            setCompletedLessons(prev => [...prev, lessonNum]);
        }
        if (user) {
            const lessonObj = lessons.find(l => l.num === lessonNum);
            toggleLessonCompletion(user, id, lessonNum, lessonObj?.title);
        }

        // Trigger optional quiz after even lessons or final lesson
        if (lessonNum % 2 === 0 && lessonNum < lessons.length) {
            setActiveQuiz({ type: 'mini', afterLesson: lessonNum });
        } else if (lessonNum === lessons.length) {
            setActiveQuiz({ type: 'final', afterLesson: lessonNum });
            setCourseCompleted(true);
        }
    };

    const handleToggleIncomplete = (lessonNum) => {
        setCompletedLessons(prev => prev.filter(n => n !== lessonNum));
        if (user) {
            const lessonObj = lessons.find(l => l.num === lessonNum);
            toggleLessonCompletion(user, id, lessonNum, lessonObj?.title);
        }
    };

    const handleQuizPass = (afterLesson) => {
        setActiveQuiz(null);
        if (afterLesson === lessons.length) {
            setCourseCompleted(true);
        }
    };

    const handleBuyNow = () => {
        addToCart({ id: id || 'fsd', title: courseTitle, trainer: 'John David', duration: courseDuration, rating: 4.9, price: coursePrice });
        navigate('/cart');
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
            {activeQuiz && (
                <QuizModal
                    quiz={activeQuiz}
                    onPass={handleQuizPass}
                    onClose={() => setActiveQuiz(null)}
                    courseTitle={courseTitle}
                />
            )}

            {/* Top Banner */}
            <section className="relative rounded-3xl overflow-hidden border border-slate-100 bg-white/10 p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{courseTitle}</h1>
                        <p className="text-sm text-slate-650">Learn complete frontend, backend and database development with hands-on projects.</p>
                    </div>
                    <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                        <div className="flex items-baseline justify-between">
                            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Course Price:</span>
                            <span className="text-2xl font-extrabold text-slate-900">₹{coursePrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button onClick={handleBuyNow} className="btn-primary flex-1 text-center py-3 text-sm">BUY NOW / ENROLL</button>
                            <Link to={`/course/${id}/learn${openLesson ? `?lesson=${openLesson}` : ''}`} className="btn-secondary py-3 px-4 text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap">
                                <Play size={14} fill="currentColor" /> Learning Room
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Progress */}
            <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Award className="text-purple-600" size={18} />
                        Your Course Progress
                    </h3>
                    <span className="text-sm font-bold text-purple-650">{progressPercentage}% Completed</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                {courseCompleted && (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-4 text-emerald-800 text-sm shadow-sm">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <Award size={24} />
                        </div>
                        <div>
                            <b className="block text-base mb-1">Course Completed!</b>
                            You have successfully finished all lessons and passed the final assessment. You can now download your certificate.
                        </div>
                    </div>
                )}
            </section>

            {/* Syllabus & Lessons */}
            <section className="space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Syllabus & Curriculum</span>
                        <h2 className="text-2xl font-bold text-slate-900 mt-1 uppercase">{courseTitle}</h2>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-650 font-medium">
                        <span className="flex items-center gap-1"><Clock size={14} /> {courseDuration}</span>
                        <span className="flex items-center gap-1"><FileText size={14} /> {lessons.length} Lessons</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {lessons.map((lesson) => (
                        <div key={lesson.num} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl font-bold
                    ${lesson.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                                            lesson.status === 'current' ? 'bg-purple-100 text-purple-650 shadow-inner' :
                                                lesson.status === 'locked' ? 'bg-slate-100 text-slate-400' : 'bg-purple-50 text-purple-600'}`}>
                                        {lesson.status === 'completed' ? <Check size={24} /> :
                                            lesson.status === 'locked' ? <Lock size={20} /> :
                                                <Play size={24} fill="currentColor" className="ml-1" />}
                                    </div>
                                    <div>
                                        <h3 className={`text-base font-bold ${lesson.status === 'current' ? 'text-purple-700' : 'text-slate-800'}`}>
                                            {lesson.num}. {lesson.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium mt-1">Duration: {lesson.duration}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    {lesson.status === 'locked' ? (
                                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                            <Lock size={12} /> Locked
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => toggleLesson(lesson.num)}
                                            className={`px-4 py-2 rounded-xl border text-sm font-bold transition-colors
                        ${openLesson === lesson.num ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                                        >
                                            {openLesson === lesson.num ? 'Hide Lesson' : 'View Lesson'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Collapsible content with dedicated video player */}
                            <div
                                ref={(el) => (contentRefs.current[lesson.num] = el)}
                                className="overflow-hidden transition-all duration-500 ease-in-out"
                                style={{
                                    maxHeight: openLesson === lesson.num ? '3000px' : '0px',
                                    opacity: openLesson === lesson.num ? 1 : 0
                                }}
                            >
                                {openLesson === lesson.num && (
                                    <div className="pt-6 pb-2 border-t border-slate-100 mt-4">
                                        {lesson.videoUrl ? (
                                            <div className="w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900 mb-6 shadow-lg">
                                                <iframe
                                                    key={`player-${id}-${lesson.num}-${lesson.videoId || lesson.videoUrl}`}
                                                    className="w-full h-auto aspect-video outline-none"
                                                    src={getVideoEmbedUrl(lesson.videoUrl)}
                                                    title={lesson.title || `Lesson ${lesson.num}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        ) : (
                                            <div className="w-full rounded-xl border border-slate-200 bg-slate-50 mb-6 p-6 flex flex-col items-center justify-center text-center space-y-2">
                                                <Film className="w-8 h-8 text-slate-400" />
                                                <p className="text-sm font-semibold text-slate-700">No video available for this lesson.</p>
                                                <p className="text-xs text-slate-500">
                                                    {videoError || 'No relevant videos found for this course.'}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-slate-800 mb-1">Learning Topic:</h4>
                                                <p className="text-sm text-slate-650">{lesson.topic}</p>
                                            </div>

                                            {lesson.status !== 'completed' ? (
                                                <button
                                                    onClick={() => handleCompleteLesson(lesson.num)}
                                                    className="btn-primary hover:shadow-lg px-5 py-2.5 text-sm flex items-center gap-2 whitespace-nowrap rounded-lg shadow-md transition-all"
                                                >
                                                    <Check size={18} strokeWidth={3} /> Mark as Completed
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleToggleIncomplete(lesson.num)}
                                                    className="text-emerald-700 text-sm font-bold flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 px-4 py-2 rounded-lg transition-all"
                                                    title="Click to toggle status"
                                                >
                                                    <Check size={18} strokeWidth={3} /> Completed ✓
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CourseDetails;
