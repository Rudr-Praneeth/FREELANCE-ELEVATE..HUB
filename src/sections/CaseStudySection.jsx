import React, { useRef, useState } from "react";
import { CaseStudies } from "../data";
import CaseStudyCard from "../components/CaseStudyCard";
import CaseStudyModal from "../components/CaseStudyModal";

const CaseStudySection = () => {
  const container = useRef();
  const [selected, setSelected] = useState(null);

  const openModal = (study) => {
    setSelected(study);
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <section
      ref={container}
      className="relative bg-[#0a0a0a] py-24 lg:py-32 border-t border-white/5"
    >
      <div className="container-premium">
        <header className="mb-16">
          <h2 className="text-h1 font-heading leading-[1.05] text-white uppercase max-w-5xl">
            Results That Speak The Language of <br />
            <span className="text-accent">Practice Growth</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {CaseStudies.caseStudies.map((study, index) => (
            <CaseStudyCard
              key={index}
              study={study}
              onClick={() => openModal(study)}
            />
          ))}
        </div>

        <button className="group flex items-center gap-6 px-10 py-5 border border-accent/40 rounded-sm text-accent uppercase tracking-[0.2em] text-xs hover:bg-accent hover:text-black transition-all duration-500">
          See Full Case Studies
          <span className="group-hover:translate-x-2 transition-transform duration-500">
            →
          </span>
        </button>
      </div>

      {selected && (
        <CaseStudyModal
          study={selected}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default CaseStudySection;