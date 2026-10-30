import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Smartphone,
  CameraOff,
  Users,
  UserX,
  Search,
  Eye,
  X,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// Map warning type text -> icon (Firestore data won't have icon components)
const iconMap = {
  "Student Using Mobile": Smartphone,
  "Student Left Camera": CameraOff,
  "Multiple Faces Detected": Users,
  "Trainer Not Present": UserX,
};

const AIWarnings = () => {
  const [search, setSearch] = useState("");
  const [selectedWarning, setSelectedWarning] = useState(null);
  const [warningsData, setWarningsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarnings();
  }, []);

  const fetchWarnings = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(collection(db, "aiWarnings"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWarningsData(data);
    } catch (error) {
      console.error("Error fetching AI warnings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWarnings = warningsData.filter((warning) =>
    `${warning.type || ""} ${warning.student || ""} ${warning.course || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ==========================================
  // SUMMARY COUNTS (Live from Firebase)
  // ==========================================

  const totalWarnings = warningsData.length;

  const highCount = warningsData.filter(
    (w) => w.severity === "High"
  ).length;

  const mediumCount = warningsData.filter(
    (w) => w.severity === "Medium"
  ).length;

  const resolvedCount = warningsData.filter(
    (w) => w.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
            <ShieldAlert className="h-6 w-6 text-red-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              AI Warning Panel
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor and manage AI detected classroom warnings.
            </p>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Warnings</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {loading ? "..." : totalWarnings}
          </h2>
        </div>

        <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">High Priority</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {loading ? "..." : highCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Medium Priority</p>
          <h2 className="mt-2 text-3xl font-bold text-orange-500">
            {loading ? "..." : mediumCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Resolved</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {loading ? "..." : resolvedCount}
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search student, warning or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      {/* WARNING TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">

            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Warning
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Course
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Time
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Severity
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-slate-500">
                    Loading warnings...
                  </td>
                </tr>
              ) : (
                filteredWarnings.map((warning) => {
                  const Icon = iconMap[warning.type] || ShieldAlert;

                  return (
                    <tr
                      key={warning.id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* WARNING */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                            <Icon className="h-5 w-5 text-red-500" />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {warning.type}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              AI detected warning
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* STUDENT */}
                      <td className="px-6 py-5">
                        <p className="font-medium text-slate-900">
                          {warning.student}
                        </p>

                        <p className="text-xs text-slate-500">
                          {warning.studentId}
                        </p>
                      </td>

                      {/* COURSE */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {warning.course}
                      </td>

                      {/* TIME */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {warning.time}
                      </td>

                      {/* SEVERITY */}
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            warning.severity === "Critical"
                              ? "bg-red-100 text-red-700"
                              : warning.severity === "High"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {warning.severity}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => setSelectedWarning(warning)}
                          className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm font-medium text-purple-600 transition hover:bg-purple-100"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>

          </table>
        </div>

        {!loading && filteredWarnings.length === 0 && (
          <div className="p-10 text-center text-sm text-slate-500">
            No warnings found.
          </div>
        )}

      </div>

      {/* DETAILS MODAL */}
      {selectedWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-5 flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">
                  <ShieldAlert className="h-6 w-6 text-red-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Warning Details
                  </h2>

                  <p className="text-xs text-slate-500">
                    AI Monitoring System
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedWarning(null)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>

            </div>

            <div className="space-y-4">

              <div>
                <p className="text-xs text-slate-500">Warning Type</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedWarning.type}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Student</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedWarning.student}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Course</p>
                <p className="mt-1 text-slate-700">
                  {selectedWarning.course}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Detected Time</p>
                <p className="mt-1 text-slate-700">
                  {selectedWarning.time}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Description</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {selectedWarning.description}
                </p>
              </div>

            </div>

            <button
              onClick={() => setSelectedWarning(null)}
              className="mt-6 w-full rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default AIWarnings;