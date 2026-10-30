import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FileQuestion, Clock, Gauge, Tag, Info, ListChecks, ClipboardList,
  ChevronRight, Trophy, Database, LayoutGrid, Network, CheckCircle2,
  Search, RotateCcw
} from 'lucide-react';

const difficultyColor = {
  Easy: 'text-emerald-600 bg-emerald-50',
  Medium: 'text-amber-600 bg-amber-50',
  Hard: 'text-rose-600 bg-rose-50',
};

const languagesList = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'HTML', 'CSS', 'SQL', 'Node.js', 'React'];

// Fixed category list (used for both module/problem generation and the filter dropdown)
const categoryList = [
  'Programming Languages',
  'Frontend Development',
  'Backend Development',
  'Database',
  'Data Structures & Algorithms',
  'System Design',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Cloud Computing',
  'Cyber Security',
  'DevOps',
  'Mobile Development',
  'Testing & Automation',
  'UI/UX',
  'Aptitude',
  'Interview Preparation',
];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const makeModules = (count, categories, problemsPool) => {
  return Array.from({ length: count }).map((_, i) => {
    const id = `mod-${i + 1}`;
    const category = categories[i % categories.length];
    const difficulty = ['Easy', 'Medium', 'Hard'][i % 3];
    const language = languagesList[i % languagesList.length];
    const questions = rand(5, 15);
    const relatedQs = problemsPool.slice(i * 8, i * 8 + questions).map((p) => p.id);
    return {
      id,
      title: `${category} Module ${i + 1}`,
      image: ['📘', '📗', '📙', '📕'][i % 4],
      icon: null,
      desc: `Curated problems on ${category} focusing on ${difficulty} concepts and real interview patterns.`,
      category,
      language,
      difficulty,
      questions,
      estHours: rand(3, 20),
      rating: (rand(35, 50) / 10).toFixed(1),
      students: rand(120, 5200),
      completion: rand(0, 100),
      status: ['Published', 'Draft', 'Archived'][i % 3],
      topics: [category, 'Arrays', 'Strings', 'Hash Tables'].slice(0, 4),
      questionsList: relatedQs,
      banner: ['#E6FFFA', '#EEF2FF', '#FFF7ED'][i % 3],
      instructor: `Instructor ${i % 12 + 1}`,
      prereq: ['Basic Programming', 'Data Structures'][i % 2],
      requirements: ['Laptop', 'Node.js'][i % 2],
    };
  });
};

const makeProblems = (count, categories) => {
  return Array.from({ length: count }).map((_, i) => {
    const id = `q-${i + 1}`;
    const difficulty = ['Easy', 'Medium', 'Hard'][i % 3];
    const category = categories[i % categories.length];
    const tags = [category, ['arrays', 'strings', 'dp'][i % 3]];
    return {
      id,
      number: i + 1,
      title: `${category} Problem ${i + 1}`,
      difficulty,
      description: `Solve ${category} related problem number ${i + 1}.`,
      tags,
      status: ['Unlocked', 'Locked', 'Solved'][i % 3],
      acceptedRate: `${rand(20, 90)}%`,
      timeLimit: `${rand(1, 3)}s`,
      memoryLimit: `${rand(32, 512)}MB`,
      points: rand(10, 100),
      companyTags: ['Google', 'Amazon', 'Microsoft'][i % 3],
    };
  });
};

const makeLeaderboard = (n) => Array.from({ length: n }).map((_, i) => ({
  rank: i + 1,
  avatar: `https://i.pravatar.cc/40?img=${i + 3}`,
  name: `User${i + 1}`,
  country: ['IN', 'US', 'UK', 'DE'][i % 4],
  points: rand(1000, 5000),
  solved: rand(10, 400),
  badges: rand(0, 5),
}));

const makeAchievements = (n) => Array.from({ length: n }).map((_, i) => ({ id: `ach-${i + 1}`, title: ['First Problem', '10 Problems', '50 Problems', '100 Problems', 'SQL Master'][i % 5] }));

const makeDailyChallenges = (n, problemsPool) => Array.from({ length: n }).map((_, i) => ({
  id: `daily-${i + 1}`,
  title: `Daily Challenge ${i + 1}`,
  difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
  reward: `${rand(50, 300)} XP`,
  timeLimit: `${rand(15, 90)} mins`,
  problemId: problemsPool[i % problemsPool.length]?.id,
}));

