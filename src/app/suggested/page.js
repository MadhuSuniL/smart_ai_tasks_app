"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import apiCallWithToken from "../utils/Axios";
import { ImSpinner9 } from "react-icons/im";

export default function SuggestedTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSuggestedTasks = () => {
    apiCallWithToken(
      "ai_tasks/ai_suggested_tasks/",
      {},
      "get",
      setIsLoading,
      (data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (data?.tasks && Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          setTasks([]); // fallback to empty array
        }
      },
      console.error
    );
  };

  const handleSaveSuggestedTasks = () => {
    if (!tasks.length) return;
    apiCallWithToken(
      "ai_tasks/save_ai_suggested_tasks/",
      { tasks },
      "post",
      setIsSaving,
      () => {
        setTasks([]);
      },
      console.error
    );
  };

  useEffect(() => {
    fetchSuggestedTasks();
  }, []);

  return (
    <RequireAuth>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-lg font-bold text-pink-600 mb-4">Suggested Tasks</h2>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <ImSpinner9 className="text-pink-500 text-4xl animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">🚫 No suggested tasks available.</p>
            <p>
              You might not have added any recent contexts. Please go back to the{" "}
              <a href="/contexts" className="text-pink-500 underline">
                Contexts Page
              </a>{" "}
              and add one.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white dark:text-white p-5 rounded-xl shadow-lg mb-6">
              <h3 className="text-lg font-semibold mb-1">✨ AutoAI Suggestions</h3>
              <p className="text-sm mb-2">
                Based on your recent contexts, our intelligent system has suggested these tasks.
              </p>
              <button
                onClick={handleSaveSuggestedTasks}
                disabled={isSaving}
                className="mt-2 bg-white text-pink-600 hover:bg-gray-100 dark:hover:bg-gray-300 font-semibold px-4 py-2 text-sm rounded-md shadow disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save All Tasks to Dashboard"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl p-4 shadow-md"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">{task.title}</h3>
                  <p className="text-sm text-white/80 mb-2">{task.description}</p>
                  <div className="text-xs text-white/60 mb-1">
                    <span className="capitalize">{task.priority}</span> priority – Score:{" "}
                    {task.priority_score}
                  </div>
                  <div className="text-xs text-white/60 mb-1">
                    Category: {task.category || "Uncategorized"}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded-full border border-pink-500/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </RequireAuth>
  );
}
