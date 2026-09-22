"use client";

import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoAssign, setAutoAssign] = useState(true);

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="flex min-h-screen">

        <Sidebar active="settings" />

        <section className="flex-1">

          <header className="border-b border-white/10 px-6 py-6 md:px-10">

            <p className="text-sm text-gray-500">
              Torab AI Office / Settings
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              Settings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Configure your AI Office workspace.
            </p>

          </header>

          <div className="max-w-3xl p-6 md:p-10">

            <div className="space-y-5">

              {/* WORKSPACE */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <h2 className="font-semibold">
                  Workspace
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Basic workspace information.
                </p>

                <div className="mt-6 space-y-4">

                  <div>
                    <label className="text-xs text-gray-500">
                      Workspace Name
                    </label>

                    <input
                      defaultValue="Torab Labs"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-blue-500/50"
                    />
                  </div>

                </div>

              </div>

              {/* AUTOMATION */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <h2 className="font-semibold">
                  AI Automation
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Control how your AI workforce operates.
                </p>

                <div className="mt-6 space-y-5">

                  <SettingToggle
                    title="Automatic task assignment"
                    description="Allow AI Manager to choose the appropriate agent."
                    enabled={autoAssign}
                    setEnabled={setAutoAssign}
                  />

                  <SettingToggle
                    title="Task notifications"
                    description="Receive updates when tasks change status."
                    enabled={notifications}
                    setEnabled={setNotifications}
                  />

                </div>

              </div>

              {/* API */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <h2 className="font-semibold">
                  AI Connections
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  API connections will be configured here.
                </p>

                <div className="mt-6 rounded-xl border border-dashed border-white/10 p-5">

                  <p className="text-sm text-gray-400">
                    No AI APIs connected yet.
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Claude, Gemini and research APIs will be connected in
                    the next development phase.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

function SettingToggle({
  title,
  description,
  enabled,
  setEnabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5">

      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-blue-500" : "bg-white/10"
        }`}
      >

        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />

      </button>

    </div>
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
          Torab <span className="text-blue-400">AI Office</span>
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