"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinemaViewProps {
  onBack: () => void;
  onOpenFilm: (title: string) => void;
}

const FILMS = [
  {
    id: "film-01",
    title: "DESTINY // THE FILM",
    subtitle: "DIRECTED BY MONSTERVILLE CINEMA",
    runtime: "06:12",
    format: "35MM ANAMORPHIC",
    image: "/assets/visuals/visual_film_still.jpg",
  },
  {
    id: "film-02",
    title: "THE SANCTUARY TRANSMISSION",
    subtitle: "ARCHIVE DOCUMENTARY",
    runtime: "03:45",
    format: "16MM KODAK VISION3",
    image: "/assets/world/monolith.jpg",
  },
  {
    id: "film-03",
    title: "CHRONICLES // AFTER HOURS",
    subtitle: "EXPERIMENTAL LIGHT STUDY",
    runtime: "02:18",
    format: "DIGITAL RAW 8K",
    image: "/assets/space/space_dimension.jpg",
  },
];

export default function CinemaView({ onBack, onOpenFilm }: CinemaViewProps) {
  const [activeFilmIdx, setActiveFilmIdx] = useState(0);
  const film = FILMS[activeFilmIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100dvh] bg-[#050505] flex flex-col justify-between p-5 sm:p-10 select-none overflow-hidden"
    >
      {/* Top Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-safe flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
          <span className="tracking-[0.3em]">CHAPTER 03 // CINEMA ARCHIVE</span>
        </div>

        <button
          onClick={onBack}
          className="text-white hover:text-white/70 px-3.5 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.25em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Main 16:9 Screen (Centered, Phone-First) */}
      <div className="relative z-10 w-full max-w-2xl sm:max-w-3xl mx-auto my-auto flex flex-col gap-3 sm:gap-4 py-2">
        
        {/* Title & Format above screen */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col text-left">
            <span className="font-mono-micro text-[8px] sm:text-[9px] text-white/40 tracking-[0.3em]">
              {film.subtitle}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl text-white tracking-tight">
              {film.title}
            </h2>
          </div>
          <span className="font-mono-micro text-[9px] text-white/70 px-2 py-0.5 border border-white/15 bg-black/60">
            {film.runtime}
          </span>
        </div>

        {/* Widescreen Film Screen Container */}
        <div
          onClick={() => onOpenFilm(film.title)}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[4px] overflow-hidden bg-[#0A0A0A] border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)] group cursor-pointer"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={film.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-cover bg-center brightness-90 group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('${film.image}')` }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Centered Play Trigger */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
              <span className="ml-1 text-base sm:text-lg">▶</span>
            </div>
          </div>

          <div className="absolute bottom-3 left-4 font-mono-micro text-[8px] text-white/60 tracking-[0.25em]">
            TAP TO LAUNCH CINEMA
          </div>
        </div>

        {/* Film Switcher Tabs */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono-micro text-[8px] sm:text-[9px] text-white/40 tracking-[0.25em]">
            REEL 0{activeFilmIdx + 1} / 0{FILMS.length}
          </span>

          <div className="flex gap-2">
            {FILMS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilmIdx(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilmIdx === idx ? "w-6 bg-white" : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Select reel ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Coordinates */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pb-safe flex justify-between items-end font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10 pt-4">
        <span>35MM CELLULOID DIGITIZED</span>
        <span className="text-white/60">DIRECTORS CUT MASTER</span>
      </div>
    </motion.div>
  );
}
