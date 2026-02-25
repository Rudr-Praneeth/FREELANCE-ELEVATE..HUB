import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FAQScrollSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const questions = gsap.utils.toArray(".faq-question");
      const answers = gsap.utils.toArray(".faq-answer");
      const indicators = gsap.utils.toArray(".faq-indicator");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + (questions.length - 1) * 40 + "%",
          pin: true,
          pinSpacing: true,
          scrub: true,
          snap: 1 / (questions.length - 1),
        },
      });

      questions.forEach((q, i) => {
        if (i === 0) {
          gsap.set(q, { color: "var(--color-accent)", scale: 1.05 });
          gsap.set(indicators[i], { scaleX: 1 });
          gsap.set(answers[i], { autoAlpha: 1, y: 0 });
        } else {
          tl.set(q, { color: "var(--color-accent)", scale: 1.05 }, i)
            .set(indicators[i], { scaleX: 1 }, "<")
            .to(answers[i], { autoAlpha: 1, y: 0, duration: 0.25 }, "<")
            .set(
              questions[i - 1],
              { color: "var(--color-text-muted)", scale: 1 },
              "<",
            )
            .set(indicators[i - 1], { scaleX: 0 }, "<")
            .to(answers[i - 1], { autoAlpha: 0, y: 20, duration: 0.25 }, "<");
        }
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[var(--color-bg-primary)] min-h-screen px-4 sm:px-6 lg:px-8"
    >
      <div className="container-premium flex h-full flex-col py-12 sm:py-16">
        <header className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-muted mt-3">
            Clear answers to common questions about how everything works.
          </p>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row items-center gap-10 lg:gap-0">
          <ul className="flex w-full lg:w-1/2 flex-col items-center justify-center gap-6 sm:gap-8 text-xl sm:text-2xl lg:text-h3 font-medium text-muted">
            <li className="faq-question relative flex flex-col items-center text-center px-4">
              QUESTION 1
              <span className="faq-indicator mt-3 h-px w-12 sm:w-14 origin-left scale-x-0 bg-[var(--color-accent)]" />
            </li>
            <li className="faq-question relative flex flex-col items-center text-center px-4">
              QUESTION 2
              <span className="faq-indicator mt-3 h-px w-12 sm:w-14 origin-left scale-x-0 bg-[var(--color-accent)]" />
            </li>
            <li className="faq-question relative flex flex-col items-center text-center px-4">
              QUESTION 3
              <span className="faq-indicator mt-3 h-px w-12 sm:w-14 origin-left scale-x-0 bg-[var(--color-accent)]" />
            </li>
          </ul>

          <div className="relative flex w-full lg:w-1/2 items-center justify-center min-h-[280px] sm:min-h-[340px]">
            <div className="faq-answer absolute w-full max-w-md sm:max-w-lg rounded-xl border border-subtle bg-surface-gradient p-6 sm:p-8 lg:p-10 opacity-0 translate-y-5 shadow-elevated">
              <h4 className="mb-4 font-heading text-xl sm:text-2xl lg:text-h3 text-[var(--color-text-primary)]">
                QUESTION 1
              </h4>
              <p className="text-sm sm:text-base lg:text-body-lg leading-relaxed">
                This is the detailed answer for question one. It explains the
                concept clearly, provides context, and gives enough information
                to resolve the user’s doubt.
              </p>
            </div>

            <div className="faq-answer absolute w-full max-w-md sm:max-w-lg rounded-xl border border-subtle bg-surface-gradient p-6 sm:p-8 lg:p-10 opacity-0 translate-y-5 shadow-elevated">
              <h4 className="mb-4 font-heading text-xl sm:text-2xl lg:text-h3 text-[var(--color-text-primary)]">
                QUESTION 2
              </h4>
              <p className="text-sm sm:text-base lg:text-body-lg leading-relaxed">
                This answer expands on the second question with structured
                explanation, focusing on clarity, intent, and practical
                understanding.
              </p>
            </div>

            <div className="faq-answer absolute w-full max-w-md sm:max-w-lg rounded-xl border border-subtle bg-surface-gradient p-6 sm:p-8 lg:p-10 opacity-0 translate-y-5 shadow-elevated">
              <h4 className="mb-4 font-heading text-xl sm:text-2xl lg:text-h3 text-[var(--color-text-primary)]">
                QUESTION 3
              </h4>
              <p className="text-sm sm:text-base lg:text-body-lg leading-relaxed">
                This section provides a complete breakdown of the third
                question, ensuring the information is concise, readable, and
                visually separated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}