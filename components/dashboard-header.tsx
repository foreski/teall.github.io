"use client";

import Link from "next/link";
import Image from "next/image";
import type { DiscordUser } from "@/lib/discord";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Server, ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebarMobile } from "@/components/dashboard-sidebar-mobile";

interface DashboardHeaderProps {
  user: DiscordUser;
  avatarUrl: string;
  serverId: string;
}

export function DashboardHeader({ user, avatarUrl, serverId }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-card border-border">
            <DashboardSidebarMobile serverId={serverId} />
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-semibold text-foreground hidden sm:block">Dashboard</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 h-auto py-2 px-3 hover:bg-secondary">
            <Image
              src={avatarUrl || "/placeholder.svg"}
              alt={user.globalName || user.username}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden sm:block text-foreground font-medium">
              {user.globalName || user.username}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-card border-border">
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-foreground">{user.globalName || user.username}</p>
            <p className="text-xs text-muted-foreground">@{user.username}</p>
          </div>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/servers" className="flex items-center gap-2 text-foreground">
              <Server className="h-4 w-4" />
              Switch Server
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem asChild className="cursor-pointer text-destructive focus:text-destructive">
            <a href="/api/auth/logout" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Log out
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
