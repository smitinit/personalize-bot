import { db } from "@/server/db";
import { bot } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ExistingAPIKey = await db
    .select()
    .from(bot)
    .where(eq(bot.botId, userId))
    .then((rows) => rows[0]);

  if (!ExistingAPIKey?.apiKey) {
    const apiKey = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    await db.update(bot).set({ apiKey: apiKey }).where(eq(bot.botId, userId));

    return NextResponse.json({ apiKey });
  }
  console.log("api key already exists");

  return NextResponse.json({ apiKey: ExistingAPIKey.apiKey });
}
