"use client";

import React, { useEffect, useRef } from "react";

export const Tunnel: React.FC = () => {
  const tunnelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = tunnelRef.current;
    if (!el) return;

    const buildRings = () => {
      el.innerHTML = "";
      const stage = el.closest(".stage") || el.parentElement || document.body;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const D = Math.hypot(w, h);

      for (let i = 0; i < 11; i++) {
        const d = document.createElement("div");
        const size = D * Math.pow(0.8, i);
        d.style.width = size + "px";
        d.style.height = size + "px";
        d.style.left = (w - size) / 2 + "px";
        d.style.top = (h - size) / 2 + "px";
        d.style.borderRadius = "50%";
        el.appendChild(d);
      }
    };

    buildRings();
    window.addEventListener("resize", buildRings);
    return () => window.removeEventListener("resize", buildRings);
  }, []);

  return <div ref={tunnelRef} className="tunnel" id="tunnel" aria-hidden="true" />;
};
