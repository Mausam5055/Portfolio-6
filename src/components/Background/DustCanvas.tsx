"use client";

import React, { useEffect, useRef } from "react";

interface DustParticle {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  tw: number;
  c: string;
}

export const DustCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dw = 0;
    let dh = 0;
    let particles: DustParticle[] = [];
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement || document.body;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dw = parent.clientWidth;
      dh = parent.clientHeight;
      canvas.width = dw * dpr;
      canvas.height = dh * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(90, (dw * dh) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * dw,
        y: Math.random() * dh,
        r: 0.5 + Math.random() * 1.5,
        vy: 0.08 + Math.random() * 0.25,
        sway: Math.random() * Math.PI * 2,
        tw: Math.random() * Math.PI * 2,
        c: Math.random() < 0.7 ? "244,242,255" : "186,186,251",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      // Access Lenis velocity if available on window
      const lenis = (window as unknown as { __lenis?: { velocity?: number } }).__lenis;
      const rawVelocity = lenis?.velocity || 0;
      const push = Math.max(-6, Math.min(6, rawVelocity * 0.08));

      ctx.clearRect(0, 0, dw, dh);
      for (const p of particles) {
        p.sway += 0.012;
        p.tw += 0.03;
        p.y -= p.vy + push;
        p.x += Math.sin(p.sway) * 0.18;

        if (p.y < -4) {
          p.y = dh + 4;
          p.x = Math.random() * dw;
        }
        if (p.y > dh + 4) {
          p.y = -4;
          p.x = Math.random() * dw;
        }

        const alpha = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(p.tw));
        ctx.fillStyle = `rgba(${p.c},${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="dust" id="dust" aria-hidden="true" />;
};
