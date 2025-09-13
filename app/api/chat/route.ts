import { NextRequest } from "next/server";
import Groq from "groq-sdk";

export const POST = async (request: NextRequest) => {
  const { messages } = await request.json();

  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
  });

  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages,
  });

  const assistantText = response.choices?.[0].message?.content || "";

  return new Response(JSON.stringify({ assistantText }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
