"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header/Header";
import { DustCanvas } from "@/components/Background/DustCanvas";
import { GrainOverlay } from "@/components/Background/GrainOverlay";
import { Tunnel } from "@/components/Hero/Tunnel";
import { HeroSection } from "@/components/Hero/HeroSection";
import { HelloSection } from "@/components/Scenes/HelloSection";
import { SystemsSection } from "@/components/Scenes/SystemsSection";
import { BeliefsSection } from "@/components/Scenes/BeliefsSection";
import { BasedSection } from "@/components/Scenes/BasedSection";
import { WorkSection } from "@/components/Scenes/WorkSection";
import { AboutSection } from "@/components/Scenes/AboutSection";
import { Ruler } from "@/components/Ruler";
import { CaseStudyModal, ActiveCaseStudy } from "@/components/Modals/CaseStudyModal";
import { ScreenNoticeModal } from "@/components/Modals/ScreenNoticeModal";
import { usePortfolioExperience } from "@/hooks/usePortfolioExperience";
import { Project } from "@/types/portfolio";
import { PROJECTS } from "@/data/projects";

export default function Home() {
  const [activeCase, setActiveCase] = useState<ActiveCaseStudy | null>(null);
  const { scrollTo } = usePortfolioExperience();

  const handleOpenCaseStudy = (project: Project) => {
    setActiveCase({
      slug: project.slug,
      title: project.title,
      url: project.href,
    });
    window.location.hash = `#work/${project.slug}`;
  };

  const handleOpenResume = () => {
    setActiveCase({
      slug: "resume",
      title: "Resume · Mausam Kar",
      url: "/resume/Mausam_Kar-Resume.pdf",
      downloadUrl: "/resume/Mausam_Kar-Resume.pdf",
    });
    window.location.hash = "#resume";
  };

  const handleCloseModal = () => {
    setActiveCase(null);
    if (window.location.hash) {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#resume") {
        handleOpenResume();
      } else if (hash.startsWith("#work/")) {
        const slug = hash.replace("#work/", "");
        const proj = PROJECTS.find((p) => p.slug === slug);
        if (proj) {
          handleOpenCaseStudy(proj);
        }
      } else if (!hash) {
        setActiveCase(null);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <>
      <div className="frame">
        <div className="stage" id="stage">
          <DustCanvas />
          <GrainOverlay />
          <Header onNavigate={scrollTo} onOpenResume={handleOpenResume} />
          <Tunnel />
          <HeroSection onOpenResume={handleOpenResume} />
          <HelloSection />
          <SystemsSection />
          <BeliefsSection />
          <BasedSection />
          <WorkSection onOpenCaseStudy={handleOpenCaseStudy} />
          <AboutSection />
          <Ruler />
        </div>
      </div>

      <div className="scroll-space" id="space" />

      <ScreenNoticeModal />
      <CaseStudyModal activeCase={activeCase} onClose={handleCloseModal} />
    </>
  );
}
