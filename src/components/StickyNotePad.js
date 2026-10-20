"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAudioEngine } from "../utils/audio";

const STICKY_COLORS = ["yellow", "pink", "green", "blue", "purple", "orange"];

const FUNNY_NOTES = [
  "sheet #1 🗒️",
  "sheet #2 🗒️ (fresh!)",
  "sheet #3 ✨ (infinite pad!)",
  "sheet #4 ✂️ (keep peeling!)",
  "sheet #5 🎨 (graphite proof!)",
  "sheet #6 🚀 (recruiter edition!)",
  "sheet #7 📌 (pad never ends!)",
  "sheet #8 🌟 (legendary!)",
];

export function Pushpin({ color = "#e03131", className = "" }) {
  return (
    <div className={`sticky-pushpin-wrap ${className}`} aria-hidden="true">
      <svg
        className="sticky-pushpin-svg"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="14" cy="28" rx="7.5" ry="2.8" fill="rgba(0,0,0,0.22)" />
        <polygon points="15,16 17,16 14,27 13,27" fill="#888" stroke="#333" strokeWidth="0.8" />
        <polygon points="14,16 15,16 13,27" fill="#ccc" />
        <ellipse cx="16" cy="16" rx="8" ry="3.5" fill="#222" />
        <ellipse cx="16" cy="15.5" rx="7.5" ry="3" fill={color} />
        <path
          d="M10 15 C10 11, 12 9, 13 8 L19 8 C20 9, 22 11, 22 15 Z"
          fill={color}
          stroke="#1a1a1a"
          strokeWidth="1.2"
        />
        <ellipse cx="16" cy="8" rx="5.5" ry="2.2" fill="#fff" fillOpacity="0.4" />
        <ellipse cx="16" cy="7.5" rx="5" ry="2" fill={color} stroke="#1a1a1a" strokeWidth="1" />
        <path d="M13 9 Q14 13 14 15" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
      </svg>
    </div>
  );
}

