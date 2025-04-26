"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function KnowledgeForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [useWebSearch, setUseWebSearch] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Knowledge base updated.");
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
        <CardDescription>
          Define what your bot knows and how it responds
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="greeting">Default Greeting</Label>
          <Textarea
            id="greeting"
            placeholder="How should your bot introduce itself?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fallback">Fallback Response</Label>
          <Textarea
            id="fallback"
            placeholder="What should your bot say when it doesn't know the answer?"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between space-y-0 pt-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="use-web">Web Search</Label>
              <p className="text-muted-foreground text-xs md:text-sm">
                Allow your bot to search the web for information
              </p>
            </div>
            <Switch
              id="use-web"
              checked={useWebSearch}
              onCheckedChange={setUseWebSearch}
            />
            {/* <Toggle>Web Search</Toggle> */}
          </div>

          <div className="flex items-center justify-between space-y-0 pt-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="use-docs">Custom Documents</Label>
              <p className="text-muted-foreground text-xs md:text-sm">
                Train your bot on your own documents
              </p>
            </div>
            <Switch id="use-docs" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
