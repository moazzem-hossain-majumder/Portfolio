"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero({ basics, stats }) {
  const first = basics.name.split(" ")[0].toUpperCase();
  const rest = basics.name.split(" ").slice(1).join(" ").toUpperCase();

  return (
    <section className="hero" id="home">
      <div className="container" style={{ position: "relative" }}>
        <motion.p className="hero-eyebrow" variants={fadeUp} initial="hidden" animate="show" custom={0}>
          hello! my name is
        </motion.p>

        <motion.div className="hero-name-wrap" variants={fadeUp} initial="hidden" animate="show" custom={1}>
          <h1 className="hero-name">
            <span>{first}</span> {rest}
          </h1>
          <span className="hero-tag" style={{ background: "var(--yellow)", top: "-18px", left: "-30px", transform: "rotate(-6deg)" }}>
            AI Engineer
          </span>
          <span className="hero-tag" style={{ background: "var(--green)", top: "-14px", right: "-36px", transform: "rotate(5deg)" }}>
            Data Analyst
          </span>
          <span className="hero-tag" style={{ background: "var(--pink)", bottom: "-16px", left: "-24px", transform: "rotate(4deg)" }}>
            Python & SQL
          </span>
          <span className="hero-tag" style={{ background: "var(--blue)", bottom: "-18px", right: "-20px", transform: "rotate(-5deg)" }}>
            Machine Learning
          </span>
        </motion.div>

        <motion.div style={{ position: "absolute", left: "2%", top: "30%" }} variants={fadeUp} initial="hidden" animate="show" custom={2}>
          <Image
            className="hero-avatar"
            src={basics.photo || `https://github.com/${basics.githubUsername}.png`}
            alt={basics.name}
            width={86}
            height={86}
            style={{ position: "static", transform: "rotate(-6deg)" }}
          />
        </motion.div>
        <motion.div style={{ position: "absolute", right: "2%", top: "38%" }} variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <Image
            className="hero-avatar"
            src={basics.photo || `https://github.com/${basics.githubUsername}.png`}
            alt={basics.name}
            width={86}
            height={86}
            style={{ position: "static", transform: "rotate(7deg)" }}
          />
        </motion.div>

        <motion.h2 className="hero-sub" variants={fadeUp} initial="hidden" animate="show" custom={4}>
          I turn <span className="hl">raw data</span> into{" "}
          <span className="hl">clear decisions</span> & models into products.
        </motion.h2>

        <motion.p className="hero-desc" variants={fadeUp} initial="hidden" animate="show" custom={5}>
          {basics.headline}
          {basics.location ? ` - based in ${basics.location}.` : "."} Currently
          open to internships and entry-level roles.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6}>
          <span className="status-pill">
            <span className="status-dot" />
            OPEN TO WORK
          </span>
        </motion.div>

        <motion.div className="hero-cta" style={{ marginTop: "30px" }} variants={fadeUp} initial="hidden" animate="show" custom={7}>
          <a className="btn yellow" href={`mailto:${basics.email}`}>
            ✉ CONTACT ME
          </a>
          <a className="btn ghost" href={basics.githubUrl} target="_blank" rel="noreferrer">
            ⭐ GITHUB
          </a>
          {basics.resumeUrl && (
            <a className="btn ghost" href={basics.resumeUrl} target="_blank" rel="noreferrer">
              📄 RESUME
            </a>
          )}
        </motion.div>

        <motion.div className="stats" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } } }}>
          {[
            [stats.projects + "+", "projects built"],
            [stats.stars, "github stars"],
            [stats.certs, "certificates"],
            [stats.languages, "languages used"],
          ].map(([num, label], i) => (
            <motion.div
              key={label}
              className="paper stat-card"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ rotate: i % 2 ? 1.5 : -1.5, y: -4 }}
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
