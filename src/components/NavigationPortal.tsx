"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NavigationPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWorld: (worldId: string) => void;
  audioActive: boolean;
  onToggleAudio: () => void;
}

const MENU_ITEMS = [
  { id: "world", label: "THE WORLD", subtitle: "ORIGIN & MONOLITH", num: "01" },
  { id: "music", label: "DESTINY // MUSIC", subtitle: "RELEASES & STEMS", num: "02" },
  { id: "visuals", label: "CINEMA ARCHIVE", subtitle: "35MM FILM REELS", num: "03" },
  { id: "studios", label: "STUDIOS", subtitle: "PARIS • TOKYO • LA", num: "04" },
  { id: "space", label: "PARALLEL SPACE", subtitle: "432HZ FREQUENCY", num: "05" },
  { id: "shop", label: "EDITORIAL BOUTIQUE", subtitle: "LIMITED GARMENTS", num: "06" },
];

export default function NavigationPortal({
  isOpen,
  onClose,
  onSelectWorld,
  audioActive,
  onToggleAudio,
}: NavigationPortalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 w-screen h-[100dvh] bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
        >
          {/* Top Bar inside Menu */}
          <div className="w-full max-w-7xl mx-auto pt-safe flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
            <span className="tracking-[0.35em] text-white/80">MONSTERVILLE // DIRECTORY</span>

            <button
              onClick={onToggleAudio}
              className="text-white/70 hover:text-white px-3 py-1 border border-white/20 rounded-full transition-colors cursor-pointer"
            >
              {audioActive ? "SOUND: ON" : "SOUND: MUTE"}
            </button>
          </div>

          {/* Center Navigation Links (Monumental Typography) */}
          <nav className="my-auto w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-4 sm:gap-6 text-center">
            {MENU_ITEMS.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.05 + 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  onSelectWorld(item.id);
                  onClose();
                }}
                className="group flex flex-col items-center cursor-pointer focus:outline-none"
              >
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <span className="font-mono-micro text-[9px] text-white/30 group-hover:text-white/70 transition-colors">
                    {item.num}
                  </span>
                  <span className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white/75 group-hover:text-white tracking-tight group-hover:scale-105 transition-all duration-300">
                    {item.label}
                  </span>
                </div>
                <span className="font-mono-micro text-[8px] sm:text-[9px] text-white/30 group-hover:text-white/60 tracking-[0.25em] mt-0.5">
                  {item.subtitle}
                </span>
              </motion.button>
            ))}
          </nav>

          {/* Bottom Secondary Links (Newsletter & Transmission) */}
          <div className="w-full max-w-7xl mx-auto pb-safe flex flex-col sm:flex-row justify-between items-center gap-3 font-mono-micro text-[9px] text-white/40 border-t border-white/10 pt-4">
            <span className="tracking-[0.25em]">A24 / CINEMATIC AUDIO UNIVERSE</span>
            <span className="text-white/70 tracking-[0.25em]">EST. 2026 // UNRESTRICTED</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
