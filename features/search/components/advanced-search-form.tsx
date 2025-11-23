"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { advancedSearchAction } from "@/app/actions/search-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { regionDictionary, themeDictionary } from "@/lib/search/dictionaries";
import { useSearchStore } from "@/lib/store/search-store";

const initialState = {
  status: "idle" as const,
};

export function AdvancedSearchForm() {
  const placeholder = "如：语义标注 + 口述史";
  const router = useRouter();
  const setLastResult = useSearchStore((state) => state.setLastResult);
  const [state, dispatch, isPending] = React.useActionState(
    advancedSearchAction,
    initialState
  );

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
      className="space-y-6 rounded-2xl border border-border/70 bg-card p-6 shadow-xl"
    >
      <div className="space-y-2">
        <Label htmlFor="keywords" className="text-sm font-semibold">
          关键词
        </Label>
        <Input
          id="keywords"
          name="keywords"
          placeholder="输入主题、地区或机构"
          aria-invalid={Boolean(errorKey || errorMessage)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="abstract" className="text-sm font-semibold">
          摘要包含
        </Label>
        <Textarea
          id="abstract"
          name="abstract"
          rows={3}
          placeholder={placeholder}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="yearStart">时间范围</Label>
          <Input
            id="yearStart"
            name="yearStart"
            type="number"
            min={1900}
            max={2030}
            placeholder="1990"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="yearEnd" className="sr-only">
            时间范围
          </Label>
          <Input
            id="yearEnd"
            name="yearEnd"
            type="number"
            min={1900}
            max={2035}
            placeholder="2025"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <fieldset className="space-y-3 rounded-xl border border-dashed border-border/60 p-4">
          <legend className="px-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            研究区域
          </legend>
          {regionDictionary.map((region) => (
            <label
              key={region.value}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <input
                type="checkbox"
                name="regions"
                value={region.value}
                className="size-4 rounded border border-border text-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              {region.label}
            </label>
          ))}
        </fieldset>

        <fieldset className="space-y-3 rounded-xl border border-dashed border-border/60 p-4">
          <legend className="px-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            研究主题
          </legend>
          {themeDictionary.map((theme) => (
            <label
              key={theme.value}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <input
                type="checkbox"
                name="themes"
                value={theme.value}
                className="size-4 rounded border border-border text-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              {theme.label}
            </label>
          ))}
        </fieldset>
      </div>

      {(errorKey || errorMessage) && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage ?? errorKey}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" className="flex-1" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner className="mr-2 size-4" />
              检索中...
            </>
          ) : (
            "执行检索"
          )}
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="flex-1"
          disabled={isPending}
        >
          重置条件
        </Button>
      </div>
    </form>
  );
}
