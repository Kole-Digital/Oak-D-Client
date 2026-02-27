import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useChatContext } from "@/context/ChatContext";
import ChatHeader from "./ChatHeader";
import ChatPreChatForm from "./ChatPreChatForm";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

interface ChatPanelProps {
  isMobile: boolean;
}

export default function ChatPanel({ isMobile }: ChatPanelProps) {
  const {
    messages,
    user,
    isUserReady,
    isLoading,
    error,
    toggleChat,
    clearChat,
    sendMessage,
    setUser,
    retryLastMessage,
  } = useChatContext();

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleChat();
    },
    [toggleChat]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const panelClasses =
    "fixed bottom-4 right-4 z-[9999] w-[calc(100vw-1.5rem)] max-w-[400px] h-[550px] max-h-[calc(100vh-1.5rem)] flex flex-col bg-[#FEFEFE] rounded-[10px] shadow-xl";

  const motionVariants = isMobile
    ? {
        initial: { opacity: 0, y: 30, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 30, scale: 0.96 },
      }
    : {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
      };

  return (
    <motion.div
      className={panelClasses}
      role="dialog"
      aria-modal="true"
      aria-label="Customer support chat"
      {...motionVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <ChatHeader
        onClose={toggleChat}
        onClear={clearChat}
        isMobile={isMobile}
      />
      {error && (
        <div className="px-4 py-2 border-b border-[#F2D3D5] bg-[#FFF5F6] text-[12px] text-[#AC0108]">
          {error}
        </div>
      )}
      {!isUserReady ? (
        <ChatPreChatForm
          initialUser={user}
          onSubmit={setUser}
          disabled={isLoading}
        />
      ) : (
        <>
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            onRetry={retryLastMessage}
          />
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </>
      )}
    </motion.div>
  );
}
