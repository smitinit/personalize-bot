"use client";

import { useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { submitKnowledgeBase } from "@/server/actions/knowledgeAction";
import { useRouter } from "next/navigation";

export default function KnowledgeForm({
  knowledgeBaseValues,
}: {
  knowledgeBaseValues: {
    greeting: string;
    fallback: string;
    useWebSearch: boolean;
    useDocs: boolean;
  };
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await submitKnowledgeBase(formData);
        toast.success("Bot's Knowledge has been updated ✅");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Failed to update 😔");
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <section className="border-t py-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Knowledge Base</h2>
          <p className="text-muted-foreground text-sm">
            Define what your bot knows and how it responds
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="greeting">Default Greeting</Label>
            <Textarea
              id="greeting"
              name="greeting"
              placeholder="How should your bot introduce itself?"
              required
              defaultValue={knowledgeBaseValues.greeting}
              className="max-w-2xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fallback">Fallback Response</Label>
            <Textarea
              id="fallback"
              name="fallback"
              placeholder="What should your bot say when it doesn't know the answer?"
              required
              defaultValue={knowledgeBaseValues.fallback}
              className="max-w-2xl"
            />
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between space-y-0 border-t pt-2 ">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="use-web">Web Search</Label>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Allow your bot to search the web for information
                </p>
              </div>
              <Switch
                id="use-web"
                name="use-web"
                defaultChecked={knowledgeBaseValues.useWebSearch}
              />
            </div>

            <div className="flex items-center justify-between space-y-0 border-t pt-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="use-docs">Custom Documents</Label>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Train your bot on your own documents
                </p>
              </div>
              <Switch
                id="use-docs"
                name="use-docs"
                defaultChecked={knowledgeBaseValues.useDocs}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
