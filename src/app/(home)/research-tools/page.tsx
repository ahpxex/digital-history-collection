import { getTrpcCaller } from "@/server/api/server-client";
import { ResearchToolsList } from "@/features/home/components/ResearchToolsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Tools | Digital History Collection",
  description: "Discover tools and software for digital history research.",
};

export default async function ResearchToolsPage() {
  const trpc = await getTrpcCaller();
  const { data } = await trpc.researchTools.list({
    pageSize: 50,
    page: 1,
    sortBy: "name",
    sortOrder: "asc",
  });

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
       <div className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Research Tools</h1>
        <p className="text-lg text-default-500 max-w-2xl">
          Software and platforms to assist with historical data analysis and visualization.
        </p>
      </div>
      <ResearchToolsList tools={data} />
    </div>
  );
}
