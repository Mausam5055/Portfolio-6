"use client";

import React from "react";

export const AboutSection: React.FC = () => {
  return (
<section className="layer" id="about" data-bg="kokum" aria-label="About">
          <div className="about-inner" style={{ position: "relative" }}>
            <svg
              className="plane"
              id="plane"
              style={{ color: "var(--fg)" }}
              viewBox="0 0 260 110"
              aria-hidden="true">
              <path
                id="trail"
                d="M4 100 Q50 30 96 76 Q128 106 150 70 Q164 46 188 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeDasharray="7 9"
                strokeLinecap="round"></path>
              <g id="planeBody">
                <path
                  d="M196 36 L256 6 L226 66 L214 48 Z"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"></path>
                <path d="M214 48 L256 6 L206 56 Z" fill="#000"></path>
              </g>
            </svg>
            <h2 className="st" id="aboutSt">
              <span><i>I care about the details</i></span>
              <span><i>that make a product</i></span>
              <span><i>feel like itself.</i></span>
            </h2>
            <p className="about-sub" id="aboutSub">
              The flows, the edge cases, the tiny interactions, the pixels, the
              moments nobody thought to design. I like getting into the weeds,
              because that’s often where the experience comes alive.
            </p>
            <dl className="facts" id="facts">
              <div>
                <dt>Now</dt>
                <dd>5x Hackathon Winner</dd>
              </div>
              <div>
                <dt>Also</dt>
                <dd>Ex Intern at FOSSEE IIT Bombay</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>
                  3+ years across product, UX, visual design, systems &amp;
                  strategy
                </dd>
              </div>
            </dl>
            <div className="tools" id="tools" aria-label="Tools">
              <span>Figma</span><span>Illustrator</span><span>Claude</span><span>ChatGPT</span><span>VS Code</span><span>GitHub</span><span>Shopify</span><span>Framer</span><span>Photoshop</span><span>After Effects</span><span>Premiere Pro</span>
            </div>
            <div className="more" id="more" style={{ display: "none" }} />
          </div>
        </section>
  );
};
