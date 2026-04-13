"use client";

import { useEffect, useRef, useState } from "react";

const sidebarItems = [
  { label: "Account", icon: "⊙" },
  { label: "General", icon: "⌂" },
  { label: "Models", icon: "◈" },
  { label: "Custom Agents", icon: "⬡" },
  { label: "Permissions", icon: "🛡" },
  { label: "Display", icon: "◉" },
  { label: "Terminal", icon: "▸" },
  { label: "Context", icon: "◫" },
  { label: "Skills", icon: "⚡" },
  { label: "Rules", icon: "☰" },
  { label: "Directories", icon: "📁" },
  { label: "divider", icon: "" },
  { label: "Tools & MCP", icon: "⚙" },
  { label: "Hooks", icon: "▷" },
  { label: "Troubleshooting", icon: "🔧" },
];

const permissions = [
  { name: "Read Files", desc: "Read, glob, grep, list, code search", auto: true, icon: "◎" },
  { name: "Edit Files", desc: "Edit, write, patch, multi-edit", auto: true, icon: "✎" },
  { name: "Execute Commands", desc: "Shell / terminal commands", auto: false, icon: "▸" },
  { name: "Web Access", desc: "Web search and fetch", auto: true, icon: "⊕" },
  { name: "MCP Tools", desc: "External MCP server tools", auto: false, icon: "⊞" },
  { name: "Tasks & Agents", desc: "Sub-tasks, skills, agents", auto: true, icon: "⬡" },
];

const hooks = [
  { name: "Before Tool Execution", icon: "◔", count: 0, expanded: false },
  { name: "After Tool Execution", icon: "✓", count: 0, expanded: false },
  { name: "Shell Environment", icon: "◧", count: 1, expanded: false },
  { name: "Before Command", icon: "⚡", count: 0, expanded: false },
  { name: "On Chat Message", icon: "◻", count: 0, expanded: false },
  {
    name: "Session Start",
    icon: "▷",
    count: 1,
    expanded: true,
    detail: {
      desc: "Runs when a session begins. Use for setup, authentication, or context injection.",
      command: 'echo "$(date): session.start FIRED" >> /tmp/hooks.log',
      timeout: "30s",
      enabled: true,
    },
  },
  { name: "Session End", icon: "◉", count: 0, expanded: false },
  { name: "Tool Failure", icon: "⊘", count: 0, expanded: false },
  { name: "On Notification", icon: "◔", count: 0, expanded: false },
  { name: "Before Compaction", icon: "◧", count: 0, expanded: false },
];

