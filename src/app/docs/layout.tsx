"use client";

import { useState, useCallback, useEffect } from "react";
import { DocsTopBar } from "@/components/docs/docs-top-bar";
import { DocsSearchModal } from "@/components/docs/docs-search";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

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
      <DocsTopBar onSearchOpen={openSearch} />
      <main className="w-full">{children}</main>
      <DocsSearchModal isOpen={searchOpen} onClose={closeSearch} />
    </div>
  );
}
