"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, ClipboardCheck, LayoutGrid } from "lucide-react";
import Link from 'next/link';

export default function DashboardPage() {
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <Link href="/notes">
            <Button>
                <PlusCircle className="mr-2"/>
                New Note
            </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {widgets.map((widget) => (
          <Card key={widget.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{widget.title}</CardTitle>
              <widget.icon className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{widget.description}</p>
              {widget.comingSoon && (
                <div className="text-xs font-semibold text-primary mt-4">Coming Soon</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

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
