import { NextResponse } from "next/server";

import { mockPapers } from "@/data/mock-papers";
import type { Paper, PaperSearchParams } from "@/lib/api/types";

type ApiBody = Partial<PaperSearchParams> & {
  keywords?: string[] | string;
};

function normaliseKeywords(input?: string[] | string) {
  if (!input) return [];
  const raw = Array.isArray(input) ? input.join(" ") : input;
  return raw
    .split(/[,，\s]+/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function parseYearRange(body: ApiBody) {
  if (!body.yearRange) return undefined;
  const [start, end] = body.yearRange;
  const startYear = Number(start);
  const endYear = Number(end);
  if (!Number.isFinite(startYear) || !Number.isFinite(endYear)) {
    return undefined;
  }
  return [startYear, endYear] as [number, number];
}

function normaliseParams(body: ApiBody): PaperSearchParams {
  const keywords = normaliseKeywords(body.keywords);
  if (!keywords.length) {
    throw new Error("Keyword is required");
  }

  return {
    keywords,
    abstract: body.abstract?.trim() || undefined,
    yearRange: parseYearRange(body),
    regions: body.regions?.filter(Boolean),
    themes: body.themes?.filter(Boolean),
    limit: body.limit && body.limit > 0 ? Math.min(body.limit, 100) : 20,
    page: body.page && body.page > 0 ? body.page : 1,
  };
}

function matchesPaper(paper: Paper, params: PaperSearchParams) {
  const base = [
    paper.title,
    paper.abstract,
    paper.region,
    paper.theme,
    paper.authors.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const keywordMatch = params.keywords.every((keyword) =>
    base.includes(keyword.toLowerCase())
  );

  if (!keywordMatch) return false;

  if (params.abstract) {
    const snippet = paper.abstract.toLowerCase();
    if (!snippet.includes(params.abstract.toLowerCase())) {
      return false;
    }
  }

  if (params.yearRange) {
    const [start, end] = params.yearRange;
    if (paper.year < start || paper.year > end) {
      return false;
    }
  }

  if (params.regions?.length && !params.regions.includes(paper.region)) {
    return false;
  }

  if (params.themes?.length && !params.themes.includes(paper.theme)) {
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ApiBody;

    const params = normaliseParams(payload);

    if (params.abstract && params.abstract.length < 2) {
      return NextResponse.json(
        { message: "Abstract must contain at least two characters." },
        { status: 400 }
      );
    }

    const filtered = mockPapers.filter((paper) => matchesPaper(paper, params));

    const startIndex = (params.page! - 1) * params.limit!;
    const pageItems = filtered.slice(startIndex, startIndex + params.limit!);

    return NextResponse.json(
      {
        data: pageItems,
        total: filtered.length,
        page: params.page,
        limit: params.limit,
        took: Math.round(Math.random() * 40) + 20,
        query: params,
      },
      {
        headers: {
          "Cache-Control": "private, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          (error as Error).message ??
          "Unable to process the request at the moment.",
      },
      { status: 400 }
    );
  }
}
