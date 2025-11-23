import { fuzzySearchPapers } from "@/lib/api/client";
import { parseSearchParamsFromUrl } from "@/lib/search/validators";

import { SearchFiltersSummary } from "./search-summary";
import { SearchResultsTable } from "./search-results-table";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export async function SearchResults({ searchParams }: Props) {
  const params = parseSearchParamsFromUrl(searchParams);

  if (!params.keywords.length) {
    return (
      <div className="space-y-4 rounded-3xl border border-dashed border-border/60 bg-muted/30 p-8 text-center">
        <p className="text-lg font-semibold text-foreground">请输入关键词</p>
        <p className="text-sm text-muted-foreground">
          在首页或高级检索页面提交搜索条件后，可在此查看结果。
        </p>
      </div>
    );
  }

  const response = await fuzzySearchPapers(params);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          检索结果
        </p>
        <p className="text-lg text-muted-foreground">
          根据当前条件匹配到 {response.total} 条案例
        </p>
      </div>
      <SearchFiltersSummary params={response.query} />
      <SearchResultsTable
        data={response.data}
        params={response.query}
        total={response.total}
      />
    </div>
  );
}
