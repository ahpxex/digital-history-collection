import type { PaperSearchParams, PaperSearchResponse } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? "";
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 8000);

function buildUrl(path: string) {
  if (!API_BASE) return path;
  return `${API_BASE.replace(/\/$/, "")}${path}`;
}

export async function fuzzySearchPapers(
  params: PaperSearchParams
): Promise<PaperSearchResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(buildUrl("/api/paper/fuzzysearch"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody?.message ?? "Unable to load search results");
    }

    return await response.json();
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new Error("Request timed out, please retry.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
