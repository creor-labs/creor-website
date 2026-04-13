"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth";
import {
  Loader2,
  AlertTriangle,
  Trash2,
  Bell,
  Download,
  ExternalLink,
  CheckCircle2,
  ArrowUpCircle,
} from "lucide-react";
import { api } from "@/lib/api";

const GITHUB_REPO = "modhisathvik7733/creor-app";

/* ── Notifications Section ── */

function NotificationsSection() {
  const [productUpdates, setProductUpdates] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("creor_notify_product_updates");
    return stored === null ? true : stored === "true";
  });

  const handleToggle = () => {
    const next = !productUpdates;
    setProductUpdates(next);
    localStorage.setItem("creor_notify_product_updates", String(next));
  };

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose what emails you receive from Creor
        </p>
      </div>
      <div className="divide-y divide-border">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-medium">Product updates</p>
            <p className="text-xs text-muted-foreground">
              New features, improvements, and announcements
            </p>
          </div>
          <button
            onClick={handleToggle}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              productUpdates ? "bg-indigo-500" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                productUpdates ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── IDE Version Section ── */

interface ReleaseInfo {
  version: string;
  publishedAt: string;
  notes: string;
  url: string;
}

function IDEVersionSection() {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
        { headers: { Accept: "application/vnd.github.v3+json" } },
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRelease({
        version: (data.tag_name as string).replace(/^v/, ""),
        publishedAt: data.published_at,
        notes: data.body ?? "",
        url: data.html_url,
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Extract first 2-3 lines from release notes for preview
  const previewNotes = (notes: string) => {
    const lines = notes
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
    return lines.slice(0, 3);
  };

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold">Creor IDE</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Latest version of the Creor desktop app
        </p>
      </div>
      <div className="p-5">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <p className="text-sm text-muted-foreground">
            Unable to check for updates right now.
          </p>
        ) : release ? (
          <div className="space-y-4">
            {/* Version badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/[0.08]">
                  <ArrowUpCircle className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">v{release.version}</p>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Latest
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Released {formatDate(release.publishedAt)}
                  </p>
                </div>
              </div>
              <a
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
              >
                <ExternalLink className="h-3 w-3" />
                View release
              </a>
            </div>

            {/* Release notes preview */}
            {release.notes && previewNotes(release.notes).length > 0 && (
              <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  What&apos;s new
                </p>
                <ul className="space-y-1">
                  {previewNotes(release.notes).map((line, i) => (
                    <li
                      key={i}
                      className="text-xs leading-relaxed text-foreground/70"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "macOS (Apple Silicon)", asset: "Creor-darwin-arm64.zip" },
                { label: "macOS (Intel)", asset: "Creor-darwin-x64.zip" },
                { label: "Windows", asset: "Creor-win32-x64.zip" },
                { label: "Linux", asset: "Creor-linux-x64.tar.gz" },
              ].map((dl) => (
                <a
                  key={dl.asset}
                  href={`https://github.com/${GITHUB_REPO}/releases/latest/download/${dl.asset}`}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Download className="h-3 w-3" />
                  {dl.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ── Danger Zone ── */

function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { logout } = useAuth();

  const handleDelete = async () => {
    if (confirmText !== "delete my account") return;
    setDeleting(true);
    try {
      await api.post("/api/users/me/delete", {});
      await logout();
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div className="rounded-xl border border-red-500/20 bg-card">
      <div className="border-b border-red-500/20 px-5 py-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500/70" />
          <h2 className="font-semibold">Danger Zone</h2>
        </div>
      </div>
      <div className="p-5">
        {!showConfirm ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account, data, and API keys
              </p>
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/20 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              This action is irreversible. Type{" "}
              <span className="font-mono text-foreground">delete my account</span>{" "}
              to confirm.
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="delete my account"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-red-500/50"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                disabled={confirmText !== "delete my account" || deleting}
                className="flex items-center gap-1.5 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {deleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                {deleting ? "Deleting..." : "Delete permanently"}
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText("");
                }}
                className="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Account Page ── */

export default function AccountPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(t);
  }, []);

  if (loading || !user) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-foreground" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Account</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-semibold">Profile</h2>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4">
              {user.avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-14 w-14 rounded-full"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-semibold text-foreground">
                  {user.name?.charAt(0)?.toUpperCase() ?? "?"}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <NotificationsSection />

        {/* IDE Version */}
        <IDEVersionSection />

        {/* Danger Zone */}
        <DangerZone />
      </div>
    </div>
  );
}
