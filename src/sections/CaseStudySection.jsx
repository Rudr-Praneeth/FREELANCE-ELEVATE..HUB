import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  {
    id: 1,
    title: "VANGUARD RETAIL",
    category: "E-Commerce",
    description: "Architecting a headless commerce engine for high-scale global distribution.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "NEURAL CORE",
    category: "AI Infrastructure",
    description: "Developing a robust visualization layer for real-time neural network processing.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "LUCID SYSTEMS",
    category: "SaaS",
    description: "Streamlining enterprise workflow through intuitive dashboard architecture.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
  },
];

const CaseStudySection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.case-study-card');
    const headerHeight = 80;

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: () => `top top`,
        pin: true,
        pinSpacing: false,
        endTrigger: containerRef.current,
        end: "bottom bottom",
        id: `card-pin-${index}`
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen bg-bg-primary py-0">
      <header className=" text-center mb-8">
          <h2 className="text-h1 font-heading text-gradient">CASE STUDIES</h2>
          <p className="max-w-xl mx-auto text-muted">
            Industry Insights.
          </p>
        </header>
      {CASE_STUDIES.map((study, index) => (
        <div 
          key={study.id} 
          className="case-study-card flex flex-col w-full h-screen bg-bg-surface border-t border-border-subtle overflow-hidden"
          style={{ zIndex: index + 1 }}
        >
          <div 
            className="flex items-center justify-between px-8 py-8 bg-bg-elevated border-b border-border-subtle"
            style={{ height: '80px' }}
          >
            <h2 className="text-h3 m-0 tracking-widest text-text-primary">
              {study.title}
            </h2>
            <span className="text-small font-bold uppercase tracking-widest text-accent">
              0{index + 1}
            </span>
          </div>

          <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 items-center container-premium">
            <div className="space-y-6">
              <p className="text-accent uppercase tracking-[0.2em] font-bold text-small">
                {study.category}
              </p>
              <h3 className="text-hero leading-none">
                {study.title}
              </h3>
              <p className="text-body-lg max-w-md">
                {study.description}
              </p>
              <button className="flex items-center gap-4 group cursor-pointer">
                <span className="w-12 h-[1px] bg-accent transition-all group-hover:w-20" />
                <span className="text-small font-bold tracking-widest uppercase">View Project</span>
              </button>
            </div>

            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-lg shadow-elevated">
              <img 
                src={study.image} 
                alt={study.title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-accent/10 pointer-events-none" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CaseStudySection;