import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useChatContext } from "@/context/ChatContext";
import ChatBubble from "./ChatBubble";
import ChatPanel from "./ChatPanel";

function useIsMobile(breakpoint = 1024): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export default function ChatWidget() {
  const { isOpen, toggleChat, messages } = useChatContext();
  const isMobile = useIsMobile();
  const [hasUnread, setHasUnread] = useState(false);

  // Track unread: when a new bot message arrives and panel is closed
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      return;
    }
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === "assistant") {
      setHasUnread(true);
    }
  }, [messages, isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <ChatPanel key="panel" isMobile={isMobile} />
      ) : (
        <ChatBubble key="bubble" onClick={toggleChat} hasUnread={hasUnread} />
      )}
    </AnimatePresence>
  );
}
