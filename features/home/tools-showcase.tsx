import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";

import type { HomeContent } from "@/data/home-content";

type Props = {
  tools: HomeContent["tools"];
  title: string;
  subtitle: string;
};

export function ToolsShowcase({ tools, title, subtitle }: Props) {

  return (
    <section id="tools" className="py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:px-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {title}
          </p>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.id}
              className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-gradient-to-b from-muted/40 p-6 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-foreground">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {tool.steps.map((step) => (
                  <li key={step} className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-primary" />
                    {step}
                  </li>
                ))}
              </ul>
              <Link
                href={tool.link}
                className="mt-auto text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {tool.link}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
