import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-3xl p-12 glow-teal">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Server Creation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What are you still waiting for?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of servers already using TEAL to build and manage their Discord communities.
          </p>

          <Button
            size="lg"
            className="h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 text-lg"
            asChild
          >
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add the Bot
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
