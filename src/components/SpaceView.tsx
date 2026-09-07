"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SpaceViewProps {
  onBack: () => void;
  onPlayTone: (freq: number) => void;
}

const FREQUENCIES = [
  { label: "SUB-BASS", detail: "43.65 Hz — F0 DEEP SUB", freq: 43.65 },
  { label: "WARM RESONANCE", detail: "110 Hz — A2 CHORD", freq: 110 },
  { label: "TWILIGHT TONE", detail: "220 Hz — A3 AIR PAD", freq: 220 },
  { label: "SOLAR HARMONIC", detail: "432 Hz — COSMIC TUNING", freq: 432 },
];

export default function SpaceView({ onBack, onPlayTone }: SpaceViewProps) {
  const [activeFreq, setActiveFreq] = useState<number>(432);

  const handleSelect = (freq: number) => {
    setActiveFreq(freq);
    onPlayTone(freq);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100svh] bg-[#030303] flex flex-col select-none overflow-hidden"
    >
      {/* Cosmic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-cover bg-center brightness-[0.7] contrast-125"
          style={{ backgroundImage: `url('/assets/space/space_dimension.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-transparent to-[#030303]/80" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pt-safe shrink-0 py-3 sm:py-4 flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
          <span className="tracking-[0.3em]">CHAPTER 06 // SPACE ACADEMY</span>
        </div>
        <button
          onClick={onBack}
          className="text-white hover:text-white/70 px-3 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.2em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-10 gap-3 sm:gap-5 min-h-0">
        <span className="font-mono-micro text-violet-300/80 tracking-[0.4em]" style={{ fontSize: "clamp(7px, 2vw, 9px)" }}>
          MONSTERVILLE AUDIO
        </span>

        <h2
          className="font-display leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/85 to-white/20 tracking-tighter text-center"
          style={{ fontSize: "clamp(32px, 10vw, 76px)" }}
        >
          SPACE ACADEMY
        </h2>

        <p className="max-w-[280px] text-center font-light text-white/55 leading-relaxed font-sans" style={{ fontSize: "clamp(9px, 2.5vw, 13px)" }}>
          SELECT A SPATIAL FREQUENCY TO MODULATE THE HARMONIC OSCILLATOR
        </p>

        {/* Frequencies Grid — 2x2 */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-sm font-mono-micro">
          {FREQUENCIES.map((item) => (
            <button
              key={item.freq}
              onClick={() => handleSelect(item.freq)}
              className={`p-3 sm:p-4 border text-left flex flex-col gap-0.5 transition-all duration-300 rounded-[3px] cursor-pointer ${
                activeFreq === item.freq
                  ? "bg-white text-black border-white"
                  : "bg-black/60 border-white/15 text-white/80 hover:border-white/50"
              }`}
            >
              <span className="font-bold tracking-wider" style={{ fontSize: "clamp(7px, 2.2vw, 10px)" }}>
                {item.label}
              </span>
              <span
                className={activeFreq === item.freq ? "text-black/60" : "text-white/40"}
                style={{ fontSize: "clamp(6px, 1.8vw, 9px)" }}
              >
                {item.detail}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pb-safe shrink-0 py-3 flex justify-between items-center font-mono-micro text-[9px] sm:text-[10px] text-white/30 border-t border-white/10">
        <span>IMMERSIVE AUDIO ENGINE</span>
        <span>FREQ: {activeFreq}Hz</span>
      </div>
    </motion.div>
  );
}