export function AnimatedPermissions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"Permissions" | "Hooks">("Permissions");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorClicking, setCursorClicking] = useState(false);
  const hooksRef = useRef<HTMLDivElement>(null);
  const permissionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      timeouts.push(setTimeout(fn, ms));
    };

    function getHooksPos() {
      const hooksEl = hooksRef.current;
      const container = containerRef.current;
      if (!hooksEl || !container) return { x: 60, y: 300 };
      const c = container.getBoundingClientRect();
      const h = hooksEl.getBoundingClientRect();
      return { x: h.left - c.left + h.width / 2, y: h.top - c.top + h.height / 2 };
    }

    function getPermissionsPos() {
      const permEl = permissionsRef.current;
      const container = containerRef.current;
      if (!permEl || !container) return { x: 60, y: 115 };
      const c = container.getBoundingClientRect();
      const p = permEl.getBoundingClientRect();
      return { x: p.left - c.left + p.width / 2, y: p.top - c.top + p.height / 2 };
    }

    function runCycle(initialDelay: number) {
      let d = initialDelay;

      // Show cursor at rest position
      t(() => { setCursorVisible(true); setCursorPos({ x: 60, y: 200 }); }, d);
      d += 700;

      // Move to Hooks
      t(() => setCursorPos(getHooksPos()), d);
      d += 800;

      // Click Hooks
      t(() => setCursorClicking(true), d);
      d += 200;
      t(() => { setCursorClicking(false); setActiveTab("Hooks"); }, d);
      d += 600;

      // Hide cursor, show Hooks for a while
      t(() => setCursorVisible(false), d);
      d += 4000;

      // Show cursor again
      t(() => { setCursorVisible(true); setCursorPos({ x: 60, y: 200 }); }, d);
      d += 700;

      // Move to Permissions
      t(() => setCursorPos(getPermissionsPos()), d);
      d += 800;

      // Click Permissions
      t(() => setCursorClicking(true), d);
      d += 200;
      t(() => { setCursorClicking(false); setActiveTab("Permissions"); }, d);
      d += 600;

      // Hide cursor
      t(() => setCursorVisible(false), d);
      d += 3000;

      return d; // total cycle length
    }

    const CYCLE_LENGTH = runCycle(2500);

    // Continuously loop
    const interval = setInterval(() => runCycle(0), CYCLE_LENGTH);

    const observer = new IntersectionObserver(() => {}, { threshold: 0.3 });
    observer.observe(el);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative origin-top scale-[0.85] md:scale-100">
      {/* Animated cursor */}
      {cursorVisible && (
        <div
          className="pointer-events-none absolute z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            className={`drop-shadow-lg transition-transform duration-150 ${cursorClicking ? "scale-90" : ""}`}
          >
            <path
              d="M0 0L0 19.5L4.5 15.5L8 23L11.5 21.5L8 14H14L0 0Z"
              fill="white"
              stroke="black"
              strokeWidth="1"
            />
          </svg>
          {cursorClicking && (
            <div className="absolute left-1 top-0 h-3 w-3 animate-ping rounded-full bg-white/30" />
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#1a1a1a]/80">
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-[120px] shrink-0 border-r border-white/[0.06] bg-[#141414]/80 py-2 px-1.5 md:block">
            <p className="mb-1.5 px-1.5 text-[7px] font-bold uppercase tracking-widest text-white/25">
              Settings
            </p>
            <div className="space-y-px">
              {sidebarItems.map((item) => {
                if (item.label === "divider") {
                  return (
                    <div
                      key="divider"
                      className="my-1.5 h-px bg-white/[0.06]"
                    />
                  );
                }
                const isActive = item.label === activeTab;
                return (
                  <div
                    key={item.label}
                    ref={item.label === "Hooks" ? hooksRef : item.label === "Permissions" ? permissionsRef : undefined}
                    className={`flex items-center gap-1.5 rounded px-1.5 py-1 text-[9px] transition-colors duration-300 ${
                      isActive
                        ? "bg-indigo-500/20 text-indigo-300 font-medium"
                        : "text-white/35"
                    }`}
                  >
                    <span className="text-[8px]">{item.icon}</span>
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-hidden p-3 md:p-3.5">
            {/* Permissions view */}
            <div
              className={`transition-all duration-500 ${
                activeTab === "Permissions"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 h-0 overflow-hidden"
              }`}
            >
              <PermissionsContent />
            </div>

            {/* Hooks view */}
            <div
              className={`transition-all duration-500 ${
                activeTab === "Hooks"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 h-0 overflow-hidden"
              }`}
            >
              <HooksContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PermissionsContent() {
  return (
    <>
      <h3 className="text-[12px] font-semibold text-white/90">Permissions</h3>
      <p className="mt-0.5 text-[9px] text-white/35">
        Control how Creor handles tool execution permissions.
      </p>

      <div className="mt-3">
        <p className="mb-1.5 text-[7px] font-bold uppercase tracking-widest text-white/25">
          Quick Presets
        </p>
        <div className="flex gap-1.5">
          <div className="flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-2 py-1">
            <span className="text-[9px] font-medium text-emerald-400">Smart</span>
            <span className="rounded bg-emerald-500/20 px-1 py-px text-[6px] font-bold uppercase text-emerald-400">
              Recommended
            </span>
          </div>
          <div className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[9px] text-white/40">
            Auto
          </div>
          <div className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[9px] text-white/40">
            Ask All
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-[7px] font-bold uppercase tracking-widest text-white/25">
          Per-Action Permissions
        </p>
        <div className="space-y-0.5">
          {permissions.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between rounded-md border border-white/[0.05] bg-white/[0.02] px-2.5 py-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-white/[0.05] text-[9px] text-white/30">
                  {p.icon}
                </span>
                <div>
                  <p className="text-[10px] font-medium text-white/70">{p.name}</p>
                  <p className="text-[8px] text-white/25">{p.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[8px] font-medium ${p.auto ? "text-emerald-400/60" : "text-white/30"}`}
                >
                  {p.auto ? "Auto" : "Ask"}
                </span>
                <div
                  className={`h-[14px] w-[26px] rounded-full p-[2px] ${
                    p.auto ? "bg-emerald-500/40" : "bg-white/[0.10]"
                  }`}
                >
                  <div
                    className={`h-[10px] w-[10px] rounded-full ${
                      p.auto ? "translate-x-[12px] bg-emerald-400" : "bg-white/40"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-[7px] font-bold uppercase tracking-widest text-white/25">
          Project Rules
        </p>
        <div className="flex flex-col items-center rounded-md border border-dashed border-white/[0.08] bg-white/[0.015] py-3">
          <p className="text-[9px] font-medium text-white/40">No Project Rules Yet</p>
          <p className="mt-0.5 max-w-[200px] text-center text-[7px] text-white/20">
            Click &apos;Always (Project)&apos; on a permission prompt or use the button below to add rules.
          </p>
          <div className="mt-2 flex items-center gap-1 rounded border border-white/[0.10] bg-white/[0.04] px-2 py-0.5 text-[8px] text-white/40">
            <span className="text-[10px] leading-none">+</span> Add Rule
          </div>
        </div>
      </div>
    </>
  );
}

function HooksContent() {
  return (
    <>
      <h3 className="text-[12px] font-semibold text-white/90">Hooks</h3>
      <p className="mt-0.5 text-[9px] text-white/35">
        Configure shell scripts that run at specific points during AI agent execution.
      </p>

      <div className="mt-3 space-y-0.5">
        {hooks.map((h) => (
          <div key={h.name}>
            <div className="flex items-center justify-between rounded-md border border-white/[0.05] bg-white/[0.02] px-2.5 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-white/25">
                  {h.expanded ? "∨" : "›"}
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded bg-white/[0.05] text-[9px] text-white/30">
                  {h.icon}
                </span>
                <p className="text-[10px] font-medium text-white/70">{h.name}</p>
              </div>
              <span
                className={`flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[8px] font-medium ${
                  h.count > 0
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/[0.06] text-white/25"
                }`}
              >
                {h.count}
              </span>
            </div>

            {/* Expanded detail */}
            {h.expanded && h.detail && (
              <div className="ml-4 mt-0.5 rounded-md border border-white/[0.04] bg-white/[0.015] px-3 py-2">
                <p className="text-[8px] text-white/30">{h.detail.desc}</p>
                <div className="mt-1.5 flex items-center justify-between rounded bg-[#0d0d0d] px-2 py-1.5">
                  <code className="font-mono text-[8px] text-amber-300/60">
                    {h.detail.command}
                  </code>
                  <div className="h-[14px] w-[26px] rounded-full bg-emerald-500/40 p-[2px]">
                    <div className="h-[10px] w-[10px] translate-x-[12px] rounded-full bg-emerald-400" />
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[7px] text-white/20">
                    timeout {h.detail.timeout}
                  </span>
                  <div className="flex items-center gap-1 text-[8px] text-white/30">
                    <span className="text-[10px] leading-none">+</span> Add Hook
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
