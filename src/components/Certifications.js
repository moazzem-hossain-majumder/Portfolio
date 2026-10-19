"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PencilSketchHead from "./PencilSketchHead";
import { WashiTape } from "./ScratchbookDoodles";

const ISSUER_COLORS = {
  IBM: "c-blue", DataCamp: "c-green", "Harvard University": "c-red",
  Kaggle: "c-paper", Cisco: "c-paper", Simplilearn: "c-yellow",
  Forage: "c-purple", "University of Helsinki": "c-paper",
};

const INITIAL_BATCH = 6; // 2 rows on standard desktop layout
const BATCH_INCREMENT = 6; // +2 rows each time recruiter clicks "show more"

function CertCard({ c, pinned, i }) {
  const tapeColors = ["yellow", "pink", "green", "blue"];
  const tapeColor = tapeColors[i % tapeColors.length];

  return (
    <motion.div
      className={`paper cert-card retro-block-card${pinned ? " pinned" : ""}`}
      initial={{ opacity: 0, y: -30, rotateX: 12, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 14,
        delay: Math.min((i % 3) * 0.08, 0.25),
      }}
    >
      {pinned && <WashiTape color={tapeColor} />}
      {pinned && <span className="pin-badge small">📌 PINNED</span>}
      <span className={`cert-issuer ${ISSUER_COLORS[c.issuer] || "c-paper"}`}>{c.issuer}</span>
      <h3>{c.title}</h3>
      <p className="cert-meta">
        issued <b>{c.year}</b>
        {c.credentialId && (<><br />ID: <b>{c.credentialId}</b></>)}
      </p>
      {(c.skills || []).length > 0 && (
        <div className="proj-topics">
          {c.skills.map((s) => <span key={s} className="topic">{s}</span>)}
        </div>
      )}
      {c.link && (
        <a className="cert-link" href={c.link} target="_blank" rel="noreferrer">VERIFY CREDENTIAL ↗</a>
      )}
    </motion.div>
  );
}

export default function Certifications({ certs, credlyUrl }) {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState("All");
  const [isOpen, setIsOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);

  const pinned = useMemo(() => (certs || []).filter((c) => c.pinned), [certs]);
  const rest = useMemo(() => (certs || []).filter((c) => !c.pinned), [certs]);
  const issuers = useMemo(() => ["All", ...new Set(rest.map((c) => c.issuer))], [rest]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter((c) => {
      const matchIssuer = issuer === "All" || c.issuer === issuer;
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        (c.skills || []).some((s) => s.toLowerCase().includes(q));
      return matchIssuer && matchQuery;
    });
  }, [rest, query, issuer]);

  const visibleCerts = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const remainingCount = Math.max(0, filtered.length - visibleCount);
  const hasMore = remainingCount > 0;
  const canShowLess = visibleCount > INITIAL_BATCH;

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setVisibleCount(INITIAL_BATCH);
    setIsOpen(true);
  };

  const handleIssuerChange = (e) => {
    setIssuer(e.target.value);
    setVisibleCount(INITIAL_BATCH);
    setIsOpen(true);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + BATCH_INCREMENT);
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_BATCH);
  };

  const toggleFolder = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section id="certificates">
      <div className="container">
        <PencilSketchHead
          label="always learning —"
          title="CERTIFICATIONS"
          doodle="sparkle"
        />

        {credlyUrl && (
          <div style={{ marginBottom: "34px" }}>
            <a className="btn ghost" href={credlyUrl} target="_blank" rel="noreferrer">
              🏅 VERIFY ALL ON CREDLY ↗
            </a>
          </div>
        )}

        {pinned.length > 0 && (
          <>
            <h3 className="sub-head">📌 pinned by me ({pinned.length}) -</h3>
            <div className="cert-grid pinned-grid">
              {pinned.map((c, i) => <CertCard key={c.title + i} c={c} pinned i={i} />)}
            </div>
          </>
        )}

        {/* FOLDER FOR ALL OTHER CERTIFICATES */}
        <div className="archive-folder-wrapper">
          <div className="archive-folder-tab-bar">
            <button
              type="button"
              className={`archive-folder-tab ${!isOpen ? "tab-closed" : ""}`}
              onClick={toggleFolder}
              aria-expanded={isOpen}
            >
              <span className="archive-folder-tab-icon">{isOpen ? "📂" : "📁"}</span>
              <span>ALL CERTIFICATES ARCHIVE</span>
              <span className="archive-folder-tab-badge">{rest.length}</span>
            </button>

            <button
              type="button"
              className="archive-folder-toggle-btn"
              onClick={toggleFolder}
            >
              {isOpen ? "▾ COLLAPSE FOLDER" : "▸ OPEN FOLDER (2 ROWS)"}
            </button>
          </div>

          <div className="archive-folder-body">
            <span className="archive-folder-stamp">OFFICIAL DOSSIER • VERIFIED</span>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="open-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <div className="filter-bar">
                    <input
                      className="search-input"
                      placeholder="search certificates or skills..."
                      value={query}
                      onChange={handleQueryChange}
                    />
                    <select
                      className="select-input"
                      value={issuer}
                      onChange={handleIssuerChange}
                    >
                      {issuers.map((i) => (
                        <option key={i} value={i}>{i === "All" ? "All issuers" : i}</option>
                      ))}
                    </select>
                    <span className="count-badge">{filtered.length} / {rest.length} certs</span>
                  </div>

                  {filtered.length === 0 ? (
                    <p className="empty-note">no certificates match those filters :(</p>
                  ) : (
                    <>
                      <div className="cert-grid">
                        {visibleCerts.map((c, i) => <CertCard key={c.title + i} c={c} i={i} />)}
                      </div>

                      <div className="archive-folder-footer">
                        <div className="archive-folder-footer-buttons">
                          {hasMore && (
                            <button
                              type="button"
                              className="btn-folder-more"
                              onClick={handleShowMore}
                            >
                              SHOW MORE CERTIFICATES ({Math.min(BATCH_INCREMENT, remainingCount)} MORE) ▾
                            </button>
                          )}
                          {canShowLess && (
                            <button
                              type="button"
                              className="btn-folder-less"
                              onClick={handleShowLess}
                            >
                              SHOW LESS (COLLAPSE TO 2 ROWS) ▴
                            </button>
                          )}
                        </div>
                        <span className="folder-status-note">
                          showing {visibleCerts.length} of {filtered.length} certificates
                          {hasMore ? ` (${remainingCount} more in folder)` : " (all loaded!)"}
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="closed-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="archive-folder-closed-card"
                  onClick={toggleFolder}
                >
                  <h4>📁 CERTIFICATE ARCHIVE IS COLLAPSED</h4>
                  <p>Click anywhere to open the folder & browse 2 rows at a time ({rest.length} certificates) ↗</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
