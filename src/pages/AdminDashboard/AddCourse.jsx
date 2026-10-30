import React, { useState } from "react";
import {
  BookOpen,
  User,
  Clock,
  IndianRupee,
  FileText,
  Image,
  Save,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { saveCustomCourse } from "../../services/courseRepository";
import { getCourseLessonsWithVideos } from "../../services/videoRetrievalService";

const AddCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    category: "",
    trainer: "",
    duration: "",
    level: "",
    mode: "",
    price: "",
    description: "",
    syllabus: "",
    status: "Active",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Course ID generate
      const courseId = `CRS-${Date.now()}`;

      // 1. Save to Unified Course Repository (ensures instant sync across Admin & Student)
      const savedCourse = saveCustomCourse({
        courseId: courseId,
        id: courseId,
        title: formData.courseName,
        course: formData.courseName,
        courseName: formData.courseName,
        category: formData.category,
        trainer: formData.trainer,
        instructor: formData.trainer,
        duration: formData.duration,
        level: formData.level,
        mode: formData.mode,
        price: Number(formData.price),
        description: formData.description,
        syllabus: formData.syllabus,
        status: formData.status
      });

      // 2. Pre-retrieve and cache videos for this new course topic
      if (savedCourse) {
        try {
          await getCourseLessonsWithVideos(savedCourse);
        } catch (_vErr) {
          console.warn("Video pre-fetch error:", _vErr);
        }
      }

      // 3. Save to Firebase courses collection if available
      try {
        await addDoc(collection(db, "courses"), {
          courseId: courseId,
          course: formData.courseName,
          category: formData.category,
          instructor: formData.trainer,
          duration: formData.duration,
          level: formData.level,
          mode: formData.mode,
          price: Number(formData.price),
          description: formData.description,
          syllabus: formData.syllabus,
          status: formData.status,
          students: 0,
          progress: 0,
          createdAt: serverTimestamp(),
        });
      } catch (fbErr) {
        console.warn("Firebase save warning (local sync active):", fbErr);
      }

      console.log("Course saved successfully");
      alert("Course added successfully! Relevant educational videos have been retrieved.");

      // Clear form
      setFormData({
        courseName: "",
        category: "",
        trainer: "",
        duration: "",
        level: "",
        mode: "",
        price: "",
        description: "",
        syllabus: "",
        status: "Active",
      });

      // Go back to Course Management
      navigate("/admin/courses");

    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-4 py-6 sm:px-6 lg:px-8">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Add Course
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and publish a new course for students.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/courses")}
          className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </button>

      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* FORM HEADER */}
          <div className="border-b border-slate-200 px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Course Information
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the basic details of the course.
                </p>
              </div>

            </div>

          </div>

          {/* FORM BODY */}
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

            {/* COURSE NAME */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Name
              </label>

              <div className="relative">

                <BookOpen className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />

                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  placeholder="Enter course name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                />

              </div>

            </div>

            {/* CATEGORY */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-400 focus:bg-white"
              >

                <option value="">
                  Select Category
                </option>

                <option value="Java">
                  Java
                </option>

                <option value="React">
                  React JS
                </option>

                <option value="Python">
                  Python
                </option>

                <option value="Web Development">
                  Web Development
                </option>

                <option value="Full Stack">
                  Full Stack
                </option>

                <option value="Database">
                  Database
                </option>

              </select>

            </div>

            {/* TRAINER */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Trainer
              </label>

              <div className="relative">

                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />

                <select
                  name="trainer"
                  value={formData.trainer}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-400 focus:bg-white"
                >

                  <option value="">
                    Select Trainer
                  </option>

                  <option value="John David">
                    John David
                  </option>

                  <option value="Priya Sharma">
                    Priya Sharma
                  </option>

                  <option value="Arun Kumar">
                    Arun Kumar
                  </option>

                  <option value="Meena Raj">
                    Meena Raj
                  </option>

                </select>

              </div>

            </div>

            {/* DURATION */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Duration
              </label>

              <div className="relative">

                <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Example: 3 Months"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-400 focus:bg-white"
                />

              </div>

            </div>

            {/* LEVEL */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Level
              </label>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-400 focus:bg-white"
              >

                <option value="">
                  Select Level
                </option>

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>

              </select>

            </div>

            {/* MODE */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Mode
              </label>

              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-400 focus:bg-white"
              >

                <option value="">
                  Select Mode
                </option>

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

            {/* PRICE */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Price
              </label>

              <div className="relative">

                <IndianRupee className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter course price"
                  required
                  min="0"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-400 focus:bg-white"
                />

              </div>

            </div>

            {/* STATUS */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-400 focus:bg-white"
              >

                <option value="Active">
                  Active
                </option>

                <option value="Draft">
                  Draft
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Description
              </label>

              <div className="relative">

                <FileText className="absolute left-3 top-4 h-5 w-5 text-purple-400" />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter course description..."
                  rows="4"
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                />

              </div>

            </div>

            {/* SYLLABUS / TOPICS */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Syllabus / Lesson Topics (Optional - comma or line separated)
              </label>

              <div className="relative">

                <BookOpen className="absolute left-3 top-4 h-5 w-5 text-purple-400" />

                <textarea
                  name="syllabus"
                  value={formData.syllabus}
                  onChange={handleChange}
                  placeholder="e.g. Introduction to Course, Core Architecture, Advanced Concepts, Hands-on Exercises, Capstone Project..."
                  rows="3"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                />

              </div>

              <p className="mt-1 text-xs text-slate-400">
                Leave blank to automatically generate structured curriculum topics matching the course name.
              </p>

            </div>

            {/* COURSE IMAGE */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Thumbnail
              </label>

              <div className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 text-center transition hover:border-purple-300 hover:bg-purple-50">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">

                  <Image className="h-6 w-6 text-purple-600" />

                </div>

                <p className="text-sm font-semibold text-slate-700">
                  Upload course thumbnail
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG or JPEG
                </p>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="mt-4 text-sm"
                />

              </div>

            </div>

          </div>

          {/* FOOTER */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className={`flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 ${
                saving ? "cursor-not-allowed opacity-60" : ""
              }`}
            >

              <Save className="h-4 w-4" />

              {saving ? "Saving..." : "Save Course"}

            </button>

          </div>

        </div>

      </form>

    </div>
  );
};

export default AddCourse;