"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Grid3X3 } from "lucide-react";
import { DocsSearchTrigger } from "./docs-search";
import { allSections } from "@/lib/docs-search-index";

export function DocsTopBar({ onSearchOpen }: { onSearchOpen: () => void }) {
  const [navOpen, setNavOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navOpen) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [navOpen]);

  const docsSections = allSections.filter((s) => s.category === "docs");
  const apiSections = allSections.filter((s) => s.category === "api");

  return (
    <header className="sticky top-0 z-50 flex h-12 items-center justify-between border-b border-[#1A1A1A] bg-[#0E0E0E]/95 px-4 backdrop-blur-md">
      {/* Left: logo + docs */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image src="/creor-nobg-icon.png" alt="Creor" width={24} height={24} className="h-6 w-6" />
        </Link>
        <span className="text-[#333]">/</span>
        <Link href="/docs" className="text-[14px] font-medium text-[#A1A1A1] transition-colors hover:text-[#EDEDED]">
          Docs
        </Link>
      </div>

      {/* Center: search */}
      <div className="hidden flex-1 justify-center px-8 sm:flex">
        <DocsSearchTrigger onOpen={onSearchOpen} />
      </div>

      {/* Right: nav grid + mobile search + dashboard */}
      <div className="flex items-center gap-2">
        {/* Mobile search */}
        <button
          onClick={onSearchOpen}
          className="rounded-md p-1.5 text-[#666] transition-colors hover:bg-[#1A1A1A] hover:text-[#EDEDED] sm:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Full nav popover trigger */}
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className={`rounded-md p-1.5 transition-colors ${navOpen ? "bg-[#1A1A1A] text-[#EDEDED]" : "text-[#666] hover:bg-[#1A1A1A] hover:text-[#EDEDED]"}`}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>

          {navOpen && (
            <div className="absolute right-0 top-full mt-2 w-[540px] max-w-[calc(100vw-2rem)] rounded-xl border border-[#222] bg-[#111] p-5 shadow-2xl shadow-black/40">
              {/* Docs */}
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#555]">Documentation</p>
              <div className="grid grid-cols-2 gap-2">
                {docsSections.map((s) => (
                  <Link
                    key={s.title}
                    href={s.items[0]?.href ?? "/docs"}
                    onClick={() => setNavOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[#A1A1A1] transition-colors hover:bg-[#1A1A1A] hover:text-[#EDEDED]"
                  >
                    <s.icon className="h-3.5 w-3.5 shrink-0 text-[#555]" />
                    {s.title}
                  </Link>
                ))}
              </div>

              {/* API */}
              <div className="my-4 h-px bg-[#1A1A1A]" />
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#555]">API Reference</p>
              <div className="grid grid-cols-2 gap-2">
                {apiSections.map((s) => (
                  <Link
                    key={s.title}
                    href={s.items[0]?.href ?? "/docs/api"}
                    onClick={() => setNavOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[#A1A1A1] transition-colors hover:bg-[#1A1A1A] hover:text-[#EDEDED]"
                  >
                    <s.icon className="h-3.5 w-3.5 shrink-0 text-[#555]" />
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link
          href="/dashboard"
          className="flex h-7 items-center rounded-lg border border-[#222] bg-[#141414] px-3 text-[12px] font-medium text-[#EDEDED] transition-colors hover:bg-[#1A1A1A]"
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
}
