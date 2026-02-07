"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, LayoutGrid, Rocket } from "lucide-react";

type Template = {
  id: string;
  name: string;
  author: string;
  description: string;
  highlights: string[];
  demoChannels: string[];
  demoRoles: string[];
};

const templates: Template[] = [
  {
    id: "aurora-ops",
    name: "Aurora Ops",
    author: "Luna K.",
    description: "A clean, modern operations server with structured channels and automated workflows.",
    highlights: ["Staff dashboards", "Incident triage", "Release notes"],
    demoChannels: ["#announcements", "#ops-briefing", "#incidents", "#deployments", "#post-mortems"],
    demoRoles: ["Ops Lead", "Incident Commander", "On-call", "Release Manager"],
  },
  {
    id: "neon-social",
    name: "Neon Social",
    author: "Kai Rivers",
    description: "Community-first template with growth and engagement baked in.",
    highlights: ["Onboarding flow", "Creator hubs", "Event zones"],
    demoChannels: ["#welcome", "#introductions", "#events", "#creators", "#memes"],
    demoRoles: ["Host", "Creator", "Event Lead", "Member"],
  },
  {
    id: "citadel-gaming",
    name: "Citadel Gaming",
    author: "Rhea Storm",
    description: "Competitive gaming layout with LFG, scrims, and tournament control.",
    highlights: ["LFG pipeline", "Team scrims", "Tournament staging"],
    demoChannels: ["#lfg", "#team-scrims", "#tournament-hq", "#strategy", "#clips"],
    demoRoles: ["Coach", "Captain", "Analyst", "Player"],
  },
];

interface TemplatesGalleryProps {
  deployHref?: string;
}

export function TemplatesGallery({ deployHref = "/servers" }: TemplatesGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(
    () => templates.find((template) => template.id === selectedId) ?? null,
    [selectedId]
  );

  if (selected) {
    return (
      <div className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-foreground">{selected.name}</CardTitle>
                <CardDescription>Template by {selected.author}</CardDescription>
              </div>
              <Button variant="ghost" className="gap-2" onClick={() => setSelectedId(null)}>
                <ArrowLeft className="h-4 w-4" />
                Go back
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{selected.description}</p>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                <p className="text-sm font-semibold text-foreground mb-3">Demo Preview</p>
                <div className="space-y-3">
                  {selected.demoChannels.map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2 text-sm text-foreground"
                    >
                      <span>{channel}</span>
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                <p className="text-sm font-semibold text-foreground mb-3">Roles Included</p>
                <div className="flex flex-wrap gap-2">
                  {selected.demoRoles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                <p className="text-sm font-semibold text-foreground mb-3">Highlights</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {selected.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild className="gap-2">
                  <Link href={`${deployHref}?template=${selected.id}`}>
                    <Rocket className="h-4 w-4" />
                    Deploy to server
                  </Link>
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => setSelectedId(null)}>
                  <ArrowLeft className="h-4 w-4" />
                  Go back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="bg-card border-border transition hover:-translate-y-1 hover:border-primary/40"
        >
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <LayoutGrid className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Template
              </span>
            </div>
            <div>
              <CardTitle className="text-lg text-foreground">{template.name}</CardTitle>
              <CardDescription>by {template.author}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{template.description}</p>
            <Button className="w-full" onClick={() => setSelectedId(template.id)}>
              View demo
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
