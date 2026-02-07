"use client";

import Link from "next/link";
import Image from "next/image";
import { type DiscordGuild, getGuildBannerUrl, getGuildIconUrl } from "@/lib/discord";
import { Crown, Settings } from "lucide-react";

interface ServersGridProps {
  guilds: DiscordGuild[];
}

function ServerCard({ guild }: { guild: DiscordGuild }) {
  const iconUrl = getGuildIconUrl(guild);
  const bannerUrl = getGuildBannerUrl(guild);

  return (
    <Link
      href={`/dashboard/${guild.id}`}
      className="group glass rounded-2xl p-6 hover:bg-secondary/50 transition-all duration-300 flex flex-col text-left relative overflow-hidden"
    >
      {bannerUrl ? (
        <div className="absolute inset-0">
          <Image
            src={bannerUrl}
            alt={`${guild.name} banner`}
            fill
            className="object-cover opacity-60 transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background/40 to-background" />
      )}

      <div className="relative mb-4 flex items-center gap-3">
        {iconUrl ? (
          <Image
            src={iconUrl || "/placeholder.svg"}
            alt={guild.name}
            width={80}
            height={80}
            className="rounded-2xl group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-primary">
              {guild.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {guild.owner && (
          <div
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center"
            title="Owner"
          >
            <Crown className="h-3 w-3 text-yellow-900" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1 max-w-full">{guild.name}</h3>
          <p className="text-xs text-muted-foreground">{guild.owner ? "Owner" : "Administrator"}</p>
        </div>
      </div>
      <div className="relative mt-auto flex items-center gap-2 text-sm text-primary group-hover:text-primary/80 transition-colors">
        <Settings className="h-4 w-4" />
        <span>Manage</span>
      </div>
    </Link>
  );
}

export function ServersGrid({ guilds }: ServersGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {guilds.map((guild) => (
        <ServerCard key={guild.id} guild={guild} />
      ))}
    </div>
  );
}
