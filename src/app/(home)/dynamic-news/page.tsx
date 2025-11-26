import { getTrpcCaller } from "@/server/api/server-client";
import { DynamicNewsList } from "@/features/home/components/DynamicNewsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic News | Digital History Collection",
  description: "Latest news, updates, and publications in digital history.",
};

export default async function DynamicNewsPage() {
  const trpc = await getTrpcCaller();
  const { data } = await trpc.dynamicNews.list({
    pageSize: 50,
    page: 1,
    sortBy: "publishDate",
    sortOrder: "desc",
  });

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Development Dynamics</h1>
        <p className="text-lg text-default-500 max-w-2xl">
          Latest news, academic publications, and community updates.
        </p>
      </div>
      <DynamicNewsList news={data} />
    </div>
  );
}
