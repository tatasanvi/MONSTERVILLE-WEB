"use client";

import Image from "next/image";
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
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-[#111111]/90 backdrop-blur-xl border border-white/20 hover:border-white/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center justify-center text-white cursor-pointer select-none transition-colors touch-target overflow-hidden"
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ opacity: 1 }}
      >
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-white font-mono text-xl"
          >
            ✕
          </motion.span>
        ) : (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="w-10 h-10 sm:w-11 sm:h-11 relative"
          >
            <Image
              src="/images/monsterville-inc-logo.png"
              alt="Monsterville Inc"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        )}
      </motion.div>

      {/* Subtle outer breathing ring */}
      <motion.span
        className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.button>
  );
}
