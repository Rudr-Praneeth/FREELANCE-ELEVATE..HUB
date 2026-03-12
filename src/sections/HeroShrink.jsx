import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function InsaneHero() {
  const container = useRef(null);
  const heroText = useRef(null);
  const overlay = useRef(null);

  useGSAP(() => {
    const revealItems = gsap.utils.toArray(".reveal-item");
    const cards = gsap.utils.toArray(".parallax-card");
    const bars = gsap.utils.toArray(".audio-bar");

    gsap.timeline()
      .from(revealItems, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power4.out"
      })
      .from(cards, {
        opacity: 0,
        scale: 0.92,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out"
      }, "-=0.7");

    bars.forEach(bar => {
      gsap.to(bar, {
        scaleY: () => 0.5 + Math.random() * 0.6,
        duration: () => 1.8 + Math.random() * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "bottom center"
      });
    });

    if (window.innerWidth < 1024) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=100%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1
      }
    });

    cards.forEach(card => {
      const speed = parseFloat(card.dataset.speed) || 1;
      tl.to(card, { y: -120 * speed, ease: "none" }, 0);
    });

    tl.to(".parallax-bg", { y: -90, ease: "none" }, 0)
      .to(heroText.current, {
        scale: 0.9,
        opacity: 0,
        y: -100,
        filter: "blur(10px)",
        ease: "power2.in"
      }, 0)
      .to(overlay.current, {
        backgroundColor: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(20px)"
      }, 0);

  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full bg-bg-contrast overflow-hidden flex flex-col items-center justify-center"
    >

      <div
        className="parallax-bg absolute w-[110%] h-[110%] -top-[5%] -left-[5%] opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-text-muted) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div
        ref={overlay}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-contrast"
      />

      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div data-speed="0.6" className="parallax-card absolute top-[12%] left-[10%] w-64 h-36 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"/>
        <div data-speed="1.2" className="parallax-card absolute top-[10%] right-[15%] w-52 h-52 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"/>
        <div data-speed="0.5" className="parallax-card absolute bottom-[30%] left-[18%] w-[340px] h-32 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"/>
        <div data-speed="1.8" className="parallax-card absolute bottom-[14%] right-[10%] w-72 h-44 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"/>
      </div>

      <div ref={heroText} className="relative z-10 flex flex-col items-center text-center px-6 max-w-[900px]">

        <span className="reveal-item text-accent tracking-[0.35em] uppercase text-xs sm:text-sm mb-5 font-semibold">
          The Sovereign Agency
        </span>

        <h1 className="reveal-item font-black uppercase text-white leading-none mb-6 text-[14vw] sm:text-[10vw] lg:text-[7vw]">
          Elevate Hub
        </h1>

        <p className="reveal-item text-white/60 tracking-widest mb-10 uppercase text-[11px] sm:text-sm">
          Healthcare's Most Disciplined Growth Partner
        </p>

        <div className="reveal-item flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 text-muted max-w-[700px]">
          {["Healthcare Exclusive","System-Led Growth","Hyderabad → Global"].map((tag,i)=>(
            <div key={i} className="border border-white/10 px-5 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] bg-white/5 backdrop-blur-sm">
              {tag}
            </div>
          ))}
        </div>

        <div className="reveal-item flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <button className="bg-accent text-black px-8 sm:px-10 py-4 sm:py-5 font-bold uppercase text-sm w-full sm:w-auto">
            Claim Your Strategy Call
          </button>

          <button className="bg-white text-black px-8 sm:px-10 py-4 sm:py-5 font-bold uppercase text-sm w-full sm:w-auto">
            See The System →
          </button>
        </div>

      </div>

      <div className="absolute bottom-6 sm:bottom-10 left-0 w-full px-6 sm:px-12 flex justify-between items-end pointer-events-none">

        <div className="hidden sm:flex gap-[3px] h-10 items-end">
          {[...Array(12)].map((_,i)=>(
            <div key={i} className="audio-bar w-[3px] bg-accent/60 rounded-full h-full"/>
          ))}
        </div>

        <div className="text-white/40 text-[9px] sm:text-[10px] tracking-[0.7em] uppercase">
          EST. 2026
        </div>

      </div>

    </section>
  );
}