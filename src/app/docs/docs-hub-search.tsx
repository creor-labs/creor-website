"use client";

import { Search } from "lucide-react";

export function DocsHubSearch() {
  const triggerSearch = () => {
    // Dispatch Cmd+K to open the search modal managed by the layout
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
  };

  return (
    <button
      onClick={triggerSearch}
      className="flex h-12 w-full max-w-[480px] mx-auto items-center gap-3 rounded-xl border border-[#222] bg-[#111] px-5 text-[15px] text-[#555] transition-all hover:border-[#333] hover:bg-[#141414]"
    >
      <Search className="h-4.5 w-4.5 shrink-0 text-[#444]" />
      <span className="flex-1 text-left">Search documentation...</span>
      <kbd className="hidden items-center gap-0.5 rounded-md bg-[#1A1A1A] px-2 py-0.5 font-mono text-[11px] text-[#555] sm:flex">
        <span className="text-[12px]">&#x2318;</span>K
      </kbd>
    </button>
  );
}
