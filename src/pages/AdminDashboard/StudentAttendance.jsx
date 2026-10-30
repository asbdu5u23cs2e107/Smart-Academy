import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

import {
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";

const Attendance = () => {
  // ==============================
  // STATES
  // ==============================

  const [search, setSearch] = useState("");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH STUDENTS
  // ==============================

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "students")
      );

      const studentData = snapshot.docs.map((studentDoc) => ({
        id: studentDoc.id,
        ...studentDoc.data(),
        status: "Not Marked",
      }));

      setStudents(studentData);

      console.log("Students loaded:", studentData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  // ==============================
  // FETCH ATTENDANCE
  // ==============================

  useEffect(() => {
    if (students.length > 0) {
      fetchAttendance();
    }
  }, [selectedDate]);

  const fetchAttendance = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "attendance")
      );

      const attendanceData = snapshot.docs.map(
        (attendanceDoc) => ({
          id: attendanceDoc.id,
          ...attendanceDoc.data(),
        })
      );

      setStudents((previousStudents) =>
        previousStudents.map((student) => {
          const attendance = attendanceData.find(
            (item) =>
              item.studentId === student.id &&
              item.date === selectedDate
          );

          return {
            ...student,
            status: attendance
              ? attendance.status
              : "Not Marked",
          };
        })
      );

      console.log("Attendance loaded:", attendanceData);
    } catch (error) {
      console.error(
        "Error fetching attendance:",
        error
      );
    }
  };

  // ==============================
  // SEARCH STUDENTS
  // ==============================

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const studentName =
        student.studentName ||
        student.name ||
        "";

      const course =
        student.course || "";

      return `${studentName} ${course}`
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [students, search]);

  // ==============================
  // UPDATE ATTENDANCE
  // ==============================

  const updateAttendance = async (
    studentId,
    status
  ) => {
    try {
      const student = students.find(
        (item) => item.id === studentId
      );

      if (!student) {
        console.error("Student not found");
        return;
      }

      // Unique document ID
      const attendanceId =
        `${selectedDate}_${studentId}`;

      // Save attendance in Firebase
      await setDoc(
        doc(
          db,
          "attendance",
          attendanceId
        ),
        {
          studentId: studentId,

          studentName:
            student.studentName ||
            student.name ||
            "",

          course:
            student.course || "",

          date: selectedDate,

          status: status,

          updatedAt: new Date().toISOString(),
        }
      );

      // Update UI
      setStudents((previousStudents) =>
        previousStudents.map((item) =>
          item.id === studentId
            ? {
                ...item,
                status: status,
              }
            : item
        )
      );

      console.log(
        "Attendance saved successfully:",
        {
          studentId,
          studentName:
            student.studentName ||
            student.name ||
            "",
          course: student.course || "",
          date: selectedDate,
          status,
        }
      );
    } catch (error) {
      console.error(
        "Error saving attendance:",
        error
      );
    }
  };

  // ==============================
  // SUMMARY COUNTS
  // ==============================

  const presentCount = students.filter(
    (student) =>
      student.status === "Present"
  ).length;

  const absentCount = students.filter(
    (student) =>
      student.status === "Absent"
  ).length;

  const lateCount = students.filter(
    (student) =>
      student.status === "Late"
  ).length;

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7ff] px-5 py-6 sm:px-8">

        <h1 className="text-2xl font-bold text-slate-900">
          Attendance Details
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage and track student attendance
        </p>

        <div className="mt-6 rounded-2xl bg-white p-10 text-center shadow-sm">

          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>

          <p className="text-sm text-slate-500">
            Loading students...
          </p>

        </div>

      </div>
    );
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-5 py-6 sm:px-8">

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-900">
          Attendance Details
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage and track student attendance
        </p>

      </div>

      {/* DATE + SEARCH */}

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

          {/* DATE */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Attendance Date
            </label>

            <div className="relative">

              <CalendarDays className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-500" />

              <input
                type="date"
                value={selectedDate}
                onChange={(event) =>
                  setSelectedDate(
                    event.target.value
                  )
                }
                className="rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />

            </div>

          </div>

          {/* SEARCH */}

          <div className="w-full lg:max-w-md">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Search Student
            </label>

            <div className="relative">

              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search by name or course..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />

            </div>

          </div>

        </div>

      </div>

      {/* SUMMARY CARDS */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* PRESENT */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Present
              </p>

              <p className="mt-1 text-3xl font-bold text-green-600">
                {presentCount}
              </p>

            </div>

            <div className="rounded-xl bg-green-100 p-3">

              <CheckCircle2 className="h-6 w-6 text-green-600" />

            </div>

          </div>

        </div>

        {/* ABSENT */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Absent
              </p>

              <p className="mt-1 text-3xl font-bold text-red-600">
                {absentCount}
              </p>

            </div>

            <div className="rounded-xl bg-red-100 p-3">

              <XCircle className="h-6 w-6 text-red-600" />

            </div>

          </div>

        </div>

        {/* LATE */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Late
              </p>

              <p className="mt-1 text-3xl font-bold text-orange-500">
                {lateCount}
              </p>

            </div>

            <div className="rounded-xl bg-orange-100 p-3">

              <Clock3 className="h-6 w-6 text-orange-500" />

            </div>

          </div>

        </div>

      </div>

      {/* ATTENDANCE TABLE */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <h2 className="text-lg font-bold text-slate-900">
            Student Attendance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {selectedDate}
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  #
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Course
                </th>

                <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500">
                  Current Status
                </th>

                <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500">
                  Mark Attendance
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map(
                  (student, index) => {

                    const studentName =
                      student.studentName ||
                      student.name ||
                      "-";

                    return (

                      <tr
                        key={student.id}
                        className="border-b border-slate-100 transition hover:bg-purple-50/40"
                      >

                        {/* NUMBER */}

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {index + 1}
                        </td>

                        {/* STUDENT */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-600">

                              {studentName
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            <p className="text-sm font-semibold text-slate-900">
                              {studentName}
                            </p>

                          </div>

                        </td>

                        {/* COURSE */}

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {student.course || "-"}
                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4 text-center">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              student.status ===
                              "Present"
                                ? "bg-green-100 text-green-700"
                                : student.status ===
                                  "Absent"
                                ? "bg-red-100 text-red-700"
                                : student.status ===
                                  "Late"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {student.status}
                          </span>

                        </td>

                        {/* BUTTONS */}

                        <td className="px-6 py-4">

                          <div className="flex justify-center gap-2">

                            {/* PRESENT */}

                            <button
                              onClick={() =>
                                updateAttendance(
                                  student.id,
                                  "Present"
                                )
                              }
                              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                student.status ===
                                "Present"
                                  ? "bg-green-600 text-white"
                                  : "bg-green-50 text-green-700 hover:bg-green-100"
                              }`}
                            >
                              Present
                            </button>

                            {/* ABSENT */}

                            <button
                              onClick={() =>
                                updateAttendance(
                                  student.id,
                                  "Absent"
                                )
                              }
                              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                student.status ===
                                "Absent"
                                  ? "bg-red-600 text-white"
                                  : "bg-red-50 text-red-700 hover:bg-red-100"
                              }`}
                            >
                              Absent
                            </button>

                            {/* LATE */}

                            <button
                              onClick={() =>
                                updateAttendance(
                                  student.id,
                                  "Late"
                                )
                              }
                              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                student.status ===
                                "Late"
                                  ? "bg-orange-500 text-white"
                                  : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                              }`}
                            >
                              Late
                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No students found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Attendance;