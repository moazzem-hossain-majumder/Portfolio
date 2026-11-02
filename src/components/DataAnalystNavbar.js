"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { getAudioEngine } from "@/utils/audio";

const DA_LINKS = [
  { href: "#excel", label: "EXCEL" },
  { href: "#sql", label: "SQL" },
  { href: "#python", label: "PYTHON" },
  { href: "#powerbi", label: "POWER BI" },
  { href: "#certificates", label: "CERTIFICATES" },
  { href: "#contact", label: "CONTACT" },
];

export default function DataAnalystNavbar({ basics }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [audioMuted, setAudioMuted] = useState(false);
  const { scrollYProgress } = useScroll();

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const toggleAudio = () => {
    const engine = getAudioEngine();
    const isMuted = engine.toggleMute();
    setAudioMuted(isMuted);
  };

  return (
    <nav className="nav da-nav">
      <div className="container nav-inner">
        <div className="da-nav-left">
          <Link href="/" className="nav-logo" title="Back to main">
            MH.
          </Link>
          <Link href="/" className="da-back-to-main-btn" title="Back to main">
            ← MAIN
          </Link>
          <span className="da-nav-track-tag">DATA ANALYST</span>
        </div>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link
            href="/"
            className="nav-mobile-only-btn"
            onClick={() => setOpen(false)}
          >
            ← MAIN
          </Link>
          {DA_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          {basics?.resumeUrl && (
            <a
              className="nav-mobile-only-btn nav-mobile-resume-btn"
              href={basics.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              📄 RESUME ↓
            </a>
          )}
        </div>

        <div className="nav-right">
          {basics?.resumeUrl && (
            <a className="btn yellow nav-resume" href={basics.resumeUrl} target="_blank" rel="noopener noreferrer">
              RESUME ↓
            </a>
          )}
          <button
            className="theme-btn"
            onClick={toggleAudio}
            aria-label="Toggle mechanical switch audio"
            title={audioMuted ? "Enable Keyboard Switch Sounds" : "Mute Keyboard Switch Sounds"}
          >
            {audioMuted ? "🔇" : "🔊"}
          </button>
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
    </nav>
  );
}
