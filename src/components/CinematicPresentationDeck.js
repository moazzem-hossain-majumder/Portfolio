"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAudioEngine } from "@/utils/audio";

const BACKGROUND_PRESETS = {
  home: {
    // Slide 1: Warm Twilight Sunset / Pagoda Dusk Horizon
    gradient:
      "radial-gradient(ellipse 95% 65% at 50% -5%, rgba(245, 158, 11, 0.26), rgba(244, 63, 94, 0.15) 42%, rgba(168, 85, 247, 0.10) 68%, transparent 92%)",
    ambientColor: "rgba(245, 158, 11, 0.06)",
  },
  strategy: {
    // Slide 2: Candlelit Tatami Chamber / Warm Mahogany Hearth
    gradient:
      "radial-gradient(circle 750px at 80% 62%, rgba(251, 146, 60, 0.28), rgba(217, 119, 6, 0.18) 38%, rgba(120, 53, 15, 0.09) 65%, transparent 88%), radial-gradient(circle 500px at 15% 30%, rgba(168, 85, 247, 0.12), transparent 75%)",
    ambientColor: "rgba(251, 146, 60, 0.07)",
  },
  console: {
    // Slide Console: Tactical Cyber Blue & Violet Terminal
    gradient:
      "radial-gradient(circle 700px at 50% 55%, rgba(116, 192, 252, 0.22), rgba(168, 85, 247, 0.14) 45%, rgba(250, 204, 21, 0.09) 75%, transparent 92%)",
    ambientColor: "rgba(116, 192, 252, 0.06)",
  },
  showcase: {
    // Slide 3: Cosmic Twilight Arena / Pulsing Golden Rune Gem Core
    gradient:
      "radial-gradient(circle 700px at 50% 50%, rgba(250, 204, 21, 0.28), rgba(168, 85, 247, 0.20) 45%, rgba(59, 130, 246, 0.10) 75%, transparent 95%)",
    ambientColor: "rgba(168, 85, 247, 0.08)",
  },
  flagship: {
    // Slide 4: Midnight Lantern & Emerald Reconciliation Monitor
    gradient:
      "radial-gradient(circle 700px at 75% 50%, rgba(250, 204, 21, 0.24), rgba(16, 185, 129, 0.18) 40%, rgba(6, 78, 59, 0.10) 70%, transparent 92%), radial-gradient(circle 500px at 18% 55%, rgba(245, 158, 11, 0.14), transparent 80%)",
    ambientColor: "rgba(16, 185, 129, 0.07)",
  },
  catalog: {
    // Slide 5: Deep Analytical Blueprint & Cobalt Matrix
    gradient:
      "radial-gradient(circle 750px at 50% 35%, rgba(59, 130, 246, 0.20), rgba(250, 204, 21, 0.14) 48%, rgba(168, 85, 247, 0.08) 75%, transparent 90%)",
    ambientColor: "rgba(59, 130, 246, 0.06)",
  },
  projects: {
    // Slide 5: Deep Analytical Blueprint & Cobalt Matrix
    gradient:
      "radial-gradient(circle 750px at 50% 35%, rgba(59, 130, 246, 0.20), rgba(250, 204, 21, 0.14) 48%, rgba(168, 85, 247, 0.08) 75%, transparent 90%)",
    ambientColor: "rgba(59, 130, 246, 0.06)",
  },
  contact: {
    // Slide 6: Nocturne Horizon & Golden Beacon Signal
    gradient:
      "radial-gradient(circle 650px at 50% 45%, rgba(250, 204, 21, 0.25), rgba(244, 63, 94, 0.14) 55%, transparent 88%)",
    ambientColor: "rgba(250, 204, 21, 0.07)",
  },
};

