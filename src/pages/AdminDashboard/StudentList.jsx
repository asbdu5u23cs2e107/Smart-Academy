// import React, { useState, useEffect } from "react";
// import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../../firebase";
// const StudentList = () => {
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
  

//   // const [students, setStudents] = useState([
//   //   {
//   //     id: 1,
//   //     name: "Arun Kumar",
//   //     email: "arun@gmail.com",
//   //     phone: "9876543210",
//   //     course: "Java Full Stack",
//   //     status: "Active",
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "Priya S",
//   //     email: "priya@gmail.com",
//   //     phone: "9876543211",
//   //     course: "React JS",
//   //     status: "Active",
//   //   },
//   //   {
//   //     id: 3,
//   //     name: "Karthik R",
//   //     email: "karthik@gmail.com",
//   //     phone: "9876543212",
//   //     course: "Python Full Stack",
//   //     status: "Inactive",
//   //   },
//   // ]);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [showViewPopup, setShowViewPopup] = useState(false);
//   useEffect(() => {
//   const fetchStudents = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "students"));

//       const studentData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setStudents(studentData);
//       console.log("Firebase Students:", studentData);

//     } catch (error) {
//       console.error("Error fetching students:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchStudents();
// }, []);

//   const filteredStudents = students.filter((student) =>
//     `${student.name} ${student.email} ${student.phone} ${student.course}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // const deleteStudent = async (id) => {
//   //   const confirmDelete = window.confirm(
//   //     "Are you sure you want to delete this student?"
//   //   );

//   //   if (confirmDelete) {
//   //     setStudents((prev) =>
//   //       prev.filter((student) => student.id !== id)
//   //     );
//   //   }
//   // };
//   const deleteStudent = async (id) => {
//   const confirmDelete = window.confirm(
//     "Are you sure you want to delete this student?"
//   );

//   if (confirmDelete) {
//     try {
//       await deleteDoc(doc(db, "students", id));

//       setStudents((prev) =>
//         prev.filter((student) => student.id !== id)
//       );

//       console.log("Student deleted from Firebase");

//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   }
// };

//   return (
//     <div className="min-h-screen bg-[#f8f7ff] px-5 py-6 sm:px-8">

//       {/* HEADER */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">
//             Student List
//           </h1>

//           <p className="mt-1 text-sm text-slate-500">
//             Manage all registered students
//           </p>
//         </div>

//         <button
//           onClick={() => navigate("/admin/addStudent")}
//           className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-purple-700"
//         >
//           <Plus className="h-5 w-5" />
//           Add Student
//         </button>

//       </div>

//       {/* SEARCH */}
//       <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">

//         <div className="relative max-w-md">

//           <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

//           <input
//             type="text"
//             placeholder="Search student..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//           />

//         </div>

//       </div>

//       {/* TABLE */}
//       <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

//         <div className="overflow-x-auto">

//           <table className="w-full min-w-[900px]">

//             <thead>
//               <tr className="border-b border-slate-200 bg-slate-50">

//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   #
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Student
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Phone
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Course
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500">
//                   Actions
//                 </th>

//               </tr>
//             </thead>

//             <tbody>

//               {filteredStudents.length > 0 ? (
//                 filteredStudents.map((student, index) => (

//                   <tr
//                     key={student.id}
//                     className="border-b border-slate-100 transition hover:bg-purple-50/40"
//                   >

//                     <td className="px-6 py-4 text-sm text-slate-500">
//                       {index + 1}
//                     </td>

//                     {/* STUDENT */}
//                     <td className="px-6 py-4">

//                       <div className="flex items-center gap-3">

//                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-600">
//                           {/* {student.name.charAt(0)} */} {(student.studentName || student.name)?.charAt(0)}
//                         </div>

//                         <div>
//                           <p className="text-sm font-semibold text-slate-900">
//                             {student.studentName || student.name}
//                           </p>

//                           <p className="text-xs text-slate-500">
//                             {student.email}
//                           </p>
//                         </div>

//                       </div>

//                     </td>

//                     {/* PHONE */}
//                     <td className="px-6 py-4 text-sm text-slate-600">
//                       {student.phone}
//                     </td>

//                     {/* COURSE */}
//                     <td className="px-6 py-4 text-sm font-medium text-slate-700">
//                       {student.course}
//                     </td>

//                     {/* STATUS */}
//                     <td className="px-6 py-4">

//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                           student.status === "Active"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {student.status}
//                       </span>

//                     </td>

//                     {/* ACTIONS */}
//                     <td className="px-6 py-4">

//                       <div className="flex items-center justify-center gap-2">

//                         {/* <button
//                           title="View"
//                           onClick={() => navigate(`/admin/viewStudent/${student.id}`)}
//                           className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </button> */}
//                         <button 
//                             title="View"
//                             onClick={() => {setSelectedStudent(student);
//                             setShowViewPopup(true);
//                           }}
//                            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
//                           >
//                          <Eye className="h-4 w-4" />
//                           </button>

