import { AdvancedSearchForm } from "@/features/search/components/advanced-search-form";

export default function AdvancedSearchPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 lg:px-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          高级检索
        </p>
        <p className="text-lg text-muted-foreground">
          通过多维度组合筛选精准定位项目
        </p>
      </div>
      <AdvancedSearchForm />
    </div>
  );
}
