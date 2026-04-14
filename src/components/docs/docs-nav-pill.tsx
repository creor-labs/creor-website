"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { getSectionByBreadcrumb } from "@/lib/docs-search-index";

export function DocsNavPill({ breadcrumb }: { breadcrumb: string }) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const section = getSectionByBreadcrumb(breadcrumb);

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 200) {
        setVisible(false);
        setExpanded(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setExpanded(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [expanded]);

  if (!section) return null;

  const allItems = section.items.flatMap((item) => [
    item,
    ...(item.children?.map((c) => ({ ...c, isChild: true })) ?? []),
  ]);

  return (
    <div
      ref={ref}
      className={`fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      {/* Expanded panel */}
      {expanded && (
        <div className="mb-2 w-[280px] rounded-2xl border border-[#222] bg-[#111]/95 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <p className="mb-1 px-4 pt-1 text-[11px] font-semibold uppercase tracking-wider text-[#444]">
            {section.title}
          </p>
          <div className="max-h-[320px] overflow-y-auto">
            {allItems.map((item) => {
              const isChild = "isChild" in item;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setExpanded(false)}
                  className={`flex items-center py-1.5 text-[13px] transition-colors ${
                    isChild ? "pl-7 pr-4" : "px-4"
                  } ${
                    pathname === item.href
                      ? "bg-[#FF6A13]/10 text-[#FF6A13]"
                      : "text-[#888] hover:bg-[#1A1A1A] hover:text-[#EDEDED]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Pill button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2 rounded-full border border-[#222] bg-[#111]/90 px-4 py-2 text-[13px] font-medium shadow-lg shadow-black/30 backdrop-blur-xl transition-all hover:border-[#333] hover:bg-[#1A1A1A] ${
          expanded ? "text-[#EDEDED]" : "text-[#888]"
        }`}
      >
        <section.icon className="h-3.5 w-3.5" />
        {section.title}
        <ChevronUp className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
