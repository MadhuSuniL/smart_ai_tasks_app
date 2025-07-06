"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import apiCallWithToken from "../utils/Axios";
import Buffer from "@/components/ui/Buffer";
import { MdOutlineFileDownload } from "react-icons/md";

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [showImportExportModal, setShowImportExportModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ statuses: [], priorities: [], categories: [] });
  const [selectedFilter, setSelectedFilter] = useState({ status: "", priority: "", category: "" });

  const [importFile, setImportFile] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    priority: "medium",
    priority_score: 0.5,
    deadline: "",
  });

  const getTasks = () => {
    const url = "ai_tasks/tasks/";
    const method = "get";
    apiCallWithToken(
      url,
      {},
      method,
      setIsLoading,
      (data) => {
        setTasks(data);
        const uniqueStatuses = [...new Set(data.map((task) => task.status))];
        const uniquePriorities = [...new Set(data.map((task) => task.priority))];
        const uniqueCategories = [
          ...new Map(data.filter((t) => t.category).map((t) => [t.category.id, t.category])).values(),
        ];
        setFilterOptions({
          statuses: uniqueStatuses,
          priorities: uniquePriorities,
          categories: uniqueCategories,
        });
      },
      console.error
    );
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    if (selectedFilter.status) queryParams.append("status", selectedFilter.status);
    if (selectedFilter.priority) queryParams.append("priority", selectedFilter.priority);
    if (selectedFilter.category) queryParams.append("category", selectedFilter.category);

    const url = `ai_tasks/tasks/?${queryParams.toString()}`;
    apiCallWithToken(url, {}, "get", setIsLoading, setTasks, console.error);
  };

  const handleTaskSubmit = () => {
    const url = "ai_tasks/tasks/";
    const method = "post";
    const body = {
      ...newTask,
      tags: newTask.tags.split("-").map((tag) => tag.trim()),
    };
    const loadingState = setIsLoading;
    setShowModal(false);
    const onSuccess = (data) => {
      setNewTask({
        title: "",
        description: "",
        category: "",
        tags: "",
        priority: "medium",
        priority_score: 0.5,
        deadline: "",
      });
      getTasks();
      setExpandedTaskId(data.id);
    };

    apiCallWithToken(url, body, method, loadingState, onSuccess, null);
  };

  const handleImport = () => {
    if (!importFile) return;

    const formData = new FormData();
    formData.append("file", importFile);

    apiCallWithToken(
      "ai_tasks/tasks/import/csv/",
      formData,
      "post",
      setIsLoading,
      (res) => {
        console.log("Import success:", res);
        setShowImportExportModal(false);
        getTasks();
      },
      (err) => {
        console.error("Import error:", err);
      },
      true
    );
  };

  const handleExport = () => {
    apiCallWithToken(
      "ai_tasks/tasks/export/csv",
      {},
      "get",
      setIsLoading,
      (blobData) => {
        const blob = new Blob([blobData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "tasks.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      },
      (err) => console.error("Export failed", err),
      false,
      "blob" // custom type for responseType
    );
  };

  const handleTaskICSExport = (task) => {
    apiCallWithToken(
      `ai_tasks/tasks_ics/export/csv/${task.id}`,
      {},
      "get",
      setIsLoading,
      (blobData) => {
        const blob = new Blob([blobData], { type: "text/ics" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${task.title}.ics`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      },
      (err) => console.error("Export failed", err),
      false,
      "blob"
    );
  };

  useEffect(() => {
    getTasks();
  }, []);

  const toggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto py-8 px-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-pink-600">My Tasks</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilter(true)}
              className="border text-sm border-pink-400 hover:bg-pink-500/10 text-pink-400 font-medium px-2 py-1 rounded-full transition"
            >
              Filter
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 text-white font-semibold px-3 py-1 rounded-full shadow-md transition-all"
            >
              <span className="text-lg">+</span> New
            </button>
            <button
              onClick={() => setShowImportExportModal(true)}
              className="text-sm cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 text-white font-semibold px-3 py-1 rounded-full shadow-md transition-all"
            >
              <span className="text-lg">+</span> Import/Export
            </button>
          </div>
        </div>

        {/* Task List */}
        <Buffer isLoading={isLoading} message={"Loading Tasks .."}>
          <div className="space-y-4">
            {tasks.length === 0 && (
              <h1 className="text-center mt-20 text-sm text-gray-500">
                You dont have any tasks right now ...{" "}
              </h1>
            )}
            {tasks.map((task) => {
              const isOpen = expandedTaskId === task.id;
              return (
                <div
                  key={task.id}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg p-4 transition-all"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpand(task.id)}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                      <p className="text-xs text-pink-300 capitalize">
                        {task.priority} priority – {task.status}
                      </p>
                    </div>
                    {isOpen ? (
                      <LuChevronUp className="text-white text-xl transition-transform" />
                    ) : (
                      <LuChevronDown className="text-white text-xl transition-transform" />
                    )}
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 mt-4 border-t border-white/10 text-sm text-white/90 space-y-4"
                      >
                        <div>
                          <span className="block font-semibold text-white mb-1">📝 Description</span>
                          <p className="text-white/80">{task.description}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="block font-semibold text-white mb-1">📂 Category</span>
                            <p className="text-white/80">{task.category?.name || "Uncategorized"}</p>
                          </div>
                          <div>
                            <span className="block font-semibold text-white mb-1">⚙️ Status</span>
                            <p className="text-white/80 capitalize">{task.status}</p>
                          </div>
                          <div>
                            <span className="block font-semibold text-white mb-1">🗓️ Deadline</span>
                            <p className="text-white/80">
                              {task.deadline
                                ? new Date(task.deadline).toLocaleString("en-US", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })
                                : "Not set"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className="block font-semibold text-white mb-1">🏷️ Tags</span>
                          <div className="flex flex-wrap gap-2">
                            {task.tags?.length > 0 ? (
                              task.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 text-xs bg-pink-500/10 text-pink-300 border border-pink-500/30 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400 ml-2">No tags</span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <h6
                            onClick={() => handleTaskICSExport(task)}
                            className="text-sm cursor-pointer flex items-center gap-2 hover:text-pink-500 font-extrabold"
                          >
                            <MdOutlineFileDownload size={20} />
                            Download ICS
                          </h6>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Buffer>
        {/* Create Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-3xl shadow-xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-pink-600">Add New Task</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600"
                  >
                    Close ✖
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTaskSubmit();
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                    className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm"
                  />

                  <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm"
                    rows={3}
                  />

                  <input
                    type="text"
                    placeholder="Tags (separated by -)"
                    value={newTask.tags}
                    onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                    className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm"
                  />

                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={newTask.priority_score}
                    onChange={(e) => setNewTask({ ...newTask, priority_score: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Priority Score: <strong>{newTask.priority_score}</strong>
                  </p>

                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md transition"
                  >
                    Create Task
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Filter Modal */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl space-y-6"
              >
                <h3 className="text-xl font-bold text-center text-pink-600">Filter Tasks</h3>

                <div className="space-y-5">
                  {[
                    { label: "Status", key: "status", options: filterOptions.statuses },
                    { label: "Priority", key: "priority", options: filterOptions.priorities },
                    {
                      label: "Category",
                      key: "category",
                      options: filterOptions.categories.map((c) => ({ id: c.id, name: c.name })),
                    },
                  ].map(({ label, key, options }) => (
                    <div key={key}>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</p>
                      <div className="flex flex-wrap gap-2">
                        {(key === "category" ? options : options.map((v) => ({ id: v, name: v }))).map(
                          (opt) => (
                            <button
                              key={opt.id || opt.name}
                              onClick={() =>
                                setSelectedFilter({
                                  ...selectedFilter,
                                  [key]:
                                    selectedFilter[key] === (opt.id || opt.name) ? "" : opt.id || opt.name,
                                })
                              }
                              className={`px-3 py-1 rounded-full text-sm border transition-all
                      ${
                        selectedFilter[key] === (opt.id || opt.name)
                          ? "bg-pink-500 text-white border-pink-500"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                            >
                              {opt.name}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between gap-4 pt-4">
                  <button
                    onClick={() => setShowFilter(false)}
                    className="w-1/2 border border-gray-300 dark:border-gray-600 text-sm rounded-md py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      applyFilters();
                      setShowFilter(false);
                    }}
                    className="w-1/2 bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-md py-2"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Import Export Modal */}
        <AnimatePresence>
          {showImportExportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-3xl shadow-xl"
              >
                <div className="justify-between items-center mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-pink-600">Import / Export Tasks</h3>
                    <button
                      onClick={() => setShowImportExportModal(false)}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600"
                    >
                      Close ✖
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Export Section */}
                    <div className="border p-4 rounded-md dark:border-gray-700">
                      <h4 className="text-md font-semibold mb-2 text-pink-500">📤 Export Tasks</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Download your tasks as a CSV file.
                      </p>
                      <button
                        onClick={handleExport}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 text-sm rounded-md transition"
                      >
                        Export
                      </button>
                    </div>

                    {/* Import Section */}
                    <div className="border p-4 rounded-md dark:border-gray-700">
                      <h4 className="text-md font-semibold mb-2 text-pink-500">📥 Import Tasks</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Upload a CSV file with your task data.
                      </p>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => setImportFile(e.target.files[0])}
                        className="mb-3 block w-full text-sm text-gray-900 dark:text-white file:bg-pink-600 file:text-white file:rounded file:px-3 file:py-1.5 file:border-0 file:cursor-pointer"
                      />
                      <button
                        onClick={handleImport}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 text-sm rounded-md transition"
                      >
                        Import
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RequireAuth>
  );
}
