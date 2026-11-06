"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { getAudioEngine } from "../utils/audio";

// Dynamically import RobotHead with ssr: false to guarantee clean client-only canvas mounting
const RobotHead = dynamic(
  () => import("robot-heads").then((mod) => mod.RobotHead),
  { ssr: false }
);

const CLICK_PHRASES = [
  "Telemetry: 9 end-to-end data analytics & ML case studies indexed.",
  "Architecture: SQLite, PostgreSQL & MySQL relational schemas normalized to 3NF.",
  "Flagship: Olist Marketplace Intelligence resolved R$500k+ in revenue leakage.",
  "Testing: Pytest CI test suites asserting financial reconciliations & shrinkage metrics.",
  "Navigation: Toggle between Data Analyst and Main tracks in the hero or navbar.",
  "Console: Interactive mechanical sound terminal available below.",
];

export default function RobotCompanion() {
  const [mounted, setMounted] = useState(false);
  const [robotState, setRobotState] = useState("idle");
  const [message, setMessage] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isDraggedAway, setIsDraggedAway] = useState(false);
  const [bubblePlacement, setBubblePlacement] = useState({
    vertical: "top",
    horizontal: "center",
  });

  const constraintsRef = useRef(null);
  const sectionStateRef = useRef("idle");
  const speechTimeoutRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Motion values to track position and allow reset to home dock
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Set mounted and detect mobile screen size
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMinimized(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Display a temporary clean speech bubble
  const showSpeech = useCallback((text, duration = 3200) => {
    if (window.innerWidth < 768) return; // Keep mobile screen clear
    setMessage(text);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, duration);
  }, []);

  // Section Observer: updates robot expression & telemetry based on scroll position
  useEffect(() => {
    if (!mounted) return;

    const sectionConfigs = [
      { id: "home", state: "idle", msg: "Telemetry: Engineering dossier loaded." },
      { id: "about", state: "thinking", msg: "Telemetry: Python pipelines, relational SQL & ML models." },
      { id: "education", state: "thinking", msg: "Academic background: B.Sc. in Computer Science & Engineering." },
      { id: "experience", state: "working", msg: "Engineering history: Machine learning & data analytics." },
      { id: "flagship", state: "working", msg: "Flagship Capstone: Olist Operations Audit (SQL • Python • Excel)." },
      { id: "excel", state: "working", msg: "Excel Modeling: Financial audits & headcount capacity models." },
      { id: "sql", state: "working", msg: "SQL Warehouse: Star schemas, CTEs, and window analytics." },
      { id: "python", state: "working", msg: "Python Analytics: Logistic regression & churn risk scoring." },
      { id: "powerbi", state: "working", msg: "Power BI: Interactive DAX executive dashboards." },
      { id: "certificates", state: "searching", msg: "Credentials: Verified IBM & DeepLearning.AI accreditations." },
      { id: "projects", state: "working", msg: "Projects: Production machine learning & data architectures." },
      { id: "repositories", state: "searching", msg: "Codebase: Public GitHub repositories & test suites." },
      { id: "contact", state: "speaking", msg: "Status: Open to data analytics & ML engineering roles." },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sectionConfigs.find((c) => c.id === entry.target.id);
            if (match) {
              sectionStateRef.current = match.state;
              setRobotState(match.state);
              showSpeech(match.msg, 3200);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionConfigs.forEach((cfg) => {
      const el = document.getElementById(cfg.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted, showSpeech]);

  // Event Listeners for Portfolio Micro-Interactions (Sticky Note Peels, Tab Sleep)
  useEffect(() => {
    if (!mounted) return;

    // When user peels a note
    const handlePeelEvent = (e) => {
      setRobotState("happy");
      const count = e.detail?.count || 1;
      showSpeech(`Workspace interaction: Note sheet #${count} cycled.`, 3000);
      try {
        getAudioEngine().playRobotBlip("happy");
      } catch (_) {}

      setTimeout(() => {
        setRobotState(sectionStateRef.current || "idle");
      }, 3000);
    };

    // When window loses focus -> go to sleep
    const handleBlur = () => {
      setRobotState("sleeping");
      setMessage("System standby: awaiting browser focus.");
    };

    // When window regains focus -> wake up
    const handleFocus = () => {
      setRobotState("idle");
      showSpeech("System active: monitoring workspace.", 2200);
      try {
        getAudioEngine().playRobotBlip("happy");
      } catch (_) {}
    };

    window.addEventListener("portfolio:peel", handlePeelEvent);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("portfolio:peel", handlePeelEvent);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [mounted, showSpeech]);

  // Robot click handler: cycles state and delivers technical telemetry
  const handleRobotClick = () => {
    if (isDraggingRef.current) return;

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    const states = ["happy", "speaking", "thinking", "working"];
    const chosenState = states[nextCount % states.length];
    setRobotState(chosenState);

    const phrase = CLICK_PHRASES[(nextCount - 1) % CLICK_PHRASES.length];
    showSpeech(phrase, 3500);

    try {
      getAudioEngine().playRobotBlip("happy");
    } catch (_) {}

    setTimeout(() => {
      setRobotState(sectionStateRef.current || "idle");
    }, 3500);
  };

  // Drag position tracker for dynamic speech bubble placement & home button state
  const handleDragUpdate = (_, info) => {
    if (typeof window === "undefined") return;
    const y = info.point.y;
    const x = info.point.x;
    const screenWidth = window.innerWidth;

    const vertical = y < 160 ? "bottom" : "top";
    let horizontal = "center";
    if (x < 160) horizontal = "left";
    else if (x > screenWidth - 160) horizontal = "right";

    setBubblePlacement((prev) => {
      if (prev.vertical === vertical && prev.horizontal === horizontal) return prev;
      return { vertical, horizontal };
    });
  };

  const handleDragEnd = (_, info) => {
    handleDragUpdate(_, info);
    const dist = Math.hypot(dragX.get(), dragY.get());
    setIsDraggedAway(dist > 60);

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  // Reset to original bottom-left dock position
  const resetToHome = (e) => {
    if (e) e.stopPropagation();
    animate(dragX, 0, { type: "spring", stiffness: 320, damping: 24 });
    animate(dragY, 0, { type: "spring", stiffness: 320, damping: 24 });
    setIsDraggedAway(false);
    setBubblePlacement({ vertical: "top", horizontal: "center" });
    showSpeech("Companion docked at origin.", 2000);
    try {
      getAudioEngine().playRobotBlip("happy");
    } catch (_) {}
  };

  if (!mounted) return null;

  const robotSize = isMobile ? 74 : 115;

  return (
    <aside
      ref={constraintsRef}
      className="robot-companion-dock"
      aria-label="Interactive System Companion"
    >
      <motion.div
        className="robot-companion-container"
        style={{ x: dragX, y: dragY }}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDrag={handleDragUpdate}
        onDragEnd={handleDragEnd}
      >
        {/* Technical Callout Bubble */}
        <AnimatePresence>
          {message && !isMinimized && (
            <motion.div
              className={`robot-speech-bubble bubble-${bubblePlacement.vertical} bubble-${bubblePlacement.horizontal}`}
              initial={{ opacity: 0, y: bubblePlacement.vertical === "top" ? 6 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: bubblePlacement.vertical === "top" ? -4 : 4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <p className="robot-speech-text">{message}</p>
              <span className="robot-speech-tail" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Animated Robot Head Canvas */}
        {!isMinimized ? (
          <motion.div
            className="robot-avatar-wrapper"
            onClick={handleRobotClick}
            onDoubleClick={resetToHome}
            title="Click to cycle telemetry. Drag anywhere on screen. Double-click to dock."
            animate={{
              y: [0, -5, 0],
              rotate: [-0.5, 0.8, -0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.2,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <RobotHead
              shape="rectangle"
              state={robotState}
              size={robotSize}
              color="#18181b"
              trimColor="#facc15"
              screenColor="#09090b"
              interactive={true}
              antenna={true}
              floorShadow={true}
              speed={0.9}
            />

            {/* Quick State Pill Badge */}
            <div className="robot-status-pill">
              <span className="robot-status-dot" />
              <span>{robotState.toUpperCase()}</span>
            </div>
          </motion.div>
        ) : (
          <motion.button
            type="button"
            className="robot-minimized-bubble"
            onClick={() => setIsMinimized(false)}
            title="Open System Companion"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open System Companion"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" />
              <line x1="15" y1="1" x2="15" y2="4" />
              <line x1="9" y1="20" x2="9" y2="23" />
              <line x1="15" y1="20" x2="15" y2="23" />
              <line x1="20" y1="9" x2="23" y2="9" />
              <line x1="20" y1="14" x2="23" y2="14" />
              <line x1="1" y1="9" x2="4" y2="9" />
              <line x1="1" y1="14" x2="4" y2="14" />
            </svg>
            <span>BOT</span>
          </motion.button>
        )}

        {/* Companion Control Buttons (Return Home & Minimize) */}
        {!isMinimized && (
          <div className="robot-companion-controls">
            {isDraggedAway && (
              <button
                type="button"
                className="robot-control-btn home-btn"
                onClick={resetToHome}
                title="Reset companion to dock"
                aria-label="Reset companion to dock"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </button>
            )}
            <button
              type="button"
              className="robot-control-btn close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(true);
              }}
              title="Minimize companion"
              aria-label="Minimize companion"
            >
              ✕
            </button>
          </div>
        )}
      </motion.div>
    </aside>
  );
}
