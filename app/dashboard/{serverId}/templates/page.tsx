import { TemplatesGallery } from "@/components/templates-gallery";

export default async function DashboardTemplatesPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Templates</h1>
        <p className="text-muted-foreground">
          Browse layouts and deploy them to your selected server.
        </p>
      </div>

      <TemplatesGallery deployHref={`/dashboard/${serverId}/settings`} />
    </div>
  );
}
