"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { getAudioEngine } from "@/utils/audio";

const NAV_TABS = [
  { href: "/", label: "OVERVIEW" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/data-analyst", label: "DATA ANALYST" },
  { href: "/background", label: "BACKGROUND" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar({ basics = {} }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [audioMuted, setAudioMuted] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();

  const playClick = () => {
    try {
      getAudioEngine().playSwitch("clicky");
    } catch (_) {}
  };

  const toggleTheme = () => {
    playClick();
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

  const handleTabClick = () => {
    playClick();
    setOpen(false);
  };

  return (
    <header className="tactile-header-sticky">
      <nav className="nav tactile-nav">
        <div className="container nav-inner tactile-nav-inner">
          {/* Brand Stamped Logo */}
          <Link href="/" className="nav-logo" onClick={handleTabClick} title="Home / Overview">
            MH.
          </Link>

          {/* Desktop & Tablet Notebook Binder Tabs */}
          <div className={`nav-binder-tabs ${open ? "open" : ""}`} role="navigation" aria-label="Binder Tabs">
            {NAV_TABS.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={handleTabClick}
                  className={`binder-tab ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="tab-label">{tab.label}</span>
                  {isActive && <motion.span layoutId="tab-active-indicator" className="tab-active-glint" />}
                </Link>
              );
            })}

            {/* Mobile Resume Link inside drawer */}
            {basics.resumeUrl && (
              <a
                className="nav-mobile-only-btn nav-mobile-resume-btn"
                href={basics.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                DOWNLOAD RESUME PDF ↗
              </a>
            )}
          </div>

          {/* Right Action Switchers */}
          <div className="nav-right tactile-nav-right">
            {basics.resumeUrl && (
              <a
                className="btn yellow nav-resume"
                href={basics.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Download verified resume"
              >
                RESUME
              </a>
            )}

            {/* Audio Feedback Switch */}
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

            {/* Light / Dark Paper Theme Toggle */}
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle paper theme"
              title="Toggle Light / Dark Stationery"
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

            {/* Mobile Hamburger Button */}
            <button
              className="menu-btn"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation drawer"
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
    </header>
  );
}
