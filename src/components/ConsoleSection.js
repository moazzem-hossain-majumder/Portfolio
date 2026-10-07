"use client";

import { motion } from "framer-motion";
import Console from "./Console";

export default function ConsoleSection({ profile, basics, repos, stats }) {
  return (
    <section className="console-section" id="console">
      <div className="container">
        <motion.div
          className="section-head"
          style={{ textAlign: "center", marginBottom: "34px" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="hand-label">interactive mechanical console —</span>
          <h2 className="section-title">THE PORTFOLIO CONSOLE</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%" }}
        >
          <Console
            displayName={basics?.name || "Moazzem Hossain"}
            profile={profile}
            basics={basics}
            repos={repos}
            stats={stats}
          />
        </motion.div>
      </div>
    </section>
  );
}
