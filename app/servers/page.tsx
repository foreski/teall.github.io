import { redirect } from "next/navigation";
import { getBotGuildIds, getSession, getUserGuilds } from "@/lib/auth";
import { hasAdminPermissions, getAvatarUrl } from "@/lib/discord";
import { ServersGrid } from "@/components/servers-grid";
import { UserHeader } from "@/components/user-header";

export default async function ServersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  let guilds = [];
  let error = null;

  try {
    const allGuilds = await getUserGuilds(session.accessToken);
    const botGuildIds = await getBotGuildIds();
    // Filter to only show servers where user is owner or has admin permissions
    guilds = allGuilds.filter(
      (guild) =>
        (guild.owner || hasAdminPermissions(guild.permissions)) && botGuildIds.has(guild.id)
    );
  } catch (e) {
    console.error("Failed to fetch guilds:", e);
    error = "Failed to load your servers. Please try logging in again.";
  }

  return (
    <main className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <UserHeader user={session.user} avatarUrl={getAvatarUrl(session.user)} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">Select a Server</h1>
            <p className="text-muted-foreground">
              Choose a server where you have admin permissions to manage TEAL settings.
            </p>
          </div>

          {error ? (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <a href="/api/auth/logout" className="text-primary hover:underline">
                Log out and try again
              </a>
            </div>
          ) : guilds.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">No servers found</h2>
              <p className="text-muted-foreground mb-6">
                {"You don't have admin permissions in any servers that have TEAL installed, or TEAL isn't in any of your servers yet."}
              </p>
              <a
                href="https://discord.com/oauth2/authorize?client_id=1002002743420010697&permissions=0&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fservers&integration_type=0&scope=identify+guilds+bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Add TEAL to a server
              </a>
            </div>
          ) : (
            <ServersGrid guilds={guilds} />
          )}
        </div>
      </div>
    </main>
  );
}
