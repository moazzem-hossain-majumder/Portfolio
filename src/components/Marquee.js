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
            {s.toUpperCase()} {i % 2 === 0 ? "✦" : "✿"}
          </span>
        ))}
      </div>
    </div>
  );
}
