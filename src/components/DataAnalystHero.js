"use client";

import { motion } from "framer-motion";
import RoleTrackSwitcher from "./RoleTrackSwitcher";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.25, ease: "easeOut" },
  }),
};

export default function DataAnalystHero({ basics }) {
  const first = basics?.name?.split(" ")[0]?.toUpperCase() || "MOAZZEM";
  const rest = basics?.name?.split(" ").slice(1).join(" ")?.toUpperCase() || "HOSSAIN";

  return (
    <section className="hero da-hero" id="home">
      <div className="container" style={{ position: "relative" }}>
        <motion.div className="hero-name-wrap" variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <h1 className="hero-name">
            <span className="hero-name-first">{first}</span>
            <span className="hero-name-last">{rest}</span>
          </h1>
          <span className="hero-tag hero-tag-tl" style={{ background: "var(--yellow)" }}>
            Excel &amp; Modeling
          </span>
          <span className="hero-tag hero-tag-tr" style={{ background: "var(--green)" }}>
            Data Analyst
          </span>
          <span className="hero-tag hero-tag-bl" style={{ background: "var(--blue)" }}>
            MySQL &amp; PostgreSQL
          </span>
          <span className="hero-tag hero-tag-br" style={{ background: "var(--pink)" }}>
            Power BI &amp; DAX
          </span>
        </motion.div>

        <motion.h2 className="hero-sub" variants={fadeUp} initial="hidden" animate="show" custom={1}>
          Transforming <span className="hl">raw datasets</span> into{" "}
          <span className="hl">commercial decisions</span>, causal insights &amp; executive dashboards.
        </motion.h2>

        <motion.p className="hero-desc" variants={fadeUp} initial="hidden" animate="show" custom={2}>
          Specialized Data Analyst track featuring 9 end-to-end case studies across SQL warehouse architecture,
          multivariable logistic regression, dynamic headcount capacity planning, and Power BI dashboards.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <span className="status-pill">
            <span className="status-dot" />
            AVAILABLE FOR DATA ANALYST ROLES
          </span>
        </motion.div>

        {/* Career Track Switcher */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} style={{ marginTop: "24px" }}>
          <RoleTrackSwitcher currentTrack="data-analyst" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div className="hero-cta" style={{ marginTop: "24px" }} variants={fadeUp} initial="hidden" animate="show" custom={5}>
          <a className="btn yellow" href={`mailto:${basics?.email || "moazzemhossain1510@gmail.com"}`}>
            CONTACT
          </a>
          <a className="btn ghost" href={basics?.githubUrl || "https://github.com/moazzem-hossain-majumder"} target="_blank" rel="noreferrer">
            GITHUB
          </a>
          {basics?.resumeUrl && (
            <a className="btn ghost" href={basics.resumeUrl} target="_blank" rel="noopener noreferrer">
              RESUME
            </a>
          )}
        </motion.div>

        {/* Tailored Stats */}
        <motion.div
          className="stats"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
        >
          {[
            ["9", "case studies built"],
            ["250K+", "records analyzed"],
            ["22", "certifications"],
            ["5", "core analytics stacks"],
          ].map(([num, label]) => (
            <motion.div
              key={label}
              className="paper stat-card retro-block-card"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
              }}
            >
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
