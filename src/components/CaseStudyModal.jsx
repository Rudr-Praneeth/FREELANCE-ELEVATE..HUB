import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import GoogleAdsClinicCaseStudy from "../layouts/AClinic";
import FertilityInstagramCaseStudy from "../layouts/FertilityClinic";
import GynecologistInstagramCaseStudy from "../layouts/InstaGynac";
import PamelaPhysioCaseStudy from "../layouts/DrPamela";
import MetaAdsAustraliaCaseStudy from "../layouts/ClinicMetaAds";

const layoutMap = {
  1: GoogleAdsClinicCaseStudy,
  2: FertilityInstagramCaseStudy,
  3: GynecologistInstagramCaseStudy,
  4: PamelaPhysioCaseStudy,
  5: MetaAdsAustraliaCaseStudy
};

const CaseStudyModal = ({ study, onClose }) => {
  const container = useRef();
  const content = useRef();

  const LayoutComponent = layoutMap[study.layout];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      container.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4 }
    ).fromTo(
      content.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
      "-=0.2"
    );
  });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="fixed top-8 right-8 text-[15px] text-black hover:text-accent font-extrabold z-[110]"
      >
        CLOSE
      </button>

      <div
        ref={content}
        className="min-h-screen flex items-start justify-center"
      >
        {LayoutComponent && <LayoutComponent study={study} />}
      </div>
    </div>
  );
};

export default CaseStudyModal;