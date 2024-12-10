import { recentProducts } from "@prisma/client";
import prisma from "../../../config/prisma.config";

// add recent
const addRecent = async (payload: recentProducts) => {
  // payload.userId
  const result = await prisma.recentProducts.create({
    data: payload,
  });

  return result;
};

const getRecent = async (id: string) => {
  const result = await prisma.recentProducts.findMany({
    where: {
      userId: id,
    },
    take: 10,
  });
  return result;
};

const buyerService = {
  addRecent,
  getRecent,
};
export default buyerService;
