import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

function useGsap(callback, deps = []) {
  const refs = useRef({});
  const setRef = useCallback((key) => (el) => { refs.current[key] = el; }, []);

  useEffect(() => {
    let ctx = gsap.context(() => { callback(refs.current); });
    return () => ctx.revert();
  }, deps);

  return setRef;
}

export default function PageTransition({ onComplete }) {
  const setRef = useGsap(({ elevate, hub, mask, overlay }) => {
    const tl = gsap.timeline({
      onComplete: () => { if (onComplete) onComplete(); },
    });

    tl.set(mask, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    })
    .fromTo([elevate, hub], 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }
    )
    .to(elevate, { x: "-10vw", duration: 1.2, ease: "expo.inOut" }, "+=0.2")
    .to(hub, { x: "10vw", duration: 1.2, ease: "expo.inOut" }, "<")
    .to(mask, {
      clipPath: "polygon(-20% 0%, 120% -20%, 150% 120%, -10% 100%)",
      duration: 1.5,
      ease: "expo.inOut"
    }, "-=0.8")
    .to([elevate, hub], { opacity: 0, scale: 1.2, duration: 0.5 }, "-=1")
    .to(overlay, { opacity: 0, duration: 0.5, pointerEvents: "none" });
  }, []);

  return (
    <div
      ref={setRef("overlay")}
      className="cursor-none fixed inset-0 w-screen h-screen bg-bg-primary z-[9999] flex items-center justify-center overflow-hidden"
    >
      <div 
        ref={setRef("mask")} 
        className="absolute inset-0 bg-bg-contrast" 
      />
      
      <div className="relative z-20 flex items-center justify-center gap-4">
        <h1 ref={setRef("elevate")} className="text-black text-7xl font-black uppercase italic tracking-tighter">
          Elevate
        </h1>
        <h1 ref={setRef("hub")} className="text-accent text-7xl font-black uppercase italic tracking-tighter">
          Hub
        </h1>
      </div>
    </div>
  );
}