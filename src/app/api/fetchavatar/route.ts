import { db } from "@/server/db";
import { bot } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authorizationHeader = request.headers.get("authorization")!;

    if (!authorizationHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = authorizationHeader.split(" ")[1];

    if (!apiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the row with the given API key
    const result = await db
      .select({
        botavatarURL: bot.botavatarURL,
      })
      .from(bot)
      .where(eq(bot.apiKey, apiKey))
      .limit(1); // optional if you only expect one row

    if (!result[0]?.botavatarURL) {
      return NextResponse.json({ error: "Avatar not found" }, { status: 404 });
    }

    return NextResponse.json({ botAvatarUrl: result[0].botavatarURL });
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
