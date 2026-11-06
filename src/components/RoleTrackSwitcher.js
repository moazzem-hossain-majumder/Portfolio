"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function RoleTrackSwitcher({ currentTrack = "main" }) {
  const [showAiNotice, setShowAiNotice] = useState(false);

  const handleAiClick = (e) => {
    e.preventDefault();
    setShowAiNotice(true);
    setTimeout(() => {
      setShowAiNotice(false);
    }, 2800);
  };

  return (
    <div className="role-switcher-container">
      <div className="role-switcher-grid">
        {/* DATA ANALYST */}
        <Link
          href="/data-analyst"
          className={`role-track-card ${currentTrack === "data-analyst" ? "active-track" : ""}`}
        >
          <div className="role-track-top">
            <span className="role-track-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </span>
            <span className="role-track-action">
              {currentTrack === "data-analyst" ? "ACTIVE" : "EXPLORE →"}
            </span>
          </div>
          <h3 className="role-track-title">Data Analyst</h3>
          <p className="role-track-desc">SQL · Python · Excel · Power BI</p>
        </Link>

        {/* AI ENGINEER */}
        <div
          onClick={handleAiClick}
          className={`role-track-card ai-track-card ${currentTrack === "ai-engineer" ? "active-track" : ""}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleAiClick(e);
          }}
          aria-label="AI Engineer track"
        >
          <div className="role-track-top">
            <span className="role-track-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            </span>
            <span className="role-track-action coming-soon">IN PROGRESS</span>
          </div>
          <h3 className="role-track-title">AI Engineer</h3>
          <p className="role-track-desc">LLMs · RAG · Autonomous Agents</p>
        </div>
      </div>

      <AnimatePresence>
        {showAiNotice && (
          <motion.div
            className="ai-engineer-notice-toast"
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <span>AI Engineer dossier is in development.</span>
            <button
              className="ai-notice-close"
              onClick={() => setShowAiNotice(false)}
              aria-label="Dismiss notice"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
