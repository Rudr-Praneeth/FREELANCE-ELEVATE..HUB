import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CaseStudies } from "../data";

gsap.registerPlugin(ScrollTrigger);

const CaseStudyCard = ({ study, onClick }) => {
  const cardRef = useRef(null);
  const lineRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 92%",
          once: true,
          onRefresh: (self) => {
            if (self.progress > 0) gsap.set(cardRef.current, { opacity: 1, y: 0 });
          }
        },
      });

      tl.fromTo(cardRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 1,
            ease: "expo.inOut",
          },
          "-=0.4"
        )
        .fromTo(
          contentRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
          "-=0.6"
        );
    },
    { scope: cardRef }
  );

  const getValues = (outcomes) => {
    const text = outcomes[1] || "";
    const match = text.match(/₹(\d+[\d,]*)\s+to\s+₹(\d+[\d,]*)/);
    return match ? { before: match[1], after: match[2] } : { before: "---", after: "---" };
  };

  const values = getValues(study.outcomesAt90Days);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="relative flex flex-col p-8 md:p-10 bg-[#141414] border border-white/10 rounded-xl overflow-hidden group cursor-pointer hover:border-accent/40 transition-all duration-500 opacity-0"
    >
      <div ref={contentRef} className="relative z-10 space-y-6">
        <p className="text-accent font-heading text-[10px] uppercase tracking-[0.3em]">
          {study.practice.split("·")[0]} | {study.practice.split("·")[1]}
        </p>

        <div className="flex items-center gap-4">
          <span className="text-4xl md:text-5xl font-heading text-white/40 group-hover:text-white/60 transition-colors">
            {values.before}
          </span>
          <span className="text-2xl text-accent">→</span>
          <span className="text-4xl md:text-5xl font-heading text-accent shadow-success-glow">
            {values.after}
          </span>
        </div>

        <p className="text-white/40 font-body text-[10px] uppercase tracking-widest group-hover:text-white/60 transition-colors">
          Cost Per Consultation
        </p>

        <div
          ref={lineRef}
          className="w-full h-[1px] bg-white/10 origin-left scale-x-0 group-hover:bg-accent/30 transition-colors"
        />

        <p className="text-xs font-body text-white/50">
          Enquiry Lift: <span className="text-white font-bold">{study.outcomesAt90Days[0].split(" ")[0]}</span>
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

const CaseStudySection = () => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleOpen = contextSafe((study) => {
    setSelected(study);
    document.body.style.overflow = "hidden";
    
    const tl = gsap.timeline();
    tl.set(overlayRef.current, { display: "block" })
      .fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power2.out" })
      .fromTo(leftRef.current, { x: -60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out" }, "-=0.2")
      .fromTo(rightRef.current, { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out" }, "-=0.7")
      .fromTo(".modal-item", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.6, ease: "power3.out" }, "-=0.5");
  });

  const handleClose = contextSafe(() => {
    const tl = gsap.timeline({ 
      onComplete: () => {
        setSelected(null);
        document.body.style.overflow = "";
      } 
    });
    tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.4, ease: "power3.inOut" })
      .set(overlayRef.current, { display: "none" });
  });

  return (
    <section ref={containerRef} className="relative bg-[#0a0a0a] py-24 lg:py-32 border-t border-white/5">
      <div className="container-premium">
        <header className="mb-16">
          <h2 className="text-h1 font-heading leading-[1.05] text-white uppercase max-w-5xl">
            Results That Speak {" "}
            The Language of <br />
            <span className="text-accent">Practice Growth</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {CaseStudies.caseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} onClick={() => handleOpen(study)} />
          ))}
        </div>

        <button className="group flex items-center gap-6 px-10 py-5 border border-accent/40 rounded-sm text-accent font-heading uppercase tracking-[0.2em] text-xs hover:bg-accent hover:text-black transition-all duration-500">
          See Full Case Studies
          <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
        </button>
      </div>

      {/* MODAL OVERLAY - Now the single scrollable container */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] hidden bg-black/95 backdrop-blur-2xl overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <button
          onClick={handleClose}
          className="fixed top-8 right-8 text-[10px] text-white/50 hover:text-accent tracking-[0.5em] font-bold z-[110] transition-colors"
        >
          CLOSE [ESC]
        </button>

        {/* Inner container to hold the flex layout without internal scrolling */}
        <div className="min-h-full w-full flex flex-col lg:flex-row">
          
          <div ref={leftRef} className="flex-1 p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="modal-item">
              <span className="text-accent font-heading text-xs uppercase tracking-[0.3em] mb-8 block">Project Scope</span>
              <h2 className="text-4xl font-heading text-white uppercase mb-12">What We Built</h2>
            </div>
            <ul className="space-y-8">
              {selected?.whatWeBuilt.map((item, i) => (
                <li key={i} className="modal-item group flex items-start gap-6">
                  <span className="text-accent font-heading text-sm mt-1">0{i + 1}</span>
                  <p className="text-xl text-white/70 group-hover:text-white transition-colors leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div ref={rightRef} className="flex-1 p-12 lg:p-24 bg-white/5 lg:bg-transparent">
            <div className="modal-item mb-16">
              <span className="text-white/30 font-heading text-xs uppercase tracking-[0.3em] mb-4 block">Case Study</span>
              <h2 className="text-5xl lg:text-7xl font-heading text-white uppercase leading-none tracking-tighter">
                {selected?.practice.split("·")[0]}
              </h2>
              <p className="text-accent mt-4 tracking-widest uppercase text-sm">{selected?.practice.split("·")[1]}</p>
            </div>

            <div className="modal-item mb-16 space-y-6">
              <p className="text-white/30 text-[10px] font-heading tracking-[0.3em] uppercase">The Challenge</p>
              <p className="text-2xl text-white/80 font-light leading-relaxed italic border-l-2 border-accent/30 pl-8">
                "{selected?.situationBefore}"
              </p>
            </div>

            <div className="modal-item">
              <p className="text-accent text-[10px] font-heading tracking-[0.3em] uppercase mb-8">90-Day Impact</p>
              <div className="grid gap-6">
                {selected?.outcomesAt90Days.map((item, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-lg text-white group-hover:text-accent transition-colors">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;