"use client";

import { useEffect, useState } from "react";
import { Copy, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
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

type ApiKeyType = {
  apiKey: string;
};

export default function ApiKeys() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getApiKey() {
      setLoading(true);
      const key: ApiKeyType = await fetch("/api/apikey")
        .then((res) => res.json() as Promise<ApiKeyType>)
        .catch((error) => {
          console.error("Error fetching API key:", error);
          return { apiKey: "" };
        });
      // await new Promise((res) => setTimeout(res, 1000));
      if (key.apiKey) {
        const { apiKey: fetchedApiKey } = key;

        setApiKey(fetchedApiKey);
        setLoading(false);
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
    <main className="flex w-full justify-center p-6">
      <div className="flex w-full max-w-4xl flex-col space-y-10">
        <header>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            API Keys
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Manage API keys for your bot integration
          </p>
        </header>

        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Your API Keys</h2>
            <p className="text-muted-foreground text-sm">
              Use these keys to authenticate requests with the BotPersona API
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border">
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
                <TableRow>
                  <TableCell className="font-medium">YOUR_API_KEY</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center space-x-2">
                      <Key className="text-muted-foreground h-4 w-4" />
                      <span className="font-mono text-xs sm:text-sm">
                        {!loading && apiKey ? (
                          truncateString(apiKey, 20)
                        ) : (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 md:gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey ?? "")}
                        disabled={loading}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="border-t pt-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">API Documentation</h2>
            <p className="text-muted-foreground text-sm">
              Learn how to integrate your personalized bot with your
              applications
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">Authentication</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Your API key in the Authorization header of your requests will
                be done automatically.
              </p>
              <div className="overflow-x-auto rounded-md border bg-slate-50 p-3 dark:bg-slate-900">
                <code className="text-xs whitespace-nowrap md:text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Demo</h3>
              <div className="overflow-x-auto rounded-md border bg-slate-50 p-3 dark:bg-slate-900">
                <code className="text-xs whitespace-pre-wrap md:text-sm">{`<Bot apikey='sk_....'/>`}</code>
              </div>
            </div>
          </div>
        </section>

        <Toaster />
      </div>
    </main>
  );
}
