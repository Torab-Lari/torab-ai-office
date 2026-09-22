"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const agents = [
  {
    name: "AI Manager",
    role: "Orchestrator",
    icon: "✦",
    description: "Coordinates tasks and manages the AI workforce.",
  },
  {
    name: "Claude",
    role: "Developer",
    icon: "⌘",
    description: "Handles coding, development, and technical tasks.",
  },
  {
    name: "Gemini",
    role: "Creative Director",
    icon: "✧",
    description: "Creates ideas, designs, and creative strategies.",
  },
  {
    name: "Research Agent",
    role: "Research Analyst",
    icon: "⌕",
    description: "Researches information and generates insights.",
  },
];

const STORAGE_KEY = "torab_tasks";

type StoredTask = {
  title: string;
  status: string;
  agent: string;
};

const DEFAULT_TASKS: StoredTask[] = [
  { title: "Build the Torab AI Office dashboard", status: "Pending", agent: "AI Manager" },
  { title: "Research AI automation opportunities", status: "Pending", agent: "AI Manager" },
];

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<StoredTask[]>(DEFAULT_TASKS);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  // Runs once on mount, client-side only.
  useEffect(() => {
    setMounted(true);

    // Load persisted tasks (falls back to defaults if nothing saved yet).
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
        }
      } else {
        // First visit: seed storage with the defaults so they persist too.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
      }
    } catch (err) {
      console.error("Failed to load tasks from localStorage:", err);
    }

    // Start the clock only on the client, after mount, to avoid
    // server/client HTML mismatches (hydration errors).
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = time ? time.getHours() : null;

  const greeting =
    hour === null
      ? "Welcome"
      : hour >= 5 && hour < 12
      ? "Good Morning"
      : hour >= 12 && hour < 17
      ? "Good Afternoon"
      : hour >= 17 && hour < 21
      ? "Good Evening"
      : "Good Night";

  function persistTasks(updated: StoredTask[]) {
    setTasks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save tasks to localStorage:", err);
    }
  }

  function addTask() {
    if (!task.trim()) return;

    const newTask: StoredTask = {
      title: task.trim(),
      status: "Pending",
      agent: "AI Manager",
    };

    persistTasks([newTask, ...tasks]);
    setTask("");
  }

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0a0d12] p-5 md:flex md:flex-col">
          <div className="mb-10">
            <h1 className="text-xl font-bold">
              Torab <span className="text-blue-400">AI Office</span>
            </h1>
            <p className="mt-1 text-xs text-gray-500">Intelligent workspace</p>
          </div>

          <nav className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white"
            >
              <span>⌂</span>
              Dashboard
            </Link>

            <Link
              href="/tasks"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <span>▣</span>
              Tasks
            </Link>

            <Link
              href="/team"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <span>◈</span>
              AI Team
            </Link>

            <Link
              href="/reports"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <span>▤</span>
              Reports
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <span>⚙</span>
              Settings
            </Link>
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-gray-500">Workspace</p>
            <p className="mt-1 text-sm font-medium">Torab Labs</p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-gray-400">System Online</span>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <section className="flex-1">
          <header className="border-b border-white/10 px-6 py-5 md:px-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-gray-500">Torab AI Office</p>
                <h2 className="mt-1 text-2xl font-semibold">{greeting}, CEO.</h2>
              </div>

              <div className="md:text-right">
                <p className="text-xl font-semibold">
                  {mounted && time ? time.toLocaleTimeString("en-IN") : "--:--:--"}
                </p>

                <p className="text-xs text-gray-500">
                  {mounted && time
                    ? time.toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
            </div>
          </header>

          <div className="p-6 md:p-10">
            {/* COMMAND CENTER */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    ✦
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Command Center</h2>
                    <p className="text-sm text-gray-500">Give your AI workforce a task.</p>
                  </div>
                </div>
              </div>

              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addTask();
                  }
                }}
                placeholder="Example: Research AI automation opportunities for my business..."
                className="min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm outline-none placeholder:text-gray-600 focus:border-blue-500/50"
              />

              <div className="mt-4 flex justify-end">
                <button
                  onClick={addTask}
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-gray-200"
                >
                  Start Task →
                </button>
              </div>
            </div>

            {/* STATS */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Stat title="AI Agents" value="04" subtitle="All systems operational" />

              <Stat
                title="Tasks"
                value={tasks.length.toString().padStart(2, "0")}
                subtitle="Managed by AI Office"
              />

              <Stat title="System" value="Online" subtitle="Everything is running" />
            </div>

            {/* AI TEAM */}
            <div className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-lg font-semibold">AI Workforce</h2>
                  <p className="text-sm text-gray-500">Your virtual team.</p>
                </div>

                <Link href="/team" className="text-sm text-gray-500 hover:text-white">
                  View team →
                </Link>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {agents.map((agent) => (
                  <div
                    key={agent.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                        {agent.icon}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Online
                      </div>
                    </div>

                    <h3 className="mt-5 font-medium">{agent.name}</h3>
                    <p className="mt-1 text-xs text-blue-400">{agent.role}</p>
                    <p className="mt-3 text-xs leading-5 text-gray-500">{agent.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT TASKS */}
            <div className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Recent Tasks</h2>
                  <p className="text-sm text-gray-500">Latest AI workforce activity.</p>
                </div>

                <Link href="/tasks" className="text-sm text-gray-500 hover:text-white">
                  View all →
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {tasks.slice(0, 4).map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-xs text-gray-400">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="mt-1 text-xs text-gray-600">{item.agent}</p>
                      </div>
                    </div>

                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-gray-600">
              Torab AI Office · V1
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}