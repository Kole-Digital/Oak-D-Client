export type ChatMessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  timestamp: number;
  error?: boolean;
}

export interface ChatHistoryEntry {
  role: ChatMessageRole;
  content: string;
}

export interface ChatUser {
  id?: string;
  name: string;
  phone: string;
  email?: string;
}

export interface ChatRequestBody {
  message: string;
  session_id: string;
  history?: ChatHistoryEntry[];
  user?: ChatUser;
}

export interface ChatResponseBody {
  answer: string;
  intent?: string;
  escalation_id?: string;
  sources?: {
    source: string;
    content: string;
  }[];
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  sessionId: string;
  user: ChatUser | null;
  isUserReady: boolean;
}

export interface ChatActions {
  sendMessage: (text: string) => Promise<void>;
  setUser: (user: ChatUser) => void;
  toggleChat: () => void;
  clearChat: () => void;
  retryLastMessage: () => void;
}

export type ChatContextType = ChatState & ChatActions;
