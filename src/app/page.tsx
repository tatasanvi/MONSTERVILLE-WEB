"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import Preloader from "@/components/Preloader";
import EmblemButton from "@/components/EmblemButton";
import NavigationPortal from "@/components/NavigationPortal";
import HubHero from "@/components/HubHero";

import WorldView from "@/components/WorldView";
import BobinoView from "@/components/BobinoView";
import MusicView from "@/components/MusicView";
import CinemaView from "@/components/CinemaView";
import SpaceView from "@/components/SpaceView";
import ShopView from "@/components/ShopView";
import ContactView from "@/components/ContactView";

import VideoModal from "@/components/VideoModal";
import CustomCursor from "@/components/CustomCursor";

type WorldKey = "hub" | "world" | "bobino" | "music" | "visuals" | "space" | "shop" | "contact";

export default function Home() {
  const [currentWorld, setCurrentWorld] = useState<WorldKey>("hub");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string | null>(null);

  // Web Audio Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const musicOscRef = useRef<OscillatorNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const toggleAudio = useCallback(() => {
    const ctx = getAudioContext();
    if (!audioActive) {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(55, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        ambientOscRef.current = osc;
        ambientGainRef.current = gain;
        setAudioActive(true);
      } catch (e) {
        console.error("Audio init error:", e);
      }
    } else {
      if (ambientGainRef.current && ambientOscRef.current) {
        try {
          ambientGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
          setTimeout(() => {
            ambientOscRef.current?.stop();
            ambientOscRef.current?.disconnect();
          }, 850);
        } catch (e) {
          console.error(e);
        }
      }
      setAudioActive(false);
    }
  }, [audioActive, getAudioContext]);

  const toggleMusicAudio = useCallback(() => {
    const ctx = getAudioContext();
    if (!isMusicPlaying) {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(138.59, ctx.currentTime); // C#3

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        musicOscRef.current = osc;
        musicGainRef.current = gain;
        setIsMusicPlaying(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      if (musicGainRef.current && musicOscRef.current) {
        try {
          musicGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
          setTimeout(() => {
            musicOscRef.current?.stop();
            musicOscRef.current?.disconnect();
          }, 550);
        } catch (e) {
          console.error(e);
        }
      }
      setIsMusicPlaying(false);
    }
  }, [isMusicPlaying, getAudioContext]);

  const handlePlaySpaceTone = useCallback(
    (freq: number) => {
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.6);
      } catch (e) {
        console.error(e);
      }
    },
    [getAudioContext]
  );

  return (
    <main className="fixed inset-0 w-full h-[100svh] overflow-hidden bg-[#050505] text-[#F5F5F5] select-none">
      {/* 1.5s Cinematic Preloader */}
      <Preloader />

      {/* Spring Custom Cursor (Desktop fine pointers only) */}
      <CustomCursor />

      {/* Dynamic World Rendering (Strict 100svh, zero scroll) */}
      <AnimatePresence mode="wait">
        {currentWorld === "hub" && (
          <HubHero
            key="hub"
            onSelectWorld={(worldId) => setCurrentWorld(worldId as WorldKey)}
          />
        )}

        {currentWorld === "world" && (
          <WorldView
            key="world"
            onBack={() => setCurrentWorld("hub")}
          />
        )}

        {currentWorld === "bobino" && (
          <BobinoView
            key="bobino"
            onBack={() => setCurrentWorld("hub")}
            onSelectWorld={(worldId) => setCurrentWorld(worldId as WorldKey)}
          />
        )}

        {currentWorld === "music" && (
          <MusicView
            key="music"
            onBack={() => setCurrentWorld("hub")}
            onPlayAudio={toggleMusicAudio}
            onOpenFilm={() => setActiveVideoTitle("NEW RELEASE // THE FILM")}
            isPlaying={isMusicPlaying}
          />
        )}

        {currentWorld === "visuals" && (
          <CinemaView
            key="visuals"
            onBack={() => setCurrentWorld("hub")}
            onOpenFilm={(title) => setActiveVideoTitle(title)}
          />
        )}

        {currentWorld === "space" && (
          <SpaceView
            key="space"
            onBack={() => setCurrentWorld("hub")}
            onPlayTone={handlePlaySpaceTone}
          />
        )}

        {currentWorld === "shop" && (
          <ShopView
            key="shop"
            onBack={() => setCurrentWorld("hub")}
          />
        )}

        {currentWorld === "contact" && (
          <ContactView
            key="contact"
            onBack={() => setCurrentWorld("hub")}
          />
        )}
      </AnimatePresence>

      {/* Iconic Bottom-Center Emblem Button (Travis Scott Style) */}
      <EmblemButton
        isOpen={isNavOpen}
        onClick={() => setIsNavOpen((prev) => !prev)}
      />

      {/* Fullscreen Navigation Portal */}
      <NavigationPortal
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onSelectWorld={(worldId) => {
          setCurrentWorld(worldId as WorldKey);
          setIsNavOpen(false);
        }}
        audioActive={audioActive}
        onToggleAudio={toggleAudio}
      />

      {/* Video Cinema Modal */}
      <VideoModal
        isOpen={!!activeVideoTitle}
        onClose={() => setActiveVideoTitle(null)}
        title={activeVideoTitle || ""}
      />
    </main>
  );
}
