"use client";

import React from "react";
import { useBackgroundAudio } from "@/hooks/useBackgroundAudio";

export const SoundButton: React.FC = () => {
  const { isPlaying, isInvite, isNudge, toggle } = useBackgroundAudio();

  return (
    <button
      className={`sound ${isPlaying ? "on" : ""} ${isInvite ? "invite" : ""} ${isNudge ? "nudge" : ""}`}
      id="sound"
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      aria-pressed={isPlaying ? "true" : "false"}
      aria-label={isPlaying ? "Turn background music off" : "Turn background music on"}
    >
      <span className="bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="sound-label">{isPlaying ? "Sound on" : "Sound off"}</span>
      <span className="sound-hint" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path
            d="M9 17.5V5.5l10-2v12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6.5" cy="17.5" r="2.6" fill="currentColor" />
          <circle cx="16.5" cy="15.5" r="2.6" fill="currentColor" />
        </svg>
        <span className="hint-click">Click for sound</span>
        <span className="hint-tap">Tap for sound</span>
      </span>
    </button>
  );
};
