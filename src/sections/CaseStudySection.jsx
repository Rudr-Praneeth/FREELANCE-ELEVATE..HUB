import React, { useRef, useState, useEffect } from "react";
import { CaseStudies } from "../data";
import CaseStudyCard from "../components/CaseStudyCard";
import CaseStudyModal from "../components/CaseStudyModal";

const CaseStudySection = () => {
  const scrollRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const moved = useRef(false);

  const openModal = (study) => setSelected(study);
  const closeModal = () => setSelected(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const percentage = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
      setProgress(percentage);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.children[0];
    if (!firstCard) return;

    const gap = 24;
    const width = firstCard.getBoundingClientRect().width + gap;

    el.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (e) => {
    if (window.innerWidth < 1024) return;

    const el = scrollRef.current;
    isDragging.current = true;
    moved.current = false;
    startX.current = e.clientX;
    scrollStart.current = el.scrollLeft;
    el.style.scrollBehavior = "auto";
  };

  const handlePointerUp = () => {
    const el = scrollRef.current;
    isDragging.current = false;
    el.style.scrollBehavior = "smooth";
    setTimeout(() => (moved.current = false), 50);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    moved.current = true;
    const el = scrollRef.current;
    const dx = e.clientX - startX.current;
    el.scrollLeft = scrollStart.current - dx;
  };

  return (
    <section className="relative bg-[#0a0a0a] py-24 lg:py-32 border-t border-white/5">
      <div className="container-premium">
        <header>
          <h1 className="text-white text-hero leading-[1.05] font-heading">
            CASE <span className="text-accent">STUDIES</span>
          </h1>
          <h3 className="text-white uppercase max-w-5xl">
            Results That Speak The Language of{" "}
            <span className="text-accent">Practice Growth</span>
          </h3>
        </header>

        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => scroll("left")}
            className="px-4 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="px-4 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition"
          >
            →
          </button>
        </div>

        <div
          ref={scrollRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerMove={handlePointerMove}
          className="
            flex gap-6 overflow-x-auto pb-4 no-scrollbar
            cursor-default lg:cursor-grab lg:active:cursor-grabbing
            touch-pan-x select-none
            snap-x snap-mandatory lg:snap-none
          "
        >
          {CaseStudies.caseStudies.map((study, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%]"
            >
              <CaseStudyCard
                study={study}
                onClick={() => {
                  if (!moved.current) openModal(study);
                }}
              />
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="w-full h-[2px] bg-white/10 overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
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