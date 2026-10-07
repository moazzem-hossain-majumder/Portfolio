"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConsoleModal({ isOpen, onClose, modalData, basics, profile, repos }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // Focus close button or modal container
      setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelector("button, [href], input");
          if (focusable) focusable.focus();
        }
      }, 50);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !modalData) return null;

  const scrollToSection = (id) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      <div className="console-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <motion.div
          className="console-modal-card"
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Bar */}
          <div className="modal-header">
            <div className="modal-header-meta">
              <span className="modal-pill-tag">TERMINAL // 0x{(modalData.id || "KEY").toUpperCase()}</span>
              <span className="modal-status-dot" />
              <span className="modal-sys-name">{modalData.sublabel || "CONSOLE"}</span>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
              ✕
            </button>
          </div>

          {/* Modal Content */}
          <div className="modal-body">
            <h2 id="modal-title" className="modal-title">
              {modalData.title}
            </h2>
            <p className="modal-tagline">{modalData.tagline}</p>

            {/* Custom Content based on modalType */}
            {modalData.modalType === "projects" && (
              <div className="modal-content-section">
                <p className="modal-desc">
                  Curated highlights in Machine Learning, Wireless Beam Prediction, and Data Analytics pipelines.
                </p>
                <div className="modal-chips-grid">
                  {(profile?.pinnedProjects || []).slice(0, 4).map((pin) => (
                    <div key={pin.repo || pin.name} className="modal-item-box">
                      <b>📌 {pin.repo || pin.name}</b>
                      <p>{pin.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modalData.modalType === "about" && (
              <div className="modal-content-section">
                <div className="modal-author-row">
                  {basics?.photo && (
                    <img src={basics.photo} alt={basics.name} className="modal-avatar" />
                  )}
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{basics?.name}</h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{basics?.headline}</p>
                  </div>
                </div>
                <p className="modal-desc" style={{ marginTop: "1rem" }}>
                  Passionate about combining robust mathematical models, scalable data engineering, and human-centric software.
                </p>
              </div>
            )}

            {modalData.modalType === "skills" || modalData.modalType === "services" ? (
              <div className="modal-content-section">
                <p className="modal-desc">Core competencies & technologies in daily active use:</p>
                <div className="modal-tag-cloud">
                  {(profile?.skills || []).map((s) => (
                    <span key={s.name} className="modal-skill-tag">
                      {s.name} <small>({s.category})</small>
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {modalData.modalType === "education" && (
              <div className="modal-content-section">
                <div className="modal-chips-grid">
                  {(profile?.education || []).map((edu) => (
                    <div key={edu.institution} className="modal-item-box">
                      <b>🎓 {edu.degree}</b>
                      <p style={{ color: "var(--amber)", fontWeight: 600 }}>{edu.institution} ({edu.period})</p>
                      <p>{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modalData.modalType === "repositories" && (
              <div className="modal-content-section">
                <p className="modal-desc">
                  Showing latest active open-source repositories from GitHub (@{basics?.githubUsername}):
                </p>
                <div className="modal-chips-grid">
                  {(repos || []).slice(0, 4).map((r) => (
                    <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="modal-item-box clickable">
                      <b>📦 {r.name}</b>
                      <p>{r.description || "No description provided."}</p>
                      <small style={{ color: "var(--amber)" }}>⭐ {r.stars} | {r.language || "Code"}</small>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {modalData.modalType === "contact" && (
              <div className="modal-content-section">
                <p className="modal-desc">
                  Good design starts with hello. Have a project in mind, an opportunity, or just want to chat?
                </p>
                <div className="modal-contact-links">
                  <a className="btn yellow" href={`mailto:${basics?.email}`}>
                    ✉ Email: {basics?.email}
                  </a>
                  {basics?.linkedinUrl && (
                    <a className="btn ghost" href={basics.linkedinUrl} target="_blank" rel="noreferrer">
                      💼 LinkedIn Profile ↗
                    </a>
                  )}
                  {basics?.githubUrl && (
                    <a className="btn ghost" href={basics.githubUrl} target="_blank" rel="noreferrer">
                      🐙 GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            )}

            {modalData.modalType === "hub" && (
              <div className="modal-content-section">
                <div className="modal-stats-row">
                  <div className="modal-stat-pill">
                    <span className="stat-num">{profile?.pinnedProjects?.length || 4}</span>
                    <span className="stat-label">Featured Projects</span>
                  </div>
                  <div className="modal-stat-pill">
                    <span className="stat-num">{profile?.certifications?.length || 15}</span>
                    <span className="stat-label">Certifications</span>
                  </div>
                  <div className="modal-stat-pill">
                    <span className="stat-num">{repos?.length || 20}+</span>
                    <span className="stat-label">Repositories</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            {modalData.sectionId && (
              <button
                className="btn yellow"
                onClick={() => scrollToSection(modalData.sectionId)}
              >
                Go to Full Section ↓
              </button>
            )}
            <button className="btn ghost" onClick={onClose}>
              Close (Esc)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
