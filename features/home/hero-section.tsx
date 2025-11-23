"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { QuickSearchForm } from "@/features/search/components/quick-search-form";

type HeroProps = {
  hero: {
    badge: string;
    title: string;
    description: string;
    videoSrc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    highlights: {
      label: string;
      value: number;
      suffix?: string;
    }[];
  };
};

export function HeroSection({ hero }: HeroProps) {

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      >
        <source src={hero.videoSrc} type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background"></div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 text-white lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="max-w-2xl space-y-6 text-balance">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3 py-1 text-xs uppercase tracking-[0.3em]">
            {hero.badge}
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {hero.title}
          </h1>
          <p className="text-lg text-white/80">{hero.description}</p>
          <div className="flex flex-wrap gap-4 text-white/90">
            <Link
              href="/search/results"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-3 text-sm font-semibold"
            >
              {hero.ctaPrimary}
              <ArrowUpRightIcon className="size-4" />
            </Link>
            <Link
              href="/search/advanced"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/30"
            >
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="w-full max-w-md space-y-4">
          <QuickSearchForm />
          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/30 bg-white/10 p-4 text-center text-white/90 backdrop-blur">
            {hero.highlights.map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-bold">
                  {item.value}
                  {item.suffix}
                </p>
                <p className="text-xs uppercase tracking-[0.3em]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
