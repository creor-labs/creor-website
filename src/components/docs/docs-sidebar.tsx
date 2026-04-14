"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { allSections, type SidebarItem } from "@/lib/docs-search-index";
import { cn } from "@/lib/utils";

function SidebarLink({ item, pathname }: { item: SidebarItem; pathname: string }) {
  const isActive = pathname === item.href;
  const isChildActive = item.children?.some((child) => pathname === child.href) ?? false;
  const [isOpen, setIsOpen] = useState(isActive || isChildActive);

  if (item.children) {
    return (
      <div>
        <div className="flex items-center">
          <Link
            href={item.href}
            className={cn(
              "flex-1 rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
              isActive
                ? "border-l-2 border-[#FF6A13] pl-2 font-medium text-[#FF6A13]"
                : "text-[#888] hover:bg-[#151515] hover:text-[#ccc]"
            )}
          >
            {item.label}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-1 text-[#555] transition-colors hover:bg-[#151515] hover:text-[#aaa]"
          >
            {isOpen ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>
        </div>
        {isOpen && (
          <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-[#1A1A1A] pl-2">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[12px] transition-colors",
                  pathname === child.href
                    ? "border-l-2 border-[#FF6A13] pl-2 font-medium text-[#FF6A13]"
                    : "text-[#666] hover:bg-[#151515] hover:text-[#aaa]"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
        isActive
          ? "border-l-2 border-[#FF6A13] pl-2 font-medium text-[#FF6A13]"
          : "text-[#888] hover:bg-[#151515] hover:text-[#ccc]"
      )}
    >
      {item.label}
    </Link>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const docsSections = allSections.filter((s) => s.category === "docs");
  const apiSections = allSections.filter((s) => s.category === "api");

  return (
    <aside className="sticky top-[56px] hidden h-[calc(100vh-56px)] w-[280px] shrink-0 overflow-y-auto border-r border-[#1A1A1A] bg-gradient-to-b from-[#111] to-[#0B0B0B] py-6 pl-5 pr-3 md:block">
      <nav className="space-y-6">
        {docsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title}>
              <div className="mb-2 flex items-center gap-2 px-2.5">
                <Icon className="h-3.5 w-3.5 text-[#555]" />
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#555]">
                  {section.title}
                </h4>
              </div>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <SidebarLink key={item.href} item={item} pathname={pathname} />
                ))}
              </div>
            </div>
          );
        })}

        {/* API Reference Divider */}
        <div className="flex items-center gap-3 px-2.5 pt-2">
          <div className="h-px flex-1 bg-[#1A1A1A]" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FF6A13]/60">
            API Reference
          </span>
          <div className="h-px flex-1 bg-[#1A1A1A]" />
        </div>

        {apiSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title}>
              <div className="mb-2 flex items-center gap-2 px-2.5">
                <Icon className="h-3.5 w-3.5 text-[#FF6A13]/50" />
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#555]">
                  {section.title}
                </h4>
              </div>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <SidebarLink key={item.href} item={item} pathname={pathname} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
