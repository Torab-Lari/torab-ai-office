"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Task = {
  title: string;
  status: string;
  agent: string;
};

const defaultTasks: Task[] = [
  {
    title: "Build the Torab AI Office dashboard",
    status: "Completed",
    agent: "AI Manager",
  },
  {
    title: "Research AI automation opportunities",
    status: "In Progress",
    agent: "Research Agent",
  },
  {
    title: "Design the AI Team workspace",
    status: "Pending",
    agent: "Gemini",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  useEffect(() => {
    const savedTasks = localStorage.getItem("torab_tasks");

    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      } catch {
        console.log("Could not load saved tasks.");
      }
    }
  }, []);

  const totalTasks = tasks.length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <PageLayout
      active="tasks"
      title="Tasks"
      subtitle="Manage your AI workforce tasks."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Stat
          title="Total Tasks"
          value={totalTasks.toString().padStart(2, "0")}
        />

        <Stat
          title="In Progress"
          value={inProgress.toString().padStart(2, "0")}
        />

        <Stat
          title="Completed"
          value={completed.toString().padStart(2, "0")}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold">
          All Tasks
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Monitor your team's current work.
        </p>

        <div className="mt-5 space-y-3">
          {tasks.map((task, index) => (
            <div
              key={`${task.title}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-medium">
                    {task.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500">
                    Assigned to {task.agent}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs ${
                    task.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : task.status === "In Progress"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function PageLayout({
  children,
  active,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  active: string;
  title: string;
  subtitle: string;
}) {
  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="flex min-h-screen">
        <Sidebar active={active} />

        <section className="flex-1">
          <header className="border-b border-white/10 px-6 py-6 md:px-10">
            <p className="text-sm text-gray-500">
              Torab AI Office / {title}
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              {title}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          </header>

          <div className="p-6 md:p-10">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

function Sidebar({ active }: { active: string }) {
  const links = [
    ["dashboard", "/", "⌂", "Dashboard"],
    ["tasks", "/tasks", "▣", "Tasks"],
    ["team", "/team", "◈", "AI Team"],
    ["reports", "/reports", "▤", "Reports"],
    ["settings", "/settings", "⚙", "Settings"],
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0a0d12] p-5 md:flex md:flex-col">
      <div className="mb-10">
        <h1 className="text-xl font-bold">
          Torab{" "}
          <span className="text-blue-400">
            AI Office
          </span>
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          Intelligent workspace
        </p>
      </div>

      <nav className="space-y-2">
        {links.map(([key, href, icon, label]) => (
          <Link
            key={key}
            href={href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
              active === key
                ? "bg-white/10 font-medium text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs text-gray-500">
          Workspace
        </p>

        <p className="mt-1 text-sm font-medium">
          Torab Labs
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <span className="text-xs text-gray-400">
            System Online
          </span>
        </div>
      </div>
    </aside>
  );
}