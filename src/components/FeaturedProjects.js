"use client";

import { motion } from "framer-motion";
import PencilSketchHead from "./PencilSketchHead";
import { WashiTape } from "./ScratchbookDoodles";
import StickyNotePad from "./StickyNotePad";

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
    // type "repo": pulls live stars/language/topics from GitHub for a repo you own or collaborate on
    const repoName = pin.type === "custom" ? null : pin.repo || pin.name;
    const repo = repoName
      ? (repos || []).find(
          (r) =>
            r.name === repoName ||
            (r.full_name && r.full_name.toLowerCase() === repoName.toLowerCase()) ||
            (repoName.includes("/") && r.name === repoName.split("/")[1])
        )
      : null;
    if (repoName) {
      const fallbackUrl = repoName.includes("/")
        ? `https://github.com/${repoName}`
        : `${githubUrl}/${repoName}`;
      return {
        key: repoName,
        title: pin.title || (repoName.includes("/") ? repoName.split("/")[1] : repoName),
        note: pin.note || repo?.description || "",
        link: repo?.html_url || fallbackUrl,
        demo: repo?.homepage || pin.demo || "",
        tags: (repo?.topics?.length ? repo.topics : pin.tags) || [],
        language: repo?.language || pin.language || "",
        stars: repo?.stars ?? null,
        forks: repo?.forks ?? null,
        updated: repo?.updated_at || pin.meta || "",
        isCollaborator: Boolean(pin.isCollaborator || repo?.isCollaborator),
        isPrivate: Boolean(pin.isPrivate || repo?.isPrivate),
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
      isCollaborator: Boolean(pin.isCollaborator),
      isPrivate: Boolean(pin.isPrivate),
    };
  });

  if (cards.length === 0) return null;

  const pinColors = ["#e03131", "#1971c2", "#2f9e44", "#f08c00"];

  return (
    <section id="projects">
      <div className="container">
        <PencilSketchHead
          label="hand-picked by me —"
          title="PROJECTS"
          doodle="star"
        />

        <div className="featured-grid">
          {cards.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: -36, rotateX: 14, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 14,
                delay: Math.min((i % 3) * 0.08, 0.25),
              }}
            >
              <StickyNotePad
                colorIndex={i}
                pinned={true}
                pinColor={pinColors[i % pinColors.length]}
              >
                <div className="paper featured-card">
                  <h3 className="proj-name feat-title">
                    {c.title}
                    {c.isCollaborator && (
                      <span className="chip c-blue" style={{ fontSize: "0.68rem", padding: "2px 7px" }}>
                        collaborator 🤝
                      </span>
                    )}
                    {c.isPrivate && (
                      <span className="chip c-purple" style={{ fontSize: "0.68rem", padding: "2px 7px" }}>
                        private 🔒
                      </span>
                    )}
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
                </div>
              </StickyNotePad>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
