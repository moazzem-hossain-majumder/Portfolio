"use client";

import { motion } from "framer-motion";
import PencilSketchHead from "./PencilSketchHead";
import { Paperclip } from "./ScratchbookDoodles";

export default function Contact({ basics }) {
  const cards = [
    {
      icon: "✉️",
      label: "EMAIL",
      value: basics.email,
      href: `mailto:${basics.email}`,
    },
    {
      icon: "💼",
      label: "LINKEDIN",
      value: "in/moazzem-hossain-majumder",
      href: basics.linkedinUrl,
    },
    {
      icon: "🐙",
      label: "GITHUB",
      value: `@${basics.githubUsername}`,
      href: basics.githubUrl,
    },
    ...(basics.credlyUrl
      ? [
          {
            icon: "🏅",
            label: "CREDLY",
            value: "verify all my badges",
            href: basics.credlyUrl,
          },
        ]
      : []),
  ];

  return (
    <section id="contact">
      <div className="container contact-wrap">
        <PencilSketchHead
          label="get in touch —"
          title="LET'S TALK"
          doodle="sparkle"
        />
        <div>
          <p className="contact-sub" style={{ marginTop: "-6px" }}>
            have a project, an internship, or just want to say hi? my inbox is always open! 👋
          </p>
          <a className="btn yellow" href={`mailto:${basics.email}`} style={{ marginTop: "14px", display: "inline-flex" }}>
            SAY HELLO ✉
          </a>
        </div>

        <div className="contact-cards">
          {cards.map((c, i) => (
            <motion.a
              key={c.label}
              className="paper contact-card retro-block-card"
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              initial={{ opacity: 0, y: -24, rotateX: 12, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 14,
                delay: i * 0.1,
              }}
              style={{ position: "relative" }}
            >
              <Paperclip style={{ right: "12px", top: "-10px", width: "16px", height: "34px" }} />
              <span className="contact-icon">{c.icon}</span>
              <b>{c.label}</b>
              <span>{c.value}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
