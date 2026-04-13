import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  MessageCircle,
  Book,
  Bug,
  Mail,
  Github,
  ArrowRight,
  FileText,
  HelpCircle,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Support",
  description:
    "Get help with Creor. Browse docs, report issues, or reach out to the team.",
  path: "/support",
});

const CHANNELS = [
  {
    icon: Book,
    title: "Documentation",
    desc: "Guides, API references, and tutorials to get the most out of Creor.",
    link: "/docs",
    linkLabel: "Browse Docs",
  },
  {
    icon: Github,
    title: "GitHub Issues",
    desc: "Report bugs, request features, or browse existing issues on our public repo.",
    link: "https://github.com/creor-dev/creor/issues",
    linkLabel: "Open an Issue",
    external: true,
  },
  {
    icon: MessageCircle,
    title: "Discord Community",
    desc: "Join thousands of developers. Get help, share feedback, and connect with the team.",
    link: "https://discord.gg/creor",
    linkLabel: "Join Discord",
    external: true,
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "For account issues, billing questions, or anything that needs a private conversation.",
    link: "mailto:support@creor.dev",
    linkLabel: "Send Email",
    external: true,
  },
];

const FAQS = [
  {
    q: "How do I install Creor?",
    a: "Download Creor from the download page and follow the installation guide for your platform. We support macOS, Windows, and Linux.",
  },
  {
    q: "Is Creor free to use?",
    a: "Creor offers a free tier with generous limits. Check our pricing page for details on Pro and Team plans.",
  },
  {
    q: "Which AI models does Creor support?",
    a: "Creor works with Claude, GPT-4, Gemini, and any OpenAI-compatible API. You can switch models per session or set a default.",
  },
  {
    q: "How do I connect MCP servers?",
    a: "Go to Settings > Tools & MCP, click 'Add MCP Server', and enter the server URL. Check our docs for a list of community servers.",
  },
  {
    q: "Where is my data stored?",
    a: "All code stays local on your machine. Creor only sends the context you approve to the AI provider. No code is stored on our servers.",
  },
  {
    q: "How do I report a bug?",
    a: "Open a GitHub issue with reproduction steps, or use the in-app feedback button. Include your Creor version and OS for fastest resolution.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-[900px] px-6 pt-32 pb-20">
        {/* Hero */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">Support</h1>
        <p className="mt-4 max-w-[520px] text-lg text-foreground-secondary">
          Need help? We&apos;ve got you covered. Browse docs, ask the community,
          or reach out directly.
        </p>

        {/* Support Channels */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {CHANNELS.map((ch) => (
            <Link
              key={ch.title}
              href={ch.link}
              {...(ch.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <ch.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="mt-4 text-[15px] font-semibold">{ch.title}</h2>
              <p className="mt-1.5 flex-1 text-sm text-foreground-secondary">
                {ch.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors group-hover:text-white">
                {ch.linkLabel}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <div className="flex items-center gap-2.5">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-8 space-y-1">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-lg border border-white/[0.06] bg-white/[0.02] transition-colors hover:border-white/[0.10] [&[open]]:bg-white/[0.04]"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <Bug className="h-4 w-4 shrink-0 text-white/20 transition-transform group-open:rotate-45" />
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed text-foreground-secondary">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 text-center">
          <h3 className="text-xl font-bold">Still need help?</h3>
          <p className="mx-auto mt-2 max-w-[400px] text-sm text-foreground-secondary">
            Our team typically responds within a few hours. Drop us a message
            and we&apos;ll get back to you.
          </p>
          <Link
            href="mailto:support@creor.dev"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Contact Us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
