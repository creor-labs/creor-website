"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";
import { getSectionByBreadcrumb } from "@/lib/docs-search-index";

export function DocsBreadcrumbNav({ breadcrumb }: { breadcrumb: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const section = getSectionByBreadcrumb(breadcrumb);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Find current page label
  const allItems = section?.items.flatMap((item) => [
    item,
    ...(item.children ?? []),
  ]) ?? [];
  const currentPage = allItems.find((i) => i.href === pathname);

  return (
    <nav className="mb-6 flex items-center gap-1.5 text-[13px]">
      <Link href="/docs" className="text-[#555] transition-colors hover:text-[#A1A1A1]">
        Docs
      </Link>
      <ChevronRight className="h-3 w-3 text-[#333]" />

      {/* Section dropdown */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 transition-colors ${open ? "bg-[#1A1A1A] text-[#EDEDED]" : "text-[#555] hover:text-[#A1A1A1]"}`}
        >
          {breadcrumb}
          <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && section && (
          <div className="absolute left-0 top-full z-50 mt-1.5 w-[240px] rounded-xl border border-[#222] bg-[#111] py-2 shadow-2xl shadow-black/40">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#444]">
              {section.title}
            </p>
            {section.items.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-3 py-1.5 text-[13px] transition-colors ${
                    pathname === item.href
                      ? "bg-[#FF6A13]/10 text-[#FF6A13]"
                      : "text-[#888] hover:bg-[#1A1A1A] hover:text-[#EDEDED]"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center pl-6 pr-3 py-1.5 text-[13px] transition-colors ${
                      pathname === child.href
                        ? "bg-[#FF6A13]/10 text-[#FF6A13]"
                        : "text-[#666] hover:bg-[#1A1A1A] hover:text-[#EDEDED]"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {currentPage && (
        <>
          <ChevronRight className="h-3 w-3 text-[#333]" />
          <span className="text-[#A1A1A1]">{currentPage.label}</span>
        </>
      )}
    </nav>
  );
}
