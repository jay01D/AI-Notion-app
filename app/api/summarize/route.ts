import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { sessionClaims } = await auth();
  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { content } = await req.json();

  if (!content || content.trim().length === 0) {
    return Response.json({ summary: "The document is empty." });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Summarize the following document content in 2-3 concise bullet points. Keep it brief and clear.",
      },
      { role: "user", content },
    ],
    max_tokens: 300,
  });

  const summary = response.choices[0].message.content;
  return Response.json({ summary });
}
