"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function VideoModal({ isOpen, onClose, title }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 80 || info.velocity.y > 400) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.3 }}
          onDragEnd={handleDragEnd}
          style={{ touchAction: "pan-x" }}
          className="fixed inset-0 w-screen h-[100svh] z-[999999] bg-[#030303] flex flex-col justify-between p-4 sm:p-10 overflow-hidden select-none"
        >
          {/* Mobile Drag Handle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-none sm:hidden">
            <div className="w-10 h-1 rounded-full bg-white/25" />
          </div>

          {/* Top Bar */}
          <div className="w-full flex justify-between items-center font-mono-micro text-white/60 text-[10px] sm:text-xs pt-safe mt-2 sm:mt-0">
            <span className="tracking-[0.25em] sm:tracking-[0.3em] truncate max-w-[200px] sm:max-w-none">
              MONSTERVILLE CREATOR STUDIO // 4K MASTER
            </span>
            <button
              onClick={onClose}
              data-cursor="ENTER"
              className="touch-target text-white hover:text-white/60 py-2 px-3 sm:px-4 border border-white/20 hover:border-white tracking-[0.25em] rounded-full sm:rounded-none cursor-pointer text-[10px] sm:text-xs"
            >
              [ CLOSE ✕ ]
            </button>
          </div>

          {/* Cinematic Viewport */}
          <div className="w-full max-w-5xl mx-auto my-auto aspect-[16/9] sm:aspect-[21/9] bg-black border border-white/10 relative overflow-hidden flex items-center justify-center shadow-[0_30px_100px_rgba(0,0,0,0.95)] rounded-lg sm:rounded-none">
            {/* Visual Still */}
            <div
              className="absolute inset-0 bg-cover bg-center contrast-125 brightness-80"
              style={{ backgroundImage: `url('/assets/visuals/visual_film_still.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />

            {/* Ambient scanlines effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

            {/* Center Play Indicator */}
            <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 text-center px-4">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/40 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <span className="text-white font-mono text-lg sm:text-xl pl-1">▶</span>
              </div>
              <span className="font-display text-xl sm:text-4xl text-white tracking-tight">
                {title}
              </span>
              <span className="font-mono-micro text-[8px] sm:text-[10px] text-white/50 tracking-[0.25em] sm:tracking-[0.35em]">
                STREAMING MASTER TRANSMISSION // STEREO UNCOMPRESSED
              </span>
            </div>

            {/* Timecode overlay */}
            <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 font-mono text-[10px] sm:text-xs text-white/70">
              REC ● [ 00:04:12 : 24FPS ]
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full flex justify-between items-center font-mono-micro text-white/40 text-[9px] sm:text-[10px] pb-safe">
            <span>ANAMORPHIC SCOPE // 2.39:1</span>
            <span className="hidden sm:inline">SWIPE DOWN OR PRESS ESC TO RETURN</span>
            <span className="sm:hidden">SWIPE DOWN TO CLOSE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
