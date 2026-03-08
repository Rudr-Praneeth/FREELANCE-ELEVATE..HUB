import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const container = useRef(null);
  const linksRef = useRef([]);

  useGSAP(
    () => {
      gsap.from(".footer-col", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      linksRef.current.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            x: 8,
            color: "var(--color-accent)",
            duration: 0.25,
            ease: "power2.out",
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            x: 0,
            color: "#ffffff",
            duration: 0.25,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: container },
  );

  const addLink = (el) => {
    if (el && !linksRef.current.includes(el)) linksRef.current.push(el);
  };

  return (
    <footer
      ref={container}
      className="bg-[var(--color-bg-contrast)] text-white pt-20 pb-12 shadow-[inset_0_8px_10px_-8px_var(--color-accent)]"
    >
      <div className="container-premium">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="footer-col space-y-5">
            <div className="text-3xl font-bold">
              ELEVATE<span className="text-[var(--color-accent)]">HUB</span>
            </div>

            <p className="text-muted text-body max-w-xs leading-relaxed">
              Patient-focused growth for healthcare practices.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="font-heading text-3xl mb-2">Product</h4>

            <ul className="space-y-4 text-[var(--text-body-lg)]">
              <li ref={addLink} className="cursor-pointer text-white">
                The System
              </li>
              <li ref={addLink} className="cursor-pointer text-white">
                Case Studies
              </li>
              <li ref={addLink} className="cursor-pointer text-white">
                Resources
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="font-heading text-3xl mb-2">Company</h4>

            <ul className="space-y-4 text-[var(--text-body-lg)]">
              <li ref={addLink} className="cursor-pointer text-white">
                About
              </li>
              <li ref={addLink} className="cursor-pointer text-white">
                Contact
              </li>
              <li ref={addLink} className="cursor-pointer text-white">
                Privacy
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="font-heading text-3xl mb-2">Get In Touch</h4>

            <div className="space-y-4 text-[var(--text-body-lg)]">
              <a
                ref={addLink}
                href="mailto:hello@elevatehub.growth"
                className="block cursor-pointer text-white"
              >
                hello@elevatehub.growth
              </a>

              <a
                ref={addLink}
                href="tel:+919876543210"
                className="block cursor-pointer text-white"
              >
                +91 9876 543 210
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 text-center space-y-4">
          <p className="text-muted text-xs">
            © 2026 ELEVATE HUB.
            <br />
          </p>

          <p className="text-muted text-xs">
            Patient-Focused Growth for Healthcare Practices. Based in Hyderabad
            • Serving specialists across India
          </p>
        </div>
      </div>
    </footer>
  );
}
