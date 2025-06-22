/**
 * @fileoverview This is the dashboard page for the Kopy application.
 *
 * It serves as the main landing page after a user might log in (or for any visitor),
 * displaying widgets and providing quick actions like creating a new note.
 */

"use client";

// Import UI components from ShadCN.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Import icons from lucide-react.
import { PlusCircle, Calendar, ClipboardCheck, LayoutGrid } from "lucide-react";
// Import the Link component from Next.js for client-side navigation.
import Link from 'next/link';

/**
 * The DashboardPage component.
 * It renders a static dashboard layout with informational cards and calls to action.
 * @returns {JSX.Element} The rendered dashboard page.
 */
export default function DashboardPage() {
  /**
   * An array of widget objects to be displayed on the dashboard.
   * This is currently mock data. In a real application, this could come from
   * user preferences or a configuration file.
   * `comingSoon: true` is used to disable or style widgets that are not yet implemented.
   */
  const widgets = [
    {
      title: "Calendar",
      description: "View your schedule and events.",
      icon: Calendar,
      comingSoon: true,
    },
    {
      title: "Kanban Board",
      description: "Organize your tasks visually.",
      icon: LayoutGrid,
      comingSoon: true,
    },
    {
      title: "Task List",
      description: "Keep track of your to-dos.",
      icon: ClipboardCheck,
      comingSoon: true,
    },
  ];

  return (
    <div className="container py-8">
      {/* Page header section with title and a "New Note" button. */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        {/* The Link component ensures navigation to the notes page happens on the client-side without a full page reload. */}
        <Link href="/notes">
            <Button>
                <PlusCircle className="mr-2"/>
                New Note
            </Button>
        </Link>
      </div>

      {/* Grid container for the widgets. */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Map over the widgets array to render a Card for each one. */}
        {widgets.map((widget) => (
          <Card key={widget.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{widget.title}</CardTitle>
              {/* Dynamically render the icon component for the widget. */}
              <widget.icon className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{widget.description}</p>
              {/* Conditionally render a "Coming Soon" badge. */}
              {widget.comingSoon && (
                <div className="text-xs font-semibold text-primary mt-4">Coming Soon</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* A call-to-action section at the bottom of the page. */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold font-headline">Ready to write?</h2>
        <p className="text-muted-foreground mt-2">Jump into your notes or create a new one.</p>
        <Link href="/notes" className="mt-4 inline-block">
            <Button size="lg">
                Go to Notes
            </Button>
        </Link>
      </div>
    </div>
  );
}
