import { getTrpcCaller } from "@/server/api/server-client";
import { FeaturedCasesGrid } from "@/features/home/components/FeaturedCasesGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Cases | Digital History Collection",
  description: "Explore curated digital history projects and case studies.",
};

export default async function FeaturedCasesPage() {
  const trpc = await getTrpcCaller();
  const { data } = await trpc.featuredCases.list({
    pageSize: 50,
    current: 1,
    sortOrder: "desc",
  });

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Featured Cases</h1>
        <p className="text-lg text-default-500 max-w-2xl">
          Discover exemplary projects and methodologies in digital history.
        </p>
      </div>
      <FeaturedCasesGrid cases={data} />
    </div>
  );
}
