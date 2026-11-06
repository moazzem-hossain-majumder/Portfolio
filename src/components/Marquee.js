"use client";

export default function Marquee({ skills }) {
  const items = (skills || [])
    .map((s) => (typeof s === "string" ? s : s.name))
    .filter(Boolean);
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((s, i) => (
          <span key={i}>
            {s.toUpperCase()} <span style={{ opacity: 0.4, margin: "0 10px" }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
