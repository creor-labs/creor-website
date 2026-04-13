"use client";

import { useEffect, useRef, useState } from "react";

/*
  Animated skill graph tree.

  Flow:
  1. User prompt appears at the top
  2. A pulse travels from the prompt down to the root SKILL.md node
  3. From the root, the pulse branches out to the matching child node
  4. The child highlights and "context pulled" badge appears
  5. The response appears at the bottom
*/

interface TreeNode {
  id: string;
  label: string;
  desc?: string;
  children?: TreeNode[];
}

const tree: TreeNode = {
  id: "root",
  label: "SKILL.md",
  desc: "Auth system",
  children: [
    {
      id: "oauth",
      label: "oauth-flow.md",
      children: [
        { id: "google", label: "google-sso.md" },
        { id: "github", label: "github-oauth.md" },
      ],
    },
    {
      id: "jwt",
      label: "jwt-tokens.md",
      children: [
        { id: "refresh", label: "refresh-flow.md" },
        { id: "verify", label: "verify.md" },
      ],
    },
    {
      id: "middleware",
      label: "middleware.md",
      children: [
        { id: "rate-limit", label: "rate-limit.md" },
        { id: "cors", label: "cors-policy.md" },
      ],
    },
  ],
};

type Phase = "idle" | "query" | "pulse-root" | "pulse-branch" | "highlight" | "response";

export function AnimatedSkillGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeChild] = useState("jwt"); // The node that gets queried
  const started = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.1, rootMargin: "-80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function runAnimation() {
    setTimeout(() => setPhase("query"), 300);
    setTimeout(() => setPhase("pulse-root"), 1000);
    setTimeout(() => setPhase("pulse-branch"), 1600);
    setTimeout(() => setPhase("highlight"), 2200);
    setTimeout(() => setPhase("response"), 3000);
  }

  const isActive = (id: string) => phase === "highlight" || phase === "response" ? id === activeChild : false;
  const isActiveChild = (parentId: string, childId: string) =>
    (phase === "highlight" || phase === "response") && parentId === activeChild;

  const rootGlow =
    phase === "pulse-root" || phase === "pulse-branch" || phase === "highlight" || phase === "response";
  const branchGlow = phase === "pulse-branch" || phase === "highlight" || phase === "response";

  return (
    <div ref={containerRef}>
      <span className="mb-4 block font-mono text-[10px] uppercase tracking-widest text-white/35">
        Skill Graph
      </span>

      <div className="relative space-y-6">
        {/* User query */}
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-500 ${
            phase !== "idle"
              ? "border-indigo-500/30 bg-indigo-500/[0.06] opacity-100 translate-y-0"
              : "border-transparent bg-transparent opacity-0 translate-y-2"
          }`}
        >
          <span className="text-[10px] text-indigo-400/60">→</span>
          <span className="font-mono text-[10px] text-white/50">
            &quot;How does JWT verification work?&quot;
          </span>
        </div>

        {/* Pulse line from query to root */}
        <div className="flex justify-center">
          <div
            className={`h-6 w-px transition-all duration-300 ${
              rootGlow ? "bg-indigo-500/40" : "bg-white/[0.06]"
            }`}
          />
        </div>

        {/* Root node */}
        <div className="flex justify-center">
          <div
            className={`rounded-lg border px-4 py-2 text-center transition-all duration-500 ${
              rootGlow
                ? "border-indigo-400/40 bg-indigo-500/[0.12] shadow-[0_0_20px_rgba(129,140,248,0.1)]"
                : "border-white/[0.10] bg-white/[0.06]"
            }`}
          >
            <div className="text-[11px] font-medium text-indigo-300/80">{tree.label}</div>
            <div className="text-[9px] text-white/35">{tree.desc}</div>
          </div>
        </div>

        {/* Branches from root */}
        <div className="flex justify-center gap-1">
          {tree.children!.map((child) => (
            <div
              key={child.id}
              className={`h-5 w-px transition-all duration-300 ${
                branchGlow && child.id === activeChild
                  ? "bg-indigo-500/50"
                  : branchGlow
                    ? "bg-white/[0.08]"
                    : "bg-white/[0.06]"
              }`}
              style={{ flex: 1, maxWidth: 1 }}
            />
          ))}
        </div>

        {/* Child nodes row */}
        <div className="grid grid-cols-3 gap-2">
          {tree.children!.map((child) => {
            const active = isActive(child.id);
            return (
              <div key={child.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-full rounded-lg border px-2.5 py-2 text-center transition-all duration-500 ${
                    active
                      ? "border-indigo-400/50 bg-indigo-500/[0.15] shadow-[0_0_16px_rgba(129,140,248,0.12)]"
                      : "border-white/[0.08] bg-white/[0.04]"
                  }`}
                >
                  <div className={`font-mono text-[9px] ${active ? "text-indigo-300/80" : "text-white/40"}`}>
                    {child.label}
                  </div>
                  {active && (
                    <div className="mt-1 animate-pulse rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-[8px] text-indigo-300/70">
                      context pulled
                    </div>
                  )}
                </div>

                {/* Grandchild nodes */}
                <div className="flex w-full justify-center gap-1">
                  {child.children?.map((gc) => (
                    <div
                      key={gc.id}
                      className={`rounded border px-1.5 py-0.5 font-mono text-[8px] transition-all duration-500 ${
                        active
                          ? "border-indigo-500/20 bg-indigo-500/[0.06] text-indigo-300/50"
                          : "border-white/[0.06] bg-white/[0.03] text-white/25"
                      }`}
                    >
                      {gc.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Response */}
        <div className="flex justify-center">
          <div
            className={`h-5 w-px transition-all duration-300 ${
              phase === "response" ? "bg-emerald-500/40" : "bg-white/[0.06]"
            }`}
          />
        </div>
        <div
          className={`rounded-lg border px-3 py-2 transition-all duration-500 ${
            phase === "response"
              ? "border-emerald-500/20 bg-emerald-500/[0.06] opacity-100 translate-y-0"
              : "border-transparent bg-transparent opacity-0 translate-y-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-400/60">←</span>
            <span className="font-mono text-[10px] text-white/50">
              JWT tokens are verified using <span className="text-emerald-400/60">verifyJWT(token, SECRET)</span> in the auth middleware...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
