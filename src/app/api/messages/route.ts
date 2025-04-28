// api/messages/route.ts

import { getAllBotUserValues } from "@/server/queries";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const authorizationHeader = req.headers.get("authorization")!;

  if (!authorizationHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = authorizationHeader.split(" ")[1];

  // console.log(apiKey);
  if (!apiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Fetch the row with the given API key

  const { message }: { message: string } = (await req.json()) as {
    message: string;
  };
  // const { userId } = await auth();
  const userId = req.headers.get("x-user-id")!;
  // console.log(userId);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const res = await getAllBotUserValues(userId);

  const masterPrompt = createMasterPrompt({
    greeting: res.greeting,
    fallback: res.fallback,
    useWebSearch: res.useWebSearch,
    useDocs: res.useDocs,
    botName: res.botName,
    conversationTone: res.conversationTone,
    botThesis: res.botThesis,
    areaOfExpertise: res.AreaOfExpertise,
    userMessage: message,
    customExpertise: res.CustomExpertise ?? "None",
  });

  // Send `masterPrompt` to Gemini API (replace with your method)
  const response = await sendToGemini(masterPrompt); // You write this!

  return NextResponse.json({
    response: response.text,
  });
}

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  parts: GeminiPart[];
}

interface GeminiCandidate {
  content: GeminiContent;
}

interface GeminiResponse {
  candidates: GeminiCandidate[];
}

export async function sendToGemini(
  masterPrompt: string,
): Promise<{ text: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: masterPrompt,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API request failed: ${errorText}`);
  }

  const data = (await response.json()) as GeminiResponse;

  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!reply) {
    throw new Error("Invalid or unexpected response format from Gemini API.");
  }

  return { text: reply };
}

function createMasterPrompt({
  greeting,
  fallback,
  useWebSearch,
  useDocs,
  botName,
  conversationTone,
  botThesis,
  areaOfExpertise,
  customExpertise,
  userMessage,
}: {
  greeting: string;
  fallback: string;
  useWebSearch: boolean;
  useDocs: boolean;
  botName: string;
  conversationTone: string;
  botThesis: string;
  areaOfExpertise: string;
  customExpertise: string;
  userMessage: string;
}) {
  return `
You are ${botName}, an AI assistant. Your purpose is described as:

"${botThesis}"

Your communication style should be:

- Tone: ${conversationTone}
- Greeting: "${greeting} "
- If the question is unclear or unknown, respond gently with: "${fallback}"

Knowledge and tools:

- Area of Expertise: ${areaOfExpertise}
- Custom Expertise Focus: ${customExpertise}
- Use Web Search: ${useWebSearch ? "Enabled ✅" : "Disabled 🚫"}
- Use Internal Documents: ${useDocs ? "Enabled ✅" : "Disabled 🚫"}

When responding, always prioritize:
- Being contextually helpful
- Matching the expected tone
- Offering clarity, empathy, and a human-like feel
- Staying within your expertise when possible
- If necessary, admit limitations politely using the fallback line

--- User's Message ---

"${userMessage}"

Respond accordingly.And dont greet every time just the first time. Just respond to the user message.
  `.trim();
}
