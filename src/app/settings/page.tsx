import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Settings</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Manage your app preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="theme" className="text-base">Theme</Label>
              <p className="text-sm text-muted-foreground">Select your preferred color scheme.</p>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="notifications" className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive updates about your account.</p>
            </div>
            <Switch id="notifications" disabled />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="sync" className="text-base">Cloud Sync</Label>
              <p className="text-sm text-muted-foreground">Automatically back up your notes.</p>
            </div>
            <Switch id="sync" defaultChecked disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
