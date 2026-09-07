"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactViewProps {
  onBack: () => void;
}

export default function ContactView({ onBack }: ContactViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactEmail = "monstervilleinc@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100svh] bg-[#050505] flex flex-col select-none overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-[#FF5A1F]/5 blur-[120px]" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-white/[0.03] blur-[100px]" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pt-safe shrink-0 py-3 sm:py-4 flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full animate-pulse" />
          <span className="tracking-[0.3em]">CHAPTER 08 // CONTACT</span>
        </div>
        <button
          onClick={onBack}
          className="text-white hover:text-white/70 px-3 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.2em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-12 pb-16 sm:pb-0 max-w-2xl mx-auto w-full min-h-0 overflow-y-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-1 mb-5 sm:mb-6"
        >
          <span className="font-mono-micro text-[10px] tracking-[0.35em] text-[#FF5A1F]">
            TRANSMIT FREQUENCY
          </span>
          <h2
            className="font-display text-white tracking-tighter leading-[0.9]"
            style={{ fontSize: "clamp(32px, 8.5vw, 68px)" }}
          >
            DISPATCH HQ.
          </h2>
        </motion.div>

        {/* Quick Email Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-2 mb-6 text-xs sm:text-sm font-mono"
        >
          <a
            href={`mailto:${contactEmail}`}
            className="text-white hover:text-[#FF5A1F] transition-colors underline underline-offset-4 tracking-wider"
          >
            {contactEmail}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="touch-target px-2.5 py-1 text-[10px] font-mono-micro text-white/50 hover:text-white border border-white/15 rounded hover:border-white/30 transition-colors uppercase tracking-widest"
          >
            {copied ? "COPIED ✓" : "COPY EMAIL"}
          </button>
        </motion.div>

        {/* Transmission Form */}
        {sent ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 sm:p-8 bg-white/[0.03] border border-white/15 rounded-xl flex flex-col items-center text-center gap-3"
          >
            <span className="text-2xl text-[#FF5A1F]">⚡</span>
            <h3 className="font-display text-lg sm:text-xl text-white tracking-wide">
              TRANSMISSION RECEIVED
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-light max-w-md leading-relaxed">
              Your signal has been recorded in the Monsterville ledger. We will establish connection through the frequency shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
              className="mt-3 touch-target px-4 py-2 border border-white/20 text-white/70 hover:text-white text-[11px] font-mono tracking-widest rounded-full transition-colors"
            >
              [ TRANSMIT ANOTHER ]
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3.5 sm:gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-micro text-[9px] sm:text-[10px] text-white/50 tracking-[0.25em]">
                  CALLSIGN // NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="IDENTIFIER"
                  className="w-full min-h-[48px] px-4 bg-white/[0.04] border border-white/15 focus:border-[#FF5A1F] rounded-lg text-white text-sm font-mono placeholder:text-white/25 outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono-micro text-[9px] sm:text-[10px] text-white/50 tracking-[0.25em]">
                  RETURN FREQUENCY // EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="NAME@DOMAIN.COM"
                  className="w-full min-h-[48px] px-4 bg-white/[0.04] border border-white/15 focus:border-[#FF5A1F] rounded-lg text-white text-sm font-mono placeholder:text-white/25 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono-micro text-[9px] sm:text-[10px] text-white/50 tracking-[0.25em]">
                TRANSMISSION MESSAGE
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="STATE YOUR PURPOSE..."
                className="w-full p-4 bg-white/[0.04] border border-white/15 focus:border-[#FF5A1F] rounded-lg text-white text-sm font-mono placeholder:text-white/25 outline-none resize-none transition-colors"
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full min-h-[48px] bg-white text-black font-mono text-xs tracking-[0.25em] font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors rounded-lg cursor-pointer mt-1 touch-target"
            >
              SEND TRANSMISSION →
            </motion.button>
          </motion.form>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pb-safe shrink-0 py-3 flex justify-between items-center font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10">
        <span>STATUS: ACTIVE</span>
        <span className="text-white/70 tracking-[0.25em]">MONSTERVILLE HQ // 24/7 ENCRYPTED</span>
      </div>
    </motion.div>
  );
}
