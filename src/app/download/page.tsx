import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Download, Apple, Monitor, CheckCircle2, Gift, Key, Users } from "lucide-react";
import { ShareButton } from "./share-button";
import { generatePageMetadata } from "@/lib/metadata";
import { WaitlistForm } from "./waitlist-form";

/* ─── Feature flag: flip to false when downloads are ready ─── */
const SHOW_WAITLIST = true;

export const metadata: Metadata = generatePageMetadata({
  title: SHOW_WAITLIST ? "Get Early Access — Creor" : "Download",
  description: SHOW_WAITLIST
    ? "Join the Creor waitlist. Be the first to know when the AI-native code editor launches."
    : "Download Creor — the AI-native code editor. Available for macOS and Windows.",
  path: "/download",
});

const GITHUB_REPO = "modhisathvik7733/creor-app";
const RELEASE_BASE = `https://github.com/${GITHUB_REPO}/releases/latest/download`;

const PLATFORMS = [
  {
    name: "macOS (Apple Silicon)",
    desc: "For M1/M2/M3/M4 Macs",
    file: "Creor-darwin-arm64.zip",
    href: `${RELEASE_BASE}/Creor-darwin-arm64.zip`,
    icon: Apple,
    recommended: true,
  },
  {
    name: "macOS (Intel)",
    desc: "For Intel-based Macs",
    file: "Creor-darwin-x64.zip",
    href: `${RELEASE_BASE}/Creor-darwin-x64.zip`,
    icon: Apple,
    recommended: false,
  },
  {
    name: "Windows",
    desc: "Windows 10/11 (64-bit)",
    file: "Creor-win32-x64.zip",
    href: `${RELEASE_BASE}/Creor-win32-x64.zip`,
    icon: Monitor,
    recommended: false,
  },
];

const FEATURES = [
  "AI agents that write, plan, and debug code",
  "Works with Claude, GPT-4, Gemini, and more",
  "25+ built-in tools for file ops, search, and analysis",
  "MCP support for external integrations",
  "Your code never leaves your machine",
];

