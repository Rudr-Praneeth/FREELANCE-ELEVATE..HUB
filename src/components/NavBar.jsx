import { useState, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const linksRef = useRef([])
  const overlayRef = useRef(null)
  const tl = useRef(null)

  const links = [
    "THE SYSTEM",
    "WHY US",
    "OUR STORY",
    "CASE STUDIES"
  ]

  const { contextSafe } = useGSAP(() => {
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2
    })

    tl.current = gsap.timeline({ paused: true })

    tl.current
      .to(menuRef.current, {
        display: "flex",
        duration: 0
      })
      .to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.1,
        ease: "expo.inOut"
      })
      .fromTo(
        linksRef.current,
        { 
          y: 120, 
          rotateX: -30, 
          skewY: 5,
          opacity: 0 
        },
        {
          y: 0,
          rotateX: 0,
          skewY: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.6"
      )
  }, [])

  const toggleMenu = contextSafe(() => {
    if (!open) {
      setOpen(true)
      tl.current.play()
    } else {
      tl.current.reverse()
      setTimeout(() => setOpen(false), 1100)
    }
  })

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full border-b border-subtle z-[100] bg-[var(--color-bg-primary)]/80 backdrop-blur-md"
      >
        <div className="container-premium flex items-center justify-between h-[80px]">
          <div className="logo text-xl text-[var(--color-text-primary)]">
            ELEVATE<span className="text-[var(--color-accent)]">HUB</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {links.map((link, i) => (
              <a
                key={i}
                className="group relative overflow-hidden text-[12px] tracking-[0.2em] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{link}</span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-500 group-hover:-translate-y-full text-[var(--color-accent)]">{link}</span>
              </a>
            ))}
          </div>
            <button className="hidden lg:block px-7 py-2.5 text-[10px] tracking-[0.2em] font-bold bg-[var(--color-bg-contrast)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-contrast)] transition-all duration-300">
              BOOK A CALL
            </button>
          <button
            onClick={toggleMenu}
            className="group flex flex-col items-end gap-1.5 z-[110] lg:hidden"
          >
            <span className={`h-[2px] bg-[var(--color-text-primary)] transition-all duration-500 ease-in-out ${open ? "w-8 -rotate-45 translate-y-[4px] bg-white" : "w-8"}`}></span>
            <span className={`h-[2px] bg-[var(--color-text-primary)] transition-all duration-500 ease-in-out ${open ? "w-8 rotate-45 -translate-y-[4px] bg-white" : "w-5 group-hover:w-8"}`}></span>
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 hidden z-[90] flex-col justify-center items-center overflow-hidden"
      >
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-[var(--color-bg-contrast)]"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
        />
        
        <div className="relative z-10 flex flex-col items-center gap-4 w-full">
          {links.map((link, i) => (
            <div key={i} className="overflow-hidden py-2">
              <a
                ref={el => linksRef.current[i] = el}
                className="block text-6xl md:text-8xl font-heading tracking-tighter text-white hover:text-[var(--color-accent)] transition-colors cursor-pointer"
              >
                {link}
              </a>
            </div>
          ))}

          <div className="overflow-hidden mt-8">
            <button
              ref={el => linksRef.current[links.length] = el}
              className="px-10 py-4 bg-[var(--color-accent)] text-[var(--color-bg-contrast)] rounded-[var(--radius-md)] text-[20px] tracking-[0.3em] font-bold hover:scale-105 transition-transform"
            >
              START A PROJECT
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-8 text-[9px] tracking-[0.4em] text-white/20 z-10 font-semibold">
          <span className="hover:text-[var(--color-accent)] cursor-pointer transition-colors">INSTAGRAM</span>
          <span className="hover:text-[var(--color-accent)] cursor-pointer transition-colors">TWITTER</span>
          <span className="hover:text-[var(--color-accent)] cursor-pointer transition-colors">LINKEDIN</span>
        </div>
      </div>
    </>
  )
}