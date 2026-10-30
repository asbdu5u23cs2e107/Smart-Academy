// import React, { useState } from "react";

// const AddTrainer = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     qualification: "",
//     specialization: "",
//     experience: "",
//     joiningDate: "",
//     status: "Active",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Trainer Data:", formData);

//     alert("Trainer added successfully!");

//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       qualification: "",
//       specialization: "",
//       experience: "",
//       joiningDate: "",
//       status: "Active",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f7ff] p-6 sm:p-8">

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-slate-900">
//           Add Trainer
//         </h1>

//         <p className="mt-2 text-slate-500">
//           Add a new trainer to the training management system.
//         </p>
//       </div>

//       {/* Form Card */}
//       <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">

//         <form onSubmit={handleSubmit}>

//           {/* Personal Information */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-slate-900 mb-5">
//               Personal Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Trainer Name
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter trainer name"
//                   required
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="trainer@example.com"
//                   required
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Phone Number
//                 </label>

//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter phone number"
//                   required
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//                 />
//               </div>

//               {/* Qualification */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Qualification
//                 </label>

//                 <input
//                   type="text"
//                   name="qualification"
//                   value={formData.qualification}
//                   onChange={handleChange}
//                   placeholder="B.Tech / MCA / M.Sc"
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//                 />
//               </div>

//             </div>
//           </div>

//           {/* Professional Information */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-slate-900 mb-5">
//               Professional Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//               {/* Specialization */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Specialization
//                 </label>

//                 <input
//                   type="text"
//                   name="specialization"
//                   value={formData.specialization}
//                   onChange={handleChange}
//                   placeholder="Java / React / Python"
//                   required
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//                 />
//               </div>

//               {/* Experience */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Experience
//                 </label>

//                 <input
//                   type="text"
//                   name="experience"
//                   value={formData.experience}
//                   onChange={handleChange}
//                   placeholder="3 Years"
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//                 />
//               </div>

//               {/* Joining Date */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Joining Date
//                 </label>

//                 <input
//                   type="date"
//                   name="joiningDate"
//                   value={formData.joiningDate}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//                 />
//               </div>

//               {/* Status */}
//               <div>
//                 <label className="block text-sm text-black font-medium text-slate-700 mb-2">
//                   Status
//                 </label>

//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>

//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-200 pt-6">

//             <button
//               type="button"
//               onClick={() =>
//                 setFormData({
//                   name: "",
//                   email: "",
//                   phone: "",
//                   qualification: "",
//                   specialization: "",
//                   experience: "",
//                   joiningDate: "",
//                   status: "Active",
//                 })
//               }
//               className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
//             >
//               Clear
//             </button>

//             <button
//               type="submit"
//               className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-sm"
//             >
//               Add Trainer
//             </button>

//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTrainer;


         //NEW CODE//


         import React, { useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  qualification: "",
  specialization: "",
  experience: "",
  joiningDate: "",
  status: "Active",
};

const AddTrainer = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [saving, setSaving] = useState(false);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SAVE TRAINER TO FIREBASE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Firebase trainers collection
      await addDoc(collection(db, "trainers"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        qualification: formData.qualification.trim(),
        specialization: formData.specialization.trim(),
        experience: formData.experience.trim(),
        joiningDate: formData.joiningDate,
        status: formData.status,

        // Trainer Management table fields
        coursesAssigned: 0,
        students: 0,
        lastLogin: "Never",

        // Firebase server time
        createdAt: serverTimestamp(),
      });

      alert("Trainer added successfully!");

      // Clear form after successful save
      setFormData(initialFormData);

    } catch (error) {
      console.error("Error adding trainer:", error);

      alert(
        "Failed to add trainer. Please check Firebase connection."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // CLEAR FORM
  // =========================
  const handleClear = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-6 sm:p-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Add Trainer
        </h1>

        <p className="mt-2 text-slate-500">
          Add a new trainer to the training management system.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">

        <form onSubmit={handleSubmit}>

          {/* =========================
              PERSONAL INFORMATION
          ========================= */}
          <div className="mb-8">

            <h2 className="text-lg font-semibold text-slate-900 mb-5">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Trainer Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter trainer name"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="trainer@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Qualification
                </label>

                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="B.Tech / MCA / M.Sc"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

            </div>
          </div>

          {/* =========================
              PROFESSIONAL INFORMATION
          ========================= */}
          <div className="mb-8">

            <h2 className="text-lg font-semibold text-slate-900 mb-5">
              Professional Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Specialization
                </label>

                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="Java / React / Python"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="3 Years"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Joining Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Joining Date
                </label>

                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* =========================
              BUTTONS
          ========================= */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-200 pt-6">

            {/* CLEAR */}
            <button
              type="button"
              onClick={handleClear}
              disabled={saving}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-50"
            >
              Clear
            </button>

            {/* ADD TRAINER */}
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : "Add Trainer"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTrainer;