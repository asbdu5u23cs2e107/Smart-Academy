import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  CalendarDays,
  Clock,
  MapPin,
  Loader2,
  RefreshCw,
} from "lucide-react";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

const CourseSchedule = () => {
  const [schedules, setSchedules] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingSchedule, setEditingSchedule] = useState(null);

  const [viewSchedule, setViewSchedule] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    course: "",
    trainer: "",
    date: "",
    startTime: "",
    endTime: "",
    mode: "Online",
    location: "",
    batch: "",
    status: "Scheduled",
  });

  // =========================================================
  // LOAD SCHEDULES FROM FIREBASE
  // =========================================================

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      setError("");

      const snapshot = await getDocs(
        collection(db, "courseSchedules")
      );

      const scheduleData = snapshot.docs.map((scheduleDoc) => ({
        id: scheduleDoc.id,
        ...scheduleDoc.data(),
      }));

      // Sort by date
      scheduleData.sort((a, b) => {
        return String(a.date || "").localeCompare(
          String(b.date || "")
        );
      });

      setSchedules(scheduleData);

      console.log("Firebase Schedules:", scheduleData);
    } catch (error) {
      console.error("Error loading schedules:", error);

      setError(
        "Unable to load schedules from Firebase."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setFormData({
      course: "",
      trainer: "",
      date: "",
      startTime: "",
      endTime: "",
      mode: "Online",
      location: "",
      batch: "",
      status: "Scheduled",
    });

    setEditingSchedule(null);
  };

  // =========================================================
  // OPEN ADD FORM
  // =========================================================

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  // =========================================================
  // OPEN EDIT FORM
  // =========================================================

  const openEditForm = (schedule) => {
    setEditingSchedule(schedule);

    setFormData({
      course: schedule.course || "",
      trainer: schedule.trainer || "",
      date: schedule.date || "",
      startTime: schedule.startTime || "",
      endTime: schedule.endTime || "",
      mode: schedule.mode || "Online",
      location: schedule.location || "",
      batch: schedule.batch || "",
      status: schedule.status || "Scheduled",
    });

    setShowForm(true);
  };

  // =========================================================
  // SAVE / UPDATE SCHEDULE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      // ---------------------------------------------
      // BASIC VALIDATION
      // ---------------------------------------------

      if (
        !formData.course ||
        !formData.trainer ||
        !formData.date ||
        !formData.startTime ||
        !formData.endTime ||
        !formData.location ||
        !formData.batch
      ) {
        alert("Please fill all required fields.");
        setSaving(false);
        return;
      }

      // End time should be greater than start time
      if (formData.endTime <= formData.startTime) {
        alert("End time must be greater than start time.");
        setSaving(false);
        return;
      }

      // =================================================
      // UPDATE EXISTING SCHEDULE
      // =================================================

      if (editingSchedule) {
        const scheduleRef = doc(
          db,
          "courseSchedules",
          editingSchedule.id
        );

        await updateDoc(scheduleRef, {
          ...formData,
          updatedAt: serverTimestamp(),
        });

        setSchedules((prev) =>
          prev.map((schedule) =>
            schedule.id === editingSchedule.id
              ? {
                  ...schedule,
                  ...formData,
                }
              : schedule
          )
        );

        alert("Schedule updated successfully!");
      }

      // =================================================
      // ADD NEW SCHEDULE
      // =================================================

      else {
        const docRef = await addDoc(
          collection(db, "courseSchedules"),
          {
            ...formData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }
        );

        const newSchedule = {
          id: docRef.id,
          ...formData,
        };

        setSchedules((prev) => [
          ...prev,
          newSchedule,
        ]);

        alert("Schedule added successfully!");
      }

      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error(
        "Error saving schedule:",
        error
      );

      setError(
        "Something went wrong while saving the schedule."
      );

      alert(
        "Failed to save schedule. Check Firebase configuration."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE SCHEDULE
  // =========================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      await deleteDoc(
        doc(db, "courseSchedules", id)
      );

      setSchedules((prev) =>
        prev.filter(
          (schedule) => schedule.id !== id
        )
      );

      alert("Schedule deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting schedule:",
        error
      );

      setError(
        "Unable to delete schedule."
      );

      alert(
        "Failed to delete schedule."
      );
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredSchedules = schedules.filter(
    (schedule) =>
      `${schedule.course || ""} ${
        schedule.trainer || ""
      } ${schedule.batch || ""} ${
        schedule.mode || ""
      } ${schedule.status || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // =========================================================
  // STATS
  // =========================================================

  const totalSchedules = schedules.length;

  const scheduledCount = schedules.filter(
    (schedule) =>
      schedule.status === "Scheduled"
  ).length;

  const completedCount = schedules.filter(
    (schedule) =>
      schedule.status === "Completed"
  ).length;

  const onlineCount = schedules.filter(
    (schedule) =>
      schedule.mode === "Online"
  ).length;

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-5 sm:p-8">

      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Course Schedule
          </h1>

          <p className="mt-2 text-slate-500">
            Schedule and manage course classes, trainers and batches.
          </p>
        </div>

        <div className="flex gap-2">

          <button
            onClick={loadSchedules}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw
              className={`h-5 w-5 ${
                loading ? "animate-spin" : ""
              }`}
            />

            Refresh
          </button>

          <button
            onClick={openAddForm}
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white shadow-md hover:bg-purple-700"
          >
            <Plus className="h-5 w-5" />
            Add Schedule
          </button>

        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* STAT CARDS */}
      <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Schedules
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {totalSchedules}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Scheduled
          </p>

          <h2 className="mt-2 text-3xl font-bold text-purple-600">
            {scheduledCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {completedCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Online Classes
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {onlineCount}
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

        <div className="relative max-w-xl">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search course, trainer or batch..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

        <div className="overflow-x-auto">

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">

              <div className="flex items-center gap-3 text-purple-600">

                <Loader2 className="h-6 w-6 animate-spin" />

                <span className="font-semibold">
                  Loading schedules...
                </span>

              </div>

            </div>
          ) : (
            <table className="w-full min-w-[1200px]">

              <thead>
                <tr className="border-b bg-slate-50 text-left">

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    COURSE
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    TRAINER
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    DATE
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    TIME
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    MODE
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    BATCH
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

                {filteredSchedules.map(
                  (schedule) => (

                    <tr
                      key={schedule.id}
                      className="border-b last:border-0 hover:bg-purple-50/40"
                    >

                      {/* COURSE */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">

                            <CalendarDays className="h-5 w-5 text-purple-600" />

                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              {schedule.course}
                            </p>

                            <p className="text-sm text-slate-500">
                              {schedule.location}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* TRAINER */}
                      <td className="px-5 py-5">

                        <p className="font-medium text-slate-700">
                          {schedule.trainer}
                        </p>

                      </td>

                      {/* DATE */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                          <CalendarDays className="h-4 w-4 text-purple-500" />

                          {schedule.date}

                        </div>

                      </td>

                      {/* TIME */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                          <Clock className="h-4 w-4 text-blue-500" />

                          <span>

                            {schedule.startTime}

                            <br />

                            <span className="text-xs text-slate-400">
                              to {schedule.endTime}
                            </span>

                          </span>

                        </div>

                      </td>

                      {/* MODE */}
                      <td className="px-5 py-5">

                        <span
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                            schedule.mode === "Online"
                              ? "bg-blue-50 text-blue-600"
                              : schedule.mode === "Offline"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-purple-50 text-purple-600"
                          }`}
                        >
                          {schedule.mode}
                        </span>

                      </td>

                      {/* BATCH */}
                      <td className="px-5 py-5">

                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                          {schedule.batch}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            schedule.status === "Scheduled"
                              ? "bg-purple-100 text-purple-700"
                              : schedule.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {schedule.status}
                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          {/* VIEW */}
                          <button
                            onClick={() =>
                              setViewSchedule(
                                schedule
                              )
                            }
                            className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* EDIT */}
                          <button
                            onClick={() =>
                              openEditForm(
                                schedule
                              )
                            }
                            className="rounded-lg bg-purple-50 p-2 text-purple-600 hover:bg-purple-100"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(
                                schedule.id
                              )
                            }
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

                {filteredSchedules.length === 0 && (

                  <tr>

                    <td
                      colSpan="8"
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No schedules found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>
          )}

        </div>

      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">

                  {editingSchedule
                    ? "Edit Course Schedule"
                    : "Add Course Schedule"}

                </h2>

                <p className="text-sm text-slate-500">
                  Enter class schedule details.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
              >

                <X className="h-5 w-5" />

              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-6"
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* COURSE */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course Name
                  </label>

                  <select
                    required
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                  >

                    <option value="">
                      Select Course
                    </option>

                    <option>
                      Full Stack Java Development
                    </option>

                    <option>
                      React JS Development
                    </option>

                    <option>
                      Python Programming
                    </option>

                    <option>
                      SQL Development
                    </option>

                  </select>

                </div>

                {/* TRAINER */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Trainer
                  </label>

                  <select
                    required
                    name="trainer"
                    value={formData.trainer}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                  >

                    <option value="">
                      Select Trainer
                    </option>

                    <option>
                      John David
                    </option>

                    <option>
                      Priya Sharma
                    </option>

                    <option>
                      Arun Kumar
                    </option>

                    <option>
                      Meena Raj
                    </option>

                  </select>

                </div>

                {/* DATE */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Class Date
                  </label>

                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                  />

                </div>

                {/* START TIME */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Start Time
                  </label>

                  <input
                    required
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                  />

                </div>

                {/* END TIME */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    End Time
                  </label>

                  <input
                    required
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                  />

                </div>

                {/* MODE */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Class Mode
                  </label>

                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                  >

                    <option value="Online">
                      Online
                    </option>

                    <option value="Offline">
                      Offline
                    </option>

                    <option value="Hybrid">
                      Hybrid
                    </option>

                  </select>

                </div>

                {/* LOCATION */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Location / Meeting Link
                  </label>

                  <div className="relative">

                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      required
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Google Meet / Classroom 1"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-purple-500"
                    />

                  </div>

                </div>

                {/* BATCH */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Batch
                  </label>

                  <input
                    required
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    placeholder="Example: JAVA-FS-01"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                  />

                </div>

                {/* STATUS */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                  >

                    <option value="Scheduled">
                      Scheduled
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTONS */}
              <div className="mt-7 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}

                  {editingSchedule
                    ? "Update Schedule"
                    : "Save Schedule"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {viewSchedule && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Schedule Details
                </h2>

                <p className="text-sm text-slate-500">
                  Course class information
                </p>

              </div>

              <button
                onClick={() =>
                  setViewSchedule(null)
                }
                className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
              >

                <X className="h-5 w-5" />

              </button>

            </div>

            <div className="space-y-4 p-6">

              <div>
                <p className="text-sm text-slate-500">
                  Course
                </p>

                <p className="font-semibold text-slate-900">
                  {viewSchedule.course}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Trainer
                </p>

                <p className="font-semibold text-slate-900">
                  {viewSchedule.trainer}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Location
                </p>

                <p className="font-semibold text-slate-900">
                  {viewSchedule.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-sm text-slate-500">
                    Date
                  </p>

                  <p className="font-semibold">
                    {viewSchedule.date}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Batch
                  </p>

                  <p className="font-semibold">
                    {viewSchedule.batch}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Start Time
                  </p>

                  <p className="font-semibold">
                    {viewSchedule.startTime}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    End Time
                  </p>

                  <p className="font-semibold">
                    {viewSchedule.endTime}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Mode
                  </p>

                  <p className="font-semibold">
                    {viewSchedule.mode}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <p className="font-semibold">
                    {viewSchedule.status}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default CourseSchedule;