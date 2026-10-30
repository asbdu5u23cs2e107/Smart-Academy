import React, { useMemo, useState, useEffect } from "react";
import {
  Activity,
  Users,
  Video,
  Clock,
  Search,
  Eye,
  ExternalLink,
  Circle,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const LiveClassMonitoring = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [liveClassesData, setLiveClassesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  const fetchLiveClasses = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(collection(db, "liveClasses"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLiveClassesData(data);
    } catch (error) {
      console.error("Error fetching live classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClasses = useMemo(() => {
    return liveClassesData.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (item.title || "").toLowerCase().includes(searchText) ||
        (item.trainer || "").toLowerCase().includes(searchText) ||
        (item.course || "").toLowerCase().includes(searchText) ||
        (item.batch || "").toLowerCase().includes(searchText) ||
        (item.id || "").toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, liveClassesData]);

  const liveCount = liveClassesData.filter(
    (item) => item.status === "Live"
  ).length;

  const scheduledCount = liveClassesData.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const totalStudents = liveClassesData
    .filter((item) => item.status === "Live")
    .reduce((total, item) => total + (item.students || 0), 0);

  const handleJoin = (item) => {
    alert(`Opening ${item.title} - ${item.platform}`);
  };

  const handleView = (item) => {
    alert(
      `Class: ${item.title}\nTrainer: ${item.trainer}\nStudents: ${item.students}`
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-6 sm:p-8">

      {/* HEADER */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-slate-900">
          Live Class Monitoring
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor and manage ongoing and scheduled live classes.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-7">

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Classes</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {liveClassesData.length}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Video className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Live Now</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {liveCount}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Scheduled</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {scheduledCount}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Students Online</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {totalStudents}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

      </div>

      {/* FILTER SECTION */}
      <div className="mb-6 rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search class, trainer, course or batch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-purple-500"
          >
            <option>All Status</option>
            <option>Live</option>
            <option>Scheduled</option>
          </select>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Live Class</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Trainer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Course / Batch</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Students</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Start Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-sm text-slate-500">
                    Loading live classes...
                  </td>
                </tr>
              ) : (
                filteredClasses.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-purple-50/30 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                          <Video className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="mt-1 text-xs text-slate-400">{item.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-medium text-slate-800">{item.trainer}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.trainerEmail}</p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-slate-700">{item.course}</p>
                      <span className="mt-2 inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {item.batch}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span className="font-semibold text-slate-700">{item.students}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">{item.startTime}</td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {item.duration}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {item.status === "Live" ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                          <Circle className="h-2.5 w-2.5 fill-current" />
                          Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-700">
                          <Clock className="h-3.5 w-3.5" />
                          Scheduled
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(item)}
                          title="View"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {item.status === "Live" && (
                          <button
                            onClick={() => handleJoin(item)}
                            title="Join Class"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition hover:bg-purple-200"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredClasses.length === 0 && (
          <div className="py-16 text-center">
            <Video className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">No live classes found</h3>
            <p className="mt-1 text-sm text-slate-400">Try changing your search or status filter.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default LiveClassMonitoring;