import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import {
  FileText,
  Upload,
  X,
  CheckCircle,
} from "lucide-react";

import { addResource } from "../../services/resourceRepository";

const UploadNotes = () => {
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    category: "",
    trainer: "",
    description: "",
    status: "Published",
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select PDF file");
      return;
    }

    try {
      let fileURL = "";
      let storagePath = "";

      // PDF Upload to Firebase Storage
      try {
        const storageRef = ref(
          storage,
          `notes/${Date.now()}-${file.name}`
        );

        await uploadBytes(storageRef, file);
        fileURL = await getDownloadURL(storageRef);
        storagePath = storageRef.fullPath;
      } catch (storageError) {
        console.warn("Storage upload fallback:", storageError);
        fileURL = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => resolve(URL.createObjectURL(file));
          reader.readAsDataURL(file);
        });
      }

      // Add to unified resource repository (syncs with localStorage & attempts Firestore)
      await addResource({
        title: formData.title,
        course: formData.course,
        category: formData.category || "Study Notes",
        trainer: formData.trainer,
        description: formData.description,
        status: formData.status || "Published",
        type: "Notes",
        fileName: file.name,
        fileSize: file.size,
        fileUrl: fileURL,
        storagePath: storagePath,
        collectionName: "resources",
      });

      alert("Notes Uploaded Successfully");

      setFormData({
        title: "",
        course: "",
        category: "",
        trainer: "",
        description: "",
        status: "Published",
      });

      setFile(null);

    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload Failed: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-5 py-8 sm:px-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Upload Notes
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Upload PDF study materials for students.
        </p>
      </div>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
          <CheckCircle className="h-5 w-5" />
          {message}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        <div className="mt-7 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-semibold text-slate-900">
            Note Details
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Note Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter note title"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* COURSE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              >
                <option value="">Select Course</option>
                <option value="Full Stack Java Development">
                  Full Stack Java Development
                </option>
                <option value="React JS Development">
                  React JS Development
                </option>
                <option value="Java Programming">
                  Java Programming
                </option>
                <option value="Python Programming">
                  Python Programming
                </option>
              </select>
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              >
                <option value="">Select Category</option>
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="Database">Database</option>
                <option value="Interview Preparation">
                  Interview Preparation
                </option>
              </select>
            </div>

            {/* TRAINER */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Trainer
              </label>

              <select
                name="trainer"
                value={formData.trainer}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              >
                <option value="">Select Trainer</option>
                <option value="John David">John David</option>
                <option value="Priya Sharma">Priya Sharma</option>
                <option value="Arun Kumar">Arun Kumar</option>
                <option value="Meena Raj">Meena Raj</option>
              </select>
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter notes description..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

          </div>

          {/* FILE UPLOAD */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Upload PDF
            </label>

            {!file ? (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50 px-6 py-10 transition hover:border-purple-400 hover:bg-purple-100">

                <div className="rounded-full bg-purple-100 p-4">
                  <Upload className="h-7 w-7 text-purple-600" />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Click to upload PDF
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Only PDF files are allowed
                </p>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>
            ) : (
              <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-white p-2">
                    <FileText className="h-6 w-6 text-red-500" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100"
                >
                  <X className="h-5 w-5" />
                </button>

              </div>
            )}

          </div>

          {/* STATUS */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 md:w-1/2"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: "",
                  course: "",
                  category: "",
                  trainer: "",
                  description: "",
                  status: "Published",
                });
                setFile(null);
              }}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-purple-700"
            >
              Upload Notes
            </button>

          </div>

        </div>

      </form>

    </div>
  );
};

export default UploadNotes;
