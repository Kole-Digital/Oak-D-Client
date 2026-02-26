import axios from "axios";
import { ChatRequestBody, ChatResponseBody } from "@/types/chat";

const CHAT_TIMEOUT_MS = 30_000;
const BOT_SERVER_URL = process.env.NEXT_PUBLIC_CHAT_SERVER_URL || "";
const CHAT_API_KEY = process.env.NEXT_PUBLIC_CHAT_API_KEY;

const CHAT_ENDPOINT = BOT_SERVER_URL
  ? `${BOT_SERVER_URL.replace(/\/$/, "")}/api/chat`
  : "/api/chat";

export async function sendChatMessage(body: ChatRequestBody): Promise<ChatResponseBody> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (CHAT_API_KEY) {
    headers["x-api-key"] = CHAT_API_KEY;
  }

  const response = await axios.post<ChatResponseBody>(CHAT_ENDPOINT, body, {
    timeout: CHAT_TIMEOUT_MS,
    headers,
  });
  return response.data;
}
