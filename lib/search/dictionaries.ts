type DictionaryItem = {
  value: string;
  label: string;
};

export const regionDictionary: DictionaryItem[] = [
  { value: "east-asia", label: "东亚" },
  { value: "europe", label: "欧洲" },
  { value: "global", label: "全球" },
  { value: "north-america", label: "北美" },
  { value: "south-america", label: "南美" },
  { value: "africa", label: "非洲" },
  { value: "central-asia", label: "中亚" },
];

export const themeDictionary: DictionaryItem[] = [
  { value: "urban-memory", label: "城市记忆" },
  { value: "marine-ecology", label: "海洋生态" },
  { value: "climate-history", label: "气候史" },
  { value: "cross-border-trade", label: "跨境贸易" },
  { value: "oral-history-ai", label: "口述史AI" },
  { value: "political-history", label: "政治史" },
  { value: "ecological-history", label: "生态史" },
  { value: "memory-studies", label: "记忆研究" },
];

export function getRegionLabel(value: string) {
  return regionDictionary.find((item) => item.value === value)?.label ?? value;
}

export function getThemeLabel(value: string) {
  return themeDictionary.find((item) => item.value === value)?.label ?? value;
}
