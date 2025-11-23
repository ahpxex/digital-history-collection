import { Building2Icon } from "lucide-react";
import Link from "next/link";

import type { HomeContent } from "@/data/home-content";

type Props = {
  partners: HomeContent["partners"];
  title: string;
  subtitle: string;
};

export function PartnersSection({ partners, title, subtitle }: Props) {

  return (
    <section id="partners" className="py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {title}
          </p>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {partners.map((partner) => (
            <article
              key={partner.id}
              className="rounded-3xl border border-border/70 bg-card/80 p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Building2Icon className="size-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {partner.country}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {partner.description}
              </p>
              <Link
                href={partner.url}
                className="mt-3 inline-flex items-center text-sm text-primary underline-offset-4 hover:underline"
              >
                {partner.url.replace(/^https?:\/\//, "")}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
