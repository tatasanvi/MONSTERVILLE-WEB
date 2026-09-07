"use client";

import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function VideoModal({ isOpen, onClose, title }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 w-screen h-screen z-[999999] bg-[#030303] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
        >
          {/* Top Bar */}
          <div className="w-full flex justify-between items-center font-mono-micro text-white/60 text-xs">
            <span className="tracking-[0.3em]">MONSTERVILLE CINEMA ARCHIVE // 4K MASTER</span>
            <button
              onClick={onClose}
              data-cursor="ENTER"
              className="text-white hover:text-white/60 py-2 px-4 border border-white/20 hover:border-white tracking-[0.3em]"
            >
              [ CLOSE ✕ ]
            </button>
          </div>

          {/* Cinematic Viewport */}
          <div className="w-full max-w-5xl mx-auto my-auto aspect-[21/9] sm:aspect-[16/9] bg-black border border-white/10 relative overflow-hidden flex items-center justify-center shadow-[0_30px_100px_rgba(0,0,0,0.95)]">
            {/* Visual Still */}
            <div
              className="absolute inset-0 bg-cover bg-center contrast-125 brightness-80"
              style={{ backgroundImage: `url('/assets/visuals/visual_film_still.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />

            {/* Ambient scanlines effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

            {/* Center Play Indicator */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="w-20 h-20 rounded-full border border-white/40 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <span className="text-white font-mono text-xl pl-1">▶</span>
              </div>
              <span className="font-display text-2xl sm:text-4xl text-white tracking-tight">
                {title}
              </span>
              <span className="font-mono-micro text-[10px] text-white/50 tracking-[0.35em]">
                STREAMING MASTER TRANSMISSION // STEREO UNCOMPRESSED
              </span>
            </div>

            {/* Timecode overlay */}
            <div className="absolute bottom-4 left-6 font-mono text-xs text-white/70">
              REC ● [ 00:04:12 : 24FPS ]
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full flex justify-between items-center font-mono-micro text-white/30 text-[10px]">
            <span>ANAMORPHIC SCOPE // 2.39:1 RATIO</span>
            <span>PRESS ESC OR [CLOSE] TO RETURN</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
