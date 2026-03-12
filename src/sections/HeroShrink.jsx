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
        stagger: 0.1,
        duration: 0.5,
        ease: "power4.out"
      })
      .from(cards, {
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 1.1,
        ease: "expo.out"
      }, "-=0.7");

    bars.forEach(bar => {
      gsap.to(bar, {
        scaleY: () => 0.5 + Math.random() * 0.7,
        duration: () => 2 + Math.random() * 0.25,
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
      tl.to(card, { y: -150 * speed, ease: "none" }, 0);
    });

    tl.to(".parallax-bg", { y: -100, ease: "none" }, 0)
      .to(heroText.current, {
        scale: 0.85,
        opacity: 0,
        y: -120,
        filter: "blur(12px)",
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
          backgroundSize: "50px 50px"
        }}
      />

      <div
        ref={overlay}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-contrast"
      />

      <div className="absolute inset-0 pointer-events-none">
        <div data-speed="0.6" className="parallax-card absolute top-[12%] left-[10%] w-72 h-40 bg-white/5 rounded-xl border border-white/10"/>
        <div data-speed="1.4" className="parallax-card absolute top-[8%] right-[15%] w-56 h-56 bg-white/5 rounded-xl border border-white/10"/>
        <div data-speed="0.4" className="parallax-card absolute bottom-[28%] left-[18%] w-[400px] h-36 bg-white/5 rounded-xl border border-white/10"/>
        <div data-speed="2.2" className="parallax-card absolute bottom-[12%] right-[10%] w-80 h-52 bg-white/5 rounded-xl border border-white/10"/>
      </div>

      <div ref={heroText} className="relative z-10 flex flex-col items-center text-center px-4">

        <span className="reveal-item text-accent tracking-[0.4em] uppercase text-sm mb-6 font-bold">
          The Sovereign Agency
        </span>

        <h1 className="reveal-item text-[10vw] font-black uppercase text-white mb-8">
          ELEVATE HUB
        </h1>

        <p className="reveal-item text-white/60 tracking-widest mb-14 uppercase">
          Healthcare's Most Disciplined Growth Partner
        </p>

        <div className="reveal-item flex flex-wrap justify-center gap-4 mb-16 text-muted">
          {["Healthcare Exclusive","System-Led Growth","Hyderabad → Global"].map((tag,i)=>(
            <div key={i} className="border border-white/10 px-6 py-2 text-[10px] uppercase tracking-[0.2em] bg-white/5">
              {tag}
            </div>
          ))}
        </div>

        <div className="reveal-item flex flex-col sm:flex-row gap-6">
          <button className="bg-accent text-black px-10 py-5 font-bold uppercase">
            Claim Your Strategy Call
          </button>

          <button className="bg-white text-black px-10 py-5 font-bold uppercase">
            See The System →
          </button>
        </div>

      </div>

      <div className="absolute bottom-10 left-0 w-full px-12 flex justify-between items-end pointer-events-none">
        <div className="flex gap-1 h-12 items-end">
          {[...Array(14)].map((_,i)=>(
            <div key={i} className="audio-bar w-[3px] bg-accent/60 rounded-full h-full"/>
          ))}
        </div>

        <div className="text-white/40 text-[10px] tracking-[0.8em] uppercase">
          EST. 2026
        </div>
      </div>

    </section>
  );
}