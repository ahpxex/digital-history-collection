import { Badge } from "@/components/ui/badge";
import type { PaperSearchParams } from "@/lib/api/types";
import { getRegionLabel, getThemeLabel } from "@/lib/search/dictionaries";
import { cn } from "@/lib/utils";

type Props = {
  params: PaperSearchParams;
};

export function SearchFiltersSummary({ params }: Props) {
  const hasFilters =
    params.keywords.length ||
    params.abstract ||
    params.yearRange ||
    params.regions?.length ||
    params.themes?.length;

  if (!hasFilters) {
    return null;
  }

  return (
    <div
      aria-label="Active filters"
      className="flex flex-wrap gap-2 rounded-2xl border border-border/70 bg-muted/50 p-4"
    >
      {params.keywords.map((keyword) => (
        <FilterBadge key={keyword} label={keyword} />
      ))}
      {params.abstract && (
        <FilterBadge
          label={
            params.abstract.length > 24
              ? `${params.abstract.slice(0, 24)}…`
              : params.abstract
          }
        />
      )}
      {params.yearRange && (
        <FilterBadge label={`${params.yearRange[0]} – ${params.yearRange[1]}`} />
      )}
      {params.regions?.map((region) => (
        <FilterBadge
          key={region}
          label={getRegionLabel(region)}
          variant="outline"
        />
      ))}
      {params.themes?.map((theme) => (
        <FilterBadge
          key={theme}
          label={getThemeLabel(theme)}
          variant="outline"
        />
      ))}
    </div>
  );
}

function FilterBadge({
  label,
  variant,
}: {
  label: string;
  variant?: "default" | "outline";
}) {
  return (
    <Badge
      variant={variant}
      className={cn(
        variant === "outline"
          ? "border-primary/40 text-primary"
          : "bg-primary/10 text-primary"
      )}
    >
      {label}
    </Badge>
  );
}
