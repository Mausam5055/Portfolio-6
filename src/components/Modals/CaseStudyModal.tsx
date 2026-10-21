"use client";

import React, { useEffect, useState, useRef } from "react";

export interface ActiveCaseStudy {
  slug: string;
  title: string;
  url: string;
  downloadUrl?: string;
}

interface CaseStudyModalProps {
  activeCase: ActiveCaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ activeCase, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isOpen = Boolean(activeCase);

  useEffect(() => {
    if (activeCase) {
      setIsLoaded(false);
      document.documentElement.classList.add("cs-lock");
      document.body.style.overflow = "hidden";

      // Safety timeout so the iframe is guaranteed to become visible
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      document.documentElement.classList.remove("cs-lock");
      document.body.style.overflow = "";
      setIsLoaded(false);
    }
  }, [activeCase]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeCase) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCase, onClose]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc && doc.head) {
        const style = doc.createElement("style");
        style.setAttribute("data-no-scrollbar", "true");
        style.textContent = `
          html, body, * {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
          *::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            background: transparent !important;
          }
        `;
        doc.head.appendChild(style);
      }
    } catch {
      // Ignore
    }
  };

  return (
    <div
      className={`cs ${isOpen ? "open" : ""} ${isLoaded ? "ready" : ""}`}
      id="cs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="csTitle"
    >
      <div className="cs-bar">
        <button className="cs-back" id="csBack" type="button" onClick={onClose}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Back to work
        </button>

        <span className="cs-title" id="csTitle">
          {activeCase?.title || "Case study"}
        </span>

        {activeCase?.downloadUrl ? (
          <a
            className="cs-back cs-dl"
            id="csDl"
            href={activeCase.downloadUrl}
            download
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
            </svg>
            Download
          </a>
        ) : (
          <a className="cs-back cs-dl" id="csDl" href="#" download hidden>
            Download
          </a>
        )}
      </div>

      <div className="cs-body">
        <div className="cs-load" aria-hidden="true">
          <i />
        </div>
        <iframe
          ref={iframeRef}
          id="csFrame"
          className={isLoaded ? "ready" : ""}
          title={activeCase?.title || "Case study"}
          src={activeCase ? activeCase.url : "about:blank"}
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );
};
