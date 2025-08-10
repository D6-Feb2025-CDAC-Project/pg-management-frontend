import React, { useEffect, useState } from "react";
import adminNoticeService from "../../../services/AdminNoticeService";
import { toast } from "react-toastify";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("PG Admin");
  const [type, setType] = useState("general");

  const [editingNotice, setEditingNotice] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editFrom, setEditFrom] = useState("PG Admin");
  const [editType, setEditType] = useState("general");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const fetchedNotices = await adminNoticeService.getFormattedNotices();
      setNotices(fetchedNotices);
    } catch (err) {
      console.error("Failed to fetch notices:", err);
      setError("Failed to fetch notices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNotice = async () => {
    if (!title.trim() || !message.trim()) {
      toast.warn("Both title and message are required");
      return;
    }

    const newNotice = {
      title: title.trim(),
      message: message.trim(),
      from,
      priorityLevel: type,
    };

    try {
      setLoading(true);
      await adminNoticeService.addNewNotice(newNotice);

      setTitle("");
      setMessage("");
      setFrom("PG Admin");
      setType("general");
      await fetchNotices();
      toast.success("Notice added successfully!");
    } catch (err) {
      console.error("Failed to add notice:", err);
      toast.error("Failed to add notice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      setLoading(true);
      await adminNoticeService.deleteNotice(noticeId);
      await fetchNotices();
      toast.success("Notice deleted successfully!");
    } catch (err) {
      console.error("Failed to delete notice:", err);
      toast.error("Failed to delete notice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditNotice = (notice) => {
    setEditingNotice(notice.id);
    setEditTitle(notice.title);
    setEditMessage(notice.message || notice.content);
    setEditFrom(notice.from);
    setEditType(notice.type);
  };

  const handleUpdateNotice = async (noticeId) => {
    if (!editTitle.trim() || !editMessage.trim()) {
      toast.warn("Both title and message are required");
      return;
    }

    const updateData = {
      title: editTitle.trim(),
      message: editMessage.trim(),
      from: editFrom,
      priorityLevel: editType,
    };

    try {
      setLoading(true);
      await adminNoticeService.updateNoticeDetails(noticeId, updateData);
      setEditingNotice(null);
      setEditTitle("");
      setEditMessage("");
      setEditFrom("PG Admin");
      setEditType("general");
      await fetchNotices();
      toast.success("Notice updated successfully!");
    } catch (err) {
      console.error("Failed to update notice:", err);
      toast.error("Failed to update notice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingNotice(null);
    setEditTitle("");
    setEditMessage("");
    setEditFrom("PG Admin");
    setEditType("general");
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const badgeColor = {
    urgent: "bg-red-600",
    important: "bg-yellow-400 text-black",
    general: "bg-gray-600",
  };

  return (
    <div className="min-h-screen p-6 bg-purple-200">
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">
        Admin Notice Board
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-purple-700 mb-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
          <p className="mt-2">Loading...</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Add New Notice
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <textarea
          placeholder="Message"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        ></textarea>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            disabled={loading}
          >
            <option value="PG Admin">PG Admin</option>
            <option value="PG Owner">PG Owner</option>
            <option value="Housekeeping Staff">Housekeeping Staff</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <div className="flex gap-4">
            {["urgent", "important", "general"].map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value={t}
                  checked={type === t}
                  onChange={(e) => setType(e.target.value)}
                  className="accent-purple-600"
                  disabled={loading}
                />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddNotice}
          disabled={loading || !title.trim() || !message.trim()}
          className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Notice"}
        </button>
      </div>

      {/* Notices List */}
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">
        Notices ({notices.length})
      </h2>

      {notices.length > 0
        ? notices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-sm ${
                notice.unread ? "ring-2 ring-green-400" : ""
              }`}
            >
              {editingNotice === notice.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    disabled={loading}
                  />
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    rows="3"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    disabled={loading}
                  />
                  <div className="flex gap-4">
                    <select
                      value={editFrom}
                      onChange={(e) => setEditFrom(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2"
                      disabled={loading}
                    >
                      <option value="PG Admin">PG Admin</option>
                      <option value="PG Owner">PG Owner</option>
                      <option value="Housekeeping Staff">
                        Housekeeping Staff
                      </option>
                    </select>
                    <div className="flex gap-2">
                      {["urgent", "important", "general"].map((t) => (
                        <label
                          key={t}
                          className="flex items-center gap-1 text-sm"
                        >
                          <input
                            type="radio"
                            value={t}
                            checked={editType === t}
                            onChange={(e) => setEditType(e.target.value)}
                            className="accent-blue-600"
                            disabled={loading}
                          />
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateNotice(notice.id)}
                      disabled={loading}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={loading}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {notice.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold text-white ${
                          badgeColor[notice.type]
                        }`}
                      >
                        {notice.type}
                      </span>
                      {notice.unread && (
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">
                          New
                        </span>
                      )}
                      <span>{notice.time}</span>
                      <button
                        onClick={() => handleEditNotice(notice)}
                        className="bg-blue-500 text-white px-2 py-0.5 rounded-full font-semibold hover:bg-blue-600"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
                        className="bg-red-500 text-white px-2 py-0.5 rounded-full font-semibold hover:bg-red-600"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-2">
                    {notice.content || notice.message}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>From: {notice.from}</span>
                    <div className="flex gap-4">
                      {notice.createdBy && (
                        <span>Created by: {notice.createdBy}</span>
                      )}
                      {notice.updatedBy &&
                        notice.updatedBy !== notice.createdBy && (
                          <span>Updated by: {notice.updatedBy}</span>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        : !loading && <p className="text-gray-700">No notices found.</p>}
    </div>
  );
};

export default Notices;
