// get users (not admin)

import { Prisma, roles } from "@prisma/client";
import prisma from "../../config/prisma.config";
import { Request } from "express";

const getUsers = async (offset: number = 10, limit: number) => {
  const count = await prisma.user.count({
    where: {
      role: {
        not: roles.Admin,
      },
    },
  });

  const condition: Prisma.userFindManyArgs = {
    where: {
      role: {
        not: roles.Admin,
      },
      isDeleted: false,
    },
    orderBy: {
      userId: "asc",
    },
    take: limit || 10,
    skip: offset,
    select: {
      buyer: true,
      vendor: true,
      role: true,
      email: true,
      userId: true,
      status: true,
    },
  };
  // if ((limit || limit === 0) && (offset || offset === 0)) {
  //   condition = { ...condition, take: 2, skip: 0 };
  // }
  console.log({ limit, offset });
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

const getSingleShop = async (id: string) => {
  const result = await prisma.shop.findUniqueOrThrow({
    where: {
      shopId: id,
    },
    select: {
      coupne: true,
      logo: true,
      name: true,
      shopId: true,
      description: true,
      followersId: true,
      _count: {
        select: {
          followersId: true,
        },
      },
      status: true,

      vendor: {
        select: {
          name: true,
          email: true,
          photo: true,
        },
      },
    },
  });
  return result;
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
    select: {
      image: true,
      name: true,
      productId: true,
      categoryref: {
        select: {
          name: true,
        },
      },
      description: true,
      flashSale: true,
      inventoryCount: true,
      price: true,
      _count: {
        select: {
          review: true,
        },
      },
      created: true,
      shop: { select: { name: true, logo: true, shopId: true } },
    },
  };

  if (Object.keys(payload).length === 0) {
    condition = { select: condition.select };
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
    (condition.where as {AND:{categoryref:{name:string}}[]}).AND.push({
      categoryref: {
        name: payload.category,
      },
    });
  }

  // search
  if (payload.search) {
    (condition.where as {AND:{OR:unknown[]}[]}).AND?.push({
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
    (condition.where as {AND:{AND:unknown[]}[]}).AND?.push({
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

  const result = await prisma.product.findMany({
    ...condition,
    orderBy: { created: "desc" },
  });
  const count = await prisma.product.count();

  return { total: count, result };
};

const getSingleProduct = async (id: string) => {
  const result = await prisma.product.findFirstOrThrow({
    where: {
      productId: id,
    },
    select: {
      image: true,
      name: true,
      productId: true,
      categoryref: {
        select: {
          name: true,
        },
      },
      description: true,
      flashSale: true,
      inventoryCount: true,
      price: true,
      review: true,
      _count: {
        select: {
          review: true,
        },
      },
      created: true,
      shop: { select: { name: true, logo: true, shopId: true } },
    },
  });
  return result;
};

const getStoreAllProducts = async (payload: Request) => {
  console.log(payload.params);
  const result = await prisma.product.findMany({
    where: {
      shopId: payload.params.id,
      isDeleted: false,
    },
    select: {
      categoryref: {
        select: { name: true },
      },
      image: true,
      description: true,
      name: true,
      price: true,
      publishStatus: true,
      review: true,
      inventoryCount: true,
      categoryId: true,
      productId: true,
      shopId: true,
      flashSale: true,
    },
    skip: Number(payload.query.offset),
    take: Number(payload.query.limit),
    orderBy: {
      created: "desc",
    },
  });
  const total = await prisma.product.count({
    where: {
      shopId: payload.params.id,
      isDeleted: false,
    },
  });
  return { result, total };
};

const followingProduct = async (payload: Request) => {
  const followingShop = payload.body;

  const idarray: string[] = [];
  followingShop?.followingStore?.map((item: { shopId: string }) =>
    idarray.push(item.shopId)
  );

  const result = prisma.product.findMany({
    where: {
      shopId: {
        in: idarray,
      },
    },
    select: {
      categoryref: {
        select: { name: true },
      },
      image: true,
      description: true,
      name: true,
      price: true,
      publishStatus: true,
      review: true,
      inventoryCount: true,
      categoryId: true,
      productId: true,
      shopId: true,
      flashSale: true,
    },
  });
  return result;
};

const commonService = {
  getUsers,
  followingProduct,
  getStoreAllProducts,
  getShop,
  getSingleProduct,
  getCatetory,
  getProducts,
  getSingleShop,
};
export default commonService;
