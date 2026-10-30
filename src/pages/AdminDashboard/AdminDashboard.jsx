import React, { useEffect, useMemo, useState } from "react";

import {
  Users,
  UserRound,
  BookOpen,
  Video,
  AlertTriangle,
  FileText,
  Download,
} from "lucide-react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase";
import { getAllResources } from "../../services/resourceRepository";

const AdminDashboard = () => {
  const [period, setPeriod] = useState("30");

  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [ppts, setPpts] = useState([]);
  const [videos, setVideos] = useState([]);

  // ==========================================
  // FETCH FIREBASE DATA
  // ==========================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const allRepoResources = getAllResources();
      const defaultNotes = allRepoResources.filter((r) => r.type === "Notes" || r.type === "PDF");
      const defaultPpts = allRepoResources.filter((r) => r.type === "PPT");
      const defaultVideos = allRepoResources.filter((r) => r.type === "Video");

      const results = await Promise.allSettled([
        getDocs(collection(db, "students")),
        getDocs(collection(db, "trainers")),
        getDocs(collection(db, "courses")),
        getDocs(collection(db, "resources")),
        getDocs(collection(db, "ppts")),
        getDocs(collection(db, "videos")),
      ]);

      const [
        studentsRes,
        trainersRes,
        coursesRes,
        resourcesRes,
        pptsRes,
        videosRes,
      ] = results;

      if (studentsRes.status === "fulfilled") {
        setStudents(studentsRes.value.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
      if (trainersRes.status === "fulfilled") {
        setTrainers(trainersRes.value.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
      if (coursesRes.status === "fulfilled") {
        setCourses(coursesRes.value.docs.map((d) => ({ id: d.id, ...d.data() })));
      }

      if (resourcesRes.status === "fulfilled" && resourcesRes.value.docs.length > 0) {
        setResources(resourcesRes.value.docs.map((d) => ({ id: d.id, ...d.data() })));
      } else {
        setResources(defaultNotes);
      }

      if (pptsRes.status === "fulfilled" && pptsRes.value.docs.length > 0) {
        setPpts(pptsRes.value.docs.map((d) => ({ id: d.id, ...d.data() })));
      } else {
        setPpts(defaultPpts);
      }

      if (videosRes.status === "fulfilled" && videosRes.value.docs.length > 0) {
        setVideos(videosRes.value.docs.map((d) => ({ id: d.id, ...d.data() })));
      } else {
        setVideos(defaultVideos);
      }
    } catch (error) {
      console.warn("Dashboard data fetch warning (using local fallback):", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ==========================================
  // ACTIVE COURSES
  // ==========================================

  const activeCourses = useMemo(() => {
  return courses.filter(
    (course) => course.status === "Active"
  ).length;
}, [courses]);

  // ==========================================
  // TOTAL RESOURCES
  // ==========================================

  const totalResources =
    resources.length +
    ppts.length +
    videos.length;

  // ==========================================
  // PERIOD FILTER
  // ==========================================

  const periodStudents = useMemo(() => {
    const days = Number(period);

    const now = new Date();

    const startDate = new Date();

    startDate.setDate(
      now.getDate() - days
    );

    return students.filter((student) => {
      const dateValue =
        student.createdAt ||
        student.joiningDate;

      if (!dateValue) {
        return false;
      }

      let studentDate;

      if (
        dateValue?.seconds
      ) {
        studentDate = new Date(
          dateValue.seconds * 1000
        );
      } else {
        studentDate = new Date(dateValue);
      }

      if (
        Number.isNaN(
          studentDate.getTime()
        )
      ) {
        return false;
      }

      return studentDate >= startDate;
    });
  }, [students, period]);

  // ==========================================
  // ENROLLMENT DATA
  // ==========================================

  const enrollmentData = useMemo(() => {
    const days = Number(period);

    if (days === 7) {
      const labels = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ];

      return labels.map((label, index) => {
        const dayStudents =
          periodStudents.filter(
            (student) => {
              const dateValue =
                student.createdAt ||
                student.joiningDate;

              if (!dateValue) return false;

              let date;

              if (dateValue?.seconds) {
                date = new Date(
                  dateValue.seconds * 1000
                );
              } else {
                date = new Date(dateValue);
              }

              const today =
                new Date();

              const targetDay =
                new Date();

              targetDay.setDate(
                today.getDate() -
                  (6 - index)
              );

              return (
                date.toDateString() ===
                targetDay.toDateString()
              );
            }
          ).length;

        return {
          label,
          value: dayStudents,
        };
      });
    }

    if (days === 30) {
      return [
        {
          label: "Week 1",
          value: periodStudents.filter(
            (student) => {
              const dateValue =
                student.createdAt ||
                student.joiningDate;

              if (!dateValue) return false;

              const date =
                dateValue?.seconds
                  ? new Date(
                      dateValue.seconds *
                        1000
                    )
                  : new Date(dateValue);

              const now =
                new Date();

              const start =
                new Date();

              start.setDate(
                now.getDate() - 30
              );

              const end =
                new Date();

              end.setDate(
                now.getDate() - 23
              );

              return (
                date >= start &&
                date < end
              );
            }
          ).length,
        },

        {
          label: "Week 2",
          value: periodStudents.filter(
            (student) => {
              const dateValue =
                student.createdAt ||
                student.joiningDate;

              if (!dateValue) return false;

              const date =
                dateValue?.seconds
                  ? new Date(
                      dateValue.seconds *
                        1000
                    )
                  : new Date(dateValue);

              const now =
                new Date();

              const start =
                new Date();

              start.setDate(
                now.getDate() - 22
              );

              const end =
                new Date();

              end.setDate(
                now.getDate() - 15
              );

              return (
                date >= start &&
                date < end
              );
            }
          ).length,
        },

        {
          label: "Week 3",
          value: periodStudents.filter(
            (student) => {
              const dateValue =
                student.createdAt ||
                student.joiningDate;

              if (!dateValue) return false;

              const date =
                dateValue?.seconds
                  ? new Date(
                      dateValue.seconds *
                        1000
                    )
                  : new Date(dateValue);

              const now =
                new Date();

              const start =
                new Date();

              start.setDate(
                now.getDate() - 14
              );

              const end =
                new Date();

              end.setDate(
                now.getDate() - 7
              );

              return (
                date >= start &&
                date < end
              );
            }
          ).length,
        },

        {
          label: "Week 4",
          value: periodStudents.filter(
            (student) => {
              const dateValue =
                student.createdAt ||
                student.joiningDate;

              if (!dateValue) return false;

              const date =
                dateValue?.seconds
                  ? new Date(
                      dateValue.seconds *
                        1000
                    )
                  : new Date(dateValue);

              const now =
                new Date();

              const start =
                new Date();

              start.setDate(
                now.getDate() - 7
              );

              return date >= start;
            }
          ).length,
        },
      ];
    }

    return [
      {
        label: "Month 1",
        value: periodStudents.length,
      },
      {
        label: "Month 2",
        value: 0,
      },
      {
        label: "Month 3",
        value: 0,
      },
    ];
  }, [periodStudents, period]);

  // ==========================================
  // COURSE PERFORMANCE
  // ==========================================

  const coursePerformance = useMemo(() => {
    const courseMap = {};

    students.forEach((student) => {
      const courseName =
        student.course;

      if (!courseName) return;

      if (!courseMap[courseName]) {
        courseMap[courseName] = 0;
      }

      courseMap[courseName]++;
    });

    return Object.entries(courseMap)
      .map(([name, count]) => ({
        name,
        students: count,
      }))
      .sort(
        (a, b) =>
          b.students - a.students
      )
      .slice(0, 5);
  }, [students]);

  // ==========================================
  // REVENUE DATA
  // ==========================================

  const revenueData = useMemo(() => {
    let totalFee = 0;
    let paid = 0;
    let due = 0;

    students.forEach((student) => {
      totalFee += Number(
        student.totalFee || 0
      );

      paid += Number(
        student.paid || 0
      );

      due += Number(
        student.due || 0
      );
    });

    return {
      totalFee,
      paid,
      due,
    };
  }, [students]);

  // ==========================================
  // REVENUE PERCENTAGE
  // ==========================================

  const revenuePercentages = useMemo(() => {
    const total =
      revenueData.paid +
      revenueData.due;

    if (total === 0) {
      return {
        paid: 0,
        due: 0,
      };
    }

    return {
      paid:
        (revenueData.paid /
          total) *
        100,

      due:
        (revenueData.due /
          total) *
        100,
    };
  }, [revenueData]);

  // ==========================================
  // DASHBOARD STATS
  // ==========================================

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      change: "Live",
      icon: Users,
    },

    {
      title: "Total Trainers",
      value: trainers.length,
      change: "Live",
      icon: UserRound,
    },

    {
      title: "Active Courses",
      value: activeCourses,
      change: "Live",
      icon: BookOpen,
    },

    {
      title: "Live Classes",
      value: 0,
      change: "No data",
      icon: Video,
    },

    {
      title: "AI Warnings",
      value: 0,
      change: "No data",
      icon: AlertTriangle,
    },

    {
      title: "Resources Uploaded",
      value: totalResources,
      change: "Live",
      icon: FileText,
    },
  ];

  // ==========================================
  // EXPORT REPORT
  // ==========================================

  const handleExportReport = () => {
    const reportData = [
      ["Report", "Value"],

      [
        "Total Students",
        students.length,
      ],

      [
        "Total Trainers",
        trainers.length,
      ],

      [
        "Active Courses",
        activeCourses,
      ],

      [
        "Live Classes",
        0,
      ],

      [
        "AI Warnings",
        0,
      ],

      [
        "Resources Uploaded",
        totalResources,
      ],

      [
        "Total Fees",
        revenueData.totalFee,
      ],

      [
        "Paid Fees",
        revenueData.paid,
      ],

      [
        "Due Fees",
        revenueData.due,
      ],
    ];

    const csvContent =
      reportData
        .map((row) =>
          row
            .map(
              (value) =>
                `"${value}"`
            )
            .join(",")
        )
        .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `academy-report-${period}-days.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ==========================================
  // MAX ENROLLMENT
  // ==========================================

  const maxEnrollment =
    Math.max(
      ...enrollmentData.map(
        (item) => item.value
      ),
      1
    );

  // ==========================================
  // MAX COURSE STUDENTS
  // ==========================================

  const maxStudents =
    Math.max(
      ...coursePerformance.map(
        (course) =>
          course.students
      ),
      1
    );

  // ==========================================
  // PERIOD LABEL
  // ==========================================

  const periodLabel =
    period === "7"
      ? "Last 7 Days"
      : period === "30"
      ? "Last 30 Days"
      : "Last 90 Days";

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Overview
          </h1>

          <p className="text-slate-500 mt-1">
            Welcome back, Admin. Here's what's happening today.
          </p>

        </div>

        <div className="flex gap-3">

          <select
            value={period}
            onChange={(e) =>
              setPeriod(
                e.target.value
              )
            }
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500"
          >

            <option value="7">
              Last 7 Days
            </option>

            <option value="30">
              Last 30 Days
            </option>

            <option value="90">
              Last 90 Days
            </option>

          </select>

          <button
            onClick={
              handleExportReport
            }
            className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-purple-700"
          >

            <Download size={18} />

            Export Report

          </button>

        </div>

      </div>

      {/* ==========================================
          STATS
      ========================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">

        {stats.map((stat) => {

          const Icon =
            stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">

                    {loading
                      ? "..."
                      : stat.value}

                  </h2>

                </div>

                <div className="p-3 rounded-xl bg-purple-100">

                  <Icon
                    size={22}
                    className="text-purple-600"
                  />

                </div>

              </div>

              <div className="mt-3">

                <span className="text-sm font-semibold text-green-500">
                  {stat.change ===
                  "Live"
                    ? "● Live"
                    : stat.change}
                </span>

                <span className="text-xs text-slate-400 ml-1">
                  Firebase data
                </span>

              </div>

            </div>
          );
        })}

      </div>

      {/* ==========================================
          CHART + REVENUE
      ========================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ENROLLMENT */}

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-slate-900">
              Enrollment Trends
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Student enrollment -{" "}
              {periodLabel}
            </p>

          </div>

          <div className="h-72 flex items-end justify-between gap-5">

            {enrollmentData.map(
              (item) => {

                const height =
                  (item.value /
                    maxEnrollment) *
                  100;

                return (
                  <div
                    key={
                      item.label
                    }
                    className="flex-1 h-full flex flex-col justify-end items-center"
                  >

                    <div
                      className="w-full max-w-[60px] bg-purple-500 rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${height}%`,
                      }}
                      title={`${item.value} enrollments`}
                    />

                    <span className="text-xs text-slate-500 mt-3">
                      {
                        item.label
                      }
                    </span>

                    <span className="text-xs font-semibold text-slate-700 mt-1">
                      {
                        item.value
                      }
                    </span>

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* REVENUE */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <h2 className="text-xl font-bold text-slate-900">
            Fee Breakdown
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Student fee collection
          </p>

          <div className="flex justify-center my-8">

            <div
              className="w-48 h-48 rounded-full flex items-center justify-center"
              style={{
                background:
                  `conic-gradient(
                    #6d28d9 0% ${revenuePercentages.paid}%,
                    #ddd6fe ${revenuePercentages.paid}% 100%
                  )`,
              }}
            >

              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">

                <span className="text-xl font-bold">
                  {Math.round(
                    revenuePercentages.paid
                  )}
                  %
                </span>

              </div>

            </div>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span className="text-sm text-slate-600">
                Paid Fees
              </span>

              <span className="font-semibold text-green-600">
                ₹
                {revenueData.paid.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-sm text-slate-600">
                Due Fees
              </span>

              <span className="font-semibold text-red-500">
                ₹
                {revenueData.due.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            <div className="flex justify-between border-t pt-3">

              <span className="text-sm font-semibold text-slate-700">
                Total Fees
              </span>

              <span className="font-bold text-purple-600">
                ₹
                {revenueData.totalFee.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          COURSE PERFORMANCE
      ========================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-6">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-slate-900">
            Course Performance
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Students enrolled by course
          </p>

        </div>

        {coursePerformance.length ===
        0 ? (

          <div className="text-center py-10 text-slate-500">

            No course data found.

          </div>

        ) : (

          <div className="space-y-6">

            {coursePerformance.map(
              (course) => {

                const percentage =
                  (course.students /
                    maxStudents) *
                  100;

                return (
                  <div
                    key={
                      course.name
                    }
                  >

                    <div className="flex justify-between mb-2">

                      <span className="text-sm font-medium text-slate-700">
                        {
                          course.name
                        }
                      </span>

                      <span className="text-sm font-semibold text-slate-900">
                        {
                          course.students
                        }
                      </span>

                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full">

                      <div
                        className="h-2 bg-purple-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminDashboard;