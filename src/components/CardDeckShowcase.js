"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAudioEngine } from "@/utils/audio";
import DataAnalystModal from "./DataAnalystModal";

export default function CardDeckShowcase({ projects, onSelectProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(true); // true = shows front dossier, false = shows ornate cover
  const [internalModalProject, setInternalModalProject] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  // Take the top 5 high-impact capstone projects
  const showcaseList = (projects || []).slice(0, 5);
  const total = showcaseList.length;

  const playClick = useCallback((type = "clicky") => {
    try {
      const engine = getAudioEngine();
      if (type === "latch") {
        engine.playLatch(true);
      } else {
        engine.playSwitch(type);
      }
    } catch (_) {}
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setIsFlipped(true); // reset to front view for newly entered card
    playClick("latch");
  }, [total, playClick]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setIsFlipped(true); // reset to front view
    playClick("latch");
  }, [total, playClick]);

  const toggleFlip = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setIsFlipped((prev) => !prev);
      playClick("clicky");
    },
    [playClick]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === " " || e.key === "f") {
        setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (total === 0) return null;

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const handleCardAction = (p) => {
    if (onSelectProject) {
      onSelectProject(p);
    } else {
      setInternalModalProject(p);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section className="card-deck-showcase-section cinematic-stage" id="showcase">
      <div className="container">
        {/* Section Header */}
        <div className="deck-section-header">
          <div className="deck-badge-pill">
            <span className="deck-indicator-dot" />
            <span>INTERACTIVE 3D CARD DECK // CAPSTONES</span>
          </div>
          <h2 className="deck-headline">
            FEATURED CASE STUDY DECK
          </h2>
          <p className="deck-subline">
            Cinematic 3D card carousel. Inspect the ornate cover crest, flip the dossier, or explore schemas, models &amp; empirical findings.
          </p>
        </div>

        {/* 3D Card Stage */}
        <div
          className="deck-stage-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="deck-stage">
            {showcaseList.map((p, idx) => {
              let position = "hidden";
              if (idx === activeIndex) position = "center";
              else if (idx === prevIndex) position = "left";
              else if (idx === nextIndex) position = "right";

              if (position === "hidden") return null;

              const isCenter = position === "center";

              return (
                <motion.div
                  key={p.id}
                  className={`deck-card-item deck-card-${position}`}
                  onClick={() => {
                    if (position === "left") handlePrev();
                    else if (position === "right") handleNext();
                    else toggleFlip();
                  }}
                  initial={false}
                  animate={
                    isCenter
                      ? { x: 0, scale: 1, rotateY: 0, opacity: 1, zIndex: 10 }
                      : position === "left"
                      ? { x: "-58%", scale: 0.85, rotateY: 18, opacity: 0.68, zIndex: 5 }
                      : { x: "58%", scale: 0.85, rotateY: -18, opacity: 0.68, zIndex: 5 }
                  }
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                >
                  {/* The 3D Flippable Card Core */}
                  <motion.div
                    className="deck-card-flipper"
                    animate={{
                      rotateY: isCenter ? (isFlipped ? 0 : 180) : 180,
                    }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* ===================================================
                        FACE 1: FRONT (REVEALED DOSSIER CASE STUDY)
                        =================================================== */}
                    <div className="deck-card-face deck-card-face-front">
                      {/* Corner Runes */}
                      <span className="deck-corner-rune rune-tl" />
                      <span className="deck-corner-rune rune-tr" />
                      <span className="deck-corner-rune rune-bl" />
                      <span className="deck-corner-rune rune-br" />

                      {/* Header Strip */}
                      <div className="deck-card-top-bar">
                        <span className="deck-card-serial">
                          0{idx + 1} / 0{total}
                        </span>
                        <span
                          className="deck-card-cat"
                          style={{ background: p.categoryBadgeColor || "var(--yellow)" }}
                        >
                          {p.categoryLabel || p.category}
                        </span>
                      </div>

                      {/* Central Gem Emblem with Aura */}
                      <div className="deck-emblem-wrap">
                        <div className="deck-emblem-gem">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                          </svg>
                        </div>
                        <div className="deck-emblem-glow" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="deck-card-title">{p.title}</h3>
                      <p className="deck-card-desc">
                        {p.subtitle || (p.overview ? p.overview.slice(0, 115) + "..." : "")}
                      </p>

                      {/* Verified Empirical Highlight */}
                      {p.kpis && p.kpis.length > 0 && (
                        <div className="deck-kpi-pill-box">
                          <span className="deck-kpi-highlight-val">
                            {p.kpis[0].value}
                          </span>
                          <span className="deck-kpi-highlight-lbl">
                            {p.kpis[0].label}
                          </span>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="deck-card-actions">
                        <button
                          type="button"
                          className="btn yellow deck-open-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardAction(p);
                          }}
                        >
                          VIEW AUDIT →
                        </button>
                        <button
                          type="button"
                          className="deck-flip-trigger-btn"
                          onClick={toggleFlip}
                          title="Flip card cover"
                        >
                          ↺
                        </button>
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="deck-repo-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub ↗
                        </a>
                      </div>
                    </div>

                    {/* ===================================================
                        FACE 2: BACK (ORNATE RUNE COVER - MATCHING VIDEO)
                        =================================================== */}
                    <div className="deck-card-face deck-card-face-back">
                      {/* Corner Runes */}
                      <span className="deck-corner-rune rune-tl" />
                      <span className="deck-corner-rune rune-tr" />
                      <span className="deck-corner-rune rune-bl" />
                      <span className="deck-corner-rune rune-br" />

                      {/* Monospace Confidential Header */}
                      <div className="deck-back-top-strip">
                        <span className="deck-back-status-dot" />
                        <span className="deck-back-serial">
                          DOSSIER // 0{idx + 1}
                        </span>
                        <span className="deck-back-tag">CONFIDENTIAL</span>
                      </div>

                      {/* Ornate Crest with Crossed Blades & Faceted Crystal Rune */}
                      <div className="deck-crest-stage">
                        <div className="deck-crest-glow" />
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 100 100"
                          fill="none"
                          className="deck-crest-svg"
                          aria-hidden="true"
                        >
                          {/* Outer Ornate Shield */}
                          <path
                            d="M50 10 L82 22 L82 58 C82 74 50 90 50 90 C50 90 18 74 18 58 L18 22 Z"
                            stroke="var(--ink)"
                            strokeWidth="2.5"
                            fill="rgba(0,0,0,0.4)"
                          />
                          {/* Inner Dashed Border */}
                          <path
                            d="M50 16 L76 26 L76 56 C76 68 50 82 50 82 C50 82 24 68 24 56 L24 26 Z"
                            stroke="var(--yellow)"
                            strokeWidth="1.2"
                            strokeDasharray="4 2.5"
                            fill="rgba(250, 204, 21, 0.05)"
                          />
                          {/* Crossed Analytical Quills / Swords */}
                          <line
                            x1="28"
                            y1="28"
                            x2="72"
                            y2="72"
                            stroke="var(--muted)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <line
                            x1="72"
                            y1="28"
                            x2="28"
                            y2="72"
                            stroke="var(--muted)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <circle cx="28" cy="28" r="3" fill="var(--yellow)" />
                          <circle cx="72" cy="28" r="3" fill="var(--yellow)" />
                          <circle cx="28" cy="72" r="3" fill="var(--yellow)" />
                          <circle cx="72" cy="72" r="3" fill="var(--yellow)" />
                          {/* Central Faceted Gem Rune */}
                          <polygon
                            points="50,34 63,45 63,60 50,71 37,60 37,45"
                            fill="var(--yellow)"
                            stroke="#1a1a1a"
                            strokeWidth="1.5"
                          />
                          <line x1="50" y1="34" x2="50" y2="71" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
                          <line x1="37" y1="45" x2="63" y2="60" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
                          <line x1="63" y1="45" x2="37" y2="60" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
                        </svg>
                      </div>

                      {/* Card Identity on Cover */}
                      <div className="deck-back-details">
                        <div className="deck-back-category-label">
                          {p.categoryLabel || p.category}
                        </div>
                        <div className="deck-back-prompt">
                          {isCenter ? "⚡ TAP TO UNLATCH DOSSIER" : "SELECT TO INSPECT"}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Deck Controls (PREVIOUS, Dotted Track, NEXT, Flip Button) */}
        <div className="deck-controls-bar">
          <button
            type="button"
            className="deck-nav-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous card"
          >
            ← PREVIOUS
          </button>

          {/* Dotted / Dashed Progress Indicator */}
          <div className="deck-progress-track">
            {showcaseList.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`deck-dash-pill ${i === activeIndex ? "active" : ""}`}
                onClick={() => {
                  setActiveIndex(i);
                  setIsFlipped(true);
                  playClick("latch");
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="deck-nav-btn next-btn"
            onClick={handleNext}
            aria-label="Next card"
          >
            NEXT →
          </button>

          {/* Flip Toggle Button */}
          <button
            type="button"
            className="deck-nav-btn flip-btn"
            onClick={toggleFlip}
            aria-label="Flip card"
          >
            ↺ {isFlipped ? "COVER" : "DATA"}
          </button>
        </div>
      </div>

      {/* Embedded Deep-Dive Modal if used directly */}
      <DataAnalystModal
        isOpen={Boolean(internalModalProject)}
        onClose={() => setInternalModalProject(null)}
        project={internalModalProject}
      />
    </section>
  );
}
