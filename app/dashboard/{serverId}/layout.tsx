import React from "react"
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAvatarUrl } from "@/lib/discord";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { serverId } = await params;

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar serverId={serverId} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <DashboardHeader
          user={session.user}
          avatarUrl={getAvatarUrl(session.user)}
          serverId={serverId}
        />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
