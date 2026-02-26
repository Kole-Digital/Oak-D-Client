import { motion } from "framer-motion";

export default function ChatTypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-[#F5F5F5] rounded-[10px] rounded-bl-[2px] px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-[7px] h-[7px] rounded-full bg-[#A1A1A1]"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
