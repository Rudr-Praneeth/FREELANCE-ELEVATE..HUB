import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 1,
    title: "SOCIAL\nMEDIA\nMARKETING",
    subServices: [
      "Editing",
      "Content Calendar",
      "IG Setup",
      "Brand Positioning",
      "Video Recording",
      "Social Media Handling",
    ],
    cta: "Start Social Growth",
    description:
      "Dominating digital attention through strategic content architecture and viral loop engineering.",
  },
  {
    id: 2,
    title: "PERFORMANCE\nMARKETING",
    subServices: [
      "Google My Business Setup",
      "Google Ads",
      "Meta Ads",
      "LinkedIn Ads",
      "YouTube Ads",
    ],
    cta: "Scale With Ads",
    description:
      "Data-driven precision targeting designed to maximize ROAS and scale customer acquisition.",
  },
  {
    id: 3,
    title: "VIDEO ADS\nPRODUCTION",
    subServices: [
      "Video Planning",
      "Script Creation",
      "High Quality Production",
      "Ad Creative Optimization",
    ],
    cta: "Produce Video Ads",
    description:
      "High-impact visual storytelling that stops the scroll and converts viewers into customers.",
  },
  {
    id: 4,
    title: "WEBSITE\nDEVELOPMENT",
    subServices: [
      "UI Design",
      "Frontend Development",
      "CMS Integration",
      "Performance Optimization",
    ],
    cta: "Build Your Website",
    description:
      "Engineering high-performance digital flagship stores focused on speed, SEO, and conversion.",
  },
];

const ServiceBento = () => {
  const [selected, setSelected] = useState(null);
  const container = useRef(null);
  const overlayRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });

  const handleCardClick = contextSafe((service) => {
    setSelected(service);

    const tl = gsap.timeline();
    tl.to(".grid-main", {
      autoAlpha: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power3.inOut",
    })
      .to(
        overlayRef.current,
        { display: "flex", autoAlpha: 1, duration: 0.1 },
        "-=0.2",
      )
      .fromTo(
        leftSideRef.current,
        { x: -50, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" },
      )
      .fromTo(
        ".detail-item",
        { x: -20, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, stagger: 0.05, duration: 0.5 },
        "-=0.4",
      )
      .fromTo(
        rightSideRef.current,
        { x: 50, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" },
        "-=0.6",
      );
  });

  const handleClose = contextSafe(() => {
    const tl = gsap.timeline({ onComplete: () => setSelected(null) });
    tl.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power3.in",
    }).to(".grid-main", {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      ease: "expo.out",
    });
  });

  return (
    <div
      ref={container}
      className="relative bg-bg-primary min-h-screen overflow-hidden mt-4 px-4 sm:px-6 lg:px-8"
    >
      <header className="text-center mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient">
          Our Services
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-muted mt-3">
          These are the areaas of our Expertise.
        </p>
      </header>

      <div className="container-premium grid-main grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-fr min-h-[500px] lg:h-[700px]">
        <div className="hidden lg:block lg:col-span-5 rounded-lg overflow-hidden relative group">
          <img
            src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop"
            className="w-full h-full object-cover brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            alt="Service Focus"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              onClick={() => handleCardClick(s)}
            />
          ))}
        </div>
      </div>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 hidden bg-bg-primary/95 backdrop-blur-xl flex-col lg:flex-row p-6 sm:p-10 lg:p-20 overflow-y-auto"
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 sm:top-8 sm:right-8 text-xs sm:text-small text-text-muted hover:text-accent tracking-widest font-bold z-[60]"
        >
          CLOSE [ESC]
        </button>

        <div
          ref={leftSideRef}
          className="flex-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border-subtle p-4 sm:p-8"
        >
          <p className="text-accent text-xs sm:text-small font-bold tracking-[0.3em] mb-6 sm:mb-8 uppercase">
            Capabilities
          </p>
          <div className="space-y-3 sm:space-y-4">
            {selected?.subServices.map((item, i) => (
              <div key={i} className="detail-item flex items-center gap-3 sm:gap-4">
                <span className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-lg sm:text-h3 text-text-primary uppercase">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={rightSideRef}
          className="flex-1 flex flex-col justify-center p-4 sm:p-8 lg:p-20 space-y-6 sm:space-y-8"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl whitespace-pre-line leading-[0.95]">
            {selected?.title}
          </h2>
          <p className="text-sm sm:text-body-lg max-w-md text-text-secondary">
            {selected?.description}
          </p>
          <button className="w-fit px-6 sm:px-8 py-3 sm:py-4 bg-accent text-bg-primary text-xs sm:text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-accent-hover transition-colors shadow-accent-glow">
            {selected?.cta}
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, onClick }) => {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(titleRef.current.querySelectorAll(".line-inner"), {
        yPercent: 100,
      });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(subRef.current.children, { autoAlpha: 0, y: 10 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            once: true,
          },
        })
        .to(titleRef.current.querySelectorAll(".line-inner"), {
          yPercent: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "expo.out",
        })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .to(
          subRef.current.children,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6",
        );
    },
    { scope: cardRef },
  );

  useGSAP(
    () => {
      const el = cardRef.current;

      const move = (e) => {
        if (window.innerWidth < 768) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.08,
          y: y * 0.08,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const leave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);

      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="relative flex flex-col justify-between p-6 sm:p-8 h-full min-h-[220px] bg-bg-surface border border-border-subtle rounded-lg overflow-hidden cursor-pointer transition-all"
    >
      <div ref={titleRef} className="relative z-10">
        {service.title.split("\n").map((line, i) => (
          <div key={i} className="overflow-hidden">
            <h3 className="line-inner text-xl sm:text-2xl md:text-h3 leading-none">
              {line}
            </h3>
          </div>
        ))}

        <div
          ref={lineRef}
          className="w-full h-[1px] bg-accent mt-4 origin-left"
        />
      </div>

      <div ref={subRef} className="relative z-10 space-y-1 mt-4">
        {service.subServices.slice(0, 3).map((sub, i) => (
          <p
            key={i}
            className="text-[10px] sm:text-small uppercase tracking-widest text-text-muted"
          >
            {sub}
          </p>
        ))}

        <p className="text-[10px] text-accent font-bold tracking-widest pt-2">
          EXPLORE +
        </p>
      </div>
    </div>
  );
};

export default ServiceBento;