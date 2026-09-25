"use client";

import { motion } from "framer-motion";

const LANG_COLORS = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6",
  HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B",
  Dart: "#00B4AB", C: "#9b9b9b", "C++": "#f34b7d", Java: "#b07219",
  Shell: "#89e051", R: "#198CE7", Go: "#00ADD8",
};

const fmtDate = (d) => {
  if (!d) return "";
  const t = Date.parse(d);
  return isNaN(t) ? d : new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function FeaturedProjects({ pins, repos, githubUrl }) {
  const cards = (pins || []).map((pin) => {
    // type "repo": pulls live stars/language/topics from GitHub for a repo you own
    const repoName = pin.type === "custom" ? null : pin.repo || pin.name;
    const repo = repoName ? (repos || []).find((r) => r.name === repoName) : null;
    if (repoName) {
      return {
        key: repoName,
        title: repoName,
        note: pin.note || repo?.description || "",
        link: repo?.html_url || `${githubUrl}/${repoName}`,
        demo: repo?.homepage || "",
        tags: (repo?.topics?.length ? repo.topics : pin.tags) || [],
        language: repo?.language || pin.language || "",
        stars: repo?.stars ?? null,
        forks: repo?.forks ?? null,
        updated: repo?.updated_at || pin.meta || "",
      };
    }
    // type "custom": anything at all, no GitHub repo required
    return {
      key: pin.title,
      title: pin.title,
      note: pin.note || "",
      link: pin.link || "",
      demo: pin.demo || "",
      tags: pin.tags || [],
      language: pin.language || "",
      stars: null,
      forks: null,
      updated: pin.meta || "",
    };
  });

  if (cards.length === 0) return null;

  return (
    <section id="projects">
      <div className="container">
        <motion.div className="section-head" initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="hand-label">hand-picked by me -</span>
          <h2 className="section-title">PROJECTS</h2>
        </motion.div>

        <div className="featured-grid">
          {cards.map((c, i) => (
            <motion.div className="paper featured-card" key={c.key}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}>
              <span className="pin-badge">📌 PINNED</span>
              <h3 className="proj-name feat-title">
                {c.title}
                {c.demo && <span className="chip c-orange" style={{ fontSize: "0.7rem", padding: "3px 9px" }}>live ↗</span>}
              </h3>
              {c.note && <p className="feat-note">{c.note}</p>}
              {c.tags.length > 0 && (
                <div className="proj-topics">
                  {c.tags.slice(0, 5).map((t) => <span key={t} className="topic">#{t}</span>)}
                </div>
              )}
              <div className="proj-foot">
                <div className="proj-stats">
                  {c.language && (
                    <span>
                      <span className="dot" style={{ background: LANG_COLORS[c.language] || "var(--yellow)" }} />
                      {c.language}
                    </span>
                  )}
                  {c.stars !== null && <span>★ {c.stars}</span>}
                  {c.forks !== null && <span>⑂ {c.forks}</span>}
                  {fmtDate(c.updated) && <span>updated {fmtDate(c.updated)}</span>}
                </div>
                <div className="feat-links">
                  {c.link && <a className="proj-link" href={c.link} target="_blank" rel="noreferrer">VIEW ↗</a>}
                  {c.demo && <a className="proj-link" href={c.demo} target="_blank" rel="noreferrer">LIVE DEMO ↗</a>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
