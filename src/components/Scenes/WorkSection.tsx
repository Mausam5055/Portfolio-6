"use client";

import React from "react";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/types/portfolio";

interface WorkSectionProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onOpenCaseStudy }) => {
  return (
    <section className="layer work" id="work" data-bg="leaf" aria-label="Selected work">
      <div className="track" id="track">
        <div className="work-head">
          <h2 data-amp="9">
            <svg className="peek" id="peek" viewBox="0 0 130 70" aria-hidden="true">
              <path
                className="skin"
                d="M18 70 L18 44 Q18 8 58 8 L72 8 Q112 8 112 44 L112 70 Z"
                stroke="#000"
                strokeWidth="3"
              />
              <path
                d="M18 50 Q18 8 58 8 L72 8 Q112 8 112 48 Q104 38 94 44 Q86 32 74 40 Q64 28 52 38 Q42 30 34 42 Q24 38 18 50 Z"
                fill="#000"
              />
              <ellipse cx="50" cy="58" rx="9" ry="11" fill="#fff" stroke="#000" strokeWidth="2.5" />
              <ellipse cx="82" cy="58" rx="9" ry="11" fill="#fff" stroke="#000" strokeWidth="2.5" />
              <circle id="pl" cx="54" cy="60" r="4" fill="#000" />
              <circle id="pr" cx="86" cy="60" r="4" fill="#000" />
              <path
                className="skin"
                d="M4 70 Q4 58 14 58 Q24 58 24 70 Z M106 70 Q106 58 116 58 Q126 58 126 70 Z"
                stroke="#000"
                strokeWidth="3"
              />
            </svg>
            Selected work
          </h2>
          <p>A few things I’ve designed, shaped and shipped, from complex products to brands built from scratch.</p>
          <p className="work-more">
            There’s more where that came from. Explore the rest of my work on{" "}
            <a href="https://www.behance.net/mausamkar" target="_blank" rel="noopener">
              Behance
            </a>.
          </p>
        </div>

        {PROJECTS.map((proj) => (
          <a
            key={proj.id}
            className="proj"
            href={proj.href}
            data-case={proj.slug}
            onClick={(e) => {
              e.preventDefault();
              onOpenCaseStudy(proj);
            }}
          >
            <div className="label">
              <span>{proj.title}</span>
              <em>{proj.category}</em>
            </div>
            <div className="cover">
              <img
                src={proj.coverImage}
                alt={proj.coverAlt}
                loading="lazy"
                style={proj.coverPosition ? { objectPosition: proj.coverPosition } : undefined}
              />
            </div>
            <h3>{proj.headline}</h3>
            <p>{proj.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};
