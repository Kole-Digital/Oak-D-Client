import { useEffect, useRef } from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import ChatTypingIndicator from "./ChatTypingIndicator";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  onRetry: () => void;
}

export default function ChatMessages({
  messages,
  isLoading,
  onRetry,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-4"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          onRetry={msg.error ? onRetry : undefined}
        />
      ))}
      {isLoading && <ChatTypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
