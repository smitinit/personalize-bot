"use client";

import { useState } from "react";
import { Bot, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function Dashboard() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast("Settings saved");
    }, 1000);
  };

  return (
    <main className="flex w-full justify-center p-2">
      <div className="w-full md:py-10 lg:w-[80%]">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Bot Dashboard
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Customize your bot&apos;s personality and behavior
          </p>
        </div>

        <Tabs defaultValue="personality" className="space-y-4">
          <TabsList className="no-scrollbar flex h-12 w-full justify-start overflow-x-auto bg-white md:justify-center">
            <TabsTrigger
              value="personality"
              className="flex-1 data-[state=active]:bg-blue-100 md:flex-none"
            >
              Personality
            </TabsTrigger>
            <TabsTrigger
              value="knowledge"
              className="flex-1 data-[state=active]:bg-blue-100 md:flex-none"
            >
              Knowledge
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="flex-1 data-[state=active]:bg-blue-100 md:flex-none"
            >
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personality" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bot Personality</CardTitle>
                <CardDescription>
                  Define how your bot interacts with users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">Bot Name</Label>
                    <Input
                      id="bot-name"
                      placeholder="e.g., Helpful Assistant"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Conversation Tone</Label>
                    <Select defaultValue="friendly">
                      <SelectTrigger id="tone">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bot-thesis">Bot Thesis</Label>
                  <Textarea
                    id="bot-thesis"
                    placeholder="What is your bot's main purpose or philosophy?"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Area of Expertise</Label>
                    <Select defaultValue="general">
                      <SelectTrigger id="expertise">
                        <SelectValue placeholder="Select expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">
                          General Knowledge
                        </SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="health">
                          Health & Wellness
                        </SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="custom">
                          Custom (Specify Below)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-expertise">
                      Custom Expertise (Optional)
                    </Label>
                    <Input
                      id="custom-expertise"
                      placeholder="e.g., Quantum Physics"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full md:w-auto"
                >
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-4">
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
                    <Switch id="use-web" />
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
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full md:w-auto"
                >
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bot Appearance</CardTitle>
                <CardDescription>Customize how your bot looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Bot Avatar</Label>
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                      <Bot className="text-primary h-8 w-8" />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Upload Image
                    </Button>
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
                    <Input
                      defaultValue="#0ea5e9"
                      className="w-full sm:flex-1"
                    />
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
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full md:w-auto"
                >
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <Toaster />
      </div>
    </main>
  );
}
