import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const MAX_LENGTH = 1000;

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim().length > 0 && !disabled;

  function handleSend() {
    if (!canSend) return;
    onSend(value);
    setValue("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value;
    if (newValue.length <= MAX_LENGTH) {
      setValue(newValue);
    }
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }

  const showCharCount = value.length > MAX_LENGTH * 0.8;

  return (
    <div className="border-t border-[#E3E3E3] px-4 py-3 bg-white">
      {showCharCount && (
        <div className="text-[11px] text-[#A1A1A1] text-right mb-1">
          {value.length}/{MAX_LENGTH}
        </div>
      )}
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          aria-label="Type your message"
          disabled={disabled}
          rows={1}
          className="flex-1 border border-[#E3E3E3] rounded-[10px] px-3 py-2 text-[14px] text-[#1E1E1E] placeholder-[#A1A1A1] resize-none focus:outline-none focus:border-[#AC0108] transition-colors disabled:opacity-50"
          style={{ maxHeight: "120px" }}
        />
        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className="w-10 h-10 rounded-full bg-[#AC0108] flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-[#0A089A] transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
