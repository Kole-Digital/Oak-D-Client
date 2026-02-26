import { FormEvent, useEffect, useState } from "react";
import { ChatUser } from "@/types/chat";

interface ChatPreChatFormProps {
  initialUser: ChatUser | null;
  onSubmit: (user: ChatUser) => void;
  disabled: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ChatPreChatForm({
  initialUser,
  onSubmit,
  disabled,
}: ChatPreChatFormProps) {
  const [name, setName] = useState(initialUser?.name || "");
  const [phone, setPhone] = useState(initialUser?.phone || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(initialUser?.name || "");
    setPhone(initialUser?.phone || "");
    setEmail(initialUser?.email || "");
  }, [initialUser?.email, initialUser?.name, initialUser?.phone]);

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0 && !disabled;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedPhone) {
      setError("Name and phone number are required.");
      return;
    }

    if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
      setError("Enter a valid email address or leave it blank.");
      return;
    }

    setError(null);
    onSubmit({
      id: initialUser?.id,
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail || undefined,
    });
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5">
      <div className="max-w-[340px] mx-auto">
        <h3 className="text-[16px] font-semibold text-[#1E1E1E] mb-1">
          Before We Start
        </h3>
        <p className="text-[13px] text-[#6A6A6A] mb-5">
          Share your name and phone number so our team can follow up if needed.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="chat-name" className="block text-[12px] text-[#555] mb-1">
              Name
            </label>
            <input
              id="chat-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              disabled={disabled}
              className="w-full border border-[#E3E3E3] rounded-[10px] px-3 py-2 text-[14px] text-[#1E1E1E] focus:outline-none focus:border-[#AC0108] disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="chat-phone" className="block text-[12px] text-[#555] mb-1">
              Phone
            </label>
            <input
              id="chat-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
              disabled={disabled}
              className="w-full border border-[#E3E3E3] rounded-[10px] px-3 py-2 text-[14px] text-[#1E1E1E] focus:outline-none focus:border-[#AC0108] disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="chat-email" className="block text-[12px] text-[#555] mb-1">
              Email (Optional)
            </label>
            <input
              id="chat-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={disabled}
              className="w-full border border-[#E3E3E3] rounded-[10px] px-3 py-2 text-[14px] text-[#1E1E1E] focus:outline-none focus:border-[#AC0108] disabled:opacity-60"
            />
          </div>

          {error && <p className="text-[12px] text-[#AC0108]">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-[10px] bg-[#AC0108] text-white text-[14px] font-semibold py-2.5 disabled:opacity-40 hover:bg-[#0A089A] transition-colors"
          >
            Start Chat
          </button>
        </form>
      </div>
    </div>
  );
}
