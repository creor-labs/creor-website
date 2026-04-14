"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Zap, Sparkles, Key, Crown, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/* ── Types ── */

interface ApiPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  monthlyLimit: number | null;
  features: string[];
}

interface PlanDisplay {
  id: string;
  name: string;
  price: number;
  desc: string;
  badge: string | null;
  icon: LucideIcon;
  iconColor: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

/* ── Per-plan display config (keyed by plan ID from API) ── */

const PLAN_CONFIG: Record<
  string,
  {
    icon: LucideIcon;
    iconColor: string;
    desc: string;
    badge: string | null;
    cta: string;
    highlighted: boolean;
    sortOrder: number;
  }
> = {
  free: {
    icon: Zap,
    iconColor: "text-emerald-400",
    desc: "Get started with your own API keys",
    badge: null,
    cta: "Get Started Free",
    highlighted: false,
    sortOrder: 0,
  },
  byok: {
    icon: Key,
    iconColor: "text-amber-400",
    desc: "Bring your own keys, zero limits",
    badge: null,
    cta: "Get BYOK",
    highlighted: false,
    sortOrder: 1,
  },
  starter: {
    icon: Sparkles,
    iconColor: "text-blue-400",
    desc: "One key, all models, simple",
    badge: null,
    cta: "Get Starter",
    highlighted: false,
    sortOrder: 2,
  },
  pro: {
    icon: Crown,
    iconColor: "text-indigo-400",
    desc: "Maximum power, priority everything",
    badge: "Most popular",
    cta: "Get Pro",
    highlighted: true,
    sortOrder: 3,
  },
  team: {
    icon: Crown,
    iconColor: "text-purple-400",
    desc: "For teams that ship together",
    badge: null,
    cta: "Get Team",
    highlighted: false,
    sortOrder: 4,
  },
};

/* ── Subscribable plan IDs ── */
type SubscribablePlan = "byok" | "starter" | "pro";
const SUBSCRIBABLE: Set<string> = new Set(["byok", "starter", "pro"]);

/* ── Feature ID → display label mapping ── */

const FEATURE_LABELS: Record<string, string> = {
  basic_models: "All AI models supported",
  all_models: "All AI models supported",
  email_support: "Email support",
  priority_models: "Priority model access",
  priority_support: "Priority support",
  dedicated_support: "Dedicated support",
  admin_roles: "Admin & team roles",
};

/* ── Build display features from API data ── */

function buildFeatures(plan: ApiPlan): string[] {
  const features: string[] = ["Full IDE & all features"];

  if (plan.id === "free") {
    if (plan.monthlyLimit != null) {
      features.push(`$${plan.monthlyLimit.toFixed(2)} free credits to start`);
    }
    features.push("Top up anytime via dashboard");
  } else if (plan.id === "byok") {
    features.push("Use your own API keys");
    features.push("No usage limits or quotas");
    features.push("Direct provider billing");
  } else {
    if (plan.price > 0) {
      features.push(`$${formatPrice(plan.price)}/mo in LLM credits`);
    }
    if (!plan.features.includes("basic_models")) {
      features.push("One API key for all models");
    }
  }

  for (const f of plan.features) {
    if (f === "all_models" || f === "basic_models") continue;
    const label = FEATURE_LABELS[f];
    if (label && !features.includes(label)) {
      features.push(label);
    }
  }

  return features;
}

function formatPrice(n: number): string {
  return n % 1 === 0 ? String(n) : n.toFixed(2);
}

/* ── Merge API data with display config ── */

function toDisplayPlans(apiPlans: ApiPlan[]): PlanDisplay[] {
  return apiPlans
    .filter((p) => PLAN_CONFIG[p.id])
    .map((p) => {
      const cfg = PLAN_CONFIG[p.id];
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        desc: cfg.desc,
        badge: cfg.badge,
        icon: cfg.icon,
        iconColor: cfg.iconColor,
        features: buildFeatures(p),
        cta: cfg.cta,
        highlighted: cfg.highlighted,
      };
    })
    .sort(
      (a, b) =>
        (PLAN_CONFIG[a.id]?.sortOrder ?? 99) -
        (PLAN_CONFIG[b.id]?.sortOrder ?? 99)
    );
}

/* ── Component ── */

