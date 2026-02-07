"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Terminal, Settings, Shield, Palette } from "lucide-react";

const commandCategories = [
  {
    id: "server",
    name: "Server Creation",
    icon: Terminal,
    commands: [
      { name: "/setup", description: "Pick a server template and watch us work!" },
      { name: "/templates", description: "Create a embed with a list of all templates (You're server is a template! Don't want it to be? Type /config edit and we can change that!" },
      { name: "/customtemplate [id]", description: "With the /templates command you can get a ID and paste it in this command, We will work to copy it and make it yours!" },
      { name: "/suggestion [suggestion]", description: "Directly pings a developer and lets them know the suggestion!" },
      { name: "/help", description: "Self-explanatory? Used to show all commands and their functions." },
      { name: "/delete", description: "Deletes every channel and category (Except the one you sent the command in)" },
    ],
  },
];

export function CommandsSection() {
  const [activeCategory, setActiveCategory] = useState("server");

  const currentCategory = commandCategories.find((c) => c.id === activeCategory);

  return (
    <section id="commands" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">TEAL COMMANDS LIST</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            We have a variety of commands at your disposal, as a member and admin of the server.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category tabs */}
          <div className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {commandCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap transition-all",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <category.icon className="h-5 w-5 shrink-0" />
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Commands list */}
          <div className="lg:col-span-3 glass rounded-2xl p-6">
            <div className="space-y-3">
              {currentCategory?.commands.map((command) => (
                <div
                  key={command.name}
                  className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-secondary/30 transition-colors"
                >
                  <code className="text-primary font-mono text-sm sm:text-base">{command.name}</code>
                  <span className="text-sm text-muted-foreground text-right ml-4">{command.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
