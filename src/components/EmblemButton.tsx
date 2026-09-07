"use client";

import { motion } from "framer-motion";

interface EmblemButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function EmblemButton({ isOpen, onClick }: EmblemButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Toggle Navigation Menu"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-[#111111]/90 backdrop-blur-xl border border-white/20 hover:border-white/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center justify-center text-white cursor-pointer select-none transition-colors"
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        {isOpen ? (
          // Close X
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            className="text-white font-mono text-xl"
          >
            ✕
          </motion.div>
        ) : (
          // Custom Monsterville Monogram / Crest (Brutalist M with star/cross)
          <motion.svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            {/* Monumental M lines */}
            <path
              d="M6 34V6L20 22L34 6V34"
              stroke="#FFFFFF"
              strokeWidth="2.8"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            {/* Inner crossbar / sigil */}
            <path
              d="M14 26H26"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="square"
              opacity="0.8"
            />
          </motion.svg>
        )}
      </div>

      {/* Subtle outer breathing ring */}
      <motion.span
        className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.button>
  );
}
