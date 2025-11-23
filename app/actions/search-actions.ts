"use server";

import { fuzzySearchPapers } from "@/lib/api/client";
import type { Paper } from "@/lib/api/types";
import type { PaperSearchParams } from "@/lib/api/types";
import {
  parseAdvancedSearchForm,
  parseQuickSearchForm,
  stringifyParams,
} from "@/lib/search/validators";

type BaseState = {
  status: "idle" | "error" | "success";
  params?: PaperSearchParams;
  results?: Paper[];
  redirectTo?: string;
  errorKey?: string;
  errorMessage?: string;
};

export async function quickSearchAction(
  _prevState: BaseState,
  formData: FormData
): Promise<BaseState> {
  const parsed = parseQuickSearchForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      errorKey: parsed.error,
    };
  }

  try {
    const response = await fuzzySearchPapers(parsed.params);
    return {
      status: "success",
      params: response.query,
      results: response.data,
      redirectTo: `/search/results?${stringifyParams(response.query)}`,
    };
  } catch (error) {
    return {
      status: "error",
      errorMessage: (error as Error).message,
    };
  }
}

export async function advancedSearchAction(
  _prevState: BaseState,
  formData: FormData
): Promise<BaseState> {
  const parsed = parseAdvancedSearchForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      errorKey: parsed.error,
    };
  }

  try {
    const response = await fuzzySearchPapers(parsed.params);
    return {
      status: "success",
      params: response.query,
      results: response.data,
      redirectTo: `/search/results?${stringifyParams(response.query)}`,
    };
  } catch (error) {
    return {
      status: "error",
      errorMessage: (error as Error).message,
    };
  }
}
