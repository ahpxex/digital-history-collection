import { getTrpcCaller } from "@/server/api/server-client";
import { DatasetList } from "@/features/home/components/DatasetList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datasets | Digital History Collection",
  description: "Access structured datasets for historical analysis.",
};

export default async function DatasetsPage() {
  const trpc = await getTrpcCaller();
  const { data } = await trpc.datasetItems.list({
    pageSize: 50,
    page: 1,
    sortBy: "title",
    sortOrder: "asc",
  });

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Datasets</h1>
        <p className="text-lg text-default-500 max-w-2xl">
          Structured historical data available for download and analysis.
        </p>
      </div>
      <DatasetList datasets={data} />
    </div>
  );
}
