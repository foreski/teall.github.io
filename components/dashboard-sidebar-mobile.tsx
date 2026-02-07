"use client";

import Link from "next/link";
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

interface DashboardSidebarMobileProps {
  serverId: string;
}

export function DashboardSidebarMobile({ serverId }: DashboardSidebarMobileProps) {
  const pathname = usePathname();
  const basePath = `/dashboard/${serverId}`;

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">T</span>
          </div>
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
    </div>
  );
}
