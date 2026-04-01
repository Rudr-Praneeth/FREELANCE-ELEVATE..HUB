import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function StickyCTA() {
  const btnRef = useRef(null);
  const graphLineRef = useRef(null);
  const graphFillRef = useRef(null);
  const graphGroupRef = useRef(null);
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.set(graphLineRef.current, {
      strokeDasharray: 220,
      strokeDashoffset: 220,
    });

    gsap.set(graphFillRef.current, {
      scaleY: 0,
      transformOrigin: "bottom",
      opacity: 0,
    });
  }, []);

  // 🔥 HOVER ANIMATION (GRAPH COMES ALIVE)
  const handleHover = () => {
    const tl = gsap.timeline();

    tl.to(graphLineRef.current, {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power4.out",
    })
      .to(
        graphFillRef.current,
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        graphGroupRef.current,
        {
          y: -2,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        },
        "-=0.6"
      )
      .to(
        btnRef.current,
        {
          scale: 1.08,
          boxShadow:
            "0 0 25px rgba(135,219,32,0.6), 0 0 80px rgba(135,219,32,0.25)",
          duration: 0.3,
        },
        "-=0.8"
      );
  };

  const handleLeave = () => {
    const tl = gsap.timeline();

    tl.to(graphLineRef.current, {
      strokeDashoffset: 220,
      duration: 0.6,
      ease: "power2.in",
    })
      .to(
        graphFillRef.current,
        {
          scaleY: 0,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.4"
      )
      .to(
        btnRef.current,
        {
          scale: 1,
          boxShadow: "0 0 0px rgba(0,0,0,0)",
          duration: 0.3,
        },
        "-=0.5"
      );
  };

  // 🚀 PANEL OPEN (NEXT LEVEL)
  const openPanel = () => {
    setOpen(true);

    gsap.to(overlayRef.current, {
      opacity: 1,
      backdropFilter: "blur(10px)",
      pointerEvents: "auto",
      duration: 0.4,
    });

    gsap.fromTo(
      panelRef.current,
      {
        x: "120%",
        rotateY: 15,
        scale: 0.9,
        opacity: 0,
      },
      {
        x: "0%",
        rotateY: 0,
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
      }
    );

    gsap.fromTo(
      contentRef.current.children,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        delay: 0.3,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  };

  const closePanel = () => {
    gsap.to(panelRef.current, {
      x: "120%",
      rotateY: 10,
      scale: 0.95,
      opacity: 0,
      duration: 0.5,
      ease: "expo.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
    });

    setTimeout(() => setOpen(false), 500);
  };

  return (
    <>
      {/* BUTTON */}
      <div className="fixed bottom-6 right-6 z-[999]">
        <button
          ref={btnRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={openPanel}
          className="group relative overflow-hidden bg-white text-black px-6 py-3 rounded-full flex items-center gap-3"
        >
          <span className="relative z-10 text-xs font-bold uppercase tracking-wider group-hover:opacity-0 transition">
            Contact Us
          </span>

          <span className="absolute z-10 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition">
            Elevate Now
          </span>

          {/* GRAPH */}
          <svg width="70" height="24" viewBox="0 0 70 24" className="absolute right-2">
            <defs>
              <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#87DB20" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#87DB20" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            <g ref={graphGroupRef}>
              <path
                ref={graphFillRef}
                d="M2 22 L15 14 L25 18 L40 8 L60 4 L60 24 L2 24 Z"
                fill="url(#greenGradient)"
              />

              <path
                ref={graphLineRef}
                d="M2 22 L15 14 L25 18 L40 8 L60 4"
                stroke="#87DB20"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </button>
      </div>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        onClick={closePanel}
        className="fixed inset-0 bg-black/50 opacity-0 pointer-events-none z-[998]"
      />

      {/* PANEL */}
      {open && (
        <div
          ref={panelRef}
          className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0F1115] z-[999] shadow-[0_0_100px_rgba(0,0,0,0.9)] p-8 flex flex-col"
        >
          <div ref={contentRef} className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-bold uppercase">
                Elevate Now
              </h2>
              <button
                onClick={closePanel}
                className="text-white opacity-60 hover:opacity-100"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Name"
              className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-[#87DB20] outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-[#87DB20] outline-none"
            />

            <input
              type="tel"
              placeholder="Phone"
              className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-[#87DB20] outline-none"
            />

            <textarea
              rows={4}
              placeholder="Tell us about your goals"
              className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-[#87DB20] outline-none"
            />

            <button className="mt-4 bg-[#87DB20] text-black py-3 font-bold uppercase tracking-wider hover:scale-[1.03] transition">
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}