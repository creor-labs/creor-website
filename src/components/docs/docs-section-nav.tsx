"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSectionByBreadcrumb } from "@/lib/docs-search-index";

export function DocsSectionNav({ breadcrumb }: { breadcrumb: string }) {
  const pathname = usePathname();
  const section = getSectionByBreadcrumb(breadcrumb);

  if (!section) return null;

  const allItems = section.items.flatMap((item) => [
    { ...item, isChild: false },
    ...(item.children?.map((c) => ({ ...c, isChild: true })) ?? []),
  ]);

  return (
    <div className="mt-14 rounded-xl border border-[#1A1A1A] bg-[#111] p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <section.icon className="h-4 w-4 text-[#FF6A13]" />
        <h3 className="text-[14px] font-semibold text-[#EDEDED]">{section.title}</h3>
        <span className="text-[12px] text-[#444]">{allItems.length} pages</span>
      </div>
      <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
        {allItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-lg px-3 py-2 text-[13px] transition-colors ${
                item.isChild ? "pl-6" : ""
              } ${
                isActive
                  ? "bg-[#FF6A13]/10 text-[#FF6A13]"
                  : "text-[#888] hover:bg-[#1A1A1A] hover:text-[#EDEDED]"
              }`}
            >
              {isActive && (
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#FF6A13]" />
              )}
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
