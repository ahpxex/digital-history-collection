"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { HomeContent } from "@/data/home-content";

type Props = {
  datasets: HomeContent["datasets"];
  title: string;
  subtitle: string;
  topicTitle: string;
  regionTitle: string;
};

export function DatasetVisualization({
  datasets,
  title,
  subtitle,
  topicTitle,
  regionTitle,
}: Props) {

  return (
    <section id="datasets" className="py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {title}
          </p>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm">
            <h3 className="font-semibold text-foreground">{topicTitle}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datasets.topics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {datasets.topics.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm">
            <h3 className="font-semibold text-foreground">{regionTitle}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={datasets.regions}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {datasets.regions.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
