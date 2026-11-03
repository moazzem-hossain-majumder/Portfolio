"use client";

import { motion } from "framer-motion";
import PencilSketchHead from "./PencilSketchHead";
import Console from "./Console";

export default function ConsoleSection({ profile, basics, repos, stats }) {
  return (
    <section className="console-section" id="console">
      <div className="container">
        <PencilSketchHead
          title="CONSOLE"
          doodle="sparkle"
        />

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
