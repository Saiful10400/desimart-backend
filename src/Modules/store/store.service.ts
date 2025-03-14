import { Prisma, shopUser } from "@prisma/client";
import prisma from "../../config/prisma.config";
import { Request } from "express";
import { TpaginationPayload } from "../Users(activities)/Admin/admin.service";

const manageFollow = async (payload: shopUser) => {
  // find follow
  const isExist = await prisma.shopUser.findFirst({
    where: payload,
  });

  if (isExist) {
    const result = await prisma.shopUser.delete({
      where: {
        userId_shopId: payload,
      },
    });
    return {
      unfollow: true,
      message: "unfollowed",
      result,
    };
  }

  const result = await prisma.shopUser.create({
    data: payload,
  });

  return {
    follow: true,
    message: "followed",
    result,
  };
};

const checkCoupon = async (payload: Request) => {
  const result = prisma.coupne.findFirst({
    where: {
      shopId: payload.params.id,
      code: payload.body.code,
    },
  });

  return result;
};

const getAllStore = async (payload: Partial<TpaginationPayload>) => {
  const condition: Prisma.shopFindManyArgs = {
    orderBy: { created: "desc" },
    select: {
      created: true,
      logo: true,
      name: true,
      status: true,
      shopId: true,
      _count: { select: { order: true, products: true, followersId: true } },
    },
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

  const result = await prisma.shop.findMany({ ...condition });
  const total = await prisma.shop.count();
  return { result, total };
};

const storeService = {
  manageFollow,
  getAllStore,
  checkCoupon,
};

export default storeService;
