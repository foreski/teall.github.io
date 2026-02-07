import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    redirect("/login?error=no_code");
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/discord/callback`
    : "http://localhost:3000/api/auth/discord/callback";

  if (!clientId || !clientSecret) {
    redirect("/login?error=config");
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", await tokenResponse.text());
      redirect("/login?error=token_exchange");
    }

    const tokenData = await tokenResponse.json();

    // Get user info
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      redirect("/login?error=user_fetch");
    }

    const userData = await userResponse.json();

    // Store session in cookie
    const session = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: Date.now() + tokenData.expires_in * 1000,
      user: {
        id: userData.id,
        username: userData.username,
        globalName: userData.global_name,
        avatar: userData.avatar,
        discriminator: userData.discriminator,
      },
    };

    const cookieStore = await cookies();
    cookieStore.set("discord_session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    redirect("/servers");
  } catch (error) {
    console.error("OAuth error:", error);
    redirect("/login?error=unknown");
  }
}
