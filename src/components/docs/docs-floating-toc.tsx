"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSectionByBreadcrumb } from "@/lib/docs-search-index";

interface TocItem {
  label: string;
  href: string;
}

export function DocsFloatingToc({ toc, breadcrumb }: { toc: TocItem[]; breadcrumb: string }) {
  const [activeId, setActiveId] = useState("");
  const pathname = usePathname();
  const section = getSectionByBreadcrumb(breadcrumb);

  useEffect(() => {
    if (toc.length === 0) return;
    const ids = toc.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [toc]);

  const sectionItems = section?.items.flatMap((item) => [
    { ...item, isChild: false },
    ...(item.children?.map((c) => ({ ...c, isChild: true })) ?? []),
  ]) ?? [];

  if (toc.length === 0 && sectionItems.length === 0) return null;

  return (
    <div className="fixed right-6 top-16 hidden max-h-[calc(100vh-80px)] w-[200px] overflow-y-auto xl:block">
      <div className="space-y-6 py-4">
        {/* On this page (TOC) */}
        {toc.length > 0 && (
          <div>
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#555]">
              On this page
            </p>
            <div className="flex flex-col gap-0.5">
              {toc.map((item) => {
                const isActive = activeId === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`block border-l-2 py-1 pl-2.5 text-[12px] transition-all ${
                      isActive
                        ? "border-[#FF6A13] text-[#FF6A13]"
                        : "border-transparent text-[#555] hover:text-[#A1A1A1]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Section pages */}
        {section && sectionItems.length > 0 && (
          <div>
            {toc.length > 0 && <div className="mb-4 h-px bg-[#1A1A1A]" />}
            <div className="mb-2.5 flex items-center gap-2">
              <section.icon className="h-3.5 w-3.5 text-[#FF6A13]" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#555]">
                {section.title}
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              {sectionItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block border-l-2 py-1 text-[12px] transition-all ${
                      item.isChild ? "pl-5" : "pl-2.5"
                    } ${
                      isActive
                        ? "border-[#FF6A13] text-[#FF6A13]"
                        : "border-transparent text-[#555] hover:text-[#A1A1A1]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
