"use client";

import { motion } from "framer-motion";

interface WorldViewProps {
  onBack: () => void;
}

export default function WorldView({ onBack }: WorldViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100svh] bg-[#050505] flex flex-col select-none overflow-hidden"
    >
      {/* Background Architectural Monolith */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full bg-cover bg-center sm:bg-right-bottom brightness-[0.45] sm:brightness-[0.65] contrast-125"
          style={{ backgroundImage: `url('/assets/world/monolith.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-[#050505]/75 sm:from-[#050505] sm:via-[#050505]/30 sm:to-[#050505]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/40 to-transparent" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pt-safe shrink-0 py-3 sm:py-4 flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
          <span className="tracking-[0.3em]">CHAPTER 01 // MONSTERVILLE MAGAZINE</span>
        </div>
        <button
          onClick={onBack}
          className="text-white hover:text-white/70 px-3 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.2em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center Manifesto */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-10 min-h-0">
        <div className="flex flex-col gap-1 overflow-hidden">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(34px, 11vw, 88px)" }}
          >
            MONSTERVILLE
          </motion.h2>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white/65 tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(34px, 11vw, 88px)" }}
          >
            MAGAZINE.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 flex flex-col gap-3 max-w-xl"
        >
          <p className="text-sm sm:text-lg text-white/75 font-light leading-relaxed">
            The official publication and nocturnal chronicle of Monsterville. Curated dispatches on sonic architecture, underground culture, and raw creative movements.
          </p>
          <p className="text-xs sm:text-sm text-white/40 font-light leading-relaxed hidden sm:block">
            Every issue, editorial interview, and archival essay documents the expanding boundary of the inner creative universe.
          </p>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pb-safe shrink-0 py-3 flex justify-between items-center font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10">
        <span>LATITUDE 34.0522° N</span>
        <span className="text-white/70 tracking-[0.25em]">UNRESTRICTED TRANSMISSION</span>
      </div>
    </motion.div>
  );
}
