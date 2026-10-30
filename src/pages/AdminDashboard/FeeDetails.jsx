// import React, { useMemo, useState } from "react";
// import {
//   Search,
//   IndianRupee,
//   CheckCircle2,
//   Clock3,
//   AlertCircle,
//   Plus,
//   Eye,
// } from "lucide-react";

// const FeeDetails = () => {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");

//   const [students, setStudents] = useState([
//     {
//       id: 1,
//       name: "Arun Kumar",
//       email: "arun@gmail.com",
//       course: "Java Full Stack",
//       totalFee: 45000,
//       paid: 45000,
//       due: 0,
//       status: "Paid",
//     },
//     {
//       id: 2,
//       name: "Priya S",
//       email: "priya@gmail.com",
//       course: "React JS",
//       totalFee: 30000,
//       paid: 20000,
//       due: 10000,
//       status: "Partial",
//     },
//     {
//       id: 3,
//       name: "Karthik R",
//       email: "karthik@gmail.com",
//       course: "Python Full Stack",
//       totalFee: 40000,
//       paid: 15000,
//       due: 25000,
//       status: "Due",
//     },
//     {
//       id: 4,
//       name: "Rahul M",
//       email: "rahul@gmail.com",
//       course: "Java Full Stack",
//       totalFee: 45000,
//       paid: 30000,
//       due: 15000,
//       status: "Partial",
//     },
//     {
//       id: 5,
//       name: "Divya S",
//       email: "divya@gmail.com",
//       course: "React JS",
//       totalFee: 30000,
//       paid: 30000,
//       due: 0,
//       status: "Paid",
//     },
//   ]);

//   const filteredStudents = useMemo(() => {
//     return students.filter((student) => {
//       const matchesSearch =
//         `${student.name} ${student.email} ${student.course}`
//           .toLowerCase()
//           .includes(search.toLowerCase());

//       const matchesFilter =
//         filter === "All" || student.status === filter;

//       return matchesSearch && matchesFilter;
//     });
//   }, [students, search, filter]);

//   const totalFees = students.reduce(
//     (sum, student) => sum + student.totalFee,
//     0
//   );

//   const totalPaid = students.reduce(
//     (sum, student) => sum + student.paid,
//     0
//   );

//   const totalDue = students.reduce(
//     (sum, student) => sum + student.due,
//     0
//   );

//   const paidStudents = students.filter(
//     (student) => student.status === "Paid"
//   ).length;

//   const addPayment = (id) => {
//     const amount = window.prompt("Enter payment amount:");

//     if (!amount) return;

//     const payment = Number(amount);

//     if (Number.isNaN(payment) || payment <= 0) {
//       alert("Please enter a valid amount.");
//       return;
//     }

//     setStudents((prev) =>
//       prev.map((student) => {
//         if (student.id !== id) return student;

//         const newPaid = Math.min(
//           student.paid + payment,
//           student.totalFee
//         );

//         const newDue = student.totalFee - newPaid;

//         let newStatus = "Due";

//         if (newDue === 0) {
//           newStatus = "Paid";
//         } else if (newPaid > 0) {
//           newStatus = "Partial";
//         }

//         return {
//           ...student,
//           paid: newPaid,
//           due: newDue,
//           status: newStatus,
//         };
//       })
//     );
//   };

//   const formatCurrency = (amount) => {
//     return `₹${amount.toLocaleString("en-IN")}`;
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f7ff] px-5 py-6 sm:px-8">

//       {/* HEADER */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">
//             Fee Details
//           </h1>

//           <p className="mt-1 text-sm text-slate-500">
//             Manage student fees and payment details
//           </p>
//         </div>

//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

//         {/* TOTAL FEES */}
//         <div className="rounded-2xl bg-white p-5 shadow-sm">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-sm font-medium text-slate-500">
//                 Total Fees
//               </p>

//               <p className="mt-1 text-2xl font-bold text-purple-600">
//                 {formatCurrency(totalFees)}
//               </p>
//             </div>

