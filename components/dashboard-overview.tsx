"use client";

import Image from "next/image";
import type { DiscordGuild } from "@/lib/discord";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  FileText,
  Settings,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";

interface DashboardOverviewProps {
  guild: DiscordGuild;
  iconUrl: string;
  bannerUrl: string;
}

const quickStats = [
  { label: "Templates Applied", value: "3", icon: FileText, change: "+1 this week" },
];

const quickActions = [
  { label: "Apply Template", href: "templates", icon: FileText },
  { label: "Server Settings", href: "settings", icon: Settings },
];

const moduleStatus = [
  { name: "Logging", enabled: true, description: "Track server events and actions" },
];

export function DashboardOverview({ guild, iconUrl, bannerUrl }: DashboardOverviewProps) {
  return (
    <div className="space-y-8 pb-20 lg:pb-8">
      {/* Server header */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6">
        {bannerUrl ? (
          <div className="absolute inset-0">
            <Image
              src={bannerUrl}
              alt={`${guild.name} banner`}
              fill
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/60 to-background" />
        )}

        <div className="relative flex items-center gap-4">
          {iconUrl ? (
            <Image
              src={iconUrl || "/placeholder.svg"}
              alt={guild.name}
              width={64}
              height={64}
              className="rounded-2xl"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {guild.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{guild.name}</h1>
            <p className="text-muted-foreground">Server Dashboard</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>Common tasks for your server</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 border-border text-foreground hover:bg-secondary bg-transparent"
                  asChild
                >
                  <Link href={action.href}>
                    <action.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm">{action.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Module status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Modules</CardTitle>
            <CardDescription>Enable or disable bot features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moduleStatus.map((module) => (
                <div
                  key={module.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    {module.enabled ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{module.name}</p>
                      <p className="text-xs text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                  <Switch checked={module.enabled} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
          <CardDescription>Latest actions performed by TEAL</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Template applied", user: "Admin", time: "2 minutes ago", icon: FileText },
              { action: "Template draft saved", user: "Admin", time: "20 minutes ago", icon: CheckCircle },
              { action: "Server layout updated", user: "Admin", time: "1 hour ago", icon: Settings },
              { action: "Template published", user: "Admin", time: "3 hours ago", icon: FileText },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
