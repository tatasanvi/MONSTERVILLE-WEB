"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SpaceViewProps {
  onBack: () => void;
  onPlayTone: (freq: number) => void;
}

const FREQUENCIES = [
  { label: "SUB-BASS 43.65Hz", freq: 43.65, note: "F0 DEEP SUB" },
  { label: "WARM RESONANCE 110Hz", freq: 110, note: "A2 ANALOG CHORD" },
  { label: "TWILIGHT TONE 220Hz", freq: 220, note: "A3 AIR PAD" },
  { label: "SOLAR HARMONIC 432Hz", freq: 432, note: "COSMIC TUNING" },
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
      className="relative w-full h-[100dvh] bg-[#030303] flex flex-col justify-between p-5 sm:p-10 select-none overflow-hidden"
    >
      {/* Background Cosmic Atmosphere */}
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
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-safe flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
          <span className="tracking-[0.3em]">CHAPTER 05 // PARALLEL REALITY</span>
        </div>

        <button
          onClick={onBack}
          className="text-white hover:text-white/70 px-3.5 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.25em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center Dimensional Matrix */}
      <div className="relative z-10 w-full max-w-lg sm:max-w-xl mx-auto my-auto flex flex-col items-center justify-center text-center gap-4 py-2">
        <span className="font-mono-micro text-[8px] sm:text-[9px] text-violet-300/80 tracking-[0.45em]">
          MONSTERVILLE AUDIO
        </span>

        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/85 to-white/20 tracking-tighter">
          SPACE
        </h2>

        <p className="max-w-xs sm:max-w-md text-xs sm:text-sm font-light text-white/60 leading-relaxed font-sans px-2">
          SELECT A SPATIAL FREQUENCY TO MODULATE THE HARMONIC OSCILLATOR
        </p>

        {/* Frequencies Grid (Thumb-friendly on phone) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-md mt-2 font-mono-micro text-[9px] sm:text-[10px]">
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
              <span className="font-bold tracking-wider">{item.label}</span>
              <span className={activeFreq === item.freq ? "text-black/70" : "text-white/40"}>
                {item.note}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Coordinates */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pb-safe flex justify-between items-end font-mono-micro text-[9px] sm:text-[10px] text-white/30 border-t border-white/10 pt-4">
        <span>IMMERSIVE AUDIO ENGINE EQUIPPED</span>
        <span>FREQUENCY: 432HZ / INFINITE</span>
      </div>
    </motion.div>
  );
}
