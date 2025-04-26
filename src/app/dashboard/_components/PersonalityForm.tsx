"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function PersonalityForm() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Personality settings saved.");
    }, 1000);
  };

  return (
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
            <Input id="bot-name" placeholder="e.g., Helpful Assistant" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Conversation Tone</Label>
            <Select defaultValue="friendly">
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
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
                <SelectItem value="general">General Knowledge</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="custom">Custom (Specify Below)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-expertise">
              Custom Expertise (Optional)
            </Label>
            <Input id="custom-expertise" placeholder="e.g., Quantum Physics" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
