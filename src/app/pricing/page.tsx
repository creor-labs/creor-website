import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { PricingCards } from "./pricing-cards";

export const metadata: Metadata = generatePageMetadata({
  title: "Pricing",
  description:
    "Simple, transparent pricing for Creor. Use free with your own API keys or subscribe to Creor Gateway for one key, all models.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background decorations */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pr-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0H0v80" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
          <pattern id="pr-dots" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1" fill="rgba(129,140,248,0.08)" />
          </pattern>
          <radialGradient id="pr-glow-top" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="rgba(129,140,248,0.10)" />
            <stop offset="60%" stopColor="rgba(99,102,241,0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="pr-glow-bottom" cx="50%" cy="100%" r="50%">
            <stop offset="0%" stopColor="rgba(129,140,248,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="pr-sparkle">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#pr-grid)" />
        <rect width="100%" height="100%" fill="url(#pr-dots)" />
        <rect width="100%" height="100%" fill="url(#pr-glow-top)" />
        <rect width="100%" height="100%" fill="url(#pr-glow-bottom)" />

        {/* Sparkles */}
        <g filter="url(#pr-sparkle)">
          <path d="M 200,100 L 202,94 L 204,100 L 202,106 Z" fill="rgba(129,140,248,0.3)" />
          <path d="M 1100,140 L 1102,135 L 1104,140 L 1102,145 Z" fill="rgba(59,130,246,0.25)" />
          <path d="M 700,70 L 701.5,65 L 703,70 L 701.5,75 Z" fill="rgba(245,158,11,0.25)" />
          <path d="M 80,380 L 82,374 L 84,380 L 82,386 Z" fill="rgba(129,140,248,0.2)" />
          <path d="M 1300,420 L 1302,414 L 1304,420 L 1302,426 Z" fill="rgba(59,130,246,0.2)" />
        </g>

        {/* Stars */}
        <circle cx="5%" cy="15%" r="1.5" fill="rgba(129,140,248,0.18)" />
        <circle cx="15%" cy="8%" r="1" fill="rgba(255,255,255,0.1)" />
        <circle cx="55%" cy="10%" r="1" fill="rgba(255,255,255,0.08)" />
        <circle cx="88%" cy="12%" r="1" fill="rgba(245,158,11,0.12)" />
        <circle cx="95%" cy="35%" r="1.2" fill="rgba(255,255,255,0.06)" />
        <circle cx="3%" cy="50%" r="1" fill="rgba(59,130,246,0.1)" />

        {/* Decorative shapes */}
        <circle cx="50%" cy="45%" r="350" fill="none" stroke="rgba(129,140,248,0.03)" strokeWidth="0.5" strokeDasharray="6 14" />
        <circle cx="50%" cy="45%" r="480" fill="none" stroke="rgba(99,102,241,0.02)" strokeWidth="0.5" strokeDasharray="4 18" />

        {/* Code symbols */}
        <g stroke="rgba(129,140,248,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <path d="M 120,160 L 100,180 L 120,200" />
          <path d="M 150,160 L 170,180 L 150,200" />
        </g>
        <g stroke="rgba(59,130,246,0.12)" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <path d="M 1200,120 L 1180,140 L 1200,160" />
          <path d="M 1230,120 L 1250,140 L 1230,160" />
        </g>

        {/* Plus markers */}
        <g stroke="rgba(129,140,248,0.12)" strokeWidth="1" strokeLinecap="round">
          <line x1="620" y1="40" x2="620" y2="60" />
          <line x1="610" y1="50" x2="630" y2="50" />
        </g>
        <g stroke="rgba(59,130,246,0.1)" strokeWidth="1" strokeLinecap="round">
          <line x1="1250" y1="200" x2="1250" y2="220" />
          <line x1="1240" y1="210" x2="1260" y2="210" />
        </g>

        {/* Faint code text */}
        <text x="60" y="250" fill="rgba(129,140,248,0.06)" fontSize="11" fontFamily="monospace">const</text>
        <text x="1180" y="240" fill="rgba(59,130,246,0.05)" fontSize="10" fontFamily="monospace">async</text>
        <text x="200" y="520" fill="rgba(16,185,129,0.05)" fontSize="10" fontFamily="monospace">import</text>
      </svg>

      {/* Blurred orbs */}
      <div className="pointer-events-none absolute top-[5%] left-[8%] h-[400px] w-[400px] rounded-full bg-indigo-500/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute top-[3%] right-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.04] blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-indigo-500/[0.03] blur-[100px]" />

      <Navbar />

      {/* Hero */}
      <section className="relative z-10 px-6 pb-4 pt-28 sm:pt-36">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-[14px] font-medium text-indigo-400">
                Every dollar goes to LLM credits
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Simple,{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                transparent
              </span>{" "}
              pricing
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/40 sm:text-lg">
              Your entire subscription converts to LLM credits. Full IDE access
              and all features included on every plan.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Plans — fetched from API */}
      <section className="relative z-10 px-6 py-12 sm:py-16">
        <PricingCards />
      </section>

      {/* How credits work */}
      <section className="relative z-10 px-6 pb-16">
        <FadeIn>
          <div className="mx-auto max-w-[700px] rounded-2xl border border-white/[0.08] bg-[#141416] p-6 sm:p-8">
            <h2 className="text-center text-[18px] font-semibold text-white/70">
              How credits work
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Subscribe",
                  text: "Your full subscription amount converts to LLM credits",
                },
                {
                  title: "Use any model",
                  text: "Claude, GPT-4, Gemini, and 15+ more — one key",
                },
                {
                  title: "Top up anytime",
                  text: "Need more? Add credits on-demand via your dashboard",
                },
              ].map((item, i) => (
                <div key={item.title} className="text-center">
                  <span className="mb-2 flex h-8 w-8 mx-auto items-center justify-center rounded-full bg-indigo-500/10 text-[13px] font-bold text-indigo-400">
                    {i + 1}
                  </span>
                  <h3 className="text-[15px] font-semibold text-white/60">{item.title}</h3>
                  <p className="mt-1 text-[13px] text-white/30">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer note */}
      <div className="relative z-10 border-t border-white/[0.06] px-6 py-8 text-center text-[14px] text-white/20">
        All prices in USD. Billed monthly. Cancel anytime. Extra usage billed at pay-as-you-go rates.
      </div>

      <Footer />
    </div>
  );
}
