import React, { useEffect, useState } from "react";
import {
  Search,
  FileText,
  Video,
  Presentation,
  Code2,
  Download,
  Trash2,
  Eye,
  Filter,
  X,
} from "lucide-react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  ref,
  deleteObject,
} from "firebase/storage";

import { db, storage } from "../../firebase";
import {
  getAllResources,
  fetchRemoteResources,
  subscribeResources,
  deleteResource as repoDeleteResource,
} from "../../services/resourceRepository";

const mapRepoResource = (item) => ({
  id: item.id,
  resourceId: item.id,
  title: item.title,
  type: item.type === "PDF" ? "Notes" : item.type,
  category: item.category || item.course || "Study Materials",
  course: item.course || "-",
  description: item.description || "",
  uploadedBy: item.uploadedBy || item.trainer || "Admin Officer",
  date: item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-",
  status: item.status || "Published",
  file: item.fileName || item.title || "File",
  fileUrl: item.fileUrl || "",
  storagePath: item.storagePath || "",
  collectionName:
    item.collectionName ||
    (item.type === "Video"
      ? "videos"
      : item.type === "PPT"
      ? "ppts"
      : "resources"),
});

const ManageResources = () => {
  const [resources, setResources] = useState([]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [viewResource, setViewResource] = useState(null);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH ALL RESOURCES
  // =====================================================

  const fetchResources = async () => {
    try {
      setLoading(true);

      // Instant local/cached resources
      const initial = getAllResources().map(mapRepoResource);
      setResources(initial);

      // Background remote fetch
      try {
        const remoteItems = await fetchRemoteResources();
        if (Array.isArray(remoteItems) && remoteItems.length > 0) {
          setResources(remoteItems.map(mapRepoResource));
        }
      } catch (_e) {
        // logged by repository
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA & SUBSCRIBE
  // =====================================================

  useEffect(() => {
    fetchResources();

    const unsub = subscribeResources((updated) => {
      setResources(updated.map(mapRepoResource));
    });

    return () => unsub();
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredResources = resources.filter(
    (resource) => {
      const searchText =
        search.toLowerCase();

      const searchMatch =
        resource.title
          .toLowerCase()
          .includes(searchText) ||

        resource.category
          .toLowerCase()
          .includes(searchText) ||

        resource.type
          .toLowerCase()
          .includes(searchText) ||

        resource.course
          .toLowerCase()
          .includes(searchText) ||

        resource.file
          .toLowerCase()
          .includes(searchText);

      const typeMatch =
        typeFilter === "All" ||
        resource.type === typeFilter;

      const statusMatch =
        statusFilter === "All" ||
        resource.status === statusFilter;

      return (
        searchMatch &&
        typeMatch &&
        statusMatch
      );
    }
  );

  // =====================================================
  // ICON
  // =====================================================

  const getIcon = (type) => {
    switch (type) {
      case "Video":
        return (
          <Video className="h-5 w-5 text-red-500" />
        );

      case "PPT":
        return (
          <Presentation className="h-5 w-5 text-orange-500" />
        );

      case "Coding File":
        return (
          <Code2 className="h-5 w-5 text-blue-500" />
        );

      default:
        return (
          <FileText className="h-5 w-5 text-purple-500" />
        );
    }
  };

  // =====================================================
  // ICON BACKGROUND
  // =====================================================

  const getIconBg = (type) => {
    switch (type) {
      case "Video":
        return "bg-red-50";

      case "PPT":
        return "bg-orange-50";

      case "Coding File":
        return "bg-blue-50";

      default:
        return "bg-purple-50";
    }
  };

  // =====================================================
  // VIEW
  // =====================================================

  const handleView = (resource) => {
    if (!resource.fileUrl) {
      alert("File URL not available.");
      return;
    }

    window.open(
      resource.fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================================
  // DOWNLOAD
  // =====================================================

  const handleDownload = async (resource) => {
    if (!resource.fileUrl) {
      alert("File URL not available.");
      return;
    }

    try {
      const response = await fetch(
        resource.fileUrl
      );

      const blob = await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        resource.file ||
        resource.title;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(
        "Download Error:",
        error
      );

      // Fallback
      window.open(
        resource.fileUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (resource) => {
    const confirmDelete =
      window.confirm(
        `Are you sure you want to delete "${resource.title}"?`
      );

    if (!confirmDelete) return;

    try {
      // -----------------------------
      // DELETE FROM REPOSITORY
      // -----------------------------
      await repoDeleteResource(resource.id || resource.resourceId);

      // -----------------------------
      // DELETE FIRESTORE
      // -----------------------------
      try {
        await deleteDoc(
          doc(
            db,
            resource.collectionName || "resources",
            resource.resourceId || resource.id
          )
        );
      } catch (_e) {}

      // -----------------------------
      // DELETE STORAGE FILE
      // -----------------------------
      if (resource.storagePath) {
        try {
          const fileRef = ref(
            storage,
            resource.storagePath
          );
          await deleteObject(fileRef);
        } catch (storageError) {
          console.warn(
            "Storage delete warning:",
            storageError
          );
        }
      }

      // -----------------------------
      // UPDATE UI
      // -----------------------------
      setResources((prev) =>
        prev.filter(
          (item) =>
            item.id !== resource.id &&
            item.resourceId !== resource.resourceId
        )
      );

      // Close modal
      setViewResource(null);

      alert(
        "Resource deleted successfully."
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
    }
  };

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalResources =
    resources.length;

  const totalVideos =
    resources.filter(
      (r) => r.type === "Video"
    ).length;

  const totalNotes =
    resources.filter(
      (r) =>
        r.type === "Notes" ||
        r.type === "PDF"
    ).length;

  const totalPublished =
    resources.filter(
      (r) => r.status === "Published"
    ).length;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-4 py-6 sm:px-6 lg:px-8">

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-900">
          Manage Resources
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View, manage and organize all
          learning resources
        </p>

      </div>

      {/* STAT CARDS */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Total Resources
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalResources}
          </p>

        </div>

        {/* VIDEOS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Videos
          </p>

          <p className="mt-2 text-2xl font-bold text-red-500">
            {totalVideos}
          </p>

        </div>

        {/* NOTES */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Notes / PDFs
          </p>

          <p className="mt-2 text-2xl font-bold text-purple-600">
            {totalNotes}
          </p>

        </div>

        {/* PUBLISHED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Published
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {totalPublished}
          </p>

        </div>

      </div>

      {/* FILTER */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="grid gap-4 md:grid-cols-3">

          {/* SEARCH */}

          <div className="relative">

            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search resources..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-purple-500 focus:bg-white"
            />

          </div>

          {/* TYPE */}

          <div className="relative">

            <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-500"
            >

              <option value="All">
                All Resource Types
              </option>

              <option value="Notes">
                Notes
              </option>

              <option value="Video">
                Video
              </option>

              <option value="PPT">
                PPT
              </option>

              <option value="PDF">
                PDF
              </option>

              <option value="Coding File">
                Coding File
              </option>

            </select>

          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500"
          >

            <option value="All">
              All Status
            </option>

            <option value="Published">
              Published
            </option>

            <option value="Draft">
              Draft
            </option>

          </select>

        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-slate-50">

              <tr className="border-b border-slate-200">

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Resource
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Uploaded By
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Date
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

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-14 text-center"
                  >

                    <p className="font-semibold text-slate-600">
                      Loading resources...
                    </p>

                  </td>

                </tr>

              ) : filteredResources.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-14 text-center"
                  >

                    <FileText className="mx-auto mb-3 h-10 w-10 text-slate-300" />

                    <p className="font-semibold text-slate-600">
                      No resources found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Upload a video, PPT or
                      notes to see them here.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredResources.map(
                  (resource) => (

                    <tr
                      key={`${resource.collectionName}-${resource.resourceId}`}
                      className="border-b border-slate-100 last:border-0 hover:bg-purple-50/30"
                    >

                      {/* RESOURCE */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${getIconBg(
                              resource.type
                            )}`}
                          >
                            {getIcon(
                              resource.type
                            )}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate font-semibold text-slate-900">
                              {resource.title}
                            </p>

                            <p className="mt-1 max-w-[300px] truncate text-xs text-slate-500">
                              {resource.description ||
                                resource.file}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* TYPE */}

                      <td className="px-6 py-4">

                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                          {resource.type}
                        </span>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-6 py-4">

                        <div>

                          <p className="text-sm text-slate-600">
                            {resource.category}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {resource.course}
                          </p>

                        </div>

                      </td>

                      {/* UPLOADED BY */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {resource.uploadedBy}
                      </td>

                      {/* DATE */}

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {resource.date}
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            resource.status ===
                            "Published"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {resource.status}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          {/* VIEW */}

                          <button
                            onClick={() =>
                              handleView(
                                resource
                              )
                            }
                            title="View"
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* DOWNLOAD */}

                          <button
                            onClick={() =>
                              handleDownload(
                                resource
                              )
                            }
                            title="Download"
                            className="rounded-lg p-2 text-purple-600 transition hover:bg-purple-50"
                          >
                            <Download className="h-4 w-4" />
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(
                                resource
                              )
                            }
                            title="Delete"
                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
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

      {/* =================================================
          VIEW MODAL
      ================================================= */}

      {viewResource && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() =>
            setViewResource(null)
          }
        >

          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div className="flex items-center gap-3">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${getIconBg(
                    viewResource.type
                  )}`}
                >
                  {getIcon(
                    viewResource.type
                  )}
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Resource Details
                  </h2>

                  <p className="text-xs text-slate-500">
                    View resource information
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setViewResource(null)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* DETAILS */}

            <div className="space-y-5 p-6">

              <div>

                <p className="text-xs font-semibold uppercase text-slate-400">
                  Title
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {viewResource.title}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div>

                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Type
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {viewResource.type}
                  </p>

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {viewResource.category}
                  </p>

                </div>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase text-slate-400">
                  Course
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {viewResource.course}
                </p>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase text-slate-400">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {viewResource.description ||
                    "No description available."}
                </p>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase text-slate-400">
                  File
                </p>

                <p className="mt-1 break-all text-sm font-medium text-purple-600">
                  {viewResource.file}
                </p>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase text-slate-400">
                  Uploaded By
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {viewResource.uploadedBy}
                </p>

              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  onClick={() =>
                    handleDownload(
                      viewResource
                    )
                  }
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
                >

                  <Download className="h-4 w-4" />

                  Download

                </button>

                <button
                  onClick={() =>
                    setViewResource(null)
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ManageResources;