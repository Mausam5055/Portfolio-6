"use client";

import React from "react";

export const BasedSection: React.FC = () => {
  return (
<section
          className="layer"
          id="based"
          data-bg="backwater"
          aria-label="Where I am">
          <div className="based">
            <div className="based-copy">
              <h2 className="based-text" id="basedText" data-amp="11">
                <span>Based in</span><span>Assam.</span>
              </h2>
              <div className="doodles" aria-hidden="true">
                <svg
                  className="hills"
                  viewBox="0 0 1000 120"
                  preserveAspectRatio="none">
                  <path
                    d="M0 120 L0 84 Q90 40 180 70 Q260 96 330 58 Q420 8 520 56 Q600 92 680 50 Q770 6 860 48 Q930 78 1000 60 L1000 120 Z"
                    fill="rgba(255,255,255,.05)"
                    stroke="currentColor"
                    strokeOpacity=".4"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"></path>
                  <path
                    d="M0 120 L0 100 Q140 70 260 92 Q400 116 520 86 Q680 52 820 90 Q920 112 1000 96 L1000 120 Z"
                    fill="rgba(255,255,255,.05)"
                    stroke="currentColor"
                    strokeOpacity=".28"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"></path></svg><svg
                  className="palm far"
                  viewBox="0 0 120 220"
                  style={{ left: "5%", width: "clamp(60px, 6.5vw, 96px)" }}>
                  <path
                    d="M60 220 Q50 150 66 72"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"></path>
                  <path
                    d="M66 70 Q30 48 2 82 Q34 62 64 78 Z M66 70 Q40 26 8 34 Q42 44 64 76 Z M66 70 Q82 24 116 28 Q84 44 68 76 Z M66 70 Q106 56 120 96 Q98 70 68 78 Z M66 70 Q58 30 70 4 Q76 40 70 74 Z"
                    fill="currentColor"></path>
                  <circle cx="60" cy="82" r="7" fill="currentColor"></circle>
                  <circle
                    cx="72"
                    cy="84"
                    r="7"
                    fill="currentColor"></circle></svg><svg
                  className="palm"
                  viewBox="0 0 120 220"
                  style={{ left: "76%", width: "clamp(70px, 7.5vw, 112px)" }}>
                  <path
                    d="M60 220 Q50 150 66 72"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"></path>
                  <path
                    d="M66 70 Q30 48 2 82 Q34 62 64 78 Z M66 70 Q40 26 8 34 Q42 44 64 76 Z M66 70 Q82 24 116 28 Q84 44 68 76 Z M66 70 Q106 56 120 96 Q98 70 68 78 Z M66 70 Q58 30 70 4 Q76 40 70 74 Z"
                    fill="currentColor"></path>
                  <circle cx="60" cy="82" r="7" fill="currentColor"></circle>
                  <circle
                    cx="72"
                    cy="84"
                    r="7"
                    fill="currentColor"></circle></svg><svg
                  className="palm far"
                  viewBox="0 0 120 220"
                  style={{ left: "89%", width: "clamp(50px, 5vw, 80px)" }}>
                  <path
                    d="M60 220 Q50 150 66 72"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"></path>
                  <path
                    d="M66 70 Q30 48 2 82 Q34 62 64 78 Z M66 70 Q40 26 8 34 Q42 44 64 76 Z M66 70 Q82 24 116 28 Q84 44 68 76 Z M66 70 Q106 56 120 96 Q98 70 68 78 Z M66 70 Q58 30 70 4 Q76 40 70 74 Z"
                    fill="currentColor"></path>
                  <circle cx="60" cy="82" r="7" fill="currentColor"></circle>
                  <circle
                    cx="72"
                    cy="84"
                    r="7"
                    fill="currentColor"></circle></svg><svg
                  className="cup"
                  id="cup"
                  viewBox="0 0 110 140"
                  style={{ left: "12%", width: "clamp(48px, 5vw, 76px)" }}>
                  <g id="steam">
                    <path
                      d="M42 36 Q34 24 42 12 Q50 0 42 -12 M58 34 Q50 20 58 8 Q66 -4 58 -16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"></path>
                  </g>
                  <path
                    className="skin"
                    d="M4 104 L106 104 L96 138 L14 138 Z"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinejoin="round"></path>
                  <path
                    className="skin"
                    d="M28 44 L82 44 L74 120 L36 120 Z"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinejoin="round"></path>
                  <ellipse
                    className="deep"
                    cx="55"
                    cy="44"
                    rx="27"
                    ry="6"
                    stroke="currentColor"
                    strokeWidth="3.5"></ellipse>
                </svg>
              </div>
              <div className="road" aria-hidden="true"></div>
              <div className="auto" id="auto" aria-hidden="true">
                <svg viewBox="0 0 340 232">
                  {/*  open cabin, you can see through it  */}
                  <path
                    d="M136 46 L272 46 L272 150 L136 150 Z"
                    className="thru"></path>
                  {/*  driver  */}
                  <path
                    d="M156 132 Q156 98 172 96 Q188 98 190 132 Z"
                    fill="#E9E1CF"
                    stroke="#000"
                    strokeWidth="2.5"
                    strokeLinejoin="round"></path>
                  <circle
                    className="skin"
                    cx="172"
                    cy="82"
                    r="12"
                    stroke="#000"
                    strokeWidth="2.5"></circle>
                  <path
                    d="M160 80 Q160 68 172 68 Q184 68 184 78 Q176 73 160 80 Z"
                    fill="#000"></path>
                  <path
                    d="M160 112 L134 110"
                    stroke="#000"
                    strokeWidth="4"
                    strokeLinecap="round"></path>
                  <rect
                    x="150"
                    y="130"
                    width="44"
                    height="12"
                    rx="3"
                    fill="#2B2B2B"
                    stroke="#000"
                    strokeWidth="2"></rect>
                  {/*  passenger  */}
                  <rect
                    x="222"
                    y="104"
                    width="44"
                    height="40"
                    rx="6"
                    fill="#3A3A3A"
                    stroke="#000"
                    strokeWidth="2"></rect>
                  <path
                    d="M228 140 Q228 106 244 104 Q260 106 262 140 Z"
                    fill="#C8455A"
                    stroke="#000"
                    strokeWidth="2.5"
                    strokeLinejoin="round"></path>
                  <circle
                    className="skin"
                    cx="244"
                    cy="89"
                    r="13"
                    stroke="#000"
                    strokeWidth="2.5"></circle>
                  <path
                    d="M231 88 Q230 74 244 74 Q258 74 258 88 Q258 100 262 104 L254 100 Q256 84 244 82 Q234 82 234 96 Z"
                    fill="#000"></path>
                  {/*  pillar  */}
                  <path
                    d="M206 46 L206 150"
                    stroke="#000"
                    strokeWidth="3"></path>
                  {/*  yellow canopy with the side cut open  */}
                  <path
                    d="M100 44 Q104 24 128 24 L290 24 Q328 24 328 66 L328 150 L272 150 L272 46 L136 46 L136 116 L100 116 Z"
                    fill="#F2C230"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinejoin="round"></path>
                  <path
                    d="M102 36 Q108 22 128 22 L290 22 Q330 22 330 64"
                    fill="none"
                    stroke="#000"
                    strokeWidth="8"
                    strokeLinecap="round"></path>
                  <rect
                    x="272"
                    y="130"
                    width="56"
                    height="9"
                    fill="#000"></rect>
                  {/*  windscreen  */}
                  <path
                    d="M108 46 L132 46 L132 110 L102 110 Z"
                    fill="rgba(255,255,255,.6)"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinejoin="round"></path>
                  <path
                    d="M112 54 L118 54 L110 96"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".8"></path>
                  {/*  green front face and fender  */}
                  <path
                    d="M100 110 L136 110 L136 196 L84 196 Q80 150 100 110 Z"
                    fill="#3E9B5C"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinejoin="round"></path>
                  <path
                    d="M102 116 L134 116"
                    stroke="#F2C230"
                    strokeWidth="5"></path>
                  <circle
                    cx="112"
                    cy="134"
                    r="7"
                    fill="#FFF3B0"
                    stroke="#000"
                    strokeWidth="2.5"></circle>
                  <rect
                    x="96"
                    y="146"
                    width="12"
                    height="6"
                    rx="2"
                    fill="#F08A24"
                    stroke="#000"
                    strokeWidth="1.5"></rect>
                  <path
                    d="M42 206 Q46 174 72 172 Q100 172 106 206 Z"
                    fill="#3E9B5C"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinejoin="round"></path>
                  {/*  floor board  */}
                  <rect
                    x="104"
                    y="184"
                    width="150"
                    height="12"
                    rx="3"
                    fill="#2F7A48"
                    stroke="#000"
                    strokeWidth="2.5"></rect>
                  {/*  green rear body  */}
                  <path
                    d="M150 150 L312 150 Q336 152 337 178 L337 198 Q337 206 328 206 L302 206 Q300 178 272 178 Q244 178 242 206 L150 206 Z"
                    fill="#3E9B5C"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinejoin="round"></path>
                  <path
                    d="M156 168 L236 168"
                    stroke="#2F7A48"
                    strokeWidth="3"
                    strokeLinecap="round"></path>
                  <rect
                    x="298"
                    y="160"
                    width="28"
                    height="15"
                    rx="2"
                    fill="#F2C230"
                    stroke="#000"
                    strokeWidth="2"></rect>
                  <text
                    x="312"
                    y="171"
                    transform="translate(624 0) scale(-1 1)"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="700"
                    fill="#000"
                    fontFamily="Big Shoulders, sans-serif">
                    AS 01
                  </text>
                  <rect
                    x="331"
                    y="158"
                    width="6"
                    height="12"
                    rx="2"
                    fill="#D63A3A"
                    stroke="#000"
                    strokeWidth="1.5"></rect>
                  {/*  wheels  */}
                  <g className="wheel" id="wf">
                    <circle
                      cx="72"
                      cy="206"
                      r="24"
                      fill="#111"
                      stroke="#000"
                      strokeWidth="2"></circle>
                    <circle
                      cx="72"
                      cy="206"
                      r="10"
                      fill="#BDBDBD"
                      stroke="#000"
                      strokeWidth="2"></circle>
                    <path
                      d="M72 196 L72 216 M62 206 L82 206"
                      stroke="#555"
                      strokeWidth="2.5"></path>
                  </g>
                  <g className="wheel" id="wr">
                    <circle
                      cx="272"
                      cy="206"
                      r="24"
                      fill="#111"
                      stroke="#000"
                      strokeWidth="2"></circle>
                    <circle
                      cx="272"
                      cy="206"
                      r="10"
                      fill="#BDBDBD"
                      stroke="#000"
                      strokeWidth="2"></circle>
                    <path
                      d="M272 196 L272 216 M262 206 L282 206"
                      stroke="#555"
                      strokeWidth="2.5"></path>
                  </g>
                </svg>
              </div>
              <p className="cap" id="basedCap">
                Assam at heart and address. When I’m not designing,
                you’ll probably find me chasing good food, art, music, books and
                conversations, or somewhere in the hills, enjoying rain, hugging
                trees...
              </p>
            </div>
          </div>
        </section>
  );
};
