"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DataAnalystModal({ isOpen, onClose, project }) {
  const [activeTab, setActiveTab] = useState("overview");
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab("overview");
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="da-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="da-modal-card"
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="da-modal-header">
            <div className="da-modal-meta">
              <span className="da-modal-cat-tag" style={{ background: project.categoryBadgeColor }}>
                {project.category}
              </span>
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="da-modal-repo-link">
                GitHub ↗
              </a>
            </div>
            <button className="da-modal-close-btn" onClick={onClose} aria-label="Close case study">
              ✕
            </button>
          </div>

          <div className="da-modal-title-wrap">
            <h2 className="da-modal-title">{project.title}</h2>
            <p className="da-modal-subtitle">{project.subtitle}</p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="da-modal-kpi-bar">
            {project.kpis.map((k, i) => (
              <div key={i} className="da-modal-kpi-pill">
                <span className="kpi-label">{k.label}</span>
                <span className="kpi-val" style={{ color: k.color || "var(--ink)" }}>{k.value}</span>
                {k.note && <span className="kpi-note">{k.note}</span>}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="da-modal-tabs">
            {[
              { id: "overview", label: "Overview" },
              { id: "findings", label: "Findings" },
              { id: "architecture", label: "Architecture" },
              { id: "gallery", label: `Gallery (${project.images?.length || 0})` },
              { id: "recommendations", label: "Recommendations" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`da-tab-btn ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="da-modal-body">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="da-tab-pane">
                <div className="da-pane-block">
                  <h4 className="da-block-title">Executive Summary</h4>
                  <p>{project.overview}</p>
                </div>

                <div className="da-pane-block">
                  <h4 className="da-block-title">The Core Problem We Are Solving</h4>
                  <p>{project.problemStatement}</p>
                </div>

                <div className="da-pane-block">
                  <h4 className="da-block-title">Core Business Questions</h4>
                  <ul className="da-block-list">
                    {project.businessQuestions.map((q, idx) => (
                      <li key={idx}><strong>Q{idx + 1}:</strong> {q}</li>
                    ))}
                  </ul>
                </div>

                <div className="da-pane-block da-dataset-card">
                  <h4 className="da-block-title">Dataset Provenance & Scale</h4>
                  <div className="da-dataset-grid">
                    <div><strong>Dataset Name:</strong> {project.dataset.name}</div>
                    <div><strong>Analyzed Scale:</strong> {project.dataset.scale}</div>
                    <div><strong>Data Sources:</strong> {project.dataset.sources}</div>
                    <div><strong>Cleaning & Hygiene:</strong> {project.dataset.cleaningNotes}</div>
                  </div>
                </div>
              </div>
            )}

            {/* FINDINGS TAB */}
            {activeTab === "findings" && (
              <div className="da-tab-pane">
                <h4 className="da-block-title">Empirical Findings & Strategic Insights</h4>
                <div className="da-findings-stack">
                  {project.findings.map((f, idx) => (
                    <div key={idx} className="da-finding-card">
                      <div className="da-finding-top">
                        <span className="da-finding-num">#{String(idx + 1).padStart(2, "0")}</span>
                        <h5 className="da-finding-head">{f.title}</h5>
                        {f.metric && <span className="da-finding-chip">{f.metric}</span>}
                      </div>
                      <p className="da-finding-desc">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ARCHITECTURE & CODE TAB */}
            {activeTab === "architecture" && (
              <div className="da-tab-pane">
                <div className="da-pane-block">
                  <h4 className="da-block-title">Technical Architecture & Layout</h4>
                  <p>{project.architecture.description}</p>
                </div>

                {project.architecture.sheetLayout && (
                  <div className="da-pane-block">
                    <h5 className="da-sub-title">Component / Sheet Layout:</h5>
                    <div className="da-table-responsive">
                      <table className="da-arch-table">
                        <thead>
                          <tr>
                            <th>Sheet / Script / Module</th>
                            <th>Operational Focus & Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.architecture.sheetLayout.map((s, idx) => (
                            <tr key={idx}>
                              <td className="sheet-cell"><code>{s.sheet}</code></td>
                              <td>{s.focus}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {project.architecture.codeSnippet && (
                  <div className="da-pane-block">
                    <div className="da-code-header">
                      <span>{project.architecture.language || "Code / Formula Implementation"}</span>
                      <span>Verified from GitHub Repository</span>
                    </div>
                    <pre className="da-code-block">
                      <code>{project.architecture.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === "gallery" && (
              <div className="da-tab-pane">
                <h4 className="da-block-title">GitHub Screenshots & Dashboards</h4>
                {project.images && project.images.length > 0 ? (
                  <div className="da-gallery-stack">
                    {project.images.map((img, idx) => (
                      <div key={idx} className="da-gallery-item">
                        <div className="da-gallery-img-wrap">
                          {/* Use standard img tag with remote GitHub raw link */}
                          <img
                            src={img.url}
                            alt={img.alt || project.title}
                            className="da-gallery-img"
                            loading="lazy"
                          />
                        </div>
                        <p className="da-gallery-caption">
                          <strong>Fig {idx + 1}:</strong> {img.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="da-empty-gallery">
                    <p>This project's deliverables are consolidated directly in code, schemas, and reports.</p>
                    <a className="btn yellow" href={project.repoUrl} target="_blank" rel="noreferrer">
                      INSPECT REPOSITORY FILES ON GITHUB ↗
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* RECOMMENDATIONS TAB */}
            {activeTab === "recommendations" && (
              <div className="da-tab-pane">
                <h4 className="da-block-title">Actionable Recommendations by Stakeholder Role</h4>
                <div className="da-recom-grid">
                  {project.recommendations.map((r, idx) => (
                    <div key={idx} className="da-recom-card">
                      <span className="da-recom-role">{r.role}</span>
                      <p>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="da-modal-footer">
            <div className="da-footer-tags">
              {project.tags.map((t) => (
                <span key={t} className="topic">#{t}</span>
              ))}
            </div>
            <div className="da-footer-buttons">
              <a className="btn ghost" href={project.repoUrl} target="_blank" rel="noreferrer">
                VIEW ON GITHUB ↗
              </a>
              <button className="btn yellow" onClick={onClose}>
                CLOSE CASE STUDY
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

