"use client";

import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Settings,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "", icon: LayoutDashboard },
  { name: "Templates", href: "/templates", icon: FileText },
  { name: "Logs", href: "/logs", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface DashboardSidebarProps {
  serverId: string;
}

export function DashboardSidebar({ serverId }: DashboardSidebarProps) {
  const pathname = usePathname();
  const basePath = `/dashboard/${serverId}`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col border-r border-border bg-card">
        <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/teal.png"}
              alt={"teal"}
              width={62}
              height={62}
              className="rounded-2xl"
            />
            <span className="text-lg font-bold tracking-wider text-foreground">TEAL</span>
          </Link>
        </div>

        <div className="px-4 py-4">
          <Link
            href="/servers"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Servers
          </Link>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {navigation.map((item) => {
            const href = item.href ? `${basePath}${item.href}` : basePath;
            const isActive = item.href
              ? pathname === href
              : pathname === basePath;

            return (
              <Link
                key={item.name}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-2">Need help?</p>
            <a
              href="https://discord.gg/uWVHcm2Q7C"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Join our support server
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card">
        <nav className="flex items-center justify-around py-2">
          {navigation.slice(0, 5).map((item) => {
            const href = item.href ? `${basePath}${item.href}` : basePath;
            const isActive = item.href
              ? pathname === href
              : pathname === basePath;

            return (
              <Link
                key={item.name}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
