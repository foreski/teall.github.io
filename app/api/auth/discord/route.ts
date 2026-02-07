import { redirect } from "next/navigation";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/discord/callback`
    : "http://localhost:3000/api/auth/discord/callback";

  if (!clientId) {
    return new Response("Discord client ID not configured", { status: 500 });
  }

  const scopes = ["identify", "guilds"].join(" ");

  const authUrl = new URL("https://discord.com/api/oauth2/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", scopes);

  redirect(authUrl.toString());
}
