import "server-only";
import { db } from "./db";
import { bot } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getBotAvatarUrl(userId: string) {
  const userBot = await db
    .select({ botavatarURL: bot.botavatarURL })
    .from(bot)
    .where(eq(bot.botId, userId))
    .limit(1);
  return userBot[0]?.botavatarURL;
}
export async function setBotAvatarUrl(userId: string, botavatarURL: string) {
  const response = await db
    .update(bot)
    .set({ botavatarURL: botavatarURL })
    .where(eq(bot.botId, userId));
  if (!response) {
    throw new Error("Failed to update bot avatar URL in the database");
  }
}
export async function postChatBotPosition(position: string, userId: string) {
  const positionData = await db
    .update(bot)
    .set({ position: position })
    .where(eq(bot.botId, userId));
  if (!positionData) {
    throw new Error("Failed to update position in the database");
  }
}

export async function setKnowledgeBase(
  userId: string,
  greeting: string,
  fallback: string,
  useWeb: boolean,
  useDocs: boolean,
) {
  const response = await db
    .update(bot)
    .set({
      greeting: greeting,
      fallback: fallback,
      useWebSearch: useWeb,
      useDocs: useDocs,
    })
    .where(eq(bot.botId, userId));
  if (!response) {
    throw new Error("Failed to update knowledge base in the database");
  }
}
export async function getKnowledgeBase(userId: string) {
  const [knowledgeBase] = await db
    .select({
      greeting: bot.greeting,
      fallback: bot.fallback,
      useWebSearch: bot.useWebSearch,
      useDocs: bot.useDocs,
    })
    .from(bot)
    .where(eq(bot.botId, userId))
    .limit(1);
  if (!knowledgeBase) {
    throw new Error("No knowledge base found for the user");
  }
  return knowledgeBase;
}

export async function getPersonalityBase(userId: string) {
  const [personalityBase] = await db
    .select({
      botName: bot.botName,
      conversationTone: bot.conversationTone,
      botThesis: bot.botThesis,
      AreaOfExpertise: bot.AreaOfExpertise,
      CustomExpertise: bot.CustomExpertise,
    })
    .from(bot)
    .where(eq(bot.botId, userId))
    .limit(1);
  if (!personalityBase) {
    throw new Error("No personality base found for the user");
  }
  return personalityBase;
}
export async function setPersonalityBase(
  userId: string,
  botName: string,
  conversationTone: string,
  botThesis: string,
  AreaOfExpertise: string,
  CustomExpertise = "None",
) {
  const response = await db
    .update(bot)
    .set({
      botName: botName,
      conversationTone: conversationTone,
      botThesis: botThesis,
      AreaOfExpertise: AreaOfExpertise,
      CustomExpertise: CustomExpertise,
    })
    .where(eq(bot.botId, userId));
  if (!response) {
    throw new Error("Failed to update personality base in the database");
  }
}

type DefaultValueTypes = {
  botavatarURL: string; // URL of the bot avatar
  position: string; // Position of the chat bot ("bottom-right", "top-left", "top-right", "bottom-left")
  greeting: string; // Greeting message
  fallback: string; // Fallback message
  useWebSearch: boolean; // Flag of web search
  useDocs: boolean; // Flag of documentation search
  botName: string; // Name of the bot
  conversationTone: string; // Tone of the conversation (e.g., "friendly", "professional")
  botThesis: string; // Thesis of bot
  AreaOfExpertise: string;
  CustomExpertise?: string;
};

const defaultValues: DefaultValueTypes = {
  botavatarURL:
    "https://jx3ho0f5cb.ufs.sh/f/AcnTK5Ra9jRce5yNtocDaStisjAR6rxuLlC90dOo5GKygQP3",

  position: "bottom-right",
  greeting: "Hello! How can I assist you today?",
  fallback: "Sorry, I don't have an answer for that.",
  useWebSearch: false,
  useDocs: false,
  botName: "Assistant",
  conversationTone: "friendly",
  botThesis: "I am a helpful assistant.",
  AreaOfExpertise: "tech",
  CustomExpertise: "None",
};

export async function saveDefaultToDb(userId: string) {
  // Check if the bot already exists for the user
  const existingBot = await db
    .select()
    .from(bot)
    .where(eq(bot.botId, userId))
    .limit(1);
  if (existingBot.length > 0) {
    return;
  }

  const defaultValueInsert = await db.insert(bot).values({
    botId: userId,
    updatedAt: new Date(),
    apiKey: "",
    ...defaultValues,
  });
  if (!defaultValueInsert) {
    throw new Error("Failed to save default values to the database");
  }
}
