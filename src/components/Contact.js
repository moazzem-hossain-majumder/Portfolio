"use client";

import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="hand-label">get in touch -</span>
          <h2 className="contact-big">
            LET'S <span className="hl">TALK</span>
          </h2>
          <p className="contact-sub">
            have a project, an internship, or just want to say hi? my inbox is always open! 👋
          </p>
          <a className="btn yellow" href={`mailto:${basics.email}`}>
            SAY HELLO ✉
          </a>
        </motion.div>

        <div className="contact-cards">
          {cards.map((c, i) => (
            <motion.a
              key={c.label}
              className="paper contact-card"
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
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