//             <div className="rounded-xl bg-purple-100 p-3">
//               <IndianRupee className="h-6 w-6 text-purple-600" />
//             </div>

//           </div>

//         </div>

//         {/* PAID */}
//         <div className="rounded-2xl bg-white p-5 shadow-sm">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-sm font-medium text-slate-500">
//                 Amount Collected
//               </p>

//               <p className="mt-1 text-2xl font-bold text-green-600">
//                 {formatCurrency(totalPaid)}
//               </p>
//             </div>

//             <div className="rounded-xl bg-green-100 p-3">
//               <CheckCircle2 className="h-6 w-6 text-green-600" />
//             </div>

//           </div>

//         </div>

//         {/* DUE */}
//         <div className="rounded-2xl bg-white p-5 shadow-sm">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-sm font-medium text-slate-500">
//                 Total Due
//               </p>

//               <p className="mt-1 text-2xl font-bold text-red-600">
//                 {formatCurrency(totalDue)}
//               </p>
//             </div>

//             <div className="rounded-xl bg-red-100 p-3">
//               <AlertCircle className="h-6 w-6 text-red-600" />
//             </div>

//           </div>

//         </div>

//         {/* PAID STUDENTS */}
//         <div className="rounded-2xl bg-white p-5 shadow-sm">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-sm font-medium text-slate-500">
//                 Fully Paid Students
//               </p>

//               <p className="mt-1 text-2xl font-bold text-blue-600">
//                 {paidStudents}
//               </p>
//             </div>

//             <div className="rounded-xl bg-blue-100 p-3">
//               <CheckCircle2 className="h-6 w-6 text-blue-600" />
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* SEARCH + FILTER */}
//       <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">

//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//           {/* SEARCH */}
//           <div className="relative w-full lg:max-w-md">

//             <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

//             <input
//               type="text"
//               placeholder="Search student or course..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//             />

//           </div>

//           {/* FILTER */}
//           <div className="flex flex-wrap gap-2">

//             {["All", "Paid", "Partial", "Due"].map((item) => (

//               <button
//                 key={item}
//                 onClick={() => setFilter(item)}
//                 className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
//                   filter === item
//                     ? "bg-purple-600 text-white"
//                     : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-600"
//                 }`}
//               >
//                 {item}
//               </button>

//             ))}

//           </div>

//         </div>

//       </div>

//       {/* TABLE */}
//       <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

//         <div className="border-b border-slate-200 px-6 py-5">

//           <h2 className="text-lg font-bold text-slate-900">
//             Student Fee Records
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             View and manage payment information
//           </p>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full min-w-[1050px]">

//             <thead>

//               <tr className="border-b border-slate-200 bg-slate-50">

//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   #
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Student
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Course
//                 </th>

//                 <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
//                   Total Fee
//                 </th>

//                 <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
//                   Paid
//                 </th>

//                 <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
//                   Due
//                 </th>

//                 <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500">
//                   Action
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
//                           {student.name.charAt(0)}
//                         </div>

//                         <div>
//                           <p className="text-sm font-semibold text-slate-900">
//                             {student.name}
//                           </p>

//                           <p className="text-xs text-slate-500">
//                             {student.email}
//                           </p>
//                         </div>
//                       </div>

//                     </td>

//                     {/* COURSE */}
//                     <td className="px-6 py-4 text-sm text-slate-600">
//                       {student.course}
//                     </td>

//                     {/* TOTAL */}
//                     <td className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
//                       {formatCurrency(student.totalFee)}
//                     </td>

//                     {/* PAID */}
//                     <td className="px-6 py-4 text-right text-sm font-semibold text-green-600">
//                       {formatCurrency(student.paid)}
//                     </td>

//                     {/* DUE */}
//                     <td className="px-6 py-4 text-right text-sm font-semibold text-red-600">
//                       {formatCurrency(student.due)}
//                     </td>

