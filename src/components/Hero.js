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

export default function Hero({ basics, stats }) {
  const first = basics.name.split(" ")[0].toUpperCase();
  const rest = basics.name.split(" ").slice(1).join(" ").toUpperCase();

  return (
    <section className="hero" id="home">
      <div className="container" style={{ position: "relative" }}>
        <motion.div className="hero-name-wrap" variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <h1 className="hero-name">
            <span className="hero-name-first">{first}</span>
            <span className="hero-name-last">{rest}</span>
          </h1>
          <span className="hero-tag hero-tag-tl" style={{ background: "var(--yellow)" }}>
            AI Engineer
          </span>
          <span className="hero-tag hero-tag-tr" style={{ background: "var(--green)" }}>
            Data Analyst
          </span>
          <span className="hero-tag hero-tag-bl" style={{ background: "var(--pink)" }}>
            Python &amp; SQL
          </span>
          <span className="hero-tag hero-tag-br" style={{ background: "var(--blue)" }}>
            Machine Learning
          </span>
        </motion.div>

        <motion.h2 className="hero-sub" variants={fadeUp} initial="hidden" animate="show" custom={1}>
          I turn <span className="hl">raw data</span> into{" "}
          <span className="hl">clear decisions</span> &amp; models into products.
        </motion.h2>

        <motion.p className="hero-desc" variants={fadeUp} initial="hidden" animate="show" custom={2}>
          {basics.headline}
          {basics.location ? ` - based in ${basics.location}.` : "."} Currently
          open to internships and entry-level roles.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <span className="status-pill">
            <span className="status-dot" />
            AVAILABLE FOR ROLES
          </span>
        </motion.div>

        {/* CAREER TRACK SELECTION OPTION: DATA ANALYST OR AI ENGINEER */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} style={{ marginTop: "24px" }}>
          <RoleTrackSwitcher currentTrack="main" />
        </motion.div>

        <motion.div className="hero-cta" style={{ marginTop: "24px" }} variants={fadeUp} initial="hidden" animate="show" custom={5}>
          <a className="btn yellow" href={`mailto:${basics.email}`}>
            CONTACT
          </a>
          <a className="btn ghost" href={basics.githubUrl} target="_blank" rel="noreferrer">
            GITHUB
          </a>
          {basics.resumeUrl && (
            <a className="btn ghost" href={basics.resumeUrl} target="_blank" rel="noopener noreferrer">
              RESUME
            </a>
          )}
        </motion.div>

        <motion.div
          className="stats"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
        >
          {[
            [stats.projects + "+", "projects built"],
            [stats.stars, "github stars"],
            [stats.certs, "certifications"],
            [stats.languages, "core languages"],
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