export default function StickyNotePad({
  children,
  color,
  colorIndex = 0,
  pinned = false,
  pinColor = "#e03131",
  className = "",
  style = {},
}) {
  const chosenColor = color || STICKY_COLORS[colorIndex % STICKY_COLORS.length];
  const [peelCount, setPeelCount] = useState(0);
  const [isPeeling, setIsPeeling] = useState(false);
  const [popText, setPopText] = useState(null);
  const padRef = useRef(null);

  const handlePeel = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isPeeling) return;

    // Trigger multi-stage realistic paper peel audio
    try {
      getAudioEngine().playPaperPeel();
    } catch (_) {}

    setIsPeeling(true);
    const nextCount = peelCount + 1;
    setPeelCount(nextCount);

    const funnyPops = [
      "*RIIIP!* ✂️",
      "*PEELED!* 📄",
      "*FRESH SHEET!* ✨",
      "*POST-IT!* 📌",
      "*CRACKLE!* 🗒️",
      "*INFINITE PAD!* ∞",
    ];
    setPopText(funnyPops[(nextCount - 1) % funnyPops.length]);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio:peel", { detail: { count: nextCount } }));
    }

    // Duration of multi-stage paper curl & air flutter
    setTimeout(() => {
      setIsPeeling(false);
    }, 850);

    setTimeout(() => {
      setPopText(null);
    }, 1400);
  }, [isPeeling, peelCount]);

  const sheetBadgeText = peelCount > 0
    ? FUNNY_NOTES[Math.min(peelCount, FUNNY_NOTES.length - 1)]
    : null;

  return (
    <div
      ref={padRef}
      className={`sticky-note-pad sticky-color-${chosenColor} ${pinned ? "pad-pinned" : ""} ${className}`}
      style={style}
    >
      {/* 3D Stack Base Paper Layers underneath */}
      <div className="sticky-pad-layer layer-bottom" aria-hidden="true" />
      <div className="sticky-pad-layer layer-middle" aria-hidden="true" />

      {/* Realistic Top Adhesive Glue Strip */}
      <div className="sticky-glue-strip" aria-hidden="true">
        <span className="glue-sheen" />
      </div>

      {/* 3D Pushpin on pinned items */}
      {pinned && <Pushpin color={pinColor} className="sticky-corner-pin" />}

      {/* Top Peel Pull-Tab */}
      <button
        type="button"
        className="sticky-peel-tab"
        onClick={handlePeel}
        title="Peel sticky note (infinite pad: fresh sheet regenerates underneath!)"
        aria-label="Tear off sticky note sheet"
      >
        <span className="peel-tab-icon">✂</span>
        <span className="peel-tab-label">PEEL SHEET</span>
      </button>

      {/* The Active Note Sheet (always present, reacts with bouncy settle when peeled) */}
      <motion.div
        className="sticky-note-sheet"
        animate={isPeeling ? {
          scale: [0.94, 1.03, 0.99, 1],
          y: [10, -3, 1, 0],
          rotate: [0.6, -0.4, 0.2, 0],
        } : { scale: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.24 }}
      >
        {/* Ruled / scratchbook background lines watermark */}
        <div className="sticky-sheet-watermark" aria-hidden="true" />

        {/* Counter Badge if peeled */}
        {sheetBadgeText && (
          <span className="sticky-sheet-counter">
            {sheetBadgeText}
          </span>
        )}

        {/* Card Content (Cert, Project, or Education) */}
        <div className="sticky-sheet-content">
          {children}
        </div>

        {/* Dynamic 3D Rolling Shadow when peeling */}
        {isPeeling && <div className="peel-dynamic-roll-shadow" aria-hidden="true" />}

        {/* Interactive Bottom-Right Dog-Eared 3D Peel Corner */}
        <button
          type="button"
          className="sticky-peel-corner"
          onClick={handlePeel}
          title="Peel sheet off infinite pad (3D paper curl) ✂"
          aria-label="Peel sheet off infinite pad"
        >
          {/* Triangular cutout recess pocket behind the folded flap */}
          <span className="peel-dogear-pocket" aria-hidden="true" />
          {/* Curled flap with 3D cylindrical lighting */}
          <span className="peel-dogear-flap" aria-hidden="true">
            <span className="peel-dogear-cyl-highlight" />
            <span className="peel-dogear-crease-shadow" />
          </span>
          <span className="peel-dogear-label">peel ✂</span>
        </button>
      </motion.div>

      {/* HYPER-REALISTIC 3D PEELING SHEET SIMULATION */}
      <AnimatePresence>
        {isPeeling && (
          <motion.div
            key={`flying-sheet-${peelCount}`}
            className="sticky-note-flying-sheet"
            initial={{
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
              y: 0,
              x: 0,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              // Multi-stage physics:
              // 1. Bottom edge curls up toward camera (rotateX -85deg)
              // 2. Adhesive releases top edge with snap (y: -40px)
              // 3. Air flutter & gravity tumble (rotateZ 35deg, y 260px)
              rotateX: [0, -85, -55, 45, 80],
              rotateY: [0, 8, -14, 18, 28],
              rotateZ: [0, -6, -16, 22, 38],
              y: [0, -18, -48, 85, 270],
              x: [0, 10, 28, 75, 150],
              scale: [1, 0.98, 0.95, 0.88, 0.76],
              opacity: [1, 1, 1, 0.85, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.82,
              times: [0, 0.28, 0.52, 0.78, 1],
              ease: "easeInOut",
            }}
            aria-hidden="true"
          >
            {/* Front Face with Curled Highlight */}
            <div className="flying-sheet-face face-front">
              <div className="flying-glue-peel" />
              <div className="flying-sheet-ghost-content" />
              {/* Cylindrical paper roll highlight band */}
              <div className="flying-cylindrical-shine" />
            </div>

            {/* Realistic 3D Paper Backface (Underside of note!) */}
            <div className="flying-sheet-face face-back">
              <div className="backface-paper-texture" />
              <div className="backface-adhesive-strip" />
              <div className="backface-curl-crease-shadow" />
              <div className="backface-pencil-stamp">
                <span>POST-IT • RETRO PAD</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comic Sound Doodle Pop on Peel */}
      <AnimatePresence>
        {popText && (
          <motion.span
            className="sticky-peel-comic-pop"
            initial={{ opacity: 0, scale: 0.5, y: 15, rotate: -8 }}
            animate={{ opacity: 1, scale: 1.18, y: -20, rotate: 5 }}
            exit={{ opacity: 0, scale: 0.7, y: -36 }}
            transition={{ duration: 0.32, type: "spring", stiffness: 420 }}
            aria-hidden="true"
          >
            {popText}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
