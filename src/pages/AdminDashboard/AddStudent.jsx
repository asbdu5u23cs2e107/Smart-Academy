// import React, { useState } from 'react';
// import {
//   UserPlus,
//   User,
//   Mail,
//   Phone,
//   Calendar,
//   MapPin,
//   BookOpen,
//   Users,
//   ArrowLeft,
//   Save,
//   X,
//   IndianRupee,
//   CreditCard,
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../../firebase';

// const AddStudent = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     studentName: '',
//     email: '',
//     phone: '',
//     dateOfBirth: '',
//     gender: '',
//     course: '',
//     joiningDate: '',
//     address: '',

//     // Fee Details
//     totalFee: '',
//     paidAmount: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [isSaving, setIsSaving] = useState(false);

//   // ==========================================
//   // HANDLE INPUT CHANGE
//   // ==========================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Remove error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: '',
//       }));
//     }
//   };

//   // ==========================================
//   // CALCULATE DUE AMOUNT
//   // ==========================================

//   const totalFee = Number(formData.totalFee) || 0;
//   const paidAmount = Number(formData.paidAmount) || 0;

//   const dueAmount = Math.max(totalFee - paidAmount, 0);

//   // ==========================================
//   // FEE STATUS
//   // ==========================================

//   const getFeeStatus = () => {
//     if (totalFee <= 0) {
//       return 'Due';
//     }

//     if (dueAmount === 0) {
//       return 'Paid';
//     }

//     if (paidAmount > 0) {
//       return 'Partial';
//     }

//     return 'Due';
//   };

//   const feeStatus = getFeeStatus();

//   // ==========================================
//   // FORM VALIDATION
//   // ==========================================

//   const validateForm = () => {
//     const newErrors = {};

//     // Student Name
//     if (!formData.studentName.trim()) {
//       newErrors.studentName = 'Student name is required';
//     }

//     // Email
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     }

//     // Phone
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     }

//     // Gender
//     if (!formData.gender) {
//       newErrors.gender = 'Please select gender';
//     }

//     // Course
//     if (!formData.course) {
//       newErrors.course = 'Please select a course';
//     }

//     // Total Fee
//     if (!formData.totalFee) {
//       newErrors.totalFee = 'Total fee is required';
//     } else if (Number(formData.totalFee) <= 0) {
//       newErrors.totalFee = 'Total fee must be greater than 0';
//     }

//     // Paid Amount
//     if (formData.paidAmount === '') {
//       newErrors.paidAmount = 'Paid amount is required';
//     } else if (Number(formData.paidAmount) < 0) {
//       newErrors.paidAmount = 'Paid amount cannot be negative';
//     } else if (Number(formData.paidAmount) > Number(formData.totalFee)) {
//       newErrors.paidAmount =
//         'Paid amount cannot be greater than total fee';
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // ==========================================
//   // SUBMIT FORM
//   // ==========================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSaving(true);

//     try {
//       const totalFeeValue = Number(formData.totalFee);
//       const paidAmountValue = Number(formData.paidAmount);

//       const dueAmountValue = Math.max(
//         totalFeeValue - paidAmountValue,
//         0
//       );

//       let status = 'Due';

//       if (dueAmountValue === 0) {
//         status = 'Paid';
//       } else if (paidAmountValue > 0) {
//         status = 'Partial';
//       }

//       // ==========================================
//       // SAVE STUDENT TO FIREBASE
//       // ==========================================

//       const docRef = await addDoc(collection(db, 'students'), {
//         studentName: formData.studentName.trim(),
//         email: formData.email.trim(),
//         phone: formData.phone.trim(),

//         dateOfBirth: formData.dateOfBirth,
//         gender: formData.gender,
//         course: formData.course,
//         joiningDate: formData.joiningDate,
//         address: formData.address.trim(),

//         // ========================================
//         // FEE INFORMATION
//         // ========================================

//         totalFee: totalFeeValue,
//         paidAmount: paidAmountValue,
//         dueAmount: dueAmountValue,
//         feeStatus: status,

//         // ========================================
//         // STUDENT STATUS
//         // ========================================

//         progress: '0%',
//         status: 'Active',
//         lastLogin: 'Just now',

//         // ========================================
//         // CREATED DATE
//         // ========================================

//         createdAt: new Date().toISOString(),
//       });

//       console.log('Student added successfully');
//       console.log('Document ID:', docRef.id);

//       alert('Student added successfully!');

