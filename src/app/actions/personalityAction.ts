"use server";

import { setPersonalityBase } from "@/server/queries";
import { auth } from "@clerk/nextjs/server";

export async function submitPersonalityBase(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const botName = formData.get("botname") as string;
  const convoTone = formData.get("tone") as string;
  const botThesis = formData.get("botthesis") as string;
  const customExpertise = formData.get("customexpertise") as string;
  const AreaOfExpertise = formData.get("expertise") as string;
  // simple validation
  if (
    !botName ||
    !convoTone ||
    !botThesis ||
    !AreaOfExpertise ||
    !customExpertise
  ) {
    throw new Error("Missing fields");
  }

  const response = await setPersonalityBase(
    userId,
    botName,
    convoTone,
    botThesis,
    AreaOfExpertise,
    customExpertise,
  );

  return response;
}
