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
import { LogOut, User, ChevronDown } from "lucide-react";

interface UserHeaderProps {
  user: DiscordUser;
  avatarUrl: string;
}

export function UserHeader({ user, avatarUrl }: UserHeaderProps) {
  return (
    <header className="border-b border-border glass sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
<Image
              src={"teal.png"}
              alt={"teal"}
              width={62}
              height={62}
              className="rounded-2xl"
            />
            <span className="text-xl font-bold tracking-wider text-foreground">TEAL</span>
          </Link>

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
            <DropdownMenuContent align="end" className="w-56 glass border-border">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground">{user.globalName || user.username}</p>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
              </div>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/servers" className="flex items-center gap-2 text-foreground">
                  <User className="h-4 w-4" />
                  My Servers
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
        </div>
      </div>
    </header>
  );
}
