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
  const setRef = useGsap(({ elevate, hub, block }) => {
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
      .fromTo(block, { width: 0 }, { width: "70vw", duration: 1 })
      .to(block, {
        scaleX: 20,
        scaleY: 100,
        duration: 1,
      })
      .to([elevate, hub], { opacity: 0, duration: 0.1 }, "-=0.9")
      .to(block, {
        opacity: 0,
        duration: 0.5,
      });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-start bg-bg-primary overflow-hidden px-10 z-[9999]">
      <div className="flex items-center w-full font-heading">
        <h1
          ref={setRef("elevate")}
          className="text-text-muted text-6xl font-bold"
        >
          Elevate
        </h1>

        <div
          ref={setRef("block")}
          className="bg-white h-16 mx-2 origin-center"
        />

        <h1 ref={setRef("hub")} className="text-white text-6xl font-bold">
          Hub
        </h1>
      </div>
    </div>
  );
}
