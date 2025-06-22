/**
 * @fileoverview The plugins management page for the Kopy application.
 *
 * This page allows users to view available plugins and toggle them on or off.
 * The state of the plugins is persisted in the browser's localStorage.
 */

'use client';

// Import React hooks for state management and side effects.
import { useState, useEffect } from 'react';
// Import UI components from ShadCN.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
// Import icons from lucide-react.
import { PlusCircle } from "lucide-react";

/**
 * Defines the structure of a Plugin object.
 * @interface
 */
interface Plugin {
  name: string;
  description: string;
  enabled: boolean;
}

/**
 * An array of initial plugins available in the application.
 * This serves as the default state if no saved state is found in localStorage.
 * The "AI Summarizer" has been removed as the AI backend was deprecated.
 */
const initialPlugins: Plugin[] = [
  { name: "Grammar Check", description: "Checks your writing for grammatical errors.", enabled: true },
  { name: "Thesaurus", description: "Find synonyms and antonyms for words.", enabled: false },
  { name: "Export to PDF", description: "Adds an option to export notes as PDF.", enabled: true },
];

/**
 * The key used to store and retrieve the plugin state from localStorage.
 * Using a constant for this key prevents typos and makes it easier to manage.
 */
const PLUGINS_STORAGE_KEY = 'kopy-plugins-state';

/**
 * The PluginsPage component.
 * @returns {JSX.Element} The rendered plugins management page.
 */
export default function PluginsPage() {
  // State to hold the array of plugins.
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  /**
   * useEffect hook to load the plugin state from localStorage when the component mounts.
   * This ensures that the user's preferences are restored across sessions.
   */
  useEffect(() => {
    try {
      // Attempt to retrieve the saved plugins state from localStorage.
      const storedPlugins = localStorage.getItem(PLUGINS_STORAGE_KEY);
      if (storedPlugins) {
        // If found, parse the JSON string and update the state.
        setPlugins(JSON.parse(storedPlugins));
      } else {
        // If not found (e.g., first visit), use the initial default plugins.
        setPlugins(initialPlugins);
      }
    } catch (error) {
      // If there's an error reading from localStorage (e.g., corrupted data),
      // log the error and fall back to the initial state.
      console.error("Failed to load plugins from localStorage", error);
      setPlugins(initialPlugins);
    }
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  /**
   * Handles toggling a plugin's enabled state.
   * @param {string} pluginName - The name of the plugin to toggle.
   * @param {boolean} enabled - The new enabled state for the plugin.
   */
  const handleTogglePlugin = (pluginName: string, enabled: boolean) => {
    // Create a new array of plugins with the updated state for the specific plugin.
    const updatedPlugins = plugins.map((plugin) =>
      plugin.name === pluginName ? { ...plugin, enabled } : plugin
    );
    // Update the component's state with the new array.
    setPlugins(updatedPlugins);
    
    // Persist the new state to localStorage.
    try {
      localStorage.setItem(PLUGINS_STORAGE_KEY, JSON.stringify(updatedPlugins));
    } catch (error) {
      console.error("Failed to save plugins to localStorage", error);
    }
  };

  return (
    <div className="container py-8">
      {/* Page header with a title and a disabled "Add Plugin" button. */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Plugins</h1>
        {/* This button is disabled as the marketplace feature is not yet implemented. */}
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
          {/* Map over the plugins state to render a row for each plugin. */}
          {plugins.map((plugin) => (
            <div key={plugin.name} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{plugin.name}</p>
                <p className="text-sm text-muted-foreground">{plugin.description}</p>
              </div>
              {/* The Switch component to toggle the plugin's `enabled` state. */}
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
