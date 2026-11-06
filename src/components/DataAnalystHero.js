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
        <motion.div className="hero-name-wrap" variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <h1 className="hero-name">
            <span className="hero-name-first">{first}</span>
            <span className="hero-name-last">{rest}</span>
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
        <motion.div style={{ position: "absolute", left: "2%", top: "25%" }} variants={fadeUp} initial="hidden" animate="show" custom={1}>
          <Image
            className="hero-avatar"
            src={basics?.photo || `https://github.com/${basics?.githubUsername || "moazzem-hossain-majumder"}.png`}
            alt={basics?.name || "Moazzem Hossain"}
            width={86}
            height={86}
            style={{ position: "static", transform: "rotate(-6deg)" }}
          />
        </motion.div>
        <motion.div style={{ position: "absolute", right: "2%", top: "32%" }} variants={fadeUp} initial="hidden" animate="show" custom={2}>
          <Image
            className="hero-avatar"
            src={basics?.photo || `https://github.com/${basics?.githubUsername || "moazzem-hossain-majumder"}.png`}
            alt={basics?.name || "Moazzem Hossain"}
            width={86}
            height={86}
            style={{ position: "static", transform: "rotate(7deg)" }}
          />
        </motion.div>

        <motion.h2 className="hero-sub" variants={fadeUp} initial="hidden" animate="show" custom={3}>
          Transforming <span className="hl">raw datasets</span> into{" "}
          <span className="hl">commercial decisions</span>, causal insights & executive dashboards.
        </motion.h2>

        <motion.p className="hero-desc" variants={fadeUp} initial="hidden" animate="show" custom={4}>
          Production case studies across Excel modeling, SQL architectures, Python EDA,
          and Power BI dashboards, strictly verified from GitHub repositories.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}>
          <span className="status-pill">
            <span className="status-dot" />
            OPEN TO WORK
          </span>
        </motion.div>

        {/* Career Track Switcher */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6} style={{ marginTop: "24px" }}>
          <RoleTrackSwitcher currentTrack="data-analyst" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div className="hero-cta" style={{ marginTop: "24px" }} variants={fadeUp} initial="hidden" animate="show" custom={7}>
          <a className="btn yellow" href={`mailto:${basics?.email || "moazzemhossain1510@gmail.com"}`}>
            ✉ CONTACT
          </a>
          <a className="btn ghost" href={basics?.githubUrl || "https://github.com/moazzem-hossain-majumder"} target="_blank" rel="noreferrer">
            ⭐ GITHUB
          </a>
          {basics?.resumeUrl && (
            <a className="btn ghost" href={basics.resumeUrl} target="_blank" rel="noopener noreferrer">
              📄 RESUME
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
            ["9", "Projects Built"],
            ["250K+", "Records Analyzed"],
            ["22", "Certifications"],
            ["5", "Core Toolsets"],
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
