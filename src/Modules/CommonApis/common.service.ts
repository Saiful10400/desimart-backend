// get users (not admin)

import { Prisma, roles } from "@prisma/client";
import prisma from "../../config/prisma.config";
import { object } from "zod";

const getUsers = async (offset: number, limit: number) => {
  const count = await prisma.user.count({
    where: {
      role: {
        not: roles.Admin,
      },
    },
  });

  let condition: Prisma.userFindManyArgs = {
    where: {
      role: {
        not: roles.Admin,
      },
    },
  };
  if ((limit || limit === 0) && (offset || offset === 0)) {
    condition = { ...condition, take: limit, skip: offset };
  }

  const result = await prisma.user.findMany(condition);

  return { total: count, result };
};

const getShop = async (offset: number, limit: number) => {
  const count = await prisma.shop.count();

  let condition: Prisma.shopFindManyArgs = {};
  if ((limit || limit === 0) && (offset || offset === 0)) {
    condition = { ...condition, skip: offset, take: limit };
  }
  const result = await prisma.shop.findMany(condition);

  return { total: count, result };
};

const getCatetory = async () => {
  const result = await prisma.category.findMany();
  return result;
};

interface TgetProduct {
  search: string;
  offset: number;
  limit: number;
  min: number;
  max: number;
  category: string;
}

const getProducts = async (payload: Partial<TgetProduct>) => {
  let condition: Prisma.productFindManyArgs = {
    where: {
      AND: [],
    },
  };

  if (Object.keys(payload).length === 0) {
    condition = {};
  }

  // pagination
  if (
    (payload.limit || payload.limit === 0) &&
    (payload.offset || payload.offset === 0)
  ) {
    condition.skip = Number(payload.offset);
    condition.take = Number(payload.limit);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { limit, offset, ...rest } = payload;

    if (Object.keys(rest).length === 0) {
      condition.where = {};
    }
  }

  // category
  if (payload.category) {
    condition.where?.AND?.push({
      categoryref: {
        name: payload.category,
      },
    });
  }

  // search
  if (payload.search) {
    condition.where?.AND?.push({
      OR: [
        {
          name: {
            contains: payload.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: payload.search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // price range.
  if (
    (payload.min || payload.min === 0) &&
    (payload.max || payload.max === 0)
  ) {
    condition.where?.AND?.push({
      AND: [
        {
          price: {
            gte: Number(payload.min),
          },
        },
        {
          price: {
            lte: Number(payload.max),
          },
        },
      ],
    });
  }

  console.dir(condition, { depth: Infinity });
  const result = await prisma.product.findMany(condition);
  const count=await prisma.product.count(condition)

  return { total: count, result };
};

const commonService = {
  getUsers,
  getShop,
  getCatetory,
  getProducts,
};
export default commonService;
