// import React, {useEffect, useMemo, useState } from 'react';
// import {
//   Users,
//   Search,
//   Filter,
//   Download,
//   UserPlus,
//   Eye,
//   Pencil,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   TrendingUp,
//   GraduationCap,
  
// } from 'lucide-react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase';


// const Students = () => {
//   const [students, setStudents] = useState([]);
//   // const [students] = useState(seedStudents);
//   const [courseFilter, setCourseFilter] = useState('All Courses');
//   const [statusFilter, setStatusFilter] = useState('All Status');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'students'));

//         const studentList = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setStudents(studentList);

//         console.log('Students from Firebase:', studentList);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };

//     fetchStudents();
//   }, []);
//   const filteredStudents = useMemo(() => {
//     return students.filter((student) => {
//       const haystack = `${student.name} ${student.email} ${student.course}`.toLowerCase();
//       const matchesSearch = haystack.includes(searchTerm.toLowerCase());
//       const matchesCourse = courseFilter === 'All Courses' || student.course === courseFilter;
//       const matchesStatus = statusFilter === 'All Status' || student.status === statusFilter;
//       return matchesSearch && matchesCourse && matchesStatus;
//     });
//   }, [courseFilter, searchTerm, statusFilter, students]);

//   const stats = [
//     { label: 'Total Students', value: '500', change: '+8%', icon: Users },
//     { label: 'Active Students', value: '350', change: '+9%', icon: UserPlus },
//     { label: 'New Students', value: '50', change: '+14%', icon: TrendingUp },
//     { label: 'Inactive Students', value: '100', change: '-2%', icon: Users },
//   ];

//   return (
//     <div className="text-slate-900">
//       <div className="space-y-6">
//         <div className="flex items-end justify-between flex-wrap gap-4">
//           <div>
//             <h2 className="text-[28px] font-extrabold tracking-tight">Student Management</h2>
//             <p className="text-sm text-slate-500 mt-1">Manage learners, enrollment progress, and learning activity.</p>
//           </div>
//           <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow">
//             <UserPlus className="w-4 h-4" /> Add Student
//           </button>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {stats.map((stat) => {
//             const StatIcon = stat.icon;
//             return (
//               <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-4">
//                 <div className="flex items-center justify-between mb-5">
//                   <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">
//                     <StatIcon className="w-[19px] h-[19px] text-purple-650" />
//                   </div>
//                   <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
//                     <TrendingUp className="w-[11px] h-[11px]" /> {stat.change}
//                   </div>
//                 </div>
//                 <div className="text-[13px] text-slate-500 font-semibold mb-1">{stat.label}</div>
//                 <div className="text-2xl font-extrabold tracking-tight">{stat.value}</div>
//               </div>
//             );
//           })}
//         </div>

//         <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">
//           <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
//             <div className="flex flex-wrap gap-3">
//               <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
//                 <option value="All Courses">All Courses</option>
//                 <option value="React JS Mastery">React JS Mastery</option>
//                 <option value="UI/UX Design">UI/UX Design</option>
//                 <option value="Data Science 101">Data Science 101</option>
//                 <option value="Node.js Backend">Node.js Backend</option>
//               </select>

//               <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
//                 <option value="All Status">All Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>

