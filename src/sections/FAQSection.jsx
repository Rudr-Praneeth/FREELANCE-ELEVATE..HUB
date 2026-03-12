import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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

export default function FAQScrollSection() {
  const containerRef = useRef(null);
  const desktopWrapperRef = useRef(null);
  const progressRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const questions = gsap.utils.toArray(".faq-question");
        const answers = gsap.utils.toArray(".faq-answer");
        const indicators = gsap.utils.toArray(".faq-indicator");

        if (questions.length === 0) return;

        const totalSections = questions.length - 1;

        gsap.set(answers, { autoAlpha: 0, y: 20, scale: 0.98 });
        gsap.set(indicators, { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            end: `+=${totalSections * 80}%`,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / totalSections,
              duration: 0.3,
              ease: "power1.inOut",
            },
            invalidateOnRefresh: true,
          },
        });

        questions.forEach((q, i) => {
          if (i === 0) {
            gsap.set(q, { color: "var(--color-text-primary)", opacity: 1 });
            gsap.set(indicators[i], { scaleX: 1 });
            gsap.set(answers[i], { autoAlpha: 1, y: 0, scale: 1 });
          } else {
            tl.to(answers[i - 1], { autoAlpha: 0, y: -20, scale: 0.98, duration: 0.5, ease: "power2.out" }, i)
              .to(questions[i - 1], { color: "var(--color-text-muted)", opacity: 0.4, duration: 0.3 }, "<")
              .to(indicators[i - 1], { scaleX: 0, duration: 0.3 }, "<")
              
              .fromTo(answers[i],
                { autoAlpha: 0, y: 20, scale: 0.98 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }, "<+0.1")
              .to(questions[i], { color: "var(--color-text-primary)", opacity: 1, duration: 0.3 }, "<")
              .to(indicators[i], { scaleX: 1, duration: 0.3 }, "<");
          }
        });

        gsap.to(progressRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            end: `+=${totalSections * 80}%`,
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-primary flex flex-col justify-center py-10"
    >
      <div className="container-premium w-full max-w-6xl mx-auto px-4 md:px-8">
        
        <header className="mb-8">
          <span className="text-sm tracking-[0.2em] uppercase text-[var(--color-accent)] font-semibold mb-2 block font-body">
            Insight & Strategy
          </span>
          <h2 className="text-5xl lg:text-6xl font-heading leading-none text-[var(--color-text-primary)]">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </header>

        <div className="flex lg:hidden flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`group border rounded-lg bg-surface overflow-hidden transition-all duration-300 ${
                activeIndex === i 
                  ? 'border-[var(--color-accent)] success-glow' 
                  : 'border-subtle hover:border-[var(--color-text-muted)]'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left bg-transparent"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-heading text-gradient leading-none mt-1">
                    0{i + 1}
                  </span>
                  <span className={`font-body text-base font-medium transition-colors duration-300 ${
                    activeIndex === i ? 'text-[var(--color-text-primary)]' : 'text-muted'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-transform duration-300 ${
                  activeIndex === i 
                    ? 'rotate-45 bg-[var(--color-accent)] border-transparent text-black' 
                    : 'bg-transparent border-subtle text-muted group-hover:bg-elevated'
                }`}>
                  <span className="text-sm leading-none font-light">+</span>
                </div>
              </button>
              
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  activeIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 pl-14 text-sm text-[var(--color-text-secondary)] font-body leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={desktopWrapperRef} className="hidden lg:flex relative items-center gap-8 h-[340px] mt-6">
          
          <div className="relative w-5/12 py-4 h-full flex flex-col justify-center">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--color-border-subtle)]" />
            <div
              ref={progressRef}
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-accent)] origin-top scale-y-0 success-glow"
            />
            
            <ul className="space-y-6 pl-8">
              {faqs.map((faq, i) => (
                <li
                  key={i}
                  className="faq-question relative text-lg font-medium font-body opacity-40 transition-all duration-300 cursor-default flex items-center gap-4"
                >
                  <span className="faq-indicator absolute -left-8 top-1/2 -translate-y-1/2 h-[2px] w-5 origin-left bg-[var(--color-accent)] scale-x-0" />
                  {faq.question}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-7/12 h-full">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-answer absolute inset-0 w-full h-full flex flex-col justify-center rounded-xl border border-subtle bg-surface/80 backdrop-blur-md p-8 shadow-elevated"
              >
                <div className="mb-4">
                  <span className="text-6xl font-heading text-gradient leading-none block">
                    0{i + 1}
                  </span>
                </div>
                <h4 className="text-2xl font-heading mb-3 text-[var(--color-text-primary)] leading-tight">
                  {faq.question}
                </h4>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)] font-body">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}