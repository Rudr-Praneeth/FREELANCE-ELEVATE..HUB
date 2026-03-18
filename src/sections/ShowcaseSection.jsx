import React from "react";
import CardSwap, { Card } from "../components/CardSwap";

const cards = [
  "https://images.unsplash.com/",
  "https://images.unsplash.com/",
  "https://images.unsplash.com/",
  "https://images.unsplash.com/",
  "https://images.unsplash.com/"
];

export default function ShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-surface-gradient">
      <div className="container-premium grid lg:grid-cols-2 items-center gap-16">
        <div className="space-y-8">
          <h1 className="text-hero leading-[0.95]">
            Elevate Your <span className="text-gradient">Digital Presence</span>
          </h1>

          <p className="text-body-lg text-muted max-w-xl leading-relaxed">
            We engineer high-performance, visually immersive digital experiences
            that position your brand at the forefront of modern design and
            innovation.
          </p>

          <div className="flex flex-wrap gap-5 pt-4">
            <button className="relative group px-8 py-4 rounded-lg bg-accent-gradient text-black font-semibold overflow-hidden">
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                Get Started
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-[var(--gradient-success-glow)]" />
            </button>

            <button className="relative group px-8 py-4 rounded-lg border border-black/20 text-black overflow-hidden">
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                View Work
              </span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition duration-300" />
            </button>
          </div>
        </div>

        <div className="relative h-[500px]">
          <CardSwap
            width={420}
            height={320}
            cardDistance={70}
            verticalDistance={80}
            delay={4000}
            pauseOnHover
            skewAmount={4}
          >
            {cards.map((src, i) => (
              <Card key={i}>
                <img
                  src={src}
                  className="w-full h-full object-cover rounded-xl"
                  draggable={false}
                />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}