//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                 <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]" placeholder="Search students" />
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
//                 <Filter className="w-4 h-4" /> Filter
//               </button>
//               <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50">
//                 <Download className="w-4 h-4" /> Export
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full text-left">
//               <thead>
//                 <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">
//                   <th className="pb-3 px-2">Student ID</th>
//                   <th className="pb-3 px-2">Student Name</th>
//                   <th className="pb-3 px-2">Email</th>
//                   <th className="pb-3 px-2">Course</th>
//                   <th className="pb-3 px-2">Progress</th>
//                   <th className="pb-3 px-2">Status</th>
//                   <th className="pb-3 px-2">Last Login</th>
//                   <th className="pb-3 px-2 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map((student) => (
//                   <tr key={student.id} className="border-t border-slate-100">
//                     <td className="py-4 px-2 text-[13px] font-bold text-slate-700">{student.id}</td>
//                     <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">{student.name}</td>
//                     <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{student.email}</td>
//                     <td className="py-4 px-2 text-[13px] font-bold text-slate-600">{student.course}</td>
//                     <td className="py-4 px-2 text-[13px] font-bold text-slate-600">{student.progress}</td>
//                     <td className="py-4 px-2">
//                       <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-slate-500'}`}>{student.status}</span>
//                     </td>
//                     <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">{student.lastLogin}</td>
//                     <td className="py-4 px-2 text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Eye className="w-4 h-4" /></button>
//                         <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-650 transition"><Pencil className="w-4 h-4" /></button>
//                         <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
//             <div className="text-[12px] font-semibold text-slate-500">Showing 1 to {Math.min(filteredStudents.length, 4)} of {filteredStudents.length} entries</div>
//             <div className="flex items-center gap-2">
//               <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</span></button>
//               <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-650 text-white">1</button>
//               <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">2</button>
//               <button type="button" className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold border border-slate-200 bg-white text-slate-600">...</button>
//               <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"><span className="inline-flex items-center gap-1">Next <ChevronRight className="w-4 h-4" /></span></button>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Students;



              // NEW CODE  
