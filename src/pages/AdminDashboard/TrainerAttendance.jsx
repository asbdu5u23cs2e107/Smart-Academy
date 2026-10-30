import React, { useMemo, useState, useEffect} from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Search,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  Users,
  Download,
} from "lucide-react";

const TrainerAttendance = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("2026-08-13");
  const [statusFilter, setStatusFilter] = useState("All");

  const [attendance, setAttendance] = useState([]);
  const[loading, setLoading] = useState(true);

  const loadTrainers = async () => {
  try {
    setLoading(true);

    const snapshot = await getDocs(
      collection(db, "trainers")
    );

    const trainerData = snapshot.docs.map((trainerDoc) => {
      const data = trainerDoc.data();

      return {
        id: trainerDoc.id,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        specialization: data.specialization || "",
        course: data.course || data.specialization || "-",

        // Attendance fields
        date: date,
        checkIn: "-",
        checkOut: "-",
        status: "Absent",
      };
    });

    console.log("Trainers from Firebase:", trainerData);

    setAttendance(trainerData);
  } catch (error) {
    console.error("Error loading trainers:", error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  loadTrainers();
}, []);
  
   

  const filteredAttendance = useMemo(() => {
    return attendance.filter((trainer) => {
      const matchesSearch =
        trainer.name.toLowerCase().includes(search.toLowerCase()) ||
        trainer.email.toLowerCase().includes(search.toLowerCase()) ||
        trainer.id.toLowerCase().includes(search.toLowerCase()) ||
        trainer.course.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || trainer.status === statusFilter;

      const matchesDate = trainer.date === date;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [attendance, search, statusFilter, date]);

  const presentCount = attendance.filter(
    (item) => item.date === date && item.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (item) => item.date === date && item.status === "Absent"
  ).length;

  const lateCount = attendance.filter(
    (item) => item.date === date && item.status === "Late"
  ).length;

  const totalCount = attendance.filter(
    (item) => item.date === date
  ).length;

  const updateStatus = async (id, status) => {
  try {
    const trainerRef = doc(db, "trainerAttendance", id);

    const currentTrainer = attendance.find(
      (trainer) => trainer.id === id
    );

    if (!currentTrainer) return;

    const updatedData = {
      status,
      checkIn:
        status === "Absent"
          ? "-"
          : currentTrainer.checkIn === "-"
          ? "09:00 AM"
          : currentTrainer.checkIn,
    };

    await updateDoc(trainerRef, updatedData);

    setAttendance((current) =>
      current.map((trainer) =>
        trainer.id === id
          ? {
              ...trainer,
              ...updatedData,
            }
          : trainer
      )
    );

    console.log("Attendance updated successfully");
  } catch (error) {
    console.error("Error updating attendance:", error);
  }
};

  const getStatusStyle = (status) => {
    if (status === "Present") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Absent") {
      return "bg-red-100 text-red-700";
    }

    return "bg-orange-100 text-orange-700";
  };

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-4 py-6 sm:px-6 lg:px-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Trainer Attendance
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track and manage daily trainer attendance.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">

        {/* Total */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Trainers
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {totalCount}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Present */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Present
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {presentCount}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Absent */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Absent
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {absentCount}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Late */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Late
              </p>

              <h2 className="mt-2 text-3xl font-bold text-orange-600">
                {lateCount}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <Clock3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

      </div>

      {/* FILTER SECTION */}
      <div className="mb-6 rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search trainer, ID, email or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            {/* Date */}
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-500" />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-purple-400"
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400"
            >
              <option value="All">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>

            {/* Download */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              onClick={() => alert("Attendance report download started")}
            >
              <Download className="h-4 w-4" />
              Export
            </button>

          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-[1000px] w-full">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Trainer
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Course
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Check In
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Check Out
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((trainer) => (

                  <tr
                    key={trainer.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-purple-50/40 transition"
                  >

                    {/* TRAINER */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold">
                          {getInitial(trainer.name)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {trainer.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {trainer.id}
                          </p>

                          <p className="text-xs text-slate-400">
                            {trainer.email}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* COURSE */}
                    <td className="px-6 py-5 text-sm text-slate-700">
                      {trainer.course}
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {new Date(trainer.date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>

                    {/* CHECK IN */}
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {trainer.checkIn}
                    </td>

                    {/* CHECK OUT */}
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {trainer.checkOut}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                          trainer.status
                        )}`}
                      >
                        {trainer.status}
                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(trainer.id, "Present")
                          }
                          className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-600 hover:bg-green-100"
                        >
                          Present
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(trainer.id, "Absent")
                          }
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                        >
                          Absent
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(trainer.id, "Late")
                          }
                          className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-100"
                        >
                          Late
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No trainer attendance records found.
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

export default TrainerAttendance;