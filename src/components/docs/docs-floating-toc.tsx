"use client";

import { useState, useEffect } from "react";

interface TocItem {
  label: string;
  href: string;
}

export function DocsFloatingToc({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
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

  if (toc.length === 0) return null;

  return (
    <div className="fixed right-8 top-1/2 hidden -translate-y-1/2 xl:block">
      <div className="rounded-xl border border-[#1A1A1A] bg-[#0E0E0E]/80 p-4 backdrop-blur-md">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#555]">
          On this page
        </p>
        <div className="flex flex-col gap-0.5">
          {toc.map((item) => {
            const isActive = activeId === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={`block rounded-md px-2.5 py-1.5 text-[12px] transition-all ${
                  isActive
                    ? "border-l-2 border-[#FF6A13] bg-[#FF6A13]/5 pl-2 text-[#FF6A13]"
                    : "border-l-2 border-transparent pl-2 text-[#555] hover:text-[#A1A1A1]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
