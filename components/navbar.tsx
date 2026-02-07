"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
                          <Image
                            src={"teal.png"}
                            alt={"teal"}
                            width={62}
                            height={62}
                            className="rounded-full"
                          />
            <span className="text-xl font-bold tracking-wider text-foreground">TEAL</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#commands" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Commands
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to Discord
              </a>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#commands" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Commands
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" asChild className="justify-start text-muted-foreground">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-primary text-primary-foreground">
                  <a href="https:/example.com">
                    Add to Discord
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
