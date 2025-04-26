"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SignedIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type BotAvatar = string | undefined;
export default function AppearanceForm({
  botavatar,
}: {
  botavatar: BotAvatar;
}) {
  const [field, setField] = useState("bottom-right");

  const handleSelectPosistion = async (value: string) => {
    // simulate api
    const res = await fetch("/api/botposition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ position: value }),
    });
    if (!res.ok) {
      toast.error("Something went wrong. Please try again.");
    }
    toast.success("Position updated.");
    setField(value);
  };

  const router = useRouter();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Bot Appearance</CardTitle>
          <CardDescription>Customize how your bot looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full space-y-2">
            <Label>Bot Avatar</Label>
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="flex h-32 w-32 items-center justify-center">
                {botavatar ? (
                  <img
                    src={botavatar}
                    alt="Avatar of bot"
                    className="h-full w-full rounded-full object-fill"
                  />
                ) : (
                  <Bot className="text-primary h-8 w-8" />
                )}
              </div>

              <div className="mt-4">
                <SignedIn>
                  <UploadButton
                    endpoint="imageUploader"
                    className="mt-4"
                    appearance={{
                      button: cn(
                        "inline-flex items-center  justify-center rounded-md text-sm font-medium transition-colors",
                        "bg-black/90 dark:bg-muted hover:bg-black/80  ",
                        "dark:hover:bg-accent dark:hover:text-accent-foreground ",
                        "border border-input shadow-sm",
                        "h-10 px-4 py-2",
                        "text-muted-foreground dark:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        "disabled:opacity-50 disabled:pointer-events-none",
                      ),

                      allowedContent: "text-xs text-muted-foreground",
                    }}
                    onClientUploadComplete={() => {
                      router.refresh();
                      toast.success("Avatar updated.");
                    }}
                  />
                </SignedIn>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chat-position">Chat Widget Position</Label>
            <Select
              defaultValue={field}
              onValueChange={(value) => handleSelectPosistion(value)}
            >
              <SelectTrigger id="chat-position">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                <SelectItem value="top-right">Top Right</SelectItem>
                <SelectItem value="top-left">Top Left</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Toaster expand={false} richColors />
    </>
  );
}
