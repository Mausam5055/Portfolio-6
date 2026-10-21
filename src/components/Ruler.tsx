"use client";

import React from "react";

export const Ruler: React.FC = () => (
  <div className="ruler" id="ruler" aria-hidden="true">
    <div className="ticks" />
    <div className="head" id="head" />
  </div>
);
