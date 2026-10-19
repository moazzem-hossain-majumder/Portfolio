"use client";

import { motion } from "framer-motion";

export function WashiTape({ color = "yellow", className = "", style = {} }) {
  return (
    <div
      className={`washi-tape washi-${color} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function Paperclip({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 24 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`paperclip-svg ${className}`}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M 12 4 C 6 4 4 8 4 14 L 4 36 C 4 42 7 46 13 46 C 19 46 22 42 22 36 L 22 10 C 22 6 20 2 15 2 C 10 2 8 6 8 10 L 8 34 C 8 37 10 39 12 39 C 14 39 16 37 16 34 L 16 12"
        stroke="#868e96"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 13 4 C 7 4 5 8 5 14 L 5 36"
        stroke="#f1f3f5"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleArrow({ text = "", className = "", style = {} }) {
  return (
    <div className={`doodle-arrow-wrap ${className}`} style={style} aria-hidden="true">
      <svg
        viewBox="0 0 70 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="doodle-arrow-svg"
      >
        <motion.path
          d="M 8 12 Q 35 6, 45 28 T 60 38"
          stroke="var(--ink)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
        />
        <motion.path
          d="M 52 38 L 62 39 L 58 30"
          stroke="var(--ink)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.6 }}
        />
      </svg>
      {text && <span className="doodle-arrow-text">{text}</span>}
    </div>
  );
}
