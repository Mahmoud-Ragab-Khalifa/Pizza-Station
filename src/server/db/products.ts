import { db } from "@/lib/prisma";

export const getBestSellers = async () => {
  const bestSellers = await db.product.findMany({
    include: {
      sizes: true,
      extras: true,
    },
  });

  return bestSellers;
};
