import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reframe } from "../data/index";

gsap.registerPlugin(ScrollTrigger);

export default function StructuredSystem() {
  const container = useRef();
  const badge = useRef();
  const heading = useRef();
  const contentWrapper = useRef();
  const cards = useRef([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power4.out" },
      });

      tl.from(badge.current, { x: -30, opacity: 0, duration: 0.8 });
      
      tl.from(
        heading.current,
        { y: 80, opacity: 0, duration: 1.2 },
        "-=0.6"
      );

      tl.from(
        contentWrapper.current,
        { y: 40, opacity: 0, duration: 1 },
        "-=0.8"
      );

      tl.from(
        cards.current,
        { 
          y: 50, 
          opacity: 0, 
          stagger: 0.15, 
          duration: 1,
          clearProps: "all" 
        },
        "-=0.6"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative bg-[#0a0a0a] text-white py-24 lg:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="container-premium relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-12">
          <div className="flex-1">
            <div ref={badge} className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-accent"></div>
              <span className="text-accent font-heading text-sm uppercase tracking-[0.2em]">
                What Growth Actually Does
              </span>
            </div>

            <h2
              ref={heading}
              className="text-hero md:text-[5.5vw] font-heading leading-[0.9] uppercase mb-8"
            >
              Rethink what <br />
              digital marketing <br />
              should do <span className="text-accent">for your practice</span>
            </h2>
          </div>

          <div ref={contentWrapper} className="flex-1">
            <div className="bg-accent/5 border border-accent/20 p-6 md:p-8 rounded-sm mb-6 max-w-xl">
              <p className="text-accent font-heading text-lg md:text-xl leading-snug uppercase">
                <span className="inline-block mr-2">⚡</span>
                Every week without a system is a week your competitor gains ground.
              </p>
            </div>

            <div className="space-y-6 max-w-xl">
              <p className="text-white/70 text-lg leading-relaxed">
                While you're reading this, patients in your city are searching your speciality — and booking with whoever shows up first. <span className="text-white font-bold">That needs to be you.</span>
              </p>
              <p className="text-white/50 text-base leading-relaxed">
                Most agencies sell activity. Posts. Ads. Follower counts. We build the infrastructure that fills your calendar — measurably, repeatedly, without guesswork.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 border-t border-white/10">
          {Reframe.systemPoints.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cards.current[i] = el)}
              className="group relative pt-12 pb-16 px-8 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.02] transition-colors duration-500 cursor-default"
            >
              <div className="text-[5rem] font-heading leading-none text-white/5 mb-6 group-hover:text-accent/10 transition-colors duration-500">
                0{i + 1}
              </div>
              
              <h3 className="text-xl font-heading text-white uppercase tracking-wider mb-4 leading-tight ">
                {item.title || "Strategic Growth Pillar"}
              </h3>
              
              <p className="text-accent/60 font-heading text-xs uppercase tracking-[0.2em]">
                {item.subtitle || "Every Rupee Tracked"}
              </p>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}