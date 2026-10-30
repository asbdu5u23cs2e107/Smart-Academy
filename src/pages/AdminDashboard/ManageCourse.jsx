import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";
import { getAllCourses as getRepoCourses, deleteCustomCourse, subscribeCourses } from "../../services/courseRepository";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  PlayCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ManageCourse = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [viewCourse, setViewCourse] = useState(null);

  // --------------------------------------------------
  // LOAD COURSES FROM REPOSITORY & FIREBASE
  // --------------------------------------------------

  const loadCourses = async () => {
    try {
      setLoading(true);

      const repoCourses = getRepoCourses();
      const mappedRepo = repoCourses.map((c) => ({
        id: c.id,
        courseId: c.courseId || c.id,
        name: c.title || c.course || c.courseName,
        courseName: c.title || c.course || c.courseName,
        trainer: c.trainer || c.instructor || "Expert Mentor",
        category: c.category || "General",
        status: c.status || "Active",
        duration: c.duration || "3 Months",
        fee: c.price || 15000,
        price: c.price || 15000,
        description: c.description || "",
        seats: 30,
        mode: c.mode || "Online"
      }));

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

      const courseMap = new Map();
      for (const c of mappedRepo) {
        courseMap.set(String(c.courseId || c.id).toLowerCase(), c);
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

  useEffect(() => {
    loadCourses();
    const unsub = subscribeCourses(() => {
      loadCourses();
    });
    return () => unsub();
  }, []);

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const filteredCourses = courses.filter((course) => {
    const searchText = `
      ${course.name || ""}
      ${course.courseName || ""}
      ${course.category || ""}
      ${course.trainer || ""}
      ${course.courseId || ""}
    `.toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  // --------------------------------------------------
  // DELETE COURSE
  // --------------------------------------------------

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      deleteCustomCourse(id);
      try {
        await deleteDoc(
          doc(db, "courses", id)
        );
      } catch (_fbErr) {
        // Document may not be in firestore if it was local custom
      }

      alert("Course deleted successfully!");

      // Reload data
      loadCourses();

    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete course");
    }
  };

  // --------------------------------------------------
  // EDIT COURSE
  // --------------------------------------------------

  const handleEdit = (course) => {
    navigate("/admin/courses/edit", {
      state: {
        course,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-5 sm:p-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manage Courses
          </h1>

          <p className="mt-2 text-slate-500">
            Create, view, edit and manage all training courses.
          </p>
        </div>

        {/* ADD COURSE */}

        <button
          type="button"
          onClick={() => navigate("/admin/AddCourse")}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-purple-700"
        >
          <Plus className="h-5 w-5" />

          Add Course
        </button>

      </div>

      {/* ==================================================
          STAT CARDS
      ================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Courses
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {courses.length}
          </h2>

        </div>

        {/* ACTIVE */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Active Courses
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {
              courses.filter(
                (course) =>
                  course.status === "Active"
              ).length
            }
          </h2>

        </div>

        {/* INACTIVE */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Inactive Courses
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-500">
            {
              courses.filter(
                (course) =>
                  course.status === "Inactive"
              ).length
            }
          </h2>

        </div>

        {/* AVAILABLE SEATS */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Available Seats
          </p>

          <h2 className="mt-2 text-3xl font-bold text-purple-600">
            {
              courses.reduce(
                (total, course) =>
                  total +
                  Number(course.seats || 0),
                0
              )
            }
          </h2>

        </div>

      </div>

      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

        <div className="relative max-w-xl">

          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search course, category or trainer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>

      </div>

      {/* ==================================================
          COURSE TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead>

              <tr className="border-b bg-slate-50 text-left">

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  COURSE
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  CATEGORY
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  DURATION
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  TRAINER
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  FEE
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  MODE
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  STATUS
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  ACTIONS
                </th>

              </tr>

            </thead>

            <tbody>

              {/* LOADING */}

              {loading && (

                <tr>

                  <td
                    colSpan="8"
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    Loading courses...
                  </td>

                </tr>

              )}

              {/* DATA */}

              {!loading &&
                filteredCourses.map((course) => (

                  <tr
                    key={course.id}
                    className="border-b last:border-0 hover:bg-purple-50/40"
                  >

                    {/* COURSE */}

                    <td className="px-5 py-5">

                      <div className="font-semibold text-slate-900">
                        {course.name ||
                          course.courseName ||
                          "Unnamed Course"}
                      </div>

                      <div className="mt-1 max-w-xs truncate text-sm text-slate-500">
                        {course.description || "-"}
                      </div>

                    </td>

                    {/* CATEGORY */}

                    <td className="px-5 py-5">

                      <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-600">
                        {course.category || "-"}
                      </span>

                    </td>

                    {/* DURATION */}

                    <td className="px-5 py-5 text-sm text-slate-600">
                      {course.duration || "-"}
                    </td>

                    {/* TRAINER */}

                    <td className="px-5 py-5 text-sm font-medium text-slate-700">
                      {course.trainer || "-"}
                    </td>

                    {/* FEE */}

                    <td className="px-5 py-5 text-sm font-semibold text-slate-800">

                      ₹
                      {Number(
                        course.fee ||
                          course.price ||
                          0
                      ).toLocaleString("en-IN")}

                    </td>

                    {/* MODE */}

                    <td className="px-5 py-5">

                      <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-600">
                        {course.mode || "-"}
                      </span>

                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-5">

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          course.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {course.status || "-"}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-2">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            setViewCourse(course)
                          }
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(course)
                          }
                          className="rounded-lg bg-purple-50 p-2 text-purple-600 hover:bg-purple-100"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(course.id)
                          }
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              {/* EMPTY */}

              {!loading &&
                filteredCourses.length === 0 && (

                  <tr>

                    <td
                      colSpan="8"
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No courses found.
                    </td>

                  </tr>

                )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ==================================================
          VIEW MODAL
      ================================================== */}

      {viewCourse && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b px-6 py-5">

              <h2 className="text-xl font-bold text-slate-900">
                Course Details
              </h2>

              <button
                type="button"
                onClick={() =>
                  setViewCourse(null)
                }
                className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* DETAILS */}

            <div className="space-y-4 p-6">

              <div>
                <p className="text-sm text-slate-500">
                  Course Name
                </p>

                <p className="font-semibold text-slate-900">
                  {viewCourse.name ||
                    viewCourse.courseName ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Category
                </p>

                <p className="font-semibold text-slate-900">
                  {viewCourse.category || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Description
                </p>

                <p className="text-slate-700">
                  {viewCourse.description || "-"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-sm text-slate-500">
                    Duration
                  </p>

                  <p className="font-semibold">
                    {viewCourse.duration || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Trainer
                  </p>

                  <p className="font-semibold">
                    {viewCourse.trainer || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Fee
                  </p>

                  <p className="font-semibold">
                    ₹
                    {Number(
                      viewCourse.fee ||
                        viewCourse.price ||
                        0
                    ).toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Seats
                  </p>

                  <p className="font-semibold">
                    {viewCourse.seats || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Mode
                  </p>

                  <p className="font-semibold">
                    {viewCourse.mode || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <p className="font-semibold">
                    {viewCourse.status || "-"}
                  </p>
                </div>

              </div>

              {/* ACTION FOOTER */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setViewCourse(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const targetId = viewCourse.courseId || viewCourse.id;
                    navigate(`/course/${targetId}/learn`);
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-xs font-bold text-white shadow-md hover:bg-purple-700 flex items-center gap-1.5 transition"
                >
                  <PlayCircle className="w-4 h-4" /> Open Course & Videos
                </button>
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ManageCourse;