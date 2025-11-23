import { SparklesIcon } from "lucide-react";
import Link from "next/link";

import type { HomeContent } from "@/data/home-content";
import { getRegionLabel, getThemeLabel } from "@/lib/search/dictionaries";

type Props = {
  cases: HomeContent["featuredCases"];
  eyebrow: string;
  title: string;
  viewAllLabel: string;
  learnMoreLabel: string;
};

export function FeaturedCases({
  cases,
  eyebrow,
  title,
  viewAllLabel,
  learnMoreLabel,
}: Props) {

  return (
    <section className="py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
          </div>
          <Link
            href="/search/results"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            {viewAllLabel}
            <SparklesIcon className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-3xl border border-border/80 bg-card/80 p-6 shadow-sm"
            >
              <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-primary/40 to-transparent p-4 text-sm font-semibold text-primary">
                {getRegionLabel(item.region)} · {getThemeLabel(item.theme)}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.abstract}</p>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={item.link}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {learnMoreLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
