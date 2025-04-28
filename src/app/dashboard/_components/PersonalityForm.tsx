"use client";

import { useTransition } from "react";
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
import { useRouter } from "next/navigation";
import { submitPersonalityBase } from "@/server/actions/personalityAction";

export default function PersonalityForm({
  personalityBaseValues,
}: {
  personalityBaseValues: {
    botName: string;
    conversationTone: string;
    botThesis: string;
    AreaOfExpertise: string;
    CustomExpertise?: string;
  };
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await submitPersonalityBase(formData);
        toast.success("Bot's Personality has been updated ✅");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Failed to update 😔");
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <section className="py-1">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Bot Personality</h2>
          <p className="text-muted-foreground text-sm">
            Define how your bot interacts with users
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bot-name">Bot Name</Label>
              <Input
                id="bot-name"
                name="botname"
                placeholder="e.g., Helpful Assistant"
                defaultValue={personalityBaseValues.botName}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Conversation Tone</Label>
              <Select
                defaultValue={personalityBaseValues.conversationTone}
                name="tone"
              >
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

          <div className="max-w-2xl space-y-2">
            <Label htmlFor="bot-thesis">Bot Thesis</Label>
            <Textarea
              id="bot-thesis"
              placeholder="What is your bot's main purpose or philosophy?"
              className="max-h-[500px] min-h-[100px]"
              name="botthesis"
              defaultValue={personalityBaseValues.botThesis}
              required
            />
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="expertise">Area of Expertise</Label>
              <Select
                defaultValue={personalityBaseValues.AreaOfExpertise}
                name="expertise"
              >
                <SelectTrigger id="expertise">
                  <SelectValue placeholder="Select expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Knowledge">
                    General Knowledge
                  </SelectItem>
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
              <Input
                id="custom-expertise"
                placeholder="e.g., Quantum Physics"
                name="customexpertise"
                defaultValue={personalityBaseValues.CustomExpertise}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </section>
    </form>
  );
}
