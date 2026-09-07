"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

export default function MusicView({
  onBack,
  onPlayAudio,
  onOpenFilm,
  isPlaying,
}: MusicViewProps) {
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const track = TRACKS[activeTrackIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100dvh] bg-[#050505] flex flex-col justify-between p-5 sm:p-10 select-none overflow-hidden"
    >
      {/* Background Mood Visual */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div
          className="w-full h-full bg-cover bg-center blur-2xl scale-110"
          style={{ backgroundImage: `url('${track.image}')` }}
        />
        <div className="absolute inset-0 bg-[#050505]/85" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-safe flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full animate-pulse" />
          <span className="tracking-[0.3em]">CHAPTER 02 // MUSIC RELEASES</span>
        </div>

        <button
          onClick={onBack}
          className="text-white hover:text-white/70 px-3.5 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.25em]"
        >
          [ HUB ✕ ]
        </button>
      </div>

      {/* Center Vinyl Artwork & Controls */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg mx-auto my-auto flex flex-col items-center text-center gap-3 sm:gap-5 py-2">
        
        {/* Title */}
        <div className="flex flex-col items-center">
          <span className="font-mono-micro text-[8px] sm:text-[9px] text-white/40 tracking-[0.35em] mb-1">
            {track.subtitle}
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight leading-none">
            {track.title}
          </h2>
        </div>

        {/* Square Album Art Card */}
        <div className="relative w-44 xs:w-56 sm:w-72 aspect-square rounded-[4px] overflow-hidden bg-[#0A0A0A] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
          <motion.div
            key={track.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${track.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Waveform Equalizer when playing */}
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center gap-1.5">
              {[40, 80, 55, 95, 65, 85, 45].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.35}%`] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.08,
                    ease: "easeInOut",
                  }}
                  className="w-1 bg-white rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* Track Metadata */}
        <span className="font-mono-micro text-[8px] sm:text-[9px] text-white/40 tracking-[0.3em]">
          {track.meta}
        </span>

        {/* Thumb-friendly Action Buttons */}
        <div className="flex flex-col xs:flex-row items-center gap-3 w-full max-w-xs font-mono-micro text-[10px]">
          <button
            onClick={onPlayAudio}
            className={`w-full py-3 px-5 border transition-all duration-300 tracking-[0.25em] flex items-center justify-center gap-2 cursor-pointer ${
              isPlaying
                ? "bg-white text-black border-white font-bold"
                : "bg-white/10 hover:bg-white/20 text-white border-white/20"
            }`}
          >
            <span>{isPlaying ? "PAUSE AUDIO" : "PLAY AUDIO"}</span>
            <span>{isPlaying ? "❚❚" : "▶"}</span>
          </button>

          <button
            onClick={onOpenFilm}
            className="w-full py-3 px-5 border border-white/20 hover:border-white text-white/80 hover:text-white bg-black/50 tracking-[0.25em] transition-all cursor-pointer"
          >
            WATCH FILM
          </button>
        </div>

        {/* Track Switcher Dots */}
        <div className="flex items-center gap-2 pt-1">
          {TRACKS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTrackIdx(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeTrackIdx === idx ? "w-6 bg-white" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Select track ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Coordinates */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pb-safe flex justify-between items-end font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10 pt-4">
        <span>AUDIO STREAM: 24-BIT / 96KHZ</span>
        <span className="text-white/60">SUB-BASS EQUIPPED</span>
      </div>
    </motion.div>
  );
}
