"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsSearchTrigger, DocsSearchModal } from "@/components/docs/docs-search";
import { DocsMobileNav } from "@/components/docs/docs-mobile-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  // Global cmd+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#EDEDED] font-sans selection:bg-[#FF6A13] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-[56px] items-center justify-between border-b border-[#1A1A1A] bg-[#0E0E0E]/95 px-4 backdrop-blur-md">
        {/* Left: mobile hamburger + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="rounded-md p-1.5 text-[#888] transition-colors hover:bg-[#1A1A1A] hover:text-[#EDEDED] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <Image
              src="/creor-nobg-icon.png"
              alt="Creor"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="text-[15px] font-bold tracking-tight">Creor</span>
          </Link>
        </div>

        {/* Center: search */}
        <div className="hidden flex-1 justify-center px-8 sm:flex">
          <DocsSearchTrigger onOpen={openSearch} />
        </div>

        {/* Right: dashboard */}
        <div className="flex items-center gap-3">
          <button
            onClick={openSearch}
            className="rounded-md p-1.5 text-[#888] transition-colors hover:bg-[#1A1A1A] hover:text-[#EDEDED] sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <Link
            href="/dashboard"
            className="flex h-8 items-center rounded-lg border border-[#222] bg-[#141414] px-4 text-[13px] font-medium text-[#EDEDED] transition-colors hover:bg-[#1A1A1A]"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Body */}
      <div className="flex w-full">
        <DocsSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {/* Search modal */}
      <DocsSearchModal isOpen={searchOpen} onClose={closeSearch} />

      {/* Mobile nav */}
      <DocsMobileNav
        isOpen={mobileNavOpen}
        onClose={closeMobileNav}
        onSearchOpen={openSearch}
      />
    </div>
  );
}
