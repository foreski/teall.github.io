import { redirect } from "next/navigation";
import { getSession, getUserGuilds } from "@/lib/auth";
import { hasAdminPermissions, getGuildBannerUrl, getGuildIconUrl } from "@/lib/discord";
import { DashboardOverview } from "@/components/dashboard-overview";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { serverId } = await params;

  // Fetch user's guilds and find the current one
  let guild = null;
  try {
    const guilds = await getUserGuilds(session.accessToken);
    guild = guilds.find((g) => g.id === serverId);

    // Verify user has permissions for this server
    if (!guild || (!guild.owner && !hasAdminPermissions(guild.permissions))) {
      redirect("/servers");
    }
  } catch (error) {
    console.error("Failed to verify guild access:", error);
    redirect("/servers");
  }

  return (
    <DashboardOverview
      guild={guild}
      iconUrl={getGuildIconUrl(guild)}
      bannerUrl={getGuildBannerUrl(guild)}
    />
  );
}
