import { auth } from "@clerk/nextjs/server";
import AppearanceForm from "./AppearanceForm";
import KnowledgeForm from "./KnowledgeForm";
import PersonalityForm from "./PersonalityForm";
import { db } from "@/server/db";
import { bot } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function Form() {
  const user = await auth();
  if (!user.userId) {
    return <p>User not authenticated</p>;
  }
  const userBot = await db
    .select({ botavatarURL: bot.botavatarURL })
    .from(bot)
    .where(eq(bot.botId, user.userId))
    .limit(1);
  const botAvatarUrl = userBot[0]?.botavatarURL ?? "";

  return (
    <>
      <PersonalityForm />
      <KnowledgeForm />
      <AppearanceForm botavatar={botAvatarUrl} />
    </>
  );
}