//       navigate('/admin/students');

//     } catch (error) {
//       console.error('Error adding student:', error);

//       alert(
//         'Failed to add student. Please check Firebase connection and try again.'
//       );
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // ==========================================
//   // CANCEL
//   // ==========================================

//   const handleCancel = () => {
//     navigate('/admin/students');
//   };

//   // ==========================================
//   // CURRENCY FORMAT
//   // ==========================================

//   const formatCurrency = (amount) => {
//     return `₹${Number(amount || 0).toLocaleString('en-IN')}`;
//   };

//   return (
//     <div className="min-h-full text-slate-900">
//       <div className="space-y-6">

//         {/* ==========================================
//             HEADER
//         ========================================== */}

//         <div className="flex flex-wrap items-center justify-between gap-4">

//           <div>

//             <button
//               type="button"
//               onClick={() => navigate('/admin/students')}
//               className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-purple-600"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to Students
//             </button>

//             <h1 className="text-[28px] font-extrabold tracking-tight">
//               Add Student
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Create a new student profile and add them to a course.
//             </p>

//           </div>

//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
//             <UserPlus className="h-6 w-6 text-purple-600" />
//           </div>

//         </div>

//         {/* ==========================================
//             FORM
//         ========================================== */}

//         <form onSubmit={handleSubmit}>

//           <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">

//             {/* ==========================================
//                 STUDENT INFORMATION HEADER
//             ========================================== */}

//             <div className="border-b border-slate-100 px-6 py-5">

//               <div className="flex items-center gap-3">

//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
//                   <User className="h-5 w-5 text-purple-600" />
//                 </div>

//                 <div>

//                   <h2 className="text-lg font-bold text-slate-900">
//                     Student Information
//                   </h2>

//                   <p className="text-xs text-slate-500">
//                     Enter the student's basic details
//                   </p>

//                 </div>

//               </div>

//             </div>

//             {/* ==========================================
//                 STUDENT FIELDS
//             ========================================== */}

//             <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

//               {/* STUDENT NAME */}

//               <div>

//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Student Name{' '}
//                   <span className="text-rose-500">*</span>
//                 </label>

//                 <div className="relative">

//                   <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                   <input
//                     type="text"
//                     name="studentName"
//                     value={formData.studentName}
//                     onChange={handleChange}
//                     placeholder="Enter student name"
//                     className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
//                       errors.studentName
//                         ? 'border-rose-400'
//                         : 'border-slate-200'
//                     }`}
//                   />

//                 </div>

//                 {errors.studentName && (
//                   <p className="mt-1 text-xs text-rose-500">
//                     {errors.studentName}
//                   </p>
//                 )}

//               </div>

//               {/* EMAIL */}

//               <div>

//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Email Address{' '}
//                   <span className="text-rose-500">*</span>
//                 </label>

//                 <div className="relative">

//                   <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="student@example.com"
//                     className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
//                       errors.email
//                         ? 'border-rose-400'
//                         : 'border-slate-200'
//                     }`}
//                   />

//                 </div>

//                 {errors.email && (
//                   <p className="mt-1 text-xs text-rose-500">
//                     {errors.email}
//                   </p>
//                 )}

//               </div>

//               {/* PHONE */}

//               <div>

//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Phone Number{' '}
//                   <span className="text-rose-500">*</span>
//                 </label>

//                 <div className="relative">

//                   <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="+91 98765 43210"
//                     className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
//                       errors.phone
//                         ? 'border-rose-400'
//                         : 'border-slate-200'
//                     }`}
//                   />

//                 </div>

//                 {errors.phone && (
//                   <p className="mt-1 text-xs text-rose-500">
//                     {errors.phone}
//                   </p>
//                 )}

//               </div>

//               {/* DATE OF BIRTH */}

//               <div>

//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Date of Birth
//                 </label>

//                 <div className="relative">

//                   <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                   <input
//                     type="date"
//                     name="dateOfBirth"
//                     value={formData.dateOfBirth}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
//                   />

//                 </div>

//               </div>

//               {/* GENDER */}

//               <div>

//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Gender{' '}
//                   <span className="text-rose-500">*</span>
//                 </label>

//                 <div className="relative">

//                   <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className={`w-full appearance-none rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
//                       errors.gender
//                         ? 'border-rose-400'
//                         : 'border-slate-200'
//                     }`}
//                   >

//                     <option value="">
//                       Select gender
//                     </option>

