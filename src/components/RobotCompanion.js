"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { getAudioEngine } from "../utils/audio";

// Dynamically import RobotHead with ssr: false to guarantee clean client-only canvas mounting
const RobotHead = dynamic(
  () => import("robot-heads").then((mod) => mod.RobotHead),
  { ssr: false }
);

const CLICK_PHRASES = [
  "Beep! I'm Moazzem's retro AI companion! 🤖",
  "Try peeling the sticky note cards! They regenerate! ✂️📄",
  "Check out the 7 verified IBM certifications! 🏅",
  "Exploring the GitHub Codebase Vault? 💻✨",
  "Everything here runs client-side & super fast! ⚡",
  "Built with Next.js, Framer Motion & scratchbook vibes! 🎨",
  "Have a great day! Don't forget to reach out! ✉️🚀",
];

export default function RobotCompanion() {
  const [mounted, setMounted] = useState(false);
  const [robotState, setRobotState] = useState("idle");
  const [message, setMessage] = useState("Hi recruiter! I'm Moazzem's AI companion! 👋");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const sectionStateRef = useRef("idle");
  const speechTimeoutRef = useRef(null);

  // Set mounted and detect mobile screen size
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Display a temporary comic speech bubble
  const showSpeech = useCallback((text, duration = 4000) => {
    setMessage(text);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, duration);
  }, []);

  // Initial greeting
  useEffect(() => {
    if (!mounted) return;
    const initialGreeting = setTimeout(() => {
      showSpeech("Beep boop! Welcome to Moazzem's portfolio! 👋", 5000);
    }, 1200);
    return () => clearTimeout(initialGreeting);
  }, [mounted, showSpeech]);

  // Section Observer: updates robot expression & dialogue based on scroll position
  useEffect(() => {
    if (!mounted) return;

    const sectionConfigs = [
      { id: "hero", state: "idle", msg: "Welcome to my scratchbook portfolio! 👋" },
      { id: "about", state: "thinking", msg: "Analyzing background & skills... 🧠" },
      { id: "education", state: "thinking", msg: "Exploring degrees & academic bio 🎓" },
      { id: "experience", state: "working", msg: "Reviewing engineering history & roles 💼" },
      { id: "certificates", state: "searching", msg: "7 verified IBM credentials found! 🏅" },
      { id: "projects", state: "working", msg: "Inspecting hand-picked AI & Python projects 🚀" },
      { id: "repositories", state: "searching", msg: "Accessing the full Codebase Vault 💻" },
      { id: "contact", state: "speaking", msg: "Let's connect! Send an email or message ✉️" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sectionConfigs.find((c) => c.id === entry.target.id);
            if (match) {
              sectionStateRef.current = match.state;
              setRobotState(match.state);
              showSpeech(match.msg, 3800);
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

    // When recruiter peels a sticky note
    const handlePeelEvent = (e) => {
      setRobotState("happy");
      const count = e.detail?.count || 1;
      showSpeech(`*RIIIP!* Sheet #${count} peeled! Infinite pad! 📄✨`, 3500);
      try {
        getAudioEngine().playRobotBlip("happy");
      } catch (_) {}

      setTimeout(() => {
        setRobotState(sectionStateRef.current || "idle");
      }, 3500);
    };

    // When window loses focus -> go to sleep
    const handleBlur = () => {
      setRobotState("sleeping");
      setMessage("Zzz... resting in the console... 💤");
    };

    // When window regains focus -> wake up
    const handleFocus = () => {
      setRobotState("idle");
      showSpeech("I'm awake! Ready to explore! ⚡", 2500);
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

  // Robot click handler: spins, chirps, and speaks
  const handleRobotClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    const states = ["happy", "speaking", "thinking", "working"];
    const chosenState = states[nextCount % states.length];
    setRobotState(chosenState);

    const phrase = CLICK_PHRASES[(nextCount - 1) % CLICK_PHRASES.length];
    showSpeech(phrase, 4200);

    try {
      getAudioEngine().playRobotBlip("happy");
    } catch (_) {}

    setTimeout(() => {
      setRobotState(sectionStateRef.current || "idle");
    }, 4000);
  };

  if (!mounted) return null;

  const robotSize = isMobile ? 95 : 125;

  return (
    <aside className="robot-companion-dock" aria-label="Interactive 3D Robot Companion">
      <motion.div
        className="robot-companion-container"
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        drag
        dragMomentum={false}
        dragConstraints={{ left: -380, right: 40, top: -500, bottom: 20 }}
      >
        {/* Floating Comic Speech Bubble */}
        <AnimatePresence>
          {message && !isMinimized && (
            <motion.div
              className="robot-speech-bubble"
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -6 }}
              transition={{ duration: 0.25 }}
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
            title="Click me to chat or spin! (You can also drag me around)"
            animate={{
              y: [0, -7, 0],
              rotate: [-0.8, 1.2, -0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.8,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <RobotHead
              shape="rectangle"
              state={robotState}
              size={robotSize}
              color="#234292"
              trimColor="#ffd43b"
              screenColor="#ffffff"
              interactive={true}
              antenna={true}
              floorShadow={true}
              speed={1}
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
            title="Open AI Robot Companion"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🤖</span>
            <span className="robot-mini-label">BOT</span>
          </motion.button>
        )}

        {/* Minimize / Dock Button */}
        {!isMinimized && (
          <button
            type="button"
            className="robot-minimize-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            title="Minimize companion"
            aria-label="Minimize companion"
          >
            ✕
          </button>
        )}
      </motion.div>
    </aside>
  );
}
