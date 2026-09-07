"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lag physics
  const springX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    // Only enable on desktop pointer:fine devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const label = cursorTarget.getAttribute("data-cursor") || "";
        setCursorLabel(label);
        setIsHovered(true);
        return;
      }

      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button";

      if (isClickable) {
        setCursorLabel("");
        setIsHovered(true);
      } else {
        setCursorLabel("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Follower / Pill with Context Label */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center overflow-hidden transition-colors duration-200"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: cursorLabel ? 64 : isHovered ? 36 : 8,
          height: cursorLabel ? 64 : isHovered ? 36 : 8,
          backgroundColor: cursorLabel
            ? "rgba(245, 245, 245, 0.95)"
            : isHovered
            ? "rgba(245, 245, 245, 0)"
            : "rgba(245, 245, 245, 0.9)",
          border: isHovered && !cursorLabel ? "1px solid rgba(255, 255, 255, 0.65)" : "none",
          backdropFilter: cursorLabel ? "blur(4px)" : "none",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      >
        {cursorLabel && (
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#050505] uppercase select-none">
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* Center Micro Dot (instant tracking) */}
      {!cursorLabel && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          style={{
            x: mouseX,
            y: mouseY,
          }}
        />
      )}
    </>
  );
}
