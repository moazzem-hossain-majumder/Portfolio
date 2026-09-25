"use client";

import { motion } from "framer-motion";

const ID = (label) => label.toLowerCase().replace(/[^a-z]+/g, "-");

export default function Timeline({ label, title, items }) {
  return (
    <section id={ID(title)}>
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="hand-label">{label}</span>
          <h2 className="section-title">{title}</h2>
        </motion.div>

        <div className="timeline">
          {items.map((item, i) => (
            <motion.div
              className="tl-item"
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="paper tl-card">
                <div className="tl-top">
                  <div>
                    <h3>{item.heading}</h3>
                    <p className="tl-org">{item.org}</p>
                  </div>
                  <span className="tl-period">{item.period}</span>
                </div>
                {item.desc && <p className="tl-desc">{item.desc}</p>}
                {item.tags?.length > 0 && (
                  <div className="chips" style={{ marginTop: 14 }}>
                    {item.tags.map((t) => (
                      <span key={t} className="chip c-paper" style={{ fontSize: "0.78rem", padding: "5px 12px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
