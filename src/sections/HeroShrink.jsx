import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function InsaneHero() {
  const container = useRef(null);
  const heroText = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".premium-card");
    const revealItems = gsap.utils.toArray(".reveal-item");

    gsap.set(revealItems, { y: 40, opacity: 0, filter: "blur(10px)" });
    gsap.set(cards, { opacity: 0, scale: 0.8, y: 20 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.to(revealItems, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.1,
      duration: 1.2,
      delay: 0.3
    })
    .to(cards, {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.1,
      duration: 1,
    }, "-=0.8");

    gsap.to(buttonRef.current, {
      boxShadow: "0 0 20px rgba(135, 219, 32, 0.4)",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    });

    cards.forEach((card) => {
      gsap.to(card, {
        yPercent: -15,
        xPercent: 5,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    gsap.to(heroText.current, {
      opacity: 0,
      y: -60,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "center top",
        scrub: true
      }
    });
  }, { scope: container });

  const handlePointerMove = (e) => {
    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    const cards = document.querySelectorAll(".premium-card");
    
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const distance = Math.hypot(clientX - cardCenterX, clientY - cardCenterY);
      const proximity = Math.max(0, 1 - distance / 350);

      gsap.to(card, {
        scale: 1 + (proximity * 0.12),
        rotationX: (clientY - cardCenterY) * proximity * 0.08,
        rotationY: -(clientX - cardCenterX) * proximity * 0.08,
        z: proximity * 50,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  };

  const handlePointerLeave = () => {
    gsap.to(".premium-card", {
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      z: 0,
      duration: 1,
      ease: "elastic.out(1, 0.75)"
    });
  };

  return (
    <section
      ref={container}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchMove={handlePointerMove}
      className="relative min-h-[100svh] mt-12 w-full bg-[#0F1115] overflow-hidden flex flex-col items-center justify-center py-0 px-4"
      style={{ perspective: "1200px" }}
    >
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)"
        }}
      />

      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="premium-card absolute top-[12%] left-[10%] sm:left-[15%]">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-xl shadow-2xl">
            <div className="w-6 h-1 bg-[#87DB20] mb-2 animate-pulse" />
            <p className="text-white/60 text-[8px] sm:text-[10px] uppercase tracking-tighter font-medium">Systemic Scale</p>
          </div>
        </div>

        <div className="premium-card absolute top-[15%] right-[8%] sm:right-[12%]">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl">
            <p className="text-[#87DB20] font-heading text-3xl sm:text-5xl leading-none">340%</p>
            <p className="text-white/40 text-[7px] sm:text-[9px] uppercase tracking-widest mt-1">Growth Engine</p>
          </div>
        </div>

        <div className="premium-card absolute bottom-[18%] left-[5%] sm:left-[20%]">
          <div className="bg-[#87DB20]/10 border border-[#87DB20]/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
             <div className="w-1.5 h-1.5 rounded-full bg-[#87DB20] animate-ping" />
             <span className="text-white text-[8px] sm:text-[10px] uppercase font-bold tracking-widest">Live: Hyderabad</span>
          </div>
        </div>
        
        <div className="premium-card absolute bottom-[25%] right-[10%] hidden sm:block">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl">
            <div className="flex gap-1 mb-2">
              {[1,2,3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-white/10" />)}
            </div>
            <p className="text-white/30 text-[8px] uppercase">Data Pipeline</p>
          </div>
        </div>
      </div>

      <div ref={heroText} className="relative z-20 flex flex-col items-center text-center w-full max-w-4xl">
        <div className="reveal-item inline-flex items-center gap-4 mb-6 sm:mb-10 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
          <span className="text-[#87DB20] tracking-[0.5em] uppercase text-[9px] sm:text-[11px] font-bold">
            The Sovereign Agency
          </span>
        </div>

        <h1 className="reveal-item font-heading uppercase text-white leading-[0.85] mb-6 sm:mb-8 text-[18vw] sm:text-[12vw] lg:text-[130px] drop-shadow-2xl">
          Elevate <span className="text-gradient">Hub</span>
        </h1>

        <p className="reveal-item text-white/50 tracking-[0.2em] mb-10 sm:mb-14 uppercase text-[10px] sm:text-xs md:text-sm max-w-[320px] sm:max-w-[550px] leading-relaxed">
          Healthcare's Most Disciplined Growth Partner. <br className="hidden sm:block" />
          Engineering Market Dominance Since 2026.
        </p>

        <div className="reveal-item w-full flex justify-center max-w-[80vw]">
          <button 
            ref={buttonRef}
            className="group relative w-full sm:w-auto overflow-hidden bg-[#87DB20] px-6 py-3 sm:px-10 sm:py-4 lg:px-12 lg:py-5 rounded-md"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_rgba(135,219,32,0.8)_0%,_transparent_70%)]" />
            
            <span className="relative z-10 flex items-center justify-center gap-3 text-black font-semibold uppercase text-[10px] sm:text-xs md:text-sm tracking-[0.15em]">
              Claim Your Strategy Call
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full px-6 sm:px-12 flex justify-between items-end pointer-events-none z-30">
        <div className="flex flex-col gap-1">
          <div className="w-12 h-[1px] bg-white/20" />
          <p className="text-white/30 text-[8px] tracking-[0.4em] uppercase font-bold">Protocol v1.0</p>
        </div>
        <p className="text-white/30 text-[8px] tracking-[0.4em] uppercase font-bold">Est. 2026</p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#0F1115] to-transparent pointer-events-none z-15" />
    </section>
  );
}