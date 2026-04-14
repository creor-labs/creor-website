import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { allSections } from "@/lib/docs-search-index";
import { DocsCategoryCard } from "@/components/docs/docs-category-card";

export const metadata: Metadata = generatePageMetadata({
  title: "Documentation | Creor",
  description: "Guides, API reference, and tutorials for Creor — the AI-powered IDE.",
  path: "/docs",
});

const docsSections = allSections.filter((s) => s.category === "docs");
const apiSections = allSections.filter((s) => s.category === "api");

export default function DocsPage() {
  return (
    <div className="relative">
      {/* Background */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="docs-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0v60" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="docs-glow" cx="50%" cy="0%" r="50%">
            <stop offset="0%" stopColor="rgba(255,106,19,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#docs-grid)" />
        <rect width="100%" height="40%" fill="url(#docs-glow)" />
      </svg>

      <div className="relative mx-auto max-w-[1100px] px-5 py-16 sm:px-6 sm:py-20">
      {/* Hero */}
      <div className="mx-auto max-w-[600px] text-center">
        <h1 className="text-[32px] font-bold tracking-tight text-[#EDEDED] sm:text-[44px]">
          Documentation
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-[#888]">
          Everything you need to build with Creor — from quickstart to API reference.
        </p>

        <p className="mt-4 text-[13px] text-[#555]">
          Press <kbd className="rounded bg-[#1A1A1A] px-1.5 py-0.5 font-mono text-[11px] text-[#888]">&#x2318;K</kbd> to search
        </p>
      </div>

      {/* Docs categories */}
      <div className="mt-16">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-wider text-[#444]">
          Guides
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {docsSections.map((section) => (
            <DocsCategoryCard key={section.title} section={section} />
          ))}
        </div>
      </div>

      {/* API Reference */}
      <div className="mt-16 border-t border-[#1A1A1A] pt-12">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-wider text-[#444]">
          API Reference
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apiSections.map((section) => (
            <DocsCategoryCard key={section.title} section={section} />
          ))}
        </div>
      </div>

      {/* Quick links footer */}
      <div className="mt-16 border-t border-[#1A1A1A] pt-8 text-center">
        <p className="text-[13px] text-[#555]">
          Can&apos;t find what you need?{" "}
          <span className="text-[#888]">Press</span>{" "}
          <kbd className="rounded bg-[#1A1A1A] px-1.5 py-0.5 font-mono text-[11px] text-[#888]">&#x2318;K</kbd>{" "}
          <span className="text-[#888]">to search across all docs.</span>
        </p>
      </div>
      </div>
    </div>
  );
}
