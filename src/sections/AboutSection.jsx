import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CircularText({ text }) {
  const circleRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spin = gsap.to(circleRef.current, {
        rotate: 360,
        duration: 30,
        ease: "linear",
        repeat: -1,
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600",
        scrub: true,
        markers: true, 
        onEnter: () => spin.kill(),
        onUpdate: (self) => {
          const progress = self.progress;

          gsap.set(circleRef.current, {
            rotateY: progress * 360,
            rotateX: gsap.utils.interpolate(15, -15, progress),
            perspective: 1000,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const letters = Array.from(text);

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div
        ref={circleRef}
        className="relative w-[420px] h-[420px]"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {letters.map((letter, i) => {
          const angle = (360 / letters.length) * i;
          const radius = 70;

          return (
            <span
              key={i}
              className="absolute inset-0 flex items-start justify-center text-white font-bold select-none"
              style={{
                transform: `
                  rotate(${angle}deg)
                  translateY(-${radius}px)
                `,
                fontSize: "1.4rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <div className="relative overflow-hidden py-32 bg-black">
      <div className="container-premium grid md:grid-cols-2 gap-16 items-center">
        <div className="relative flex items-center justify-center h-[600px]">
          <CircularText text=" LOREM • IPSUM • DOLOR • SIT • AMET • CONSECTETUR • " />
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900"
            alt="Portrait"
            className="relative z-10 h-[380px] object-contain drop-shadow-2xl"
          />
        </div>

        <div className="text-white">
          <h2 className="mb-6 text-4xl font-bold">Lorem Ipsum Dolor</h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-white to-transparent mb-6"></div>
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p>
            Turpis tincidunt id aliquet risus feugiat in ante metus dictum.
          </p>
        </div>
      </div>
    </div>
  );
}