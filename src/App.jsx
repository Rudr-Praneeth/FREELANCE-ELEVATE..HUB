import React, { useState, useEffect } from "react";
import PageTransition from "./utils/PageTransition";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import FAQSection from "./sections/FAQSection";
import CaseStudySection from "./sections/CaseStudySection";
import ShowreelClient from "./sections/Showreel";
import LogoMarquee from "./sections/LogoMarquee";
import TextWall from "./sections/TextWall"
import FlowingText from "./sections/FlowingMenu"
import Footer from "./components/Footer"


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CredibilityHook from "./sections/CredibilityHook";
import StructuredSystem from "./sections/StructuredSystem";
import WhyUs from "./sections/WhyUs";
import ContactSection from "./sections/ContactSection";

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
          <CredibilityHook />
          <StructuredSystem />
          <ShowreelClient />
          <Stats />
          <WhyUs />
          <CaseStudySection />
          <FAQSection />
          <LogoMarquee />
          <ContactSection />
          <Footer />
        </>
      {/* )}  */}
      {/* <div className="h-screen border-b border-white"></div>
      <TextWall />
      <div className="h-screen border-t border-white"></div> */}
    </div>
  );
};

export default App;
