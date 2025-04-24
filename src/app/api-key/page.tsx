"use client";

import { useState } from "react";
import { Check, Copy, Key, Plus, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  created?: string;
  lastUsed: string;
};
export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  const [newKeyName, setNewKeyName] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showNewKey, setShowNewKey] = useState<string | null>(null);

  const generateApiKey = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const newKey = `sk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
      setShowNewKey(newKey);
      setIsGenerating(false);

      // Add to list after dialog is closed
      const newKeyObj = {
        id: (apiKeys.length + 1).toString(),
        name: newKeyName,
        key: newKey,
        created: new Date().toISOString().split("T")[0],
        lastUsed: "Never",
      };

      setApiKeys((prevArr) => {
        return [
          ...prevArr,
          {
            ...newKeyObj,
            created: newKeyObj.created ?? "", // Default to empty string if undefined
          },
        ];
      });

      setNewKeyName("");
    }, 1000);
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);

    toast("API key copied");
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));

    toast("API key deleted");
  };

  const maskApiKey = (key: string) => {
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
  };

  return (
    <main className="flex w-full justify-center p-2">
      <div className="flex flex-col py-6 md:py-10 lg:min-w-[80%]">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              API Keys
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Manage API keys for your bot integration
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Generate API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key to integrate your bot with other
                  services.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Key Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Production, Development"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>

                {showNewKey && (
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">Your New API Key</Label>
                    <div className="flex flex-col items-center gap-2 sm:flex-row">
                      <Input
                        id="api-key"
                        value={showNewKey}
                        readOnly
                        className="font-mono text-xs sm:text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(showNewKey, "new")}
                        className="mt-2 sm:mt-0"
                      >
                        {copied === "new" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Make sure to copy this key now. You won&apos;t be able to
                      see it again!
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter>
                {!showNewKey ? (
                  <Button
                    onClick={generateApiKey}
                    disabled={!newKeyName || isGenerating}
                    className="w-full sm:w-auto"
                  >
                    {isGenerating ? "Generating..." : "Generate Key"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowNewKey(null)}
                    className="w-full sm:w-auto"
                  >
                    Done
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>
              Use these keys to authenticate requests with the BotPersona API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      API Key
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Last Used
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell className="font-medium">
                        {apiKey.name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center space-x-2">
                          <Key className="text-muted-foreground h-4 w-4" />
                          <span className="font-mono text-xs sm:text-sm">
                            {maskApiKey(apiKey.key)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {apiKey.created}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {apiKey.lastUsed}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 md:gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              copyToClipboard(apiKey.key, apiKey.id)
                            }
                          >
                            {copied === apiKey.id ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            <span className="sr-only">Copy</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <RefreshCw className="h-4 w-4" />
                            <span className="sr-only">Refresh</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteKey(apiKey.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!apiKeys.length && (
                <small className="flex justify-center p-6">
                  No api key yet, start by generating one.
                </small>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 md:mt-8">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Learn how to integrate your personalized bot with your
                applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Authentication</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    Include your API key in the Authorization header of your
                    requests:
                  </p>
                  <div className="bg-muted mt-2 overflow-x-auto rounded-md p-4">
                    <code className="text-xs whitespace-nowrap md:text-sm">
                      Authorization: Bearer YOUR_API_KEY
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Example Request</h3>
                  <div className="bg-muted mt-2 overflow-x-auto rounded-md p-4">
                    <code className="text-xs whitespace-pre-wrap md:text-sm">
                      {`fetch('https://api.botperson.acom/v1/chat', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_API_KEY'
                      },
                      body: JSON.stringify({
                        message: 'Hello, bot!',
                        userId: 'user-123'
                      })
                    })`}
                    </code>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <a href="/docs" target="_blank" rel="noreferrer">
                      View Full Documentation
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </div>
    </main>
  );
}
