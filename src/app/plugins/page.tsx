
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PlusCircle } from "lucide-react";

interface Plugin {
  name: string;
  description: string;
  enabled: boolean;
}

const initialPlugins: Plugin[] = [
  { name: "Grammar Check", description: "Checks your writing for grammatical errors.", enabled: true },
  { name: "AI Summarizer", description: "Uses AI to summarize long notes.", enabled: true },
  { name: "Thesaurus", description: "Find synonyms and antonyms for words.", enabled: false },
  { name: "Export to PDF", description: "Adds an option to export notes as PDF.", enabled: true },
];

const PLUGINS_STORAGE_KEY = 'kopy-plugins-state';

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  useEffect(() => {
    try {
      const storedPlugins = localStorage.getItem(PLUGINS_STORAGE_KEY);
      if (storedPlugins) {
        setPlugins(JSON.parse(storedPlugins));
      } else {
        setPlugins(initialPlugins);
      }
    } catch (error) {
      console.error("Failed to load plugins from localStorage", error);
      setPlugins(initialPlugins);
    }
  }, []);

  const handleTogglePlugin = (pluginName: string, enabled: boolean) => {
    const updatedPlugins = plugins.map((plugin) =>
      plugin.name === pluginName ? { ...plugin, enabled } : plugin
    );
    setPlugins(updatedPlugins);
    try {
      localStorage.setItem(PLUGINS_STORAGE_KEY, JSON.stringify(updatedPlugins));
    } catch (error) {
      console.error("Failed to save plugins to localStorage", error);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Plugins</h1>
        <Button disabled>
          <PlusCircle className="mr-2" />
          Add Plugin from Marketplace
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Installed Plugins</CardTitle>
          <CardDescription>Enable or disable your installed plugins. Your preferences will be saved in your browser.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {plugins.map((plugin) => (
            <div key={plugin.name} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{plugin.name}</p>
                <p className="text-sm text-muted-foreground">{plugin.description}</p>
              </div>
              <Switch
                checked={plugin.enabled}
                onCheckedChange={(checked) => handleTogglePlugin(plugin.name, checked)}
                aria-label={`Toggle ${plugin.name}`}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
