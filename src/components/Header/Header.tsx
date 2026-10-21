"use client";

import React from "react";
import { SoundButton } from "./SoundButton";

interface HeaderProps {
  onNavigate?: (targetId: string) => void;
  onOpenResume?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const handleScroll = (targetId: string) => {
    if (onNavigate) {
      onNavigate(targetId);
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="top">
      <div
        className="brand"
        onClick={() => handleScroll("stage")}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
      >
        <span className="who">Mausam Kar</span>
        <span className="status">
          <i aria-hidden="true" />
          Open to roles and freelance
        </span>
      </div>

      <nav className="nav" aria-label="Sections">
        <SoundButton />
        <button type="button" data-go="work" onClick={() => handleScroll("work")}>
          Work
        </button>
        <button type="button" data-go="about" onClick={() => handleScroll("about")}>
          About
        </button>
        <button type="button" data-go="contact" onClick={() => handleScroll("contact")}>
          Contact
        </button>
      </nav>
    </header>
  );
};
