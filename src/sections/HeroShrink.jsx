import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function InsaneHero() {
  const container = useRef(null);
  const heroText = useRef(null);

  useGSAP(() => {
    const revealItems = gsap.utils.toArray(".reveal-item");
    const cards = gsap.utils.toArray(".parallax-card");

    gsap.set(container.current, { opacity: 0, scale: 1.05 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(container.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2
    })
      .from(
        ".parallax-bg",
        {
          opacity: 0,
          scale: 1.1,
          duration: 1.2
        },
        "-=1"
      )
      .from(
        cards,
        {
          y: 60,
          opacity: 0,
          scale: 0.96,
          stagger: 0.12,
          duration: 1
        },
        "-=0.9"
      )
      .from(
        revealItems,
        {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9
        },
        "-=0.8"
      );

    cards.forEach((card) => {
      const speed = parseFloat(card.dataset.speed) || 1;
      gsap.to(card, {
        y: () => -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    gsap.to(".parallax-bg", {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(heroText.current, {
      y: -60,
      opacity: 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        end: "bottom top",
        scrub: 1
      }
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative h-screen md:h-[120vh] w-full bg-bg-contrast overflow-hidden flex flex-col items-center justify-center"
    >
      <div
        className="parallax-bg absolute w-[110%] h-[110%] -top-[5%] -left-[5%] opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-text-muted) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-contrast" />

      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div data-speed="0.6" className="parallax-card absolute top-[15%] left-[12%] w-64 h-36 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm" />
        <div data-speed="1" className="parallax-card absolute top-[12%] right-[15%] w-52 h-52 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm" />
        <div data-speed="0.5" className="parallax-card absolute bottom-[28%] left-[20%] w-[320px] h-32 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm" />
        <div data-speed="1.4" className="parallax-card absolute bottom-[15%] right-[12%] w-72 h-44 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm" />
      </div>

      <div
        ref={heroText}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-[900px]"
      >
        <span className="reveal-item text-accent tracking-[0.35em] uppercase text-xs sm:text-sm mb-6 font-medium">
          The Sovereign Agency
        </span>

        <h1 className="reveal-item font-black uppercase text-white leading-[0.9] mb-6 text-[14vw] sm:text-[10vw] lg:text-[7vw]">
          Elevate Hub
        </h1>

        <p className="reveal-item text-white/60 tracking-widest mb-12 uppercase text-[11px] sm:text-sm">
          Healthcare's Most Disciplined Growth Partner
        </p>

        <div className="reveal-item flex flex-wrap justify-center gap-3 sm:gap-4 mb-14 text-muted max-w-[700px]">
          {["Healthcare Exclusive", "System-Led Growth", "Hyderabad → Global"].map((tag, i) => (
            <div
              key={i}
              className="border border-white/10 px-5 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] bg-white/5 backdrop-blur-sm"
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="reveal-item flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <button className="bg-accent text-black px-10 py-5 font-semibold uppercase text-sm w-full sm:w-auto">
            Claim Your Strategy Call
          </button>

          <button className="border border-white/20 text-white px-10 py-5 font-semibold uppercase text-sm w-full sm:w-auto">
            See The System →
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full px-6 sm:px-12 flex justify-end items-end pointer-events-none">
        <div className="text-white/30 text-[10px] tracking-[0.6em] uppercase">
          EST. 2026
        </div>
      </div>
    </section>
  );
}