"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
      if (onComplete) {
        setTimeout(onComplete, 700);
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(16px)",
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 w-full h-[100svh] bg-[#050505] z-[999999] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Film grain scanline */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />

          <div className="relative flex flex-col items-center justify-center text-center gap-3 px-6 w-full max-w-[min(90vw,480px)]">
            {/* Centered MONSTERVILLE Wordmark */}
            <motion.div
              initial={{ opacity: 0.03, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-white tracking-tight"
              style={{ fontSize: "clamp(28px, 10vw, 72px)" }}
            >
              MONSTERVILLE
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="font-mono-micro text-[#EDEDED]"
              style={{ fontSize: "clamp(8px, 2.2vw, 11px)", letterSpacing: "0.38em" }}
            >
              ENTERING THE TOWN
            </motion.p>

            {/* Thin progress bar */}
            <div className="w-32 sm:w-44 h-px bg-white/10 mt-4 relative overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                className="w-full h-full bg-white/85"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
