import React, { useState, useEffect } from "react";
import RevealAnimation from "./utils/PageTransition";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import CircularImages from "./sections/CircularImages";
import FAQSection from "./sections/FAQSection";
import CaseStudySection from "./sections/CaseStudySection";
import ShowreelClient from "./sections/Showreel";
import LogoMarquee from "./sections/LogoMarquee";
import CustomScroller from "./utils/CustomScroller";
import StatsSection from "./sections/StatsSection";
import ShowcaseSection from "./sections/ShowcaseSection";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

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
      }, 50);
    }
  }, [loading]);

  return (
    <div className="overflow-x-hidden bg-bg-contrast">
      <CustomScroller />
      <NavBar />
      <Hero />
      <StatsSection />
      <CredibilityHook />
      <CaseStudySection />
      <LogoMarquee />
      <StructuredSystem />
      <ShowcaseSection />
      <ShowreelClient />
      <Stats />
      <WhyUs />
      <CircularImages />
      <FAQSection />
      <ContactSection />
      <Footer />
 
      <RevealAnimation
        isVisible={loading}
        onComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default App;