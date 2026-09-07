"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HubSpotlight {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  ctaText: string;
}

const SPOTLIGHTS: HubSpotlight[] = [
  {
    id: "shop",
    title: "SHOP",
    subtitle: "WORLDWIDE GARMENTS // EDITION 2026",
    category: "BOUTIQUE",
    image: "/assets/shop/worldwide_tee.jpg",
    ctaText: "EXPLORE COLLECTION",
  },
  {
    id: "music",
    title: "DESTINY",
    subtitle: "THE NEW RELEASE // A24 SOUND ARCHIVE",
    category: "ALBUM",
    image: "/assets/music/destiny_artwork.jpg",
    ctaText: "LISTEN & IMMERSE",
  },
  {
    id: "visuals",
    title: "CINEMA",
    subtitle: "35MM ANAMORPHIC FOOTAGE // RAW MASTER",
    category: "FILM ARCHIVE",
    image: "/assets/visuals/visual_film_still.jpg",
    ctaText: "WATCH FILM",
  },
  {
    id: "world",
    title: "THE WORLD",
    subtitle: "NOCTURNAL ARCHITECTURE // SECTOR 0",
    category: "ORIGIN",
    image: "/assets/world/monolith.jpg",
    ctaText: "ENTER MONSTERVILLE",
  },
  {
    id: "space",
    title: "SPACE",
    subtitle: "AUDIOVISUAL DIMENSION // 432HZ",
    category: "PARALLEL REALITY",
    image: "/assets/space/space_dimension.jpg",
    ctaText: "ENTER DIMENSION",
  },
];

interface HubHeroProps {
  onSelectWorld: (worldId: string) => void;
}

export default function HubHero({ onSelectWorld }: HubHeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const spotlight = SPOTLIGHTS[activeIdx];

  // 3D Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 180, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % SPOTLIGHTS.length);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + SPOTLIGHTS.length) % SPOTLIGHTS.length);

  return (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-between p-5 sm:p-8 select-none overflow-hidden bg-[#050505]">
      
      {/* Top Header Information */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-safe flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
          <span className="tracking-[0.3em] text-white/80 font-bold">MONSTERVILLE</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="tracking-[0.25em] text-white/40 hidden xs:inline">
            SECTOR {activeIdx + 1} / {SPOTLIGHTS.length}
          </span>
          <span className="px-2 py-0.5 border border-white/15 text-white/60 bg-black/40">
            {spotlight.category}
          </span>
        </div>
      </div>

      {/* Center 3D Perspective Art Card (Exact Travis Scott Framing) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center">
        
        {/* Perspective Container */}
        <div className="perspective-[1200px] flex items-center justify-center w-full">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onClick={() => onSelectWorld(spotlight.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer group relative w-[min(84vw,40dvh)] sm:w-[min(100%,46dvh,480px)] aspect-square rounded-[6px] overflow-hidden bg-[#080808] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={spotlight.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${spotlight.image}')` }}
              />
            </AnimatePresence>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

            {/* Micro badge inside card */}
            <div className="absolute top-3 left-3 font-mono-micro text-[8px] text-white/60 px-2 py-0.5 bg-black/70 backdrop-blur-md border border-white/10">
              0{activeIdx + 1} // TRANSMISSION
            </div>

            {/* Hover/Tap Prompt */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
              <span className="font-mono-micro text-xs text-white tracking-[0.35em] px-4 py-2 border border-white bg-black/60">
                ENTER WORLD →
              </span>
            </div>
          </motion.div>
        </div>

        {/* Title Below Card (Cinematic Shuffle Display) */}
        <div
          onClick={() => onSelectWorld(spotlight.id)}
          className="mt-5 sm:mt-8 flex flex-col items-center text-center cursor-pointer group"
        >
          <motion.h2
            key={spotlight.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none group-hover:text-white/80 transition-colors"
          >
            {spotlight.title}
          </motion.h2>

          <motion.p
            key={spotlight.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-mono-micro text-[9px] sm:text-[10px] text-white tracking-[0.35em] mt-2"
          >
            {spotlight.subtitle}
          </motion.p>
        </div>

        {/* Spotlight Navigation Switchers (Left & Right chevrons) */}
        <div className="flex items-center gap-6 mt-4 font-mono-micro text-[10px] text-white/40">
          <button
            onClick={handlePrev}
            className="hover:text-white transition-colors cursor-pointer px-2 py-1"
            aria-label="Previous Spotlight"
          >
            ← PREV
          </button>

          <div className="flex gap-2">
            {SPOTLIGHTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIdx === i ? "w-6 bg-white" : "w-1.5 bg-white/20 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="hover:text-white transition-colors cursor-pointer px-2 py-1"
            aria-label="Next Spotlight"
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* Bottom Clearance Space (for the floating Emblem button) */}
      <div className="w-full h-20 shrink-0" />
    </div>
  );
}
