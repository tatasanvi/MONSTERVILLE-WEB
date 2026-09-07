"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface NavigationPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWorld: (worldId: string) => void;
  audioActive: boolean;
  onToggleAudio: () => void;
}

const MENU_ITEMS = [
  { id: "world", label: "MONSTERVILLE MAGAZINE", subtitle: "EDITORIAL & ARTICLES", num: "01" },
  { id: "bobino", label: "BOBINO", subtitle: "THE ARTIST // MONSTERVILLE", num: "02" },
  { id: "music", label: "NEW RELEASE", subtitle: "RELEASES & STEMS", num: "03" },
  { id: "visuals", label: "CREATOR STUDIO", subtitle: "35MM FILM REELS", num: "04" },
  { id: "studios", label: "STUDIOS", subtitle: "PARIS • TOKYO • LA", num: "05" },
  { id: "space", label: "SPACE ACADEMY", subtitle: "432HZ FREQUENCY", num: "06" },
  { id: "shop", label: "STORE", subtitle: "LIMITED GARMENTS", num: "07" },
  { id: "contact", label: "CONTACT", subtitle: "TRANSMIT A MESSAGE", num: "08" },
];

// Swipe down threshold in px to dismiss the menu
const DISMISS_THRESHOLD = 80;

export default function NavigationPortal({
  isOpen,
  onClose,
  onSelectWorld,
  audioActive,
  onToggleAudio,
}: NavigationPortalProps) {

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > DISMISS_THRESHOLD || info.velocity.y > 400) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-39 bg-black/50"
          />

          {/* Menu Panel — draggable downward to dismiss */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={handleDragEnd}
            style={{ touchAction: "pan-x" }} // allow horizontal swipe-back on iOS
            className="fixed inset-0 z-40 w-screen h-[100svh] bg-[#050505]/97 backdrop-blur-2xl flex flex-col justify-between overflow-hidden select-none"
          >
            {/* Drag handle indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pt-3 z-50 pointer-events-none">
              <div className="w-9 h-1 rounded-full bg-white/20" />
            </div>

            {/* Top Bar */}
            <div className="w-full px-5 sm:px-12 pt-safe py-3 sm:py-4 flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px] shrink-0 mt-3">
              <span className="tracking-[0.35em] text-white/75">MONSTERVILLE // DIRECTORY</span>
              <button
                onClick={onToggleAudio}
                className="touch-target text-white/70 hover:text-white px-3 border border-white/20 rounded-full transition-colors cursor-pointer"
              >
                {audioActive ? "SOUND: ON" : "SOUND: MUTE"}
              </button>
            </div>

            {/* Navigation Links */}
            <nav
              className="flex-1 flex flex-col items-center justify-center px-5 sm:px-12 min-h-0 overflow-hidden"
              aria-label="World navigation"
            >
              <div className="flex flex-col items-center w-full max-w-xl">
                {MENU_ITEMS.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.035 + 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => {
                      onSelectWorld(item.id);
                      onClose();
                    }}
                    whileTap={{ scale: 0.97, x: 6 }}
                    className="group flex flex-col items-center cursor-pointer focus:outline-none w-full py-1.5 border-b border-white/[0.07] last:border-b-0 active:bg-white/[0.03] transition-colors rounded-sm"
                  >
                    <div className="flex items-baseline gap-2 sm:gap-3">
                      <span className="font-mono-micro text-[8px] text-white/20 group-hover:text-white/55 transition-colors">
                        {item.num}
                      </span>
                      <span
                        className="font-display text-white/65 group-hover:text-white transition-all duration-250 whitespace-nowrap tracking-tight"
                        style={{ fontSize: "clamp(17px, 4.6vw, 44px)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span
                      className="font-mono-micro text-white/22 group-hover:text-white/50 tracking-[0.22em]"
                      style={{ fontSize: "clamp(6px, 1.7vw, 8px)" }}
                    >
                      {item.subtitle}
                    </span>
                  </motion.button>
                ))}
              </div>
            </nav>

            {/* Bottom Bar */}
            <div className="w-full px-5 sm:px-12 pb-safe py-3 flex flex-col sm:flex-row justify-between items-center gap-1 font-mono-micro text-[8px] sm:text-[9px] text-white/30 border-t border-white/10 shrink-0">
              <span className="tracking-[0.25em]">A24 / CINEMATIC AUDIO UNIVERSE</span>
              <span className="text-white/55 tracking-[0.25em]">EST. 2026 // UNRESTRICTED</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
