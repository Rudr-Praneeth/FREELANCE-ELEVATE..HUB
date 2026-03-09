import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const cursor = cursorRef.current;
      const follower = followerRef.current;

      gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

      const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
      const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

      const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
      const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

      const moveCursor = (e) => {
        xToCursor(e.clientX);
        yToCursor(e.clientY);
        xToFollower(e.clientX);
        yToFollower(e.clientY);
      };

      const handleEnter = () => {
        gsap.to(cursor, {
          scale: 4,
          backgroundColor: "var(--color-accent)",
          duration: 0.3,
          ease: "power3.out",
        });

        gsap.to(follower, {
          scale: 1.2,
          opacity: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleLeave = () => {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "var(--color-accent)",
          duration: 0.3,
          ease: "power3.out",
        });

        gsap.to(follower, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      window.addEventListener("pointermove", moveCursor);

      const interactive = document.querySelectorAll("a, button, .clickable-card");

      interactive.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });

      return () => {
        window.removeEventListener("pointermove", moveCursor);

        interactive.forEach((el) => {
          el.removeEventListener("mouseenter", handleEnter);
          el.removeEventListener("mouseleave", handleLeave);
        });
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--color-accent)] z-[10000]"
      />

      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-black/20 mix-blend-difference z-[9999]"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      />

      <style>
        {`
        @media (min-width: 1024px) {
          body {
            cursor: none !important;
          }
          a, button, .clickable-card {
            cursor: none !important;
          }
        }
      `}
      </style>
    </div>
  );
}