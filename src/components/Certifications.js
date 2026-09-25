"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const ISSUER_COLORS = {
  IBM: "c-blue", DataCamp: "c-green", "Harvard University": "c-red",
  Kaggle: "c-paper", Cisco: "c-paper", Simplilearn: "c-yellow",
  Forage: "c-purple", "University of Helsinki": "c-paper",
};

function CertCard({ c, pinned, i }) {
  return (
    <motion.div className={`paper cert-card${pinned ? " pinned" : ""}`}
      initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}>
      {pinned && <span className="pin-badge small">📌 PINNED</span>}
      <span className={`cert-issuer ${ISSUER_COLORS[c.issuer] || "c-paper"}`}>{c.issuer}</span>
      <h3>{c.title}</h3>
      <p className="cert-meta">
        issued <b>{c.year}</b>
        {c.credentialId && (<><br />ID: <b>{c.credentialId}</b></>)}
      </p>
      {(c.skills || []).length > 0 && (
        <div className="proj-topics">
          {c.skills.map((s) => <span key={s} className="topic">{s}</span>)}
        </div>
      )}
      {c.link && (
        <a className="cert-link" href={c.link} target="_blank" rel="noreferrer">VERIFY CREDENTIAL ↗</a>
      )}
    </motion.div>
  );
}

export default function Certifications({ certs, credlyUrl }) {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState("All");

  const pinned = useMemo(() => (certs || []).filter((c) => c.pinned), [certs]);
  const rest = useMemo(() => (certs || []).filter((c) => !c.pinned), [certs]);
  const issuers = useMemo(() => ["All", ...new Set(rest.map((c) => c.issuer))], [rest]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter((c) => {
      const matchIssuer = issuer === "All" || c.issuer === issuer;
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        (c.skills || []).some((s) => s.toLowerCase().includes(q));
      return matchIssuer && matchQuery;
    });
  }, [rest, query, issuer]);

  return (
    <section id="certificates">
      <div className="container">
        <motion.div className="section-head" initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="hand-label">always learning -</span>
          <h2 className="section-title">CERTIFICATIONS</h2>
        </motion.div>

        {credlyUrl && (
          <div style={{ marginBottom: "34px" }}>
            <a className="btn ghost" href={credlyUrl} target="_blank" rel="noreferrer">
              🏅 VERIFY ALL ON CREDLY ↗
            </a>
          </div>
        )}

        {pinned.length > 0 && (
          <>
            <h3 className="sub-head">📌 pinned by me -</h3>
            <div className="cert-grid pinned-grid">
              {pinned.map((c, i) => <CertCard key={c.title + i} c={c} pinned i={i} />)}
            </div>
          </>
        )}

        <h3 className="sub-head">all certificates ({rest.length}) -</h3>
        <div className="filter-bar">
          <input className="search-input" placeholder="search certificates or skills..."
            value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="select-input" value={issuer} onChange={(e) => setIssuer(e.target.value)}>
            {issuers.map((i) => (
              <option key={i} value={i}>{i === "All" ? "All issuers" : i}</option>
            ))}
          </select>
          <span className="count-badge">{filtered.length} / {rest.length} certs</span>
        </div>

        {filtered.length === 0 ? (
          <p className="empty-note">no certificates match those filters :(</p>
        ) : (
          <div className="cert-grid">
            {filtered.map((c, i) => <CertCard key={c.title + i} c={c} i={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}
