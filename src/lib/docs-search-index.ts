import {
  Rocket,
  Brain,
  Settings,
  Cpu,
  Search,
  Cloud,
  LayoutDashboard,
  LifeBuoy,
  Code2,
  Zap,
  CloudCog,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface SidebarSection {
  title: string;
  icon: LucideIcon;
  category: "docs" | "api";
  items: SidebarItem[];
}

export interface SearchEntry {
  title: string;
  section: string;
  category: "docs" | "api";
  href: string;
  keywords: string[];
}

export const allSections: SidebarSection[] = [
  // ── Docs ──
  {
    title: "Get Started",
    icon: Rocket,
    category: "docs",
    items: [
      { label: "Welcome", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Quickstart", href: "/docs/quickstart" },
      { label: "Models & Pricing", href: "/docs/models" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Agent",
    icon: Brain,
    category: "docs",
    items: [
      { label: "Overview", href: "/docs/agent/overview" },
      { label: "Planning", href: "/docs/agent/planning" },
      { label: "Prompting", href: "/docs/agent/prompting" },
      { label: "Debugging", href: "/docs/agent/debugging" },
      {
        label: "Tools",
        href: "/docs/agent/tools",
        children: [
          { label: "File Tools", href: "/docs/agent/tools/file" },
          { label: "Shell & Terminal", href: "/docs/agent/tools/shell" },
          { label: "Code Intelligence", href: "/docs/agent/tools/code-intelligence" },
          { label: "Web Tools", href: "/docs/agent/tools/web" },
          { label: "Task & Planning", href: "/docs/agent/tools/task-planning" },
        ],
      },
      { label: "Parallel Agents", href: "/docs/agent/parallel-agents" },
      { label: "Security", href: "/docs/agent/security" },
    ],
  },
  {
    title: "Customizing",
    icon: Settings,
    category: "docs",
    items: [
      { label: "Configuration", href: "/docs/customizing/configuration" },
      { label: "Rules", href: "/docs/customizing/rules" },
      { label: "Skills", href: "/docs/customizing/skills" },
      { label: "Subagents", href: "/docs/customizing/subagents" },
      { label: "Hooks", href: "/docs/customizing/hooks" },
      { label: "Plugins", href: "/docs/customizing/plugins" },
      { label: "MCP", href: "/docs/customizing/mcp" },
    ],
  },
  {
    title: "Models & Providers",
    icon: Cpu,
    category: "docs",
    items: [
      { label: "Overview", href: "/docs/providers/overview" },
      { label: "Creor Gateway", href: "/docs/providers/gateway" },
      { label: "Anthropic", href: "/docs/providers/anthropic" },
      { label: "OpenAI", href: "/docs/providers/openai" },
      { label: "Google", href: "/docs/providers/google" },
      { label: "AWS Bedrock", href: "/docs/providers/bedrock" },
      { label: "Azure OpenAI", href: "/docs/providers/azure" },
      { label: "Open Source & Others", href: "/docs/providers/open-source" },
      { label: "OpenRouter", href: "/docs/providers/openrouter" },
      { label: "GitHub Copilot", href: "/docs/providers/copilot" },
      { label: "BYOK", href: "/docs/providers/byok" },
    ],
  },
  {
    title: "Codebase Search",
    icon: Search,
    category: "docs",
    items: [
      { label: "Overview", href: "/docs/rag/overview" },
      { label: "Indexing", href: "/docs/rag/indexing" },
      { label: "Configuration", href: "/docs/rag/configuration" },
    ],
  },
  {
    title: "Cloud Agents",
    icon: Cloud,
    category: "docs",
    items: [
      { label: "Overview", href: "/docs/cloud-agents/overview" },
      { label: "Setup", href: "/docs/cloud-agents/setup" },
      { label: "Capabilities", href: "/docs/cloud-agents/capabilities" },
      { label: "Bugbot", href: "/docs/cloud-agents/bugbot" },
      { label: "Best Practices", href: "/docs/cloud-agents/best-practices" },
      { label: "Security & Network", href: "/docs/cloud-agents/security-network" },
      { label: "Settings", href: "/docs/cloud-agents/settings" },
    ],
  },
  {
    title: "Dashboard & Account",
    icon: LayoutDashboard,
    category: "docs",
    items: [
      { label: "Billing & Credits", href: "/docs/dashboard/billing" },
      { label: "API Keys", href: "/docs/dashboard/keys" },
      { label: "Usage & Analytics", href: "/docs/dashboard/usage" },
      { label: "Team Management", href: "/docs/dashboard/team" },
      { label: "Marketplace", href: "/docs/dashboard/marketplace" },
      { label: "Settings", href: "/docs/dashboard/settings" },
    ],
  },
  {
    title: "Troubleshooting",
    icon: LifeBuoy,
    category: "docs",
    items: [
      { label: "Common Issues", href: "/docs/troubleshooting" },
      { label: "Terminal & Shell", href: "/docs/troubleshooting/terminal" },
      { label: "Network & Proxy", href: "/docs/troubleshooting/network" },
    ],
  },

  // ── API Reference ──
  {
    title: "API Overview",
    icon: Code2,
    category: "api",
    items: [
      { label: "Overview", href: "/docs/api" },
      { label: "Authentication", href: "/docs/api/authentication" },
      { label: "Rate Limits", href: "/docs/api/rate-limits" },
      { label: "Best Practices", href: "/docs/api/best-practices" },
    ],
  },
  {
    title: "Gateway API",
    icon: Zap,
    category: "api",
    items: [
      { label: "Overview", href: "/docs/api/gateway/overview" },
      { label: "Supported Models", href: "/docs/api/gateway/models" },
      { label: "Streaming", href: "/docs/api/gateway/streaming" },
    ],
  },
  {
    title: "Cloud Agents API",
    icon: CloudCog,
    category: "api",
    items: [
      "Overview", "List Agents", "Agent Status", "Agent Conversation",
      "List Artifacts", "Download Artifact", "Launch Agent", "Add Follow-up",
      "Stop Agent", "Delete Agent", "API Key Info", "List Models",
      "List Repositories", "Webhooks",
    ].map((item) => ({
      label: item,
      href: `/docs/api/cloud-agents/${item.toLowerCase().replace(/ /g, "-")}`,
    })),
  },
  {
    title: "Admin API",
    icon: ShieldCheck,
    category: "api",
    items: [
      "Overview", "Team Members", "Audit Logs", "Get Daily Usage Data",
      "Spending Data", "Get Usage Events Data", "User Spend Limit",
    ].map((item) => ({
      label: item,
      href: `/docs/api/admin/${item.toLowerCase().replace(/ /g, "-")}`,
    })),
  },
];

// Build flat search index from allSections
function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const section of allSections) {
    for (const item of section.items) {
      entries.push({
        title: item.label,
        section: section.title,
        category: section.category,
        href: item.href,
        keywords: item.label.toLowerCase().split(/\s+/),
      });

      if (item.children) {
        for (const child of item.children) {
          entries.push({
            title: child.label,
            section: section.title,
            category: section.category,
            href: child.href,
            keywords: child.label.toLowerCase().split(/\s+/),
          });
        }
      }
    }
  }

  return entries;
}

export const searchIndex: SearchEntry[] = buildSearchIndex();

export function searchDocs(query: string): SearchEntry[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();

  const scored = searchIndex
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const section = entry.section.toLowerCase();
      let score = 0;

      if (title.startsWith(q)) score = 4;
      else if (title.includes(q)) score = 3;
      else if (section.includes(q)) score = 2;
      else if (entry.keywords.some((k) => k.includes(q))) score = 1;

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 12).map(({ entry }) => entry);
}
