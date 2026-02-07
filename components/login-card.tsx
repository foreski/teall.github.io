"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

const errorMessages: Record<string, string> = {
  no_code: "Authentication was cancelled or failed.",
  config: "Server configuration error. Please try again later.",
  token_exchange: "Failed to authenticate with Discord.",
  user_fetch: "Failed to fetch user information.",
  unknown: "An unexpected error occurred.",
};

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function LoginCard({ error }: { error?: string }) {
  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="glass rounded-2xl p-8 glow-teal">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="flex items-center gap-3 mb-6">
                        <Image
                          src={"teal.png"}
                          alt={"teal"}
                          width={62}
                          height={62}
                          className="rounded-2xl"
                        />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to access your dashboard</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-destructive/10 border border-destructive/20 p-4">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
            <p className="text-sm text-destructive">
              {errorMessages[error] || "An error occurred. Please try again."}
            </p>
          </div>
        )}

        <Button
          size="lg"
          className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white"
          asChild
        >
          <a href="https://discord.com/oauth2/authorize?client_id=1002002743420010697&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds">
            <DiscordIcon className="h-5 w-5 mr-2" />
            Continue with Discord
          </a>
        </Button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {"By signing in, you agree to let TEAL access your Discord account information and server list."}
        </p>
      </div>
    </div>
  );
}
