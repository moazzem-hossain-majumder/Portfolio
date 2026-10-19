"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function Pencil3D({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 100 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pencil-3d-svg ${className}`}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <filter id="pencil-shadow" x="-10%" y="-10%" width="130%" height="150%">
          <feDropShadow dx="1.5" dy="2.5" stdDeviation="1.2" floodColor="rgba(0,0,0,0.3)" />
        </filter>
      </defs>
      <g filter="url(#pencil-shadow)">
        {/* Pink Eraser */}
        <path d="M 4 8 C 1 8 0 11 0 14 C 0 17 1 20 4 20 L 12 20 L 12 8 Z" fill="#ff8787" stroke="#1a1a1a" strokeWidth="1.2" />
        <path d="M 3 10 C 1.5 11 1.2 13 1.2 14 C 1.2 15 1.5 17 3 18" stroke="#ffa8a8" strokeWidth="1" strokeLinecap="round" />
        
        {/* Metal Ferrule */}
        <rect x="12" y="8" width="10" height="12" fill="#adb5bd" stroke="#1a1a1a" strokeWidth="1.2" />
        <line x1="15" y1="8" x2="15" y2="20" stroke="#495057" strokeWidth="1" />
        <line x1="19" y1="8" x2="19" y2="20" stroke="#495057" strokeWidth="1" />
        <line x1="13" y1="10" x2="21" y2="10" stroke="#f1f3f5" strokeWidth="0.8" />

        {/* Hexagonal Barrel - 3 Visible Facets */}
        {/* Top Facet (Light/Highlight) */}
        <polygon points="22,8 72,8 72,12 22,12" fill="#ffe066" stroke="#1a1a1a" strokeWidth="1.2" />
        {/* Middle Facet (Primary Yellow) */}
        <polygon points="22,12 72,12 72,16 22,16" fill="#ffd43b" stroke="#1a1a1a" strokeWidth="1.2" />
        {/* Bottom Facet (Shadow Tone) */}
        <polygon points="22,16 72,16 72,20 22,20" fill="#f59f00" stroke="#1a1a1a" strokeWidth="1.2" />

        {/* Sharpened Cedar Wood Cone */}
        <polygon points="72,8 88,14 72,20" fill="#ffe8cc" stroke="#1a1a1a" strokeWidth="1.2" />
        <polygon points="72,8 88,14 72,14" fill="#fff4e6" stroke="#1a1a1a" strokeWidth="1" />
        <polygon points="72,14 88,14 72,20" fill="#ffd8a8" stroke="#1a1a1a" strokeWidth="1" />

        {/* Graphite Pencil Tip */}
        <polygon points="84,12.5 96,14 84,15.5" fill="#212529" stroke="#1a1a1a" strokeWidth="1" />
        <circle cx="96" cy="14" r="1" fill="#121212" />
      </g>
    </svg>
  );
}

export default function PencilSketchHead({
  label,
  title,
  align = "left",
  doodle = "sparkle",
}) {
  const [scribbleComplete, setScribbleComplete] = useState(false);

  return (
    <motion.div
      className={`section-head pencil-head-wrap ${align === "center" ? "align-center" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => setScribbleComplete(true)}
    >
      {/* Handwritten Label with Live 3D Pencil Scribble */}
      {label && (
        <div className="pencil-hand-row">
          <div className="pencil-hand-inner">
            <span className="hand-label scribble-text">{label}</span>

            {/* The 3D Scribbling Pencil that writes the text */}
            <motion.div
              className="pencil-lead-actor"
              initial={{ x: "-30%", y: -4, rotate: -22, opacity: 0 }}
              whileInView={{
                x: ["0%", "105%", "98%"],
                y: [-4, 3, -2, 1, -1],
                rotate: [-24, -18, -26, -20],
                opacity: [0, 1, 1, 0.95],
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.1,
                ease: "easeInOut",
                times: [0, 0.85, 1],
              }}
            >
              <Pencil3D className="pencil-actor-size" />
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Block Title with Self-Drawing Scribble Underline */}
      <div className="pencil-title-row">
        <h2 className="section-title pencil-title">
          {title}
        </h2>

        {/* Hand-drawn SVG wavy underline scribbled into place */}
        <svg
          className="pencil-underline-svg"
          viewBox="0 0 320 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 4 11 Q 50 4, 110 11 T 210 10 T 316 12"
            stroke="var(--yellow)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.35, ease: "easeOut" }}
          />
          <motion.path
            d="M 8 13 Q 65 8, 140 13 T 260 11 T 312 14"
            stroke="var(--ink)"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          />
        </svg>

        {/* Cute scratchbook doodle badge on the side */}
        {doodle === "star" && (
          <motion.span
            className="pencil-doodle-star"
            initial={{ scale: 0, rotate: -40 }}
            whileInView={{ scale: 1, rotate: 12 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.6 }}
          >
            ★
          </motion.span>
        )}
        {doodle === "sparkle" && (
          <motion.span
            className="pencil-doodle-sparkle"
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.6 }}
          >
            ✦
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
