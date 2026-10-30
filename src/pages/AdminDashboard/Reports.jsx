import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart3,
  Users,
  GraduationCap,
  BookOpen,
  IndianRupee,
  Download,
  Calendar,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Reports = () => {
  const [period, setPeriod] = useState("30");

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [courses, setCourses] = useState([]);

  // =========================================================
  // FETCH FIREBASE DATA
  // =========================================================

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      setLoading(true);

      const [studentsSnap, trainersSnap, coursesSnap] = await Promise.all([
        getDocs(collection(db, "students")),
        getDocs(collection(db, "trainers")),
        getDocs(collection(db, "courses")),
      ]);

      setStudents(
        studentsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      setTrainers(
        trainersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      setCourses(
        coursesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("Error fetching reports data:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // HELPER: get JS Date from Firestore field (Timestamp or string)
  // =========================================================

  const getDate = (value) => {
    if (!value) return null;
    if (value?.seconds) return new Date(value.seconds * 1000);
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  // =========================================================
  // PERIOD-FILTERED STUDENTS
  // =========================================================

  const periodStudents = useMemo(() => {
    const days = Number(period);
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - days);

    return students.filter((student) => {
      const date = getDate(student.createdAt || student.joiningDate);
      if (!date) return false;
      return date >= startDate;
    });
  }, [students, period]);

  const periodTrainers = useMemo(() => {
    const days = Number(period);
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - days);

    return trainers.filter((trainer) => {
      const date = getDate(trainer.createdAt || trainer.joiningDate);
      if (!date) return false;
      return date >= startDate;
    });
  }, [trainers, period]);

  // =========================================================
  // STATS (Live)
  // =========================================================

  const activeCoursesCount = useMemo(() => {
    return courses.filter((course) => course.status === "Active").length;
  }, [courses]);

  const totalRevenue = useMemo(() => {
    return periodStudents.reduce(
      (sum, student) => sum + Number(student.paid || 0),
      0
    );
  }, [periodStudents]);

  const stats = [
    {
      title: "Total Students",
      value: periodStudents.length,
      icon: Users,
    },
    {
      title: "Total Trainers",
      value: periodTrainers.length,
      icon: GraduationCap,
    },
    {
      title: "Active Courses",
      value: activeCoursesCount,
      icon: BookOpen,
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
  ];

  // =========================================================
  // ENROLLMENT CHART (Live, grouped by period)
  // =========================================================

  const enrollmentData = useMemo(() => {
    const days = Number(period);

    if (days === 7) {
      const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      return labels.map((label, index) => {
        const count = periodStudents.filter((student) => {
          const date = getDate(student.createdAt || student.joiningDate);
          if (!date) return false;

          const targetDay = new Date();
          targetDay.setDate(new Date().getDate() - (6 - index));

          return date.toDateString() === targetDay.toDateString();
        }).length;

        return { label, value: count };
      });
    }

    if (days === 30) {
      const now = new Date();

      const weekRanges = [
        { label: "Week 1", startOffset: 30, endOffset: 23 },
        { label: "Week 2", startOffset: 22, endOffset: 15 },
        { label: "Week 3", startOffset: 14, endOffset: 7 },
        { label: "Week 4", startOffset: 6, endOffset: 0 },
      ];

      return weekRanges.map(({ label, startOffset, endOffset }) => {
        const start = new Date();
        start.setDate(now.getDate() - startOffset);

        const end = new Date();
        end.setDate(now.getDate() - endOffset);

        const count = periodStudents.filter((student) => {
          const date = getDate(student.createdAt || student.joiningDate);
          if (!date) return false;
          return date >= start && date <= end;
        }).length;

        return { label, value: count };
      });
    }

    // For 90 / 180 / 365 days - group by month
    const monthMap = {};

    periodStudents.forEach((student) => {
      const date = getDate(student.createdAt || student.joiningDate);
      if (!date) return;

      const label = date.toLocaleString("default", { month: "short" });

      monthMap[label] = (monthMap[label] || 0) + 1;
    });

    return Object.entries(monthMap).map(([label, value]) => ({
      label,
      value,
    }));
  }, [periodStudents, period]);

  // =========================================================
  // COURSE PERFORMANCE (Live, top 5 by student count)
  // =========================================================

  const coursePerformanceData = useMemo(() => {
    const courseMap = {};

    periodStudents.forEach((student) => {
      const courseName = student.course;
      if (!courseName) return;

      courseMap[courseName] = (courseMap[courseName] || 0) + 1;
    });

    return Object.entries(courseMap)
      .map(([name, count]) => ({ name, students: count }))
      .sort((a, b) => b.students - a.students)
      .slice(0, 5);
  }, [periodStudents]);

  // =========================================================
  // PERIOD LABEL
  // =========================================================

  const periodLabels = {
    7: "Last 7 Days",
    30: "Last 30 Days",
    90: "Last 3 Months",
    180: "Last 6 Months",
    365: "This Year",
  };

  const periodLabel = periodLabels[period] || "Last 30 Days";

  // =========================================================
  // EXPORT REPORT
  // =========================================================

  const handleExportReport = () => {
    const rows = [];

    rows.push(["Academy Performance Report"]);
    rows.push([]);

    rows.push(["Report Period", periodLabel]);
    rows.push([]);

    rows.push(["Metric", "Value"]);

    stats.forEach((stat) => {
      rows.push([stat.title, stat.value]);
    });

    rows.push([]);

    rows.push(["Enrollment Overview"]);
    rows.push(["Period", "Enrollments"]);

    enrollmentData.forEach((item) => {
      rows.push([item.label, item.value]);
    });

    rows.push([]);

    rows.push(["Course Performance"]);
    rows.push(["Course", "Students"]);

    coursePerformanceData.forEach((course) => {
      rows.push([course.name, course.students]);
    });

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => {
            const safeValue = value ?? "";
            return `"${String(safeValue).replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `academy-report-${periodLabel
      .replace(/\s+/g, "-")
      .toLowerCase()}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // =========================================================
  // MAX VALUES (avoid divide by zero)
  // =========================================================

  const maxEnrollment = Math.max(
    ...enrollmentData.map((item) => item.value),
    1
  );

  const maxStudents = Math.max(
    ...coursePerformanceData.map((course) => course.students),
    1
  );

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Reports
          </h1>

          <p className="text-slate-500 mt-1">
            View and analyze your academy performance reports.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* PERIOD DROPDOWN */}

          <div className="relative">

            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2
              w-4 h-4 text-slate-400 pointer-events-none"
            />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none bg-white border border-slate-200
              rounded-xl pl-10 pr-10 py-3 text-sm font-medium
              text-slate-700 outline-none cursor-pointer
              focus:ring-2 focus:ring-purple-200"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 3 Months</option>
              <option value="180">Last 6 Months</option>
              <option value="365">This Year</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none"
            />

          </div>

          {/* EXPORT BUTTON */}

          <button
            type="button"
            onClick={handleExportReport}
            className="flex items-center gap-2
            bg-purple-600 text-white
            px-5 py-3 rounded-xl
            font-semibold
            hover:bg-purple-700
            transition-colors
            cursor-pointer"
          >
            <Download size={18} />
            Export Report
          </button>

        </div>

      </div>

      {/* STAT CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl border border-slate-200
              p-5 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900 mt-2">
                    {loading ? "..." : stat.value}
                  </h2>

                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                      Live
                    </span>
                    <span className="text-xs text-slate-400">
                      Firebase data
                    </span>
                  </div>

                </div>

                <div
                  className="w-12 h-12 rounded-xl bg-purple-100
                  flex items-center justify-center"
                >
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* REPORT ANALYTICS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* ENROLLMENT */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Enrollment Overview
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Student enrollment performance - {periodLabel}
              </p>
            </div>

            <BarChart3 className="w-6 h-6 text-purple-600" />

          </div>

          {enrollmentData.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No enrollment data found.
            </div>
          ) : (
            <div className="flex items-end gap-5 h-56">

              {enrollmentData.map((item) => {
                const height = (item.value / maxEnrollment) * 100;

                return (
                  <div
                    key={item.label}
                    className="flex-1 flex flex-col items-center justify-end h-full"
                  >

                    <div
                      className="w-full max-w-[40px]
                      bg-purple-500 rounded-t-lg
                      hover:bg-purple-600 transition-all duration-300"
                      style={{ height: `${height}%` }}
                      title={`${item.value} enrollments`}
                    />

                    <span className="text-xs text-slate-400 mt-3">
                      {item.label}
                    </span>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* COURSE PERFORMANCE */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Course Performance
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Students enrolled by course - {periodLabel}
            </p>
          </div>

          {coursePerformanceData.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No course data found.
            </div>
          ) : (
            <div className="space-y-5">

              {coursePerformanceData.map((course) => {
                const percentage = (course.students / maxStudents) * 100;

                return (
                  <div key={course.name}>

                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        {course.name}
                      </span>

                      <span className="text-sm font-semibold text-slate-900">
                        {course.students}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-2 bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Reports;