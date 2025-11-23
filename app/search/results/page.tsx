import { Suspense } from "react";

import { SearchResults } from "@/features/search/components/search-results";

type ResultsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
      <div className="h-10 w-full animate-pulse rounded bg-muted" />
      <div className="h-96 w-full animate-pulse rounded bg-muted" />
    </div>
  );
}
