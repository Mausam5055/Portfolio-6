"use client";

import React from "react";

export const SystemsSection: React.FC = () => {
  return (
<section
          className="layer"
          id="systems"
          data-bg="monsoon"
          aria-label="What I do">
          <div className="sys">
            <p className="sys-small" id="sysSmall" data-amp="3">I build</p>
            <h2 className="sys-word" id="sysWord">systems.</h2>
            <div className="kit" id="kit" aria-hidden="true">
              <div className="card" id="card">
                <em className="tag">Card / Default</em>
                <span className="bar a"></span><span className="bar b"></span>
                <span className="btn">Continue learning</span>
              </div>
              <span className="sw" style={{ background: "var(--turmeric)" }}></span>
              <span className="sw" style={{ background: "var(--hibiscus)" }}></span>
              <span className="sw" style={{ background: "#fff" }}></span>
              <span className="sw" style={{ background: "var(--backwater)" }}></span>
              <span className="sw" style={{ background: "var(--leaf)" }}></span>
            </div>
            <p className="cap" id="sysCap">
              Tokens become components. Components become products. Products
              become something a team can keep building on.
            </p>
          </div>
        </section>
  );
};
