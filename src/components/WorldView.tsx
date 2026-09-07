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
      className="relative w-full h-[100dvh] bg-[#050505] flex flex-col justify-between p-5 sm:p-10 select-none overflow-hidden"
    >
      {/* Background Architectural Monolith */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full bg-cover bg-center sm:bg-right-bottom brightness-[0.45] sm:brightness-[0.65] contrast-125"
          style={{ backgroundImage: `url('/assets/world/monolith.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/80 sm:from-[#050505] sm:via-[#050505]/30 sm:to-[#050505]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/40 to-transparent" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-safe flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
          <span className="tracking-[0.3em]">CHAPTER 01 // THE WORLD</span>
        </div>

        <button
          onClick={onBack}
          className="text-white hover:text-white/70 px-3.5 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.25em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center Manifesto Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto flex flex-col justify-center text-left py-4">
        <div className="flex flex-col gap-1 overflow-hidden">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-7xl md:text-8xl text-white tracking-tighter leading-[0.88]"
          >
            WELCOME TO
          </motion.h2>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-7xl md:text-8xl text-white/70 tracking-tighter leading-[0.88]"
          >
            MONSTERVILLE.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 flex flex-col gap-4 max-w-xl"
        >
          <p className="text-sm sm:text-lg text-white/80 font-light leading-relaxed">
            A digital city conceived at the bleeding edge of sub-bass frequencies, nocturnal architecture, and raw cinematic energy.
          </p>
          <p className="text-xs sm:text-sm text-white/40 font-light leading-relaxed hidden sm:block">
            We operate without boundaries, formulas, or compromise. Every frame, release, and physical silhouette originates from the inner town.
          </p>
        </motion.div>
      </div>

      {/* Bottom Coordinates */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pb-safe flex justify-between items-end font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10 pt-4">
        <span>LATITUDE 34.0522° N</span>
        <span className="text-white/70 tracking-[0.25em]">UNRESTRICTED TRANSMISSION</span>
      </div>
    </motion.div>
  );
}
