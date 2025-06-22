/**
 * @fileoverview The settings page for the Kopy application.
 *
 * This page provides users with options to configure their application preferences,
 * such as theme and notification settings. It is currently a static page
 * with some interactive elements.
 */

// Import UI components from ShadCN.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// Import the ThemeToggle component to allow users to change the color scheme.
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * The SettingsPage component.
 * @returns {JSX.Element} The rendered settings page.
 */
export default function SettingsPage() {
  return (
    <div className="container py-8">
      {/* Page header. */}
      <h1 className="text-3xl font-bold font-headline mb-8">Settings</h1>
      
      {/* A card to group all the settings together for a clean layout. */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Manage your app preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme setting section. */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="theme" className="text-base">Theme</Label>
              <p className="text-sm text-muted-foreground">Select your preferred color scheme.</p>
            </div>
            {/* The ThemeToggle component provides the UI for changing the theme. */}
            <ThemeToggle />
          </div>

          {/* Email notifications setting section. */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="notifications" className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive updates about your account.</p>
            </div>
            {/* This switch is disabled as the feature is not yet implemented. */}
            <Switch id="notifications" disabled />
          </div>
          
          {/* Cloud sync setting section. */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="sync" className="text-base">Cloud Sync</Label>
              <p className="text-sm text-muted-foreground">Automatically back up your notes.</p>
            </div>
            {/* This switch is disabled, shown as on by default. */}
            <Switch id="sync" defaultChecked disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
