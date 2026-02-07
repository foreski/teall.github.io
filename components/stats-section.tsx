"use client";

import { useEffect, useState } from "react";
import { BarChart3, Minus, Plus, Server, Users } from "lucide-react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const [isOpen, setIsOpen] = useState(true);
  const [uptimeSeconds, setUptimeSeconds] = useState<number | null>(null);
  const [statusText, setStatusText] = useState("offline");
  const [serverCount, setServerCount] = useState<number | null>(null);
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [offlineSince, setOfflineSince] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const statusUrl =
      process.env.NEXT_PUBLIC_BOT_STATUS_URL ?? "http://localhost:3001/status";

    const fetchStatus = async () => {
      try {
        const response = await fetch(statusUrl, { cache: "no-store" });
        if (!response.ok) throw new Error("Status request failed");
        const data = (await response.json()) as {
          status?: string;
          uptime_seconds?: number;
          server_count?: number;
          member_count?: number;
        };
        if (!isMounted) return;
        const nextStatus = (data.status ?? "online").toLowerCase();
        setStatusText(nextStatus);
        if (nextStatus === "offline") {
          setOfflineSince((prev) => prev ?? Date.now());
        } else {
          setOfflineSince(null);
        }
        setUptimeSeconds(
          typeof data.uptime_seconds === "number" ? data.uptime_seconds : null
        );
        setServerCount(
          typeof data.server_count === "number" ? data.server_count : null
        );
        setMemberCount(
          typeof data.member_count === "number" ? data.member_count : null
        );
      } catch {
        if (!isMounted) return;
        setStatusText("offline");
        setOfflineSince((prev) => prev ?? Date.now());
        setUptimeSeconds(null);
        setServerCount(null);
        setMemberCount(null);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    const ticker = setInterval(() => {
      setUptimeSeconds((prev) => (typeof prev === "number" ? prev + 1 : prev));
      setTick((prev) => prev + 1);
    }, 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
      clearInterval(ticker);
    };
  }, []);

  const formatUptime = (seconds: number | null) => {
    if (seconds === null) return "—";
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return "—";
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  const downtimeSeconds =
    statusText === "offline" && offlineSince ? Math.max(0, Math.floor((Date.now() - offlineSince) / 1000)) : null;

  const statusVariant =
    statusText === "maintenance"
      ? "maintenance"
      : statusText === "online"
        ? "online"
        : "offline";
  const statusStyles = {
    online: "bg-emerald-500/15 text-emerald-300",
    maintenance: "bg-amber-500/20 text-amber-300",
    offline: "bg-rose-500/20 text-rose-300",
  } as const;
  const statusDotStyles = {
    online: "bg-emerald-400",
    maintenance: "bg-amber-400",
    offline: "bg-rose-400",
  } as const;

  return (
    <section id="stats" className="relative">
      <div className="sr-only">Statistics</div>
      <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2 sm:bottom-6 sm:left-6">
        {isOpen ? (
          <div className="glass glow-teal w-96 rounded-2xl p-4 shadow-xl transition-transform duration-300 hover:-translate-y-1 animate-float">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Statistics
              </span>
              <button
                type="button"
                aria-label="Minimize stats"
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors hover:bg-primary/25"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-center">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {memberCount !== null ? memberCount.toLocaleString() : "—"}
                </div>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-center">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
                  <Server className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {serverCount !== null ? serverCount.toLocaleString() : "—"}
                </div>
                <p className="text-xs text-muted-foreground">Servers</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary/40 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {statusVariant === "offline" ? "Downtime" : "Uptime"}
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {statusVariant === "offline"
                    ? formatDuration(downtimeSeconds)
                    : formatUptime(uptimeSeconds)}
                </p>
              </div>
              <div className="rounded-xl bg-secondary/40 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Status</p>
                <div
                  className={`mt-1 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[statusVariant]}`}
                >
                  <span className={`h-2 w-2 rounded-full ${statusDotStyles[statusVariant]}`} />
                  {statusVariant}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            aria-label="Maximize stats"
            onClick={() => setIsOpen(true)}
            className="glass glow-teal flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground shadow-lg transition-transform duration-300 hover:-translate-y-1 animate-float"
          >
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="font-medium">Stats</span>
            <Plus className="h-4 w-4 text-primary" />
          </button>
        )}
      </div>
    </section>
  );
}
