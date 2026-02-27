import { ChatMessage as ChatMessageType } from "@/types/chat";
import ReactMarkdown from "react-markdown";

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
          className={`px-4 py-3 text-[14px] leading-relaxed break-words ${
            isUser
              ? "bg-[#AC0108] text-white rounded-[10px] rounded-br-[2px] whitespace-pre-wrap"
              : "bg-[#F5F5F5] text-[#1E1E1E] rounded-[10px] rounded-bl-[2px] chat-markdown"
          } ${message.error ? "border-2 border-red-400" : ""}`}
        >
          {isUser ? (
            message.content
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 last:mb-0">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 last:mb-0">{children}</ol>,
                li: ({ children }) => <li className="mb-0.5">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-[#0A089A]">
                    {children}
                  </a>
                ),
                h1: ({ children }) => <h1 className="font-semibold text-[16px] mb-1">{children}</h1>,
                h2: ({ children }) => <h2 className="font-semibold text-[15px] mb-1">{children}</h2>,
                h3: ({ children }) => <h3 className="font-semibold text-[14px] mb-1">{children}</h3>,
                code: ({ children }) => (
                  <code className="bg-[#E5E5E5] px-1 py-0.5 rounded text-[13px]">{children}</code>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
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
