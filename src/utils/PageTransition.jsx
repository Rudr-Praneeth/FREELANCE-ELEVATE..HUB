import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

function useGsap(callback, deps = []) {
  const refs = useRef({});
  const setRef = useCallback(
    (key) => (el) => {
      refs.current[key] = el;
    },
    [],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let ctx = gsap.context(() => {
      callback(refs.current);
    });
    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, deps);

  return setRef;
}

export default function RevealAnimation({ onComplete, isVisible }) {
  const setRef = useGsap(({ elevate, hub, mask, overlay }) => {
    gsap.set(overlay, { opacity: 1, visibility: "visible" });

    gsap.set(mask, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    });

    gsap.set([elevate, hub], {
      opacity: 0,
      y: 30,
    });

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
    });

    tl.to([elevate, hub], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    })
      .to(elevate, { x: "-12vw", duration: 1.4 }, "+=0.2")
      .to(hub, { x: "12vw", duration: 1.4 }, "<")
      .to(
        mask,
        {
          clipPath: "polygon(-30% -10%, 130% -30%, 160% 130%, -20% 110%)",
          duration: 1.6,
        },
        "-=1",
      )
      .to([elevate, hub], { opacity: 0, scale: 1.3, duration: 0.6 }, "-=1.2")
      .to(overlay, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          document.body.style.overflow = "auto";
          if (onComplete) onComplete();
        },
      });
  }, []);

  return (
    <div
      ref={setRef("overlay")}
      className="cursor-none fixed inset-0 w-screen h-screen bg-bg-primary z-[9999] flex items-center justify-center overflow-hidden invisible"
    >
      <div
        ref={setRef("mask")}
        className="absolute inset-0 bg-bg-contrast will-change-[clip-path]"
      />

      <div className="relative z-20 flex items-center justify-center gap-4">
        <h1
          ref={setRef("elevate")}
          className="text-black text-7xl font-black uppercase italic tracking-tighter"
        >
          Elevate
        </h1>
        <h1
          ref={setRef("hub")}
          className="text-accent text-7xl font-black uppercase italic tracking-tighter"
        >
          Hub
        </h1>
      </div>
    </div>
  );
}