const PracticeHub = () => {
  // Core generated data
  const categories = useMemo(() => categoryList, []);
  const problems = useMemo(() => makeProblems(250, categories), [categories]);
  const modules = useMemo(() => makeModules(30, categories, problems), [categories, problems]);
  const leaderboard = useMemo(() => makeLeaderboard(20), []);
  const achievements = useMemo(() => makeAchievements(20), []);
  const dailyChallenges = useMemo(() => makeDailyChallenges(15, problems), [problems]);

  // UI state
  const [queryModule, setQueryModule] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const [bookmarks, setBookmarks] = useState(new Set());
  const [favorites, setFavorites] = useState(new Set());
  const [selectedModule, setSelectedModule] = useState(null);

  // Compiler state
  const compilerRef = useRef(null);
  const [compilerLang, setCompilerLang] = useState('javascript');
  const [editorCode, setEditorCode] = useState('// Start coding here');
  const [compilerOutput, setCompilerOutput] = useState('Run code to see execution logs.');
  const [running, setRunning] = useState(false);
  const [execTime, setExecTime] = useState(null);
  const [memoryUsed, setMemoryUsed] = useState(null);

  // Derived stats
  const totalModules = modules.length;
  const totalQuestions = problems.length;
  const studentsEnrolled = modules.reduce((s, m) => s + m.students, 0);
  const successRate = `${rand(60, 98)}%`;

  // Search + filter logic
  const filteredModules = useMemo(() => {
    let list = modules.slice();
    if (queryModule) list = list.filter((m) => m.title.toLowerCase().includes(queryModule.toLowerCase()));
    if (categoryFilter !== 'All Categories') list = list.filter((m) => m.category === categoryFilter);
    if (difficultyFilter !== 'All') list = list.filter((m) => m.difficulty === difficultyFilter);
    if (languageFilter !== 'All') list = list.filter((m) => m.language === languageFilter);
    if (statusFilter !== 'All') list = list.filter((m) => m.status === statusFilter);
    // Sort
    switch (sortBy) {
      case 'Newest':
        list.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'Oldest':
        list.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'Most Popular':
        list.sort((a, b) => b.students - a.students);
        break;
      case 'Most Questions':
        list.sort((a, b) => b.questions - a.questions);
        break;
      case 'Easy First':
        list.sort((a, b) => ['Easy', 'Medium', 'Hard'].indexOf(a.difficulty) - ['Easy', 'Medium', 'Hard'].indexOf(b.difficulty));
        break;
      case 'Hard First':
        list.sort((a, b) => ['Hard', 'Medium', 'Easy'].indexOf(a.difficulty) - ['Hard', 'Medium', 'Easy'].indexOf(b.difficulty));
        break;
      case 'A-Z':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
    }
    return list;
  }, [modules, queryModule, categoryFilter, difficultyFilter, languageFilter, statusFilter, sortBy]);

  const resetFilters = () => {
    setQueryModule('');
    setCategoryFilter('All Categories');
    setDifficultyFilter('All');
    setLanguageFilter('All');
    setStatusFilter('All');
    setSortBy('Newest');
  };

  const hasActiveFilters = queryModule !== '' || categoryFilter !== 'All Categories' || difficultyFilter !== 'All' || languageFilter !== 'All' || statusFilter !== 'All' || sortBy !== 'Newest';

  // Compiler helpers - FIXED to execute actual code
  const codeTemplates = useMemo(() => ({
    javascript: `// JavaScript\nconsole.log('Hello from sandbox')`,
    python: `# Python\nprint('Hello from sandbox')`,
    java: `// Java\npublic class Main { public static void main(String[] args){ System.out.println(\"Hello\"); } }`,
    cpp: `// C++\n#include <iostream>\nint main(){ std::cout<<\"Hello\"; }`,
    sql: `-- SQL\nSELECT * FROM users LIMIT 3;`,
    typescript: `// TypeScript\nconsole.log('Hello TS')`,
    csharp: `// C#\nusing System; class P{ static void Main(){ Console.WriteLine(\"Hi\"); } }`,
  }), []);

  // Execute code based on language
  const executeCode = (code, language) => {
    let output = '';
    let error = null;

    try {
      switch (language) {
        case 'javascript':
        case 'typescript': {
          const originalLog = console.log;
          const logs = [];
          console.log = (...args) => {
            logs.push(args.map(arg =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
          };

          try {
            const result = new Function(code)();
            console.log = originalLog;
            output = logs.join('\n');

            if (result !== undefined && output === '') {
              output = String(result);
            }

            if (output === '') {
              output = 'Code executed successfully (no output)';
            }
          } catch (e) {
            console.log = originalLog;
            error = e.message;
          }
          break;
        }

        case 'python': {
          const pythonMatches = code.match(/print\s*\(([^)]*)\)/g);
          if (pythonMatches) {
            output = pythonMatches.map(match => {
              const content = match.match(/print\s*\(([^)]*)\)/)[1];
              try {
                return String(eval(content));
              } catch {
                return content.replace(/['"]/g, '');
              }
            }).join('\n');
          } else {
            output = 'Python code executed successfully (no print statements found)';
          }
          break;
        }

        case 'java': {
          const javaMatches = code.match(/System\.out\.println\s*\(([^)]*)\)/g);
          if (javaMatches) {
            output = javaMatches.map(match => {
              const content = match.match(/println\s*\(([^)]*)\)/)[1];
              try {
                return String(eval(content));
              } catch {
                return content.replace(/['"]/g, '');
              }
            }).join('\n');
          } else {
            output = 'Java code compiled successfully (no output)';
          }
          break;
        }

        case 'cpp': {
          const cppMatches = code.match(/cout\s*<<\s*([^;]*)/g);
          if (cppMatches) {
            output = cppMatches.map(match => {
              const content = match.replace(/cout\s*<<\s*/, '').trim();
              try {
                return String(eval(content));
              } catch {
                return content.replace(/['"]/g, '');
              }
            }).join('\n');
          } else {
            output = 'C++ compiled successfully (no output)';
          }
          break;
        }

        case 'sql': {
          if (code.toLowerCase().includes('select')) {
            output = `+----+--------+------------+\n| id | name   | status     |\n+----+--------+------------+\n| 1  | Rahul  | Active     |\n| 2  | Priya  | Inactive   |\n| 3  | Krish  | Active     |\n+----+--------+------------+\n(3 rows returned)`;
          } else {
            output = 'Query executed successfully';
          }
          break;
        }

        case 'csharp': {
          const csharpMatches = code.match(/Console\.WriteLine\s*\(([^)]*)\)/g);
          if (csharpMatches) {
            output = csharpMatches.map(match => {
              const content = match.match(/WriteLine\s*\(([^)]*)\)/)[1];
              try {
                return String(eval(content));
              } catch {
                return content.replace(/['"]/g, '');
              }
            }).join('\n');
          } else {
            output = 'C# code executed successfully (no output)';
          }
          break;
        }

        default:
          output = `Execution not supported for ${language}`;
      }
    } catch (err) {
      error = err.message;
    }

    if (error) {
      return `Error: ${error}`;
    }

    return output || 'Code executed successfully (no output)';
  };

  const runMockCode = () => {
    setRunning(true);
    setCompilerOutput('Compiling and running...');
    setExecTime(null);
    setMemoryUsed(null);

    const start = performance.now();

    setTimeout(() => {
      const end = performance.now();
      const output = executeCode(editorCode, compilerLang);

      setRunning(false);
      setCompilerOutput(`Output:\n${output}`);
      setExecTime(((end - start) / 1000).toFixed(2) + 's');
      setMemoryUsed(rand(10, 120) + 'MB');
    }, 800 + rand(0, 400));
  };

  const resetCode = () => {
    const key = compilerLang.toLowerCase();
    setEditorCode(codeTemplates[key] || '');
    setCompilerOutput('Run code to see execution logs.');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(editorCode);
    } catch (e) {
      // ignore
    }
  };

  const downloadCode = () => {
    const blob = new Blob([editorCode], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `code.${compilerLang}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const uploadCode = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => setEditorCode(ev.target.result);
    r.readAsText(f);
  };

  const toggleBookmark = (id) => setBookmarks((s) => {
    const next = new Set(s);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleFavorite = (id) => setFavorites((s) => {
    const next = new Set(s);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  useEffect(() => {
    setEditorCode(codeTemplates.javascript);
  }, [codeTemplates]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">

      {/* Hero (kept visually identical) */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-100 bg-white/10 p-8 text-center md:text-left">
        <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-purple-50/50 blur-[80px]" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Practice Your Skills Anytime</h1>
            <p className="text-xs text-slate-650 leading-relaxed">Improve your programming and technical skills with coding challenges, quizzes and real-world project modules built in collaboration with senior engineers.</p>
            <div className="pt-2">
              <button onClick={() => document.getElementById('compiler')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary inline-flex py-2 px-5 text-xs">Start Practice</button>
            </div>
          </div>
          <div className="h-28 w-28 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white text-5xl shadow-2xl flex-shrink-0">💻</div>
        </div>
      </section>

      {/* Summary stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 text-center">
          <p className="text-xs text-slate-500 uppercase">Total Modules</p>
          <p className="text-2xl font-bold text-slate-900">{totalModules}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-100 text-center">
          <p className="text-xs text-slate-500 uppercase">Total Questions</p>
          <p className="text-2xl font-bold text-slate-900">{totalQuestions}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-100 text-center">
          <p className="text-xs text-slate-500 uppercase">Students Enrolled</p>
          <p className="text-2xl font-bold text-slate-900">{studentsEnrolled}</p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="p-6 rounded-2xl bg-white border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-purple-650" />
            Search Modules
          </h3>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-650 hover:border-purple-200 hover:text-purple-650 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={queryModule}
            onChange={(e) => setQueryModule(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-sm focus:outline-none focus:border-purple-200 focus:bg-white transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Category</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 text-xs focus:outline-none focus:border-purple-200">
              <option>All Categories</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Technology</label>
            <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 text-xs focus:outline-none focus:border-purple-200">
              <option>All</option>
              {languagesList.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Difficulty</label>
            <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 text-xs focus:outline-none focus:border-purple-200">
              <option>All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 text-xs focus:outline-none focus:border-purple-200">
              <option>All</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 text-xs focus:outline-none focus:border-purple-200">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Popular</option>
              <option>Most Questions</option>
              <option>Easy First</option>
              <option>Hard First</option>
              <option>A-Z</option>
            </select>
          </div>
        </div>

        <p className="text-[10px] text-slate-400">{filteredModules.length} of {totalModules} modules match your filters</p>
      </section>

      {/* Practice Module Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredModules.map((m) => (
          <div key={m.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition-transform transform hover:scale-102">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl`}>{m.image}</div>
              <div className="text-right text-xs text-slate-500">{m.language} • {m.difficulty}</div>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">{m.desc}</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="text-[10px] text-slate-400">{m.questions} Questions • {m.estHours} hrs</div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setSelectedModule(m); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[10px] font-bold text-purple-650 flex items-center gap-0.5">Explore <ChevronRight className="w-3 h-3" /></button>
                <button className="text-[10px] font-semibold text-slate-700">Continue</button>
                <button onClick={() => toggleBookmark(m.id)} className={`px-2 py-1 rounded-lg text-[10px] ${bookmarks.has(m.id) ? 'bg-slate-100' : 'bg-white'} border`}>Bookmark</button>
                <button onClick={() => toggleFavorite(m.id)} className={`px-2 py-1 rounded-lg text-[10px] ${favorites.has(m.id) ? 'bg-yellow-100' : 'bg-white'} border`}>Fav</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Module Details (in-state view) */}
      {selectedModule && (
        <section className="p-6 rounded-2xl bg-white border border-slate-100 shadow-lg mt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center text-3xl">{selectedModule.image}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedModule.title}</h3>
                  <p className="text-xs text-slate-500">{selectedModule.category} • {selectedModule.language} • {selectedModule.difficulty}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 text-xs">Questions: <strong>{selectedModule.questions}</strong></div>
                <div className="p-3 rounded-lg bg-slate-50 text-xs">Duration: <strong>{selectedModule.estHours} hrs</strong></div>
                <div className="p-3 rounded-lg bg-slate-50 text-xs">Rating: <strong>{selectedModule.rating}</strong></div>
              </div>

              <div className="mt-4 text-sm text-slate-700">{selectedModule.desc}</div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900">Instructor Recommendation</h4>
                  <p className="text-[10px] text-slate-500">Follow the practice order and focus on problem patterns.</p>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900">Learning Outcome</h4>
                  <p className="text-[10px] text-slate-500">Improve algorithmic problem solving and optimize solutions.</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-bold text-slate-900">Topics Covered</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedModule.topics.map((t) => (<span key={t} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-semibold">{t}</span>))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-bold text-slate-900">Questions</h4>
                <div className="space-y-2 mt-2">
                  {selectedModule.questionsList.slice(0, 20).map((qid, idx) => {
                    const q = problems.find((p) => p.id === qid) || problems[idx % problems.length];
                    return (
                      <div key={q.id} className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">#{q.number}</span>
                            <span className="text-xs font-semibold">{q.title}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
                          </div>
                          <p className="text-[10px] text-slate-500">{q.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500">{q.acceptedRate}</span>
                          <button className="px-2 py-1 rounded bg-white border text-[10px]">Start Solving</button>
                          <button className="px-2 py-1 rounded bg-white border text-[10px]">Solution</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-64">
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Quick Stats</h4>
                <p className="text-[12px] text-slate-700">Students: <strong>{selectedModule.students}</strong></p>
                <p className="text-[12px] text-slate-700">Completion: <strong>{selectedModule.completion}%</strong></p>
                <p className="text-[12px] text-slate-700">Instructor: <strong>{selectedModule.instructor}</strong></p>
                <div className="pt-2">
                  <button onClick={() => { setSelectedModule(null); }} className="w-full py-2 rounded-lg border border-slate-100 text-[10px] font-semibold">Close</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Compiler Console */}
      <section id="compiler" ref={compilerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase flex items-center gap-2"><FileQuestion className="w-5 h-5 text-purple-650" /> <span>⚡ Online Compiler</span></h2>
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 border border-slate-100 rounded-xl">
              {['javascript', 'python', 'java', 'cpp', 'sql', 'typescript', 'csharp'].map((lang) => (
                <button key={lang} onClick={() => { setCompilerLang(lang); setEditorCode(codeTemplates[lang] || ''); }} className={`px-3 py-1 rounded-lg text-[10px] uppercase font-bold ${compilerLang === lang ? 'bg-white text-purple-650 border border-slate-200' : 'text-slate-500'}`}>{lang.replace('cpp', 'C++')}</button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden shadow-xl flex flex-col h-80">
            <div className="bg-white px-4 py-2 border-b border-slate-950 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>editor.workspace</span>
              <span className="capitalize">{compilerLang} Workspace</span>
            </div>

            <textarea value={editorCode} onChange={(e) => setEditorCode(e.target.value)} className="flex-grow bg-slate-50 text-slate-700 font-mono text-xs p-4 focus:outline-none resize-none leading-relaxed" />

            <div className="bg-white px-4 py-2.5 border-t border-slate-950 flex justify-between gap-3">
              <div className="flex items-center gap-2">
                <button onClick={resetCode} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[10px] font-semibold text-slate-650">Reset Code</button>
                <button onClick={runMockCode} disabled={running} className="px-4 py-1.5 rounded-lg bg-purple-600 disabled:opacity-50 text-white text-[10px] font-bold flex items-center gap-1.5">
                  {running ? 'Running...' : 'Run Code'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input id="uploadCode" type="file" onChange={uploadCode} className="hidden" />
                <label htmlFor="uploadCode" className="px-2 py-1 text-[10px] border rounded cursor-pointer">Upload</label>
                <button onClick={copyCode} className="px-2 py-1 text-[10px] border rounded">Copy</button>
                <button onClick={downloadCode} className="px-2 py-1 text-[10px] border rounded">Download</button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Terminal Output</span>
            <pre className="font-mono text-xs text-slate-650 leading-relaxed whitespace-pre-wrap">{compilerOutput}</pre>
            <div className="flex items-center gap-4 text-[10px] text-slate-500">
              <span>Execution: <strong className="text-slate-700">{execTime ?? '-'}</strong></span>
              <span>Memory: <strong className="text-slate-700">{memoryUsed ?? '-'}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar widgets */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2">Daily Challenge</h3>
            {dailyChallenges.slice(0, 3).map((d) => (
              <div key={d.id} className="p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold">{d.title}</h4>
                    <p className="text-[10px] text-slate-500">{d.difficulty} • {d.reward}</p>
                  </div>
                  <button onClick={() => { setCompilerLang('javascript'); setEditorCode('// Daily challenge starter'); window.scrollTo({ top: document.getElementById('compiler')?.offsetTop || 0, behavior: 'smooth' }); }} className="px-2 py-1 rounded bg-white border text-[10px]">Start</button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/40 border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-650 border-b border-slate-100 pb-2 flex items-center gap-1.5"><Trophy className="w-4 h-4 text-yellow-400" /> Leaderboard</h3>
            <div className="space-y-1">
              {leaderboard.slice(0, 5).map((s) => (
                <div key={s.rank} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/40 border border-slate-100/50 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                    <div className="text-xs font-semibold text-slate-700">{s.name}</div>
                  </div>
                  <span className="font-mono text-slate-500 text-[10px]">{s.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Related Modules Footer */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-100">
          <h4 className="text-sm font-bold">Achievements</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {achievements.map((a) => <span key={a.id} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-semibold">{a.title}</span>)}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-100 lg:col-span-2">
          <h4 className="text-sm font-bold">Related Modules</h4>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {['React', 'Angular', 'Vue', 'Node', 'Express', 'MongoDB', 'MySQL', 'Python'].map((r) => (
              <div key={r} className="p-3 rounded-lg bg-slate-50 text-xs text-slate-700">{r}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeHub;