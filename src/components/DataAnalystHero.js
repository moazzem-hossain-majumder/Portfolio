"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Pencil3D } from "./PencilSketchHead";
import RoleTrackSwitcher from "./RoleTrackSwitcher";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function DataAnalystHero({ basics }) {
  const first = basics?.name?.split(" ")[0]?.toUpperCase() || "MOAZZEM";
  const rest = basics?.name?.split(" ").slice(1).join(" ")?.toUpperCase() || "HOSSAIN";

  return (
    <section className="hero da-hero" id="home">
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", position: "relative" }}>
          <motion.p className="hero-eyebrow" variants={fadeUp} initial="hidden" animate="show" custom={0}>
            focused track dossier //
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -10, rotate: -30 }}
            animate={{ opacity: [0, 1, 1], x: [0, 15, 8], rotate: [-24, -18, -26] }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{ position: "absolute", right: -42, top: -10, pointerEvents: "none" }}
          >
            <Pencil3D style={{ width: "56px", height: "18px" }} />
          </motion.div>
        </div>

        <motion.div className="hero-name-wrap" variants={fadeUp} initial="hidden" animate="show" custom={1}>
          <h1 className="hero-name">
            <span>{first}</span> {rest}
          </h1>
          <span className="hero-tag" style={{ background: "var(--green)", top: "-18px", left: "-30px", transform: "rotate(-6deg)" }}>
            Data Analyst
          </span>
          <span className="hero-tag" style={{ background: "var(--yellow)", top: "-14px", right: "-36px", transform: "rotate(5deg)" }}>
            Excel & Modeling
          </span>
          <span className="hero-tag" style={{ background: "var(--blue)", bottom: "-16px", left: "-24px", transform: "rotate(4deg)" }}>
            MySQL & PostgreSQL
          </span>
          <span className="hero-tag" style={{ background: "var(--pink)", bottom: "-18px", right: "-20px", transform: "rotate(-5deg)" }}>
            Power BI & DAX
          </span>
        </motion.div>

        {/* Floating Avatars */}
        <motion.div style={{ position: "absolute", left: "2%", top: "25%" }} variants={fadeUp} initial="hidden" animate="show" custom={2}>
          <Image
            className="hero-avatar"
            src={basics?.photo || `https://github.com/${basics?.githubUsername || "moazzem-hossain-majumder"}.png`}
            alt={basics?.name || "Moazzem Hossain"}
            width={86}
            height={86}
            style={{ position: "static", transform: "rotate(-6deg)" }}
          />
        </motion.div>
        <motion.div style={{ position: "absolute", right: "2%", top: "32%" }} variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <Image
            className="hero-avatar"
            src={basics?.photo || `https://github.com/${basics?.githubUsername || "moazzem-hossain-majumder"}.png`}
            alt={basics?.name || "Moazzem Hossain"}
            width={86}
            height={86}
            style={{ position: "static", transform: "rotate(7deg)" }}
          />
        </motion.div>

        <motion.h2 className="hero-sub" variants={fadeUp} initial="hidden" animate="show" custom={4}>
          Transforming <span className="hl">raw datasets</span> into{" "}
          <span className="hl">commercial decisions</span>, causal insights & executive dashboards.
        </motion.h2>

        <motion.p className="hero-desc" variants={fadeUp} initial="hidden" animate="show" custom={5}>
          Specialized Data Analyst portfolio presenting comprehensive, production-grade projects
          strictly verified from my GitHub repositories. Divided into dedicated sections for{" "}
          <strong>Excel, SQL, Python, and Power BI</strong>, featuring data cleaning audits, cohort funnels,
          and empirical findings.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6}>
          <span className="status-pill">
            <span className="status-dot" />
            OPEN FOR DATA ANALYST ROLES & INTERNSHIPS
          </span>
        </motion.div>

        {/* Career Track Switcher */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={7} style={{ marginTop: "32px" }}>
          <RoleTrackSwitcher currentTrack="data-analyst" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div className="hero-cta" style={{ marginTop: "28px" }} variants={fadeUp} initial="hidden" animate="show" custom={8}>
          <a className="btn yellow" href={`mailto:${basics?.email || "moazzemhossain1510@gmail.com"}`}>
            ✉ CONTACT FOR DA ROLES
          </a>
          <a className="btn ghost" href={basics?.githubUrl || "https://github.com/moazzem-hossain-majumder"} target="_blank" rel="noreferrer">
            ⭐ GITHUB REPOS
          </a>
          {basics?.resumeUrl && (
            <a className="btn ghost" href={basics.resumeUrl} target="_blank" rel="noopener noreferrer">
              📄 RESUME ↓
            </a>
          )}
        </motion.div>

        {/* Tailored Stats */}
        <motion.div
          className="stats"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
        >
          {[
            ["8 Core", "in-depth projects built"],
            ["150K+", "records cleaned & modeled"],
            ["22 Certs", "verified credentials"],
            ["4 Stacks", "Excel • SQL • Python • BI"],
          ].map(([num, label], i) => (
            <motion.div
              key={label}
              className="paper stat-card retro-block-card"
              variants={{
                hidden: { opacity: 0, y: -24, rotateX: 14, scale: 0.9 },
                show: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 180, damping: 14 },
                },
              }}
              whileHover={{ rotate: i % 2 ? 1.5 : -1.5, y: -6 }}
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