//                         <button
//                           title="Edit"
//                           className="rounded-lg bg-purple-50 p-2 text-purple-600 transition hover:bg-purple-100"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>

//                         <button
//                           title="Delete"
//                           onClick={() => deleteStudent(student.id)}
//                           className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>

//                       </div>

//                     </td>

//                   </tr>

//                 ))
//               ) : (

//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="px-6 py-12 text-center text-sm text-slate-500"
//                   >
//                     No students found
//                   </td>
//                 </tr>

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>
              
//     </div>
//   );
// };

// export default StudentList;






// RECREATE CODE
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const StudentList = () => {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [search, setSearch] = useState("");

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  // View popup
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);

  // Edit popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const [saving, setSaving] = useState(false);

  // =========================
  // FETCH STUDENTS FROM FIREBASE
  // =========================

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "students")
        );

        const studentData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStudents(studentData);

        console.log("Firebase Students:", studentData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // =========================
  // SEARCH
  // =========================

  const filteredStudents = students.filter((student) =>
    `
      ${student.studentName || student.name || ""}
      ${student.email || ""}
      ${student.phone || ""}
      ${student.course || ""}
    `
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // DELETE STUDENT
  // =========================

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDoc(doc(db, "students", id));

      setStudents((prev) =>
        prev.filter((student) => student.id !== id)
      );

      console.log("Student deleted from Firebase");

      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);

      alert("Failed to delete student.");
    }
  };

  // =========================
  // OPEN VIEW POPUP
  // =========================

  const openViewPopup = (student) => {
    setSelectedStudent(student);
    setShowViewPopup(true);
  };

  // =========================
  // OPEN EDIT POPUP
  // =========================

  const openEditPopup = (student) => {
    setEditStudent({
      ...student,
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

  // const updateStudent = async () => {
  //   if (!editStudent) {
  //     return;
  //   }

  //   try {
  //     setSaving(true);

  //      // Selected course-க்கு fixed fee
  //   const newTotalFee = Number(
  //     courseFees[editStudent.course] || 0
  //   );

  //     const studentRef = doc(
  //       db,
  //       "students",
  //       editStudent.id
  //     );

  //     await updateDoc(studentRef, {
  //       studentName: editStudent.studentName || "",
  //       email: editStudent.email || "",
  //       phone: editStudent.phone || "",
  //       dateOfBirth: editStudent.dateOfBirth || "",
  //       gender: editStudent.gender || "",
  //       course: editStudent.course || "",
  //       totalFee: newTotalFee,
  //       paid: paid,
  //       due: newDue,
  //       status: newStatus,
  //       joiningDate: editStudent.joiningDate || "",
  //       address: editStudent.address || "",
  //       // status: editStudent.status || "Active",
  //     });

  //     // Update UI immediately
  //     setStudents((prev) =>
  //       prev.map((student) =>
  //         student.id === editStudent.id
  //           ?{...student, ...editStudent, totalFee: newTotalFee,
  //             paid: paid,
  //             due: newDue,
  //             status: newStatus,}
  //           : student

  //       )
  //     );

  //     console.log("Student updated successfully");

  //     alert("Student updated successfully!");

  //     setShowEditPopup(false);
  //     setEditStudent(null);
  //   } catch (error) {
  //     console.error("Update error:", error);

  //     alert("Failed to update student.");
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const updateStudent = async () => {
  if (!editStudent) {
    return;
  }

  try {
    setSaving(true);

    // Selected course-க்கு fixed fee
    const newTotalFee = Number(
      (editStudent.totalfee) || 0
    );

    // Already paid amount
    const paid = Number(editStudent.paid || 0);

    // Calculate new due
    const newDue = Math.max(
      newTotalFee - paid,
      0
    );

    // Calculate status
    let newStatus = "Due";

    if (newTotalFee > 0 && newDue === 0) {
      newStatus = "Paid";
    } else if (paid > 0) {
      newStatus = "Partial";
    }

    // Firebase student document
    const studentRef = doc(
      db,
      "students",
      editStudent.id
    );

    await updateDoc(studentRef, {
      studentName: editStudent.studentName || "",
      email: editStudent.email || "",
      phone: editStudent.phone || "",
      dateOfBirth: editStudent.dateOfBirth || "",
      gender: editStudent.gender || "",

      // Course
      course: editStudent.course || "",

      // Fee details
      totalFee: newTotalFee,
      paid: paid,
      due: newDue,
      status: newStatus,

      joiningDate: editStudent.joiningDate || "",
      address: editStudent.address || "",
    });

    // Update UI
    setStudents((prev) =>
      prev.map((student) =>
        student.id === editStudent.id
          ? {
              ...student,
              ...editStudent,
              totalFee: newTotalFee,
              paid: paid,
              due: newDue,
              status: newStatus,
            }
          : student
      )
    );

    setEditStudent(null);
    // console.log("Student updated successfully");

    alert("Student updated successfully!");

    setShowEditPopup(false);
    setEditStudent(null);

  } catch (error) {
    console.error("Update error:", error);

    alert(
      `Failed to update student.\n\n${error.message}`
    );

  } finally {
    setSaving(false);
  }
};

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-5 py-6 sm:px-8">

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Student List
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all registered students
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/addStudent")}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-purple-700"
        >
          <Plus className="h-5 w-5" />
          Add Student
        </button>

      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">

        <div className="relative max-w-md">

          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>

      </div>

      {/* =========================
          TABLE
      ========================= */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  #
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Course
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    Loading students...
                  </td>
                </tr>

              ) : filteredStudents.length > 0 ? (

                filteredStudents.map((student, index) => (

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

                          {(student.studentName ||
                            student.name ||
                            "?")
                            .charAt(0)
                            .toUpperCase()}

                        </div>

                        <div>

                          <p className="text-sm font-semibold text-slate-900">
                            {student.studentName ||
                              student.name ||
                              "-"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {student.email || "-"}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* PHONE */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {student.phone || "-"}
                    </td>

                    {/* COURSE */}

                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {student.course || "-"}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status || "-"}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <div className="flex items-center justify-center gap-2">

                        {/* VIEW */}

                        <button
                          title="View"
                          onClick={() =>
                            openViewPopup(student)
                          }
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {/* EDIT */}

                        <button
                          title="Edit"
                          onClick={() =>
                            openEditPopup(student)
                          }
                          className="rounded-lg bg-purple-50 p-2 text-purple-600 transition hover:bg-purple-100"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        {/* DELETE */}

                        <button
                          title="Delete"
                          onClick={() =>
                            deleteStudent(student.id)
                          }
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="6"
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


      {/* =====================================================
          VIEW STUDENT POPUP
      ===================================================== */}

      {showViewPopup && selectedStudent && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* VIEW HEADER */}

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

            {/* VIEW DETAILS */}

            <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Student Name
                </p>

                <p className="text-sm font-bold text-slate-900">
                  {selectedStudent.studentName ||
                    selectedStudent.name ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Email
                </p>

                <p className="text-sm text-slate-700">
                  {selectedStudent.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Phone
                </p>

                <p className="text-sm text-slate-700">
                  {selectedStudent.phone || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Date of Birth
                </p>

                <p className="text-sm text-slate-700">
                  {selectedStudent.dateOfBirth || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Gender
                </p>

                <p className="text-sm text-slate-700">
                  {selectedStudent.gender || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Course
                </p>

                <p className="text-sm text-slate-700">
                  {selectedStudent.course || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Joining Date
                </p>

                <p className="text-sm text-slate-700">
                  {selectedStudent.joiningDate || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Address
                </p>

                <p className="text-sm text-slate-700">
                  {selectedStudent.address || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Status
                </p>

                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedStudent.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedStudent.status || "Active"}
                </span>
              </div>

            </div>

            {/* VIEW FOOTER */}

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

      {showEditPopup && editStudent && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

            {/* EDIT HEADER */}

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

            {/* EDIT FORM */}

            <div className="grid max-h-[70vh] grid-cols-1 gap-4 overflow-y-auto p-6 md:grid-cols-2">

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Student Name
                </label>

                <input
                  type="text"
                  name="studentName"
                  value={editStudent.studentName || ""}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editStudent.email || ""}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={editStudent.phone || ""}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />

              </div>

              {/* DATE OF BIRTH */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={editStudent.dateOfBirth || ""}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />

              </div>

              {/* GENDER */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Gender
                </label>

                <select
                  name="gender"
                  value={editStudent.gender || ""}
                  onChange={handleEditChange}
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
                  value={editStudent.course || ""}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >

                  <option value="">
                    Select Course
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
                  <option value = "Data Science & Analytics">
                    Data Science & Analytics
                  </option>

                </select>

              </div>

              {/* JOINING DATE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Joining Date
                </label>

                <input
                  type="date"
                  name="joiningDate"
                  value={editStudent.joiningDate || ""}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />

              </div>

              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={editStudent.status || "Active"}
                  onChange={handleEditChange}
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

              {/* ADDRESS */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Address
                </label>

                <textarea
                  name="address"
                  value={editStudent.address || ""}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-black outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />

              </div>

            </div>

            {/* EDIT FOOTER */}

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

                <Save className="h-4 w-4" />

                {saving ? "Saving..." : "Save Changes"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default StudentList;