export function PricingCards() {
  const [plans, setPlans] = useState<PlanDisplay[] | null>(null);
  const [error, setError] = useState(!API_URL);
  const [subscribingPlan, setSubscribingPlan] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!API_URL) return;

    let cancelled = false;
    fetch(`${API_URL}/api/billing/plans`, {
      headers: ANON_KEY ? { apikey: ANON_KEY } : {},
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch plans");
        return r.json();
      })
      .then((data: { plans: ApiPlan[] }) => {
        if (!cancelled) setPlans(toDisplayPlans(data.plans));
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => { cancelled = true; };
  }, []);

  const handleGetPlan = async (plan: PlanDisplay) => {
    // Free plan → go to waitlist/download
    if (plan.id === "free") {
      router.push("/waitlist");
      return;
    }

    // Paid plans — need auth
    if (authLoading) return;

    if (!user) {
      // Not logged in → redirect to login with return URL
      router.push(`/login?redirect=${encodeURIComponent(`/pricing?checkout=${plan.id}`)}`);
      return;
    }

    if (!SUBSCRIBABLE.has(plan.id)) return;

    // Logged in → call subscribe API to get Dodo checkout URL
    setSubscribingPlan(plan.id);
    try {
      const result = await api.subscribe(plan.id as SubscribablePlan);
      // Redirect to Dodo Payments checkout in same tab
      window.location.href = result.checkoutUrl;
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to start checkout. Please try again.");
    } finally {
      setSubscribingPlan(null);
    }
  };

  // Auto-trigger checkout if redirected back from login with ?checkout= param
  useEffect(() => {
    if (authLoading || !user || !plans) return;
    const params = new URLSearchParams(window.location.search);
    const checkoutPlan = params.get("checkout");
    if (checkoutPlan && SUBSCRIBABLE.has(checkoutPlan)) {
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
      const plan = plans.find((p) => p.id === checkoutPlan);
      if (plan) handleGetPlan(plan);
    }
  }, [authLoading, user, plans]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Loading skeleton */
  if (!plans && !error) {
    return (
      <div className="mx-auto grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex h-[420px] flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="mb-3 h-10 w-10 animate-pulse rounded-xl bg-white/[0.06]" />
            <div className="mb-1 h-5 w-20 animate-pulse rounded bg-white/[0.06]" />
            <div className="mb-5 h-4 w-36 animate-pulse rounded bg-white/[0.04]" />
            <div className="mb-6 h-10 w-24 animate-pulse rounded bg-white/[0.06]" />
            <div className="mb-5 h-px bg-white/[0.06]" />
            <div className="flex-1 space-y-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 w-full animate-pulse rounded bg-white/[0.04]" />
              ))}
            </div>
            <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-white/[0.04]" />
          </div>
        ))}
      </div>
    );
  }

  /* Error / empty */
  if (error || !plans || plans.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
        <Loader2 className="mx-auto mb-3 h-5 w-5 text-white/30" />
        <p className="text-[15px] text-white/40">
          Unable to load plans right now. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan, idx) => (
        <FadeIn key={plan.id} delay={idx * 100}>
          <div
            className={`group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 ${
              plan.highlighted
                ? "border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-indigo-500/[0.02] shadow-[0_0_40px_rgba(99,102,241,0.08)]"
                : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="whitespace-nowrap rounded-full bg-indigo-500/20 px-3.5 py-1 text-[13px] font-semibold text-indigo-300 ring-1 ring-indigo-500/30">
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Icon + Header */}
            <div className="mb-5">
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                  plan.highlighted ? "bg-indigo-500/15" : "bg-white/[0.06]"
                }`}
              >
                <plan.icon className={`h-5 w-5 ${plan.iconColor}`} />
              </div>
              <h2 className="text-[20px] font-bold text-white">{plan.name}</h2>
              <p className="mt-1 text-[14px] text-white/35">{plan.desc}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              {plan.price === 0 ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-white">
                    Free
                  </span>
                  <span className="ml-1 text-[14px] text-white/25">forever</span>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[16px] text-white/30">$</span>
                    <span className="text-4xl font-bold tracking-tight text-white">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="ml-1 text-[14px] text-white/25">/mo</span>
                  </div>
                  {plan.id !== "byok" && plan.price > 0 && (
                    <p className="mt-1.5 text-[13px] text-indigo-400/70">
                      ${formatPrice(plan.price)}/mo in LLM credits included
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div
              className={`mb-5 h-px ${
                plan.highlighted ? "bg-indigo-500/15" : "bg-white/[0.06]"
              }`}
            />

            {/* Features — grows to fill, pushing CTA to bottom */}
            <ul className="flex-1 space-y-3">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white/50"
                >
                  <Check
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                      plan.highlighted
                        ? "text-indigo-400/80"
                        : "text-emerald-400/50"
                    }`}
                  />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA — always pinned to bottom */}
            <button
              onClick={() => handleGetPlan(plan)}
              disabled={subscribingPlan === plan.id}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[15px] font-semibold transition-all disabled:opacity-60 ${
                plan.highlighted
                  ? "bg-white text-black shadow-lg shadow-white/10 hover:bg-white/90 hover:shadow-white/20"
                  : "border border-white/[0.1] bg-white/[0.04] text-white/80 hover:border-white/[0.2] hover:bg-white/[0.08]"
              }`}
            >
              {subscribingPlan === plan.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {plan.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
