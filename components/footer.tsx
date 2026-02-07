import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image
              src={"teal.png"}
              alt={"teal"}
              width={62}
              height={62}
              className="rounded-2xl"
            />
            <span className="text-lg font-bold tracking-wider text-foreground">TEAL</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#stats" className="hover:text-foreground transition-colors">
              Stats
            </Link>
            <Link href="#commands" className="hover:text-foreground transition-colors">
              Commands
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            © TEAL 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
