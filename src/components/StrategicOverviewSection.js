"use client";

import { motion } from "framer-motion";

export default function StrategicOverviewSection({ currentTrack = "data-analyst" }) {
  const isDataAnalyst = currentTrack === "data-analyst";

  return (
    <section className="strategic-overview-section cinematic-stage" id="strategy">
      <div className="container">
        <div className="strategy-split-grid">
          {/* Left Column: Analytical Doctrine */}
          <motion.div
            className="strategy-text-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="strategy-badge-pill">
              <span className="strategy-indicator-dot" />
              <span>DOCTRINE // PRODUCTION ARCHITECTURE</span>
            </div>

            <h2 className="strategy-headline">
              {isDataAnalyst
                ? "TURNING RAW DATA INTO COMMERCIAL DECISIONS"
                : "WHERE MACHINE LEARNING MEETS PRODUCTION SYSTEMS"}
            </h2>

            <p className="strategy-desc">
              Analytics without commercial grounding is decorative. Every case study in this dossier is an empirical investigation engineered to isolate capital leakage, triage unfulfilled backlogs, and deliver reproducible executive clarity.
            </p>

            {/* 3 Core Tenets */}
            <div className="strategy-tenets-list">
              <div className="strategy-tenet-item">
                <span className="tenet-number">01</span>
                <div className="tenet-content">
                  <h4 className="tenet-title">3NF Relational Integrity &amp; Reconciliation</h4>
                  <p className="tenet-text">
                    Automated SQL views reconciling order checkouts against payment collections to catch silent transactional revenue leakage.
                  </p>
                </div>
              </div>

              <div className="strategy-tenet-item">
                <span className="tenet-number">02</span>
                <div className="tenet-content">
                  <h4 className="tenet-title">Econometric &amp; Causal Modeling</h4>
                  <p className="tenet-text">
                    Multivariable logistic regression and Empirical Bayes risk shrinkage to isolate operational SLAs without penalizing low-volume vendors.
                  </p>
                </div>
              </div>

              <div className="strategy-tenet-item">
                <span className="tenet-number">03</span>
                <div className="tenet-content">
                  <h4 className="tenet-title">Sensitivity &amp; What-If Simulation</h4>
                  <p className="tenet-text">
                    Dynamic Excel capacity models and interactive Power BI DAX dashboards simulating headcount constraints and SLA contract trade-offs.
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Badges (Matching Pinterest Frame 00:02) */}
            <div className="strategy-platforms-row">
              <span className="platform-tag">SQLite &amp; MySQL 8.0</span>
              <span className="platform-tag">PostgreSQL</span>
              <span className="platform-tag">Python (Pandas, SciPy)</span>
              <span className="platform-tag">Microsoft Excel</span>
              <span className="platform-tag">Power BI &amp; DAX</span>
              <span className="platform-tag">Git CI/CD</span>
            </div>
          </motion.div>

          {/* Right Column: Visual Artifact with Warm Lantern Glow (Matching Reference) */}
          <motion.div
            className="strategy-visual-col"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="strategy-tactile-terminal">
              {/* Corner Runes */}
              <span className="deck-corner-rune rune-tl" />
              <span className="deck-corner-rune rune-tr" />
              <span className="deck-corner-rune rune-bl" />
              <span className="deck-corner-rune rune-br" />

              {/* Lantern Glow Layer */}
              <div className="strategy-lantern-glow" />

              {/* Terminal Title */}
              <div className="strategy-term-topbar">
                <span className="term-circle red" />
                <span className="term-circle yellow" />
                <span className="term-circle green" />
                <span className="strategy-term-title">MOAZZEM_ANALYTICS_KERNEL // ACTIVE</span>
              </div>

              {/* Code / Architecture Schema Output */}
              <div className="strategy-term-body">
                <div className="code-line comment">-- PRODUCTION RECONCILIATION ENGINE</div>
                <div className="code-line">
                  <span className="keyword">WITH</span> order_basket <span className="keyword">AS</span> (
                </div>
                <div className="code-line indent">
                  <span className="keyword">SELECT</span> order_id, <span className="fn">SUM</span>(price + freight) <span className="keyword">AS</span> gross_due
                </div>
                <div className="code-line indent">
                  <span className="keyword">FROM</span> olist_order_items <span className="keyword">GROUP BY</span> 1
                </div>
                <div className="code-line">),</div>
                <div className="code-line">
                  payments <span className="keyword">AS</span> (
                </div>
                <div className="code-line indent">
                  <span className="keyword">SELECT</span> order_id, <span className="fn">SUM</span>(payment_value) <span className="keyword">AS</span> total_collected
                </div>
                <div className="code-line indent">
                  <span className="keyword">FROM</span> olist_order_payments <span className="keyword">GROUP BY</span> 1
                </div>
                <div className="code-line">)</div>
                <div className="code-line highlight-line">
                  <span className="keyword">SELECT</span> <span className="str">&#39;R$ 202,683.47 RECONCILED&#39;</span> <span className="keyword">AS</span> capital_verified;
                </div>

                <div className="strategy-term-stats-badge">
                  <span className="stat-pill-dot" />
                  <span>AUDIT STATUS: 99,441 ROWS VERIFIED • 0 SCHEMA FAILS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

