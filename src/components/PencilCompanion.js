"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useVelocity } from "framer-motion";
import { Pencil3D } from "./PencilSketchHead";

export default function PencilCompanion() {
  const [activeDoodle, setActiveDoodle] = useState(false);
  const [doodleCount, setDoodleCount] = useState(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [tilt, setTilt] = useState(-15);

  useEffect(() => {
    return scrollVelocity.on("change", (latest) => {
      // Map scroll velocity to subtle pencil tilt
      if (Math.abs(latest) > 50) {
        const angle = latest > 0 ? -28 : -8;
        setTilt(angle);
      } else {
        setTilt(-18);
      }
    });
  }, [scrollVelocity]);

  const handlePencilClick = () => {
    setActiveDoodle(true);
    setDoodleCount((prev) => prev + 1);
    setTimeout(() => setActiveDoodle(false), 1400);
  };

  return (
    <aside className="pencil-companion-dock" aria-label="Scratchbook Pencil Companion">
      <motion.button
        type="button"
        className="pencil-companion-btn"
        onClick={handlePencilClick}
        title="Click to scribble in your scratchbook!"
        aria-label="Interactive 3D Pencil"
        whileHover={{ scale: 1.12, rotate: -26 }}
        whileTap={{ scale: 0.9, rotate: -35 }}
        animate={{ rotate: tilt }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Pencil3D className="companion-pencil-art" />
        <span className="pencil-companion-badge">
          {activeDoodle ? "✏️ scribble!" : "✏️ notes"}
        </span>
      </motion.button>

      {/* Floating graphite scribble bubble when clicked */}
      {activeDoodle && (
        <motion.div
          className="pencil-scribble-pop"
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: -20 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.35 }}
        >
          <span>✍️ sketched #{doodleCount}!</span>
        </motion.div>
      )}
    </aside>
  );
}
