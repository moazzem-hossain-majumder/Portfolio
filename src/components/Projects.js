"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PencilSketchHead from "./PencilSketchHead";
import StickyNotePad from "./StickyNotePad";

const LANG_COLORS = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6",
  HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B",
  Dart: "#00B4AB", C: "#9b9b9b", "C++": "#f34b7d", Java: "#b07219",
  Shell: "#89e051", R: "#198CE7", Go: "#00ADD8",
};

const INITIAL_BATCH = 6; // 2 rows on standard desktop layout
const BATCH_INCREMENT = 6; // +2 rows each time recruiter clicks "show more"

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default function Projects({ repos, languages }) {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState("recent");
  const [isOpen, setIsOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = (repos || []).filter((r) => {
      const matchLang = lang === "All" || r.language === lang;
      const matchQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q) ||
        (r.topics || []).some((t) => t.toLowerCase().includes(q));
      return matchLang && matchQuery;
    });
    if (sort === "stars") list.sort((a, b) => b.stars - a.stars);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return list;
  }, [repos, query, lang, sort]);

  const visibleRepos = useMemo(() => {
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

  const handleLangChange = (l) => {
    setLang(l);
    setVisibleCount(INITIAL_BATCH);
    setIsOpen(true);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setVisibleCount(INITIAL_BATCH);
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
    <section id="repositories">
      <div className="container">
        <PencilSketchHead
          label="the full archive —"
          title="ALL REPOSITORIES"
          doodle="star"
        />

        {/* FOLDER FOR ALL REPOSITORIES */}
        <div className="archive-folder-wrapper" style={{ marginTop: "18px" }}>
          <div className="archive-folder-tab-bar">
            <button
              type="button"
              className={`archive-folder-tab ${!isOpen ? "tab-closed" : ""}`}
              onClick={toggleFolder}
              aria-expanded={isOpen}
            >
              <span className="archive-folder-tab-icon">{isOpen ? "📂" : "📁"}</span>
              <span>GITHUB CODEBASE VAULT</span>
              <span className="archive-folder-tab-badge">{(repos || []).length}</span>
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
            <span className="archive-folder-stamp">OPEN-SOURCE ARCHIVE</span>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="open-repos"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <div className="filter-bar">
                    <input
                      className="search-input"
                      placeholder="search repos, topics..."
                      value={query}
                      onChange={handleQueryChange}
                    />
                    <select
                      className="select-input"
                      value={sort}
                      onChange={handleSortChange}
                    >
                      <option value="recent">sort: recently updated</option>
                      <option value="stars">sort: most stars</option>
                      <option value="name">sort: name A-Z</option>
                    </select>
                    <span className="count-badge">{filtered.length} / {(repos || []).length} repos</span>
                  </div>

                  <div className="lang-pills">
                    {["All", ...languages].map((l) => (
                      <button
                        key={l}
                        type="button"
                        className={`pill ${lang === l ? "active" : ""}`}
                        onClick={() => handleLangChange(l)}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  {filtered.length === 0 ? (
                    <p className="empty-note">no repos match those filters :(</p>
                  ) : (
                    <>
                      <div className="proj-grid">
                        {visibleRepos.map((r, i) => (
                          <motion.div
                            key={r.id}
                            initial={{ opacity: 0, y: -30, rotateX: 12, scale: 0.92 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{
                              type: "spring",
                              stiffness: 160,
                              damping: 14,
                              delay: Math.min((i % 3) * 0.07, 0.22),
                            }}
                          >
                            <StickyNotePad colorIndex={i}>
                              <div className="paper proj-card">
                                <span className="proj-num">#{String(i + 1).padStart(2, "0")}</span>
                                <h3 className="proj-name">
                                  <a href={r.html_url} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                                    {r.name}
                                  </a>
                                  {r.isCollaborator && (
                                    <span
                                      className="chip c-blue"
                                      style={{ fontSize: "0.68rem", padding: "2px 7px", textDecoration: "none" }}
                                    >
                                      collaborator 🤝
                                    </span>
                                  )}
                                  {r.isPrivate && (
                                    <span
                                      className="chip c-purple"
                                      style={{ fontSize: "0.68rem", padding: "2px 7px", textDecoration: "none" }}
                                    >
                                      private 🔒
                                    </span>
                                  )}
                                  {r.homepage && (
                                    <a
                                      href={r.homepage}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="chip c-orange"
                                      style={{ fontSize: "0.7rem", padding: "3px 9px", textDecoration: "none" }}
                                    >
                                      live ↗
                                    </a>
                                  )}
                                </h3>
                                <p className="proj-desc">{r.description || "no description yet - check the repo!"}</p>
                                {(r.topics || []).length > 0 && (
                                  <div className="proj-topics">
                                    {r.topics.slice(0, 4).map((t) => <span key={t} className="topic">#{t}</span>)}
                                  </div>
                                )}
                                <div className="proj-foot">
                                  <div className="proj-stats">
                                    {r.language && (
                                      <span>
                                        <span className="dot" style={{ background: LANG_COLORS[r.language] || "var(--yellow)" }} />
                                        {r.language}
                                      </span>
                                    )}
                                    <span>★ {r.stars}</span>
                                    <span>⑂ {r.forks}</span>
                                  </div>
                                  <div>
                                    <a href={r.html_url} target="_blank" rel="noreferrer" className="proj-link">
                                      VIEW ON GITHUB ↗
                                    </a>
                                    <div className="proj-updated">updated {fmtDate(r.updated_at)}</div>
                                  </div>
                                </div>
                              </div>
                            </StickyNotePad>
                          </motion.div>
                        ))}
                      </div>

                      <div className="archive-folder-footer">
                        <div className="archive-folder-footer-buttons">
                          {hasMore && (
                            <button
                              type="button"
                              className="btn-folder-more"
                              onClick={handleShowMore}
                            >
                              SHOW MORE REPOSITORIES ({Math.min(BATCH_INCREMENT, remainingCount)} MORE) ▾
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
                          showing {visibleRepos.length} of {filtered.length} repositories
                          {hasMore ? ` (${remainingCount} more in folder)` : " (all loaded!)"}
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="closed-repos"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="archive-folder-closed-card"
                  onClick={toggleFolder}
                >
                  <h4>📁 REPOSITORY VAULT IS COLLAPSED</h4>
                  <p>Click anywhere to open the folder & browse 2 rows at a time ({(repos || []).length} repositories) ↗</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
