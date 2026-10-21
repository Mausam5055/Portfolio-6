"use client";

import React, { useState, useEffect } from "react";

export const ScreenNoticeModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const isPhone = () =>
      window.matchMedia("(max-width: 720px)").matches ||
      (window.matchMedia("(pointer: coarse)").matches &&
        Math.min(window.screen.width, window.screen.height) < 600);

    const seen = typeof window !== "undefined" && sessionStorage.getItem("phoneNoticeSeen");
    if (isPhone() && !seen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("phoneNoticeSeen", "1");
  };

  const handleCopyLink = async () => {
    const url = window.location.href.split("#")[0];
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(handleDismiss, 1100);
    } catch (_) {
      handleDismiss();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="notice show" id="notice" role="dialog" aria-labelledby="noticeTitle" aria-describedby="noticeText">
      <svg className="notice-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.5 3.2A9 9 0 1 0 20.8 16 7 7 0 0 1 15.5 3.2Z" fill="#F2C230" stroke="#000" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
      <div className="notice-body">
        <p className="notice-title" id="noticeTitle">
          Dreams look better on a bigger screen
        </p>
        <p className="notice-text" id="noticeText">
          To experience Mausam’s Lucid Dreams in its full potential, open it on a desktop browser.
        </p>
        <div className="notice-actions">
          <button type="button" id="noticeCopy" onClick={handleCopyLink}>
            {copied ? "Link copied" : "Copy link"}
          </button>
          <button type="button" id="noticeOk" className="solid" onClick={handleDismiss}>
            Continue here
          </button>
        </div>
      </div>
    </div>
  );
};
