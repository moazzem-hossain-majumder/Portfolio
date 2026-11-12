"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getAudioEngine } from "@/utils/audio";
import DataAnalystModal from "./DataAnalystModal";

export default function FlagshipSpotlightSection({ project }) {
  const [modalOpen, setModalOpen] = useState(false);

  if (!project) return null;

  const handleOpenModal = () => {
    try {
      getAudioEngine().playLatch(true);
    } catch (_) {}
    setModalOpen(true);
  };

  return (
    <section className="flagship-spotlight-section cinematic-stage" id="flagship-spotlight">
      <div className="container">
        <div className="spotlight-split-grid">
          {/* Left Column: Narrative & Empirical Pillars */}
          <motion.div
            className="spotlight-narrative-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="spotlight-badge-pill">
              <span className="spotlight-dot" />
              <span>FLAGSHIP CAPSTONE // TRI-STACK</span>
            </div>

            <h2 className="spotlight-headline">
              OLIST MARKETPLACE REVENUE AUDIT
            </h2>

            <p className="spotlight-lead">
              Enterprise operations audit and revenue recovery engine resolving <strong>R$ 519k in capital exposure</strong> across 99,441 transactional records using SQLite relational warehousing, multivariable regression, and dynamic Excel capacity planning.
            </p>

            {/* Empirical Metric Grid */}
            <div className="spotlight-metric-cards">
              <div className="spotlight-kpi-card">
                <span className="spotlight-kpi-num">R$ 519k</span>
                <span className="spotlight-kpi-lbl">Leakage Identified &amp; Reconciled</span>
              </div>
              <div className="spotlight-kpi-card">
                <span className="spotlight-kpi-num">10 Days</span>
                <span className="spotlight-kpi-lbl">Backlog Clearance (4 Agents)</span>
              </div>
              <div className="spotlight-kpi-card">
                <span className="spotlight-kpi-num">5x Odds</span>
                <span className="spotlight-kpi-lbl">Delay Risk from Seller Handoff</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="spotlight-cta-row">
              <button
                type="button"
                className="btn yellow spotlight-primary-btn"
                onClick={handleOpenModal}
              >
                OPEN COMPLETE AUDIT DOSSIER →
              </button>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn ghost spotlight-repo-btn"
              >
                GitHub Repository ↗
              </a>
            </div>
          </motion.div>

          {/* Right Column: Ornate Framed Showcase (Matching Video Screen 4) */}
          <motion.div
            className="spotlight-frame-col"
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="spotlight-ornate-frame">
              {/* Corner Runes */}
              <span className="deck-corner-rune rune-tl" />
              <span className="deck-corner-rune rune-tr" />
              <span className="deck-corner-rune rune-bl" />
              <span className="deck-corner-rune rune-br" />

              {/* Header Bar */}
              <div className="spotlight-frame-header">
                <div className="spotlight-frame-dot-group">
                  <span className="frame-dot dot-red" />
                  <span className="frame-dot dot-yellow" />
                  <span className="frame-dot dot-green" />
                </div>
                <span className="spotlight-frame-title">
                  AUDIT_SYSTEM_v2.0 // LIVE RECONCILIATION
                </span>
                <span className="spotlight-frame-tag">9 CHECKS OK</span>
              </div>

              {/* 4 Live Audit Monitors */}
              <div className="spotlight-checks-list">
                <div className="spotlight-check-item">
                  <div className="check-status-badge pass">VERIFIED</div>
                  <div className="check-info">
                    <span className="check-title">Reconciliation View v_recon_discrepancies</span>
                    <span className="check-desc">1,425 ledger exceptions flagged • R$ 202k exposure</span>
                  </div>
                </div>

                <div className="spotlight-check-item">
                  <div className="check-status-badge pass">OPTIMIZED</div>
                  <div className="check-info">
                    <span className="check-title">Dynamic Headcount Capacity Model</span>
                    <span className="check-desc">1,729 stuck orders triaged • P1/P2/P3 queuing rules</span>
                  </div>
                </div>

                <div className="spotlight-check-item">
                  <div className="check-status-badge pass">MODEL FIT</div>
                  <div className="check-info">
                    <span className="check-title">Multivariable Logistic SLA Classifier</span>
                    <span className="check-desc">AUC 0.79 • 73% late orders handed over to carriers on time</span>
                  </div>
                </div>

                <div className="spotlight-check-item">
                  <div className="check-status-badge pass">SHRUNK</div>
                  <div className="check-info">
                    <span className="check-title">Empirical Bayes Seller Risk Engine</span>
                    <span className="check-desc">32 high-risk sellers drive 20% of late deliveries</span>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Strip */}
              <div className="spotlight-frame-footer">
                <div className="footer-metric-pill">
                  <span>DATASET: 99,441 ORDERS • 9 TABLES</span>
                </div>
                <button
                  type="button"
                  className="spotlight-inspect-link"
                  onClick={handleOpenModal}
                >
                  DEEP-DIVE DOSSIER ↗
                </button>
              </div>

              {/* Subtle Atmospheric Lantern Glow */}
              <div className="spotlight-glow-aura" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <DataAnalystModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={project}
      />
    </section>
  );
}

