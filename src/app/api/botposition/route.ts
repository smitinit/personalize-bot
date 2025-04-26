import { postChatBotPosition } from "@/server/queries";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId } = await auth();
  const { position } = (await request.json()) as { position: string };

  if (position && userId) {
    await postChatBotPosition(position, userId);
    return NextResponse.json({ position });
  }
  return NextResponse.json(
    { message: "No position provided" },
    { status: 400 },
  );
}
