import React, { useState, useEffect } from "react";
import PageTransition from "./utils/PageTransition";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import FAQSection from "./sections/FAQSection";
import CaseStudySection from "./sections/CaseStudySection";
import ShowreelClient from "./sections/Showreel";
import LogoMarquee from "./sections/LogoMarquee";
import TextWall from "./sections/TextWall"
import FlowingMenu from "./sections/FlowingMenu"
import AboutSection from "./sections/AboutSection" 

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }
  }, [loading]);

  return (
    <div className="overflow-x-hidden">
      {/* {loading && <PageTransition onComplete={() => setLoading(false)} />}

      {!loading && ( */}
        <>
          <Hero />
          <ShowreelClient />
          <Stats />
          <AboutSection />
          <CaseStudySection />
          <FAQSection />
          <LogoMarquee />
          <TextWall />
          <FlowingMenu />
        </>
      {/* )} */}
      {/* <div className="h-screen border-b border-white"></div>
      <TextWall />
      <div className="h-screen border-t border-white"></div> */}
    </div>
  );
};

export default App;
