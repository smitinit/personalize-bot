"use server";

import { setKnowledgeBase } from "@/server/queries";
import { auth } from "@clerk/nextjs/server";

export async function submitKnowledgeBase(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const greeting = formData.get("greeting") as string;
  const fallback = formData.get("fallback") as string;
  const useWeb = formData.get("use-web") === "on";
  const useDocs = formData.get("use-docs") === "on";

  // simple validation
  if (!greeting || !fallback) {
    throw new Error("Missing fields");
  }

  const response = await setKnowledgeBase(
    userId,
    greeting,
    fallback,
    useWeb,
    useDocs,
  );

  return response;
}
