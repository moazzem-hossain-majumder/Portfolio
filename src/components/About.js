"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="hand-label">about me!</span>
          <h2 className="section-title">WHAT'S UP</h2>
        </motion.div>

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
              <span className="hand" style={{ display: "block", marginBottom: "10px" }}>
                my github pulse -
              </span>
              <div className="gh-stats-imgs">
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${basics.githubUsername}&show_icons=true&hide_border=true&bg_color=00000000&title_color=ffd43b&text_color=currentColor&icon_color=74c0fc`}
                  alt="GitHub stats"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${basics.githubUsername}&layout=compact&hide_border=true&bg_color=00000000&title_color=ffd43b&text_color=currentColor`}
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