import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  X,
  Save,
} from "lucide-react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [students, setStudents] = useState([]);

  const [courseFilter, setCourseFilter] =
    useState("All Courses");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] = useState(true);

  // View popup
  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [showViewPopup, setShowViewPopup] =
    useState(false);

  // Edit popup
  const [editStudent, setEditStudent] =
    useState(null);

  const [showEditPopup, setShowEditPopup] =
    useState(false);

  const [saving, setSaving] = useState(false);

  // =========================
  // FETCH STUDENTS
  // =========================

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "students")
      );

      const studentList = snapshot.docs.map(
        (studentDoc) => ({
          id: studentDoc.id,
          ...studentDoc.data(),
        })
      );

      setStudents(studentList);

      console.log(
        "Students from Firebase:",
        studentList
      );
    } catch (error) {
      console.error(
        "Error fetching students:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER STUDENTS
  // =========================

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const studentName =
        student.studentName ||
        student.name ||
        "";

      const email =
        student.email || "";

      const course =
        student.course || "";

      const status =
        student.status || "Active";

      const haystack =
        `${studentName} ${email} ${course}`.toLowerCase();

      const matchesSearch =
        haystack.includes(
          searchTerm.toLowerCase()
        );

      const matchesCourse =
        courseFilter === "All Courses" ||
        course === courseFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        status === statusFilter;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesStatus
      );
    });
  }, [
    courseFilter,
    searchTerm,
    statusFilter,
    students,
  ]);

  // =========================
  // STATS
  // =========================

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) =>
      (student.status || "Active") === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) =>
      student.status === "Inactive"
  ).length;

  const newStudents = students.filter(
    (student) => {
      const joiningDate =
        student.joiningDate;

      if (!joiningDate) {
        return false;
      }

      const joining = new Date(joiningDate);
      const today = new Date();

      const difference =
        today - joining;

      const days =
        difference /
        (1000 * 60 * 60 * 24);

      return days <= 30;
    }
  ).length;

  const stats = [
    {
      label: "Total Students",
      value: totalStudents,
      change: "",
      icon: Users,
    },
    {
      label: "Active Students",
      value: activeStudents,
      change: "",
      icon: UserPlus,
    },
    {
      label: "New Students",
      value: newStudents,
      change: "",
      icon: TrendingUp,
    },
    {
      label: "Inactive Students",
      value: inactiveStudents,
      change: "",
      icon: Users,
    },
  ];

  // =========================
  // VIEW STUDENT
  // =========================

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewPopup(true);
  };

  // =========================
  // EDIT STUDENT
  // =========================

  const handleEdit = (student) => {
    setEditStudent({
      ...student,
      studentName:
        student.studentName ||
        student.name ||
        "",
    });

    setShowEditPopup(true);
  };

  // =========================
  // HANDLE EDIT INPUT
  // =========================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE STUDENT
  // =========================

  const updateStudent = async () => {
    if (!editStudent) {
      return;
    }

    try {
      setSaving(true);

      const studentRef = doc(
        db,
        "students",
        editStudent.id
      );

      await updateDoc(studentRef, {
        studentName:
          editStudent.studentName || "",

        email:
          editStudent.email || "",

        phone:
          editStudent.phone || "",

        dateOfBirth:
          editStudent.dateOfBirth || "",

        gender:
          editStudent.gender || "",

        course:
          editStudent.course || "",

        joiningDate:
          editStudent.joiningDate || "",

        address:
          editStudent.address || "",

        status:
          editStudent.status || "Active",

        progress:
          editStudent.progress || "",

        lastLogin:
          editStudent.lastLogin || "",
      });

      // Update UI immediately
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editStudent.id
            ? {
                ...student,
                ...editStudent,
                name:
                  editStudent.studentName ||
                  editStudent.name ||
                  "",
              }
            : student
        )
      );

      alert(
        "Student updated successfully!"
      );

      setShowEditPopup(false);
      setEditStudent(null);
    } catch (error) {
      console.error(
        "Update student error:",
        error
      );

      alert(
        "Failed to update student."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE STUDENT
  // =========================

  const handleDelete = async (student) => {
    const studentName =
      student.studentName ||
      student.name ||
      "this student";

    const confirmDelete =
      window.confirm(
        `Are you sure you want to delete ${studentName}?`
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDoc(
        doc(db, "students", student.id)
      );

      setStudents((prev) =>
        prev.filter(
          (item) =>
            item.id !== student.id
        )
      );

      alert(
        "Student deleted successfully!"
      );

      console.log(
        "Deleted student:",
        student.id
      );
    } catch (error) {
      console.error(
        "Delete student error:",
        error
      );

      alert(
        "Failed to delete student."
      );
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="text-slate-900">

      <div className="space-y-6">

        {/* =========================
            HEADER
        ========================= */}

        <div className="flex items-end justify-between flex-wrap gap-4">

          <div>

            <h2 className="text-[28px] font-extrabold tracking-tight">
              Student Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage learners, enrollment
              progress, and learning activity.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/addStudent")
            }
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow"
          >
            <UserPlus className="w-4 h-4" />

            Add Student
          </button>

        </div>

        {/* =========================
            STATS
        ========================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {stats.map((stat) => {

            const StatIcon =
              stat.icon;

            return (

              <div
                key={stat.label}
                className="bg-white border border-slate-100 rounded-2xl p-4"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">

                    <StatIcon className="w-[19px] h-[19px] text-purple-600" />

                  </div>

                  {stat.change && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">

                      <TrendingUp className="w-[11px] h-[11px]" />

                      {stat.change}

                    </div>
                  )}

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

        {/* =========================
            STUDENT TABLE SECTION
        ========================= */}

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">

          {/* FILTERS */}

          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

            <div className="flex flex-wrap gap-3">

              {/* COURSE */}

              <select
                value={courseFilter}
                onChange={(e) =>
                  setCourseFilter(
                    e.target.value
                  )
                }
                className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
              >

                <option value="All Courses">
                  All Courses
                </option>

                <option value="Full Stack Development">
                  Full Stack Development
                </option>

                <option value="Python Full Stack">
                  Python Full Stack
                </option>

                <option value="Java Developer Bootcamp">
                  Java Developer Bootcamp
                </option>

                <option value="AI & Machine Learning">
                  AI & Machine Learning
                </option>

                <option value="Cloud & DevOps Essentials">
                  Cloud & DevOps Essentials
                </option>

                <option value="Data Science & Analytics">
                  Data Science & Analytics
                </option>


              </select>

              {/* STATUS */}

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
              >

                <option value="All Status">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

              {/* SEARCH */}

              <div className="relative">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]"
                  placeholder="Search students"
                />

              </div>

            </div>

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

          {/* =========================
              TABLE
          ========================= */}

          <div className="overflow-x-auto">

            <table className="min-w-full text-left">

              <thead>

                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">

                  <th className="pb-3 px-2">
                    Student ID
                  </th>

                  <th className="pb-3 px-2">
                    Student Name
                  </th>

                  <th className="pb-3 px-2">
                    Email
                  </th>

                  <th className="pb-3 px-2">
                    Course
                  </th>

                  <th className="pb-3 px-2">
                    Progress
                  </th>

                  <th className="pb-3 px-2">
                    Status
                  </th>

                  <th className="pb-3 px-2">
                    Last Login
                  </th>

                  <th className="pb-3 px-2 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="py-12 text-center text-sm text-slate-500"
                    >
                      Loading students...
                    </td>

                  </tr>

                ) : filteredStudents.length > 0 ? (

                  filteredStudents.map(
                    (student) => {

                      const studentName =
                        student.studentName ||
                        student.name ||
                        "-";

                      const status =
                        student.status ||
                        "Active";

                      return (

                        <tr
                          key={student.id}
                          className="border-t border-slate-100 hover:bg-purple-50/30"
                        >

                          {/* ID */}

                          <td className="py-4 px-2 text-[13px] font-bold text-slate-700">

                            {student.id}

                          </td>

                          {/* NAME */}

                          <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">

                            {studentName}

                          </td>

                          {/* EMAIL */}

                          <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">

                            {student.email || "-"}

                          </td>

                          {/* COURSE */}

                          <td className="py-4 px-2 text-[13px] font-bold text-slate-600">

                            {student.course || "-"}

                          </td>

                          {/* PROGRESS */}

                          <td className="py-4 px-2 text-[13px] font-bold text-slate-600">

                            {student.progress || "-"}

                          </td>

                          {/* STATUS */}

                          <td className="py-4 px-2">

                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                status === "Active"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-rose-50 text-rose-500"
                              }`}
                            >

                              {status}

                            </span>

                          </td>

                          {/* LAST LOGIN */}

                          <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">

                            {student.lastLogin ||
                              "-"}

                          </td>

                          {/* ACTIONS */}

                          <td className="py-4 px-2 text-right">

                            <div className="flex items-center justify-end gap-2">

                              {/* VIEW */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleView(
                                    student
                                  )
                                }
                                title="View Student"
                                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 transition"
                              >

                                <Eye className="w-4 h-4" />

                              </button>

                              {/* EDIT */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    student
                                  )
                                }
                                title="Edit Student"
                                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 transition"
                              >

                                <Pencil className="w-4 h-4" />

                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    student
                                  )
                                }
                                title="Delete Student"
                                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"
                              >

                                <Trash2 className="w-4 h-4" />

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
                      colSpan="8"
                      className="py-12 text-center text-sm text-slate-500"
                    >
                      No students found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* =========================
              PAGINATION
          ========================= */}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">

            <div className="text-[12px] font-semibold text-slate-500">

              Showing{" "}
              {filteredStudents.length}{" "}
              of{" "}
              {students.length}{" "}
              students

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

      {/* =====================================================
          VIEW STUDENT POPUP
      ===================================================== */}

      {showViewPopup &&
        selectedStudent && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Student Details
                  </h2>

                  <p className="text-sm text-slate-500">
                    Complete student information
                  </p>

                </div>

                <button
                  onClick={() => {
                    setShowViewPopup(false);
                    setSelectedStudent(null);
                  }}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >

                  <X className="h-5 w-5" />

                </button>

              </div>

              {/* DETAILS */}

              <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">

                <Detail
                  label="Student ID"
                  value={
                    selectedStudent.id
                  }
                />

                <Detail
                  label="Student Name"
                  value={
                    selectedStudent.studentName ||
                    selectedStudent.name ||
                    "-"
                  }
                />

                <Detail
                  label="Email"
                  value={
                    selectedStudent.email ||
                    "-"
                  }
                />

                <Detail
                  label="Phone"
                  value={
                    selectedStudent.phone ||
                    "-"
                  }
                />

                <Detail
                  label="Date of Birth"
                  value={
                    selectedStudent.dateOfBirth ||
                    "-"
                  }
                />

                <Detail
                  label="Gender"
                  value={
                    selectedStudent.gender ||
                    "-"
                  }
                />

                <Detail
                  label="Course"
                  value={
                    selectedStudent.course ||
                    "-"
                  }
                />

                <Detail
                  label="Joining Date"
                  value={
                    selectedStudent.joiningDate ||
                    "-"
                  }
                />

                <Detail
                  label="Progress"
                  value={
                    selectedStudent.progress ||
                    "-"
                  }
                />

                <Detail
                  label="Last Login"
                  value={
                    selectedStudent.lastLogin ||
                    "-"
                  }
                />

                <Detail
                  label="Address"
                  value={
                    selectedStudent.address ||
                    "-"
                  }
                />

                <div>

                  <p className="text-xs font-semibold text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedStudent.status ===
                      "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {selectedStudent.status ||
                      "Active"}

                  </span>

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex justify-end border-t border-slate-100 px-6 py-4">

                <button
                  onClick={() => {
                    setShowViewPopup(false);
                    setSelectedStudent(null);
                  }}
                  className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        )}

      {/* =====================================================
          EDIT STUDENT POPUP
      ===================================================== */}

      {showEditPopup &&
        editStudent && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Edit Student
                  </h2>

                  <p className="text-sm text-slate-500">
                    Update student information
                  </p>

                </div>

                <button
                  onClick={() => {
                    setShowEditPopup(false);
                    setEditStudent(null);
                  }}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >

                  <X className="h-5 w-5" />

                </button>

              </div>

              {/* FORM */}

              <div className="grid max-h-[70vh] grid-cols-1 gap-4 overflow-y-auto p-6 md:grid-cols-2">

                {/* NAME */}

                <InputField
                  label="Student Name"
                  name="studentName"
                  value={
                    editStudent.studentName
                  }
                  onChange={
                    handleEditChange
                  }
                />

                {/* EMAIL */}

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={
                    editStudent.email
                  }
                  onChange={
                    handleEditChange
                  }
                />

                {/* PHONE */}

                <InputField
                  label="Phone"
                  name="phone"
                  value={
                    editStudent.phone
                  }
                  onChange={
                    handleEditChange
                  }
                />

                {/* DOB */}

                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={
                    editStudent.dateOfBirth
                  }
                  onChange={
                    handleEditChange
                  }
                />

                {/* GENDER */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={
                      editStudent.gender ||
                      ""
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* COURSE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course
                  </label>

                  <select
                    name="course"
                    value={
                      editStudent.course ||
                      ""
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >

                    <option value="">
                      Select Course
                    </option>

                    <option value="Java Full Stack">
                      Java Full Stack
                    </option>

                    <option value="Python Full Stack">
                      Python Full Stack
                    </option>

                    <option value="React JS">
                      React JS
                    </option>

                    <option value="UI/UX Design">
                      UI/UX Design
                    </option>

                    <option value="Data Science">
                      Data Science
                    </option>

                  </select>

                </div>

                {/* JOINING DATE */}

                <InputField
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  value={
                    editStudent.joiningDate
                  }
                  onChange={
                    handleEditChange
                  }
                />

                {/* STATUS */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      editStudent.status ||
                      "Active"
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

                {/* PROGRESS */}

                <InputField
                  label="Progress"
                  name="progress"
                  value={
                    editStudent.progress
                  }
                  onChange={
                    handleEditChange
                  }
                />

                {/* LAST LOGIN */}

                <InputField
                  label="Last Login"
                  name="lastLogin"
                  value={
                    editStudent.lastLogin
                  }
                  onChange={
                    handleEditChange
                  }
                />

                {/* ADDRESS */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={
                      editStudent.address ||
                      ""
                    }
                    onChange={
                      handleEditChange
                    }
                    rows="3"
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">

                <button
                  onClick={() => {
                    setShowEditPopup(false);
                    setEditStudent(null);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  onClick={updateStudent}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-50"
                >

                  <Save className="w-4 h-4" />

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </div>

            </div>

          </div>

        )}

    </div>
  );
};

// =====================================================
// DETAIL COMPONENT
// =====================================================

const Detail = ({ label, value }) => {
  return (
    <div>

      <p className="text-xs font-semibold text-slate-400">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-700">
        {value}
      </p>

    </div>
  );
};

// =====================================================
// INPUT COMPONENT
// =====================================================

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
      />

    </div>
  );
};

export default Students;