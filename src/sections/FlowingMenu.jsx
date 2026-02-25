import { useEffect, useRef, useState } from "react";

export default function FlowingMenu() {
  const items = [
    { link: "#", text: "YEAH SO", image: "https://picsum.photos/600/400?random=1" },
    { link: "#", text: "MUCH MORE", image: "https://picsum.photos/600/400?random=2" },
    { link: "#", text: "RANDOM ASS", image: "https://picsum.photos/600/400?random=3" },
    { link: "#", text: "TEXT HERE", image: "https://picsum.photos/600/400?random=4" }
  ];

  return (
    <div className="w-full bg-[var(--color-bg-primary)]">
      <div className="">
        <div className="flex flex-col border border-subtle rounded-[var(--radius-lg)] overflow-hidden bg-black shadow-soft">
          {items.map((item, i) => (
            <MenuRow key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuRow({ link, text, image }) {
  const rowRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={rowRef}
      className="relative border-b border-subtle last:border-none overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={link}
        className="relative z-10 flex items-center justify-center h-28 md:h-32 uppercase tracking-wide transition-colors duration-300"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-h2)",
          color: hovered ? "transparent" : "var(--color-text-primary)"
        }}
      >
        {text}
      </a>

      <div
        className={`absolute inset-0 bg-[var(--color-bg-elevated)] transition-transform duration-500 ${
          hovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className="marquee-track h-full items-center gap-10 px-10"
          style={{
            animationDuration: "20s"
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 flex-shrink-0"
              style={{ color: "var(--color-text-primary)" }}
            >
              <span
                className="uppercase whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-h2)"
                }}
              >
                {text}
              </span>

              <div
                className="w-48 h-16 rounded-[var(--radius-md)] bg-cover bg-center accent-glow"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}

          {[...Array(8)].map((_, i) => (
            <div
              key={`dup-${i}`}
              className="flex items-center gap-8 flex-shrink-0"
              style={{ color: "var(--color-text-primary)" }}
            >
              <span
                className="uppercase whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-h2)"
                }}
              >
                {text}
              </span>

              <div
                className="w-48 h-16 rounded-[var(--radius-md)] bg-cover bg-center accent-glow"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}