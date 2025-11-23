import type { Paper } from "@/lib/api/types";

export type HomeContent = {
  announcement: {
    message: string;
    link: string;
    linkLabel: string;
    dismissLabel: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    videoSrc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    highlights: {
      label: string;
      value: number;
      suffix?: string;
    }[];
  };
  stats: {
    id: string;
    label: string;
    value: number;
    unit?: string;
    description: string;
  }[];
  featuredCases: Array<
    Pick<Paper, "title" | "abstract" | "region" | "theme" | "year"> & {
      id: string;
      image: string;
      tags: string[];
      link: string;
    }
  >;
  tools: {
    id: string;
    title: string;
    description: string;
    steps: string[];
    link: string;
  }[];
  datasets: {
    topics: { name: string; value: number; fill: string }[];
    regions: { name: string; value: number; fill: string }[];
  };
  news: {
    frontier: {
      id: string;
      title: string;
      excerpt: string;
      date: string;
      link: string;
    }[];
    events: {
      id: string;
      title: string;
      location: string;
      date: string;
      link: string;
    }[];
  };
  partners: {
    id: string;
    name: string;
    description: string;
    country: string;
    url: string;
  }[];
  featuredCopy: {
    eyebrow: string;
    title: string;
    viewAllLabel: string;
    learnMoreLabel: string;
  };
  toolsCopy: {
    title: string;
    subtitle: string;
  };
  datasetCopy: {
    title: string;
    subtitle: string;
    topicTitle: string;
    regionTitle: string;
  };
  newsCopy: {
    frontierLabel: string;
    eventsLabel: string;
    eventsSummary: string;
    learnMoreLabel: string;
  };
  partnersCopy: {
    title: string;
    subtitle: string;
  };
};

const sharedTopics = [
  { name: "档案数字化", value: 32, fill: "oklch(0.65 0.2 30)" },
  { name: "口述史AI", value: 21, fill: "oklch(0.63 0.16 120)" },
  { name: "城市记忆", value: 27, fill: "oklch(0.62 0.18 200)" },
  { name: "冲突复原", value: 18, fill: "oklch(0.58 0.2 300)" },
  { name: "气候史", value: 16, fill: "oklch(0.71 0.18 80)" },
];

const sharedRegions = [
  { name: "东亚", value: 42, fill: "oklch(0.72 0.2 60)" },
  { name: "北美", value: 36, fill: "oklch(0.68 0.2 15)" },
  { name: "欧洲", value: 31, fill: "oklch(0.63 0.18 240)" },
  { name: "南美", value: 14, fill: "oklch(0.56 0.18 350)" },
  { name: "非洲", value: 11, fill: "oklch(0.53 0.17 20)" },
];

