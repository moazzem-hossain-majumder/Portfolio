"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PencilSketchHead from "./PencilSketchHead";

export default function About({ basics, skills, stats, repos }) {
  const groups = {};
  (skills || []).forEach((s) => {
    const cat = s.category || "Other";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(s.name);
  });

  // Calculate top languages from real GitHub repos
  const langCounts = {};
  (repos || []).forEach((r) => {
    if (r.language) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
  });
  const totalLangCount = Object.values(langCounts).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, count]) => ({
      name: lang,
      count,
      pct: Math.round((count / (totalLangCount || 1)) * 100),
    }));

  return (
    <section id="about">
      <div className="container">
        <PencilSketchHead title="ABOUT" doodle="star" />

        <div className="about-grid">
          <motion.figure
            className="paper about-photo tape"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Image
              src={basics.photo || `https://github.com/${basics.githubUsername}.png`}
              alt={basics.name}
              width={320}
              height={320}
            />
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="about-text">
              Specialized in applied machine learning engineering and data analytics. Focused on writing
              deterministic Python pipelines, normalized relational database schemas (MySQL, PostgreSQL, SQLite),
              and reproducible statistical models that isolate causal business drivers.
            </div>

            {Object.entries(groups).map(([cat, names]) => (
              <div className="skill-group" key={cat}>
                <h4>{cat.toLowerCase()}</h4>
                <div className="chips">
                  {names.map((n) => (
                    <span key={n} className="chip">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* GUARANTEED NATIVE & RELIABLE GITHUB ACTIVITY DASHBOARD */}
            <div className="gh-stats">
              <div className="gh-stats-header">
                <div className="gh-stats-title-group">
                  <span className="gh-stats-title">GITHUB ACTIVITY</span>
                  <a
                    href={basics.githubUrl || `https://github.com/${basics.githubUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="gh-stats-sub-link"
                  >
                    @{basics.githubUsername} ↗
                  </a>
                </div>
                <span
                  className="chip gh-private-chip"
                  title="Pulse score includes private commits and collaborative repos"
                >
                  Includes private &amp; collaborator work
                </span>
              </div>

              {/* Verified Metrics Counter Cards */}
              <div className="gh-metrics-grid">
                <div className="gh-metric-item">
                  <span className="gh-metric-val">{stats?.projects || 40}+</span>
                  <span className="gh-metric-lbl">Repositories</span>
                </div>
                <div className="gh-metric-item">
                  <span className="gh-metric-val">{stats?.stars || 15}</span>
                  <span className="gh-metric-lbl">GitHub Stars</span>
                </div>
                <div className="gh-metric-item">
                  <span className="gh-metric-val">{stats?.languages || 10}+</span>
                  <span className="gh-metric-lbl">Core Stacks</span>
                </div>
                <div className="gh-metric-item">
                  <span className="gh-metric-val">100%</span>
                  <span className="gh-metric-lbl">Verified Audits</span>
                </div>
              </div>

              {/* Language Distribution Progress Bar */}
              {topLanguages.length > 0 && (
                <div className="gh-lang-breakdown">
                  <div className="gh-lang-bar">
                    {topLanguages.map((l, i) => (
                      <div
                        key={l.name}
                        className={`gh-lang-segment seg-${i}`}
                        style={{ width: `${Math.max(l.pct, 4)}%` }}
                        title={`${l.name}: ${l.pct}%`}
                      />
                    ))}
                  </div>
                  <div className="gh-lang-labels">
                    {topLanguages.map((l, i) => (
                      <span key={l.name} className="gh-lang-pill">
                        <span className={`gh-lang-dot dot-${i}`} />
                        {l.name} <strong>{l.pct}%</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Real Contribution Heatmap Calendar */}
              <div className="gh-stats-cards-wrap">
                <a
                  href={basics.githubUrl || `https://github.com/${basics.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="gh-chart-card"
                  title="View full GitHub profile and contribution history"
                >
                  <div className="gh-chart-card-top">
                    <span className="gh-chart-title">CONTRIBUTION CALENDAR</span>
                    <span className="gh-chart-link-hint">github.com/{basics.githubUsername} ↗</span>
                  </div>
                  <div className="gh-heatmap-overflow">
                    <img
                      src={`https://ghchart.rshah.org/ffd43b/${basics.githubUsername}`}
                      alt="GitHub Contributions Heatmap"
                      loading="lazy"
                      className="gh-heatmap-img"
                    />
                  </div>
                </a>

                {/* Streak & Consistency Card */}
                <div className="gh-streak-card">
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${basics.githubUsername}&theme=dark&background=1d1d1d&ring=ffd43b&fire=ffd43b&currStreakNum=ffd43b&sideNums=f2efe6&sideLabels=a6a6a6&dates=a6a6a6&border=333333&hide_border=true`}
                    alt="GitHub Streak Stats"
                    loading="lazy"
                    className="gh-streak-img"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
