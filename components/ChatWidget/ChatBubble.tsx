import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatBubbleProps {
  onClick: () => void;
  hasUnread: boolean;
}

const TOOLTIP_TEXT = "Hi! Need help? Chat with us";
const AUTO_SHOW_DELAY_MS = 3000;
const AUTO_HIDE_DELAY_MS = 8000;

export default function ChatBubble({ onClick, hasUnread }: ChatBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [autoShow, setAutoShow] = useState(false);

  // Auto-show the tooltip after a few seconds to grab attention,
  // then hide it after a while so it's not annoying
  useEffect(() => {
    const showTimer = setTimeout(() => setAutoShow(true), AUTO_SHOW_DELAY_MS);
    const hideTimer = setTimeout(() => setAutoShow(false), AUTO_HIDE_DELAY_MS);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const showTooltip = isHovered || autoShow;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-end gap-3">
      {/* Tooltip message */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={onClick}
            className="bg-white rounded-[10px] shadow-lg px-4 py-3 max-w-[200px] cursor-pointer border border-[#E3E3E3] mb-1"
          >
            <p className="text-[13px] text-[#1E1E1E] font-medium leading-snug">
              {TOOLTIP_TEXT}
            </p>
            {/* Speech bubble tail pointing right */}
            <div className="absolute right-[-6px] bottom-5 w-3 h-3 bg-white border-r border-b border-[#E3E3E3] rotate-[-45deg]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble button */}
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open customer support chat"
        tabIndex={0}
        className="relative w-[60px] h-[60px] lg:w-14 lg:h-14 rounded-full bg-[#AC0108] hover:bg-[#0A089A] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {hasUnread && (
          <motion.span
            className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#0A089A] rounded-full border-2 border-white"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
