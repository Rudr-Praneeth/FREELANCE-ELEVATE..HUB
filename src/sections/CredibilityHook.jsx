import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CredibilityHook() {
  const container = useRef()
  const headlineOne = useRef()
  const headlineTwo = useRef()
  const paragraph = useRef()
  const quoteContainer = useRef()
  const quotes = useRef([])
  const closing = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%"
      }
    })

    tl.from(headlineOne.current, {
      y: 80,
      opacity: 0,
      duration: 1.1,
      ease: "power4.out"
    })

    tl.from(headlineTwo.current, {
      y: 40,
      opacity: 0,
      duration: 0.9
    }, "-=0.6")

    tl.from(paragraph.current, {
      x: -40,
      opacity: 0,
      duration: 1
    }, "-=0.6")

    tl.from(quoteContainer.current, {
      opacity: 0,
      scale: 0.96,
      duration: 1
    }, "-=1")

    const quoteTl = gsap.timeline({ repeat: -1 })

    quotes.current.forEach((quote) => {
      quoteTl
        .to(quote, { opacity: 1, y: 0, duration: 0.8 })
        .to(quote, { opacity: 0, y: -20, duration: 0.8 }, "+=3")
    })

    tl.from(closing.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.9
    }, "-=0.5")
  }, { scope: container })

  const doctorQuotes = [
    "My competitor’s clinic is fully booked every week. I genuinely don’t understand how. My practice has better equipment and better patient care. I’ve spent lakhs on agencies and ads — but I still cannot see where the patients are supposed to come from.",
    "We post on Instagram every week and our page looks professional. But when I check the appointment book, nothing changed. Patients are not coming from social media the way everyone promised they would.",
    "Every month I spend around ₹70,000 on Google Ads. The agency sends reports with graphs and numbers, but none of it tells me if those ads actually turned into real patients walking into the clinic.",
    "A clinic two streets away from mine appears first on Google for everything. They get all the calls. Patients literally tell my receptionist they found the other clinic online first.",
    "I do not want another marketing agency that needs me to manage them. I want a structured system that reliably brings patients so I can focus on practicing medicine."
  ]

  return (
    <section ref={container} className="bg-surface-gradient min-h-screen flex items-center">
      <div className="container-premium grid lg:grid-cols-2 gap-16 items-start">

        <div className="max-w-2xl">

          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-16 bg-accent"></div>
            <span className="text-small uppercase tracking-[0.25em] text-muted">
              The Real Problem
            </span>
          </div>

          <h1
            ref={headlineOne}
            className="text-hero leading-[0.9]"
          >
            Your Competitor's <br />
            Clinic Is Full.
          </h1>

          <h1
            ref={headlineTwo}
            className="text-hero leading-[0.9] text-gradient mb-10"
          >
            Yours Deserves To Be.
          </h1>

          <p className="text-small uppercase tracking-wider text-muted mb-6">
            The question isn't whether marketing works. <br />
            It's why yours isn't — yet.
          </p>

          <div
            ref={paragraph}
            className="border-l-2 border-accent pl-8 space-y-6 max-w-xl"
          >
            <p className="text-[var(--text-body-lg)]">
              Most healthcare practices in Hyderabad are invisible online —
              not because they lack skill, but because no one built them a
              system that actually works.
            </p>

            <p className="text-[var(--text-body-lg)]">
              You've invested in agencies before. What you got back was noise —
              content calendars, weekly check-ins, and a bill that never
              connected to a single new patient walking through your door.
            </p>

            <p className="text-[var(--text-body-lg)] font-semibold text-accent">
              That's not marketing. That's expensive activity.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">

          <div
            ref={quoteContainer}
            className="bg-bg-contrast rounded-[var(--radius-xl)] p-10 md:p-12 min-h-[340px] flex flex-col justify-center relative overflow-hidden shadow-elevated"
          >
            <div className="absolute top-6 left-8 text-accent/20 text-7xl font-heading">
              “
            </div>

            <div className="relative h-40 flex items-center">
              {doctorQuotes.map((text, i) => (
                <p
                  key={i}
                  ref={(el) => (quotes.current[i] = el)}
                  className="absolute inset-0 opacity-0 translate-y-6 text-white text-[var(--text-h3)] leading-relaxed"
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-accent"></div>
              <span className="text-white/40 text-small uppercase tracking-[0.25em]">
                Common Frustration. Completely Fixable.
              </span>
            </div>
          </div>

          <div
            ref={closing}
            className="bg-elevated rounded-[var(--radius-lg)] p-8 mt-10"
          >
            <h3 className="text-[var(--text-h3)] mb-2">
              These are not marketing problems.
            </h3>

            <h2 className="text-[var(--text-h2)] text-gradient">
              They are visibility & system problems.
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}