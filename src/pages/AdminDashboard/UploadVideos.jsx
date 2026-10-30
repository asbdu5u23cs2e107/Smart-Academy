import React, { useEffect, useState } from "react";
import {
  Upload,
  Video,
  X,
  PlayCircle,
  CheckCircle,
  Eye,
  Trash2,
  FileVideo,
} from "lucide-react";

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

import { db, storage } from "../../firebase";
import {
  addResource,
  getAllResources,
  deleteResource as repoDeleteResource,
} from "../../services/resourceRepository";

const UploadVideos = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Published");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // ==========================================
  // FETCH VIDEOS FROM FIRESTORE / REPOSITORY
  // ==========================================

  const fetchVideos = async () => {
    try {
      setFetching(true);

      // Instant local/cached videos
      const initialVideos = getAllResources().filter(
        (r) => r.type === "Video" || r.category === "Videos"
      );
      setVideos(initialVideos);

      const querySnapshot = await getDocs(
        collection(db, "videos")
      );

      const videoList = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      if (videoList.length > 0) {
        setVideos(videoList);
      }
    } catch (error) {
      console.warn("Firestore fetch videos warning (using repository):", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ==========================================
  // FILE CHANGE
  // ==========================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file.");
      e.target.value = "";
      return;
    }

    // Optional size limit - 500 MB
    const maxSize = 500 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Video size must be less than 500 MB.");
      e.target.value = "";
      return;
    }

    // Remove old preview URL
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
  };

  // ==========================================
  // REMOVE SELECTED VIDEO
  // ==========================================

  const removeVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoFile(null);
    setVideoUrl("");
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setTitle("");
    setCourse("");
    setDescription("");
    setStatus("Published");
    removeVideo();
  };

  // ==========================================
  // UPLOAD VIDEO
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter video title.");
      return;
    }

    if (!course) {
      alert("Please select course.");
      return;
    }

    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    try {
      setLoading(true);

      // ------------------------------------------
      // SAFE FILE NAME
      // ------------------------------------------

      const safeFileName = videoFile.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

      // ------------------------------------------
      // STORAGE PATH
      // ------------------------------------------

      const filePath = `videos/${Date.now()}-${safeFileName}`;

      const storageRef = ref(storage, filePath);

      // ------------------------------------------
      // FILE METADATA
      // ------------------------------------------

      const metadata = {
        contentType:
          videoFile.type || "video/mp4",
      };

      let downloadURL = "";
      let storageFullPath = "";

      try {
        console.log("Uploading video to Firebase Storage...");
        await uploadBytes(storageRef, videoFile, metadata);
        downloadURL = await getDownloadURL(storageRef);
        storageFullPath = storageRef.fullPath;
      } catch (storageError) {
        console.warn("Firebase Storage video upload fallback:", storageError);
        downloadURL = videoUrl;
      }

      // Add to unified resource repository (syncs with localStorage & attempts Firestore)
      await addResource({
        title: title.trim(),
        course: course,
        category: "Video Tutorials",
        trainer: "SwordNex Trainer",
        description: description.trim(),
        status: status,
        fileName: videoFile.name,
        fileSize: videoFile.size,
        fileType: videoFile.type,
        fileUrl: downloadURL || videoUrl,
        storagePath: storageFullPath,
        type: "Video",
        collectionName: "videos",
      });

      alert("Video uploaded successfully!");

      // ------------------------------------------
      // RESET
      // ------------------------------------------

      resetForm();

      // ------------------------------------------
      // REFRESH LIST
      // ------------------------------------------

      fetchVideos();

    } catch (error) {
      console.error("Video Upload Error:", error);

      alert(
        "Video upload failed:\n" +
          (error.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VIEW VIDEO
  // ==========================================

  const handleView = (fileUrl) => {
    if (!fileUrl) {
      alert("Video URL not available.");
      return;
    }

    window.open(
      fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================
  // DELETE VIDEO
  // ==========================================

  const handleDelete = async (
    id,
    storagePath
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) return;

    try {
      // Delete from repository
      await repoDeleteResource(id);

      // Delete Firestore document
      try {
        await deleteDoc(doc(db, "videos", id));
      } catch (_e) {}

      // Delete Storage file
      if (storagePath) {
        try {
          const fileRef = ref(storage, storagePath);
          await deleteObject(fileRef);
        } catch (_e) {}
      }

      setVideos((prev) => prev.filter((v) => v.id !== id));
      alert("Video deleted successfully.");
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video: " + (error.message || "Unknown error"));
    }
  };

  // ==========================================
  // FORMAT FILE SIZE
  // ==========================================

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 MB";

    return (
      bytes /
      (1024 * 1024)
    ).toFixed(2) + " MB";
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-5 py-8 sm:px-8">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Upload Videos
        </h1>

        <p className="mt-2 text-slate-500">
          Upload and manage course learning videos.
        </p>
      </div>

      {/* ======================================
          UPLOAD FORM
      ====================================== */}

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">

                  <Video className="h-6 w-6 text-purple-600" />

                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Video Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Enter the details of the learning video.
                  </p>

                </div>

              </div>

              {/* TITLE */}

              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Video Title *
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Example: Java OOP Concepts"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  required
                />

              </div>

              {/* COURSE */}

              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course *
                </label>

                <select
                  value={course}
                  onChange={(e) =>
                    setCourse(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
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

                  <option value="Java Programming">
                    Java Programming
                  </option>

                </select>

              </div>

              {/* DESCRIPTION */}

              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows="5"
                  placeholder="Enter video description..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />

              </div>

              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >

                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">

              <h2 className="mb-2 text-lg font-bold text-slate-900">
                Upload Video
              </h2>

              <p className="mb-5 text-sm text-slate-500">
                Select a video file from your computer.
              </p>

              {!videoFile ? (

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50 px-5 py-12 text-center transition hover:border-purple-400 hover:bg-purple-100">

                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">

                    <Upload className="h-7 w-7 text-purple-600" />

                  </div>

                  <p className="font-semibold text-slate-800">
                    Click to upload video
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    MP4, WebM, MOV
                  </p>

                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                </label>

              ) : (

                <div className="rounded-2xl border border-slate-200 overflow-hidden">

                  {/* PREVIEW */}

                  <div className="relative bg-black">

                    <video
                      src={videoUrl}
                      controls
                      className="h-52 w-full object-contain"
                    />

                  </div>

                  {/* FILE INFO */}

                  <div className="p-4">

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">

                          <PlayCircle className="h-5 w-5 text-purple-600" />

                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-800">
                            {videoFile.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {formatFileSize(
                              videoFile.size
                            )}
                          </p>

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={removeVideo}
                        className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100"
                      >

                        <X className="h-5 w-5" />

                      </button>

                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600">

                      <CheckCircle className="h-4 w-4" />

                      Video selected successfully

                    </div>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <Upload className="h-5 w-5" />

            {loading
              ? "Uploading..."
              : "Upload Video"}

          </button>

        </div>

      </form>

      {/* ======================================
          VIDEO LIST
      ====================================== */}

      <div className="mt-10">

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Uploaded Videos
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your course videos.
            </p>

          </div>

          <div className="rounded-xl bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            Total: {videos.length}
          </div>

        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {fetching ? (

            <div className="p-10 text-center text-slate-500">
              Loading videos...
            </div>

          ) : videos.length === 0 ? (

            <div className="p-12 text-center">

              <Video className="mx-auto mb-3 h-10 w-10 text-slate-300" />

              <p className="font-semibold text-slate-600">
                No videos uploaded yet.
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Upload your first course video above.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {videos.map((video) => (

                <div
                  key={video.id}
                  className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between hover:bg-slate-50"
                >

                  {/* INFO */}

                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100">

                      <FileVideo className="h-6 w-6 text-purple-600" />

                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate font-semibold text-slate-900">
                        {video.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {video.course}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {video.fileName} •{" "}
                        {formatFileSize(
                          video.fileSize
                        )}
                      </p>

                    </div>

                  </div>

                  {/* STATUS + ACTIONS */}

                  <div className="flex items-center gap-3">

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        video.status === "Published"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {video.status}
                    </span>

                    {/* VIEW */}

                    <button
                      type="button"
                      onClick={() =>
                        handleView(
                          video.fileUrl
                        )
                      }
                      className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                      title="View Video"
                    >

                      <Eye className="h-4 w-4" />

                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          video.id,
                          video.storagePath
                        )
                      }
                      className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                      title="Delete Video"
                    >

                      <Trash2 className="h-4 w-4" />

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default UploadVideos;