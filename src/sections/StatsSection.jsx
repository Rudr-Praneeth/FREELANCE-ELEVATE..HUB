import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';

const CountUp = ({ to, from = 0, separator = "," }) => {
  const ref = useRef(null);

  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const isInView = useInView(ref, { once: true });

  const formatValue = useCallback((latest) => {
    return Intl.NumberFormat('en-IN', {
      useGrouping: !!separator,
      maximumFractionDigits: 0,
    }).format(Math.floor(latest));
  }, [separator]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, to, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span ref={ref}>{from}</span>;
};

const StatCard = ({ title, value, suffix, prefix = "", subtext, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="relative group overflow-hidden rounded-xl bg-elevated/50 border border-subtle/20 p-6 sm:p-8 hover:border-accent/40 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <p className="font-body text-small text-muted uppercase tracking-widest mb-4">
          {title}
        </p>

        <div className="flex items-baseline gap-1">
          <span className="font-heading text-h1 text-accent">{prefix}</span>

          <h2 className="text-hero font-heading leading-none tracking-tighter">
            <CountUp to={value} />
            <span className="text-accent ml-2">{suffix}</span>
          </h2>
        </div>

        <p className="mt-4 font-body text-body text-secondary/80 max-w-[20ch]">
          {subtext}
        </p>
      </div>

      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 blur-[50px] rounded-full group-hover:bg-accent/20 transition-colors" />
    </motion.div>
  );
};

export default function StatsSection() {
  const stats = [
    {
      title: "Efficiency",
      prefix: "₹",
      value: 3200,
      suffix: "",
      subtext: "Cost per patient vs ₹8,000 industry average",
    },
    {
      title: "Performance",
      prefix: "",
      value: 213,
      suffix: "%",
      subtext: "Average growth seen within first 90 days",
    },
    {
      title: "Network",
      prefix: "",
      value: 50,
      suffix: "+",
      subtext: "Clinics scaling their operations with our system",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-bg-surface pt-8">
      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} index={idx} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}