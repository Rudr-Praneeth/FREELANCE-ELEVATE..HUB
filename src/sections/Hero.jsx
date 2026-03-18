import React from "react";
import Marquee from "../utils/Marque";
import HeroShrink from "./HeroShrink";

const Hero = () => {
  return (
    <div className="relative bg-bg-contrast overflow-hidden">
      <div className="relative z-10">
        <HeroShrink />
      </div>
      <div className="relative z-10">
        <Marquee />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg-contrast via-bg-contrast to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;