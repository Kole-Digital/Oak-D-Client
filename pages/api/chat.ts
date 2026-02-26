import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ChatResponseBody } from "@/types/chat";

const DEFAULT_BOT_SERVER_URL = "https://oak-bot.onrender.com";
const BOT_SERVER_URL =
  process.env.BOT_SERVER_URL ||
  process.env.NEXT_PUBLIC_CHAT_SERVER_URL ||
  DEFAULT_BOT_SERVER_URL;
const BOT_API_KEY = process.env.CHAT_API_KEY || process.env.NEXT_PUBLIC_CHAT_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponseBody | { error: string }>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const inboundApiKey = req.headers["x-api-key"];
    if (typeof inboundApiKey === "string" && inboundApiKey.trim()) {
      headers["x-api-key"] = inboundApiKey;
    } else if (BOT_API_KEY) {
      headers["x-api-key"] = BOT_API_KEY;
    }

    const response = await axios.post(
      `${BOT_SERVER_URL}/api/chat`,
      req.body,
      {
        headers,
        timeout: 30000,
      }
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;

    return res.status(status).json({
      answer:
        "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
      intent: "error",
    });
  }
}
