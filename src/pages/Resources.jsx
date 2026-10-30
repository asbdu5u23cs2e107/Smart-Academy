import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Search,
  Download,
  Eye,
  Video,
  FileText,
  Code,
  FileDown,
  BookOpen,
  Presentation,
  ExternalLink,
  X,
  Check,
  Copy,
  AlertCircle,
  ChevronDown,
  Play,
  CheckCircle2,
  BookMarked,
  Printer,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { getStudentData } from "../services/studentDataService";
import html2pdf from "html2pdf.js";

import {
  getAllResources,
  fetchRemoteResources,
  subscribeResources,
  filterResources,
} from "../services/resourceRepository";

// Canonical course filter options matching SwordNex Academy curriculum
const COURSE_FILTER_OPTIONS = [
  { id: "all", title: "All Courses" },
  { id: "python", title: "Python Programming" },
  { id: "fsd", title: "Full Stack Development" },
  { id: "react-js", title: "React JS" },
  { id: "java", title: "Java Enterprise" },
  { id: "sql", title: "SQL Database" },
  { id: "ai", title: "AI / Machine Learning" },
  { id: "data-science", title: "Data Science" },
  { id: "node-js", title: "Node.js Backend" },
  { id: "mongodb", title: "MongoDB Database" },
  { id: "angular", title: "Angular" },
  { id: "ui-ux", title: "UI/UX Design" },
  { id: "aspnet-core", title: "ASP.NET Core" },
  { id: "digital-marketing", title: "Digital Marketing" },
];

