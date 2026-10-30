import React, { useEffect, useState } from "react";

import {
  Plus,
  Search,
  Code2,
  Download,
  Edit,
  Trash2,
  X,
  Upload,
  FileCode2,
} from "lucide-react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { db, storage } from "../../firebase";
import {
  addResource,
  getAllResources,
  deleteResource as repoDeleteResource,
} from "../../services/resourceRepository";

const CodingFiles = () => {
  const [files, setFiles] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(false);

  const [form, setForm] = useState({
    title: "",
    language: "",
    category: "",
    description: "",
    file: null,
    status: "Published",
  });

  // ==========================================
  // FETCH CODING FILES
  // ==========================================

  const fetchCodingFiles = async () => {
    try {
      setFetching(true);

      // Instant local resources
      const initial = getAllResources()
        .filter((r) => r.type === "Code" || r.category === "Coding Files")
        .map((r) => ({
          id: r.id,
          title: r.title,
          language: r.subject || "JavaScript",
          category: r.category || "General",
          description: r.description,
          fileName: r.fileName,
          fileSize: r.fileSize,
          fileUrl: r.fileUrl,
          status: r.status,
          createdAt: r.createdAt,
        }));
      setFiles(initial);

      const querySnapshot = await getDocs(
        collection(db, "codingFiles")
      );

      const fileList = querySnapshot.docs.map(
        (item) => ({
          id: item.id,
          ...item.data(),
        })
      );

      if (fileList.length > 0) {
        setFiles(fileList);
      }
    } catch (error) {
      console.warn("Coding files Firestore warning (using repository):", error);
    } finally {
      setFetching(false);
    }
  };

  // ==========================================
  // LOAD ON PAGE OPEN
  // ==========================================

  useEffect(() => {
    fetchCodingFiles();
  }, []);

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setForm({
      title: "",
      language: "",
      category: "",
      description: "",
      file: null,
      status: "Published",
    });

    setEditId(null);
  };

  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, files: selectedFiles } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: selectedFiles
        ? selectedFiles[0]
        : value,
    }));
  };

  // ==========================================
  // FILE VALIDATION
  // ==========================================

  const validateFile = (file) => {
    if (!file) return true;

    const allowedExtensions = [
      ".zip",
      ".java",
      ".js",
      ".jsx",
      ".py",
      ".c",
      ".cpp",
      ".h",
      ".html",
      ".css",
      ".sql",
      ".json",
      ".txt",
    ];

    const fileName =
      file.name.toLowerCase();

    const validExtension =
      allowedExtensions.some((extension) =>
        fileName.endsWith(extension)
      );

    if (!validExtension) {
      alert(
        "Invalid file type.\n\nAllowed files:\nZIP, Java, JS, JSX, Python, C, C++, HTML, CSS, SQL, JSON, TXT"
      );

      return false;
    }

    // 100 MB maximum
    const maxSize =
      100 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        "File size must be less than 100 MB."
      );

      return false;
    }

    return true;
  };

  // ==========================================
  // UPLOAD FILE TO STORAGE
  // ==========================================

  const uploadCodingFile = async (file) => {
    const safeFileName = file.name.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );

    const filePath =
      `coding-files/${Date.now()}-${safeFileName}`;

    const storageRef = ref(
      storage,
      filePath
    );

    const metadata = {
      contentType:
        file.type ||
        "application/octet-stream",
    };

    await uploadBytes(
      storageRef,
      file,
      metadata
    );

    const downloadURL =
      await getDownloadURL(storageRef);

    return {
      downloadURL,
      storagePath: storageRef.fullPath,
    };
  };

  // ==========================================
  // SUBMIT - ADD / EDIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter file title.");
      return;
    }

    if (!form.language) {
      alert(
        "Please select programming language."
      );
      return;
    }

    if (!form.category) {
      alert("Please select category.");
      return;
    }

    if (!editId && !form.file) {
      alert("Please select a coding file.");
      return;
    }

    if (form.file && !validateFile(form.file)) {
      return;
    }

    try {
      setLoading(true);

      // ======================================
      // ADD NEW FILE
      // ======================================

      if (!editId) {
        let uploadResult = null;

        if (form.file) {
          uploadResult =
            await uploadCodingFile(
              form.file
            );
        }

        await addDoc(
          collection(db, "codingFiles"),
          {
            title: form.title.trim(),

            language: form.language,

            category: form.category,

            description:
              form.description.trim(),

            fileName:
              form.file?.name || "",

            fileSize:
              form.file?.size || 0,

            fileType:
              form.file?.type || "",

            fileUrl:
              uploadResult?.downloadURL || "",

            storagePath:
              uploadResult?.storagePath || "",

            status: form.status,

            createdAt:
              new Date().toISOString(),

            updatedAt:
              new Date().toISOString(),
          }
        );

        // Sync to unified repository
        await addResource({
          title: form.title.trim(),
          course: form.language || "Web Development",
          category: form.category || "Coding Files",
          trainer: "SwordNex Trainer",
          description: form.description.trim(),
          fileName: form.file?.name || "code.zip",
          fileSize: form.file?.size || 0,
          fileUrl: uploadResult?.downloadURL || (form.file ? URL.createObjectURL(form.file) : ""),
          storagePath: uploadResult?.storagePath || "",
          type: "Code",
          status: form.status,
          collectionName: "codingFiles",
        });

        alert(
          "Coding file uploaded successfully!"
        );
      }

      // ======================================
      // UPDATE EXISTING FILE
      // ======================================

      else {
        const existingFile =
          files.find(
            (item) => item.id === editId
          );

        if (!existingFile) {
          alert(
            "Coding file not found."
          );
          return;
        }

        let fileUrl =
          existingFile.fileUrl || "";

        let storagePath =
          existingFile.storagePath || "";

        let fileName =
          existingFile.fileName || "";

        let fileSize =
          existingFile.fileSize || 0;

        let fileType =
          existingFile.fileType || "";

        // ------------------------------------
        // NEW FILE SELECTED
        // ------------------------------------

        if (form.file) {
          // Upload new file
          const uploadResult =
            await uploadCodingFile(
              form.file
            );

          fileUrl =
            uploadResult.downloadURL;

          storagePath =
            uploadResult.storagePath;

          fileName =
            form.file.name;

          fileSize =
            form.file.size;

          fileType =
            form.file.type;

          // Delete old Storage file
          if (
            existingFile.storagePath
          ) {
            try {
              const oldFileRef =
                ref(
                  storage,
                  existingFile.storagePath
                );

              await deleteObject(
                oldFileRef
              );
            } catch (storageError) {
              console.warn(
                "Old file delete warning:",
                storageError
              );
            }
          }
        }

        // ------------------------------------
        // UPDATE FIRESTORE
        // ------------------------------------

        await updateDoc(
          doc(
            db,
            "codingFiles",
            editId
          ),
          {
            title:
              form.title.trim(),

            language:
              form.language,

            category:
              form.category,

            description:
              form.description.trim(),

            fileName,

            fileSize,

            fileType,

            fileUrl,

            storagePath,

            status:
              form.status,

            updatedAt:
              new Date().toISOString(),
          }
        );

        alert(
          "Coding file updated successfully!"
        );
      }

      // Refresh list
      await fetchCodingFiles();

      setShowModal(false);

      resetForm();

    } catch (error) {
      console.error(
        "Coding File Error:",
        error
      );

      alert(
        "Operation failed:\n" +
          (error.message ||
            "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (item) => {
    setEditId(item.id);

    setForm({
      title: item.title || "",
      language: item.language || "",
      category: item.category || "",
      description:
        item.description || "",
      file: null,
      status:
        item.status || "Published",
    });

    setShowModal(true);
  };

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const handleDownload = (item) => {
    if (!item.fileUrl) {
      alert(
        "File URL is not available."
      );
      return;
    }

    const link =
      document.createElement("a");

    link.href = item.fileUrl;

    link.target = "_blank";

    link.rel =
      "noopener noreferrer";

    link.download =
      item.fileName || "coding-file";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (
    id,
    storagePath
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this coding file?"
      );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      // --------------------------------------
      // DELETE FIRESTORE DOCUMENT
      // --------------------------------------

      await deleteDoc(
        doc(
          db,
          "codingFiles",
          id
        )
      );

      // --------------------------------------
      // DELETE STORAGE FILE
      // --------------------------------------

      if (storagePath) {
        try {
          const fileRef =
            ref(
              storage,
              storagePath
            );

          await deleteObject(
            fileRef
          );
        } catch (storageError) {
          console.warn(
            "Storage delete warning:",
            storageError
          );
        }
      }

      // --------------------------------------
      // UPDATE UI
      // --------------------------------------

      setFiles((prev) =>
        prev.filter(
          (item) =>
            item.id !== id
        )
      );

      alert(
        "Coding file deleted successfully!"
      );

    } catch (error) {
      console.error(
        "Delete Error:",
        error
      );

      alert(
        "Delete failed:\n" +
          (error.message ||
            "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FORMAT SIZE
  // ==========================================

  const formatFileSize = (bytes) => {
    if (!bytes) return "-";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(2)} MB`;
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredFiles =
    files.filter((item) =>
      `${item.title || ""} ${
        item.language || ""
      } ${item.category || ""}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-4 py-6 sm:px-6 lg:px-8">

      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">

              <Code2 className="h-6 w-6 text-purple-600" />

            </div>

            <div>

              <h1 className="text-2xl font-bold text-slate-900">
                Coding Files
              </h1>

              <p className="text-sm text-slate-500">
                Upload and manage coding practice files
              </p>

            </div>

          </div>

        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700"
        >

          <Plus className="h-5 w-5" />

          Add Coding File

        </button>

      </div>

      {/* SEARCH */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search coding files..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-purple-500 focus:bg-white"
          />

        </div>

      </div>

      {/* FILE LIST */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-50">

              <tr className="border-b border-slate-200">

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Coding File
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Language
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  File
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {fetching ? (

                <tr>

                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Loading coding files...
                  </td>

                </tr>

              ) : filteredFiles.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >

                    <FileCode2 className="mx-auto mb-3 h-10 w-10 text-slate-300" />

                    <p className="font-semibold text-slate-600">
                      No coding files found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Try another search or add a new coding file.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredFiles.map(
                  (item) => (

                    <tr
                      key={item.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-purple-50/30"
                    >

                      {/* TITLE */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">

                            <FileCode2 className="h-5 w-5 text-purple-600" />

                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              {item.title}
                            </p>

                            <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                              {item.description ||
                                "No description"}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* LANGUAGE */}

                      <td className="px-6 py-4">

                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                          {item.language}
                        </span>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.category}
                      </td>

                      {/* FILE */}

                      <td className="px-6 py-4">

                        <div>

                          <p className="max-w-[180px] truncate text-sm font-medium text-slate-700">
                            {item.fileName ||
                              "-"}
                          </p>

                          <p className="text-xs text-slate-400">
                            {formatFileSize(
                              item.fileSize
                            )}
                          </p>

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            item.status ===
                            "Published"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          {/* DOWNLOAD */}

                          <button
                            onClick={() =>
                              handleDownload(
                                item
                              )
                            }
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                            title="Download"
                          >

                            <Download className="h-4 w-4" />

                          </button>

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              handleEdit(
                                item
                              )
                            }
                            className="rounded-lg p-2 text-purple-600 transition hover:bg-purple-50"
                            title="Edit"
                          >

                            <Edit className="h-4 w-4" />

                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(
                                item.id,
                                item.storagePath
                              )
                            }
                            disabled={loading}
                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                            title="Delete"
                          >

                            <Trash2 className="h-4 w-4" />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">

                  {editId
                    ? "Edit Coding File"
                    : "Add Coding File"}

                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add coding resources for students
                </p>

              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >

                <X className="h-5 w-5" />

              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* TITLE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  File Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter coding file title"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                  required
                />

              </div>

              {/* LANGUAGE + CATEGORY */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Programming Language *
                  </label>

                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                    required
                  >

                    <option value="">
                      Select Language
                    </option>

                    <option value="Java">
                      Java
                    </option>

                    <option value="JavaScript">
                      JavaScript
                    </option>

                    <option value="Python">
                      Python
                    </option>

                    <option value="C">
                      C
                    </option>

                    <option value="C++">
                      C++
                    </option>

                    <option value="HTML/CSS">
                      HTML/CSS
                    </option>

                    <option value="SQL">
                      SQL
                    </option>

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category *
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                    required
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option value="Java">
                      Java
                    </option>

                    <option value="Web Development">
                      Web Development
                    </option>

                    <option value="Database">
                      Database
                    </option>

                    <option value="Python">
                      Python
                    </option>

                    <option value="Programming">
                      Programming
                    </option>

                  </select>

                </div>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter description"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                />

              </div>

              {/* FILE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Coding File{" "}
                  {editId
                    ? "(Optional)"
                    : "*"}
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/50 px-6 py-8 transition hover:bg-purple-50">

                  <Upload className="mb-3 h-8 w-8 text-purple-600" />

                  <span className="text-sm font-semibold text-slate-700">
                    Click to upload coding file
                  </span>

                  <span className="mt-1 text-xs text-slate-500">
                    ZIP, Java, JS, JSX, Python, C, C++, HTML, CSS, SQL
                  </span>

                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="hidden"
                  />

                </label>

                {form.file && (

                  <p className="mt-2 text-sm text-purple-600">
                    Selected:{" "}
                    {form.file.name}
                  </p>

                )}

                {editId &&
                  !form.file && (

                    <p className="mt-2 text-xs text-slate-400">
                      Leave empty to keep the existing file.
                    </p>

                  )}

              </div>

              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
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

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <Upload className="h-4 w-4" />

                  {loading
                    ? editId
                      ? "Updating..."
                      : "Uploading..."
                    : editId
                    ? "Update File"
                    : "Upload File"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default CodingFiles;