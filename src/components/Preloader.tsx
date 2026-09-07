"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    // Cinematic 1.6s total preloader duration
    const timer = setTimeout(() => {
      setActive(false);
      if (onComplete) {
        setTimeout(onComplete, 700); // Wait for dissolve animation
      }
    }, 1600);

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
          className="fixed inset-0 w-screen h-[100dvh] bg-[#050505] z-[999999] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          <div className="flex flex-col items-center justify-center text-center gap-4 px-6">
            {/* Centered MONSTERVILLE Wordmark */}
            <motion.h1
              initial={{ opacity: 0.05, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-display tracking-tight text-[#F5F5F5]"
            >
              MONSTERVILLE
            </motion.h1>

            {/* Below it, extremely small: ENTERING THE TOWN */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="text-[10px] sm:text-[11px] font-mono-micro text-[#EDEDED] tracking-[0.38em]"
            >
              ENTERING THE TOWN
            </motion.p>

            {/* Very thin loading indicator */}
            <div className="w-36 sm:w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                className="w-full h-full bg-white/90"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
