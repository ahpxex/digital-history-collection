import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db/client";

export const getTrpcCaller = async () => {
  return appRouter.createCaller({
    prisma,
    headers: new Headers(),
  });
};