const Resources = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active Modals & Viewers State
  const [activeNoteResource, setActiveNoteResource] = useState(null);
  const [activeVideoResource, setActiveVideoResource] = useState(null);
  const [activePdfResource, setActivePdfResource] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  const notesPrintRef = useRef(null);

  // Student Enrolled / Selected Course Detection
  const studentData = useMemo(() => getStudentData(user), [user]);

  const defaultCourse = useMemo(() => {
    if (studentData?.selectedCourse?.title) return studentData.selectedCourse.title;
    if (studentData?.selectedCourseId) {
      const match = COURSE_FILTER_OPTIONS.find(
        (c) => c.id.toLowerCase() === studentData.selectedCourseId.toLowerCase()
      );
      if (match) return match.title;
    }
    if (user?.course) return user.course;
    return "All Courses";
  }, [studentData, user]);

  const [selectedCourse, setSelectedCourse] = useState(defaultCourse);

  // Update default course if student profile updates
  useEffect(() => {
    if (defaultCourse && defaultCourse !== "All Courses") {
      setSelectedCourse(defaultCourse);
    }
  }, [defaultCourse]);

  // =====================================================
  // CATEGORY TABS (Preserves all 5 existing tabs)
  // =====================================================
  const categories = [
    {
      label: "All",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      label: "Notes",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Videos",
      icon: <Video className="w-4 h-4" />,
    },
    {
      label: "Links",
      icon: <ExternalLink className="w-4 h-4" />,
    },
    {
      label: "PDFs",
      icon: <FileDown className="w-4 h-4" />,
    },
  ];

  // =====================================================
  // LOAD DATA & SUBSCRIBE
  // =====================================================
  useEffect(() => {
    const initialList = getAllResources();
    setResources(initialList);
    setLoading(false);

    const unsubscribe = subscribeResources((updatedList) => {
      setResources(updatedList);
    });

    fetchRemoteResources()
      .then((remoteUpdated) => {
        if (Array.isArray(remoteUpdated) && remoteUpdated.length > 0) {
          setResources(remoteUpdated);
        }
      })
      .catch((err) => {
        console.warn("Remote resource fetch completed with local fallback:", err?.message || err);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  // Show temporary status alert / notification
  const showToast = (message) => {
    setStatusMessage(message);
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  // =====================================================
  // FILE SIZE FORMATTER
  // =====================================================
  const formatFileSize = (bytes) => {
    if (!bytes || bytes <= 0) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // =====================================================
  // FILTERING (Course matching + Category + Search)
  // =====================================================
  const filteredResources = useMemo(() => {
    return filterResources(resources, {
      category: selectedCategory,
      search: searchQuery,
      course: selectedCourse,
    });
  }, [resources, searchQuery, selectedCategory, selectedCourse]);

  // =====================================================
  // RESOURCE OPEN / PREVIEW HANDLER
  // Root fix: never displays raw code or raw markdown files
  // =====================================================
  const handlePreview = (resource) => {
    if (!resource) return;

    // 1. Direct PDF preview if resource has uploaded PDF fileUrl
    const hasDirectPdf = resource.type === "PDF" ||
                         resource.fileName?.toLowerCase().endsWith(".pdf") ||
                         (resource.fileUrl && (resource.fileUrl.startsWith("data:application/pdf") || resource.fileUrl.includes(".pdf")));

    if (hasDirectPdf && resource.fileUrl) {
      setActivePdfResource(resource);
      return;
    }

    // 2. NOTES: Open properly formatted study notes reader
    if (resource.type === "Notes" || resource.category === "Study Notes" || resource.notesContent) {
      setActiveNoteResource(resource);
      return;
    }

    // 3. VIDEOS: Open and play actual relevant video in video player
    if (resource.type === "Video" || resource.category === "Video Tutorials" || resource.fileName?.endsWith(".mp4")) {
      if (!resource.fileUrl) {
        showToast("This resource is currently unavailable.");
        return;
      }
      setActiveVideoResource(resource);
      return;
    }

    // 4. LINKS: Open official educational webpage in new tab
    if (resource.type === "Link" || resource.category === "Official Documentation") {
      if (!resource.fileUrl || resource.fileUrl === "https://github.com" || resource.fileUrl.includes("raw.githubusercontent.com")) {
        showToast("This resource is currently unavailable.");
        return;
      }
      window.open(resource.fileUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // 5. PDFs without direct fileUrl: Open PDF reader
    if (resource.type === "PDF" || resource.fileName?.endsWith(".pdf") || resource.category === "PDF Notes") {
      setActivePdfResource(resource);
      return;
    }

    // Fallback: If it has structured content, open study notes viewer
    if (resource.notesContent || resource.description) {
      setActiveNoteResource(resource);
      return;
    }

    // If resource has a valid external URL that isn't raw source code
    if (resource.fileUrl && !resource.fileUrl.includes("raw.githubusercontent.com") && !resource.fileUrl.endsWith(".md")) {
      window.open(resource.fileUrl, "_blank", "noopener,noreferrer");
      return;
    }

    showToast("This resource is currently unavailable.");
  };

  // =====================================================
  // DOWNLOAD / ACTION HANDLER
  // Provides clean PDF download or opens viewer safely
  // =====================================================
  const handleDownload = async (resource) => {
    if (!resource) return;

    // 1. Direct PDF file download if fileUrl is available
    const isDirectPdf = resource.type === "PDF" ||
                        resource.type === "Notes" ||
                        resource.fileName?.toLowerCase().endsWith(".pdf") ||
                        (resource.fileUrl && (resource.fileUrl.startsWith("data:application/pdf") || resource.fileUrl.includes(".pdf")));

    if (isDirectPdf && resource.fileUrl) {
      try {
        const downloadName = resource.fileName || `${(resource.title || "Document").replace(/\s+/g, "_")}.pdf`;

        if (resource.fileUrl.startsWith("data:") || resource.fileUrl.startsWith("blob:")) {
          const a = document.createElement("a");
          a.href = resource.fileUrl;
          a.download = downloadName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          showToast("PDF downloaded successfully!");
          return;
        }

        // Remote URL (e.g. Firebase Storage)
        const res = await fetch(resource.fileUrl);
        if (res.ok) {
          const blob = await res.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = downloadName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(blobUrl);
          showToast("PDF downloaded successfully!");
          return;
        } else {
          window.open(resource.fileUrl, "_blank", "noopener,noreferrer");
          return;
        }
      } catch (_downloadErr) {
        window.open(resource.fileUrl, "_blank", "noopener,noreferrer");
        return;
      }
    }

    // 2. LINKS: Open educational webpage directly
    if (resource.type === "Link" || resource.category === "Official Documentation") {
      if (!resource.fileUrl || resource.fileUrl === "https://github.com" || resource.fileUrl.includes("raw.githubusercontent.com")) {
        showToast("This resource is currently unavailable.");
        return;
      }
      window.open(resource.fileUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // 3. VIDEOS: Open video player
    if (resource.type === "Video" || resource.category === "Video Tutorials") {
      if (!resource.fileUrl) {
        showToast("This resource is currently unavailable.");
        return;
      }
      setActiveVideoResource(resource);
      return;
    }

    // 4. NOTES: Open reader and prompt clean PDF export
    if (resource.type === "Notes" || resource.category === "Study Notes") {
      setActiveNoteResource(resource);
      return;
    }

    // 5. PDFs: Download PDF or open viewer
    if (resource.type === "PDF" || resource.fileName?.endsWith(".pdf") || resource.category === "PDF Notes") {
      setActivePdfResource(resource);
      return;
    }

    // Generic fallback: check if fileUrl is valid and not raw source code
    if (resource.fileUrl && !resource.fileUrl.includes("raw.githubusercontent.com") && !resource.fileUrl.endsWith(".md")) {
      window.open(resource.fileUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // If source-code URL or missing, open formatted study notes
    setActiveNoteResource(resource);
  };

  // =====================================================
  // INSTANT PDF EXPORTER (Using html2pdf.js)
  // Generates genuine, beautiful PDF documents for students
  // =====================================================
  const downloadNotesAsPdf = async (resource) => {
    // If the resource has an uploaded PDF file, download it directly
    if (resource?.fileUrl && (resource.fileName?.toLowerCase().endsWith(".pdf") || resource.fileUrl.startsWith("data:application/pdf"))) {
      handleDownload(resource);
      return;
    }

    if (!notesPrintRef.current) return;
    setIsPdfGenerating(true);

    try {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: resource?.fileName || `${(resource?.title || "Study_Notes").replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(notesPrintRef.current).save();
      showToast("Study Notes PDF downloaded successfully!");
    } catch (err) {
      console.warn("PDF generation fallback:", err);
      // Native print fallback
      window.print();
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Code Copy Helper
  const handleCopyCode = (id, codeText) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    }
  };

  // =====================================================
  // ICONS & LABELS
  // =====================================================
  const getResourceIcon = (type) => {
    if (type === "Video") return <Video className="w-5 h-5 text-rose-500" />;
    if (type === "PPT") return <Presentation className="w-5 h-5 text-orange-500" />;
    if (type === "Link") return <ExternalLink className="w-5 h-5 text-sky-500" />;
    if (type === "Code") return <Code className="w-5 h-5 text-emerald-500" />;
    if (type === "PDF") return <FileDown className="w-5 h-5 text-indigo-500" />;
    return <FileText className="w-5 h-5 text-purple-600" />;
  };

  const getTypeLabel = (type) => {
    if (type === "Video") return "VIDEO";
    if (type === "PPT") return "PPT";
    if (type === "Link") return "LINK";
    if (type === "Code") return "CODE";
    if (type === "PDF") return "PDF";
    return "NOTES";
  };

  const getTypeColor = (type) => {
    if (type === "Video") return "text-rose-500";
    if (type === "Code") return "text-emerald-500";
    if (type === "PPT") return "text-orange-500";
    if (type === "Link") return "text-sky-500";
    if (type === "PDF") return "text-indigo-600";
    return "text-purple-600";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* =================================================
          HEADER & FILTERS
      ================================================= */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            RESOURCES CENTER
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Learn • Practice • Download • Improve
          </p>
        </div>

        {/* SEARCH & COURSE SELECTOR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* COURSE SELECTOR DROPDOWN */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              aria-label="Filter resources by course"
              className="w-full appearance-none rounded-xl bg-white border border-slate-200 py-2.5 pl-3 pr-8 text-xs font-semibold text-slate-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 cursor-pointer shadow-sm transition-all"
            >
              {COURSE_FILTER_OPTIONS.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search Resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-white border border-slate-200 py-2.5 pl-9 pr-4 text-sm text-slate-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all shadow-sm"
            >
            </input>
          </div>
        </div>
      </div>

      {/* =================================================
          CATEGORY TABS (All 5 Filters)
      ================================================= */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedCategory === cat.label
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-600"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Course Indicator */}
        {selectedCourse !== "All Courses" && (
          <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-purple-700 font-medium">Filtered by:</span>
            <span className="font-bold text-purple-900">{selectedCourse}</span>
            <button
              onClick={() => setSelectedCourse("All Courses")}
              className="ml-1 text-slate-400 hover:text-purple-700"
              title="Show all courses"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* =================================================
          RESULT COUNT
      ================================================= */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Available Resources
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {filteredResources.length} resource
            {filteredResources.length !== 1 ? "s" : ""} available
            {selectedCourse !== "All Courses" ? ` for ${selectedCourse}` : ""}
          </p>
        </div>

        <div className="rounded-xl bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-600">
          Total: {resources.length}
        </div>
      </div>

      {/* =================================================
          NOTIFICATION TOAST
      ================================================= */}
      {statusMessage && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4 text-amber-600" />
          </button>
        </div>
      )}

      {/* =================================================
          LOADING OR EMPTY OR RESOURCE GRID
      ================================================= */}
      {loading ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />
          <p className="mt-4 text-sm font-semibold text-slate-600">
            Loading resources...
          </p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 font-semibold text-slate-700">
            No resources found
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Try switching courses or selecting "All" categories.
          </p>
          {selectedCourse !== "All Courses" && (
            <button
              onClick={() => setSelectedCourse("All Courses")}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all"
            >
              View All Courses
            </button>
          )}
        </div>
      ) : (
        /* RESOURCE GRID */
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={`${resource.type}-${resource.id}`}
              className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                {/* TOP BADGE & SIZE */}
                <div className="flex justify-between items-start gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 bg-slate-50 border border-slate-100 ${getTypeColor(
                      resource.type
                    )}`}
                  >
                    {getResourceIcon(resource.type)}
                    {getTypeLabel(resource.type)}
                  </span>

                  <span className="text-[10px] text-slate-500 font-mono">
                    {resource.fileSize
                      ? formatFileSize(resource.fileSize)
                      : resource.type === "Video"
                      ? "Interactive Video"
                      : resource.type === "Link"
                      ? "Official Guide"
                      : "Study Document"}
                  </span>
                </div>

                {/* TITLE */}
                <div className="space-y-3">
                  <h3
                    onClick={() => handlePreview(resource)}
                    className="text-sm font-bold text-slate-900 leading-normal line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
                  >
                    {resource.title}
                  </h3>

                  {/* METADATA */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                    <div>
                      Course:
                      <span className="text-slate-700 ml-1 font-semibold">
                        {resource.course || resource.subject || "-"}
                      </span>
                    </div>

                    <div>
                      Type:
                      <span className="text-slate-700 ml-1 font-semibold">
                        {getTypeLabel(resource.type)}
                      </span>
                    </div>

                    <div>
                      Category:
                      <span className="text-slate-700 ml-1">
                        {resource.chapter || resource.category || "-"}
                      </span>
                    </div>

                    <div>
                      Faculty:
                      <span className="text-slate-700 ml-1">
                        {resource.uploadedBy || resource.trainer || "SwordNex Faculty"}
                      </span>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  {resource.description && (
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {resource.description}
                    </p>
                  )}
                </div>
              </div>

              {/* ACTIONS: PREVIEW & DOWNLOAD / OPEN */}
              <div className="grid grid-cols-2 gap-3 border-t border-slate-200/60 pt-4 mt-auto">
                {/* PREVIEW BUTTON */}
                <button
                  type="button"
                  onClick={() => handlePreview(resource)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-600 transition-colors text-xs font-semibold"
                >
                  {resource.type === "Video" ? (
                    <Play className="w-3.5 h-3.5 text-rose-500" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {resource.type === "Video"
                      ? "Watch"
                      : resource.type === "Notes"
                      ? "Read Notes"
                      : "Preview"}
                  </span>
                </button>

                {/* DOWNLOAD / VISIT BUTTON */}
                <button
                  type="button"
                  onClick={() => handleDownload(resource)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors text-xs font-bold"
                >
                  {resource.type === "Link" ? (
                    <ExternalLink className="w-3.5 h-3.5" />
                  ) : resource.type === "Video" ? (
                    <Play className="w-3.5 h-3.5" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {resource.type === "Link"
                      ? "Visit Link"
                      : resource.type === "Video"
                      ? "Play Video"
                      : "Download"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* =========================================================================
          1. READABLE STUDY NOTES MODAL (Requirement 4)
          Opens properly formatted, readable study notes - never raw source code
      ========================================================================= */}
      {activeNoteResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                    {activeNoteResource.course || activeNoteResource.subject}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Study Notes & Guide
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {activeNoteResource.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadNotesAsPdf(activeNoteResource)}
                  disabled={isPdfGenerating}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                  title="Download as PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isPdfGenerating ? "Generating PDF..." : "Download as PDF"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNoteResource(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - Printable & Readable Document Layout */}
            <div className="flex-grow overflow-y-auto p-6 sm:p-8 space-y-8 bg-white">
              <div ref={notesPrintRef} className="space-y-8 text-slate-800">
                {/* Document Banner */}
                <div className="border-b border-slate-200 pb-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>SwordNex Academy Technical Curriculum</span>
                    <span>Verified Study Material</span>
                  </div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {activeNoteResource.title}
                  </h1>
                  {activeNoteResource.notesContent?.subtitle && (
                    <p className="text-sm font-semibold text-purple-700">
                      {activeNoteResource.notesContent.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-slate-500">
                    Faculty: {activeNoteResource.uploadedBy || activeNoteResource.trainer || "SwordNex Technical Faculty"} • Course: {activeNoteResource.course}
                  </p>
                </div>

                {/* Overview Card */}
                {activeNoteResource.notesContent?.overview ? (
                  <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-2">
                    <div className="flex items-center gap-2 font-bold text-purple-900">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>Executive Overview</span>
                    </div>
                    <p>{activeNoteResource.notesContent.overview}</p>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed">
                    <p>{activeNoteResource.description || "Comprehensive syllabus notes covering fundamental to advanced patterns for this course."}</p>
                  </div>
                )}

                {/* Structured Modules */}
                {activeNoteResource.notesContent?.modules && activeNoteResource.notesContent.modules.length > 0 ? (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      Curriculum Modules & Syntax Guides
                    </h3>

                    {activeNoteResource.notesContent.modules.map((mod) => (
                      <div
                        key={mod.num}
                        className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 space-y-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                              {mod.num}
                            </span>
                            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                              {mod.title}
                            </h4>
                          </div>
                        </div>

                        {mod.summary && (
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {mod.summary}
                          </p>
                        )}

                        {/* Properly Formatted Code Snippet */}
                        {mod.code && (
                          <div className="relative rounded-xl bg-slate-900 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                            <button
                              type="button"
                              onClick={() => handleCopyCode(`mod-${mod.num}`, mod.code)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-[10px] flex items-center gap-1"
                              title="Copy Code"
                            >
                              {copiedCodeId === `mod-${mod.num}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                            <pre className="pr-16 leading-relaxed whitespace-pre font-mono">
                              {mod.code}
                            </pre>
                          </div>
                        )}

                        {/* Key Takeaways */}
                        {mod.takeaways && mod.takeaways.length > 0 && (
                          <div className="space-y-1.5 pt-2">
                            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                              Key Takeaways:
                            </span>
                            <ul className="space-y-1 text-xs text-slate-600">
                              {mod.takeaways.map((t, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Standard Formatted Content if no custom modules */
                  <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
                    <h3 className="font-bold text-slate-900 text-sm">Course Study Notes</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeNoteResource.description}
                    </p>
                  </div>
                )}

                {/* Cheat Sheet Table */}
                {activeNoteResource.notesContent?.cheatSheet && activeNoteResource.notesContent.cheatSheet.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      Quick Syntax & Reference Table
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="min-w-full divide-y divide-slate-200 text-xs">
                        <thead className="bg-slate-50 text-slate-600 font-bold">
                          <tr>
                            <th className="py-2.5 px-4 text-left">Concept / Topic</th>
                            <th className="py-2.5 px-4 text-left font-mono">Syntax / Pattern</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {activeNoteResource.notesContent.cheatSheet.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="py-2.5 px-4 font-semibold text-slate-800">
                                {item.topic}
                              </td>
                              <td className="py-2.5 px-4 font-mono text-purple-700 bg-slate-50/30">
                                {item.syntax}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Interview / Exam Tips */}
                {activeNoteResource.notesContent?.interviewTips && activeNoteResource.notesContent.interviewTips.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      High-Frequency Interview Questions
                    </h3>
                    <div className="space-y-3">
                      {activeNoteResource.notesContent.interviewTips.map((tip, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                          <p className="font-bold text-slate-900">
                            Q: {tip.q}
                          </p>
                          <p className="text-slate-600 leading-relaxed">
                            A: {tip.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Stamp */}
                <div className="pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
                  SwordNex Academy • Certified Technical Learning Material • All rights reserved
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50">
              <span className="text-xs text-slate-500">
                Ready to review or export to PDF
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadNotesAsPdf(activeNoteResource)}
                  disabled={isPdfGenerating}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isPdfGenerating ? "Generating..." : "Download as PDF"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNoteResource(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. EMBEDDED VIDEO PLAYER MODAL (Requirement 5)
          Plays the actual relevant learning video in an integrated video player
      ========================================================================= */}
      {activeVideoResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Player Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800/80 bg-slate-900/50">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  {activeVideoResource.course || activeVideoResource.subject} • Video Lecture
                </span>
                <h3 className="text-sm font-bold text-white truncate max-w-xl">
                  {activeVideoResource.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideoResource(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewport */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {activeVideoResource.fileUrl ? (
                activeVideoResource.fileUrl.includes("youtube.com") || activeVideoResource.fileUrl.includes("youtu.be") ? (
                  <iframe
                    src={`${activeVideoResource.fileUrl}?autoplay=1`}
                    title={activeVideoResource.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <video
                    controls
                    autoPlay
                    src={activeVideoResource.fileUrl}
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support HTML5 video streaming.
                  </video>
                )
              ) : (
                <div className="text-center p-8 space-y-2 text-slate-400">
                  <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                  <p className="font-semibold text-white">This resource is currently unavailable.</p>
                  <p className="text-xs text-slate-400">The video stream could not be loaded at this time.</p>
                </div>
              )}
            </div>

            {/* Player Description & Info */}
            <div className="p-5 bg-slate-900 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Instructor: <span className="text-slate-200 font-semibold">{activeVideoResource.uploadedBy || activeVideoResource.trainer || "SwordNex Faculty"}</span>
                </span>
                <span className="text-slate-400 font-mono">
                  {activeVideoResource.views || 450} views
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {activeVideoResource.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. PDF VIEWER & DOWNLOAD MODAL (Requirement 7)
          Opens the actual PDF in a PDF viewer with working download option
      ========================================================================= */}
      {activePdfResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  PDF Architecture Handbook
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {activePdfResource.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {activePdfResource.fileUrl && (
                  <button
                    type="button"
                    onClick={() => window.open(activePdfResource.fileUrl, "_blank", "noopener,noreferrer")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                    title="Open PDF in New Tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open in Tab</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => downloadNotesAsPdf(activePdfResource)}
                  disabled={isPdfGenerating}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isPdfGenerating ? "Downloading..." : "Download PDF"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePdfResource(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-slate-100/60 space-y-4">
              {activePdfResource.fileUrl ? (
                <div className="space-y-4">
                  {/* Embedded PDF Viewer */}
                  <div className="w-full h-[65vh] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                    <iframe
                      src={activePdfResource.fileUrl}
                      title={activePdfResource.title}
                      className="w-full h-full border-0"
                    />
                  </div>

                  {/* Document Details Card */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-bold text-[10px] uppercase">
                          {activePdfResource.course}
                        </span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          {activePdfResource.fileName}
                        </span>
                      </div>
                      <p className="text-slate-650">
                        {activePdfResource.description || `Study material uploaded by ${activePdfResource.uploadedBy || activePdfResource.trainer || "SwordNex Trainer"}`}
                      </p>
                    </div>
                    <div className="text-right text-[11px] text-slate-400 flex-shrink-0">
                      <span>{formatFileSize(activePdfResource.fileSize) || "Verified PDF"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  ref={notesPrintRef}
                  className="mx-auto max-w-3xl bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200/80 space-y-6 text-slate-800"
                >
                  {/* PDF Title Header */}
                  <div className="border-b-2 border-purple-600 pb-4 space-y-1">
                    <div className="flex justify-between items-center text-xs text-purple-700 font-bold uppercase tracking-wider">
                      <span>{activePdfResource.course}</span>
                      <span>SwordNex Verified PDF Handbook</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900">
                      {activePdfResource.title}
                    </h1>
                    <p className="text-xs text-slate-500">
                      Curriculum Document ID: {activePdfResource.id} • Faculty: {activePdfResource.uploadedBy || activePdfResource.trainer}
                    </p>
                  </div>

                  {/* Content Overview */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-900 text-sm">Document Overview</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {activePdfResource.description || "Official academic PDF document containing full reference standards, syntax architectures, and best practice implementations."}
                    </p>
                  </div>

                  {/* Structured Modules or Chapters */}
                  {activePdfResource.notesContent?.modules ? (
                    <div className="space-y-4">
                      {activePdfResource.notesContent.modules.map((mod) => (
                        <div key={mod.num} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                          <h4 className="font-bold text-slate-900">
                            {mod.num}. {mod.title}
                          </h4>
                          <p className="text-slate-600">{mod.summary}</p>
                          {mod.code && (
                            <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                              {mod.code}
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl border border-dashed border-slate-300 text-center space-y-2">
                      <FileDown className="w-10 h-10 text-purple-600 mx-auto" />
                      <p className="text-xs font-semibold text-slate-700">
                        Complete verified PDF manual available for download
                      </p>
                      <p className="text-[11px] text-slate-400">
                        File: {activePdfResource.fileName} ({formatFileSize(activePdfResource.fileSize) || "2.8 MB"})
                      </p>
                    </div>
                  )}

                  {/* PDF Stamp */}
                  <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>SwordNex Academy Learning Resources</span>
                    <span>Page 1 of 1</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                {activePdfResource.fileName}
              </span>
              <button
                type="button"
                onClick={() => downloadNotesAsPdf(activePdfResource)}
                disabled={isPdfGenerating}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isPdfGenerating ? "Generating..." : "Download PDF"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;