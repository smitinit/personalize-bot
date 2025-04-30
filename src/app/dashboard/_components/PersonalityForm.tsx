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

// "use client";

// import { useTransition } from "react";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { toast } from "sonner";
// import { submitPersonalityBase } from "@/server/actions/personalityAction";
// import { useRouter } from "next/navigation";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"; // NEW

// export default function PersonalityForm({
//   personalityBaseValues,
// }: {
//   personalityBaseValues: {
//     vibe: string;
//     creativity: number;
//     tone: string;
//     proactiveness?: "low" | "medium" | "high"; // NEW
//     responseLength?: "short" | "medium" | "long"; // NEW
//     humorMode?: boolean; // NEW
//   };
// }) {
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();

//   const handleSubmit = (formData: FormData) => {
//     startTransition(async () => {
//       try {
//         await submitPersonalityBase(formData);
//         toast.success("Bot's Personality updated ✅");
//         router.refresh();
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to update 😔");
//       }
//     });
//   };

//   return (
//     <form action={handleSubmit}>
//       <section className="border-t py-6">
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold">Personality Base</h2>
//           <p className="text-muted-foreground text-sm">
//             Define how your bot behaves and vibes
//           </p>
//         </div>

//         <div className="space-y-6">
//           {/* Vibe */}
//           <div className="space-y-2">
//             <Label htmlFor="vibe">Vibe</Label>
//             <Textarea
//               id="vibe"
//               name="vibe"
//               placeholder="Friendly, formal, chaotic neutral, stoic..."
//               required
//               defaultValue={personalityBaseValues.vibe}
//               className="max-w-2xl"
//             />
//           </div>

//           {/* Creativity */}
//           <div className="max-w-2xl space-y-2">
//             <Label htmlFor="creativity">Creativity Level</Label>
//             <input
//               type="range"
//               id="creativity"
//               name="creativity"
//               min={0}
//               max={1}
//               step={0.01}
//               defaultValue={personalityBaseValues.creativity}
//               className="w-full"
//             />
//           </div>

//           {/* Tone */}
//           <div className="space-y-2">
//             <Label htmlFor="tone">Tone</Label>
//             <Textarea
//               id="tone"
//               name="tone"
//               placeholder="Encouraging, serious, humorous, casual, Gen Z slang, etc."
//               required
//               defaultValue={personalityBaseValues.tone}
//               className="max-w-2xl"
//             />
//           </div>

//           {/* Proactiveness */}
//           <div className="max-w-2xl space-y-2">
//             <Label htmlFor="proactiveness">Proactiveness</Label>
//             <Select
//               defaultValue={personalityBaseValues.proactiveness ?? "medium"}
//               name="proactiveness"
//             >
//               <SelectTrigger id="proactiveness">
//                 <SelectValue placeholder="Select proactiveness" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="low">Low (Only responds)</SelectItem>
//                 <SelectItem value="medium">Medium (Normal)</SelectItem>
//                 <SelectItem value="high">
//                   High (Talks a lot proactively)
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Response Length */}
//           <div className="max-w-2xl space-y-2">
//             <Label htmlFor="response-length">Response Length</Label>
//             <Select
//               defaultValue={personalityBaseValues.responseLength ?? "medium"}
//               name="response-length"
//             >
//               <SelectTrigger id="response-length">
//                 <SelectValue placeholder="Select response length" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="short">Short (Quick Replies)</SelectItem>
//                 <SelectItem value="medium">Medium (Balanced)</SelectItem>
//                 <SelectItem value="long">Long (Detailed answers)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Humor Mode */}
//           <div className="flex max-w-2xl items-center justify-between space-y-0 border-t pt-2">
//             <div className="flex flex-col space-y-1">
//               <Label htmlFor="humor-mode">Humor Mode</Label>
//               <p className="text-muted-foreground text-xs md:text-sm">
//                 Should your bot occasionally use jokes/memes?
//               </p>
//             </div>
//             <Switch
//               id="humor-mode"
//               name="humor-mode"
//               defaultChecked={personalityBaseValues.humorMode}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
//               disabled={isPending}
//             >
//               {isPending ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       </section>
//     </form>
//   );
// }
