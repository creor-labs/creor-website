"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Search } from "lucide-react";
import { allSections, type SidebarItem } from "@/lib/docs-search-index";
import { cn } from "@/lib/utils";

function MobileSidebarLink({ item, pathname, onClose }: { item: SidebarItem; pathname: string; onClose: () => void }) {
  const isActive = pathname === item.href;

  return (
    <>
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          "block rounded-md px-3 py-2 text-[14px] transition-colors",
          isActive
            ? "border-l-2 border-[#FF6A13] pl-2.5 font-medium text-[#FF6A13]"
            : "text-[#888] hover:bg-[#151515] hover:text-[#ccc]"
        )}
      >
        {item.label}
      </Link>
      {item.children?.map((child) => (
        <Link
          key={child.href}
          href={child.href}
          onClick={onClose}
          className={cn(
            "block rounded-md px-3 py-2 pl-7 text-[13px] transition-colors",
            pathname === child.href
              ? "border-l-2 border-[#FF6A13] pl-6.5 font-medium text-[#FF6A13]"
              : "text-[#666] hover:bg-[#151515] hover:text-[#aaa]"
          )}
        >
          {child.label}
        </Link>
      ))}
    </>
  );
}

export function DocsMobileNav({
  isOpen,
  onClose,
  onSearchOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
}) {
  const pathname = usePathname();

  // Close on navigation
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const docsSections = allSections.filter((s) => s.category === "docs");
  const apiSections = allSections.filter((s) => s.category === "api");

  return (
    <div className="fixed inset-0 z-50 md:hidden" style={{ animation: "search-backdrop-in 0.15s ease-out" }}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="absolute inset-y-0 left-0 w-[300px] overflow-y-auto bg-[#0B0B0B] border-r border-[#1A1A1A]"
        style={{ animation: "slide-in-left 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A] px-4 py-3">
          <span className="text-[14px] font-semibold text-[#EDEDED]">Navigation</span>
          <button onClick={onClose} className="rounded-md p-1 text-[#666] hover:text-[#EDEDED]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-[#1A1A1A] px-4 py-3">
          <button
            onClick={() => { onClose(); onSearchOpen(); }}
            className="flex w-full items-center gap-2 rounded-lg border border-[#222] bg-[#111] px-3 py-2 text-[13px] text-[#555] transition-colors hover:border-[#333]"
          >
            <Search className="h-3.5 w-3.5" />
            Search docs...
          </button>
        </div>

        {/* Sections */}
        <nav className="space-y-5 p-4">
          {docsSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title}>
                <div className="mb-2 flex items-center gap-2 px-3">
                  <Icon className="h-3.5 w-3.5 text-[#555]" />
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#555]">
                    {section.title}
                  </h4>
                </div>
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => (
                    <MobileSidebarLink key={item.href} item={item} pathname={pathname} onClose={onClose} />
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex items-center gap-3 px-3">
            <div className="h-px flex-1 bg-[#1A1A1A]" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FF6A13]/60">API</span>
            <div className="h-px flex-1 bg-[#1A1A1A]" />
          </div>

          {apiSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title}>
                <div className="mb-2 flex items-center gap-2 px-3">
                  <Icon className="h-3.5 w-3.5 text-[#FF6A13]/50" />
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#555]">
                    {section.title}
                  </h4>
                </div>
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => (
                    <MobileSidebarLink key={item.href} item={item} pathname={pathname} onClose={onClose} />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
