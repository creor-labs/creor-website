"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { IDEDemo } from "@/components/ide-demo/ide-demo";

function AnimatedCounter({
  target,
  duration = 1.5,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isIntersecting || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isIntersecting, target, duration]);

  return <span ref={ref as React.RefObject<HTMLSpanElement>}>{count}</span>;
}

export function AnimatedHero() {
  return (
    <div className="relative z-10 mx-auto max-w-[1480px] px-4 pt-20 sm:px-6 sm:pt-32 md:pt-42">
      {/* Centered text block */}
      <div className="text-center">
        <h1
          className="text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Code{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              <AnimatedCounter target={10} duration={1.8} />x
            </span>
            <span
              className="absolute inset-0 -z-10 blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(129, 140, 248, 0.25) 0%, transparent 70%)",
              }}
            />
          </span>{" "}
          faster
          <br />
          <span className="text-white/40">
            Stay <span className="text-white/80">100%</span> in control.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/40 sm:mt-6 sm:text-[17px]">
          <span className="sm:hidden">The AI-native IDE. Agents that write, plan, and debug — with any model, across your entire codebase.</span>
          <span className="hidden sm:inline">Specialized agents write, plan, and search — across your entire codebase, with any model.</span>
        </p>

        <div className="mt-5 flex flex-col items-center gap-2.5 sm:mt-7 sm:flex-row sm:justify-center sm:gap-3">
          <Link
            href="/waitlist"
            className="glow-pulse group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-[15px] font-semibold text-background transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:text-[16px]"
          >
            Join Waitlist
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/10 px-6 py-2.5 text-[15px] font-medium text-white/70 transition-colors hover:bg-white/5 sm:w-auto sm:text-[16px]"
          >
            Read the Docs
          </Link>
        </div>
      </div>

      {/* Desktop: IDE demo */}
      <div className="mt-12 hidden sm:mt-16 sm:block">
        <div className="ide-zoom">
          <IDEDemo />
        </div>
      </div>
    </div>
  );
}
