import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Showreel = () => {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
      },
    });

    tl.to(
      textRef.current,
      {
        opacity: 0,
        scale: 0.85,
        y: -80,
        ease: "power2.out",
      },
      0
    );

    tl.fromTo(
      videoContainerRef.current,
      {
        width: "60vw",
        height: "60vh",
        borderRadius: "var(--radius-xl)",
        y: "10vh",
      },
      {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        y: "0vh",
        ease: "power1.out",
      },
      0
    );
    tl.fromTo(
      videoRef.current,
      {
        scale: 1.2,
      },
      {
        scale: 1,
        ease: "none",
      },
      0
    );
  }, { scope: sectionRef });

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center h-screen"
    >
      <div
        ref={textRef}
        className="absolute top-[8%] z-10 text-center pointer-events-none select-none"
      >
        <h2 className="uppercase leading-none text-[15vw] text-gradient">
          Discover Us
        </h2>
      </div>

      <div
        ref={videoContainerRef}
        className="relative z-20 overflow-hidden shadow-elevated border-2 border-subtle"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="Activity.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Showreel;