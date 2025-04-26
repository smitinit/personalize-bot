"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Key, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type Key = {
  apiKey: string;
};

export default function ApiKeys() {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    async function getApiKey() {
      const key: Key = await fetch("/api/apikey", { cache: "force-cache" })
        .then((res) => res.json() as Promise<Key>)
        .catch((error) => {
          console.error("Error fetching API key:", error);
          return { apiKey: "" };
        });
      if (key.apiKey) {
        const { apiKey: fetchedApiKey } = key;
        setApiKey(fetchedApiKey);
      }
    }

    getApiKey().catch((error) => console.log(error));
  }, []);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.info("API key copied");
  };

  function truncateString(str: string, length: number) {
    if (str.length <= length) return str;
    return str.slice(0, length) + "..." + str.slice(str.length - 4, str.length); // Truncate and add ellipsis
  }
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

                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKey && (
                    <TableRow>
                      <TableCell className="font-medium">
                        YOUR_API_KEY
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center space-x-2">
                          <Key className="text-muted-foreground h-4 w-4" />
                          <span className="font-mono text-xs sm:text-sm">
                            {truncateString(apiKey, 20)}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 md:gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(apiKey)}
                          >
                            <Copy className="h-4 w-4" />

                            <span className="sr-only">Copy</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {!apiKey && (
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
                    Your API key in the Authorization header of your requests
                    will be done automatically.
                  </p>
                  <div className="bg-muted mt-2 overflow-x-auto rounded-md p-4">
                    <code className="text-xs whitespace-nowrap md:text-sm">
                      Authorization: Bearer YOUR_API_KEY
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Demo</h3>
                  <div className="bg-muted mt-2 overflow-x-auto rounded-md p-4">
                    <code className="text-xs whitespace-pre-wrap md:text-sm">
                      {`<Bot apikey='sk_....'/>`}
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
