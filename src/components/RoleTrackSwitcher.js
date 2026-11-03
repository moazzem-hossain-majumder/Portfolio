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
            <span className="role-track-icon">📊</span>
            <span className="role-track-action">
              {currentTrack === "data-analyst" ? "ACTIVE" : "EXPLORE →"}
            </span>
          </div>
          <h3 className="role-track-title">Data Analyst</h3>
          <p className="role-track-desc">Excel • SQL • Python • Power BI</p>
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
            <span className="role-track-icon">🤖</span>
            <span className="role-track-action coming-soon">IN PROGRESS</span>
          </div>
          <h3 className="role-track-title">AI Engineer</h3>
          <p className="role-track-desc">LLMs • RAG • Autonomous Agents</p>
        </div>
      </div>

      <AnimatePresence>
        {showAiNotice && (
          <motion.div
            className="ai-engineer-notice-toast"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
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
