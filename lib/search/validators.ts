import { z } from "zod";

import type { PaperSearchParams } from "@/lib/api/types";

const keywordSchema = z
  .string()
  .trim()
  .min(2, "请输入至少两个字符的关键词");

const abstractSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(
    z
      .string()
      .refine(
        (value) => value.length === 0 || value.length >= 2,
        "摘要筛选需至少两个字符"
      )
  );

const quickSearchSchema = z.object({
  keyword: keywordSchema,
});

const advancedSearchSchema = z
  .object({
    keywords: keywordSchema,
    abstract: abstractSchema.optional(),
    yearStart: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : undefined)),
    yearEnd: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : undefined)),
    regions: z.array(z.string()).optional(),
    themes: z.array(z.string()).optional(),
  })
  .refine(
    (value) =>
      !value.yearStart ||
      !value.yearEnd ||
      (value.yearStart ?? 0) <= (value.yearEnd ?? 0),
    {
      path: ["yearEnd"],
      message: "请输入有效的起止年份",
    }
  );

function splitKeywords(value: string) {
  return value
    .split(/[,，\s]+/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export type ParseResult =
  | { success: true; params: PaperSearchParams }
  | { success: false; error: string };

export function parseQuickSearchForm(formData: FormData): ParseResult {
  const parsed = quickSearchSchema.safeParse({
    keyword: formData.get("keyword") ?? "",
  });

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "请输入至少两个字符的关键词";
    return { success: false, error: message };
  }

  const { keyword } = parsed.data;

  const params: PaperSearchParams = {
    keywords: splitKeywords(keyword),
    limit: 20,
    page: 1,
  };

  return { success: true, params };
}

export function parseAdvancedSearchForm(formData: FormData): ParseResult {
  const parsed = advancedSearchSchema.safeParse({
    keywords: formData.get("keywords") ?? "",
    abstract: formData.get("abstract") ?? "",
    yearStart: formData.get("yearStart") ?? undefined,
    yearEnd: formData.get("yearEnd") ?? undefined,
    regions: formData.getAll("regions").map(String),
    themes: formData.getAll("themes").map(String),
  });

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "请输入至少两个字符的关键词";
    return { success: false, error: message };
  }

  const { keywords, abstract, yearStart, yearEnd, regions, themes } =
    parsed.data;

  const params: PaperSearchParams = {
    keywords: splitKeywords(keywords),
    abstract: abstract?.trim() ? abstract : undefined,
    yearRange:
      typeof yearStart === "number" && typeof yearEnd === "number"
        ? [yearStart, yearEnd]
        : undefined,
    regions: regions?.filter(Boolean),
    themes: themes?.filter(Boolean),
    limit: 50,
    page: 1,
  };

  return { success: true, params };
}

export function stringifyParams(params: PaperSearchParams) {
  const searchParams = new URLSearchParams();

  if (params.keywords?.length) {
    searchParams.set("keywords", params.keywords.join(","));
  }

  if (params.abstract) {
    searchParams.set("abstract", params.abstract);
  }

  if (params.yearRange) {
    searchParams.set("yearStart", String(params.yearRange[0]));
    searchParams.set("yearEnd", String(params.yearRange[1]));
  }

  if (params.regions?.length) {
    searchParams.set("regions", params.regions.join(","));
  }

  if (params.themes?.length) {
    searchParams.set("themes", params.themes.join(","));
  }

  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  return searchParams.toString();
}

export function parseSearchParamsFromUrl(
  searchParams: Record<string, string | string[] | undefined>
): PaperSearchParams {
  const coerceArray = (value?: string | string[]) => {
    if (!value) return undefined;
    const raw = Array.isArray(value) ? value.join(",") : value;
    return raw
      .split(/[,，]+/)
      .map((v) => v.trim())
      .filter(Boolean);
  };

  const coerceNumber = (value?: string | string[]) => {
    if (!value) return undefined;
    const raw = Array.isArray(value) ? value[0] : value;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const keywords = coerceArray(searchParams.keywords ?? searchParams.q) ?? [];
  const abstract = Array.isArray(searchParams.abstract)
    ? searchParams.abstract[0]
    : searchParams.abstract;
  const yearStart = coerceNumber(searchParams.yearStart);
  const yearEnd = coerceNumber(searchParams.yearEnd);

  return {
    keywords,
    abstract: abstract?.trim() ? abstract : undefined,
    yearRange:
      typeof yearStart === "number" && typeof yearEnd === "number"
        ? [yearStart, yearEnd]
        : undefined,
    regions: coerceArray(searchParams.regions),
    themes: coerceArray(searchParams.themes),
    limit: coerceNumber(searchParams.limit) ?? 20,
    page: coerceNumber(searchParams.page) ?? 1,
  };
}