//                     {/* STATUS */}
//                     <td className="px-6 py-4 text-center">

//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                           student.status === "Paid"
//                             ? "bg-green-100 text-green-700"
//                             : student.status === "Partial"
//                             ? "bg-orange-100 text-orange-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {student.status}
//                       </span>

//                     </td>

//                     {/* ACTION */}
//                     <td className="px-6 py-4">

//                       <div className="flex justify-center gap-2">

//                         <button
//                           title="View Details"
//                           className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </button>

//                         {student.due > 0 && (
//                           <button
//                             onClick={() => addPayment(student.id)}
//                             title="Add Payment"
//                             className="flex items-center gap-1 rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-600 transition hover:bg-purple-100"
//                           >
//                             <Plus className="h-4 w-4" />
//                             Payment
//                           </button>
//                         )}

//                       </div>

//                     </td>

//                   </tr>

//                 ))
//               ) : (

//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="px-6 py-12 text-center text-sm text-slate-500"
//                   >
//                     No fee records found
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

// export default FeeDetails;



              //NEW FEEDATILS CODE??

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Plus,
  Eye,
  RefreshCw,
} from "lucide-react";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../../firebase";

const FeeDetails = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // COURSE DEFAULT FEES
  // --------------------------------------------------

  const courseFees = {
    'Full Stack Development': 30000,
    'Python Full Stack': 25000,
    'Java Developer Bootcamp': 28000,
    'AI & Machine Learning': 32000,
    'Cloud & DevOps Essentials': 22000,
    'Data Science & Analytics': 26000,
  };

  // --------------------------------------------------
  // GET DEFAULT COURSE FEE
  // --------------------------------------------------

  const getCourseFee = (course) => {
    return courseFees[course] || 0;
  };

  // --------------------------------------------------
  // FORMAT CURRENCY
  // --------------------------------------------------

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // --------------------------------------------------
  // FETCH STUDENTS FROM FIREBASE
  // --------------------------------------------------

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const querySnapshot = await getDocs(
        collection(db, "students")
      );

      const studentList = [];

      querySnapshot.forEach((document) => {
        const data = document.data();

        // ----------------------------------------------
        // TOTAL FEE
        // ----------------------------------------------

        const totalFee =
          Number(data.totalFee) ||
          getCourseFee(data.course);

        // ----------------------------------------------
        // PAID AMOUNT
        // ----------------------------------------------

        const paid = Number(data.paid) || 0;

        // ----------------------------------------------
        // DUE AMOUNT
        // ----------------------------------------------

        const due = Math.max(totalFee - paid, 0);

        // ----------------------------------------------
        // STATUS
        // ----------------------------------------------

        let status = "Due";

        if (due === 0 && totalFee > 0) {
          status = "Paid";
        } else if (paid > 0) {
          status = "Partial";
        }

        studentList.push({
          id: document.id,

          name: data.studentName || "Unknown Student",

          email: data.email || "No email",

          phone: data.phone || "",

          course: data.course || "Not Assigned",

          totalFee,

          paid,

          due,

          status,

          paymentHistory: data.paymentHistory || [],
        });
      });

      setStudents(studentList);
    } catch (err) {
      console.error("Error fetching students:", err);

      setError(
        "Unable to load student fee details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // LOAD DATA
  // --------------------------------------------------

  useEffect(() => {
    fetchStudents();
  }, []);

  // --------------------------------------------------
  // SEARCH + FILTER
  // --------------------------------------------------

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        `${student.name} ${student.email} ${student.course}`
          .toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "All" ||
        student.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [students, search, filter]);

  // --------------------------------------------------
  // TOTAL FEES
  // --------------------------------------------------

  const totalFees = useMemo(() => {
    return students.reduce(
      (sum, student) => sum + Number(student.totalFee || 0),
      0
    );
  }, [students]);

  // --------------------------------------------------
  // TOTAL PAID
  // --------------------------------------------------

  const totalPaid = useMemo(() => {
    return students.reduce(
      (sum, student) => sum + Number(student.paid || 0),
      0
    );
  }, [students]);

  // --------------------------------------------------
  // TOTAL DUE
  // --------------------------------------------------

  const totalDue = useMemo(() => {
    return students.reduce(
      (sum, student) => sum + Number(student.due || 0),
      0
    );
  }, [students]);

  // --------------------------------------------------
  // FULLY PAID STUDENTS
  // --------------------------------------------------

  const paidStudents = useMemo(() => {
    return students.filter(
      (student) => student.status === "Paid"
    ).length;
  }, [students]);

  // --------------------------------------------------
  // ADD PAYMENT
  // --------------------------------------------------

  const addPayment = async (student) => {
    const amount = window.prompt(
      `Enter payment amount for ${student.name}:`
    );

    if (!amount) {
      return;
    }

    const payment = Number(amount);

    // ----------------------------------------------
    // VALIDATION
    // ----------------------------------------------

    if (
      Number.isNaN(payment) ||
      payment <= 0
    ) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (payment > student.due) {
      alert(
        `Maximum payable amount is ${formatCurrency(
          student.due
        )}.`
      );
      return;
    }

    try {
      const newPaid = student.paid + payment;

      const newDue =
        student.totalFee - newPaid;

      let newStatus = "Due";

      if (newDue === 0) {
        newStatus = "Paid";
      } else if (newPaid > 0) {
        newStatus = "Partial";
      }

      // ----------------------------------------------
      // PAYMENT OBJECT
      // ----------------------------------------------

      const paymentRecord = {
        amount: payment,
        date: new Date().toISOString(),
      };

      // ----------------------------------------------
      // FIREBASE DOCUMENT
      // ----------------------------------------------

      const studentRef = doc(
        db,
        "students",
        student.id
      );

      await updateDoc(studentRef, {
        paid: newPaid,
        due: newDue,
        status: newStatus,

        paymentHistory: arrayUnion(
          paymentRecord
        ),
      });

      // ----------------------------------------------
      // UPDATE UI
      // ----------------------------------------------

      setStudents((prev) =>
        prev.map((item) => {
          if (item.id !== student.id) {
            return item;
          }

          return {
            ...item,

            paid: newPaid,

            due: newDue,

            status: newStatus,

            paymentHistory: [
              ...(item.paymentHistory || []),
              paymentRecord,
            ],
          };
        })
      );

      alert(
        `Payment of ${formatCurrency(
          payment
        )} added successfully.`
      );
    } catch (err) {
      console.error(
        "Error adding payment:",
        err
      );

      alert(
        "Failed to add payment. Please try again."
      );
    }
  };

  // --------------------------------------------------
  // VIEW DETAILS
  // --------------------------------------------------

  const viewDetails = (student) => {
    const paymentHistory =
      student.paymentHistory || [];

    let message = `
Student: ${student.name}

Email: ${student.email}

Course: ${student.course}

Total Fee: ${formatCurrency(student.totalFee)}

Paid: ${formatCurrency(student.paid)}

Due: ${formatCurrency(student.due)}

Status: ${student.status}
`;

    if (paymentHistory.length > 0) {
      message += "\nPayment History:\n\n";

      paymentHistory.forEach(
        (payment, index) => {
          message += `${index + 1}. ${formatCurrency(
            payment.amount
          )} - ${new Date(
            payment.date
          ).toLocaleDateString("en-IN")}\n`;
        }
      );
    } else {
      message +=
        "\nPayment History:\nNo payments recorded.";
    }

    alert(message);
  };

  // --------------------------------------------------
  // REFRESH
  // --------------------------------------------------

  const handleRefresh = () => {
    fetchStudents();
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7ff] px-5 py-6 sm:px-8">

        <div className="flex min-h-[400px] items-center justify-center">

          <div className="text-center">

            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-purple-600" />

            <p className="mt-3 text-sm font-medium text-slate-500">
              Loading fee details...
            </p>

          </div>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // MAIN UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-5 py-6 sm:px-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-900">
            Fee Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage student fees and payment details
          </p>

        </div>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>

      </div>

      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

          <AlertCircle className="h-5 w-5" />

          <span>{error}</span>

        </div>
      )}

      {/* ==================================================
          SUMMARY CARDS
      ================================================== */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL FEES */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Fees
              </p>

              <p className="mt-1 text-2xl font-bold text-purple-600">
                {formatCurrency(totalFees)}
              </p>

            </div>

            <div className="rounded-xl bg-purple-100 p-3">

              <IndianRupee className="h-6 w-6 text-purple-600" />

            </div>

          </div>

        </div>

        {/* AMOUNT COLLECTED */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Amount Collected
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {formatCurrency(totalPaid)}
              </p>

            </div>

            <div className="rounded-xl bg-green-100 p-3">

              <CheckCircle2 className="h-6 w-6 text-green-600" />

            </div>

          </div>

        </div>

        {/* TOTAL DUE */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Due
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {formatCurrency(totalDue)}
              </p>

            </div>

            <div className="rounded-xl bg-red-100 p-3">

              <AlertCircle className="h-6 w-6 text-red-600" />

            </div>

          </div>

        </div>

        {/* FULLY PAID */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Fully Paid Students
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-600">
                {paidStudents}
              </p>

            </div>

            <div className="rounded-xl bg-blue-100 p-3">

              <CheckCircle2 className="h-6 w-6 text-blue-600" />

            </div>

          </div>

        </div>

      </div>

      {/* ==================================================
          SEARCH + FILTER
      ================================================== */}

      <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}

          <div className="relative w-full lg:max-w-md">

            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search student or course..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

          </div>

          {/* FILTER */}

          <div className="flex flex-wrap gap-2">

            {[
              "All",
              "Paid",
              "Partial",
              "Due",
            ].map((item) => (

              <button
                key={item}
                onClick={() =>
                  setFilter(item)
                }
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  filter === item
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </div>

      {/* ==================================================
          TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="border-b border-slate-200 px-6 py-5">

          <h2 className="text-lg font-bold text-slate-900">
            Student Fee Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage payment information
          </p>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px]">

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

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Total Fee
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Paid
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Due
                </th>

                <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map(
                  (student, index) => (

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

                            {student.name
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <div>

                            <p className="text-sm font-semibold text-slate-900">
                              {student.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {student.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* COURSE */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {student.course}
                      </td>

                      {/* TOTAL */}

                      <td className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                        {formatCurrency(
                          student.totalFee
                        )}
                      </td>

                      {/* PAID */}

                      <td className="px-6 py-4 text-right text-sm font-semibold text-green-600">
                        {formatCurrency(
                          student.paid
                        )}
                      </td>

                      {/* DUE */}

                      <td className="px-6 py-4 text-right text-sm font-semibold text-red-600">
                        {formatCurrency(
                          student.due
                        )}
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4 text-center">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            student.status ===
                            "Paid"
                              ? "bg-green-100 text-green-700"
                              : student.status ===
                                "Partial"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.status}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-2">

                          {/* VIEW */}

                          <button
                            onClick={() =>
                              viewDetails(
                                student
                              )
                            }
                            title="View Details"
                            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* PAYMENT */}

                          {student.due > 0 && (

                            <button
                              onClick={() =>
                                addPayment(
                                  student
                                )
                              }
                              title="Add Payment"
                              className="flex items-center gap-1 rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-600 transition hover:bg-purple-100"
                            >

                              <Plus className="h-4 w-4" />

                              Payment

                            </button>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <AlertCircle className="h-10 w-10 text-slate-300" />

                      <p className="mt-3 text-sm font-semibold text-slate-600">
                        No fee records found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search or filter.
                      </p>

                    </div>

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

export default FeeDetails;