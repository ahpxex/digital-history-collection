"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { quickSearchAction } from "@/app/actions/search-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useSearchStore } from "@/lib/store/search-store";

const initialState = {
  status: "idle" as const,
};

export function QuickSearchForm() {
  const router = useRouter();
  const setLastResult = useSearchStore((state) => state.setLastResult);
  const [state, dispatch, isPending] = React.useActionState(
    quickSearchAction,
    initialState
  );
  const keywordId = React.useId();

  React.useEffect(() => {
    if (state?.status === "success" && state.redirectTo) {
      if (state.params && state.results) {
        setLastResult(state.params, state.results);
      }
      router.push(state.redirectTo);
    }
  }, [router, setLastResult, state]);

  const errorKey = state?.status === "error" ? state.errorKey : undefined;
  const errorMessage = state?.status === "error" ? state.errorMessage : undefined;

  return (
    <form
      action={dispatch}
      className="group flex w-full flex-col gap-3 rounded-2xl border border-white/30 bg-white/70 p-4 text-sm shadow-lg backdrop-blur"
      aria-label="Quick search"
    >
      <label htmlFor={keywordId} className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        关键词
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id={keywordId}
          name="keyword"
          placeholder="输入主题、地区或机构"
          aria-describedby={errorKey ? `${keywordId}-error` : undefined}
          aria-invalid={Boolean(errorKey || errorMessage)}
          className="h-12 flex-1 border-white/50 bg-white/70 text-base text-foreground placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          className="h-12 flex-none px-6"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Spinner className="mr-2 size-4" />
              检索中...
            </>
          ) : (
            "立即检索"
          )}
        </Button>
      </div>
      {(errorKey || errorMessage) && (
        <p
          id={`${keywordId}-error`}
          role="alert"
          className="text-sm text-destructive"
        >
          {errorMessage ?? errorKey}
        </p>
      )}
    </form>
  );
}
