"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PencilSketchHead from "./PencilSketchHead";
import { DoodleArrow } from "./ScratchbookDoodles";

const CHIP_COLORS = ["c-yellow", "c-pink", "c-green", "c-blue", "c-orange", "c-purple"];

export default function About({ basics, skills }) {
  const groups = {};
  (skills || []).forEach((s) => {
    const cat = s.category || "Other";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(s.name);
  });

  return (
    <section id="about">
      <div className="container">
        <PencilSketchHead
          label="about me!"
          title="WHAT'S UP"
          doodle="star"
        />

        <div className="about-grid">
          <motion.figure
            className="paper about-photo tape"
            initial={{ opacity: 0, x: -40, rotate: -6 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <Image
              src={basics.photo || `https://github.com/${basics.githubUsername}.png`}
              alt={basics.name}
              width={320}
              height={320}
            />
            <figcaption>it's me!</figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-text">
              <span className="hand">I'm an aspiring AI Engineer & Data Analyst...</span>
              who gets a little too excited about finding stories hidden inside
              messy datasets. I care about writing clean Python, asking the right
              questions before touching the data, and shipping analysis that
              people can actually act on - not just charts that look pretty. ✨
            </div>

            {Object.entries(groups).map(([cat, names], gi) => (
              <div className="skill-group" key={cat}>
                <h4>{cat.toLowerCase()} -</h4>
                <div className="chips">
                  {names.map((n, i) => (
                    <motion.span
                      key={n}
                      className={`chip ${CHIP_COLORS[(gi + i) % CHIP_COLORS.length]}`}
                      style={{ "--rot": `${((i % 3) - 1) * 1.6}deg` }}
                      whileHover={{ scale: 1.1, rotate: 0 }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {n}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}

            <div className="gh-stats">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                <span className="hand" style={{ display: "block" }}>
                  my github pulse -
                </span>
                <span
                  className="chip c-green"
                  style={{ fontSize: "0.72rem", padding: "2px 8px", textTransform: "none", letterSpacing: "normal" }}
                  title="Pulse score includes private commits & collaborative repos"
                >
                  ✓ includes private & collaborator work
                </span>
              </div>
              <div className="gh-stats-imgs">
                <img
                  src={`${basics.githubStatsBaseUrl || "https://github-readme-stats.vercel.app/api"}?username=${basics.githubUsername}&show_icons=true&hide_border=true&count_private=true&bg_color=00000000&title_color=ffd43b&text_color=currentColor&icon_color=74c0fc`}
                  alt="GitHub stats"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <img
                  src={`${basics.githubStatsBaseUrl || "https://github-readme-stats.vercel.app/api"}/top-langs/?username=${basics.githubUsername}&layout=compact&hide_border=true&count_private=true&bg_color=00000000&title_color=ffd43b&text_color=currentColor`}
                  alt="Top languages"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
