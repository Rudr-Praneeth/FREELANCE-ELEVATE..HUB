import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export default function WhyUs() {
  const containerRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power3.out"
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="bg-bg-primary py-24 flex items-center">
      <div className="container-premium grid lg:grid-cols-2 gap-12 items-center">

        <div className="max-w-xl">

          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-14 bg-accent"></div>
            <span className="text-small uppercase tracking-[0.3em] text-muted">
              Distinctive Value
            </span>
          </div>

          <h1 className="text-[var(--text-hero)] leading-[0.9] mb-6">
            Why Serious Healthcare
            <br />
            Leaders Choose
            <br />
            <span className="text-[var(--color-accent)]">Elevate Hub</span>
          </h1>

          <p className="text-[var(--text-body-lg)] text-[var(--color-text-secondary)] leading-relaxed">
            Any agency can run ads. Very few understand the dynamics of patient trust,
            healthcare credibility, and what it truly takes to grow a medical practice.
          </p>

          <p className="text-[var(--text-body-lg)] text-[var(--color-text-secondary)] leading-relaxed mb-12">
            Here is what makes our work different.
          </p>

          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-14 bg-accent"></div>
            <span className="text-small uppercase tracking-[0.3em] text-muted">
              Our Philosophy
            </span>
          </div>

          <div className="bg-bg-contrast rounded-[var(--radius-lg)] px-6 py-8 shadow-elevated">
            <p className="text-white text-h3 font-heading leading-tight uppercase">
              The Practices That Move First
              Own Their City For Years.
            </p>

            <p className="text-accent text-h3 font-heading leading-tight uppercase">
              The Window In Hyderabad
              Is Still Open. Barely.
            </p>
          </div>

        </div>

        <div className="flex flex-col gap-6">

          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="bg-[var(--color-bg-surface)] p-7 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-soft)]"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-heading text-5xl text-[var(--color-bg-elevated)] leading-none">
                01
              </span>
              {/* <div className="w-10 h-10 rounded-full border border-[var(--color-accent)] flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[var(--color-accent)] rounded-full"></div>
              </div> */}
            </div>

            <h3 className="text-h4 font-heading uppercase font-semibold tracking-wide">
              Healthcare Is All We Do.
            </h3>

            <p className="text-[var(--color-text-secondary)] text-body tracking-tight">
              Every strategy and system we build is designed specifically for medical practices.
              The dynamics of patient trust and credibility are completely different here.
            </p>

            <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] text-[var(--color-text-muted)] text-xs uppercase">
              Healthcare-Only Focus
            </div>
          </div>

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="bg-[var(--color-bg-surface)] p-7 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-soft)]"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-heading text-5xl text-[var(--color-bg-elevated)] leading-none">
                02
              </span>
              {/* <div className="w-10 h-10 rounded-full border border-[var(--color-accent)] flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[var(--color-accent)] rounded-full"></div>
              </div> */}
            </div>

            <h3 className="text-h4 font-heading uppercase font-semibold tracking-wide">
              We Build Systems,
              Not Campaigns.
            </h3>

            <p className="text-[var(--color-text-secondary)] text-body tracking-tight">
              Campaigns end. Systems compound. Our approach is engineered for
              consistent patient acquisition instead of short bursts of growth.
            </p>

            <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] text-[var(--color-text-muted)] text-xs uppercase">
              Proprietary Growth Framework
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}