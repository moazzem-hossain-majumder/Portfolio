"use client";

import { motion } from "framer-motion";
import PencilSketchHead from "./PencilSketchHead";
import { Paperclip } from "./ScratchbookDoodles";

export default function Contact({ basics }) {
  const cards = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: "EMAIL",
      value: basics.email,
      href: `mailto:${basics.email}`,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: "LINKEDIN",
      value: "in/moazzem-hossain-majumder",
      href: basics.linkedinUrl,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      label: "GITHUB",
      value: `@${basics.githubUsername}`,
      href: basics.githubUrl,
    },
    ...(basics.credlyUrl
      ? [
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            ),
            label: "CREDLY",
            value: "Verify Badges",
            href: basics.credlyUrl,
          },
        ]
      : []),
    ...(basics.resumeUrl
      ? [
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            ),
            label: "RESUME",
            value: "Download PDF",
            href: basics.resumeUrl,
          },
        ]
      : []),
  ];

  return (
    <section id="contact">
      <div className="container contact-wrap">
        <PencilSketchHead
          title="CONTACT"
          doodle="sparkle"
        />
        <div>
          <p className="contact-sub" style={{ marginTop: "-6px" }}>
            Open to engineering roles, data analyst positions, and research collaborations.
          </p>
          <a className="btn yellow" href={`mailto:${basics.email}`} style={{ marginTop: "14px", display: "inline-flex" }}>
            SEND EMAIL
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
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
                delay: i * 0.05,
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
