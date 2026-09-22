import Link from "next/link";

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="flex min-h-screen">

        <Sidebar active="reports" />

        <section className="flex-1">

          <header className="border-b border-white/10 px-6 py-6 md:px-10">
            <p className="text-sm text-gray-500">
              Torab AI Office / Reports
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              Reports
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Review work completed by your AI workforce.
            </p>
          </header>

          <div className="p-6 md:p-10">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-xl text-blue-400">
                ▤
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Reports Center
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Completed task reports, AI research summaries, development
                results, and workforce activity will appear here.
              </p>

              <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-8 text-center">
                <p className="text-sm text-gray-400">
                  No completed reports yet.
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Reports will appear here when AI agents complete tasks.
                </p>
              </div>

            </div>

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
        <p className="text-xs text-gray-500">Workspace</p>
        <p className="mt-1 text-sm font-medium">Torab Labs</p>

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