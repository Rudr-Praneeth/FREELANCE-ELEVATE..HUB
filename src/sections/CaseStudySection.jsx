import React, { useRef, useState, useEffect } from "react";
import { CaseStudies } from "../data";
import CaseStudyCard from "../components/CaseStudyCard";
import CaseStudyModal from "../components/CaseStudyModal";

const CaseStudySection = () => {
  const container = useRef();
  const scrollRef = useRef();
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(0);

  const openModal = (study) => {
    setSelected(study);
  };

  const closeModal = () => {
    setSelected(null);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const current = el.scrollLeft;
      const percentage = maxScroll > 0 ? (current / maxScroll) * 100 : 0;
      setProgress(percentage);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={container}
      className="relative bg-[#0a0a0a] py-24 lg:py-32 border-t border-white/5"
    >
      <div className="container-premium">
        <header className="mb-16">
          <h1 className="text-white text-hero leading-[1.05] font-heading">
            CASE <span className="text-accent">STUDIES</span>
          </h1>
          <h3 className="text-white uppercase max-w-5xl">
            Results That Speak The Language of{" "}
            <span className="text-accent">Practice Growth</span>
          </h3>
        </header>

        <div className="md:hidden mb-6">
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory pb-4 md:pb-0"
        >
          {CaseStudies.caseStudies.map((study, index) => (
            <div
              key={index}
              className="min-w-[85%] sm:min-w-[65%] md:min-w-0 snap-start flex-shrink-0 h-full"
            >
              <CaseStudyCard
                study={study}
                onClick={() => openModal(study)}
              />
            </div>
          ))}
        </div>

        <button className="group mt-12 flex items-center gap-6 px-10 py-5 border border-accent/40 rounded-sm text-accent uppercase tracking-[0.2em] text-xs hover:bg-accent hover:text-black transition-all duration-500">
          See Full Case Studies
          <span className="group-hover:translate-x-2 transition-transform duration-500">
            →
          </span>
        </button>
      </div>

      {selected && (
        <CaseStudyModal study={selected} onClose={closeModal} />
      )}
    </section>
  );
};

export default CaseStudySection;