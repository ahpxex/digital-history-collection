import { getTrpcCaller } from "@/server/api/server-client";
import { PartnersGrid } from "@/features/home/components/PartnersGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | Digital History Collection",
  description: "Our collaborating institutions and partners.",
};

export default async function PartnersPage() {
  const trpc = await getTrpcCaller();
  const { data } = await trpc.partners.list({
    pageSize: 50,
    current: 1,
    sortBy: "name",
    sortOrder: "asc",
  });

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Partners</h1>
        <p className="text-lg text-default-500 max-w-2xl">
          Collaborating with leading institutions and research centers.
        </p>
      </div>
      <PartnersGrid partners={data} />
    </div>
  );
}
