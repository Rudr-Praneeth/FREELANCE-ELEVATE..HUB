import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FAQScrollSection() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "We have worked with agencies before. What makes this different?",
      answer: "Most agencies apply a generic digital marketing model to healthcare clients. We work exclusively in the healthcare and professional services space. Our frameworks are built around patient decision behaviour, not consumer e-commerce or B2B lead generation.",
    },
    {
      question: "How long before we see measurable results?",
      answer: "Performance advertising typically produces measurable lead-to-consultation data within 30 to 45 days. SEO and organic reputation build over 90 to 180 days. We set honest benchmarks at the start of every engagement and track against them monthly.",
    },
    {
      question: "How involved do I need to be once we start?",
      answer: "Minimal. A monthly review call and occasional input on clinical content direction is typically all that is required. We are structured to operate independently. You run the practice. We run the growth.",
    },
    {
      question: "What is the investment to work with you?",
      answer: "Our engagements are designed for practices with a marketing investment comfort of ₹50,000 to ₹1,00,000+ per month. We focus on genuine growth where strategy isn't constrained by an under-resourced budget.",
    },
    {
      question: "Do you work with multiple competing clinics in the same city?",
      answer: "No. Once we take on a speciality in a geography, we do not work with a competitor in the same market. Exclusivity is part of how we maintain the integrity of our positioning for every client.",
    },
    {
      question: "How do you handle healthcare marketing compliance?",
      answer: "We are aware of the regulatory sensitivities in India. All campaigns are developed within legal boundaries. We do not make therapeutic claims or use tactics that could put your registration at risk.",
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (isMobile) return;

      const questions = gsap.utils.toArray(".faq-question");
      const answers = gsap.utils.toArray(".faq-answer");
      const indicators = gsap.utils.toArray(".faq-indicator");

      if (questions.length === 0) return;

      const totalSections = questions.length - 1;

      gsap.set(answers, { autoAlpha: 0, y: 20, scale: 0.95 });
      gsap.set(indicators, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSections * 80}%`,
          pin: true,
          scrub: 1,
          snap: 1 / totalSections,
          invalidateOnRefresh: true,
        },
      });

      questions.forEach((q, i) => {
        if (i === 0) {
          gsap.set(q, { color: "var(--color-text-primary)", opacity: 1 });
          gsap.set(indicators[i], { scaleX: 1 });
          gsap.set(answers[i], { autoAlpha: 1, y: 0, scale: 1 });
        } else {
          tl.to(answers[i - 1], { autoAlpha: 0, y: -20, scale: 0.95, duration: 0.5 }, i)
            .to(questions[i - 1], { color: "var(--color-text-muted)", opacity: 0.3, duration: 0.3 }, "<")
            .to(indicators[i - 1], { scaleX: 0, duration: 0.3 }, "<")
            .fromTo(answers[i], 
                { autoAlpha: 0, y: 20, scale: 0.95 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, "<")
            .to(questions[i], { color: "var(--color-text-primary)", opacity: 1, duration: 0.3 }, "<")
            .to(indicators[i], { scaleX: 1, duration: 0.3 }, "<");
        }
      });

      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSections * 80}%`,
          scrub: true,
        },
      });
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[var(--color-bg-primary)] overflow-hidden flex flex-col justify-center py-8"
    >
      <div className="container-premium w-full pt-4">
        <header className="">
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] font-semibold mb-3 block">
            Insight & Strategy
          </span>
          <h2 className="text-3xl md:text-5xl font-heading leading-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </header>

        {isMobile ? (
          <div className="flex flex-col gap-12 mt-16">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="group border border-[var(--color-border-subtle)] rounded-lg bg-[var(--color-bg-surface)] overflow-hidden transition-all duration-300"
                style={{ borderLeft: activeIndex === i ? '2px solid var(--color-accent)' : '1px solid var(--color-border-subtle)' }}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
                >
                  <span className={`font-body text-base font-medium transition-colors pr-4 ${activeIndex === i ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-6 h-6 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center transition-all duration-300 ${activeIndex === i ? 'rotate-45 bg-[var(--color-accent)] border-transparent text-black' : 'text-[var(--color-text-muted)]'}`}>
                    <span className="text-sm leading-none">+</span>
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p className="px-5 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed pt-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative flex items-center gap-8 lg:gap-12">
            <div className="relative w-5/12 py-8">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--color-border-subtle)]" />
              <div
                ref={progressRef}
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-accent)] origin-top scale-y-0 shadow-[0_0_10px_var(--color-accent)]"
              />
              <ul className="space-y-2 pl-8">
                {faqs.map((faq, i) => (
                  <li
                    key={i}
                    className="faq-question relative text-body-lg opacity-30 transition-all duration-300 cursor-default"
                  >
                    {faq.question}
                    <span className="faq-indicator block mt-3 h-[1px] w-8 origin-left bg-[var(--color-accent)]" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative w-7/12 h-[380px]">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="faq-answer absolute inset-0 w-full h-full flex flex-col justify-center rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]/40 backdrop-blur-md p-10 lg:p-14"
                >
                  <div className="mb-8 flex items-center gap-4">
                    <span className="text-xs font-mono tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1 rounded-full">
                      0{i + 1}
                    </span>
                  </div>
                  <h4 className="text-2xl lg:text-3xl font-heading mb-6 text-[var(--color-text-primary)] leading-tight">
                    {faq.question}
                  </h4>
                  <p className="text-base lg:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}