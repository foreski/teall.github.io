import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Logs</h1>
        <p className="text-muted-foreground">
          Review recent template deployments and automation events.
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Latest Activity</CardTitle>
          <CardDescription>Nothing logged yet for this server.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Deploy a template to start collecting logs.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
