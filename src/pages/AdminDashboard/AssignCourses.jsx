import React, { useEffect, useState } from "react";
import {
  UserPlus,
  BookOpen,
  CheckCircle,
  Search,
  Save,
} from "lucide-react";

import { db } from "../../firebase";

import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const AssignCourses = () => {
  const [search, setSearch] = useState("");

  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [loadingTrainers, setLoadingTrainers] = useState(true);
  const [saving, setSaving] = useState(false);

  // =====================================================
  // COURSES
  // =====================================================

  const courses = [
    "Full Stack Java Development",
    "React JS Development",
    "Python Development",
    "Java Programming",
    "SQL & Database",
    "Spring Boot",
    "Web Development",
    "Data Structures & Algorithms",
  ];

  // =====================================================
  // LOAD TRAINERS FROM FIREBASE
  // =====================================================

  const loadTrainers = async () => {
    try {
      setLoadingTrainers(true);

      const snapshot = await getDocs(
        collection(db, "trainers")
      );

      const trainerData = snapshot.docs.map((trainerDoc) => ({
        id: trainerDoc.id,
        ...trainerDoc.data(),
      }));

      console.log("Firebase Trainers:", trainerData);

      setTrainers(trainerData);
    } catch (error) {
      console.error("Error loading trainers:", error);
      alert("Unable to load trainers from Firebase.");
    } finally {
      setLoadingTrainers(false);
    }
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  // =====================================================
  // SEARCH TRAINERS
  // =====================================================

  const filteredTrainers = trainers.filter((trainer) => {
    const value = search.toLowerCase();

    return (
      (trainer.name || "").toLowerCase().includes(value) ||
      (trainer.email || "").toLowerCase().includes(value) ||
      (trainer.specialization || "").toLowerCase().includes(value)
    );
  });

  // =====================================================
  // SELECT / UNSELECT COURSE
  // =====================================================

  const toggleCourse = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((item) => item !== course)
        : [...prev, course]
    );
  };

  // =====================================================
  // ASSIGN COURSES
  // =====================================================

  const handleAssign = async () => {
    if (!selectedTrainer) {
      alert("Please select a trainer.");
      return;
    }

    if (selectedCourses.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    try {
      setSaving(true);

      // Firebase collection:
      // courseAssignments

      await addDoc(collection(db, "courseAssignments"), {
        trainerId: selectedTrainer.id,
        trainerName: selectedTrainer.name || "",
        trainerEmail: selectedTrainer.email || "",
        specialization: selectedTrainer.specialization || "",

        courses: selectedCourses,

        courseCount: selectedCourses.length,

        status: "Assigned",

        assignedAt: serverTimestamp(),
      });

      alert(
        `${selectedCourses.length} course(s) assigned successfully to ${selectedTrainer.name}`
      );

      // Clear selected courses
      setSelectedCourses([]);

      console.log("Course Assignment Saved:", {
        trainerId: selectedTrainer.id,
        trainerName: selectedTrainer.name,
        courses: selectedCourses,
      });
    } catch (error) {
      console.error("Error assigning courses:", error);

      alert(
        "Failed to assign courses. Please check Firebase connection."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-5 sm:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Assign Courses
        </h1>

        <p className="mt-2 text-slate-500">
          Assign courses to trainers and manage their teaching
          responsibilities.
        </p>

      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ===================================================
            TRAINER SECTION
        =================================================== */}

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
              <UserPlus className="h-5 w-5 text-purple-600" />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Select Trainer
              </h2>

              <p className="text-sm text-slate-500">
                Choose a trainer
              </p>

            </div>

          </div>

          {/* SEARCH */}

          <div className="relative mb-5">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search trainer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

          </div>

          {/* TRAINER LIST */}

          <div className="space-y-3">

            {loadingTrainers ? (

              <div className="py-10 text-center">

                <p className="text-sm font-semibold text-slate-500">
                  Loading trainers...
                </p>

              </div>

            ) : filteredTrainers.length === 0 ? (

              <div className="py-10 text-center">

                <p className="text-sm font-semibold text-slate-500">
                  No trainers found.
                </p>

              </div>

            ) : (

              filteredTrainers.map((trainer) => {

                const selected =
                  selectedTrainer?.id === trainer.id;

                return (

                  <button
                    type="button"
                    key={trainer.id}
                    onClick={() =>
                      setSelectedTrainer(trainer)
                    }
                    className={`w-full text-left rounded-xl border p-4 transition ${
                      selected
                        ? "border-purple-500 bg-purple-50"
                        : "border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold">

                          {(trainer.name || "T")
                            .charAt(0)
                            .toUpperCase()}

                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {trainer.name || "Unknown Trainer"}
                          </p>

                          <p className="text-sm text-slate-500">
                            {trainer.email || "-"}
                          </p>

                          <p className="mt-1 text-xs text-purple-600">
                            {trainer.specialization || "-"}
                          </p>

                        </div>

                      </div>

                      {selected && (
                        <CheckCircle className="h-6 w-6 text-purple-600" />
                      )}

                    </div>

                  </button>

                );
              })

            )}

          </div>

        </div>

        {/* ===================================================
            COURSE SECTION
        =================================================== */}

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">

              <BookOpen className="h-5 w-5 text-purple-600" />

            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Select Courses
              </h2>

              <p className="text-sm text-slate-500">
                Choose courses for the trainer
              </p>

            </div>

          </div>

          {/* SELECTED TRAINER */}

          {selectedTrainer ? (

            <div className="mb-5 rounded-xl border border-purple-200 bg-purple-50 p-4">

              <p className="text-xs font-medium text-purple-600">
                SELECTED TRAINER
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {selectedTrainer.name}
              </p>

              <p className="text-sm text-slate-500">
                {selectedTrainer.specialization || "-"}
              </p>

            </div>

          ) : (

            <div className="mb-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">

              <p className="text-sm text-slate-500">
                Select a trainer first
              </p>

            </div>

          )}

          {/* COURSE LIST */}

          <div className="space-y-3">

            {courses.map((course) => {

              const selected =
                selectedCourses.includes(course);

              return (

                <button
                  type="button"
                  key={course}
                  disabled={!selectedTrainer}
                  onClick={() => toggleCourse(course)}
                  className={`w-full flex items-center justify-between rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-purple-500 bg-purple-50"
                      : "border-slate-200 hover:border-purple-300 hover:bg-purple-50"
                  } ${
                    !selectedTrainer
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">

                      <BookOpen className="h-5 w-5 text-purple-600" />

                    </div>

                    <span className="font-medium text-slate-800">
                      {course}
                    </span>

                  </div>

                  {selected && (
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  )}

                </button>

              );
            })}

          </div>

          {/* ASSIGN BUTTON */}

          <button
            type="button"
            onClick={handleAssign}
            disabled={saving}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 font-semibold text-white shadow-md transition hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >

            <Save className="h-5 w-5" />

            {saving
              ? "Assigning..."
              : "Assign Selected Courses"}

          </button>

        </div>

      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="mt-6 rounded-2xl bg-white border border-slate-200 shadow-sm p-6">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="rounded-xl bg-purple-50 p-5">

            <p className="text-sm text-slate-500">
              Selected Trainer
            </p>

            <p className="mt-1 text-xl font-bold text-purple-600">
              {selectedTrainer
                ? selectedTrainer.name
                : "None"}
            </p>

          </div>

          <div className="rounded-xl bg-green-50 p-5">

            <p className="text-sm text-slate-500">
              Selected Courses
            </p>

            <p className="mt-1 text-xl font-bold text-green-600">
              {selectedCourses.length}
            </p>

          </div>

          <div className="rounded-xl bg-blue-50 p-5">

            <p className="text-sm text-slate-500">
              Available Courses
            </p>

            <p className="mt-1 text-xl font-bold text-blue-600">
              {courses.length}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AssignCourses;