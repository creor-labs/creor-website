import Link from "next/link";
import type { SidebarSection } from "@/lib/docs-search-index";

export function DocsCategoryCard({ section }: { section: SidebarSection }) {
  const totalItems = section.items.reduce(
    (count, item) => count + 1 + (item.children?.length ?? 0),
    0
  );
  const firstHref = section.items.find((i) => i.href !== "/docs")?.href ?? section.items[0]?.href ?? "/docs";
  const previewItems = section.items.slice(0, 4);

  return (
    <div className="group flex flex-col rounded-xl border border-[#1A1A1A] bg-[#111] p-5 transition-all hover:border-[#282828]">
      {/* Header links to first page */}
      <Link href={firstHref}>
        <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A1A1A] transition-colors group-hover:bg-[#222]">
          <section.icon className="h-4 w-4 text-[#FF6A13]" />
        </div>
        <h3 className="mb-1 text-[15px] font-semibold text-[#EDEDED]">
          {section.title}
        </h3>
        <p className="mb-3 text-[13px] text-[#666]">
          {section.description}
        </p>
      </Link>

      {/* Each preview item links directly to its page */}
      <div className="mt-auto flex flex-col gap-0.5">
        {previewItems.map((item) => (
          <Link
            key={item.href}
            href={item.href === "/docs" ? "/docs/installation" : item.href}
            className="rounded px-1 py-0.5 text-[12px] text-[#555] transition-colors hover:bg-[#1A1A1A] hover:text-[#A1A1A1]"
          >
            {item.label}
          </Link>
        ))}
        {totalItems > 4 && (
          <Link
            href={firstHref}
            className="rounded px-1 py-0.5 text-[12px] text-[#333] transition-colors hover:text-[#555]"
          >
            +{totalItems - 4} more
          </Link>
        )}
      </div>
    </div>
  );
}
