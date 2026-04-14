"use client";

import { useEffect, useState } from "react";
import { Search, FileText, Pencil, Check } from "lucide-react";

interface Step {
  type: "prompt" | "tool" | "response";
  icon?: typeof Search;
  label?: string;
  text: string;
}

interface Scenario {
  steps: Step[];
}

const SCENARIOS: Scenario[] = [
  {
    steps: [
      { type: "prompt", text: "cart total is missing tax" },
      { type: "tool", icon: Search, label: "Grep", text: 'Searching for "calculateTotal"...' },
      { type: "tool", icon: FileText, label: "Read", text: "Read CartSummary.tsx" },
      { type: "tool", icon: FileText, label: "Read", text: "Read utils.ts" },
      { type: "tool", icon: Pencil, label: "Edit", text: "Edit CartSummary.tsx (+2 -2)" },
      { type: "tool", icon: Pencil, label: "Edit", text: "Edit utils.ts (+8 -0)" },
      { type: "response", text: "Added calculateTax helper and updated CartSummary. Tax now included in total." },
    ],
  },
  {
    steps: [
      { type: "prompt", text: "why is the dashboard slow on mobile" },
      { type: "tool", icon: Search, label: "Grep", text: 'Searching for unoptimized queries...' },
      { type: "tool", icon: FileText, label: "Read", text: "Read AnalyticsChart.tsx" },
      { type: "tool", icon: FileText, label: "Read", text: "Read /api/usage/route.ts" },
      { type: "tool", icon: Pencil, label: "Edit", text: "Edit AnalyticsChart.tsx (+3 -1)" },
      { type: "tool", icon: Pencil, label: "Edit", text: "Edit route.ts (+5 -12)" },
      { type: "response", text: "Fixed N+1 query and added React.memo. Dashboard loads 4x faster now." },
    ],
  },
  {
    steps: [
      { type: "prompt", text: "write tests for the auth flow" },
      { type: "tool", icon: FileText, label: "Read", text: "Read auth.ts, middleware.ts" },
      { type: "tool", icon: Search, label: "Glob", text: "Found 3 existing test files" },
      { type: "tool", icon: Pencil, label: "Write", text: "Write auth.test.ts (+94 lines)" },
      { type: "response", text: "Created 8 test cases covering login, signup, refresh, and logout. All passing." },
    ],
  },
];

export function HeroTerminal() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [typedChars, setTypedChars] = useState(0);

  const scenario = SCENARIOS[scenarioIdx];
  const totalSteps = scenario.steps.length;

  useEffect(() => {
    if (visibleSteps >= totalSteps) {
      // All steps shown — wait then move to next scenario
      const timer = setTimeout(() => {
        setScenarioIdx((i) => (i + 1) % SCENARIOS.length);
        setVisibleSteps(0);
        setTypedChars(0);
      }, 3500);
      return () => clearTimeout(timer);
    }

    const currentStep = scenario.steps[visibleSteps];

    if (visibleSteps === 0 && currentStep.type === "prompt") {
      // Type out the prompt character by character
      if (typedChars < currentStep.text.length) {
        const timer = setTimeout(() => setTypedChars((c) => c + 1), 45);
        return () => clearTimeout(timer);
      }
      // Prompt fully typed — pause then show next
      const timer = setTimeout(() => setVisibleSteps(1), 500);
      return () => clearTimeout(timer);
    }

    // Tool calls and response appear with staggered delays
    const delay = currentStep.type === "tool" ? 350 : 600;
    const timer = setTimeout(() => setVisibleSteps((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [scenarioIdx, visibleSteps, typedChars, totalSteps, scenario.steps]);

  const promptStep = scenario.steps[0];

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0A0A0B]">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[10px] text-white/20">Creor AI</span>
      </div>

      {/* Chat content — fixed height to prevent layout shifts */}
      <div className="h-[220px] space-y-2.5 overflow-hidden px-3.5 py-3">
        {/* User prompt */}
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-[9px] font-bold text-indigo-400">
            U
          </span>
          <p className="text-[13px] leading-relaxed text-white/70">
            {promptStep.text.slice(0, visibleSteps === 0 ? typedChars : promptStep.text.length)}
            {visibleSteps === 0 && typedChars < promptStep.text.length && (
              <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-white/50" />
            )}
          </p>
        </div>

        {/* Tool calls */}
        {scenario.steps.slice(1).map((step, i) => {
          if (i + 1 >= visibleSteps) return null;
          const Icon = step.icon;

          if (step.type === "tool") {
            return (
              <div
                key={i}
                className="ml-7 flex items-center gap-2 rounded-lg bg-white/[0.03] px-2.5 py-1.5"
              >
                {Icon && <Icon className="h-3 w-3 shrink-0 text-indigo-400/70" />}
                <span className="text-[11px] font-medium text-indigo-400/70">{step.label}</span>
                <span className="text-[11px] text-white/30">{step.text}</span>
              </div>
            );
          }

          // Response
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                <Check className="h-3 w-3 text-emerald-400" />
              </span>
              <p className="text-[13px] leading-relaxed text-white/50">{step.text}</p>
            </div>
          );
        })}

      </div>
    </div>
  );
}
