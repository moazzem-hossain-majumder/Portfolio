"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StickyNotePad from "./StickyNotePad";
import PencilSketchHead from "./PencilSketchHead";
import DataAnalystModal from "./DataAnalystModal";

const SECTIONS = [
  {
    id: "excel",
    category: "Excel",
    label: "section 01 — spreadsheets & financial modeling",
    title: "EXCEL ANALYTICS",
    doodle: "star",
    badge: "3 IN-DEPTH WORKBOOKS",
    description:
      "Advanced multi-sheet analytical workbooks engineered with native dynamic formulas (SUMIFS, COUNTIFS, AVERAGEIFS, INDEX/MATCH, SUMPRODUCT), dynamic dropdown slicers, risk scoring models, and row-by-row cleaning audit logs.",
  },
  {
    id: "sql",
    category: "SQL",
    label: "section 02 — relational databases & queries",
    title: "SQL & RELATIONAL DATABASES",
    doodle: "sparkle",
    badge: "PRODUCTION MYSQL & POSTGRESQL",
    description:
      "Enterprise relational schemas, 3NF data modeling, transactional fact tables, complex multi-table joins, chained CTEs, window functions (ROW_NUMBER, LAG, NTILE), stored procedures, triggers, and causal churn analyses.",
  },
  {
    id: "python",
    category: "Python",
    label: "section 03 — exploratory data analysis & ml pipelines",
    title: "PYTHON DATA SCIENCE & ANALYTICS",
    doodle: "arrow",
    badge: "51K+ BENCHMARKS & MULTIMODAL AI",
    description:
      "Leakage-safe machine learning audits, in-fold SMOTE cross-validation, feature ablation studies, SHAP interpretability, and deep multimodal neural networks with online adaptive conformal risk control.",
  },
  {
    id: "powerbi",
    category: "Power BI",
    label: "section 04 — interactive dashboards & bi reporting",
    title: "POWER BI BUSINESS INTELLIGENCE",
    doodle: "star",
    badge: "EXECUTIVE DASHBOARD & DAX",
    description:
      "Executive business intelligence dashboards, DAX calculated measures and columns, matrix heatmaps with conditional formatting, customer risk segmentation, and cross-filtering analytical models.",
  },
];

export default function DataAnalystProjectSection({ projects }) {
  const [activeProject, setActiveProject] = useState(null);

  const handleOpenModal = (project) => {
    setActiveProject(project);
  };

  const handleCloseModal = () => {
    setActiveProject(null);
  };

  return (
    <div className="da-projects-wrapper">
      {SECTIONS.map((sec, secIdx) => {
        const secProjects = (projects || []).filter((p) => p.category === sec.category);
        if (secProjects.length === 0) return null;

        return (
          <section key={sec.id} id={sec.id} className="da-section">
            <div className="container">
              <PencilSketchHead
                label={sec.label}
                title={sec.title}
                doodle={sec.doodle}
              />

              <div className="da-section-intro">
                <div className="da-intro-header">
                  <span className="da-section-badge">{sec.badge}</span>
                  <p className="da-section-desc">{sec.description}</p>
                </div>
              </div>

              <div className="da-project-cards-stack">
                {secProjects.map((p, pIdx) => {
                  const hasImage = p.images && p.images.length > 0;
                  const thumb = hasImage ? p.images[0].url : null;

                  return (
                    <motion.div
                      key={p.id}
                      className="da-card-motion"
                      initial={{ opacity: 0, y: 35, rotateX: 8 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        type: "spring",
                        stiffness: 140,
                        damping: 15,
                        delay: pIdx * 0.1,
                      }}
                    >
                      <StickyNotePad
                        colorIndex={secIdx * 2 + pIdx}
                        pinned={true}
                        pinColor={p.categoryBadgeColor || "#e03131"}
                      >
                        <div className="paper da-project-card">
                          <div className="da-card-header-bar">
                            <div className="da-card-tags-left">
                              <span
                                className="da-card-cat-chip"
                                style={{ background: p.categoryBadgeColor || "var(--yellow)" }}
                              >
                                {p.category}
                              </span>
                              <span className="da-card-highlight-chip">{p.highlightBadge}</span>
                            </div>
                            <span className="da-card-repo-slug">
                              moazzem-hossain-majumder/{p.repoName}
                            </span>
                          </div>

                          <div className="da-card-main-grid">
                            {/* Left content */}
                            <div className="da-card-left">
                              <h3 className="da-card-title">{p.title}</h3>
                              <p className="da-card-subtitle">{p.subtitle}</p>

                              <p className="da-card-overview">{p.overview}</p>

                              {/* KPIs highlight grid */}
                              <div className="da-card-kpi-grid">
                                {p.kpis.slice(0, 4).map((k, ki) => (
                                  <div key={ki} className="da-kpi-item">
                                    <span className="da-kpi-val" style={{ color: k.color || "var(--ink)" }}>
                                      {k.value}
                                    </span>
                                    <span className="da-kpi-lbl">{k.label}</span>
                                    <span className="da-kpi-sub">{k.note}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Key empirical takeaways */}
                              <div className="da-card-takeaways">
                                <h4 className="da-takeaways-head">KEY STRATEGIC FINDINGS:</h4>
                                <ul className="da-takeaways-list">
                                  {p.findings.slice(0, 2).map((f, fi) => (
                                    <li key={fi}>
                                      <strong>{f.title}:</strong> {f.desc.slice(0, 150)}...
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Right preview & quick actions */}
                            <div className="da-card-right">
                              {thumb ? (
                                <div
                                  className="da-card-thumbnail-wrap"
                                  onClick={() => handleOpenModal(p)}
                                  role="button"
                                  tabIndex={0}
                                  title="Click to expand case study & full gallery"
                                >
                                  <img
                                    src={thumb}
                                    alt={p.title}
                                    className="da-card-thumbnail"
                                    loading="lazy"
                                  />
                                  <div className="da-thumb-overlay">
                                    <span>🔍 EXPAND CASE STUDY & GALLERY</span>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="da-card-thumbnail-placeholder"
                                  onClick={() => handleOpenModal(p)}
                                >
                                  <span className="da-placeholder-icon">🗄️</span>
                                  <span>PRODUCTION DATABASE & PIPELINE</span>
                                  <small>Click to open full query and schema breakdown</small>
                                </div>
                              )}

                              <div className="da-card-cta-group">
                                <button
                                  type="button"
                                  className="btn yellow da-full-case-btn"
                                  onClick={() => handleOpenModal(p)}
                                >
                                  📖 READ CASE STUDY & AUDIT ↗
                                </button>

                                <a
                                  href={p.repoUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn ghost da-gh-btn"
                                >
                                  ⭐ GITHUB REPOSITORY ↗
                                </a>
                              </div>

                              <div className="da-card-topics">
                                {p.tags.slice(0, 4).map((t) => (
                                  <span key={t} className="topic">#{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </StickyNotePad>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Deep-Dive Modal */}
      <DataAnalystModal
        isOpen={Boolean(activeProject)}
        onClose={handleCloseModal}
        project={activeProject}
      />
    </div>
  );
}