export default function DownloadPage() {
  if (SHOW_WAITLIST) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        {/* Full-page background */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wl-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0v60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="wl-fade" cx="50%" cy="0%" r="70%">
              <stop offset="0%" stopColor="rgba(129,140,248,0.08)" />
              <stop offset="50%" stopColor="rgba(168,85,247,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#wl-grid)" />
          <rect width="100%" height="100%" fill="url(#wl-fade)" />
        </svg>
        <div className="pointer-events-none absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-indigo-500/[0.04] blur-[100px]" />
        <div className="pointer-events-none absolute top-[40%] right-[5%] h-[250px] w-[250px] rounded-full bg-purple-500/[0.03] blur-[80px]" />
        <div className="pointer-events-none absolute bottom-[10%] left-[30%] h-[200px] w-[200px] rounded-full bg-amber-500/[0.03] blur-[80px]" />

        <Navbar />

        <main className="relative z-10 px-6 pt-28 pb-20">
          {/* Hero — full width */}
          <div className="mx-auto max-w-[700px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
              <span className="text-[12px] font-medium text-indigo-400">
                Launching soon
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Be the first to try{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                Creor
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-white/40">
              The AI-native code editor with specialized agents, BYOK support,
              and full control over every action. Join the waitlist.
            </p>
          </div>

          {/* Waitlist form — full width contained */}
          <div className="mx-auto mt-10 max-w-[540px]">
            <WaitlistForm />
          </div>

          {/* Share */}
          <div className="mx-auto mt-4 flex justify-center">
            <ShareButton />
          </div>

          {/* Three-column features */}
          <div className="mx-auto mt-16 grid max-w-[1100px] gap-5 md:grid-cols-3">
            {/* Early bird */}
            <div className="overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.06] to-transparent">
              <div className="flex items-center gap-2 border-b border-amber-500/10 bg-amber-500/[0.04] px-4 py-2">
                <Gift className="h-4 w-4 text-amber-400" />
                <span className="text-[11px] font-semibold text-amber-300">
                  Early Bird
                </span>
                <span className="ml-auto rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-medium text-amber-400/80">
                  First 500
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-bold text-white/85">3 months free</h3>
                <p className="mt-1 text-[13px] text-white/35">
                  BYOK plan worth{" "}
                  <span className="line-through text-white/20">$27</span>{" "}
                  <span className="font-bold text-amber-400">$0</span>
                </p>
                <div className="mt-4 space-y-2">
                  <div className="rounded-lg border border-indigo-500/15 bg-indigo-500/[0.04] p-3">
                    <div className="flex items-center gap-2">
                      <Key className="h-3.5 w-3.5 text-indigo-400/70" />
                      <span className="text-[11px] font-medium text-white/60">Bring Your Own Key</span>
                    </div>
                    <p className="mt-1 text-[10px] text-white/25">
                      Any provider. No caps. $9/mo after.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-emerald-400/70" />
                      <span className="text-[11px] font-medium text-white/60">Creor Auth</span>
                    </div>
                    <p className="mt-1 text-[10px] text-white/25">
                      GitHub/Google login. Managed access.
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-md bg-white/[0.03] px-3 py-2">
                  <span className="text-[11px]">🎟</span>
                  <span className="text-[10px] text-white/30">Coupons emailed at launch</span>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h2 className="mb-4 text-[14px] font-semibold text-white/60">
                What&apos;s included
              </h2>
              <div className="space-y-3">
                {[
                  "AI agents that write, plan, and debug",
                  "Claude, GPT-4, Gemini, 15+ providers",
                  "25+ built-in tools",
                  "MCP for external integrations",
                  "Code never leaves your machine",
                  "Full hooks & permissions control",
                  "Interactive terminal when needed",
                  "Snapshot revert & diff preview",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400/60" />
                    <span className="text-[12px] text-white/40">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: platforms + how it works */}
            <div className="flex flex-col gap-5">
              {/* Platforms */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <h2 className="mb-3 text-[14px] font-semibold text-white/60">
                  Available on
                </h2>
                <div className="space-y-2">
                  {[
                    { icon: Apple, name: "macOS", desc: "Apple Silicon & Intel" },
                    { icon: Monitor, name: "Windows", desc: "Windows 10/11 (64-bit)" },
                  ].map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
                    >
                      <p.icon className="h-5 w-5 text-white/30" />
                      <div>
                        <p className="text-[12px] font-medium text-white/50">{p.name}</p>
                        <p className="text-[10px] text-white/20">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <div className="flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <h2 className="mb-4 text-[14px] font-semibold text-white/60">
                  How it works
                </h2>
                <div className="space-y-4">
                  {[
                    { step: "1", text: "Join the waitlist with your email" },
                    { step: "2", text: "We notify you when Creor launches" },
                    { step: "3", text: "First 500 get a free 3-month coupon" },
                    { step: "4", text: "Download, paste your API key, start coding" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-white/40">
                        {s.step}
                      </span>
                      <span className="text-[12px] text-white/35">{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-[900px] px-6 pt-32 pb-20">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.03] shadow-[0_0_40px_rgba(129,140,248,0.1)]">
            <Download className="h-7 w-7 text-white/60" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Download Creor
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[16px] text-white/40">
            The AI-native code editor. Multi-provider, built for speed.
          </p>
        </div>

        {/* Download Cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              className="group relative flex flex-col items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 text-center transition-all hover:border-white/[0.15] hover:bg-white/[0.04]"
            >
              {p.recommended && (
                <span className="absolute -top-2.5 rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-medium text-indigo-400">
                  Recommended
                </span>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] transition-colors group-hover:bg-white/[0.10]">
                <p.icon className="h-5 w-5 text-white/50" />
              </div>
              <div>
                <p className="text-[14px] font-semibold">{p.name}</p>
                <p className="mt-0.5 text-[12px] text-white/30">{p.desc}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.10] bg-white/[0.04] px-4 py-1.5 text-[12px] font-medium text-white/60 transition-all group-hover:border-white/[0.20] group-hover:bg-white/[0.08]">
                <Download className="h-3.5 w-3.5" />
                Download
              </span>
            </a>
          ))}
        </div>

        {/* What's included */}
        <div className="mt-16 rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
          <h2 className="text-lg font-semibold">What&apos;s included</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/60" />
                <span className="text-[13px] text-white/45">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
          <h2 className="text-lg font-semibold">System Requirements</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-wider text-white/30">
                macOS
              </p>
              <ul className="mt-2 space-y-1.5 text-[13px] text-white/40">
                <li>macOS 12+ (Monterey or later)</li>
                <li>Apple Silicon or Intel</li>
                <li>4 GB RAM minimum</li>
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-medium uppercase tracking-wider text-white/30">
                Windows
              </p>
              <ul className="mt-2 space-y-1.5 text-[13px] text-white/40">
                <li>Windows 10/11 (64-bit)</li>
                <li>x64 processor</li>
                <li>4 GB RAM minimum</li>
              </ul>
            </div>
          </div>
          <p className="mt-5 text-[12px] text-white/20">
            500 MB disk space required. 8 GB RAM recommended for large projects.
          </p>
        </div>

        {/* Install via terminal */}
        <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
          <h2 className="text-lg font-semibold">Or install via terminal</h2>
          <p className="mt-1.5 text-[13px] text-white/30">
            One command. Auto-detects your OS and architecture.
          </p>
          <div className="mt-4 rounded-lg bg-[#111113] px-4 py-3">
            <code className="font-mono text-[13px] text-emerald-400/70">
              curl -fsSL https://creor.ai/install.sh | sh
            </code>
          </div>
          <p className="mt-3 text-[11px] text-white/20">
            Works on macOS (Apple Silicon &amp; Intel) and Windows (via WSL or
            Git Bash).
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
