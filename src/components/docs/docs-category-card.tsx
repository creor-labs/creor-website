import Link from "next/link";
import type { SidebarSection } from "@/lib/docs-search-index";

export function DocsCategoryCard({ section }: { section: SidebarSection }) {
  const totalItems = section.items.reduce(
    (count, item) => count + 1 + (item.children?.length ?? 0),
    0
  );
  const firstHref = section.items[0]?.href ?? "/docs";
  const previewItems = section.items.slice(0, 4);

  return (
    <Link
      href={firstHref}
      className="group flex flex-col rounded-xl border border-[#1A1A1A] bg-[#111] p-5 transition-all hover:border-[#333] hover:bg-[#141414]"
    >
      {/* Icon */}
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A1A1A] transition-colors group-hover:bg-[#222]">
        <section.icon className="h-4 w-4 text-[#FF6A13]" />
      </div>

      {/* Title + count */}
      <h3 className="mb-1 text-[15px] font-semibold text-[#EDEDED]">
        {section.title}
      </h3>
      <p className="mb-3 text-[13px] text-[#666]">
        {section.description}
      </p>

      {/* Preview items */}
      <div className="mt-auto flex flex-col gap-1">
        {previewItems.map((item) => (
          <span key={item.href} className="text-[12px] text-[#444] group-hover:text-[#555]">
            {item.label}
          </span>
        ))}
        {totalItems > 4 && (
          <span className="text-[12px] text-[#333]">
            +{totalItems - 4} more
          </span>
        )}
      </div>
    </Link>
  );
}
