import { create } from "zustand";

import type { Paper, PaperSearchParams } from "@/lib/api/types";

type SearchState = {
  lastParams?: PaperSearchParams;
  lastResults?: Paper[];
};

type SearchStore = SearchState & {
  setLastResult: (params: PaperSearchParams, results: Paper[]) => void;
  clear: () => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  lastParams: undefined,
  lastResults: undefined,
  setLastResult: (params, results) =>
    set({
      lastParams: params,
      lastResults: results,
    }),
  clear: () => set({ lastParams: undefined, lastResults: undefined }),
}));
