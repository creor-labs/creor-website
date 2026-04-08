"use client";

import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";
import type { Components } from "react-markdown";
import "highlight.js/styles/github-dark.css";

// ── Copy button ──

function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      title="Copy"
      className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:bg-white/10 hover:text-white ${className ?? ""}`}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-green-400" />
          <span className="text-green-400">Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

// ── Components ──

interface CodeProps {
  children?: React.ReactNode;
  className?: string;
}

const components: Components = {
  // Code blocks (fenced)
  pre({ children }) {
    // Extract text from the code element inside pre
    const codeEl = (children as React.ReactElement<CodeProps>)?.props ?? {};
    const rawText: string =
      typeof codeEl.children === "string"
        ? codeEl.children
        : Array.isArray(codeEl.children)
        ? (codeEl.children as string[]).join("")
        : "";

    // Get language from className like "language-typescript"
    const langClass: string = codeEl.className ?? "";
    const lang = langClass.replace("language-", "") || "";

    return (
      <div className="group relative my-4 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-1.5">
          <span className="text-[11px] font-medium text-white/50">{lang || "code"}</span>
          <CopyButton text={rawText} />
        </div>
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">{children}</pre>
      </div>
    );
  },

  // Inline code
  code({ children, className }: CodeProps) {
    const isBlock = (className ?? "").startsWith("language-");
    if (isBlock) {
      // Let the parent <pre> handle this
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
        {children}
      </code>
    );
  },

  // Headings
  h1: ({ children }) => (
    <h1 className="mt-6 mb-3 text-2xl font-bold text-foreground">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-5 mb-2.5 text-xl font-semibold text-foreground">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-4 mb-2 text-lg font-semibold text-foreground">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-3 mb-1.5 text-base font-semibold text-foreground">{children}</h4>
  ),

  // Paragraph
  p: ({ children }) => (
    <p className="mb-3 leading-[1.75] text-foreground last:mb-0">{children}</p>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="mb-3 space-y-1 pl-5 text-foreground [&>li]:list-disc">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 space-y-1 pl-5 text-foreground [&>li]:list-decimal">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-[1.7] pl-1">{children}</li>,

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-[3px] border-border pl-4 text-muted-foreground italic">
      {children}
    </blockquote>
  ),

  // Table
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-[14px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted/50 text-left">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-border px-4 py-2.5 font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border/50 px-4 py-2 text-foreground">{children}</td>
  ),
  tr: ({ children }) => (
    <tr className="transition-colors hover:bg-muted/30">{children}</tr>
  ),

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 underline-offset-2 hover:underline"
    >
      {children}
    </a>
  ),

  // HR
  hr: () => <hr className="my-4 border-border" />,

  // Strong / em
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-foreground">{children}</em>,
};

// ── MarkdownBlock ──

interface Props {
  text: string;
}

export function MarkdownBlock({ text }: Props) {
  return (
    <div className="markdown-body text-[15px] leading-[1.75] text-foreground/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
