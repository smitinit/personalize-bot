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
  console.log(botAvatarUrl);
  return (
    <>
      <PersonalityForm
        personalityBaseValues={{
          ...personalityBase,
          CustomExpertise: personalityBase.CustomExpertise ?? "None",
        }}
      />
      <KnowledgeForm knowledgeBaseValues={knowledgeBase} />
      <AppearanceForm botavatar={botAvatarUrl} />
    </>
  );
}
