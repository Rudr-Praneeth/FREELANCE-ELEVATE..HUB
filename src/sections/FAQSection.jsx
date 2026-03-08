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
      if (isMobile) {
        ScrollTrigger.getAll().forEach(t => t.kill());
        return;
      }

      const questions = gsap.utils.toArray(".faq-question");
      const answers = gsap.utils.toArray(".faq-answer");
      const indicators = gsap.utils.toArray(".faq-indicator");
      const totalSections = questions.length - 1;

      gsap.set(answers, { autoAlpha: 0, y: 40, scale: 0.98 });
      gsap.set(indicators, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSections * 100}%`,
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
          tl.to(answers[i - 1], { autoAlpha: 0, y: -40, scale: 0.98, duration: 0.5 }, i)
            .to(questions[i - 1], { color: "var(--color-text-muted)", opacity: 0.4, duration: 0.3 }, "<")
            .to(indicators[i - 1], { scaleX: 0, duration: 0.3 }, "<")
            .fromTo(answers[i], 
                { autoAlpha: 0, y: 40, scale: 0.98 },
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
          end: `+=${totalSections * 100}%`,
          scrub: true,
        },
      });
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-[var(--color-bg-primary)] overflow-hidden h-screen"
    >
      <div className="container-premium w-full">
        <header className="mb-4 lg:mb-4">
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] font-bold">
            Insight & Strategy
          </span>
          <h2 className="text-h1 font-heading uppercase leading-none">
            Frequently Asked {" "}
            <span className="text-gradient">Questions</span>
          </h2>
        </header>

        {isMobile ? (
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="group border border-[var(--color-border-subtle)] rounded-xl bg-[var(--color-bg-surface)] overflow-hidden transition-all duration-300"
                style={{ borderLeft: activeIndex === i ? '4px solid var(--color-accent)' : '1px solid var(--color-border-subtle)' }}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className={`font-heading text-xl transition-colors ${activeIndex === i ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center transition-transform duration-300 ${activeIndex === i ? 'rotate-45 bg-[var(--color-accent)] border-none' : ''}`}>
                    <span className="text-lg">+</span>
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p className="px-6 pb-6 text-base text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border-subtle)] pt-4 mt-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative flex items-start gap-8">
            <div className="relative w-1/2 py-10">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-bg-elevated)]" />
              <div
                ref={progressRef}
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-accent)] origin-top scale-y-0"
              />
              <ul className="space-y-4 pl-10">
                {faqs.map((faq, i) => (
                  <li
                    key={i}
                    className="faq-question relative text-3xl font-heading uppercase opacity-40 transition-all duration-300"
                  >
                    {faq.question}
                    <span className="faq-indicator block mt-4 h-[2px] w-12 origin-left bg-[var(--color-accent)]" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative w-1/2 ">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="faq-answer absolute inset-0 w-full h-[450px] flex flex-col justify-center rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-12 shadow-soft"
                >
                    <div className="mb-6 w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center font-heading text-2xl">
                        0{i + 1}
                    </div>
                  <h4 className="text-4xl font-heading mb-6 text-[var(--color-text-primary)] leading-tight uppercase">
                    {faq.question}
                  </h4>
                  <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}