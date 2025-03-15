import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma.config";
import { Request } from "express";

// cteate category
const createCategory = async (payload: {
  name: string;
  logo: string;
  slug: string;
}) => {
  const result = await prisma.category.create({
    data: {
      name: payload.name,
      logo: payload.logo,
      slug: payload.slug,
    },
  });
  return result;
};

// manage category.
const manageCategory = async (payload: Request) => {
  if (payload.query?.delete === "true") {
    const result = await prisma.$transaction(async (tnx) => {
      const productDelete = await tnx.product.deleteMany({
        where: {
          categoryId: payload.params?.id,
        },
      });
      const categoryDelete = await tnx.category.delete({
        where: {
          categoryId: payload.params?.id,
        },
      });
      return { productDelete, categoryDelete };
    });

    return {
      delete: true,
      message: "category deleted.",
      result,
    };
  }

  const result = await prisma.category.update({
    where: {
      categoryId: payload.params?.id,
    },
    data: payload.body,
  });
  return result;
};

// manage shop
const manageShop = async (payload: Request) => {
  const result = await prisma.shop.update({
    where: {
      shopId: payload.params.id,
    },
    data: payload.body,
  });
  return result;
};

// manage user  (w)
const manageuser = async (payload: Request) => {
  if (payload.query.delete === "true") {
    const result = await prisma.user.update({
      where: {
        userId: payload.params.id,
      },
      data: {
        isDeleted: true,
      },
    });
    return result;
  } else {
    const result = await prisma.user.update({
      where: {
        userId: payload.params.id,
      },
      data: {
        status: "Block",
      },
    });
    return result;
  }
};

// cteate brand
const createBrand = async (payload: Prisma.brandCreateInput) => {
  const result = await prisma.brand.create({
    data: payload,
  });
  return result;
};

export interface TpaginationPayload {
  limit: string | number;
  offset: string | number;
}

const getBrand = async (payload: Partial<TpaginationPayload>) => {
  const condition: Prisma.brandFindManyArgs = {
    orderBy: { created: "desc" },
    select:{
      brandId:true,
      logo:true,
      slug:true,
      created:true,
      updated:true,
      name:true,
      _count:{
        select:{product:true}
      }
    }
  };

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

  const result = await prisma.brand.findMany({ ...condition });
  const total = await prisma.brand.count();
  return { result, total };
};

const createBanner = async (payload: Prisma.bannerCreateInput) => {
  const result = await prisma.banner.create({
    data: payload,
  });
  return result;
};

const getBanners = async (payload: Partial<TpaginationPayload>) => {
  const condition: Prisma.bannerFindManyArgs = { orderBy: { created: "desc" } };

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

  const result = await prisma.banner.findMany({ ...condition });
  const total = await prisma.banner.count();
  return { result, total };
};

const adminService = {
  createCategory,
  manageCategory,
  manageShop,
  manageuser,
  createBrand,
  getBrand,
  createBanner,
  getBanners,
};
export default adminService;
