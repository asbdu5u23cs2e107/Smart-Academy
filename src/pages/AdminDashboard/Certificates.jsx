import React, { useEffect, useMemo, useState } from "react";

import {
  Search,
  Download,
  Filter,
  Eye,
  FileDown,
  BadgeX,
  ChevronLeft,
  ChevronRight,
  Award,
  CheckCircle2,
  Clock3,
  User,
  BookOpen,
  Calendar,
  X,
} from "lucide-react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import html2pdf from "html2pdf.js";

import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { getAllCourses } from "../../services/courseRepository";
import {
  getAllCertificates,
  issueCertificate,
  revokeCertificate,
  exportCertificatesToCSV,
  generateCertificateId,
  subscribeCertificates,
  mergeCertificates,
} from "../../services/certificateService";
import { getStudentKey } from "../../services/studentDataService";

const Certificates = () => {
  const { user } = useAuth();
  const isStudent = user?.role === "student";

  // =====================================================
  // STATES
  // =====================================================

  const [students, setStudents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [courses, setCourses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [course, setCourse] = useState("All Courses");
  const [status, setStatus] = useState("All Status");
  const [date, setDate] = useState("All Dates");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [showModal, setShowModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    email: "",
    phone: "",
    course: "",
    certificateId: "",
    completionDate: "",
    status: "Issued",
  });

  // =====================================================
  // LOAD STUDENTS (Firestore + LocalStorage fallback)
  // =====================================================

  useEffect(() => {
    const studentsRef = collection(db, "students");

    const loadFallbackStudents = () => {
      try {
        const local = localStorage.getItem("smartacademy_student_profiles");
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setStudents(
              parsed.map((p, idx) => ({
                id: p.id || `student_${idx}`,
                studentName: p.studentName || p.name || `Student ${idx + 1}`,
                email: p.email || "",
                phone: p.phone || "",
                course: p.course || "",
              }))
            );
            return;
          }
        }
      } catch (_e) {}
    };

    const unsubscribe = onSnapshot(
      studentsRef,
      (snapshot) => {
        const studentList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        if (studentList.length > 0) {
          setStudents(studentList);
        } else {
          loadFallbackStudents();
        }
      },
      (error) => {
        console.warn("Student loading error (using fallback):", error);
        loadFallbackStudents();
      }
    );

    return () => unsubscribe();
  }, []);

  // =====================================================
  // LOAD COURSES (Firestore + Catalog fallback)
  // =====================================================

  useEffect(() => {
    const coursesRef = collection(db, "courses");

    const loadFallbackCourses = () => {
      const all = getAllCourses();
      setCourses(
        all.map((c) => ({
          id: c.id,
          courseName: c.title,
          title: c.title,
          ...c,
        }))
      );
    };

    const unsubscribe = onSnapshot(
      coursesRef,
      (snapshot) => {
        const courseListData = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        if (courseListData.length > 0) {
          setCourses(courseListData);
        } else {
          loadFallbackCourses();
        }
      },
      (error) => {
        console.warn("Course loading error (using catalog):", error);
        loadFallbackCourses();
      }
    );

    return () => unsubscribe();
  }, []);

  // =====================================================
  // LOAD CERTIFICATES (Firestore + LocalStorage cache)
  // =====================================================

  useEffect(() => {
    const filterForCurrentRole = (rawList) => {
      if (isStudent && user) {
        const studentKey = getStudentKey(user);
        const userEmail = (user.email || "").trim().toLowerCase();
        const userName = (user.name || "").trim().toLowerCase();

        return rawList.filter((c) => {
          const certStudentId = (c.studentId || "").trim().toLowerCase();
          const certEmail = (c.email || "").trim().toLowerCase();
          const certName = (c.studentName || "").trim().toLowerCase();

          return (
            (certStudentId && (certStudentId === studentKey || certStudentId === (user.id || "").toLowerCase())) ||
            (certEmail && userEmail && certEmail === userEmail) ||
            (certName && userName && certName === userName)
          );
        });
      }
      return rawList;
    };

    const fetchCertificates = async () => {
      const allCerts = await getAllCertificates();
      setCertificates(filterForCurrentRole(allCerts));
    };

    fetchCertificates();

    const certificatesRef = collection(db, "certificates");
    const unsubscribe = onSnapshot(
      certificatesRef,
      (snapshot) => {
        const firestoreList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setCertificates((prev) => {
          const merged = mergeCertificates(firestoreList, prev);
          return filterForCurrentRole(merged);
        });
      },
      (error) => {
        console.warn("Certificate snapshot error:", error);
      }
    );

    const unsubLocal = subscribeCertificates(() => {
      fetchCertificates();
    });

    return () => {
      unsubscribe();
      unsubLocal();
    };
  }, [user, isStudent]);

  // =====================================================
  // OPEN ISSUE MODAL
  // =====================================================

  const handleOpenIssueModal = () => {
    const firstStudent = students[0];
    const initialCourse = firstStudent?.course || courses[0]?.title || "";

    setFormData({
      studentId: firstStudent?.id || "",
      studentName: firstStudent?.studentName || firstStudent?.name || "",
      email: firstStudent?.email || "",
      phone: firstStudent?.phone || "",
      course: initialCourse,
      certificateId: generateCertificateId(),
      completionDate: new Date().toISOString().split("T")[0],
      status: "Issued",
    });

    setShowModal(true);
  };

  // =====================================================
  // STUDENT CHANGE
  // =====================================================

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    const selectedStudent = students.find((student) => student.id === studentId);

    if (!selectedStudent) {
      setFormData((previous) => ({
        ...previous,
        studentId: "",
        studentName: "",
        email: "",
        phone: "",
        course: "",
      }));
      return;
    }

    setFormData((previous) => ({
      ...previous,
      studentId: selectedStudent.id,
      studentName: selectedStudent.studentName || selectedStudent.name || "",
      email: selectedStudent.email || selectedStudent.emailAddress || "",
      phone: selectedStudent.phone || selectedStudent.phoneNumber || "",
      course: selectedStudent.course || previous.course || "",
    }));
  };

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // GENERATE CERTIFICATE
  // =====================================================

  const handleGenerateCertificate = async (e) => {
    e.preventDefault();

    if (!formData.studentId) {
      alert("Please select a student.");
      return;
    }

    if (!formData.studentName) {
      alert("Student name not found.");
      return;
    }

    if (!formData.course) {
      alert("Please select or enter a course.");
      return;
    }

    if (!formData.completionDate) {
      alert("Please select completion date.");
      return;
    }

    try {
      setLoading(true);

      const certificateData = {
        certificateId: formData.certificateId || generateCertificateId(),
        studentId: formData.studentId,
        studentName: formData.studentName,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        completionDate: formData.completionDate,
        status: formData.status || "Issued",
        provider: "SwordNex Academy",
        createdAt: new Date().toISOString(),
      };

      const saved = await issueCertificate(certificateData);

      setCertificates((previous) => mergeCertificates([saved], previous));

      alert("Certificate generated successfully!");
      setShowModal(false);
      setSelectedCertificate(saved);
    } catch (error) {
      console.error("Generate certificate error:", error);
      alert("Failed to generate certificate.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // VIEW CERTIFICATE
  // =====================================================

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  // =====================================================
  // DOWNLOAD CERTIFICATE (html2pdf with SwordNex Academy branding)
  // =====================================================

  const handleDownloadCertificate = async (certificate) => {
    try {
      setDownloading(true);

      const element = document.createElement("div");
      element.style.width = "1100px";
      element.style.background = "white";
      element.style.padding = "30px";
      element.style.position = "absolute";
      element.style.left = "-99999px";
      element.style.top = "0";

      element.innerHTML = `
        <div style="border: 12px solid #ede9fe; padding: 15px; background: white;">
          <div style="border: 3px solid #7c3aed; padding: 60px 40px; text-align: center; font-family: Arial, sans-serif;">
            <div style="font-size: 55px; color: #7c3aed; margin-bottom: 15px;">🏆</div>
            <div style="font-size: 16px; letter-spacing: 5px; font-weight: bold; color: #64748b; text-transform: uppercase;">
              SWORDNEX ACADEMY
            </div>
            <div style="font-size: 14px; letter-spacing: 4px; font-weight: 600; color: #7c3aed; text-transform: uppercase; margin-top: 5px;">
              CERTIFICATE OF COMPLETION
            </div>
            <h1 style="font-size: 42px; color: #6d28d9; margin: 25px 0 15px;">Certificate</h1>
            <p style="font-size: 17px; color: #64748b; margin: 0;">This certificate is proudly presented to</p>
            <h2 style="font-size: 38px; color: #0f172a; margin: 15px 0; text-transform: uppercase;">
              ${certificate.studentName || ""}
            </h2>
            <p style="font-size: 17px; color: #64748b; margin: 0;">for successfully completing the course</p>
            <h3 style="font-size: 28px; color: #7c3aed; margin: 15px 0 30px;">
              ${certificate.course || ""}
            </h3>
            <div style="display: flex; justify-content: space-around; margin-top: 35px; font-size: 15px;">
              <div>
                <div style="color: #94a3b8; margin-bottom: 6px;">Certificate ID</div>
                <strong>${certificate.certificateId || ""}</strong>
              </div>
              <div>
                <div style="color: #94a3b8; margin-bottom: 6px;">Completion Date</div>
                <strong>${formatDate(certificate.completionDate)}</strong>
              </div>
              <div>
                <div style="color: #94a3b8; margin-bottom: 6px;">Provider</div>
                <strong>SwordNex Academy</strong>
              </div>
            </div>
            <div style="margin-top: 40px; padding: 8px 24px; display: inline-block; border-radius: 30px; background: ${
              certificate.status === "Issued"
                ? "#dcfce7"
                : certificate.status === "Pending"
                ? "#fef3c7"
                : "#fee2e2"
            }; color: ${
              certificate.status === "Issued"
                ? "#15803d"
                : certificate.status === "Pending"
                ? "#b45309"
                : "#b91c1c"
            }; font-weight: bold;">
              ${certificate.status || "Issued"}
            </div>
            <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; color: #94a3b8; font-size: 13px;">
              <span>SwordNex Academy</span>
              <span>Official Certificate</span>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(element);

      const options = {
        margin: 0,
        filename: `${certificate.certificateId || "SwordNex_Certificate"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      };

      await html2pdf().set(options).from(element).save();
      document.body.removeChild(element);
    } catch (error) {
      console.error("Download error:", error);
      alert("Certificate download failed.");
    } finally {
      setDownloading(false);
    }
  };

  // =====================================================
  // REVOKE
  // =====================================================

  const handleRevokeCertificate = async (certificate) => {
    const confirmRevoke = window.confirm(
      `Are you sure you want to revoke certificate ${certificate.certificateId}?`
    );

    if (!confirmRevoke) return;

    try {
      await revokeCertificate(certificate);
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === certificate.id || c.certificateId === certificate.certificateId
            ? { ...c, status: "Revoked", revokedAt: new Date().toISOString() }
            : c
        )
      );
      alert("Certificate revoked successfully.");
    } catch (error) {
      console.error("Revoke error:", error);
      alert("Failed to revoke certificate.");
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const dateObject = new Date(dateString);
    if (Number.isNaN(dateObject.getTime())) return dateString;

    return dateObject.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // COURSE LIST (catalog + existing certificates)
  // =====================================================

  const courseList = useMemo(() => {
    const certCourses = certificates.map((c) => c.course).filter(Boolean);
    const catalogCourses = courses.map((c) => c.courseName || c.title).filter(Boolean);
    return Array.from(new Set([...certCourses, ...catalogCourses]));
  }, [certificates, courses]);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredRows = useMemo(() => {
    return certificates.filter((certificate) => {
      const haystack = `
        ${certificate.certificateId || ""}
        ${certificate.studentName || ""}
        ${certificate.email || ""}
        ${certificate.course || ""}
        ${certificate.status || ""}
      `.toLowerCase();

      const matchesSearch = haystack.includes(searchTerm.toLowerCase().trim());
      const matchesCourse = course === "All Courses" || certificate.course === course;
      const matchesStatus = status === "All Status" || certificate.status === status;

      let matchesDate = true;
      if (date !== "All Dates") {
        const d = new Date(certificate.completionDate || certificate.createdAt);
        if (!Number.isNaN(d.getTime())) {
          matchesDate = d.getMonth() === Number(date);
        }
      }

      return matchesSearch && matchesCourse && matchesStatus && matchesDate;
    });
  }, [certificates, searchTerm, course, status, date]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, course, status, date]);

  // =====================================================
  // PAGINATION SLICE
  // =====================================================

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalCertificates = certificates.length;

  const issuedThisMonth = certificates.filter((certificate) => {
    if (certificate.status !== "Issued") return false;
    const d = new Date(certificate.completionDate || certificate.createdAt);
    if (Number.isNaN(d.getTime())) return false;
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const pendingCertificates = certificates.filter(
    (certificate) => certificate.status === "Pending"
  ).length;

  const revokedCertificates = certificates.filter(
    (certificate) => certificate.status === "Revoked"
  ).length;

  const monthOptions = [
    { label: "January", value: 0 },
    { label: "February", value: 1 },
    { label: "March", value: 2 },
    { label: "April", value: 3 },
    { label: "May", value: 4 },
    { label: "June", value: 5 },
    { label: "July", value: 6 },
    { label: "August", value: 7 },
    { label: "September", value: 8 },
    { label: "October", value: 9 },
    { label: "November", value: 10 },
    { label: "December", value: 11 },
  ];

  const hasActiveFilters =
    Boolean(searchTerm) ||
    course !== "All Courses" ||
    status !== "All Status" ||
    date !== "All Dates";

  const handleResetFilters = () => {
    setSearchTerm("");
    setCourse("All Courses");
    setStatus("All Status");
    setDate("All Dates");
    setCurrentPage(1);
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="text-slate-900">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">
              Certificate Management
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Issue, track, review, and download course certificates.
            </p>
          </div>

          <div className="flex gap-2">
            {!isStudent && (
              <button
                type="button"
                onClick={handleOpenIssueModal}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all"
              >
                <Award className="w-4 h-4" />
                + Issue Certificate
              </button>
            )}

            <button
              type="button"
              onClick={() => exportCertificatesToCSV(filteredRows)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
              title="Export filtered certificates to CSV"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Award className="w-[19px] h-[19px] text-purple-600" />}
            bg="bg-purple-100"
            title="Total Certificates"
            value={totalCertificates}
          />

          <StatCard
            icon={<CheckCircle2 className="w-[19px] h-[19px] text-green-600" />}
            bg="bg-green-100"
            title="Issued This Month"
            value={issuedThisMonth}
          />

          <StatCard
            icon={<Clock3 className="w-[19px] h-[19px] text-orange-600" />}
            bg="bg-orange-100"
            title="Pending"
            value={pendingCertificates}
          />

          <StatCard
            icon={<BadgeX className="w-[19px] h-[19px] text-red-600" />}
            bg="bg-red-100"
            title="Revoked"
            value={revokedCertificates}
          />
        </div>

        {/* TABLE SECTION */}
        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-3">
              {/* SEARCH */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-xl border border-slate-200 py-2 pl-9 pr-4 text-sm min-w-[230px] outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                  placeholder="Search student or certificate"
                />
              </div>

              {/* COURSE */}
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-500"
              >
                <option value="All Courses">All Courses</option>
                {courseList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {/* STATUS */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-500"
              >
                <option value="All Status">All Status</option>
                <option value="Issued">Issued</option>
                <option value="Pending">Pending</option>
                <option value="Revoked">Revoked</option>
              </select>

              {/* DATE */}
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-500"
              >
                <option value="All Dates">All Dates</option>
                {monthOptions.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* FILTER BUTTON */}
            <button
              type="button"
              onClick={handleResetFilters}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-[13px] font-bold transition-all ${
                hasActiveFilters
                  ? "border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              title={hasActiveFilters ? "Click to reset all filters" : "Filters active"}
            >
              <Filter className="w-4 h-4" />
              {hasActiveFilters ? "Reset Filters" : "Filter"}
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
                  <th className="pb-3 px-2">Certificate ID</th>
                  <th className="pb-3 px-2">Student</th>
                  <th className="pb-3 px-2">Course</th>
                  <th className="pb-3 px-2">Completion Date</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedRows.length > 0 ? (
                  paginatedRows.map((row) => (
                    <tr
                      key={row.id || row.certificateId}
                      className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900 font-mono">
                        {row.certificateId}
                      </td>

                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600 text-xs">
                            <User className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-slate-900">
                              {row.studentName}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {row.email || row.studentId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-2 text-[13px] font-semibold text-slate-600">
                        {row.course}
                      </td>

                      <td className="py-4 px-2 text-[13px] font-semibold text-slate-600">
                        {formatDate(row.completionDate)}
                      </td>

                      <td className="py-4 px-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            row.status === "Issued"
                              ? "bg-emerald-50 text-emerald-600"
                              : row.status === "Pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* VIEW */}
                          <button
                            type="button"
                            title="View Certificate"
                            onClick={() => handleViewCertificate(row)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* DOWNLOAD */}
                          <button
                            type="button"
                            title="Download Certificate"
                            disabled={downloading}
                            onClick={() => handleDownloadCertificate(row)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 disabled:opacity-50 transition-all"
                          >
                            <FileDown className="w-4 h-4" />
                          </button>

                          {/* REVOKE (Admin only) */}
                          {!isStudent && row.status !== "Revoked" && (
                            <button
                              type="button"
                              title="Revoke Certificate"
                              onClick={() => handleRevokeCertificate(row)}
                              className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all"
                            >
                              <BadgeX className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-center text-sm text-slate-500"
                    >
                      No certificates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between pt-5 items-center flex-wrap gap-3">
            <div className="text-[12px] font-semibold text-slate-500">
              Showing{" "}
              {filteredRows.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} -{" "}
              {Math.min(currentPage * pageSize, filteredRows.length)} of{" "}
              {filteredRows.length} certificates
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-8 min-w-8 rounded-xl px-3 text-sm font-bold transition-all ${
                    currentPage === pageNum
                      ? "bg-purple-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ================================================= */}
      {/* GENERATE CERTIFICATE MODAL */}
      {/* ================================================= */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Generate Certificate</h2>
                  <p className="text-xs text-slate-500">
                    Create certificate from student records
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateCertificate}>
              <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
                {/* STUDENT */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">
                    Student <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      value={formData.studentId}
                      onChange={handleStudentChange}
                      className="w-full rounded-xl border py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-purple-500"
                      required
                    >
                      <option value="">Select student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.studentName || student.name || "Unnamed Student"}
                          {" - "}
                          {student.email || student.id}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Student Name
                  </label>
                  <input
                    value={formData.studentName}
                    readOnly
                    className="w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email
                  </label>
                  <input
                    value={formData.email}
                    readOnly
                    className="w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  />
                </div>

                {/* COURSE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-purple-500"
                      required
                    >
                      <option value="">Select course</option>
                      {courseList.map((cName) => (
                        <option key={cName} value={cName}>
                          {cName}
                        </option>
                      ))}
                      {formData.course && !courseList.includes(formData.course) && (
                        <option value={formData.course}>{formData.course}</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* CERTIFICATE ID */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Certificate ID
                  </label>
                  <input
                    value={formData.certificateId}
                    readOnly
                    className="w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm font-mono font-semibold text-purple-700"
                  />
                </div>

                {/* DATE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Completion Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      name="completionDate"
                      value={formData.completionDate}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                </div>

                {/* STATUS */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Certificate Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 font-medium"
                  >
                    <option value="Issued">Issued</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border bg-white px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-50 transition-all"
                >
                  {loading ? "Generating..." : "Generate Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* VIEW CERTIFICATE PREVIEW MODAL */}
      {/* ================================================= */}

      {selectedCertificate && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* VIEW HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Certificate Preview
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedCertificate.certificateId}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* CERTIFICATE PREVIEW CARD */}
            <div className="p-6">
              <div className="border-[10px] border-purple-100 bg-white p-3">
                <div className="border-2 border-purple-600 p-10 text-center">
                  <Award className="mx-auto h-16 w-16 text-purple-600" />

                  <p className="mt-4 text-sm font-semibold uppercase tracking-[4px] text-slate-500">
                    Certificate of Completion
                  </p>

                  <h1 className="mt-6 text-4xl font-extrabold text-purple-700">
                    Certificate
                  </h1>

                  <p className="mt-5 text-sm text-slate-500">
                    This certificate is proudly presented to
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900 uppercase">
                    {selectedCertificate.studentName}
                  </h2>

                  <p className="mt-5 text-sm text-slate-500">
                    for successfully completing the course
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-purple-600">
                    {selectedCertificate.course}
                  </h3>

                  <div className="mt-8 grid grid-cols-3 gap-6 text-sm">
                    <div>
                      <p className="text-slate-400">Certificate ID</p>
                      <p className="mt-1 font-bold font-mono">
                        {selectedCertificate.certificateId}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Completion Date</p>
                      <p className="mt-1 font-bold">
                        {formatDate(selectedCertificate.completionDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Provider</p>
                      <p className="mt-1 font-bold text-purple-600">
                        SwordNex Academy
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-xs font-bold ${
                        selectedCertificate.status === "Issued"
                          ? "bg-green-100 text-green-700"
                          : selectedCertificate.status === "Pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedCertificate.status}
                    </span>
                  </div>

                  <div className="mt-10 flex justify-between border-t pt-5 text-xs text-slate-400">
                    <span>SwordNex Academy</span>
                    <span>Official Certificate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VIEW ACTIONS */}
            <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
              <button
                type="button"
                disabled={downloading}
                onClick={() => handleDownloadCertificate(selectedCertificate)}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-50 transition-all"
              >
                <Download className="h-4 w-4" />
                {downloading ? "Downloading..." : "Download PDF"}
              </button>

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================
// STAT CARD
// =====================================================

const StatCard = ({ icon, bg, title, value }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-5">
        <div
          className={`w-[38px] h-[38px] rounded-xl ${bg} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>

      <div className="text-[13px] text-slate-500 font-semibold mb-1">
        {title}
      </div>

      <div className="text-2xl font-extrabold tracking-tight">{value}</div>
    </div>
  );
};

export default Certificates;