export default function CinematicPresentationDeck({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const isTransitioningRef = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const playClick = useCallback(() => {
    try {
      getAudioEngine().playSwitch("clicky");
    } catch (_) {}
  }, []);

  const goToSlide = useCallback(
    (index) => {
      if (index < 0 || index >= totalSlides) return;
      if (index === currentSlide) return;

      playClick();
      setCurrentSlide(index);
      isTransitioningRef.current = true;

      // Update URL hash without jumping
      const targetSlide = slides[index];
      if (targetSlide && targetSlide.id && typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${targetSlide.id}`);
      }

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 850);
    },
    [totalSlides, currentSlide, slides, playClick]
  );

  // 1. Wheel listener with internal scroll detection
  useEffect(() => {
    let lastWheelTime = 0;

    const handleWheel = (e) => {
      // Check if event occurred inside an internally scrollable container
      let el = e.target;
      let canScrollInternally = false;

      while (el && el !== document.body && el !== document.documentElement) {
        const isScrollable =
          el.scrollHeight > el.clientHeight &&
          (window.getComputedStyle(el).overflowY === "auto" ||
            window.getComputedStyle(el).overflowY === "scroll" ||
            el.classList.contains("deck-internal-scroll") ||
            el.classList.contains("da-modal-card"));

        if (isScrollable) {
          const atTop = el.scrollTop <= 4;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 6;

          if (e.deltaY > 0 && !atBottom) {
            canScrollInternally = true;
            break;
          }
          if (e.deltaY < 0 && !atTop) {
            canScrollInternally = true;
            break;
          }
        }
        el = el.parentElement;
      }

      if (canScrollInternally) return;

      // Prevent native viewport scrolling so slides translate smoothly
      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelTime < 820 || isTransitioningRef.current) return;
      if (Math.abs(e.deltaY) < 18) return;

      if (e.deltaY > 0) {
        // Scroll DOWN -> Next Slide
        if (currentSlide < totalSlides - 1) {
          lastWheelTime = now;
          goToSlide(currentSlide + 1);
        }
      } else {
        // Scroll UP -> Previous Slide
        if (currentSlide > 0) {
          lastWheelTime = now;
          goToSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSlide, totalSlides, goToSlide]);

  // 2. Touch swipe listener (mobile & tablets)
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (isTransitioningRef.current) return;

      let el = e.target;
      let canScrollInternally = false;
      while (el && el !== document.body) {
        if (
          el.scrollHeight > el.clientHeight &&
          (el.classList.contains("deck-internal-scroll") ||
            el.classList.contains("da-modal-card"))
        ) {
          canScrollInternally = true;
          break;
        }
        el = el.parentElement;
      }
      if (canScrollInternally) return;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;

      if (Math.abs(deltaY) > 48 && Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > 0 && currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
        } else if (deltaY < 0 && currentSlide > 0) {
          goToSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSlide, totalSlides, goToSlide]);

  // 3. Keyboard navigation (Arrow keys & Page Up/Down)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (currentSlide > 0) goToSlide(currentSlide - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, totalSlides, goToSlide]);

  // 4. Listen for anchor clicks (#strategy, #showcase, etc.) across the page
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const foundIdx = slides.findIndex((s) => s.id === hash);
      if (foundIdx !== -1) {
        goToSlide(foundIdx);
      }
    };

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        const id = href.slice(1);
        const idx = slides.findIndex((s) => s.id === id);
        if (idx !== -1) {
          e.preventDefault();
          goToSlide(idx);
        }
      }
    };

    window.addEventListener("hashchange", handleHash);
    document.addEventListener("click", handleAnchorClick);
    handleHash();

    return () => {
      window.removeEventListener("hashchange", handleHash);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [slides, goToSlide]);

  return (
    <div className="cinematic-deck-viewport">
      {/* =========================================================================
          DYNAMIC ATMOSPHERIC BACKGROUND TRANSITION SYSTEM (MATCHING PINTEREST VIDEO)
          Smoothly cross-fades and morphs lighting/gradients as slides change
          ========================================================================= */}
      <div className="cinematic-bg-container" aria-hidden="true">
        {slides.map((s, idx) => {
          const preset =
            BACKGROUND_PRESETS[s.id] ||
            BACKGROUND_PRESETS[Object.keys(BACKGROUND_PRESETS)[idx % 6]];
          const isActive = idx === currentSlide;

          return (
            <motion.div
              key={s.id || idx}
              className="cinematic-bg-layer"
              style={{
                backgroundImage: preset.gradient,
                backgroundColor: preset.ambientColor,
              }}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.06,
              }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1], // Smooth cinematic cross-fade & scale
              }}
            />
          );
        })}

        {/* Tactile Stationery Notebook Ruled Grid Overlay */}
        <div className="cinematic-bg-notebook-overlay" />
      </div>

      {/* Sliding Track: Translates exactly -N * 100vh with luxury easing */}
      <motion.div
        className="cinematic-deck-track"
        animate={{ y: `-${currentSlide * 100}vh` }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1], // Cinematic presentation curve
        }}
      >
        {slides.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={s.id || idx}
              id={s.id}
              className={`cinematic-deck-slide ${isActive ? "active-slide" : "inactive-slide"}`}
            >
              {s.content}
            </div>
          );
        })}
      </motion.div>

      {/* Discrete Slide Dots Indicator on Right (Minimalist, 1-Click Jump) */}
      <div className="cinematic-deck-dots" aria-label="Slide Indicator">
        {slides.map((s, idx) => (
          <button
            key={s.id || idx}
            type="button"
            className={`deck-dot-item ${idx === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(idx)}
            aria-label={`Jump to slide ${idx + 1}: ${s.label || s.id}`}
            title={`0${idx + 1} // ${s.label || s.id}`}
          />
        ))}
      </div>
    </div>
  );
}