export const homeContent: HomeContent = {
  announcement: {
    message:
      "2025 年度开放申请：数字史学联合孵化计划升级，新增语义标注沙箱。",
    link: "https://digital-history.example.com/program",
    linkLabel: "查看详情",
    dismissLabel: "关闭公告",
  },
  hero: {
    badge: "全球数字史学案例数据库",
    title: "以实验驱动的数字史学案例数据库",
    description:
      "连通全球 200+ 研究团队的案例、工具、数据集与资源，支持跨语、跨区域的历史研究协作。",
    videoSrc: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    ctaPrimary: "开始探索",
    ctaSecondary: "查看工具手册",
    highlights: [
      { label: "收录案例", value: 248, suffix: "+" },
      { label: "开放数据集", value: 37 },
      { label: "合作机构", value: 62 },
    ],
  },
  stats: [
    {
      id: "01",
      label: "跨语言检索",
      value: 12,
      unit: "种语言",
      description: "覆盖主要学术语种，实现摘要与标签的双语比对。",
    },
    {
      id: "02",
      label: "平均更新",
      value: 8,
      unit: "天",
      description: "自动同步全球资讯源与会议公告。",
    },
    {
      id: "03",
      label: "开放 API",
      value: 3,
      unit: "个",
      description: "支持项目检索、数据集调用与引用分析。",
    },
  ],
  featuredCases: [
    {
      id: "case-1",
      title: "上海城市记忆图谱",
      abstract:
        "通过 120TB 城市影像档案与传感数据，构建 1949-2020 年城市空间记忆的互动地图。",
      tags: ["城市史", "可视化", "GIS"],
      region: "east-asia",
      theme: "urban-memory",
      year: 2024,
      image: "/media/cases/shanghai.jpg",
      link: "https://digital-history.example.com/cases/shanghai-memory",
    },
    {
      id: "case-2",
      title: "北大西洋捕鲸网络",
      abstract:
        "利用船日志与卫星遥感揭示 18-19 世纪捕鲸网络与生态冲击，结合物联网传感器复原航路。",
      tags: ["海洋史", "知识图谱"],
      region: "europe",
      theme: "marine-ecology",
      year: 2023,
      image: "/media/cases/whale.jpg",
      link: "https://digital-history.example.com/cases/atlantic-whale",
    },
    {
      id: "case-3",
      title: "气候史记忆碎片",
      abstract:
        "通过多语种口述资料与 AI 转录工具，追踪全球气候事件的在地叙事及政策响应。",
      tags: ["口述史", "AI"],
      region: "global",
      theme: "climate-history",
      year: 2025,
      image: "/media/cases/climate.jpg",
      link: "https://digital-history.example.com/cases/climate-voices",
    },
  ],
  tools: [
    {
      id: "pipeline",
      title: "语义标注流水线",
      description:
        "封装 OCR、实体抽取、语义角色标注与人工校验流程，适配档案批量处理。",
      steps: ["OCR 转写", "实体校验", "语义索引", "开放 API 发布"],
      link: "https://digital-history.example.com/tools/semantic",
    },
    {
      id: "timeline",
      title: "多线索历史时间轴",
      description:
        "结合图数据库与流式渲染，实现多角色、多地理坐标的叙事时间轴。",
      steps: ["资料汇聚", "知识图谱", "流式渲染", "协作发布"],
      link: "https://digital-history.example.com/tools/timeline",
    },
    {
      id: "audit",
      title: "数据可信度审计",
      description:
        "通过可追踪的数据指纹与版本快照，降低数据引用过程中的信任成本。",
      steps: ["样本抽检", "偏差分析", "溯源输出"],
      link: "https://digital-history.example.com/tools/trust",
    },
  ],
  datasets: {
    topics: sharedTopics,
    regions: sharedRegions,
  },
  news: {
    frontier: [
      {
        id: "frontier-1",
        title: "生成式 AI 被用于多语口述史噪声修复",
        excerpt:
          "MIT 与伦敦政经联合团队开源跨语音噪声数据集并分享标注策略。",
        date: "2025-03-02",
        link: "https://digital-history.example.com/news/ai-oral-history",
      },
      {
        id: "frontier-2",
        title: "元宇宙考古实验室上线可交互展厅",
        excerpt:
          "通过实时点云拼接呈现地中海沉船现场，并支持研究者标注。",
        date: "2025-02-18",
        link: "https://digital-history.example.com/news/metaverse-archaeology",
      },
    ],
    events: [
      {
        id: "event-1",
        title: "Digital Humanities Asia 2025",
        location: "新加坡",
        date: "2025-05-12",
        link: "https://dha2025.org",
      },
      {
        id: "event-2",
        title: "全球口述史与 AI 峰会",
        location: "蒙特利尔",
        date: "2025-06-03",
        link: "https://oralhistory-ai.org",
      },
    ],
  },
  partners: [
    {
      id: "partner-1",
      name: "Digital History Lab",
      description: "数字史学实验室 · 负责核心数据标准与 API。",
      country: "China",
      url: "https://digital-history.example.com",
    },
    {
      id: "partner-2",
      name: "Global Archives Alliance",
      description: "跨国档案馆联盟 · 提供高分辨率档案与培训。",
      country: "EU",
      url: "https://archives-alliance.example.com",
    },
    {
      id: "partner-3",
      name: "Urban Memory Studio",
      description: "城市记忆工作室 · 与地方博物馆共建展陈。",
      country: "Singapore",
      url: "https://urban-memory.example.com",
    },
  ],
  featuredCopy: {
    eyebrow: "案例速览",
    title: "精选案例",
    viewAllLabel: "查看全部",
    learnMoreLabel: "了解详情",
  },
  toolsCopy: {
    title: "研究工具",
    subtitle: "面向数字史学项目的精选方法论与管线",
  },
  datasetCopy: {
    title: "数据集洞察",
    subtitle: "使用可视化快速理解主题热度与地区覆盖",
    topicTitle: "主题热度",
    regionTitle: "地区覆盖",
  },
  newsCopy: {
    frontierLabel: "前沿追踪",
    eventsLabel: "会议资讯",
    eventsSummary: "即将到来的会议与工作坊",
    learnMoreLabel: "了解详情",
  },
  partnersCopy: {
    title: "合作机构",
    subtitle: "与全球高校、研究机构与档案馆共建数字史学生态",
  },
};
