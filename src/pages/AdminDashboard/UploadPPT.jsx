import React, { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  Upload,
  Presentation,
  Eye,
  Pencil,
  Trash2,
  X,
  FileText,
} from "lucide-react";

import { db, storage } from "../../firebase";
import {
  addResource,
  getAllResources,
  deleteResource as repoDeleteResource,
} from "../../services/resourceRepository";

const UploadPPT = () => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    category: "",
    trainer: "",
    description: "",
    status: "Published",
  });

  const [pptFile, setPptFile] = useState(null);

  const [presentations, setPresentations] = useState([]);

  const [loading, setLoading] = useState(false);

  // ===============================
  // LOAD PPTs FROM REPOSITORY / FIRESTORE
  // ===============================

  const fetchPresentations = async () => {
    try {
      // Instant local/cached presentations
      const initialList = getAllResources().filter(
        (r) => r.type === "PPT" || r.category === "PPT Files"
      );
      setPresentations(initialList);

      const querySnapshot = await getDocs(
        collection(db, "ppts")
      );

      const pptList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (pptList.length > 0) {
        setPresentations(pptList);
      }
    } catch (error) {
      console.warn("Error fetching PPTs from Firestore (using repository):", error);
    }
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  // ===============================
  // INPUT CHANGE
  // ===============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // FILE CHANGE
  // ===============================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPptFile(file);
    }
  };

  // ===============================
  // UPLOAD PPT
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pptFile) {
      alert("Please Select PPT File");
      return;
    }

    if (!formData.title.trim()) {
      alert("Please enter PPT title");
      return;
    }

    if (!formData.course) {
      alert("Please select course");
      return;
    }

    try {
      setLoading(true);

      let downloadURL = "";
      let storageFullPath = "";

      try {
        const storageRef = ref(
          storage,
          `ppts/${Date.now()}-${pptFile.name}`
        );
        await uploadBytes(storageRef, pptFile);
        downloadURL = await getDownloadURL(storageRef);
        storageFullPath = storageRef.fullPath;
      } catch (storageError) {
        console.warn("Storage upload fallback for PPT:", storageError);
        downloadURL = URL.createObjectURL(pptFile);
      }

      // Add to unified resource repository (syncs with localStorage & attempts Firestore)
      await addResource({
        title: formData.title,
        course: formData.course,
        category: formData.category || "PPT Files",
        trainer: formData.trainer,
        description: formData.description,
        status: formData.status || "Published",
        type: "PPT",
        fileName: pptFile.name,
        fileSize: pptFile.size,
        fileUrl: downloadURL || URL.createObjectURL(pptFile),
        storagePath: storageFullPath,
        collectionName: "ppts",
      });

      alert("PPT Uploaded Successfully");

      // Reset form
      setFormData({
        title: "",
        course: "",
        category: "",
        trainer: "",
        description: "",
        status: "Published",
      });

      setPptFile(null);

      setShowForm(false);

      // Reload PPT list

      fetchPresentations();
    } catch (error) {
      console.error("Upload Error:", error);

      alert(
        "Upload Failed: " +
          (error.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // DELETE PPT
  // ===============================

  const handleDelete = async (
    id,
    storagePath
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this PPT?"
    );

    if (!confirmDelete) return;

    try {
      // Delete from repository
      await repoDeleteResource(id);

      // Delete Firestore document
      try {
        await deleteDoc(doc(db, "ppts", id));
      } catch (_e) {}

      // Delete Storage file
      if (storagePath) {
        try {
          const fileRef = ref(storage, storagePath);
          await deleteObject(fileRef);
        } catch (storageError) {
          console.log("Storage delete warning:", storageError);
        }
      }

      // Update UI
      setPresentations((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("PPT Deleted Successfully");
    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        "Delete Failed: " +
          (error.message || "Unknown error")
      );
    }
  };

  // ===============================
  // VIEW PPT
  // ===============================

  const handleView = (fileUrl) => {
    if (!fileUrl) {
      alert("PPT file URL not available");
      return;
    }

    window.open(
      fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-6 md:p-8">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Upload PPT
          </h1>

          <p className="mt-2 text-slate-500">
            Upload and manage course presentation files.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-white font-semibold hover:bg-purple-700 transition"
        >
          <Upload className="w-5 h-5" />
          Upload PPT
        </button>

      </div>

      {/* STAT CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* TOTAL */}

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

          <p className="text-sm text-slate-500">
            Total PPTs
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {presentations.length}
          </h2>

        </div>

        {/* PUBLISHED */}

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

          <p className="text-sm text-slate-500">
            Published
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {
              presentations.filter(
                (item) =>
                  item.status === "Published"
              ).length
            }
          </h2>

        </div>

        {/* DRAFTS */}

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

          <p className="text-sm text-slate-500">
            Drafts
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {
              presentations.filter(
                (item) =>
                  item.status === "Draft"
              ).length
            }
          </h2>

        </div>

        {/* COURSES */}

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

          <p className="text-sm text-slate-500">
            Courses
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {
              new Set(
                presentations
                  .map((item) => item.course)
                  .filter(Boolean)
              ).size
            }
          </h2>

        </div>

      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">

        <input
          type="text"
          placeholder="Search PPT, course or trainer..."
          className="w-full md:w-1/2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-purple-500"
        />

      </div>

      {/* PPT TABLE */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-50">

              <tr className="text-left text-sm text-slate-600">

                <th className="px-6 py-4">
                  PRESENTATION
                </th>

                <th className="px-6 py-4">
                  COURSE
                </th>

                <th className="px-6 py-4">
                  TRAINER
                </th>

                <th className="px-6 py-4">
                  FILE
                </th>

                <th className="px-6 py-4">
                  STATUS
                </th>

                <th className="px-6 py-4 text-center">
                  ACTIONS
                </th>

              </tr>

            </thead>

            <tbody>

              {presentations.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No PPTs uploaded yet.
                  </td>

                </tr>

              ) : (

                presentations.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >

                    {/* PRESENTATION */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">

                          <Presentation className="w-5 h-5 text-purple-600" />

                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {item.title}
                          </p>

                          <p className="text-xs text-slate-400">
                            PPT-{item.id.slice(0, 6)}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* COURSE */}

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {item.course || "-"}
                    </td>

                    {/* TRAINER */}

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {item.trainer || "-"}
                    </td>

                    {/* FILE */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm text-slate-600">

                        <FileText className="w-4 h-4 text-purple-500" />

                        <span className="max-w-[180px] truncate">
                          {item.fileName || "-"}
                        </span>

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          item.status === "Published"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-2">

                        {/* VIEW */}

                        <button
                          onClick={() =>
                            handleView(
                              item.fileUrl
                            )
                          }
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                          title="View PPT"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* EDIT */}

                        <button
                          className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100"
                          title="Edit PPT"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(
                              item.id,
                              item.storagePath
                            )
                          }
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          title="Delete PPT"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* UPLOAD MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Upload New PPT
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add a presentation to a course.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* TITLE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  PPT Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter PPT title"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                  required
                />

              </div>

              {/* COURSE + TRAINER */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* COURSE */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Course *
                  </label>

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white outline-none focus:border-purple-500"
                    required
                  >

                    <option value="">
                      Select Course
                    </option>

                    <option value="Full Stack Java Development">
                      Full Stack Java Development
                    </option>

                    <option value="React JS Development">
                      React JS Development
                    </option>

                    <option value="Python Programming">
                      Python Programming
                    </option>

                    <option value="SQL Development">
                      SQL Development
                    </option>

                  </select>

                </div>

                {/* TRAINER */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Trainer
                  </label>

                  <select
                    name="trainer"
                    value={formData.trainer}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white outline-none focus:border-purple-500"
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

                    <option value="Meena Raj">
                      Meena Raj
                    </option>

                  </select>

                </div>

              </div>

              {/* CATEGORY */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Example: Java, React, SQL"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter PPT description"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 resize-none"
                />

              </div>

              {/* FILE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  PPT File *
                </label>

                <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-2xl p-8 bg-purple-50 cursor-pointer hover:bg-purple-100 transition">

                  <Presentation className="w-10 h-10 text-purple-600 mb-3" />

                  <p className="font-semibold text-slate-700">

                    {pptFile
                      ? pptFile.name
                      : "Click to upload PPT"}

                  </p>

                  <p className="text-xs text-slate-500 mt-2">
                    PPT, PPTX
                  </p>

                  <input
                    type="file"
                    accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    onChange={handleFileChange}
                    className="hidden"
                    required={!pptFile}
                  />

                </label>

              </div>

              {/* STATUS */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white outline-none focus:border-purple-500"
                >

                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>

                </select>

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
                >

                  <Upload className="w-5 h-5" />

                  {loading
                    ? "Uploading..."
                    : "Upload PPT"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default UploadPPT;