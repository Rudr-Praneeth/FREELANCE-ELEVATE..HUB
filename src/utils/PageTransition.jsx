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
    let ctx = gsap.context(() => {
      callback(refs.current);
    });

    return () => ctx.revert();
  }, deps);

  return setRef;
}

export default function PageTransition({ onComplete }) {
  const setRef = useGsap(({ elevate, hub, block, overlay }) => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.fromTo(
      elevate,
      { x: "100%", opacity: 0 },
      { x: "0vw", opacity: 1, duration: 1 },
    )
      .fromTo(
        hub,
        { x: "100%", opacity: 0 },
        { x: "0vw", opacity: 1, duration: 1 },
        "+=0.3",
      )
      .fromTo(
        block,
        { width: 0 },
        { width: "70vw", duration: 1, ease: "power2.inOut" },
      )
      .to(block, {
        scaleX: 20,
        scaleY: 100,
        duration: 1.5,
        ease: "power1.inOut",
      })
      .to([elevate, hub], { opacity: 0, duration: 0.05 }, "-=1.25")
      .to(overlay, {
        backgroundColor: "#000000",
        duration: 0.5,
      });
  }, []);

  return (
    <div
      ref={setRef("overlay")}
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-start bg-bg-primary overflow-hidden px-10 z-[9999]"
    >
      <div className="flex items-center w-full font-heading">
        <h1
          ref={setRef("elevate")}
          className="text-text-muted text-6xl font-bold"
        >
          Elevate
        </h1>

        <div
          ref={setRef("block")}
          className="bg-bg-contrast h-16 mx-2 origin-center"
        />

        <h1 ref={setRef("hub")} className="text-surface text-6xl font-bold">
          Hub
        </h1>
      </div>
    </div>
  );
}