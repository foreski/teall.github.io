import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("discord_session");
  redirect("/");
}

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("discord_session");
  return new Response(null, { status: 200 });
}
