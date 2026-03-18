import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CaseStudyCard = ({ study, onClick }) => {
  const card = useRef();
  const line = useRef();
  const content = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card.current,
        start: "top 92%",
        once: true,
        // markers: true
      }
    });

    tl.fromTo(
      card.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    )
      .fromTo(
        line.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "expo.out" },
        "-=0.4"
      )
      .fromTo(
        content.current.children,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
        "-=0.5"
      );
  });

  const [type, location] = study.practice.split("·");

  return (
    <div
      ref={card}
      onClick={onClick}
      className="relative flex flex-col p-8 md:p-10 bg-[#141414] border border-white/10 rounded-xl overflow-hidden group cursor-pointer hover:border-accent/40 transition-all duration-500 opacity-0"
    >
      <div ref={content} className="relative z-10 space-y-6">
        <p className="text-accent font-heading text-[10px] uppercase tracking-[0.3em]">
          {type?.trim()} | {location?.trim()}
        </p>

        <h3 className="text-lg md:text-xl font-heading text-white leading-snug">
          {study.title}
        </h3>

        <div className="flex items-end gap-4">
          <span className="text-4xl md:text-5xl font-heading text-accent">
            {study.primaryMetric.value}
          </span>
        </div>

        <p className="text-white/40 font-body text-[10px] uppercase tracking-widest">
          {study.primaryMetric.label}
        </p>

        <div
          ref={line}
          className="w-full h-[1px] bg-white/10 origin-left scale-x-0"
        />

        <div className="flex justify-between items-center">
          <p className="text-xs text-white/40 uppercase tracking-wider">
            {study.secondaryMetric.label}
          </p>

          <span className="text-sm md:text-base font-heading text-white">
            {study.secondaryMetric.value}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default CaseStudyCard;