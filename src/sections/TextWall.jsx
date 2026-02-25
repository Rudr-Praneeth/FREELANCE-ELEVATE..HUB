import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ text }) => {
  return (
    <span className="inline-block">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const TextWall = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".line-wrapper");

      const intro = gsap.timeline({
        defaults: {
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        },
      });

      lines.forEach((line, index) => {
        const chars = line.querySelectorAll(".char");
        intro.fromTo(
          chars,
          {
            x: "120vw",
            opacity: 0,
            letterSpacing: "0.6em",
          },
          {
            x: index === 0 ? "45vw" : index === 1 ? "35vw" : "55vw",
            opacity: 1,
            letterSpacing: "0em",
            duration: 2.4,
            ease: "cubic-bezier(0.22, 1, 0.36, 1)",
            stagger: {
              each: 0.04,
            },
          },
          index * 0.6,
        );
      });

      intro.eventCallback("onComplete", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          once: true,
          // markers: true,
          onEnter: () => {
            gsap.to(sectionRef.current, {
              paddingTop: "2rem",
              paddingBottom: "2rem",
              minHeight: "auto",
              duration: 1.2,
              ease: "cubic-bezier(0.22, 1, 0.36, 1)",
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center bg-bg-primary min-h-screen w-full overflow-hidden"
    >
      <div className="container-premium flex flex-col w-full gap-4">
        <div className="line-wrapper w-full">
          <h1 className="text-hero uppercase text-text-primary m-0 leading-none overflow-hidden">
            <SplitText text="I DONT KNOW WHAT TO" />
          </h1>
        </div>

        <div className="line-wrapper w-full">
          <h1 className="text-hero uppercase text-text-secondary m-0 leading-none overflow-hidden">
            <SplitText text="PUT THAT SPARKS" />
          </h1>
        </div>

        <div className="line-wrapper w-full">
          <h1 className="text-hero uppercase text-text-muted m-0 leading-none overflow-hidden">
            <SplitText text="FOR THIS SECTION" />
          </h1>
        </div>
      </div>
    </section>
  );
};

export default TextWall;
