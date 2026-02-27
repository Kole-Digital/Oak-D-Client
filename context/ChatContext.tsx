import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import {
  ChatMessage,
  ChatContextType,
  ChatHistoryEntry,
  ChatUser,
} from "@/types/chat";
import {
  getSessionId,
  getStoredMessages,
  getStoredUser,
  storeMessages,
  storeUser,
  clearStoredMessages,
} from "@/lib/chatStorage";
import { sendChatMessage } from "@/api/chatApi";
import { UserContext } from "@/context/UserInformation";

const MAX_MESSAGE_LENGTH = 1000;

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChatContext(): ChatContextType {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return ctx;
}

interface ChatContextProviderProps {
  children: ReactNode;
}

export function ChatContextProvider({ children }: ChatContextProviderProps) {
  const { user: loggedInUser } = useContext(UserContext);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);
  const isUserReady = Boolean(
    chatUser?.name?.trim() && chatUser?.phone?.trim()
  );

  const getDefaultUserFromAccount = useCallback((): ChatUser | null => {
    if (!loggedInUser) return null;
    return {
      id: loggedInUser._id,
      name: `${loggedInUser.firstName} ${loggedInUser.lastName}`.trim(),
      email: loggedInUser.email,
      phone: "",
    };
  }, [loggedInUser]);

  // Initialize session and load persisted messages
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const sid = getSessionId();
    setSessionId(sid);
    const storedMessages = getStoredMessages(sid);
    if (storedMessages.length > 0) {
      setMessages(storedMessages);
    }

    const storedUser = getStoredUser(sid);
    if (storedUser) {
      setChatUser(storedUser);
    } else {
      setChatUser(getDefaultUserFromAccount());
    }
  }, [getDefaultUserFromAccount]);

  // If user signs in after initialization, backfill pre-chat defaults.
  useEffect(() => {
    if (!loggedInUser) return;

    setChatUser((prev) => {
      if (!prev) {
        return getDefaultUserFromAccount();
      }

      return {
        ...prev,
        id: prev.id || loggedInUser._id,
        name:
          prev.name || `${loggedInUser.firstName} ${loggedInUser.lastName}`.trim(),
        email: prev.email || loggedInUser.email,
      };
    });
  }, [getDefaultUserFromAccount, loggedInUser]);

  // Persist messages on change
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      storeMessages(sessionId, messages);
    }
  }, [messages, sessionId]);

  // Persist pre-chat user details on change
  useEffect(() => {
    if (sessionId && chatUser) {
      storeUser(sessionId, chatUser);
    }
  }, [chatUser, sessionId]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const setUser = useCallback(
    (nextUser: ChatUser) => {
      const fallbackName = loggedInUser
        ? `${loggedInUser.firstName} ${loggedInUser.lastName}`.trim()
        : "";

      const resolvedName = (nextUser.name || fallbackName).trim();
      const firstName = resolvedName.split(" ")[0] || resolvedName;

      setChatUser({
        id: nextUser.id || loggedInUser?._id,
        name: resolvedName,
        phone: nextUser.phone.trim(),
        email: (nextUser.email || loggedInUser?.email || "").trim(),
      });
      setError(null);

      // Add Tara's welcome message when there are no existing messages
      setMessages((prev) => {
        if (prev.length > 0) return prev;
        return [
          {
            id: generateMessageId(),
            role: "assistant",
            content: `Hi ${firstName}! I'm Tara, your Oak & D assistant. I'm here to help with tracking your packages, getting shipping quotes, or anything else you need. What can I help you with today?`,
            timestamp: Date.now(),
          },
        ];
      });
    },
    [loggedInUser]
  );

  const clearChat = useCallback(() => {
    clearStoredMessages(sessionId);
    const newSid = getSessionId();
    setSessionId(newSid);
    setMessages([]);
    setChatUser(getDefaultUserFromAccount());
    setError(null);
  }, [getDefaultUserFromAccount, sessionId]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) return;
      if (isLoading) return;
      if (!isUserReady || !chatUser) {
        setError("Please enter your name and phone number to start chatting.");
        return;
      }

      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        // Send previous turns for stateless backend context.
        const history: ChatHistoryEntry[] = messages
          .map((m) => ({ role: m.role, content: m.content }));

        const response = await sendChatMessage({
          message: trimmed,
          session_id: sessionId,
          history,
          user: chatUser,
        });

        const botMessage: ChatMessage = {
          id: generateMessageId(),
          role: "assistant",
          content: response.answer,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err: any) {
        // Mark the user message as errored
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMessage.id ? { ...m, error: true } : m
          )
        );
        setError("Failed to send message. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [chatUser, isLoading, isUserReady, messages, sessionId]
  );

  const retryLastMessage = useCallback(() => {
    const lastErrored = [...messages].reverse().find((m) => m.error);
    if (!lastErrored) return;

    // Remove the errored message and re-send
    setMessages((prev) => prev.filter((m) => m.id !== lastErrored.id));
    setError(null);
    // Slight delay so state settles before re-sending
    setTimeout(() => {
      sendMessage(lastErrored.content);
    }, 100);
  }, [messages, sendMessage]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isLoading,
        error,
        sessionId,
        user: chatUser,
        isUserReady,
        sendMessage,
        setUser,
        toggleChat,
        clearChat,
        retryLastMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
