"use client";

import * as React from "react";
import { CopyIcon, DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Paper, PaperSearchParams } from "@/lib/api/types";
import { getRegionLabel, getThemeLabel } from "@/lib/search/dictionaries";
import { useSearchStore } from "@/lib/store/search-store";

type Props = {
  data: Paper[];
  params: PaperSearchParams;
  total: number;
};

const columnLabels = {
  title: "案例名称",
  authors: "团队/作者",
  year: "年份",
  region: "地区",
  theme: "主题",
  abstract: "摘要",
  source: "来源",
} as const;

export function SearchResultsTable({ data, params, total }: Props) {
  const setLastResult = useSearchStore((state) => state.setLastResult);
  const [status, setStatus] = React.useState<"idle" | "copied" | "exported">(
    "idle"
  );

  React.useEffect(() => {
    if (params && data) {
      setLastResult(params, data);
    }
  }, [data, params, setLastResult]);

  const headers = [
    columnLabels.title,
    columnLabels.authors,
    columnLabels.year,
    columnLabels.region,
    columnLabels.theme,
    columnLabels.abstract,
    columnLabels.source,
  ] as const;

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    const headerRow = headers.join("\t");
    const rows = data
      .map((paper) =>
        [
          paper.title,
          paper.authors.join(", "),
          paper.year,
          getRegionLabel(paper.region),
          getThemeLabel(paper.theme),
          paper.abstract,
          paper.source,
        ].join("\t")
      )
      .join("\n");
    try {
      await navigator.clipboard.writeText(`${headerRow}\n${rows}`);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const handleExport = () => {
    if (data.length === 0) return;
    const csvHeader = headers.map((label) => wrapCsvValue(label)).join(",");
    const csvRows = data
      .map((paper) =>
        [
          paper.title,
          paper.authors.join(";"),
          String(paper.year),
          getRegionLabel(paper.region),
          getThemeLabel(paper.theme),
          paper.abstract,
          paper.source,
        ]
          .map(wrapCsvValue)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([`${csvHeader}\n${csvRows}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `digital-history-results-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("exported");
    setTimeout(() => setStatus("idle"), 2000);
  };

  if (!data.length) {
    return (
      <Empty>
          <EmptyHeader>
            <EmptyTitle>暂无匹配案例</EmptyTitle>
            <EmptyDescription>尝试调整关键词或放宽筛选条件。</EmptyDescription>
          </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          案例列表 · {total}
        </p>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <CopyIcon className="mr-2 size-4" />
            {status === "copied" ? "复制结果 ✓" : "复制结果"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <DownloadIcon className="mr-2 size-4" />
            {status === "exported" ? "导出 CSV ✓" : "导出 CSV"}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border/70">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((label) => (
                <TableHead key={label} className="text-nowrap">
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((paper) => (
              <TableRow key={paper.id} aria-label={paper.title}>
                <TableCell className="font-semibold">{paper.title}</TableCell>
                <TableCell>{paper.authors.join(", ")}</TableCell>
                <TableCell>{paper.year}</TableCell>
                <TableCell>{getRegionLabel(paper.region)}</TableCell>
                <TableCell>{getThemeLabel(paper.theme)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {paper.abstract}
                </TableCell>
                <TableCell>
                  <a
                    href={paper.source}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {columnLabels.source}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function wrapCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}
