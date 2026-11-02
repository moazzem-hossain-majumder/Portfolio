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
    }, 4500);
  };

  return (
    <div className="role-switcher-container">
      <div className="role-switcher-header">
        <span className="role-switcher-label">CHOOSE CAREER TRACK:</span>
        <span className="role-switcher-hint">Tailored projects, metrics & verified certificates</span>
      </div>

      <div className="role-switcher-grid">
        {/* DATA ANALYST OPTION */}
        <Link
          href="/data-analyst"
          className={`role-track-card ${currentTrack === "data-analyst" ? "active-track" : ""}`}
        >
          <div className="role-track-top">
            <span className="role-track-icon">📊</span>
            <span className="role-track-badge da-badge">
              {currentTrack === "data-analyst" ? "ACTIVE VIEW" : "VIEW SPECIALIZED TRACK ↗"}
            </span>
          </div>
          <h3 className="role-track-title">Data Analyst</h3>
          <p className="role-track-desc">
            Excel Modeling • Production SQL (MySQL & PostgreSQL) • Python EDA • Power BI Dashboards
          </p>
          <div className="role-track-tags">
            <span className="track-tag">8 Case Studies</span>
            <span className="track-tag">150K+ Rows</span>
            <span className="track-tag">Full Audits & Visuals</span>
          </div>
        </Link>

        {/* AI ENGINEER OPTION */}
        <div
          onClick={handleAiClick}
          className={`role-track-card ai-track-card ${currentTrack === "ai-engineer" ? "active-track" : ""}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleAiClick(e);
          }}
          aria-label="AI Engineer track - in development"
        >
          <div className="role-track-top">
            <span className="role-track-icon">🤖</span>
            <span className="role-track-badge ai-badge">IN DEVELOPMENT • COMING SOON</span>
          </div>
          <h3 className="role-track-title">AI Engineer</h3>
          <p className="role-track-desc">
            Production LLMs • RAG Systems • LangChain & LangGraph Agents • Multimodal Networks
          </p>
          <div className="role-track-tags">
            <span className="track-tag">Agentic Workflows</span>
            <span className="track-tag">Fine-Tuning</span>
            <span className="track-tag">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* NON-INTRUSIVE AI ENGINEER NOTICE */}
      <AnimatePresence>
        {showAiNotice && (
          <motion.div
            className="ai-engineer-notice-toast"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="ai-notice-content">
              <span className="ai-notice-icon">⚙️</span>
              <div>
                <strong>AI Engineer Track In Progress:</strong> We will activate the dedicated AI Engineer track later! For now, explore the complete, in-depth <strong>Data Analyst</strong> track above or scroll down for the unified portfolio.
              </div>
            </div>
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

