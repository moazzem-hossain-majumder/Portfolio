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
    <aside className="pencil-companion-dock" aria-label="Interactive Pencil">
      <motion.button
        type="button"
        className="pencil-companion-btn"
        onClick={handlePencilClick}
        title="Interactive Pencil"
        aria-label="Interactive Pencil"
        whileHover={{ scale: 1.12, rotate: -26 }}
        whileTap={{ scale: 0.9, rotate: -35 }}
        animate={{ rotate: tilt }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Pencil3D className="companion-pencil-art" />
      </motion.button>
    </aside>
  );
}
