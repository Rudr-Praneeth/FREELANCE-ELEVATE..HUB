import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function InsaneHero() {
  const container = useRef(null);
  const heroText = useRef(null);
  // const formWrapper = useRef(null);
  const overlay = useRef(null);

  useGSAP(
    () => {
      const entranceTl = gsap.timeline();
      entranceTl
        .from(".reveal-item", {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
        })
        .from(
          ".parallax-card",
          {
            opacity: 0,
            scale: 0.9,
            stagger: 0.1,
            duration: 1.5,
            ease: "expo.out",
          },
          "-=0.8"
        );

      const bars = gsap.utils.toArray(".audio-bar");
      bars.forEach((bar) => {
        gsap.to(bar, {
          scaleY: () => 0.5 + Math.random() * 0.7,
          duration: () => 2 + Math.random() * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "bottom center",
        });
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          // end: "+=200%",
          scrub: 1.2,
          pin: true,
        },
      });

      const parallaxCards = gsap.utils.toArray(".parallax-card");
      parallaxCards.forEach((card) => {
        const speed = parseFloat(card.dataset.speed);
        scrollTl.to(card, { y: -150 * speed, ease: "none" }, 0);
      });

      scrollTl
        .to(".parallax-bg", { y: -100, ease: "none" }, 0)
        .to(
          heroText.current,
          {
            scale: 0.8,
            opacity: 0,
            y: -120,
            filter: "blur(15px)",
            ease: "power2.in",
          },
          0
        )
        .to(
          overlay.current,
          {
            backgroundColor: "rgba(10, 10, 10, 0.98)",
            backdropFilter: "blur(20px)",
          },
          0
        )
        // .fromTo(
        //   formWrapper.current,
        //   { y: 500, opacity: 0, scale: 0.9 },
        //   { y: 0, opacity: 1, scale: 1, ease: "power3.out" },
        //   0.3
        // );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative h-screen w-full bg-bg-contrast overflow-hidden flex flex-col items-center justify-center">
      
      <div 
        className="parallax-bg absolute w-[110%] h-[110%] -top-[5%] -left-[5%] z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(var(--color-text-muted) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />
      
      <div ref={overlay} className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-bg-contrast" />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div data-speed="0.6" className="parallax-card absolute top-[12%] left-[10%] w-72 h-40 bg-bg-elevated/10 backdrop-blur-xl rounded-[var(--radius-xl)] border border-white/5 shadow-2xl" />
        <div data-speed="1.4" className="parallax-card absolute top-[8%] right-[15%] w-56 h-56 bg-bg-elevated/10 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xl" />
        <div data-speed="0.4" className="parallax-card absolute bottom-[28%] left-[18%] w-[400px] h-36 bg-bg-elevated/10 backdrop-blur-xl rounded-[var(--radius-xl)] border border-white/5 shadow-2xl" />
        <div data-speed="2.2" className="parallax-card absolute bottom-[12%] right-[10%] w-80 h-52 bg-bg-elevated/10 backdrop-blur-xl rounded-[var(--radius-xl)] border border-white/5 shadow-2xl" />
      </div>

      <div ref={heroText} className="relative z-20 flex flex-col items-center text-center px-4 w-full">
        <span className="reveal-item text-accent font-heading tracking-[0.4em] uppercase text-sm mb-6 font-bold">
          The Sovereign Agency
        </span>
        
        <h1 className="reveal-item text-[12vw] font-heading leading-[0.8] text-white mb-8 tracking-tighter uppercase font-black">
          ELEVATE HUB
        </h1>
        
        <p className="reveal-item text-text-muted text-body-lg tracking-widest mb-14 uppercase">
          Healthcare's Most Disciplined Growth Partner.
        </p>

        <div className="reveal-item flex flex-wrap justify-center gap-4 mb-16">
          {["Healthcare Exclusive", "System-Led Growth", "Hyderabad → Global"].map((tag, i) => (
            <div key={i} className="border border-white/10 px-6 py-2 rounded-sm text-white/50 text-[10px] font-body uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md">
              {tag}
            </div>
          ))}
        </div>

        <div className="reveal-item flex flex-col sm:flex-row gap-6 relative z-30">
          <button className="bg-accent text-bg-contrast px-10 py-5 font-heading tracking-widest text-md font-bold uppercase hover:bg-white transition-all duration-500 shadow-success-glow">
            Claim Your Strategy Call
          </button>
          <button className="bg-white text-bg-contrast px-10 py-5 font-heading tracking-widest text-md font-bold uppercase hover:bg-accent transition-all duration-500 flex items-center justify-center gap-3">
            See The System <span>→</span>
          </button>
        </div>
      </div>

      {/* <section
        ref={formWrapper}
        className="absolute inset-0 z-40 flex items-center justify-center px-4 pointer-events-none opacity-0"
      >
        <div className="bg-bg-surface p-10 md:p-16 rounded-[var(--radius-xl)] w-full max-w-2xl border border-white/5 pointer-events-auto shadow-elevated backdrop-blur-2xl">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-heading text-bg-contrast mb-2 tracking-tight">CLAIM YOUR SPOT</h2>
            <p className="text-text-muted uppercase tracking-[0.3em] text-[10px]">High-Volume Growth Infrastructure</p>
          </div>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-[10px] font-heading tracking-widest text-text-muted uppercase">Full Name</label>
                <input type="text" className="w-full bg-transparent border-b border-border-subtle py-3 focus:border-accent outline-none transition-colors text-text-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-heading tracking-widest text-text-muted uppercase">Speciality</label>
                <input type="text" className="w-full bg-transparent border-b border-border-subtle py-3 focus:border-accent outline-none transition-colors text-text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-heading tracking-widest text-text-muted uppercase">Work Email</label>
              <input type="email" className="w-full bg-transparent border-b border-border-subtle py-3 focus:border-accent outline-none transition-colors text-text-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-heading tracking-widest text-text-muted uppercase">Desired Outcome</label>
              <textarea className="w-full bg-transparent border-b border-border-subtle py-3 focus:border-accent outline-none transition-colors text-text-primary resize-none h-24" />
            </div>
            <button className="w-full bg-accent text-bg-contrast py-6 rounded-lg font-heading tracking-widest text-2xl hover:bg-white transition-all duration-500 uppercase font-black">
              GROW WITH US →
            </button>
          </form>
        </div>
      </section> */}

      <div className="absolute bottom-10 left-0 w-full px-12 z-20 flex justify-between items-end pointer-events-none">
        <div className="flex gap-1 h-12 items-end">
          {[...Array(14)].map((_, i) => (
            <div 
              key={i} 
              className="audio-bar w-[3px] bg-accent/60 rounded-full" 
              style={{ height: '100%' }}
            />
          ))}
        </div>
        
        <div className="text-text-muted text-[10px] tracking-[0.8em] font-body uppercase vertical-text">
          EST. 2026
        </div>
      </div>
    </section>
  );
}