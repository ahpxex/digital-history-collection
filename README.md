## 全球数字史学案例数据库（Modernised Clone）

Next.js (App Router + Server Actions) implementation of the “全球数字史学案例数据库”核心体验。  
提供沉浸式首页、检索管线、现代交互动画与 shadcn/ui 组件。

### Tech stack

- **Next.js 16 App Router**、Server Components、Server Actions
- **TypeScript + TailwindCSS v4**、shadcn/ui、Framer Motion
- **Zustand**（跨页共享检索状态）、**Recharts**（柱状/饼图可视化）

---

## 快速开始

1. 安装依赖：

   ```bash
   npm install
   ```

2. 启动开发服务器：

   ```bash
   npm run dev
   ```

3. 浏览器访问 `http://localhost:3000`。

### 常用脚本

| 命令            | 作用                         |
| --------------- | ---------------------------- |
| `npm run dev`   | 启动开发环境                 |
| `npm run build` | 生成生产包                   |
| `npm run start` | 运行生产包                   |
| `npm run lint`  | ESLint 校验（Next.js 默认） |

---

## 主要能力

- **沉浸式首页**：公告条、视频背景 Hero（含快捷检索）、统计动画、精选案例卡片、研究工具说明、数据集可视化（Recharts 柱状/饼图、Hover Tooltip、Legend）、资讯栏目、合作伙伴与页脚。
- **检索体验**：首页快捷检索 + 高级检索页面共用 zod 校验、关键词拆分、摘要长度校验。两种表单皆通过 Server Action 调用 `/api/paper/fuzzysearch`，并把结果写入 Zustand 以便结果页复用。
- **检索结果页**：Suspense 服务端渲染 + 动态查询、条件徽章展示、shadcn table、空状态/错误提示、复制/CSV 导出按钮、可访问性语义。
- **API Client**：`/lib/api/client.ts` 统一处理请求、超时和错误；`/app/api/paper/fuzzysearch` 使用 mock 数据模拟 MySQL/REST 服务，可按项目需求替换。
- **可配置文案 + 可访问性**：所有文案集中在 `data/home-content.ts`，方便后续接入 CMS；组件包含 aria label/状态提示、焦点样式等。
- **可视化与动画**：Framer Motion 提供 Hero/统计动效，Recharts 输出高对比数据集视图。

---

## 目录结构

```
app/
  api/paper/fuzzysearch/route.ts
  actions/search-actions.ts
  search/               # 检索路由
components/
  layout/               # 站点 Header/Footer
data/
  home-content.ts       # CMS/JSON 可替换的文案与数据
  mock-papers.ts        # Mock 数据源
features/
  home/                 # 首页各模块
  search/               # 检索表单 & 结果组件
lib/
  api/                  # API types/client
  search/               # 校验、字典、URL 解析
  store/                # Zustand 状态
```

---

## API 说明

内置 `/api/paper/fuzzysearch` route handler（Edge/Node 皆可），请求体示例：

```json
{
  "keywords": ["urban", "memory"],
  "abstract": "annotation",
  "yearRange": [2010, 2025],
  "regions": ["east-asia"],
  "themes": ["urban-memory"],
  "limit": 20,
  "page": 1
}
```

返回：

```json
{
  "data": [...],
  "total": 12,
  "page": 1,
  "limit": 20,
  "took": 42,
  "query": { ... }
}
```

- 若要对接真实 MySQL/REST，可直接替换 `app/api/paper/fuzzysearch/route.ts` 或让 `NEXT_PUBLIC_API_BASE_URL` 指向远端服务。
- API 超时可通过 `NEXT_PUBLIC_API_TIMEOUT`（默认 8000ms）覆盖。

---

## 可访问性 & 测试建议

- 表单/按钮/表格包含 aria 属性、loading 状态、键盘 focus ring。
- Suspense fallback + 空状态提示保证每条路径可反馈。
- 推荐在接入真实数据后补充 E2E（Playwright/Cypress）与可视化截图测试。
