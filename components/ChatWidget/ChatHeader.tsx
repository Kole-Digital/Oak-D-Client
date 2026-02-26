interface ChatHeaderProps {
  onClose: () => void;
  onClear: () => void;
  isMobile: boolean;
}

export default function ChatHeader({ onClose, onClear, isMobile }: ChatHeaderProps) {
  return (
    <div
      className={`bg-[#AC0108] px-4 py-3 flex items-center justify-between ${
        isMobile ? "" : "rounded-t-[10px]"
      }`}
    >
      <div className="flex items-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="text-white font-semibold text-[15px]">
          Oak & D Support
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onClear}
          aria-label="New conversation"
          title="New conversation"
          className="text-white/70 hover:text-white p-1.5 rounded transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="text-white/70 hover:text-white p-1.5 rounded transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
