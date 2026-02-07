import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure how templates deploy and keep your server safe.
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Deploy Controls</CardTitle>
          <CardDescription>Fine-tune how TEAL applies templates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-secondary/30 p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Require confirmation</p>
              <p className="text-xs text-muted-foreground">
                Ask before overwriting channels or roles.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary/30 p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-log deployments</p>
              <p className="text-xs text-muted-foreground">
                Save each template deployment to logs.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex justify-end">
            <Button>Save settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
