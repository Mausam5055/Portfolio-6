"use client";

import React, { useState } from "react";

interface HeroSectionProps {
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("mausamkar@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (_) {}
  };

  return (
<section
          className="layer is-first"
          id="hero"
          data-bg="turmeric"
          aria-label="Introduction">
          <div className="hero-inner" id="heroInner">
            <svg
              className="birds"
              id="birds"
              viewBox="0 0 220 90"
              aria-hidden="true">
              <path className="bird" d="M10 60 Q20 48 30 58 Q40 48 50 60"></path>
              <path className="bird" d="M62 40 Q70 31 78 39 Q86 31 94 40"></path>
              <path
                className="bird"
                d="M104 58 Q111 50 118 57 Q125 50 132 58"></path>
              <path
                className="bird"
                d="M150 26 Q160 15 170 25 Q180 15 190 26"></path>
            </svg>
            <div className="hero-top">
              <p className="kicker" data-amp="7">Inside the mind of</p>
              <div className="name-wrap" id="nameWrap">
                <h1 className="name" id="name">
                  <span>Mausam</span> <span>Kar</span>
                </h1>
                <div className="sel" id="sel" aria-hidden="true">
                  <span></span><span></span><span></span><span></span>
                </div>
                <em className="dim" id="dim" aria-hidden="true">0 × 0</em>
              </div>
              <p className="phrase" id="phrase" aria-label="Designing experiences">
                <span aria-hidden="true">Designing</span><span aria-hidden="true">Experiences</span>
              </p>
            </div>
            <div className="me" id="me">
              <svg
                className="me-svg"
                id="meSvg"
                viewBox="0 0 640 600"
                aria-hidden="true">
                {/*  waving arm, behind the body  */}
                <g id="arm">
                  <path
                    d="M168 470 Q84 430 92 316"
                    fill="none"
                    stroke="#000"
                    strokeWidth="62"
                    strokeLinecap="round"></path>
                  <g id="hand">
                    <path
                      className="skin"
                      d="M66 318 Q58 282 66 250 Q70 238 80 242 Q84 246 84 262 L86 226 Q88 214 98 214 Q108 214 108 226 L108 258 L112 222 Q114 212 124 213 Q133 215 132 227 L128 264 L136 238 Q140 228 149 231 Q156 235 153 247 L142 300 Q156 290 166 294 Q174 300 166 312 Q146 336 124 344 Q88 352 66 318 Z"
                      stroke="#000"
                      strokeWidth="3"
                      strokeLinejoin="round"></path>
                  </g>
                </g>
                {/*  body  */}
                <path
                  d="M20 600 C24 492 110 440 226 430 L414 430 C530 440 616 492 620 600 Z"
                  fill="#000"></path>
                {/*  neck  */}
                <path
                  className="skin"
                  d="M284 360 L356 360 L358 430 Q320 478 282 430 Z"
                  stroke="#000"
                  strokeWidth="3"
                  strokeLinejoin="round"></path>
                {/*  ears  */}
                <ellipse
                  className="skin"
                  cx="203"
                  cy="296"
                  rx="15"
                  ry="24"
                  stroke="#000"
                  strokeWidth="3"></ellipse>
                <ellipse
                  className="skin"
                  cx="437"
                  cy="296"
                  rx="15"
                  ry="24"
                  stroke="#000"
                  strokeWidth="3"></ellipse>
                {/*  lower head  */}
                <path
                  className="skin"
                  d="M204 232 L436 232 L436 326 Q436 398 368 398 L272 398 Q204 398 204 326 Z"
                  stroke="#000"
                  strokeWidth="3"
                  strokeLinejoin="round"></path>
                {/*  the open mind  */}
                <ellipse
                  id="cavity"
                  className="deep"
                  cx="320"
                  cy="232"
                  rx="116"
                  ry="13"
                  stroke="#000"
                  strokeWidth="3"></ellipse>
                <g id="rings" style={{ opacity: "0" }}>
                  <ellipse
                    cx="320"
                    cy="232"
                    rx="92"
                    ry="15"
                    fill="rgba(0,0,0,.18)"
                    stroke="rgba(0,0,0,.75)"
                    strokeWidth="2"></ellipse>
                  <ellipse
                    cx="320"
                    cy="232"
                    rx="68"
                    ry="11"
                    fill="rgba(0,0,0,.2)"
                    stroke="rgba(0,0,0,.75)"
                    strokeWidth="2"></ellipse>
                  <ellipse
                    cx="320"
                    cy="232"
                    rx="46"
                    ry="7.5"
                    fill="rgba(0,0,0,.22)"
                    stroke="rgba(0,0,0,.75)"
                    strokeWidth="2"></ellipse>
                  <ellipse
                    cx="320"
                    cy="232"
                    rx="26"
                    ry="4.4"
                    fill="rgba(0,0,0,.25)"
                    stroke="rgba(0,0,0,.75)"
                    strokeWidth="1.6"></ellipse>
                  <ellipse
                    cx="320"
                    cy="232"
                    rx="10"
                    ry="1.8"
                    fill="rgba(0,0,0,.4)"
                    stroke="rgba(0,0,0,.75)"
                    strokeWidth="1.2"></ellipse>
                </g>
                {/*  face  */}
                <path
                  d="M252 270 Q274 256 296 266 M344 266 Q366 256 388 270"
                  fill="none"
                  stroke="#000"
                  strokeWidth="5"
                  strokeLinecap="round"></path>
                <ellipse
                  className="eye"
                  cx="276"
                  cy="290"
                  rx="17"
                  ry="21"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="3"></ellipse>
                <ellipse
                  className="eye"
                  cx="364"
                  cy="290"
                  rx="17"
                  ry="21"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="3"></ellipse>
                <circle
                  className="pupil"
                  cx="282"
                  cy="280"
                  r="7.5"
                  fill="#000"></circle>
                <circle
                  className="pupil"
                  cx="370"
                  cy="280"
                  r="7.5"
                  fill="#000"></circle>
                <path
                  d="M322 298 Q310 322 328 324"
                  fill="none"
                  stroke="#000"
                  strokeWidth="3.5"
                  strokeLinecap="round"></path>
                <path
                  d="M288 340 Q320 388 352 340 Q320 350 288 340 Z"
                  fill="#000"
                  stroke="#000"
                  strokeWidth="3"
                  strokeLinejoin="round"></path>
                <path
                  className="skin"
                  d="M306 362 Q320 354 334 362 Q320 374 306 362 Z"></path>
                {/*  thoughts escaping  */}
                <g id="thoughts">
                  <g className="th">
                    <circle
                      cx="400"
                      cy="186"
                      r="15"
                      fill="#E2527F"
                      stroke="#000"
                      strokeWidth="3"></circle>
                  </g>
                  <g className="th">
                    <circle
                      cx="452"
                      cy="146"
                      r="19"
                      fill="#6477DB"
                      stroke="#000"
                      strokeWidth="3"></circle>
                  </g>
                  <g className="th">
                    <circle
                      cx="420"
                      cy="100"
                      r="12"
                      fill="#fff"
                      stroke="#000"
                      strokeWidth="3"></circle>
                  </g>
                  <g className="th">
                    <path
                      d="M500 88 L518 116 L512 132 L488 132 L482 116 Z"
                      fill="#fff"
                      stroke="#000"
                      strokeWidth="3"
                      strokeLinejoin="round"></path>
                    <path
                      d="M500 88 L500 112"
                      stroke="#000"
                      strokeWidth="2.5"></path>
                    <circle cx="500" cy="115" r="4" fill="#000"></circle>
                    <rect
                      x="486"
                      y="132"
                      width="28"
                      height="8"
                      rx="2"
                      fill="#000"></rect>
                  </g>
                  <g className="th">
                    <path
                      d="M470 52 Q500 30 532 44 Q504 70 470 52 Z"
                      fill="#5AA84F"
                      stroke="#000"
                      strokeWidth="3"
                      strokeLinejoin="round"></path>
                    <path
                      d="M474 52 Q502 46 528 45"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"></path>
                  </g>
                  <g className="th">
                    <path
                      d="M540 118 Q542 130 554 132 Q542 134 540 146 Q538 134 526 132 Q538 130 540 118 Z"
                      fill="#000"></path>
                  </g>
                </g>
                {/*  the lid, hinged at the left  */}
                <g id="lid">
                  <path
                    className="skin"
                    d="M204 232 L204 200 Q204 142 266 142 L374 142 Q436 142 436 200 L436 232 Z"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinejoin="round"></path>
                  <path
                    d="M204 212 Q204 142 266 142 L374 142 Q436 142 436 206 Q424 190 408 200 Q396 180 376 194 Q360 174 340 190 Q322 172 304 188 Q286 174 270 192 Q250 180 238 200 Q220 192 204 212 Z"
                    fill="#000"></path>
                </g>
              </svg>

              <div
                className="dream"
                id="dream"
                aria-label="You've been dreaming in Mausam's Lucid Dreams">
                <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15.5 3.2A9 9 0 1 0 20.8 16 7 7 0 0 1 15.5 3.2Z"
                    fill="#F2C230"
                    stroke="#000"
                    strokeWidth="1.8"
                    strokeLinejoin="round"></path></svg><span aria-hidden="true"><small>You’ve been dreaming in</small><b>Mausam’s Lucid Dreams</b></span>
              </div>
              <div className="shirt">
                <p className="role" id="role">
                  <span className="role-title">Product Designer &amp; Art Director</span>
                  I design &amp; build experiences that you wish existed
                </p>
                <p className="hint-m" id="hintM" aria-hidden="true">
                  <span>Scroll to step inside</span>
                </p>
                <div className="contact" id="contact">
                  <h2 data-amp="5">Get in touch</h2>
                  <div className="links">
                    <span className="mail-wrap"><a
                        className="primary"
                        id="mail"
                        href="mailto:mausamkar@gmail.com">mausamkar@gmail.com</a><button
                        className={`copy${copied ? " is-copied" : ""}`}
                        id="copyMail"
                        type="button"
                        onClick={handleCopyEmail}
                        data-copy="mausamkar@gmail.com"
                        aria-label="Copy email address">
                        <svg
                          className="i-copy"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true">
                          <rect
                            x="8.5"
                            y="8.5"
                            width="12"
                            height="12"
                            rx="2.5"></rect>
                          <path
                            d="M15.5 8.5V6A2.5 2.5 0 0 0 13 3.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"></path></svg><svg
                          className="i-done"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true">
                          <path d="M4.5 12.5l5 5 10-11"></path></svg><span className="copy-tip" aria-hidden="true">Copied</span></button><span
                        className="sr-only"
                        id="copyStatus"
                        aria-live="polite">{copied ? "Email address copied to clipboard" : ""}</span></span>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener">LinkedIn</a>
                    <a
                      href="https://www.behance.net/"
                      target="_blank"
                      rel="noopener">Behance</a>
                    <a
                      href="/resume/Mausam_Kar-Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (onOpenResume) {
                          e.preventDefault();
                          onOpenResume();
                        }
                      }}
                      data-case="resume"
                      data-hash="#resume"
                      data-title="Resume"
                      data-back="Back"
                      data-download="Mausam_Kar-Resume.pdf">Resume</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="cursor" id="cursor" aria-hidden="true">
              <svg viewBox="0 0 22 24">
                <path
                  d="M2 2 L2 20 L7 15.5 L10.5 22.5 L13.5 21 L10 14 L17 14 Z"
                  fill="#0A6FC2"
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeLinejoin="round"></path>
              </svg>
              <b id="cursorLabel">Mausam</b>
            </div>
          </div>
          <div className="hint" id="hint" aria-hidden="true">
            <span>Scroll to step inside</span><span className="line"></span>
          </div>
        </section>
  );
};
