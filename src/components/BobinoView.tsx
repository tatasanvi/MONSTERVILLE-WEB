"use client";

import { motion } from "framer-motion";

interface BobinoViewProps {
  onBack: () => void;
  onSelectWorld?: (worldId: string) => void;
}

export default function BobinoView({ onBack, onSelectWorld }: BobinoViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100svh] bg-[#050505] flex flex-col select-none overflow-hidden"
    >
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full bg-cover bg-center sm:bg-right-bottom brightness-[0.35] contrast-125"
          style={{ backgroundImage: `url('/assets/visuals/visual_film_still.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/60 to-transparent" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pt-safe shrink-0 py-3 sm:py-4 flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
          <span className="tracking-[0.3em]">CHAPTER 02 // BOBINO BEATS</span>
        </div>
        <button
          onClick={onBack}
          className="text-white hover:text-white/70 px-3 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.2em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center Bio & Profile */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-12 pb-16 sm:pb-0 max-w-4xl mx-auto w-full min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-2">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono-micro text-[10px] sm:text-xs tracking-[0.35em] text-[#FF5A1F]"
          >
            ARTIST & VISIONARY ARCHITECT
          </motion.span>

          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(24px, 8vw, 84px)" }}
          >
            BOBINO BEATS.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-xs sm:text-base text-white/75 font-light leading-relaxed max-w-xl mt-2"
          >
            Sonic architect, visual director, and founder of Monsterville. Crafting monolithic soundscapes, nocturnal textures, and dystopian cinema from the underground studio circuits.
          </motion.p>
        </div>

        {/* Transmission Grid / Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 pt-4 border-t border-white/10"
        >
          <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg">
            <span className="block font-mono-micro text-[8px] sm:text-[9px] text-white/40 tracking-widest uppercase">
              DISCIPLINE
            </span>
            <span className="font-mono text-xs sm:text-sm text-white font-medium mt-0.5 block">
              AUDIO / VISION
            </span>
          </div>
          <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg">
            <span className="block font-mono-micro text-[8px] sm:text-[9px] text-white/40 tracking-widest uppercase">
              BASE FREQ
            </span>
            <span className="font-mono text-xs sm:text-sm text-[#FF5A1F] font-medium mt-0.5 block">
              432 HZ SINE
            </span>
          </div>
          <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg">
            <span className="block font-mono-micro text-[8px] sm:text-[9px] text-white/40 tracking-widest uppercase">
              RELEASES
            </span>
            <span className="font-mono text-xs sm:text-sm text-white font-medium mt-0.5 block">
              NEW RELEASE
            </span>
          </div>
          <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg">
            <span className="block font-mono-micro text-[8px] sm:text-[9px] text-white/40 tracking-widest uppercase">
              CIRCUITS
            </span>
            <span className="font-mono text-xs sm:text-sm text-white font-medium mt-0.5 block">
              PARIS • TYO • LA
            </span>
          </div>
        </motion.div>

        {/* Direct Action Hub */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap items-center gap-3"
        >
          {onSelectWorld && (
            <>
              <button
                type="button"
                onClick={() => onSelectWorld("music")}
                className="touch-target px-5 py-3 bg-white text-black font-mono text-xs tracking-wider rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                LISTEN TO NEW RELEASE →
              </button>
              <button
                type="button"
                onClick={() => onSelectWorld("visuals")}
                className="touch-target px-5 py-3 border border-white/20 text-white hover:border-white font-mono text-xs tracking-wider rounded-lg transition-colors"
              >
                CREATOR STUDIOS
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pb-safe shrink-0 py-3 flex justify-between items-center font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10">
        <span>ORIGIN: MONSTERVILLE SOUND LABS</span>
        <span className="text-white/70 tracking-[0.25em]">SECURE IDENTITY PROTOCOL</span>
      </div>
    </motion.div>
  );
}
