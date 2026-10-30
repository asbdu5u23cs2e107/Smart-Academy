import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  ArrowRight,
  Upload,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";


import { db } from "../../firebase";

const statusConfig = {
  Graded: {
    label: "Graded",
    color:
      "bg-emerald-50 text-emerald-600 border-emerald-200",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },

  Submitted: {
    label: "Under Review",
    color:
      "bg-purple-50 text-purple-600 border-purple-200",
    icon: Clock,
    iconColor: "text-purple-500",
  },

  Pending: {
    label: "Pending",
    color:
      "bg-amber-50 text-amber-600 border-amber-200",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
  },
};

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================================
  // FIREBASE - LOAD ASSIGNMENTS
  // ================================

  useEffect(() => {
    setLoading(true);
    setError("");

    const assignmentsRef = collection(db, "assignments");

    const assignmentsQuery = query(
      assignmentsRef,
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      assignmentsQuery,
      (snapshot) => {
        const assignmentData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAssignments(assignmentData);
        setLoading(false);
      },
      (err) => {
        console.error("Firebase Assignment Error:", err);

        setError(
          "Unable to load assignments. Please check Firebase configuration."
        );

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ================================
  // EXPAND / COLLAPSE
  // ================================

  const toggle = (id) => {
    setExpanded((prev) =>
      prev === id ? null : id
    );
  };

  // ================================
  // COUNTS
  // ================================

  const totalAssignments = assignments.length;

  const gradedAssignments = assignments.filter(
    (assignment) =>
      assignment.status === "Graded"
  ).length;

  const submittedAssignments = assignments.filter(
    (assignment) =>
      assignment.status === "Submitted"
  ).length;

  const pendingAssignments = assignments.filter(
    (assignment) =>
      assignment.status === "Pending"
  ).length;

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="space-y-6">

        <div className="border-b border-slate-100 pb-5">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Student Dashboard
          </span>

          <h1 className="mt-1 flex items-center gap-2 text-xl font-extrabold uppercase text-slate-900">
            <ClipboardList className="h-5 w-5 text-rose-400" />
            Assignments
          </h1>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center">

          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>

          <p className="text-sm font-medium text-slate-500">
            Loading assignments...
          </p>

        </div>
      </div>
    );
  }

  // ================================
  // ERROR
  // ================================

  if (error) {
    return (
      <div className="space-y-6">

        <div className="border-b border-slate-100 pb-5">

          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Student Dashboard
          </span>

          <h1 className="mt-1 flex items-center gap-2 text-xl font-extrabold uppercase text-slate-900">
            <ClipboardList className="h-5 w-5 text-rose-400" />
            Assignments
          </h1>

        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

          <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-red-500" />

          <p className="text-sm font-semibold text-red-600">
            {error}
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ================================
          HEADER
      ================================= */}

      <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Student Dashboard
          </span>

          <h1 className="mt-0.5 flex items-center gap-2 text-xl font-extrabold uppercase text-slate-900">

            <ClipboardList className="h-5 w-5 text-rose-400" />

            Assignments

          </h1>

        </div>

        <Link
          to="/assignments"
          className="btn-primary inline-flex items-center gap-2 text-xs"
        >
          <Upload className="h-3.5 w-3.5" />
          Submit Assignment
        </Link>

      </div>


      {/* ================================
          SUMMARY
      ================================= */}

      <div className="flex flex-wrap gap-3 text-xs font-bold">

        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700">
          <span>{totalAssignments}</span>
          <span className="font-normal opacity-70">
            Total
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-600">
          <span>{gradedAssignments}</span>
          <span className="font-normal opacity-70">
            Graded
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-purple-600">
          <span>{submittedAssignments}</span>
          <span className="font-normal opacity-70">
            Under Review
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-amber-600">
          <span>{pendingAssignments}</span>
          <span className="font-normal opacity-70">
            Pending
          </span>
        </div>

      </div>


      {/* ================================
          NO ASSIGNMENTS
      ================================= */}

      {assignments.length === 0 && (

        <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">

          <ClipboardList className="mx-auto mb-4 h-10 w-10 text-slate-300" />

          <h3 className="text-base font-bold text-slate-700">
            No Assignments Available
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Your trainer has not added any assignments yet.
          </p>

        </div>

      )}


      {/* ================================
          ASSIGNMENT CARDS
      ================================= */}

      <div className="space-y-3">

        {assignments.map((assignment) => {

          const cfg =
            statusConfig[assignment.status] ||
            statusConfig.Pending;

          const StatusIcon = cfg.icon;

          const isOpen =
            expanded === assignment.id;

          return (

            <div
              key={assignment.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white/60 transition-shadow hover:shadow-sm"
            >

              {/* SUMMARY */}

              <button
                type="button"
                className="flex w-full flex-col gap-3 p-4 text-left sm:flex-row sm:items-center"
                onClick={() =>
                  toggle(assignment.id)
                }
              >

                <div className="flex-grow space-y-0.5">

                  <div className="flex flex-wrap items-center gap-2">

                    <h4 className="text-sm font-bold text-slate-900">
                      {assignment.title}
                    </h4>

                    {assignment.subject && (
                      <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-500">
                        {assignment.subject}
                      </span>
                    )}

                  </div>


                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400">

                    {assignment.due && (
                      <span className="flex items-center gap-1">

                        <Calendar className="h-2.5 w-2.5" />

                        Due: {assignment.due}

                      </span>
                    )}

                    {assignment.submitted && (
                      <span className="flex items-center gap-1">

                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />

                        Submitted: {assignment.submitted}

                      </span>
                    )}

                  </div>

                </div>


                <div className="flex flex-shrink-0 items-center gap-3">

                  {assignment.grade && (
                    <span className="text-xl font-extrabold text-emerald-500">
                      {assignment.grade}
                    </span>
                  )}

                  <span
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase ${cfg.color}`}
                  >

                    <StatusIcon
                      className={`h-3 w-3 ${cfg.iconColor}`}
                    />

                    {cfg.label}

                  </span>

                  <ArrowRight
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-90"
                        : ""
                    }`}
                  />

                </div>

              </button>


              {/* ================================
                  EXPANDED DETAILS
              ================================= */}

              {isOpen && (

                <div className="space-y-3 border-t border-slate-100 px-4 pb-4 pt-3">

                  {assignment.description && (
                    <p className="text-xs leading-relaxed text-slate-600">
                      {assignment.description}
                    </p>
                  )}


                  {/* TRAINER */}

                  {assignment.trainer && (
                    <div className="text-xs text-slate-500">
                      <span className="font-bold text-slate-700">
                        Trainer:
                      </span>{" "}
                      {assignment.trainer}
                    </div>
                  )}


                  {/* FEEDBACK */}

                  {assignment.feedback && (

                    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-700">

                      <span className="mb-0.5 block font-bold">
                        Trainer Feedback:
                      </span>

                      {assignment.feedback}

                    </div>

                  )}


                  {/* PENDING */}

                  {assignment.status === "Pending" && (

                    <Link
                      to={`/assignments/${assignment.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-purple-700"
                    >

                      <Upload className="h-3.5 w-3.5" />

                      Submit Now

                    </Link>

                  )}

                </div>

              )}

            </div>

          );
        })}

      </div>

    </div>
  );
};

export default Assignments;