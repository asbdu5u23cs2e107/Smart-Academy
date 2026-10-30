import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Download, Search, BookOpen, Tag, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAllResources, subscribeResources } from '../../services/resourceRepository';

const defaultNotes = [
  { id: 'def-1', title: 'HTML5 Semantic Elements.pdf',         size: '1.4 MB', subject: 'HTML',  date: '10 Jul 2026', pages: 12, color: 'text-orange-500 bg-orange-50 border-orange-100' },
  { id: 'def-2', title: 'CSS Grid & Flexbox Cheat Sheet.pdf',  size: '2.1 MB', subject: 'CSS',   date: '12 Jul 2026', pages: 8,  color: 'text-blue-500 bg-blue-50 border-blue-100' },
  { id: 'def-3', title: 'JavaScript ES6+ Features.pdf',        size: '1.9 MB', subject: 'JS',    date: '15 Jul 2026', pages: 20, color: 'text-yellow-500 bg-yellow-50 border-yellow-100' },
  { id: 'def-4', title: 'React Lifecycle & Hooks Guide.pdf',   size: '1.8 MB', subject: 'React', date: '18 Jul 2026', pages: 16, color: 'text-sky-500 bg-sky-50 border-sky-100' },
  { id: 'def-5', title: 'Node.js Modules & REST APIs.pdf',     size: '2.5 MB', subject: 'Node',  date: '20 Jul 2026', pages: 22, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
  { id: 'def-6', title: 'MongoDB Schema Design Patterns.pdf',  size: '1.6 MB', subject: 'DB',    date: '22 Jul 2026', pages: 14, color: 'text-indigo-500 bg-indigo-50 border-indigo-100' },
];

const Notes = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');
  const [downloadedIds, setDownloadedIds] = useState([]);
  const [allResourcesList, setAllResourcesList] = useState(() => getAllResources());

  useEffect(() => {
    setAllResourcesList(getAllResources());
    const unsub = subscribeResources((updated) => {
      setAllResourcesList(updated);
    });
    return () => unsub();
  }, []);

  const combinedNotes = useMemo(() => {
    const list = [...defaultNotes];
    // Map uploaded PDF/notes from repository
    allResourcesList
      .filter(r => r.type === 'Notes' || r.type === 'PDF' || r.fileName?.toLowerCase().endsWith('.pdf'))
      .forEach(r => {
        // Skip duplicate defaults
        if (list.some(n => n.title.toLowerCase() === (r.fileName || r.title).toLowerCase())) return;
        const sub = r.course || r.subject || 'General';
        const formattedDate = r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent';
        const sizeStr = r.fileSize ? `${(r.fileSize / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB';
        list.unshift({
          id: r.id,
          title: r.fileName || `${r.title}.pdf`,
          rawTitle: r.title,
          size: sizeStr,
          subject: sub,
          date: formattedDate,
          pages: 10,
          color: 'text-purple-600 bg-purple-50 border-purple-100',
          fileUrl: r.fileUrl,
          course: r.course
        });
      });
    return list;
  }, [allResourcesList]);

  const subjects = useMemo(() => {
    const set = new Set(['All', 'HTML', 'CSS', 'JS', 'React', 'Node', 'DB']);
    combinedNotes.forEach(n => {
      if (n.subject && n.subject !== 'General') {
        const clean = n.subject.length > 15 ? n.subject.split(' ')[0] : n.subject;
        set.add(clean);
      }
    });
    return Array.from(set);
  }, [combinedNotes]);

  const filtered = combinedNotes.filter(n => {
    const matchSub = activeSubject === 'All' || n.subject.toLowerCase().includes(activeSubject.toLowerCase()) || activeSubject.toLowerCase().includes(n.subject.toLowerCase());
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || (n.rawTitle && n.rawTitle.toLowerCase().includes(search.toLowerCase()));
    return matchSub && matchSearch;
  });

  const handleDownload = async (note) => {
    setDownloadedIds(prev => [...prev, note.id]);
    setTimeout(() => setDownloadedIds(prev => prev.filter(i => i !== note.id)), 2500);

    if (note.fileUrl) {
      try {
        const downloadName = note.title.endsWith('.pdf') ? note.title : `${note.title}.pdf`;
        if (note.fileUrl.startsWith('data:') || note.fileUrl.startsWith('blob:')) {
          const a = document.createElement('a');
          a.href = note.fileUrl;
          a.download = downloadName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          return;
        }

        const res = await fetch(note.fileUrl);
        if (res.ok) {
          const blob = await res.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = downloadName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(blobUrl);
          return;
        }
      } catch (_e) {}
      window.open(note.fileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs text-purple-650 font-bold uppercase tracking-widest">Student Dashboard</span>
          <h1 className="text-xl font-extrabold text-slate-900 uppercase mt-0.5 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" /> Class Notes
          </h1>
        </div>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-500 text-xs font-bold">
          {combinedNotes.length} PDF Notes Available
        </span>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-purple-300 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1.5 flex-wrap">
          <Tag className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setActiveSubject(s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all ${
                activeSubject === s ? 'bg-purple-600 text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filtered.map((note) => {
          const isDownloading = downloadedIds.includes(note.id);
          return (
            <div
              key={note.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-slate-100 hover:shadow-sm transition-all group"
            >
              {/* Icon */}
              <div className={`p-3 rounded-xl border flex-shrink-0 ${note.color}`}>
                <FileText className="w-5 h-5" />
              </div>

              {/* Info */}
              <div className="flex-grow min-w-0 space-y-0.5">
                <h4
                  onClick={() => note.fileUrl && window.open(note.fileUrl, '_blank', 'noopener,noreferrer')}
                  className={`text-xs font-bold text-slate-900 truncate ${note.fileUrl ? 'cursor-pointer hover:text-purple-600' : ''}`}
                >
                  {note.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5" /> {note.pages} pages
                  </span>
                  <span>•</span>
                  <span>{note.size}</span>
                  <span>•</span>
                  <span>Uploaded {note.date}</span>
                </div>
              </div>

              {/* Subject Badge */}
              <span className={`hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase border ${note.color} flex-shrink-0`}>
                {note.subject}
              </span>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(note)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wide transition-all ${
                  isDownloading
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                {isDownloading ? 'Done!' : 'Download'}
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-medium">No notes found.</p>
        </div>
      )}

    </div>
  );
};

export default Notes;
