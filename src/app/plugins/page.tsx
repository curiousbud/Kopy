import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PlusCircle } from "lucide-react";

const plugins = [
  { name: "Grammar Check", description: "Checks your writing for grammatical errors.", enabled: true },
  { name: "AI Summarizer", description: "Uses AI to summarize long notes.", enabled: true },
  { name: "Thesaurus", description: "Find synonyms and antonyms for words.", enabled: false },
  { name: "Export to PDF", description: "Adds an option to export notes as PDF.", enabled: true },
];

export default function PluginsPage() {
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
          <CardDescription>Enable or disable your installed plugins.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {plugins.map((plugin) => (
            <div key={plugin.name} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{plugin.name}</p>
                <p className="text-sm text-muted-foreground">{plugin.description}</p>
              </div>
              <Switch defaultChecked={plugin.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
