"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface CinemaViewProps {
  onBack: () => void;
  onOpenFilm: (title: string) => void;
}

const FILMS = [
  {
    id: "film-01",
    title: "NEW RELEASE // THE FILM",
    subtitle: "DIRECTED BY CREATOR STUDIOS",
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

const SWIPE_THRESHOLD = 55;

export default function CinemaView({ onBack, onOpenFilm }: CinemaViewProps) {
  const [activeFilmIdx, setActiveFilmIdx] = useState(0);
  const isDragging = useRef(false);
  const film = FILMS[activeFilmIdx];

  const handleNext = () =>
    setActiveFilmIdx((prev) => (prev + 1) % FILMS.length);
  const handlePrev = () =>
    setActiveFilmIdx((prev) => (prev - 1 + FILMS.length) % FILMS.length);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    isDragging.current = false;
    if (info.offset.x < -SWIPE_THRESHOLD) handleNext();
    else if (info.offset.x > SWIPE_THRESHOLD) handlePrev();
  };

  const handleScreenTap = () => {
    if (!isDragging.current) onOpenFilm(film.title);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100svh] bg-[#050505] flex flex-col select-none overflow-hidden"
    >
      {/* Top Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pt-safe shrink-0 py-3 sm:py-4 flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full" aria-hidden />
          <span className="tracking-[0.3em]">CHAPTER 04 // CREATOR STUDIOS</span>
        </div>
        <button
          onClick={onBack}
          className="touch-target text-white hover:text-white/70 px-3 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.2em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-10 gap-2 sm:gap-3 min-h-0 pb-2">

        {/* Film Info */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col text-left overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={`sub-${film.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="font-mono-micro text-white block"
                style={{ fontSize: "clamp(7px, 2vw, 9px)", letterSpacing: "0.3em" }}
              >
                {film.subtitle}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${film.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-display text-white tracking-tight truncate"
                style={{ fontSize: "clamp(16px, 5vw, 36px)" }}
              >
                {film.title}
              </motion.h2>
            </AnimatePresence>
          </div>
          <span className="font-mono-micro text-[8px] sm:text-[9px] text-white/70 px-2 py-0.5 border border-white/15 bg-black/60 ml-2 shrink-0">
            {film.runtime}
          </span>
        </div>

        {/* 16:9 Draggable Film Screen */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={handleDragEnd}
          onClick={handleScreenTap}
          whileTap={{ scale: 0.99 }}
          className="relative w-full rounded-[4px] overflow-hidden bg-[#0A0A0A] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group cursor-pointer"
          style={{ aspectRatio: "16/9", maxHeight: "52svh", touchAction: "pan-y" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={film.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-cover bg-center brightness-90"
              style={{ backgroundImage: `url('${film.image}')` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300"
            >
              <span className="ml-0.5 sm:ml-1 text-sm sm:text-lg">▶</span>
            </motion.div>
          </div>

          {/* Swipe hint bottom left */}
          <div className="absolute bottom-2 left-3 font-mono-micro text-[7px] text-white/45 tracking-[0.2em]">
            SWIPE OR TAP TO LAUNCH
          </div>

          {/* Format badge */}
          <div className="absolute top-2 right-3 font-mono-micro text-[7px] text-white/50 px-1.5 py-0.5 bg-black/70 border border-white/10">
            {film.format}
          </div>
        </motion.div>

        {/* Film Switcher */}
        <div className="flex items-center justify-between">
          <span className="font-mono-micro text-[8px] text-white/40 tracking-[0.2em]">
            REEL 0{activeFilmIdx + 1} / 0{FILMS.length}
          </span>
          <div className="flex items-center gap-3">
            <button onClick={handlePrev} aria-label="Prev film" className="touch-target font-mono-micro text-[8px] text-white/40 hover:text-white cursor-pointer transition-colors">←</button>
            {FILMS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilmIdx(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilmIdx === idx ? "w-5 bg-white" : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Select reel ${idx + 1}`}
              />
            ))}
            <button onClick={handleNext} aria-label="Next film" className="touch-target font-mono-micro text-[8px] text-white/40 hover:text-white cursor-pointer transition-colors">→</button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pb-safe shrink-0 py-3 flex justify-between items-center font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10">
        <span>35MM CELLULOID DIGITIZED</span>
        <span className="text-white/60">DIRECTORS CUT</span>
      </div>
    </motion.div>
  );
}
