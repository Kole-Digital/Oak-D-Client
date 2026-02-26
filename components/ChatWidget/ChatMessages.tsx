import { useEffect, useRef } from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import ChatTypingIndicator from "./ChatTypingIndicator";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  onRetry: () => void;
  onQuickAction: (text: string) => void;
}

const QUICK_ACTIONS = [
  "Track a package",
  "Get a quote",
  "Contact support",
];

export default function ChatMessages({
  messages,
  isLoading,
  onRetry,
  onQuickAction,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const showWelcome = messages.length === 0;

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-4"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {showWelcome ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-12 h-12 rounded-full bg-[#AC0108] flex items-center justify-center mb-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="text-[16px] font-semibold text-[#1E1E1E] mb-1">
            Welcome to Oak & D Support
          </h3>
          <p className="text-[13px] text-[#A1A1A1] mb-5 max-w-[280px]">
            Hi there! How can we help you today? Choose an option below or type
            your question.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action}
                onClick={() => onQuickAction(action)}
                className="border border-[#AC0108] text-[#AC0108] rounded-[20px] px-4 py-2 text-[13px] font-medium hover:bg-[#AC0108] hover:text-white transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onRetry={msg.error ? onRetry : undefined}
            />
          ))}
          {isLoading && <ChatTypingIndicator />}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
