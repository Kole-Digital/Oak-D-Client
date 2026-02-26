import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  onRetry?: () => void;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessage({ message, onRetry }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap break-words ${
            isUser
              ? "bg-[#AC0108] text-white rounded-[10px] rounded-br-[2px]"
              : "bg-[#F5F5F5] text-[#1E1E1E] rounded-[10px] rounded-bl-[2px]"
          } ${message.error ? "border-2 border-red-400" : ""}`}
        >
          {message.content}
        </div>
        <div
          className={`flex items-center gap-2 mt-1 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-[11px] text-[#A1A1A1]">
            {formatTime(message.timestamp)}
          </span>
          {message.error && onRetry && (
            <button
              onClick={onRetry}
              className="text-[11px] text-[#AC0108] hover:underline font-medium"
            >
              Failed to send — Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
