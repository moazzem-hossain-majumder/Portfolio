"use client";

import { useEffect, useRef } from "react";

export default function AmbientParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create 26 atmospheric embers / fireflies
    const particleCount = Math.min(28, Math.floor(width / 50));
    const particles = [];
    const colors = [
      "rgba(250, 204, 21, ", // Warm gold
      "rgba(245, 158, 11, ", // Amber
      "rgba(244, 63, 94, ",  // Coral rose
      "rgba(168, 85, 247, ", // Violet twilight
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.45 + 0.15,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI,
      });
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.pulseVal));

        // Draw soft glowing orb
        const glowRad = p.radius * 3.5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRad);
        grad.addColorStop(0, `${p.color}${currentAlpha})`);
        grad.addColorStop(0.5, `${p.color}${currentAlpha * 0.4})`);
        grad.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRad, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(1, currentAlpha * 1.6)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-particles-canvas"
      aria-hidden="true"
    />
  );
}

