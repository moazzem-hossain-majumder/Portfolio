"use client";

import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { getAudioEngine } from "@/utils/audio";

const LINKS = [
  { href: "#home", label: "HOME" },
  { href: "#console", label: "CONSOLE" },
  { href: "#about", label: "ABOUT" },
  { href: "#education", label: "EDUCATION" },
  { href: "#certificates", label: "CERTIFICATES" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#repositories", label: "REPOSITORIES" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navbar({ basics }) {
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
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#home" className="nav-logo">
          MH.
        </a>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          {basics.resumeUrl && (
            <a className="btn yellow nav-resume" href={basics.resumeUrl} target="_blank" rel="noreferrer">
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
