"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface MusicViewProps {
  onBack: () => void;
  onPlayAudio: () => void;
  onOpenFilm: () => void;
  isPlaying: boolean;
}

const TRACKS = [
  {
    id: "destiny",
    title: "DESTINY",
    subtitle: "FEAT. A24 SOUND ARCHIVE",
    runtime: "03:48",
    image: "/assets/music/destiny_artwork.jpg",
    meta: "138 BPM // F-MIN // SUB-BASS",
  },
  {
    id: "utopia-echo",
    title: "UTOPIA ARCHIVE",
    subtitle: "MIDNIGHT SESSIONS // VOL 1",
    runtime: "04:12",
    image: "/assets/world/monolith.jpg",
    meta: "140 BPM // C#-MIN // ANALOG SYNTH",
  },
  {
    id: "night-runner",
    title: "NIGHT RUNNER",
    subtitle: "LIVE TRANSMISSION 2026",
    runtime: "02:56",
    image: "/assets/visuals/visual_film_still.jpg",
    meta: "128 BPM // A-MIN // PERCUSSION",
  },
];

const SWIPE_THRESHOLD = 55;

export default function MusicView({
  onBack,
  onPlayAudio,
  onOpenFilm,
  isPlaying,
}: MusicViewProps) {
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const isDragging = useRef(false);
  const track = TRACKS[activeTrackIdx];

  const handleNext = () =>
    setActiveTrackIdx((prev) => (prev + 1) % TRACKS.length);
  const handlePrev = () =>
    setActiveTrackIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    isDragging.current = false;
    if (info.offset.x < -SWIPE_THRESHOLD) handleNext();
    else if (info.offset.x > SWIPE_THRESHOLD) handlePrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100svh] bg-[#050505] flex flex-col select-none overflow-hidden"
    >
      {/* Background Mood — blurred artwork */}
      <div className="absolute inset-0 pointer-events-none opacity-25" aria-hidden>
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${track.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full bg-cover bg-center blur-2xl scale-110"
            style={{ backgroundImage: `url('${track.image}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#050505]/85" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pt-safe shrink-0 py-3 sm:py-4 flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[#FF5A1F] animate-pulse" : "bg-white/40"}`} aria-hidden />
          <span className="tracking-[0.3em]">CHAPTER 03 // MUSIC</span>
        </div>
        <button
          onClick={onBack}
          className="touch-target text-white hover:text-white/70 px-3 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.2em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center — flex-1 ensures it uses all remaining height */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-10 gap-2 sm:gap-4 min-h-0">

        {/* Track Title */}
        <div className="flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={`sub-${track.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="font-mono-micro text-white mb-1"
              style={{ fontSize: "clamp(7px, 2vw, 9px)", letterSpacing: "0.35em" }}
            >
              {track.subtitle}
            </motion.span>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.h2
              key={`title-${track.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="font-display text-white tracking-tight leading-none"
              style={{ fontSize: "clamp(32px, 10vw, 64px)" }}
            >
              {track.title}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Draggable Album Art Card */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.97 }}
          style={{
            width: "min(62vw, 36svh, 280px)",
            aspectRatio: "1/1",
            touchAction: "pan-y",
          }}
          className="relative rounded-[4px] overflow-hidden bg-[#0A0A0A] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={track.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${track.image}')` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Playing equalizer overlay */}
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center gap-1.5">
              {[40, 80, 55, 95, 65, 85, 45].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.35}%`] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
                  className="w-1 bg-white rounded-full"
                />
              ))}
            </div>
          )}

          {/* Runtime badge */}
          <div className="absolute bottom-2 right-3 font-mono-micro text-[7px] text-white/60">
            {track.runtime}
          </div>
        </motion.div>

        {/* Track Metadata */}
        <span
          className="font-mono-micro text-white/40 text-center"
          style={{ fontSize: "clamp(7px, 2vw, 9px)", letterSpacing: "0.3em" }}
        >
          {track.meta}
        </span>

        {/* Action Buttons */}
        <div className="flex items-stretch gap-2 w-full max-w-[280px] font-mono-micro text-[9px] sm:text-[10px]">
          <button
            onClick={onPlayAudio}
            className={`flex-1 min-h-[48px] px-4 border transition-all duration-300 tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer ${
              isPlaying
                ? "bg-white text-black border-white font-bold"
                : "bg-white/10 hover:bg-white/20 text-white border-white/20"
            }`}
          >
            <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
            <span>{isPlaying ? "❚❚" : "▶"}</span>
          </button>
          <button
            onClick={onOpenFilm}
            className="flex-1 min-h-[48px] px-4 border border-white/20 hover:border-white text-white/80 hover:text-white bg-black/50 tracking-[0.2em] transition-all cursor-pointer"
          >
            WATCH
          </button>
        </div>

        {/* Track Switcher Dots */}
        <div className="flex items-center gap-3" role="tablist" aria-label="Tracks">
          <button onClick={handlePrev} aria-label="Prev track" className="touch-target font-mono-micro text-[8px] text-white/40 hover:text-white transition-colors cursor-pointer">←</button>
          {TRACKS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTrackIdx(idx)}
              role="tab"
              aria-selected={activeTrackIdx === idx}
              aria-label={TRACKS[idx].title}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeTrackIdx === idx ? "w-5 bg-white" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
          <button onClick={handleNext} aria-label="Next track" className="touch-target font-mono-micro text-[8px] text-white/40 hover:text-white transition-colors cursor-pointer">→</button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pb-safe shrink-0 py-3 flex justify-between items-center font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10">
        <span>AUDIO: 24-BIT / 96KHZ</span>
        <span className="text-white/60">SUB-BASS EQUIPPED</span>
      </div>
    </motion.div>
  );
}
