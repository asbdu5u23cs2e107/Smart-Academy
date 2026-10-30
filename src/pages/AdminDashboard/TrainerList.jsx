import React, { useMemo, useState, useEffect } from "react";
import { db } from "../../firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const TrainerList = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");


  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  const loadTrainers = async () => {
   try {
      setLoading(true);

    const snapshot = await getDocs(
      collection(db, "trainers")
    );

    const trainerData = snapshot.docs.map((trainerDoc) => ({
      id: trainerDoc.id,
      ...trainerDoc.data(),
    }));
    console.log("Firebase Trainers:", trainerData)

    setTrainers(trainerData);
  } catch (error) {
    console.error("Error loading trainers:", error);
    alert("Failed to load trainers.");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
    loadTrainers();
  }, []);

  

  

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) => {
      const value = search.toLowerCase();

      return (
        trainer.name.toLowerCase().includes(value) ||
        trainer.email.toLowerCase().includes(value) ||
        trainer.specialization.toLowerCase().includes(value) ||
        trainer.id.toLowerCase().includes(value)
      );
    });
  }, [search, trainers]);

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this trainer?"
  );

  if (!confirmed) return;

  try {
    await deleteDoc(doc(db, "trainers", id));

    setTrainers((prev) =>
      prev.filter((trainer) => trainer.id !== id)
    );

    alert("Trainer deleted successfully.");
  } catch (error) {
    console.error("Error deleting trainer:", error);
    alert("Failed to delete trainer.");
  }
};

  const handleView = (trainer) => {
    alert(
      `Trainer Details\n\nName: ${trainer.name}\nID: ${trainer.id}\nEmail: ${trainer.email}\nSpecialization: ${trainer.specialization}\nExperience: ${trainer.experience}`
    );
  };

  const handleEdit = (trainer) => {
    alert(`Edit Trainer: ${trainer.name}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-6 sm:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Trainer List
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all trainers and their information.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/AddTrainer")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-sm"
        >
          <UserPlus className="w-5 h-5" />
          Add Trainer
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Trainers
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {trainers.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Trainers
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {trainers.filter(
              (trainer) => trainer.status === "Active"
            ).length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Inactive Trainers
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {trainers.filter(
              (trainer) => trainer.status === "Inactive"
            ).length}
          </h2>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">

        <div className="relative max-w-xl">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search trainer, email, specialization or ID..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Trainer
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Trainer ID
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Specialization
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Experience
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Courses
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredTrainers.length > 0 ? (
                filteredTrainers.map((trainer) => (

                  <tr
                    key={trainer.id}
                    className="border-b border-slate-100 hover:bg-purple-50/40 transition"
                  >

                    {/* Trainer */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                          {trainer.name.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {trainer.name}
                          </p>

                          <p className="text-sm text-slate-500">
                            {trainer.email}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {trainer.phone}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* ID */}
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 text-sm font-semibold">
                        {trainer.id}
                      </span>
                    </td>

                    {/* Specialization */}
                    <td className="px-6 py-5 text-sm text-slate-700">
                      {trainer.specialization}
                    </td>

                    {/* Experience */}
                    <td className="px-6 py-5 text-sm text-slate-700">
                      {trainer.experience}
                    </td>

                    {/* Courses */}
                    <td className="px-6 py-5">

                      <span className="inline-flex items-center justify-center min-w-9 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm">
                        {trainer.courses}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          trainer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {trainer.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-2">

                        <button
                          onClick={() => handleView(trainer)}
                          title="View"
                          className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleEdit(trainer)}
                          title="Edit"
                          className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(trainer.id)}
                          title="Delete"
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No trainers found.
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

export default TrainerList;