//                     <option value="Male">
//                       Male
//                     </option>

//                     <option value="Female">
//                       Female
//                     </option>

//                     <option value="Other">
//                       Other
//                     </option>

//                   </select>

//                 </div>

//                 {errors.gender && (
//                   <p className="mt-1 text-xs text-rose-500">
//                     {errors.gender}
//                   </p>
//                 )}

//               </div>

//               {/* COURSE */}

//               <div>

//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Course{' '}
//                   <span className="text-rose-500">*</span>
//                 </label>

//                 <div className="relative">

//                   <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                   <select
//                     name="course"
//                     value={formData.course}
//                     onChange={handleChange}
//                     className={`w-full appearance-none rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
//                       errors.course
//                         ? 'border-rose-400'
//                         : 'border-slate-200'
//                     }`}
//                   >

//                     <option value="">
//                       Select course
//                     </option>

//                     <option value="Java Full Stack">
//                       Java Full Stack
//                     </option>

//                     <option value="Python Full Stack">
//                       Python Full Stack
//                     </option>

//                     <option value="React JS">
//                       React JS
//                     </option>

//                     <option value="UI/UX Design">
//                       UI/UX Design
//                     </option>

//                     <option value="Data Science">
//                       Data Science
//                     </option>

//                   </select>

//                 </div>

//                 {errors.course && (
//                   <p className="mt-1 text-xs text-rose-500">
//                     {errors.course}
//                   </p>
//                 )}

//               </div>

//               {/* JOINING DATE */}

//               <div>

//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Joining Date
//                 </label>

//                 <div className="relative">

//                   <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                   <input
//                     type="date"
//                     name="joiningDate"
//                     value={formData.joiningDate}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
//                   />

//                 </div>

//               </div>

//               {/* ADDRESS */}

//               <div className="md:col-span-2">

//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Address
//                 </label>

//                 <div className="relative">

//                   <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

//                   <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     rows="4"
//                     placeholder="Enter student's address"
//                     className="w-full resize-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* ==========================================
//                 FEE INFORMATION
//             ========================================== */}

//             <div className="border-t border-slate-100">

//               <div className="border-b border-slate-100 px-6 py-5">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">

//                     <IndianRupee className="h-5 w-5 text-green-600" />

//                   </div>

//                   <div>

//                     <h2 className="text-lg font-bold text-slate-900">
//                       Fee Information
//                     </h2>

//                     <p className="text-xs text-slate-500">
//                       Enter course fee and initial payment details
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

//                 {/* TOTAL FEE */}

//                 <div>

//                   <label className="mb-2 block text-sm font-semibold text-slate-700">

//                     Total Course Fee{' '}

//                     <span className="text-rose-500">*</span>

//                   </label>

//                   <div className="relative">

//                     <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                     <input
//                       type="number"
//                       name="totalFee"
//                       value={formData.totalFee}
//                       onChange={handleChange}
//                       min="0"
//                       placeholder="Enter total fee"
//                       className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
//                         errors.totalFee
//                           ? 'border-rose-400'
//                           : 'border-slate-200'
//                       }`}
//                     />

//                   </div>

//                   {errors.totalFee && (
//                     <p className="mt-1 text-xs text-rose-500">
//                       {errors.totalFee}
//                     </p>
//                   )}

//                 </div>

//                 {/* PAID AMOUNT */}

//                 <div>

//                   <label className="mb-2 block text-sm font-semibold text-slate-700">

//                     Initial Paid Amount{' '}

//                     <span className="text-rose-500">*</span>

//                   </label>

//                   <div className="relative">

//                     <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                     <input
//                       type="number"
//                       name="paidAmount"
//                       value={formData.paidAmount}
//                       onChange={handleChange}
//                       min="0"
//                       placeholder="Enter paid amount"
//                       className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
//                         errors.paidAmount
//                           ? 'border-rose-400'
//                           : 'border-slate-200'
//                       }`}
//                     />

//                   </div>

//                   {errors.paidAmount && (
//                     <p className="mt-1 text-xs text-rose-500">
//                       {errors.paidAmount}
//                     </p>
//                   )}

//                 </div>

//                 {/* DUE AMOUNT */}

//                 <div>

//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Due Amount
//                   </label>

//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

//                     <p className="text-lg font-bold text-red-600">
//                       {formatCurrency(dueAmount)}
//                     </p>

//                   </div>

//                 </div>

//                 {/* FEE STATUS */}

//                 <div>

//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Fee Status
//                   </label>

//                   <div
//                     className={`rounded-xl px-4 py-3 ${
//                       feeStatus === 'Paid'
//                         ? 'bg-green-50 text-green-700'
//                         : feeStatus === 'Partial'
//                         ? 'bg-orange-50 text-orange-700'
//                         : 'bg-red-50 text-red-700'
//                     }`}
//                   >

//                     <p className="font-bold">
//                       {feeStatus}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* ==========================================
//                 FEE SUMMARY
//             ========================================== */}

//             <div className="mx-6 mb-6 rounded-2xl border border-purple-100 bg-purple-50 p-5">

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

//                 <div>

//                   <p className="text-xs font-medium text-slate-500">
//                     Total Fee
//                   </p>

//                   <p className="mt-1 text-lg font-bold text-purple-600">
//                     {formatCurrency(totalFee)}
//                   </p>

//                 </div>

//                 <div>

//                   <p className="text-xs font-medium text-slate-500">
//                     Paid Amount
//                   </p>

//                   <p className="mt-1 text-lg font-bold text-green-600">
//                     {formatCurrency(paidAmount)}
//                   </p>

//                 </div>

//                 <div>

//                   <p className="text-xs font-medium text-slate-500">
//                     Due Amount
//                   </p>

//                   <p className="mt-1 text-lg font-bold text-red-600">
//                     {formatCurrency(dueAmount)}
//                   </p>

//                 </div>

//               </div>

//             </div>

//             {/* ==========================================
//                 FOOTER BUTTONS
//             ========================================== */}

//             <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">

//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 disabled={isSaving}
//                 className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
//               >

//                 <X className="h-4 w-4" />

//                 Cancel

//               </button>

//               <button
//                 type="submit"
//                 disabled={isSaving}
//                 className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
//               >

//                 <Save className="h-4 w-4" />

//                 {isSaving ? 'Saving...' : 'Save Student'}

//               </button>

//             </div>

//           </div>

//         </form>

//       </div>
//     </div>
//   );
// };

// export default AddStudent;


                // NEW CODE
