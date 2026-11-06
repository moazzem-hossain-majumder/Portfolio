"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { getAudioEngine } from "@/utils/audio";

const DA_LINKS = [
  { href: "#flagship", label: "FLAGSHIP" },
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
              RESUME
            </a>
          )}
        </div>

        <div className="nav-right">
          {basics?.resumeUrl && (
            <a className="btn yellow nav-resume" href={basics.resumeUrl} target="_blank" rel="noopener noreferrer">
              RESUME
            </a>
          )}
          <button
            className="theme-btn"
            onClick={toggleAudio}
            aria-label="Toggle mechanical switch audio"
            title={audioMuted ? "Enable Switch Sounds" : "Mute Switch Sounds"}
          >
            {audioMuted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
    </nav>
  );
}
