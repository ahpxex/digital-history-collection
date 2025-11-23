"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

type Stat = {
  id: string;
  label: string;
  value: number;
  unit?: string;
  description: string;
};

type Props = {
  stats: Stat[];
};

export function StatsGrid({ stats }: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  return (
    <section ref={containerRef} className="py-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} delay={index * 0.15} inView={isInView} />
        ))}
      </div>
    </section>
  );
}

function StatCard({
  stat,
  delay,
  inView,
}: {
  stat: Stat;
  delay: number;
  inView: boolean;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 15 });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (inView) {
      motionValue.set(stat.value);
    }
  }, [inView, motionValue, stat.value]);

  React.useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(Number(latest.toFixed(0)));
    });
  }, [spring]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay }}
      className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {stat.label}
      </p>
      <p className="mt-4 text-4xl font-semibold text-primary">
        {display}
        {stat.unit && <span className="ml-1 text-lg text-foreground">{stat.unit}</span>}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
    </motion.article>
  );
}
