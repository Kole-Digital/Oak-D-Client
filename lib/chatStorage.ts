import { ChatMessage, ChatUser } from "@/types/chat";

const SESSION_ID_KEY = "oak_d_chat_session_id";
const MESSAGES_KEY_PREFIX = "oak_d_chat_messages_";
const USER_KEY_PREFIX = "oak_d_chat_user_";

function isStorageAvailable(storage: Storage): boolean {
  try {
    const testKey = "__storage_test__";
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function generateSessionId(): string {
  if (
    typeof globalThis !== "undefined" &&
    globalThis.crypto &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }
  return `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function getSessionId(): string {
  if (typeof window === "undefined") return generateSessionId();

  if (!isStorageAvailable(sessionStorage)) return generateSessionId();

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export function getStoredMessages(sessionId: string): ChatMessage[] {
  if (typeof window === "undefined") return [];
  if (!isStorageAvailable(localStorage)) return [];

  try {
    const stored = localStorage.getItem(MESSAGES_KEY_PREFIX + sessionId);
    if (!stored) return [];
    return JSON.parse(stored) as ChatMessage[];
  } catch {
    return [];
  }
}

export function getStoredUser(sessionId: string): ChatUser | null {
  if (typeof window === "undefined") return null;
  if (!isStorageAvailable(localStorage)) return null;

  try {
    const stored = localStorage.getItem(USER_KEY_PREFIX + sessionId);
    if (!stored) return null;
    return JSON.parse(stored) as ChatUser;
  } catch {
    return null;
  }
}

export function storeMessages(sessionId: string, messages: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  if (!isStorageAvailable(localStorage)) return;

  try {
    localStorage.setItem(MESSAGES_KEY_PREFIX + sessionId, JSON.stringify(messages));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function storeUser(sessionId: string, user: ChatUser): void {
  if (typeof window === "undefined") return;
  if (!isStorageAvailable(localStorage)) return;

  try {
    localStorage.setItem(USER_KEY_PREFIX + sessionId, JSON.stringify(user));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function clearStoredMessages(sessionId: string): void {
  if (typeof window === "undefined") return;
  if (!isStorageAvailable(localStorage)) return;

  try {
    localStorage.removeItem(MESSAGES_KEY_PREFIX + sessionId);
    localStorage.removeItem(USER_KEY_PREFIX + sessionId);
    sessionStorage.removeItem(SESSION_ID_KEY);
  } catch {
    // Silently fail
  }
}
