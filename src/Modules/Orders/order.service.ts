import { Request } from "express";
import prisma from "../../config/prisma.config";
import getPaymentUrl from "../../Utility/getPaymentUrl";

 

const createPaymentLInk = async (payload: Request) => {
  // create a order

  const result = await prisma.$transaction(async (tr) => {
    const createAorder = await tr.order.create({
      data: {
        amount: payload.body.amount,
        userId: payload.body?.userId,
        shopId: payload.body?.shopId,
      },
    });

    const orderId = createAorder?.orderId;

    // create products on order.
    const dataoforderandproduct = payload.body?.productsArr?.map((item:string) => ({
      orderId: orderId,
      porductId: item,
    }));

    await tr.productOrder.createMany({
      data: dataoforderandproduct,
    });
    const paymentUrl = await getPaymentUrl(
      payload.body?.amount,
      createAorder?.orderId
    );
    return paymentUrl;
  });

  return result;
};

const updatePaymentStatus = async (payload:{success:boolean,orderId:string,transectionId:string}) => {
  let result;
  if (payload.success) {
    result = await prisma.order.update({
      where: {
        orderId: payload.orderId,
      },
      data: {
        transectionId: payload.transectionId,
        paymentStatus: "Paid",
      },
    });
    return result;
  } else {
    result = await prisma.order.update({
      where: {
        orderId: payload.orderId,
      },
      data: {
        transectionId: payload.transectionId,
        paymentStatus: "Unpaid",
      },
    });
    return result;
  }
};

const getallorders = async (payload: Request) => {
  if (payload.query.role === "vendor") {
    const result = await prisma.order.findMany({
      where: {
        shopId: payload.query.id as string,
      },

      skip: Number(payload.query?.offset),
      take: Number(payload.query?.limit),

      select: {
        amount: true,
        transectionId: true,
        paymentStatus: true,
        created:true,
        _count: {
          select: {
            productOrder: true,
          },
        },
      },
    });
    const count = await prisma.order.count({
      where: {
        shopId: payload.query.id as string,
      },
    });
    return { result, count };
  }
  if (payload.query.role === "user") {
    const result = await prisma.order.findMany({
      where: {
        userId: payload.query.id as string,
      },

      skip: Number(payload.query?.offset),
      take: Number(payload.query?.limit),

      select: {
        amount: true,
        transectionId: true,
        paymentStatus: true,
        created:true,
        _count: {
          select: {
            productOrder: true,
          },
        },
      },
    });
    const count = await prisma.order.count({
      where: {
        userId: payload.query.id as string,
      },
    });
    return { result, count };
  } else {
    const result = await prisma.order.findMany({
      skip: Number(payload.query?.offset),
      take: Number(payload.query?.limit),

      select: {
        amount: true,
        transectionId: true,
        paymentStatus: true,
        created:true,
        _count: {
          select: {
            productOrder: true,
          },
        },
      },
    });
    const count = await prisma.order.count();
    return { result, count };
  }
};

const orderService = {
 
  createPaymentLInk,
  updatePaymentStatus,
  getallorders,
};

export default orderService;
