import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginCard } from "@/components/login-card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSession();

  if (session) {
    redirect("/servers");
  }

  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
      </div>
      <LoginCard error={error} />
    </main>
  );
}
