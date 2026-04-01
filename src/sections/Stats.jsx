import React, { useRef, useState } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { growthSystemData } from "../data/services";
import SpotlightCard from "../components/SpotlightCard"

gsap.registerPlugin(ScrollTrigger);

const NAV_HEIGHT = 80;

const ServiceBento = () => {
  const [selected, setSelected] = useState(null);
  const container = useRef(null);
  const overlayRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      if (!selected) return;

      const tl = gsap.timeline();

      tl.to(".grid-main", {
        autoAlpha: 0,
        scale: 0.95,
        duration: 0.5,
        ease: "power3.inOut",
      })
        .set(overlayRef.current, { display: "flex" })
        .fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4 }
        )
        .fromTo(
          leftSideRef.current,
          { x: -60, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" }
        )
        .fromTo(
          ".detail-item",
          { x: -20, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, stagger: 0.05, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          rightSideRef.current,
          { x: 60, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" },
          "-=0.5"
        );
    },
    { dependencies: [selected], scope: container }
  );

  useEffect(() => {
  if (selected) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [selected]);

  const handleCardClick = contextSafe((service) => {
    setSelected(service);
  });

  const handleClose = contextSafe(() => {
    const tl = gsap.timeline({ onComplete: () => setSelected(null) });

    tl.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.out",
    }).to(".grid-main", {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      ease: "expo.out",
    });
  });

  return (
    <section
      ref={container}
      className="relative bg-bg-primary pt-24 pb-20 overflow-hidden"
    >
      <header className="text-center mb-12">
        <h1 className="text-hero leading-[0.9]">Our <span className="text-gradient">Services</span></h1>
        <h2 className="text-xl md:text-3xl tracking-[0.9px] text-black">
          {growthSystemData.heading}
        </h2>

        <p className="max-w-3xl mx-auto text-sm md:text-base text-black mt-4">
          {growthSystemData.introduction}
        </p>
      </header>
      <div>
      {/* <div className="container-premium grid-main grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-auto"> */}
        {/* <div className="hidden lg:block lg:col-span-5 rounded-lg overflow-hidden relative group min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1557683316"
            alt="Service Focus"
            className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-700"
          />
        </div> */}

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
          {growthSystemData.services.map((s, index) => (
            <ServiceCard
              key={index}
              service={s}
              onClick={() => handleCardClick(s)}
            />
          ))}
        </div>
      </div>

      <div
        ref={overlayRef}
        style={{ top: NAV_HEIGHT }}
        className="fixed left-0 right-0 bottom-0 h-max hidden z-[100] bg-bg-primary/95 border-t-4 backdrop-blur-xl overflow-y-auto pointer-events-auto px-4 sm:px-6 pb-10"
      >
        <div className="fixed top-[60px] right-4 sm:right-6 z-[200]">
          <button
            onClick={handleClose}
            className="text-xs tracking-widest text-text-muted hover:text-accent"
          >
            CLOSE
          </button>
        </div>

        <div className="flex flex-col-reverse justify-end lg:flex-row min-h-full py-6 md:py-10 lg:py-16 gap-10">
          <div
            ref={leftSideRef}
            className="flex-1 mt-20 border-t lg:border-t-0 lg:border-r border-border-subtle pt-6 lg:pt-0 lg:pr-10"
          >
            <p className="text-accent text-xs tracking-[0.3em] mb-6 uppercase font-bold">
              {selected?.deliverablesHeading}
            </p>

            <div className="space-y-4">
              {selected?.deliverables.map((item, i) => (
                <div key={i} className="detail-item flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-lg uppercase text-text-primary">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={rightSideRef}
            className="flex-1 pb-6 mt-20 lg:pb-0 lg:pl-12 space-y-4"
          >
            <h2 className="text-3xl md:text-5xl leading-[1.05] whitespace-pre-line">
              {selected?.title}
            </h2>

            <p className="text-sm md:text-lg max-w-lg text-text-secondary">
              {selected?.description}
            </p>

            <div>
              <p className="text-accent text-xs tracking-[0.3em] mb-3 uppercase font-bold">
                {selected?.outcomeHeading}
              </p>

              <p className="text-sm md:text-lg max-w-lg text-text-secondary">
                {selected?.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
          "-=0.6"
        )
        .to(
          subRef.current.children,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        );
    },
    { scope: cardRef }
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
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="flex flex-col justify-between p-4 md:p-6 min-h-[140px] md:min-h-[180px] bg-bg-surface border border-border-subtle rounded-lg cursor-pointer hover:border-accent transition-all"
    >
      <div ref={titleRef}>
        {service.title.split("\n").map((line, i) => (
          <div key={i} className="overflow-hidden">
            <h3 className="line-inner text-xl md:text-2xl leading-none">
              {line}
            </h3>
          </div>
        ))}

        <div
          ref={lineRef}
          className="w-full h-[1px] bg-accent mt-4 origin-left"
        />
      </div>

      <div ref={subRef} className="mt-6">
        <p className="text-[10px] text-accent tracking-widest font-bold">
          EXPLORE +
        </p>
      </div>
    </div>
  );
};

export default ServiceBento;