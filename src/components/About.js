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
          
          title="ABOUT"
          doodle="star"
        />

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
                    <span
                      key={n}
                      className="chip"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="gh-stats">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  GitHub Activity
                </span>
                <span
                  className="chip"
                  style={{ fontSize: "0.72rem", padding: "2px 8px", textTransform: "none", letterSpacing: "normal" }}
                  title="Pulse score includes private commits and collaborative repos"
                >
                  Includes private &amp; collaborator work
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
