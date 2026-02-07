"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slideUp">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Build your </span>
            <span className="text-gradient">Discord server</span>
            <span className="text-foreground"> with ease</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
            Need help with a server design? We have pre-made templates and even other peoples servers you can review and set as your own. Get started in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 glow-teal"
              asChild
            >
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to Discord
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-border text-foreground hover:bg-secondary bg-transparent"
              asChild
            >
              <Link href="/login">
                Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating cards preview */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-6 animate-float" style={{ animationDelay: "0s" }}>
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-primary text-lg">01</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Choose Template</h3>
              <p className="text-sm text-muted-foreground">Browse hundreds of pre-made server templates</p>
            </div>
            <div className="glass rounded-xl p-6 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-primary text-lg">02</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Customize</h3>
              <p className="text-sm text-muted-foreground">Adjust settings to match your needs</p>
            </div>
            <div className="glass rounded-xl p-6 animate-float" style={{ animationDelay: "1s" }}>
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-primary text-lg">03</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Deploy</h3>
              <p className="text-sm text-muted-foreground">Apply the template to your server instantly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
