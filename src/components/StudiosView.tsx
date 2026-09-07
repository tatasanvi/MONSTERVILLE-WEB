"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface StudiosViewProps {
  onBack: () => void;
}

const DISCIPLINES = [
  { id: "music", label: "MUSIC", meta: "ACOUSTIC MASTERING & SUB-BASS SCULPTING" },
  { id: "film", label: "FILM", meta: "35MM DIRECTING & CINEMA EDITORIAL" },
  { id: "photo", label: "PHOTOGRAPHY", meta: "ANALOG PORTRAITURE & ARCHITECTURAL ARCHIVES" },
  { id: "creative", label: "CREATIVE", meta: "UNIVERSE ARCHITECTURE & ART DIRECTION" },
];

export default function StudiosView({ onBack }: StudiosViewProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100dvh] bg-[#050505] flex flex-col justify-between p-5 sm:p-10 select-none overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full bg-cover bg-center grayscale contrast-150"
          style={{ backgroundImage: `url('/assets/studios/studio_ambience.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-safe flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
          <span className="tracking-[0.3em]">CHAPTER 04 // STUDIOS</span>
        </div>

        <button
          onClick={onBack}
          className="text-white hover:text-white/70 px-3.5 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.25em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center 4 Disciplines (High-Impact Typography Poster) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto my-auto flex flex-col justify-center gap-3 sm:gap-6 py-2">
        {DISCIPLINES.map((item, index) => {
          const isActive = activeIdx === index;
          return (
            <div
              key={item.id}
              onClick={() => setActiveIdx(index)}
              className="flex flex-col border-b border-white/10 pb-2 sm:pb-4 cursor-pointer group transition-colors"
            >
              <div className="flex justify-between items-baseline">
                <span
                  className={`font-display text-4xl xs:text-5xl sm:text-7xl md:text-8xl tracking-tighter transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/35 group-hover:text-white/70"
                  }`}
                >
                  {item.label}
                </span>
                <span className="font-mono-micro text-[8px] sm:text-[9px] text-white/30 tracking-[0.2em]">
                  0{index + 1}
                </span>
              </div>

              {/* Expandable sub-meta line */}
              <motion.div
                initial={false}
                animate={{
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="font-mono-micro text-[9px] sm:text-xs text-[#FF5A1F] tracking-[0.25em] pt-1">
                  {item.meta}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Bottom Coordinates */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pb-safe flex justify-between items-end font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10 pt-4">
        <span>PARIS • TOKYO • LOS ANGELES</span>
        <span className="text-white/60">ALL DISCIPLINES INTEGRATED</span>
      </div>
    </motion.div>
  );
}
