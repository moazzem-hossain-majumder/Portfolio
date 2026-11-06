"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StickyNotePad from "./StickyNotePad";
import PencilSketchHead from "./PencilSketchHead";
import DataAnalystModal from "./DataAnalystModal";

const SECTIONS = [
  {
    id: "flagship",
    category: "Flagship",
    title: "FLAGSHIP CASE STUDY",
    doodle: "star",
    description:
      "Full-stack operations audit & revenue recovery resolving R$500k+ in leakage using production SQL, statistical modeling in Python, and an interactive Excel Command Center.",
  },
  {
    id: "excel",
    category: "Excel",
    title: "EXCEL",
    doodle: "star",
    description:
      "Multi-sheet financial models, native dynamic formulas, and sensitivity analysis.",
  },
  {
    id: "sql",
    category: "SQL",
    title: "SQL",
    doodle: "sparkle",
    description:
      "Relational 3NF schemas, transactional facts, chained CTEs, and window analytics.",
  },
  {
    id: "python",
    category: "Python",
    title: "PYTHON",
    doodle: "arrow",
    description:
      "Exploratory data analysis, cohort retention, and predictive modeling.",
  },
  {
    id: "powerbi",
    category: "Power BI",
    title: "POWER BI",
    doodle: "star",
    description:
      "Interactive executive dashboards, DAX metrics, and cross-filtering analytical models.",
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
                title={sec.title}
                doodle={sec.doodle}
              />

              <p className="da-section-desc">{sec.description}</p>

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
                            <div className="da-card-header-tags">
                              <span
                                className="da-card-cat-chip"
                                style={{ background: p.categoryBadgeColor || "var(--yellow)" }}
                              >
                                {p.categoryLabel || p.category}
                              </span>
                              {p.highlightBadge && (
                                <span className="da-card-badge-chip">
                                  {p.highlightBadge}
                                </span>
                              )}
                            </div>
                            <a
                              href={p.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="da-card-repo-slug"
                            >
                              GitHub ↗
                            </a>
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
                                    {k.note && <span className="da-kpi-sub">{k.note}</span>}
                                  </div>
                                ))}
                              </div>

                              {/* Key empirical takeaways */}
                              <ul className="da-takeaways-list">
                                {p.findings.slice(0, 2).map((f, fi) => (
                                  <li key={fi}>
                                    <strong>{f.title}:</strong> {f.desc.slice(0, 140)}...
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Right preview & quick actions */}
                            <div className="da-card-right">
                              {thumb ? (
                                <div
                                  className="da-card-thumbnail-wrap"
                                  onClick={() => handleOpenModal(p)}
                                  role="button"
                                  tabIndex={0}
                                  title="Expand case study"
                                >
                                  <img
                                    src={thumb}
                                    alt={p.title}
                                    className="da-card-thumbnail"
                                    loading="lazy"
                                  />
                                </div>
                              ) : (
                                <div
                                  className="da-card-thumbnail-placeholder"
                                  onClick={() => handleOpenModal(p)}
                                >
                                  <span className="da-placeholder-icon" aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                    </svg>
                                  </span>
                                  <span>Database Architecture &amp; Schema</span>
                                </div>
                              )}

                              <div className="da-card-cta-group">
                                <button
                                  type="button"
                                  className="btn yellow da-full-case-btn"
                                  onClick={() => handleOpenModal(p)}
                                >
                                  Case Study →
                                </button>

                                <a
                                  href={p.repoUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn ghost da-gh-btn"
                                >
                                  GitHub ↗
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

