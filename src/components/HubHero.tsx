"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  PanInfo,
} from "framer-motion";

interface HubSpotlight {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
}

const SPOTLIGHTS: HubSpotlight[] = [
  {
    id: "shop",
    title: "STORE",
    subtitle: "WORLDWIDE GARMENTS // EDITION 2026",
    category: "STORE",
    image: "/assets/shop/worldwide_tee.jpg",
  },
  {
    id: "music",
    title: "NEW RELEASE",
    subtitle: "A24 SOUND ARCHIVE // TRANSMISSION",
    category: "ALBUM",
    image: "/assets/music/destiny_artwork.jpg",
  },
  {
    id: "visuals",
    title: "CREATOR STUDIOS",
    subtitle: "35MM ANAMORPHIC FOOTAGE // RAW MASTER",
    category: "CREATOR STUDIOS",
    image: "/assets/visuals/visual_film_still.jpg",
  },
  {
    id: "world",
    title: "MONSTERVILLE MAGAZINE",
    subtitle: "EDITORIAL & NOCTURNAL ARCHITECTURE",
    category: "MAGAZINE",
    image: "/assets/world/monolith.jpg",
  },
  {
    id: "space",
    title: "SPACE ACADEMY",
    subtitle: "AUDIOVISUAL DIMENSION // 432HZ",
    category: "SPACE ACADEMY",
    image: "/assets/space/space_dimension.jpg",
  },
];

// Swipe threshold: how many px to drag before advancing
const SWIPE_THRESHOLD = 60;

interface HubHeroProps {
  onSelectWorld: (worldId: string) => void;
}

export default function HubHero({ onSelectWorld }: HubHeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const spotlight = SPOTLIGHTS[activeIdx];
  const isDragging = useRef(false);

  // Hide swipe hint after 2.5s
  useEffect(() => {
    const t = setTimeout(() => setShowSwipeHint(false), 2500);
    return () => clearTimeout(t);
  }, []);

  // 3D Mouse Parallax — desktop only (pointer: fine)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 180, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return; // skip on touch devices

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const handleNext = () =>
    setActiveIdx((prev) => (prev + 1) % SPOTLIGHTS.length);
  const handlePrev = () =>
    setActiveIdx((prev) => (prev - 1 + SPOTLIGHTS.length) % SPOTLIGHTS.length);

  // Drag/swipe handler on the card
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    isDragging.current = false;
    const { offset } = info;
    if (offset.x < -SWIPE_THRESHOLD) {
      handleNext();
    } else if (offset.x > SWIPE_THRESHOLD) {
      handlePrev();
    }
  };

  const handleCardClick = () => {
    // Don't register click if user was dragging
    if (!isDragging.current) {
      onSelectWorld(spotlight.id);
    }
  };

  return (
    <div className="relative w-full h-[100svh] flex flex-col select-none overflow-hidden bg-[#050505]">

      {/* Top Header */}
      <div className="relative z-10 w-full px-5 sm:px-8 pt-safe shrink-0 flex justify-between items-center font-mono-micro text-white/50 py-3 sm:py-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full" aria-hidden />
          <span className="tracking-[0.3em] text-white/80 font-bold text-[9px] sm:text-[10px]">
            MONSTERVILLE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="tracking-[0.2em] text-white/40 text-[9px] hidden xs:inline">
            {activeIdx + 1} / {SPOTLIGHTS.length}
          </span>
          <span className="px-2 py-0.5 border border-white/15 text-white/60 bg-black/40 text-[9px]">
            {spotlight.category}
          </span>
        </div>
      </div>

      {/* Center: 3D Draggable Art Card */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 min-h-0">
        
        {/* Drag / Perspective wrapper */}
        <div className="perspective-[1200px] flex items-center justify-center w-full">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={handleDragEnd}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              width: "min(68vw, 38svh, 320px)",
              aspectRatio: "1 / 1",
              touchAction: "pan-y", // allow vertical scroll, capture horizontal drag
            }}
            onClick={handleCardClick}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer group relative rounded-[5px] overflow-hidden bg-[#080808] border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.95)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={spotlight.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${spotlight.image}')` }}
              />
            </AnimatePresence>

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

            {/* Transmission badge */}
            <div className="absolute top-3 left-3 font-mono-micro text-[7px] text-white/60 px-1.5 py-0.5 bg-black/70 backdrop-blur-md border border-white/10">
              0{activeIdx + 1} // TRANSMISSION
            </div>

            {/* Hover / Tap Prompt */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
              <span className="font-mono-micro text-[10px] text-white tracking-[0.3em] px-4 py-2 border border-white bg-black/60">
                ENTER WORLD →
              </span>
            </div>

            {/* Swipe hint — visible for 2.5s on first load */}
            <AnimatePresence>
              {showSwipeHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none"
                >
                  <span className="font-mono-micro text-[8px] text-white/60 tracking-[0.3em]">
                    ← SWIPE →
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Title Below Card */}
        <div
          onClick={handleCardClick}
          className="mt-3 sm:mt-5 flex flex-col items-center text-center cursor-pointer group"
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={`title-${spotlight.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="font-display text-white group-hover:text-white/80 transition-colors tracking-tight"
              style={{ fontSize: "clamp(20px, 6.8vw, 60px)" }}
            >
              {spotlight.title}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${spotlight.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="font-mono-micro text-white mt-1"
              style={{ fontSize: "clamp(7px, 2vw, 10px)", letterSpacing: "0.3em" }}
            >
              {spotlight.subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Prev / Dots / Next — 44px touch targets */}
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="touch-target font-mono-micro text-[9px] text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            ← PREV
          </button>

          <div className="flex gap-2 items-center" role="tablist" aria-label="Spotlights">
            {SPOTLIGHTS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                role="tab"
                aria-selected={activeIdx === i}
                aria-label={s.title}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIdx === i ? "w-5 bg-white" : "w-1.5 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next"
            className="touch-target font-mono-micro text-[9px] text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* Bottom clearance for floating emblem button */}
      <div className="h-[72px] shrink-0" />
    </div>
  );
}