import React, { useState } from 'react';
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Users,
  ArrowLeft,
  Save,
  X,
  IndianRupee,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AddStudent = () => {
  const navigate = useNavigate();

  // Course + Fee
  const courseFees = {
    'Full Stack Development': 30000,
    'Python Full Stack': 25000,
    'Java Developer Bootcamp': 28000,
    'AI & Machine Learning': 32000,
    'Cloud & DevOps Essentials': 22000,
    'Data Science & Analytics': 26000,
  };

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    course: '',
    joiningDate: '',
    address: '',

    // Fee details
    totalFee: 0,
    paid: 0,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Course select
    if (name === 'course') {
      const selectedFee = courseFees[value] || 0;

      setFormData((prev) => ({
        ...prev,
        course: value,
        totalFee: selectedFee,
        paid: 0,
      }));

      if (errors.course) {
        setErrors((prev) => ({
          ...prev,
          course: '',
        }));
      }

      return;
    }

    // Initial payment
    if (name === 'paid') {
      let payment = Number(value);

      if (payment < 0 || Number.isNaN(payment)) {
        payment = 0;
      }

      // Payment should not be greater than total fee
      if (payment > formData.totalFee) {
        payment = formData.totalFee;
      }

      setFormData((prev) => ({
        ...prev,
        paid: payment,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Calculate due
  const dueAmount = Math.max(
    Number(formData.totalFee) - Number(formData.paid),
    0
  );

  // Calculate fee status
  const getFeeStatus = () => {
    if (formData.totalFee === 0) {
      return 'Due';
    }

    if (dueAmount === 0) {
      return 'Paid';
    }

    if (formData.paid > 0) {
      return 'Partial';
    }

    return 'Due';
  };

  // Currency format
  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
    }

    if (formData.paid > formData.totalFee) {
      newErrors.paid = 'Payment cannot exceed total course fee';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Save student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    console.log('Form Data:', formData);

    try {
      const feeStatus = getFeeStatus();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const joiningDate = new Date(formData.joiningDate);
      joiningDate.setHours(0, 0, 0, 0);

      const studentStatus =
      joiningDate > today ? 'Upcoming' : 'Active';
      const docRef = await addDoc(collection(db, 'students'), {
        // Student details
        studentName: formData.studentName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        course: formData.course,
        joiningDate: formData.joiningDate,
        address: formData.address.trim(),

        // Fee details
        totalFee: Number(formData.totalFee),
        paid: Number(formData.paid),
        due: Number(dueAmount),
        feeStatus: feeStatus,

        // Existing student details
        progress: '0%',
        status: studentStatus,
        lastLogin: 'Just now',

        // Created date
        createdAt: new Date().toISOString(),
      });

      console.log('Student added successfully!');
      console.log('Document ID:', docRef.id);

      alert('Student added successfully!');

      navigate('/admin/students');
    } catch (error) {
      console.error('Error adding student:', error);

      alert('Failed to add student. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/students');
  };

  return (
    <div className="min-h-full text-slate-900">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>
            <button
              type="button"
              onClick={() => navigate('/admin/students')}
              className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-purple-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Students
            </button>

            <h1 className="text-[28px] font-extrabold tracking-tight">
              Add Student
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create a new student profile and add them to a course.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
            <UserPlus className="h-6 w-6 text-purple-600" />
          </div>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">

            {/* Form Header */}
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                  <User className="h-5 w-5 text-purple-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Student Information
                  </h2>

                  <p className="text-xs text-slate-500">
                    Enter the student's basic details
                  </p>
                </div>

              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

              {/* Student Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Student Name <span className="text-rose-500">*</span>
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
                      errors.studentName
                        ? 'border-rose-400'
                        : 'border-slate-200'
                    }`}
                  />
                </div>

                {errors.studentName && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.studentName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address <span className="text-rose-500">*</span>
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
                      errors.email
                        ? 'border-rose-400'
                        : 'border-slate-200'
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number <span className="text-rose-500">*</span>
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
                      errors.phone
                        ? 'border-rose-400'
                        : 'border-slate-200'
                    }`}
                  />
                </div>

                {errors.phone && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date of Birth
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Gender <span className="text-rose-500">*</span>
                </label>

                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full appearance-none rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
                      errors.gender
                        ? 'border-rose-400'
                        : 'border-slate-200'
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {errors.gender && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.gender}
                  </p>
                )}
              </div>

              {/* Course */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course <span className="text-rose-500">*</span>
                </label>

                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`w-full appearance-none rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
                      errors.course
                        ? 'border-rose-400'
                        : 'border-slate-200'
                    }`}
                  >
                    <option value="">Select course</option>

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

                    <option value="Data Science & Analytics ">
                     Data Science & Analytics
                    </option>
                  </select>
                </div>

                {errors.course && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.course}
                  </p>
                )}
              </div>

              {/* Joining Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Joining Date
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />
                </div>
              </div>

              {/* TOTAL COURSE FEE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Total Course Fee
                </label>

                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={formatCurrency(formData.totalFee)}
                    readOnly
                    placeholder="Select course"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none"
                  />
                </div>

                {!formData.course && (
                  <p className="mt-1 text-xs text-slate-400">
                    Select a course to see the total fee
                  </p>
                )}
              </div>

              {/* INITIAL PAYMENT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Initial Payment
                </label>

                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="number"
                    name="paid"
                    value={formData.paid}
                    onChange={handleChange}
                    min="0"
                    max={formData.totalFee}
                    placeholder="Enter initial payment"
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
                      errors.paid
                        ? 'border-rose-400'
                        : 'border-slate-200'
                    }`}
                  />
                </div>

                {errors.paid && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.paid}
                  </p>
                )}
              </div>

              {/* DUE AMOUNT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Due Amount
                </label>

                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />

                  <input
                    type="text"
                    value={formatCurrency(dueAmount)}
                    readOnly
                    className="w-full rounded-xl border border-red-100 bg-red-50 py-3 pl-10 pr-4 text-sm font-bold text-red-600 outline-none"
                  />
                </div>
              </div>

              {/* FEE STATUS */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Fee Status
                </label>

                <div
                  className={`rounded-xl border px-4 py-3 text-sm font-bold ${
                    getFeeStatus() === 'Paid'
                      ? 'border-green-200 bg-green-50 text-green-600'
                      : getFeeStatus() === 'Partial'
                      ? 'border-orange-200 bg-orange-50 text-orange-600'
                      : 'border-red-200 bg-red-50 text-red-600'
                  }`}
                >
                  {getFeeStatus()}
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Address
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter student's address"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">

              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Student'}
              </button>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddStudent;