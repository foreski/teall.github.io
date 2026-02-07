import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAvatarUrl } from "@/lib/discord";
import { UserHeader } from "@/components/user-header";
import { TemplatesGallery } from "@/components/templates-gallery";

export default async function TemplatesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <UserHeader user={session.user} avatarUrl={getAvatarUrl(session.user)} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Templates</h1>
            <p className="text-muted-foreground">
              Pick a layout built by the community and deploy it to your server.
            </p>
          </div>

          <TemplatesGallery />
        </div>
      </div>
    </main>
  );
}
