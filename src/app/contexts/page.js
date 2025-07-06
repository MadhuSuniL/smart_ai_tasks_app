"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import apiCallWithToken from "../utils/Axios";
import { AnimatePresence, motion } from "framer-motion";
import Buffer from "@/components/ui/Buffer";

export default function ContextsPage() {
  const [contexts, setContexts] = useState([]);
  const [selectedContext, setSelectedContext] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContext, setNewContext] = useState({ source_type: "whatsapp", content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const getContexts = () => {
    apiCallWithToken("ai_tasks/contexts/", {}, "get", null, (data) => setContexts(data), console.error);
  };

  useEffect(() => {
    getContexts();
  }, []);

  const handleSubmit = () => {
    apiCallWithToken(
      "ai_tasks/contexts/",
      newContext,
      "post",
      setIsLoading,
      () => {
        setShowAddModal(false);
        setNewContext({ source_type: "whatsapp", content: "" });
        getContexts();
      },
      console.error
    );
  };

  return (
    <RequireAuth>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-pink-600">Your Contexts</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-sm cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 text-white font-semibold px-3 py-1 rounded-full shadow-md transition-all"
          >
            + New
          </button>
        </div>

        <Buffer isLoading={isLoading} message={"Loading Contexts .."}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contexts.map((ctx) => (
              <div
                key={ctx.id}
                onClick={() => {
                  setSelectedContext(ctx);
                  setShowModal(true);
                }}
                className="cursor-pointer bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl p-4 shadow-md hover:shadow-pink-200 transition"
              >
                <div className="text-sm text-pink-400 font-semibold mb-2 capitalize">{ctx.source_type}</div>
                <p className="text-white text-sm line-clamp-2">
                  {ctx.content.length > 200 ? ctx.content.slice(0, 200) + "..." : ctx.content}
                </p>
              </div>
            ))}
          </div>
        </Buffer>

        {/* View Full Content Modal */}
        <AnimatePresence>
          {showModal && selectedContext && (
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
                className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-xl w-full max-h-96 overflow-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-pink-600 capitalize">
                    {selectedContext.source_type}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-pink-600"
                  >
                    ✖
                  </button>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {selectedContext.content}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Context Modal */}
        <AnimatePresence>
          {showAddModal && (
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
                className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-2xl w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-pink-600">Add New Context</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-pink-600"
                  >
                    ✖
                  </button>
                </div>

                <div className="flex gap-2 mb-4">
                  {["whatsapp", "email", "note"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewContext({ ...newContext, source_type: type })}
                      className={`px-3 py-1 rounded-full border text-sm capitalize transition-all
                        ${
                          newContext.source_type === type
                            ? "bg-pink-600 text-white border-pink-600"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={10}
                  value={newContext.content}
                  onChange={(e) => setNewContext({ ...newContext, content: e.target.value })}
                  placeholder="Enter your context content..."
                  className="w-full p-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-white"
                />

                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md"
                >
                  Submit
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RequireAuth>
  );
}
