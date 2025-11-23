export type Paper = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  region: string;
  theme: string;
  abstract: string;
  source: string;
  doi?: string;
};

export type PaperSearchParams = {
  keywords: string[];
  abstract?: string;
  yearRange?: [number, number];
  regions?: string[];
  themes?: string[];
  limit?: number;
  page?: number;
};

export type PaperSearchResponse = {
  data: Paper[];
  total: number;
  page: number;
  limit: number;
  took: number;
  query: PaperSearchParams;
};
