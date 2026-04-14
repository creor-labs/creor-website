"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPrevNext } from "@/lib/docs-search-index";

export function DocsPrevNextNav() {
  const pathname = usePathname();
  const { prev, next } = getPrevNext(pathname);

  if (!prev && !next) return null;

  return (
    <div className="mt-16 flex gap-4 border-t border-[#1A1A1A] pt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-1 flex-col rounded-xl border border-[#1A1A1A] bg-[#111] p-4 transition-all hover:border-[#333] hover:bg-[#141414]"
        >
          <span className="mb-1 flex items-center gap-1.5 text-[11px] text-[#555]">
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="text-[13px] font-medium text-[#A1A1A1] group-hover:text-[#EDEDED]">
            {prev.label}
          </span>
          <span className="mt-0.5 text-[11px] text-[#444]">{prev.section}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-1 flex-col items-end rounded-xl border border-[#1A1A1A] bg-[#111] p-4 text-right transition-all hover:border-[#333] hover:bg-[#141414]"
        >
          <span className="mb-1 flex items-center gap-1.5 text-[11px] text-[#555]">
            Next
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-[13px] font-medium text-[#A1A1A1] group-hover:text-[#EDEDED]">
            {next.label}
          </span>
          <span className="mt-0.5 text-[11px] text-[#444]">{next.section}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
