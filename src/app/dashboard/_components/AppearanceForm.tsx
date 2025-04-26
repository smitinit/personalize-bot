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

import { Input } from "@/components/ui/input";
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
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Appearance updated.");
    }, 1000);
  };

  const router = useRouter();
  return (
    <>
      {" "}
      <Card className="">
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
                        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                        "bg-transparent hover:bg-accent hover:text-accent-foreground",
                        "border border-input shadow-sm",
                        "h-10 px-4 py-2",
                        "text-muted-foreground",
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
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="primary-color"
                type="color"
                className="h-10 w-full p-1 sm:w-12"
                defaultValue="#0ea5e9"
              />
              <Input defaultValue="#0ea5e9" className="w-full sm:flex-1" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chat-position">Chat Widget Position</Label>
            <Select defaultValue="bottom-right">
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
        {/* <CardFooter className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex w-fit justify-end md:w-auto"
        >
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </CardFooter> */}
      </Card>
      <Toaster expand={false} richColors />
    </>
  );
}
