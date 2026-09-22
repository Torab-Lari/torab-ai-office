"use client";

import { useState } from "react";

export default function ManagerTestPage() {
  const [task, setTask] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function testManager() {
    if (!task.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/manager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task.trim(),
        }),
      });

      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));
    } catch {
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07090d] p-10 text-white">
      <div className="mx-auto max-w-2xl">

        <h1 className="text-2xl font-semibold">
          AI Manager Test
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Testing Torab AI Office orchestration.
        </p>

        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          className="mt-8 min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none"
        />

        <button
          onClick={testManager}
          disabled={loading}
          className="mt-4 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black disabled:opacity-50"
        >
          {loading ? "AI Manager Thinking..." : "Test AI Manager"}
        </button>

        {result && (
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-emerald-400">
            {result}
          </pre>
        )}

      </div>
    </main>
  );
}