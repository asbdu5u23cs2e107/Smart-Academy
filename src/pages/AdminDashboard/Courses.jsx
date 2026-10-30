import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";
import { getAllCourses as getRepoCourses, deleteCustomCourse, subscribeCourses } from "../../services/courseRepository";

import {
  Search,
  Download,
  Filter,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  UserCheck,
  FileCheck2,
  Layers,
  PlayCircle,
} from "lucide-react";

const Courses = () => {
  // ==============================
  // STATES
  // ==============================
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [instructor, setInstructor] = useState("All Instructors");

  // ==============================
  // LOAD COURSES FROM REPOSITORY & FIREBASE
  // ==============================

  useEffect(() => {
    loadCourses();
    const unsub = subscribeCourses(() => {
      loadCourses();
    });
    return () => unsub();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);

      // 1. Load from Unified Course Repository (covers catalog + custom)
      const repoCourses = getRepoCourses();
      const mappedRepo = repoCourses.map((c) => ({
        id: c.id,
        courseId: c.courseId || c.id,
        course: c.title || c.course || c.courseName,
        courseName: c.title || c.course || c.courseName,
        instructor: c.trainer || c.instructor || "Expert Mentor",
        category: c.category || "General",
        students: c.students || 120,
        progress: c.progress || 0,
        status: c.status || "Active",
        duration: c.duration || "3 Months",
        price: c.price || 15000,
      }));

      // 2. Fetch any newly added Firestore courses
      let firestoreCourses = [];
      try {
        const snapshot = await getDocs(collection(db, "courses"));
        firestoreCourses = snapshot.docs.map((courseDoc) => ({
          id: courseDoc.id,
          ...courseDoc.data(),
        }));
      } catch (fbErr) {
        console.warn("Firestore fetch warning:", fbErr);
      }

      // Merge and deduplicate by courseId or id
      const courseMap = new Map();
      for (const c of mappedRepo) {
        const key = String(c.courseId || c.id).toLowerCase();
        courseMap.set(key, c);
      }
      for (const fc of firestoreCourses) {
        const key = String(fc.courseId || fc.id).toLowerCase();
        courseMap.set(key, { ...courseMap.get(key), ...fc });
      }

      setCourses(Array.from(courseMap.values()));
    } catch (error) {
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DELETE COURSE
  // ==============================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    try {
      deleteCustomCourse(id);
      try {
        await deleteDoc(doc(db, "courses", id));
      } catch (_fbErr) {
        // Document may not be in firestore if it was local custom
      }

      // Remove from UI also
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id && course.courseId !== id)
      );

      alert("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course");
    }
  };

  // ==============================
  // FILTER COURSES
  // ==============================

  const filteredRows = useMemo(() => {
    return courses.filter((row) => {
      const courseName = row.course || "";
      const courseId = row.courseId || "";
      const instructorName = row.instructor || "";
      const courseCategory = row.category || "";
      const courseStatus = row.status || "";

      const haystack =
        `${courseName} ${courseId} ${instructorName}`.toLowerCase();

      const matchesSearch =
        haystack.includes(
          searchTerm.toLowerCase()
        );

      const matchesCategory =
        category === "All Categories" ||
        courseCategory === category;

      const matchesStatus =
        status === "All Status" ||
        courseStatus === status;

      const matchesInstructor =
        instructor === "All Instructors" ||
        instructorName === instructor;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesInstructor
      );
    });
  }, [
    courses,
    searchTerm,
    category,
    status,
    instructor,
  ]);

  // ==============================
  // INSTRUCTOR LIST FROM FIREBASE
  // ==============================

  const instructors = useMemo(() => {
    const instructorList = courses
      .map((course) => course.instructor)
      .filter(Boolean);

    return [...new Set(instructorList)];
  }, [courses]);

  // ==============================
  // CATEGORY LIST FROM FIREBASE
  // ==============================

  const categories = useMemo(() => {
    const categoryList = courses
      .map((course) => course.category)
      .filter(Boolean);

    return [...new Set(categoryList)];
  }, [courses]);

  // ==============================
  // STATISTICS
  // ==============================

  const totalCourses = courses.length;

  const activeCourses = courses.filter(
    (course) => course.status === "Active"
  ).length;

  const draftCourses = courses.filter(
    (course) => course.status === "Draft"
  ).length;

  const completedCourses = courses.filter(
    (course) => course.status === "Completed"
  ).length;

  const stats = [
    {
      label: "Total Courses",
      value: totalCourses,
      change: "+8%",
      icon: BookOpen,
    },
    {
      label: "Active Courses",
      value: activeCourses,
      change: "+12%",
      icon: UserCheck,
    },
    {
      label: "Draft Courses",
      value: draftCourses,
      change: "+2%",
      icon: Layers,
    },
    {
      label: "Completed Courses",
      value: completedCourses,
      change: "+1%",
      icon: FileCheck2,
    },
  ];

  // ==============================
  // RETURN UI
  // ==============================

  return (
    <div className="text-slate-900">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-end justify-between flex-wrap gap-4">

          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">
              Course Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage all learning programs and catalog content.
            </p>
          </div>

          <div className="flex gap-2">

            <button
  type="button"
  onClick={() => navigate("/admin/AddCourse")}
  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow"
>
  <BookOpen className="w-4 h-4" />
  + Add Course
</button>

            <button
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {stats.map((stat) => {

            const StatIcon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-white border border-slate-100 rounded-2xl p-4"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">

                    <StatIcon className="w-[19px] h-[19px] text-purple-600" />

                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">

                    <TrendingUpIcon />

                    {stat.change}

                  </div>

                </div>

                <div className="text-[13px] text-slate-500 font-semibold mb-1">
                  {stat.label}
                </div>

                <div className="text-2xl font-extrabold tracking-tight">
                  {stat.value}
                </div>

              </div>
            );
          })}

        </div>

        {/* MAIN SECTION */}
        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">

          {/* FILTER TOP */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

            <div className="flex flex-wrap gap-3">

              {/* SEARCH */}
              <div className="relative">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]"
                  placeholder="Search courses"
                />

              </div>

              {/* CATEGORY */}
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
              >

                <option value="All Categories">
                  All Categories
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

              {/* STATUS */}
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
              >

                <option value="All Status">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Draft">
                  Draft
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

              {/* INSTRUCTOR */}
              <select
                value={instructor}
                onChange={(e) =>
                  setInstructor(e.target.value)
                }
                className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
              >

                <option value="All Instructors">
                  All Instructors
                </option>

                {instructors.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="min-w-full text-left">

              <thead>

                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">

                  <th className="pb-3 px-2">
                    Course
                  </th>

                  <th className="pb-3 px-2">
                    Course ID
                  </th>

                  <th className="pb-3 px-2">
                    Instructor
                  </th>

                  <th className="pb-3 px-2">
                    Category
                  </th>

                  <th className="pb-3 px-2">
                    Students
                  </th>

                  <th className="pb-3 px-2">
                    Progress
                  </th>

                  <th className="pb-3 px-2">
                    Status
                  </th>

                  <th className="pb-3 px-2 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {/* LOADING */}
                {loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="py-12 text-center text-sm text-slate-500"
                    >
                      Loading courses...
                    </td>

                  </tr>

                ) : filteredRows.length > 0 ? (

                  filteredRows.map((row, index) => (

                    <tr
                      key={row.id || `${row.course}-${index}`}
                      className="border-t border-slate-100"
                    >

                      {/* COURSE */}
                      <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">
                        {row.course || "-"}
                      </td>

                      {/* COURSE ID */}
                      <td className="py-4 px-2 text-[13px] font-bold text-slate-600">
                        {row.courseId || "-"}
                      </td>

                      {/* INSTRUCTOR */}
                      <td className="py-4 px-2 text-[13px] font-bold text-slate-600">
                        {row.instructor || "-"}
                      </td>

                      {/* CATEGORY */}
                      <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">
                        {row.category || "-"}
                      </td>

                      {/* STUDENTS */}
                      <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">

                        {Number(row.students || 0).toLocaleString(
                          "en-IN"
                        )}

                      </td>

                      {/* PROGRESS */}
                      <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">
                        {row.progress || 0}%
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-2">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            row.status === "Active"
                              ? "bg-emerald-50 text-emerald-600"
                              : row.status === "Completed"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {row.status || "Draft"}
                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-2 text-right">

                        <div className="flex items-center justify-end gap-2">

                          {/* VIEW / OPEN LEARNING ROOM WITH VIDEOS */}
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/course/${row.courseId || row.id}/learn`)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 transition"
                            title="Open Course & Educational Videos"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* EDIT */}
                          <button
                            type="button"
                            onClick={() =>
                              alert(
                                `Edit Course: ${
                                  row.course || "-"
                                }`
                              )
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 transition"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(row.id)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  /* NO DATA */
                  <tr>

                    <td
                      colSpan="8"
                      className="py-12 text-center text-sm text-slate-500"
                    >
                      No courses found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">

            <div className="text-[12px] font-semibold text-slate-500">

              Showing 1 to{" "}
              {filteredRows.length} of{" "}
              {courses.length} courses

            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"
              >
                <span className="inline-flex items-center gap-1">

                  <ChevronLeft className="w-4 h-4" />

                  Previous

                </span>
              </button>

              <button
                type="button"
                className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-600 text-white"
              >
                1
              </button>

              <button
                type="button"
                className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600"
              >
                2
              </button>

              <button
                type="button"
                className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600"
              >
                3
              </button>

              <button
                type="button"
                className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600"
              >
                ...
              </button>

              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"
              >

                <span className="inline-flex items-center gap-1">

                  Next

                  <ChevronRight className="w-4 h-4" />

                </span>

              </button>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

// ==============================
// TRENDING ICON
// ==============================

const TrendingUpIcon = () => (
  <span className="inline-flex items-center">

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-[11px] h-[11px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />

    </svg>

  </span>
);

export default Courses;