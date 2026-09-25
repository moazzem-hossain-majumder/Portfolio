"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const LANG_COLORS = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6",
  HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B",
  Dart: "#00B4AB", C: "#9b9b9b", "C++": "#f34b7d", Java: "#b07219",
  Shell: "#89e051", R: "#198CE7", Go: "#00ADD8",
};

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default function Projects({ repos, languages }) {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState("recent");

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

  return (
    <section id="repositories">
      <div className="container">
        <motion.div className="section-head" initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="hand-label">the full archive -</span>
          <h2 className="section-title">ALL REPOSITORIES</h2>
        </motion.div>

        <div className="filter-bar">
          <input className="search-input" placeholder="search repos, topics..."
            value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="select-input" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">sort: recently updated</option>
            <option value="stars">sort: most stars</option>
            <option value="name">sort: name A-Z</option>
          </select>
          <span className="count-badge">{filtered.length} / {repos.length} repos</span>
        </div>

        <div className="lang-pills">
          {["All", ...languages].map((l) => (
            <button key={l} className={`pill ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>
              {l}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="empty-note">no repos match those filters :(</p>
        ) : (
          <div className="proj-grid">
            {filtered.map((r, i) => (
              <motion.a href={r.html_url} target="_blank" rel="noreferrer"
                className="paper proj-card" key={r.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}>
                <span className="proj-num">#{String(i + 1).padStart(2, "0")}</span>
                <h3 className="proj-name">
                  {r.name}
                  {r.homepage && (
                    <span className="chip c-orange" style={{ fontSize: "0.7rem", padding: "3px 9px" }}>live ↗</span>
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
                    <span className="proj-link">VIEW ON GITHUB ↗</span>
                    <div className="proj-updated">updated {fmtDate(r.updated_at)}</div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
