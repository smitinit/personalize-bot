import { auth } from "@clerk/nextjs/server";
import AppearanceForm from "./AppearanceForm";
import KnowledgeForm from "./KnowledgeForm";
import PersonalityForm from "./PersonalityForm";

import {
  getBotAvatarUrl,
  getKnowledgeBase,
  getPersonalityBase,
} from "@/server/queries";
import { redirect } from "next/navigation";

export default async function Form() {
  const user = await auth();
  if (!user.userId) {
    return redirect("/");
  }

  const botAvatarUrl = await getBotAvatarUrl(user.userId);
  const knowledgeBase = await getKnowledgeBase(user.userId);
  const personalityBase = await getPersonalityBase(user.userId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-2">
      {/* <h1 className="mb-6 text-2xl font-bold">Bot Configuration</h1> */}
      <div className="mb-6 flex flex-col justify-between border-b-1 p-2 md:mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Bot Dashboard
        </h1>
        <p className="text-muted-foreground pb-2 text-sm md:text-base">
          Customize your bot&apos;s personality and behavior
        </p>
      </div>
      <div className="space-y-2">
        <PersonalityForm
          personalityBaseValues={{
            ...personalityBase,
            CustomExpertise: personalityBase.CustomExpertise ?? "None",
          }}
        />
        <KnowledgeForm knowledgeBaseValues={knowledgeBase} />
        <AppearanceForm botavatar={botAvatarUrl} />
      </div>
    </div>
  );
}
